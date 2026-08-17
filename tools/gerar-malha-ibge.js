#!/usr/bin/env node
/* =========================================================================
   gerar-malha-ibge.js — gera data/malha-uf.js a partir da API do IBGE

   ATENÇÃO: este script NÃO faz parte do site. O index.html não depende dele
   e nunca o carrega. Ele existe só para (re)gerar a malha estadual quando o
   IBGE publicar uma atualização. Rode à mão, com rede:

       node tools/gerar-malha-ibge.js

   Por que pré-gerar em vez de chamar a API na página:
     • a página tem de abrir com duplo clique, em file://, possivelmente sem
       rede — um fetch() em runtime quebraria exatamente nesse cenário;
     • a malha muda de ano em ano, não de visita em visita.

   O que ele faz:
     1. baixa a malha estadual (GeoJSON) e a lista de UFs da API do IBGE;
     2. projeta lon/lat para um viewBox de largura 100 (equidistante
        cilíndrica, paralelo padrão no centro do país);
     3. simplifica cada anel com Douglas-Peucker e arredonda as coordenadas,
        para o arquivo caber em dezenas de KB em vez de 1 MB;
     4. calcula o centroide de cada UF, usado para posicionar o rótulo;
     5. escreve data/malha-uf.js registrando window.MALHA_UF.
   ========================================================================= */

'use strict';

const fs = require('fs');
const path = require('path');

const QUALIDADE = 'intermediaria';   // minima | intermediaria | maxima
const QUALIDADE_ROTULO = 'intermediária';   // como aparece na citação da fonte
/* Período da malha. É o ano da divisão territorial, não o da consulta — fixado
   de propósito para a citação da fonte não mudar sozinha com o passar do tempo.
   Para saber o que existe: teste ?periodo=AAAA no endpoint (500 = indisponível).
   Em ago/2026 a mais recente publicada era 2022. */
const PERIODO = 2022;
const TOLERANCIA = 0.055;            // unidades de viewBox no Douglas-Peucker
const MIN_ANEL    = 0.30;            // descarta ilhas menores que isto (diagonal)
const DECIMAIS = 2;

const URL_MALHA =
  'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR' +
  '?formato=application/vnd.geo+json&intrarregiao=UF' +
  '&qualidade=' + QUALIDADE + '&periodo=' + PERIODO;
const URL_UFS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

/* ----------------------------------------------------- Douglas-Peucker */

function distPerp(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Simplifica uma polilinha aberta, preservando primeiro e último ponto. */
function dp(pts, tol) {
  if (pts.length < 3) return pts.slice();
  let maxD = -1, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = distPerp(pts[i], pts[0], pts[pts.length - 1]);
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= tol) return [pts[0], pts[pts.length - 1]];
  return dp(pts.slice(0, idx + 1), tol).slice(0, -1).concat(dp(pts.slice(idx), tol));
}

/**
 * Simplifica um anel fechado. Rodar o Douglas-Peucker direto num anel o
 * colapsaria (primeiro e último ponto coincidem), então o anel é cortado em
 * dois no ponto mais distante do inicial e cada metade é simplificada.
 */
function dpAnel(anel, tol) {
  let pts = anel.slice();
  const n = pts.length;
  if (n > 1 && pts[0][0] === pts[n - 1][0] && pts[0][1] === pts[n - 1][1]) pts.pop();
  if (pts.length < 4) return null;

  let maxD = -1, idx = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
    if (d > maxD) { maxD = d; idx = i; }
  }

  const a = dp(pts.slice(0, idx + 1), tol);
  const b = dp(pts.slice(idx).concat([pts[0]]), tol);
  const saida = a.slice(0, -1).concat(b.slice(0, -1));
  return saida.length >= 3 ? saida : null;
}

/* ------------------------------------------------------------ geometria */

function diagonal(anel) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of anel) {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return Math.hypot(x1 - x0, y1 - y0);
}

/** Área assinada e centroide de um anel (fórmula do polígono). */
function centroide(anel) {
  let a2 = 0, cx = 0, cy = 0;
  for (let i = 0, n = anel.length; i < n; i++) {
    const [x0, y0] = anel[i];
    const [x1, y1] = anel[(i + 1) % n];
    const f = x0 * y1 - x1 * y0;
    a2 += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  if (a2 === 0) return { area: 0, x: anel[0][0], y: anel[0][1] };
  return { area: Math.abs(a2) / 2, x: cx / (3 * a2), y: cy / (3 * a2) };
}

/** Cada feature vira uma lista de anéis (exteriores e furos juntos). */
function aneisDaFeature(geom) {
  if (geom.type === 'Polygon') return geom.coordinates;
  if (geom.type === 'MultiPolygon') return geom.coordinates.flat();
  throw new Error('geometria inesperada: ' + geom.type);
}

/* ----------------------------------------------------------------- main */

async function baixar(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ao baixar ${url}`);
  return res.json();
}

(async () => {
  console.log('baixando malha estadual (qualidade %s, período %d)...',
    QUALIDADE, PERIODO);
  const [malha, ufs] = await Promise.all([baixar(URL_MALHA), baixar(URL_UFS)]);

  const porCodigo = new Map();
  for (const uf of ufs) {
    porCodigo.set(String(uf.id), { sigla: uf.sigla, nome: uf.nome });
  }

  // --- bbox em graus, para definir a projeção
  let lonMin = Infinity, lonMax = -Infinity, latMin = Infinity, latMax = -Infinity;
  for (const f of malha.features) {
    for (const anel of aneisDaFeature(f.geometry)) {
      for (const [lon, lat] of anel) {
        if (lon < lonMin) lonMin = lon; if (lon > lonMax) lonMax = lon;
        if (lat < latMin) latMin = lat; if (lat > latMax) latMax = lat;
      }
    }
  }

  // Equidistante cilíndrica: o fator cos(lat0) corrige o esticamento
  // horizontal que uma projeção lon/lat crua produziria.
  const lat0 = ((latMin + latMax) / 2) * Math.PI / 180;
  const kx = Math.cos(lat0);
  const px = (lon) => lon * kx;
  const py = (lat) => -lat;

  const xMin = px(lonMin), xMax = px(lonMax);
  const yMin = py(latMax), yMax = py(latMin);
  const escala = 100 / (xMax - xMin);
  const altura = (yMax - yMin) * escala;

  const proj = ([lon, lat]) => [(px(lon) - xMin) * escala, (py(lat) - yMin) * escala];

  // --- projeta, simplifica, monta o path
  const estados = {};
  let pontosAntes = 0, pontosDepois = 0, ilhas = 0;

  for (const f of malha.features) {
    const cod = String(f.properties.codarea);
    const meta = porCodigo.get(cod);
    if (!meta) { console.warn('  ! código sem UF correspondente:', cod); continue; }

    const partes = [];
    let melhor = { area: -1, x: 0, y: 0 };

    for (const anelBruto of aneisDaFeature(f.geometry)) {
      pontosAntes += anelBruto.length;
      const projetado = anelBruto.map(proj);

      if (diagonal(projetado) < MIN_ANEL) { ilhas++; continue; }

      const simples = dpAnel(projetado, TOLERANCIA);
      if (!simples) { ilhas++; continue; }
      pontosDepois += simples.length;

      const c = centroide(simples);
      if (c.area > melhor.area) melhor = c;

      const d = simples.map(([x, y], i) =>
        (i === 0 ? 'M' : 'L') + x.toFixed(DECIMAIS) + ',' + y.toFixed(DECIMAIS)
      ).join('') + 'Z';
      partes.push(d);
    }

    if (!partes.length) { console.warn('  ! UF sem anel válido:', meta.sigla); continue; }

    estados[meta.sigla] = {
      nome: meta.nome,
      codigo: cod,
      d: partes.join(''),
      rotulo: {
        x: Number(melhor.x.toFixed(DECIMAIS)),
        y: Number(melhor.y.toFixed(DECIMAIS))
      }
    };
  }

  // --- escreve o arquivo de dados
  const ordem = Object.keys(estados).sort();
  const linhas = ordem.map((sigla) => {
    const e = estados[sigla];
    return `  ${sigla}: {\n` +
           `    nome: ${JSON.stringify(e.nome)}, codigo: '${e.codigo}',\n` +
           `    rotulo: { x: ${e.rotulo.x}, y: ${e.rotulo.y} },\n` +
           `    d: '${e.d}'\n` +
           `  }`;
  }).join(',\n');

  const saida =
`/* =========================================================================
   MALHA TERRITORIAL DO BRASIL — DIVISÃO ESTADUAL
   Arquivo GERADO. Não edite à mão: rode 'node tools/gerar-malha-ibge.js'.

   Fonte : IBGE — Malhas territoriais, divisão estadual ${PERIODO}
           (qualidade ${QUALIDADE_ROTULO})
           API servicodados.ibge.gov.br/api/v3/malhas + /api/v1/localidades
   Projeção: equidistante cilíndrica, paralelo padrão em ${(lat0 * 180 / Math.PI).toFixed(2)}°,
           normalizada para um viewBox de largura 100.
   Simplificação: Douglas-Peucker, tolerância ${TOLERANCIA} unidades de viewBox
           (abaixo de meio pixel no tamanho em que o mapa é exibido).
           Ilhas com diagonal menor que ${MIN_ANEL} unidade foram omitidas.

   'd'      = path SVG da UF, já projetado. Use fill-rule="evenodd" para que
              eventuais furos e ilhas sejam desenhados corretamente.
   'rotulo' = centroide do maior anel, para posicionar o texto da sigla.
   ========================================================================= */

window.MALHA_UF = {
  viewBox: '0 0 100 ${altura.toFixed(2)}',
  fonte: {
    org: 'IBGE',
    serie: 'Malha territorial — divisão estadual (qualidade ${QUALIDADE_ROTULO})',
    ano: '${PERIODO}'
  },
  estados: {
${linhas}
  }
};
`;

  const destino = path.join(__dirname, '..', 'data', 'malha-uf.js');
  fs.writeFileSync(destino, saida, 'utf8');

  console.log('UFs: %d | pontos %d -> %d (%s%%) | ilhas omitidas: %d',
    ordem.length, pontosAntes, pontosDepois,
    (100 - pontosDepois / pontosAntes * 100).toFixed(1), ilhas);
  console.log('viewBox: 0 0 100 %s', altura.toFixed(2));
  console.log('escrito: %s (%d KB)', destino, Math.round(saida.length / 1024));
})();

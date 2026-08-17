#!/usr/bin/env node
/* =========================================================================
   auditar-dados.js — checagem de coerência dos arquivos de dados

   Não faz parte do site: o index.html não carrega este arquivo. Rode à mão
   sempre que atualizar números, antes de commitar:

       node tools/auditar-dados.js

   Sai com código 1 se encontrar problema, para poder entrar num hook ou CI.

   O QUE ELE VERIFICA
   ------------------
   Só coisas que dá para conferir sem adivinhar. A regra aqui é dura: um
   verificador que gera falso-positivo é pior que nenhum, porque ensina a
   ignorar o resultado.

     1. somas de percentuais (regiões, rendimento, setores, destinos)
     2. campos obrigatórios e fontes com org + ano em cada seção
     3. slug coerente entre a chave, o campo `slug` e data/grupos.js
     4. status 'pronto' se e somente se há dados carregados
     5. ícone referenciado existe em assets/icons/
     6. toda `cor` citada existe como variável em css/style.css
     7. toda `uf` citada existe na malha do IBGE
     8. `entrada` presente quando há rendimento (senão o gráfico sai sem rótulo)

   O QUE ELE NÃO VERIFICA — E POR QUÊ
   ----------------------------------
   A relação entre as barras do gráfico da §4 e os setores da §5 NÃO é
   checada automaticamente. Duas razões, ambas legítimas no conteúdo atual:

     • uma barra pode agregar mais de um setor de propósito (em metanol,
       "Solventes e outros" cobre dois setores da §5);
     • a base do percentual pode não ser a barra de consumo (em
       biocombustíveis, os setores são calculados sobre etanol + biodiesel,
       declarado no texto da seção).

   Tentar inferir isso gera alarme falso. O script apenas LISTA essas
   relações para conferência humana, ao final.
   ========================================================================= */

'use strict';

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const problemas = [];
const avisos = [];

/* --------------------------------------------------------- carga dos dados */

const sandbox = { window: { MEMORIAIS: {} } };
const arquivos = fs.readdirSync(path.join(RAIZ, 'data'))
  .filter(f => f.endsWith('.js') && f !== '_schema.js');

for (const f of arquivos) {
  const src = fs.readFileSync(path.join(RAIZ, 'data', f), 'utf8');
  try {
    new Function('window', src)(sandbox.window);
  } catch (e) {
    problemas.push(`data/${f}: não avalia — ${e.message}`);
  }
}

const M = sandbox.window.MEMORIAIS || {};
const G = sandbox.window.GRUPOS || [];
const MALHA = sandbox.window.MALHA_UF;
const SECOES = ['origem', 'processo', 'coprodutos', 'balanco', 'mercados'];

const css = fs.readFileSync(path.join(RAIZ, 'css', 'style.css'), 'utf8');
const icones = fs.readdirSync(path.join(RAIZ, 'assets', 'icons'))
  .map(f => f.replace(/\.svg$/, ''));

/* ------------------------------------------------------------ verificações */

function somaDe(arr, campo) {
  const vals = (arr || []).filter(x => typeof x[campo] === 'number');
  return vals.length ? vals.reduce((a, x) => a + x[campo], 0) : null;
}

console.log('AUDITORIA DOS DADOS\n' + '='.repeat(60));

/* 1. somas de percentuais */
console.log('\n1. Somas de percentuais (esperado 100)');
for (const slug of Object.keys(M).sort()) {
  const d = M[slug];
  const alvos = [
    ['origem.regioes',        d.origem && d.origem.regioes,                'participacao'],
    ['coprodutos.rendimento', d.coprodutos && d.coprodutos.rendimento && d.coprodutos.rendimento.saidas, 'percentual'],
    ['mercados.setores',      d.mercados && d.mercados.setores,            'participacao'],
    ['mercados.destinos',     d.mercados && d.mercados.destinos,           'participacao'],
  ];
  for (const [nome, arr, campo] of alvos) {
    if (!arr || !arr.length) continue;
    const s = somaDe(arr, campo);
    if (s === null) {
      console.log(`   ·  ${slug.padEnd(16)} ${nome.padEnd(24)} sem ${campo} (opcional)`);
      continue;
    }
    const ok = Math.abs(s - 100) <= 0.5;
    if (!ok) problemas.push(`${slug}.${nome}: soma de ${campo} = ${s.toFixed(1)}, esperado 100`);
    console.log(`   ${ok ? 'ok' : 'XX'} ${slug.padEnd(16)} ${nome.padEnd(24)} ${s.toFixed(1)}`);
  }
}

/* 2. campos obrigatórios e fontes */
console.log('\n2. Campos obrigatórios e fontes');
for (const slug of Object.keys(M).sort()) {
  const d = M[slug];
  ['slug', 'nome', 'icone', 'resumo'].forEach(k => {
    if (!d[k]) problemas.push(`${slug}: campo de capa '${k}' ausente`);
  });
  for (const k of SECOES) {
    if (!d[k]) { problemas.push(`${slug}: seção '${k}' ausente`); continue; }
    if (!d[k].titulo) problemas.push(`${slug}.${k}: sem titulo`);
    if (!d[k].intro)  problemas.push(`${slug}.${k}: sem intro`);
    const fts = d[k].fontes;
    if (!fts || !fts.length) problemas.push(`${slug}.${k}: sem fontes`);
    (fts || []).forEach(f => {
      if (!f.org) problemas.push(`${slug}.${k}: fonte sem 'org'`);
      if (!f.ano) problemas.push(`${slug}.${k}: fonte '${f.org}' sem 'ano'`);
    });
  }
  const rend = d.coprodutos && d.coprodutos.rendimento;
  if (rend && !rend.entrada) {
    problemas.push(`${slug}: rendimento sem 'entrada' — o bloco do gráfico sairia sem rótulo`);
  }
  if (rend && rend.entrada && !rend.entrada.rotulo) {
    problemas.push(`${slug}: rendimento.entrada sem 'rotulo'`);
  }
}
console.log('   (silencioso quando está tudo certo)');

/* 3 e 4. slug e status */
console.log('\n3-4. Slug e status x dados');
for (const g of G) {
  const d = M[g.slug];
  const pronto = g.status === 'pronto';
  if (pronto !== !!d) {
    problemas.push(`grupos.js: '${g.slug}' status='${g.status}' mas dados carregados=${!!d}`);
  }
  if (d && d.slug !== g.slug) {
    problemas.push(`${g.slug}: campo slug='${d.slug}' diverge da chave e de grupos.js`);
  }
  console.log(`   ${pronto === !!d ? 'ok' : 'XX'} ${g.slug.padEnd(16)} status=${g.status.padEnd(7)} dados=${!!d}`);
}
Object.keys(M).forEach(slug => {
  if (!G.some(g => g.slug === slug)) problemas.push(`${slug}: tem dados mas não está em grupos.js`);
});

/* 5. ícones */
console.log('\n5. Ícones referenciados');
const usados = new Set([...G.map(g => g.icone), ...Object.values(M).map(d => d.icone)]);
for (const ic of [...usados].filter(Boolean).sort()) {
  const existe = icones.includes(ic);
  if (!existe) problemas.push(`ícone '${ic}' referenciado mas não existe em assets/icons/`);
  console.log(`   ${existe ? 'ok' : 'XX'} ${ic}.svg`);
}

/* 6. cores */
console.log('\n6. Variáveis de cor citadas nos dados');
const cores = new Set();
Object.values(M).forEach(d => {
  (d.coprodutos && d.coprodutos.rendimento ? d.coprodutos.rendimento.saidas : [])
    .forEach(s => s.cor && cores.add(s.cor));
  ((d.balanco && d.balanco.indicadores) || []).forEach(i => i.cor && cores.add(i.cor));
  ((d.balanco && d.balanco.grafico && d.balanco.grafico.barras) || [])
    .forEach(b => b.cor && cores.add(b.cor));
});
for (const c of [...cores].sort()) {
  const nome = (c.match(/var\((--[a-z0-9-]+)\)/) || [])[1];
  if (!nome) { avisos.push(`cor literal (não variável): ${c}`); continue; }
  const definida = new RegExp('^\\s*' + nome + '\\s*:', 'm').test(css);
  if (!definida) problemas.push(`cor '${nome}' usada nos dados mas não definida em style.css`);
  console.log(`   ${definida ? 'ok' : 'XX'} ${nome}`);
}

/* 7. UFs */
console.log('\n7. Siglas de UF citadas');
if (!MALHA) {
  avisos.push('data/malha-uf.js não carregado — checagem de UF pulada');
} else {
  const ufs = new Set();
  Object.values(M).forEach(d => {
    ((d.origem && d.origem.regioes) || []).forEach(r => r.uf && ufs.add(r.uf));
    ((d.mercados && d.mercados.destinos) || []).forEach(r => r.uf && ufs.add(r.uf));
  });
  const naMalha = [...ufs].filter(u => MALHA.estados[u]);
  const fora = [...ufs].filter(u => !MALHA.estados[u]);
  console.log(`   ok ${naMalha.length} siglas existem na malha`);
  // 'BR' e afins são propositais: linhas agregadas que não pintam o mapa
  console.log(`   ·  ${fora.length} fora da malha (agregados, não pintam): ${fora.join(', ') || '—'}`);
  fora.filter(u => u !== 'BR').forEach(u => {
    avisos.push(`sigla '${u}' não existe na malha — confirme se é agregado proposital`);
  });
}

/* 8. relações que exigem conferência humana */
console.log('\n8. PARA CONFERIR À MÃO — barras da §4 que dizem ser parcelas do consumo');
for (const slug of Object.keys(M).sort()) {
  const g = M[slug].balanco && M[slug].balanco.grafico;
  const st = M[slug].mercados && M[slug].mercados.setores;
  if (!g || !st || !st.some(s => typeof s.participacao === 'number')) continue;
  const legenda = (g.legenda || '').toLowerCase();
  if (!/parcela/.test(legenda)) continue;
  console.log(`   ${slug}:`);
  console.log(`     barras : ${g.barras.map(b => `${b.rotulo}=${b.valor}`).join(' | ')}`);
  console.log(`     setores: ${st.map(s => `${s.nome}=${s.participacao}%`).join(' | ')}`);
}

/* ----------------------------------------------------------------- saída */

console.log('\n' + '='.repeat(60));
if (avisos.length) {
  console.log(`\n${avisos.length} AVISO(S):`);
  avisos.forEach(a => console.log('  ~ ' + a));
}
if (problemas.length) {
  console.log(`\n${problemas.length} PROBLEMA(S):`);
  problemas.forEach(p => console.log('  ! ' + p));
  process.exit(1);
}
console.log('\nNenhum problema. ' + Object.keys(M).length + ' memoriais auditados.');

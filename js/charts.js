/* =========================================================================
   charts.js — geradores de SVG (gráficos e diagramas)

   Tudo aqui é função pura: recebe dados, devolve string de SVG. Nenhuma
   dependência externa — Chart.js não é necessário para os gráficos deste
   projeto, e evitá-lo mantém a página funcionando aberta em file:// sem rede.

   API pública (window.CHARTS):
     num(v, dec)           formata número em pt-BR
     barras(cfg)           gráfico de barras verticais
     rendimento(cfg)       balanço de massa (entrada -> fitas -> saídas)
     fluxograma(etapas)    fluxograma horizontal animado
     mapaBrasil(pontos)    mapa esquemático do Brasil com pontos

   As animações são feitas em CSS (ver css/style.css, seções 11–14): este
   módulo só emite as classes e os `transition-delay` escalonados.
   ========================================================================= */

(function () {
  'use strict';

  /* ------------------------------------------------------------ utilidades */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Formata número no padrão pt-BR (1.234,5). */
  function num(v, dec) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    var d = typeof dec === 'number' ? dec : (v % 1 === 0 ? 0 : 1);
    try {
      return v.toLocaleString('pt-BR', {
        minimumFractionDigits: d,
        maximumFractionDigits: d
      });
    } catch (e) {
      return v.toFixed(d).replace('.', ',');
    }
  }

  /** Arredonda para 2 casas — evita ruído de ponto flutuante no SVG. */
  function r(n) { return Math.round(n * 100) / 100; }

  /** Escala com passo "redondo" e no máximo `alvo` intervalos. */
  function escalaBonita(max, alvo) {
    alvo = alvo || 6;
    if (!(max > 0)) return { max: 1, passo: 0.5 };
    var base = Math.pow(10, Math.floor(Math.log(max) / Math.LN10) - 1);
    var mult = [1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500];
    for (var i = 0; i < mult.length; i++) {
      var passo = mult[i] * base;
      if (Math.ceil(max / passo) <= alvo) {
        return { max: Math.ceil(max / passo) * passo, passo: passo };
      }
    }
    return { max: max, passo: max / alvo };
  }

  /**
   * Quebra um rótulo em até `maxLinhas` linhas de no máximo `maxCh` caracteres.
   * Aproximação por contagem de caracteres — suficiente para os rótulos curtos
   * usados nos nós do fluxograma.
   */
  function quebrar(texto, maxCh, maxLinhas) {
    var palavras = String(texto).split(/\s+/);
    var linhas = [];
    var atual = '';
    for (var i = 0; i < palavras.length; i++) {
      var teste = atual ? atual + ' ' + palavras[i] : palavras[i];
      if (teste.length <= maxCh || !atual) {
        atual = teste;
      } else {
        linhas.push(atual);
        atual = palavras[i];
      }
    }
    if (atual) linhas.push(atual);
    if (linhas.length > maxLinhas) {
      linhas = linhas.slice(0, maxLinhas);
      linhas[maxLinhas - 1] = linhas[maxLinhas - 1].slice(0, maxCh - 1) + '…';
    }
    return linhas;
  }

  /* ------------------------------------------------------------- 1. barras */

  /**
   * Gráfico de barras verticais.
   * cfg = { barras: [{rotulo, valor, cor}], unidade }
   */
  function barras(cfg) {
    var itens = (cfg && cfg.barras) || [];
    if (!itens.length) return '';

    var W = 760, H = 300;
    var padE = 44, padD = 14, padT = 30, padB = 44;
    var largura = W - padE - padD;
    var altura = H - padT - padB;
    var base = padT + altura;

    var maiores = itens.map(function (b) { return b.valor || 0; });
    var escala = escalaBonita(Math.max.apply(null, maiores));
    var n = itens.length;
    var passoX = largura / n;
    var wBarra = Math.min(64, passoX * 0.56);

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
              'aria-label="' + esc(cfg.titulo || 'Gráfico de barras') + '">';

    // grade horizontal + rótulos do eixo
    var ticks = Math.round(escala.max / escala.passo);
    for (var t = 0; t <= ticks; t++) {
      var v = t * escala.passo;
      var y = r(base - (v / escala.max) * altura);
      svg += '<line class="' + (t === 0 ? 'g__base' : 'g__grade') + '" ' +
             'x1="' + padE + '" y1="' + y + '" x2="' + (W - padD) + '" y2="' + y + '"/>';
      svg += '<text class="g__eixo" x="' + (padE - 8) + '" y="' + (y + 3.5) + '" ' +
             'text-anchor="end">' + esc(num(v, v % 1 === 0 ? 0 : 1)) + '</text>';
    }

    // unidade do eixo
    if (cfg.unidade) {
      svg += '<text class="g__eixo" x="' + padE + '" y="' + (padT - 14) + '" ' +
             'text-anchor="start">' + esc(cfg.unidade) + '</text>';
    }

    // barras
    itens.forEach(function (b, i) {
      var valor = b.valor || 0;
      var h = Math.max(2, r((valor / escala.max) * altura));
      var x = r(padE + i * passoX + (passoX - wBarra) / 2);
      var y = r(base - h);
      svg += '<rect class="g__barra" x="' + x + '" y="' + y + '" ' +
             'width="' + r(wBarra) + '" height="' + h + '" rx="3" ' +
             'fill="' + esc(b.cor || 'var(--serie-1)') + '" ' +
             'style="transition-delay:' + (i * 70) + 'ms"/>';
      svg += '<text class="g__valor" x="' + r(x + wBarra / 2) + '" y="' + r(y - 9) + '">' +
             esc(num(valor, cfg.decimais)) + '</text>';

      var linhas = quebrar(b.rotulo || '', 13, 2);
      linhas.forEach(function (ln, k) {
        svg += '<text class="g__rotulo" x="' + r(x + wBarra / 2) + '" ' +
               'y="' + r(base + 18 + k * 13) + '">' + esc(ln) + '</text>';
      });
    });

    return svg + '</svg>';
  }

  /* --------------------------------------------------------- 2. rendimento */

  /**
   * Balanço de massa: bloco de entrada, fitas proporcionais, blocos de saída.
   * cfg = { saidas: [{nome, percentual, unidade, cor}] }
   * Rótulos internos só são desenhados em fitas com altura suficiente; as
   * demais ficam legíveis na legenda em HTML logo abaixo do gráfico.
   */
  function rendimento(cfg) {
    var saidas = (cfg && cfg.saidas) || [];
    if (!saidas.length) return '';

    var W = 680, H = 250;
    var topo = 14, baixo = H - 14;
    var altura = baixo - topo;
    var xEnt = 12, wEnt = 74;
    var xSai = 470, wSai = 9;
    var xRot = xSai + wSai + 14;

    var gap = 5;
    var MIN = 2.5;                 // piso visual: uma saída de 0,3% precisa aparecer
    var util = Math.max(40, altura - gap * (saidas.length - 1));

    /* Alturas do lado da saída. Aplicar um piso sem compensar estouraria a
       altura reservada, então o excedente é descontado proporcionalmente das
       fitas que têm folga — o total volta a fechar exatamente em `util`.
       O lado da entrada segue estritamente proporcional, sem piso. */
    var hs = saidas.map(function (s) { return ((s.percentual || 0) / 100) * util; });
    var deficit = 0;
    hs = hs.map(function (h) {
      if (h < MIN) { deficit += MIN - h; return MIN; }
      return h;
    });
    if (deficit > 0) {
      var folga = hs.reduce(function (a, h) { return a + (h > MIN ? h - MIN : 0); }, 0);
      if (folga > 0) {
        hs = hs.map(function (h) {
          return h > MIN ? h - ((h - MIN) / folga) * deficit : h;
        });
      }
    }

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
              'aria-label="Balanço de massa do processamento">';

    // bloco de entrada
    svg += '<rect x="' + xEnt + '" y="' + topo + '" width="' + wEnt + '" ' +
           'height="' + altura + '" rx="5" fill="var(--navy)"/>';
    svg += '<text x="' + r(xEnt + wEnt / 2) + '" y="' + r(topo + altura / 2 - 4) + '" ' +
           'text-anchor="middle" font-family="var(--fonte)" font-size="22" ' +
           'font-weight="700" fill="#fff">100</text>';
    svg += '<text x="' + r(xEnt + wEnt / 2) + '" y="' + r(topo + altura / 2 + 14) + '" ' +
           'text-anchor="middle" font-family="var(--fonte)" font-size="11" ' +
           'font-weight="600" fill="var(--amarelo)">kg de soja</text>';

    var yL = topo;   // cursor do lado da entrada (contíguo)
    var yR = topo;   // cursor do lado da saída (com folga entre fitas)

    saidas.forEach(function (s, i) {
      var pct = s.percentual || 0;
      var hL = (pct / 100) * altura;
      var hR = hs[i];
      var l0 = r(yL), l1 = r(yL + hL);
      var r0 = r(yR), r1 = r(yR + hR);
      var cor = esc(s.cor || 'var(--serie-3)');
      var cx1 = r(xEnt + wEnt + 120), cx2 = r(xSai - 120);

      // fita
      svg += '<path class="rend__fita" style="transition-delay:' + (i * 110) + 'ms" ' +
             'fill="' + cor + '" fill-opacity="0.85" d="' +
             'M' + r(xEnt + wEnt) + ',' + l0 +
             ' C' + cx1 + ',' + l0 + ' ' + cx2 + ',' + r0 + ' ' + xSai + ',' + r0 +
             ' L' + xSai + ',' + r1 +
             ' C' + cx2 + ',' + r1 + ' ' + cx1 + ',' + l1 + ' ' + r(xEnt + wEnt) + ',' + l1 +
             ' Z"/>';

      // bloco de saída
      svg += '<rect class="rend__fita" style="transition-delay:' + (i * 110) + 'ms" ' +
             'x="' + xSai + '" y="' + r0 + '" width="' + wSai + '" ' +
             'height="' + r(hR) + '" rx="2" fill="' + cor + '"/>';

      // rótulo interno só quando cabe
      if (hR >= 26) {
        svg += '<text class="rend__rotulo rend__fita" ' +
               'style="transition-delay:' + (i * 110 + 90) + 'ms" ' +
               'x="' + xRot + '" y="' + r(r0 + hR / 2 - 2) + '">' + esc(s.nome) + '</text>';
        svg += '<text class="rend__valor rend__fita" ' +
               'style="transition-delay:' + (i * 110 + 90) + 'ms" ' +
               'x="' + xRot + '" y="' + r(r0 + hR / 2 + 12) + '">' +
               esc(num(pct)) + ' ' + esc(s.unidade || 'kg') + '</text>';
      }

      yL += hL;
      yR += hR + gap;
    });

    return svg + '</svg>';
  }

  /* --------------------------------------------------------- 3. fluxograma */

  /**
   * Fluxograma horizontal das etapas do processo.
   * etapas = [{nome, marco}]
   */
  function fluxograma(etapas) {
    etapas = etapas || [];
    if (!etapas.length) return '';

    var W = 1000, H = 126;
    var margem = 6;
    var n = etapas.length;
    var gap = n > 1 ? 26 : 0;
    var w = (W - margem * 2 - gap * (n - 1)) / n;
    var h = 64, yTopo = 46, meio = yTopo + h / 2;
    var maxCh = Math.max(9, Math.floor(w / 6.4));

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
              'aria-label="Fluxograma das etapas de produção">';

    // conectores primeiro, para ficarem atrás dos nós
    for (var i = 0; i < n - 1; i++) {
      var x1 = r(margem + i * (w + gap) + w);
      var x2 = r(x1 + gap);
      svg += '<g class="fluxo__conector" style="transition-delay:' + (i * 90 + 60) + 'ms">' +
             '<line class="fluxo__linha" x1="' + (x1 + 2) + '" y1="' + meio + '" ' +
             'x2="' + (x2 - 7) + '" y2="' + meio + '"/>' +
             '<path d="M' + (x2 - 7) + ',' + (meio - 4) + ' L' + (x2 - 1) + ',' + meio +
             ' L' + (x2 - 7) + ',' + (meio + 4) + ' Z" fill="var(--navy-300)"/>' +
             '</g>';
    }

    etapas.forEach(function (e, k) {
      var x = r(margem + k * (w + gap));
      var cx = r(x + w / 2);
      var cls = 'fluxo__no' + (e.marco ? ' fluxo__marco' : '');

      svg += '<g class="' + cls + '" style="transition-delay:' + (k * 90) + 'ms">';
      svg += '<text class="fluxo__idx" x="' + cx + '" y="' + (yTopo - 12) + '" ' +
             'text-anchor="middle">' + (k + 1 < 10 ? '0' : '') + (k + 1) + '</text>';
      svg += '<rect x="' + x + '" y="' + yTopo + '" width="' + r(w) + '" ' +
             'height="' + h + '" rx="8"/>';

      var linhas = quebrar(e.nome || '', maxCh, 2);
      var y0 = linhas.length === 1 ? meio + 4 : meio - 3;
      linhas.forEach(function (ln, j) {
        svg += '<text x="' + cx + '" y="' + r(y0 + j * 14) + '">' + esc(ln) + '</text>';
      });
      svg += '</g>';
    });

    return svg + '</svg>';
  }

  /* -------------------------------------------------------- 4. mapa Brasil */

  /* Silhueta esquemática do Brasil, em viewBox 0 0 100 100.
     Os vértices são pontos reais do contorno nacional (Monte Caburaí, Oiapoque,
     Cabo Branco, Chuí, ponta oeste do Acre etc.) projetados linearmente:
        x = (lon + 73,99) / 39,20 * 100
        y = ( 5,27 - lat) / 39,02 * 100
     É uma simplificação grosseira — não serve para cartografia, só para dar
     referência visual aos pontos dos estados produtores. Para posicionar um
     novo ponto, aplique as duas fórmulas acima às coordenadas do local. */
  var BRASIL =
    'M35.7,0 L36.2,2.5 L43.3,4.8 L49.7,7.6 L57.1,3 L61.2,10.9 L65,16.1 ' +
    'L75.7,19.9 L82.1,20.9 L90.5,23 L98.9,26.8 L100,31.7 L99.7,34.1 ' +
    'L97.7,38.3 L90.5,46.8 L89.3,51.4 L88.5,58.9 L86,65.5 L81.6,72.4 ' +
    'L70.6,74.9 L65,78.8 L65,84.2 L55.8,95.5 L52.5,100 L43.1,90.4 ' +
    'L49.5,79.1 L47.2,71.2 L41.8,62.2 L41.6,54.8 L35.7,48.1 L22.2,41.2 ' +
    'L15.3,40.4 L10.2,41.7 L0,32.7 L2.8,31.7 L10.4,24.3 L11.5,16.1 ' +
    'L17.6,12.2 L25.5,9.7 L27,3.5 Z';

  /**
   * Mapa esquemático com pontos.
   * pontos = [{ uf, nome, mapa: {x, y} }]
   */
  function mapaBrasil(pontos) {
    pontos = (pontos || []).filter(function (p) {
      return p.mapa && typeof p.mapa.x === 'number' && typeof p.mapa.y === 'number';
    });

    var svg = '<svg viewBox="-3 -4 108 108" role="img" ' +
              'aria-label="Mapa esquemático do Brasil com os principais estados produtores">';
    svg += '<path class="mapa__silhueta" d="' + BRASIL + '"/>';

    pontos.forEach(function (p, i) {
      svg += '<g class="mapa__ponto">' +
             '<circle class="halo" cx="' + p.mapa.x + '" cy="' + p.mapa.y + '" r="2.3" ' +
             'style="animation-delay:' + (i * 320) + 'ms"/>' +
             '<circle class="nucleo" cx="' + p.mapa.x + '" cy="' + p.mapa.y + '" r="1.5"/>' +
             '<text x="' + (p.mapa.x + 3.2) + '" y="' + (p.mapa.y + 1.3) + '">' +
             esc(p.uf || p.nome || '') + '</text>' +
             '<title>' + esc(p.nome || p.uf || '') + '</title>' +
             '</g>';
    });

    return svg + '</svg>';
  }

  /* ------------------------------------------------------------- exportação */

  window.CHARTS = {
    num: num,
    esc: esc,
    barras: barras,
    rendimento: rendimento,
    fluxograma: fluxograma,
    mapaBrasil: mapaBrasil
  };
})();

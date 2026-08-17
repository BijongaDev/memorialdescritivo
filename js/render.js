/* =========================================================================
   render.js — monta o DOM de um memorial a partir do objeto de dados

   Nenhum texto de conteúdo mora aqui: tudo vem de window.MEMORIAIS[slug],
   definido nos arquivos /data/*.js. Este módulo só decide estrutura, ordem e
   marcação.

   A ordem das 5 seções é fixa (ver data/_schema.js):
     1 origem · 2 processo · 3 coprodutos · 4 balanco · 5 mercados

   API pública (window.RENDER):
     memorial(dados)   -> HTMLElement pronto para inserir no DOM
     cardHub(grupo)    -> HTMLElement do card do hub
   ========================================================================= */

(function () {
  'use strict';

  var esc = window.CHARTS.esc;
  var num = window.CHARTS.num;

  /* ------------------------------------------------------------ utilidades */

  /** Cria elemento a partir de uma string de HTML. */
  function elemento(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function icone(nome, alt) {
    return '<img src="assets/icons/' + esc(nome || 'outros') + '.svg" alt="' +
           esc(alt || '') + '" width="32" height="32">';
  }

  /**
   * Envolve um SVG num contêiner rolável na horizontal.
   * Em telas estreitas o SVG para de encolher (min-width no CSS) e passa a
   * deslizar: encolher junto levaria os rótulos a 5 px, ilegíveis.
   */
  function rolavel(svg) {
    return '<div class="svg-rolagem">' + svg + '</div>';
  }

  /** Maior valor de uma propriedade numérica — base das barras de ranking. */
  function maiorDe(lista, chave) {
    return lista.reduce(function (m, o) {
      var v = o[chave] || 0;
      return v > m ? v : m;
    }, 0) || 1;
  }

  /** Chave de deduplicação de uma fonte. */
  function chaveFonte(f) {
    return [f.org || '', f.serie || '', f.ano || ''].join('|');
  }

  /**
   * Junta listas de fontes removendo repetições, preservando a ordem de
   * aparição. Aceita qualquer número de arrays (ou undefined).
   */
  function juntarFontes() {
    var vistas = {}, saida = [];
    for (var i = 0; i < arguments.length; i++) {
      (arguments[i] || []).forEach(function (f) {
        if (!f || !f.org) return;
        var k = chaveFonte(f);
        if (vistas[k]) return;
        vistas[k] = true;
        saida.push(f);
      });
    }
    return saida;
  }

  function textoFonte(f) {
    var partes = [];
    if (f.serie) partes.push(esc(f.serie));
    if (f.ano) partes.push(esc(f.ano));
    return '<b>' + esc(f.org) + '</b>' +
           (partes.length ? ' · ' + partes.join(' · ') : '');
  }

  /**
   * Rodapé de fontes de uma seção. Fica FORA do wrapper .revelar de propósito:
   * a atribuição nunca depende de animação para aparecer, e sobrevive à
   * impressão em PDF (ver @media print).
   */
  function blocoFontes(fontes) {
    if (!fontes || !fontes.length) return '';
    var itens = fontes.map(function (f) {
      return '<span>' + textoFonte(f) + '</span>';
    }).join('');
    return '<div class="secao__fontes">' +
           '<span class="secao__fontes-rotulo">Fontes</span>' + itens + '</div>';
  }

  /** Cabeça padrão de seção. */
  function cabecaSecao(indice, titulo, intro) {
    return '<div class="secao__cabeca revelar">' +
           '<span class="secao__numero" aria-hidden="true">' + indice + '</span>' +
           '<h3>' + esc(titulo) + '</h3>' +
           (intro ? '<p class="secao__intro">' + esc(intro) + '</p>' : '') +
           '</div>';
  }

  /**
   * @param {Array} [fontesExtra] fontes de assets usados na renderização
   *   (ex.: a malha do IBGE). Entram sempre, sem precisar ser repetidas no
   *   arquivo de dados de cada grupo.
   */
  function envolveSecao(id, indice, dados, corpoHtml, fontesExtra) {
    return '<section class="secao" id="' + esc(id) + '" ' +
           'aria-labelledby="' + esc(id) + '-t">' +
           cabecaSecao(indice, dados.titulo, dados.intro).replace(
             '<h3>', '<h3 id="' + esc(id) + '-t">') +
           '<div class="secao__corpo revelar">' + corpoHtml + '</div>' +
           blocoFontes(juntarFontes(dados.fontes, fontesExtra)) +
           '</section>';
  }

  /* --------------------------------------------------------------- 1. capa */

  function capa(d) {
    var destaques = (d.destaques || []).map(function (x) {
      return '<div class="destaque">' +
             '<p class="destaque__valor">' + esc(num(x.valor, x.decimais)) +
             (x.unidade ? '<span>' + esc(x.unidade) + '</span>' : '') + '</p>' +
             '<p class="destaque__rotulo">' + esc(x.rotulo) + '</p>' +
             '</div>';
    }).join('');

    return '<header class="memorial__capa"><div class="container">' +
           '<div class="memorial__capa-topo">' +
           '<div class="memorial__capa-icone">' + icone(d.icone, '') + '</div>' +
           '<div>' +
           (d.subtitulo ? '<p class="memorial__capa-sub">' + esc(d.subtitulo) + '</p>' : '') +
           '<h2>' + esc(d.nome) + '</h2>' +
           '</div></div>' +
           (d.resumo ? '<p class="memorial__resumo">' + esc(d.resumo) + '</p>' : '') +
           (destaques ? '<div class="destaques">' + destaques + '</div>' : '') +
           '</div></header>';
  }

  /* ------------------------------------------------------- 2. nav de seções */

  function navSecoes(slug, secoes) {
    var itens = secoes.map(function (s, i) {
      return '<li class="secnav__item">' +
             '<a class="secnav__link" href="#' + esc(slug) + '" ' +
             'data-alvo="' + esc(s.id) + '">' +
             '<span class="secnav__ponto" aria-hidden="true"></span>' +
             '<span>' + esc(s.titulo) + '</span></a></li>';
    }).join('');

    return '<nav class="secnav" aria-label="Seções do memorial">' +
           '<p class="secnav__titulo">Memorial</p>' +
           '<ul class="secnav__lista">' + itens + '</ul></nav>';
  }

  /* --------------------------------------------- 3. §1 origem da matéria-prima */

  function secaoOrigem(id, d) {
    var regioes = d.regioes || [];
    var maxPart = maiorDe(regioes, 'participacao');

    /* `participacao` é opcional: sem ela não há barra nem "% do total". Um
       grupo pode listar origens que não são comparáveis entre si — inventar
       um percentual só para preencher a barra seria pior que não ter. */
    var lista = regioes.map(function (rg) {
      var temPart = typeof rg.participacao === 'number';
      var meta = [];
      if (rg.unidade) meta.push(esc(rg.unidade));
      if (temPart) meta.push(esc(num(rg.participacao)) + '% do total');

      return '<li class="regiao">' +
             '<p class="regiao__nome">' + esc(rg.nome) +
             (rg.uf ? '<span class="regiao__uf">' + esc(rg.uf) + '</span>' : '') + '</p>' +
             '<p class="regiao__valor">' +
             (typeof rg.valor === 'number' ? esc(num(rg.valor)) : '') +
             (meta.length ? '<small>' + meta.join(' · ') + '</small>' : '') + '</p>' +
             (temPart
               ? '<div class="regiao__barra" style="--w:' +
                 ((rg.participacao / maxPart) * 100).toFixed(1) + '%"><i></i></div>'
               : '') +
             (rg.detalhe ? '<p class="regiao__detalhe">' + esc(rg.detalhe) + '</p>' : '') +
             '</li>';
    }).join('');

    /* O mapa só existe quando as origens são UFs brasileiras. Em grupo de
       produto importado as origens são países: mapaBrasil devolve '' e a
       seção passa a uma coluna só. */
    var mapaSvg = window.CHARTS.mapaBrasil(regioes);

    /* A rota, quando existe, vem em cima e ocupa a largura toda — os dois
       coexistem: um grupo pode ter parque produtor nacional (mapa) e parcela
       importada (rota) na mesma seção. */
    var corpo = (d.rota && d.rota.length ? blocoRota(d) : '');

    if (mapaSvg) {
      corpo += '<div class="origem">' +
               '<figure class="mapa">' + mapaSvg + escalaMapa() +
               (d.legendaMapa
                 ? '<figcaption class="mapa__legenda">' + esc(d.legendaMapa) + '</figcaption>'
                 : '') +
               '</figure>' +
               '<ul class="regioes">' + lista + '</ul>' +
               '</div>';
    } else {
      corpo += '<ul class="regioes">' + lista + '</ul>';
    }

    // A malha é do IBGE: a atribuição entra automaticamente, para não depender
    // de cada arquivo de dados lembrar de citá-la.
    var fonteMalha = mapaSvg && window.MALHA_UF && window.MALHA_UF.fonte
      ? [window.MALHA_UF.fonte] : null;

    return envolveSecao(id, 1, d, corpo, fonteMalha);
  }

  /** Escala do coroplético. Os degraus usam as mesmas classes n1..n5 do SVG. */
  function escalaMapa() {
    var degraus = '';
    for (var n = 1; n <= window.CHARTS.niveisMapa(); n++) {
      degraus += '<i class="n' + n + '"></i>';
    }
    return '<div class="mapa__escala">' +
           '<span>menor</span>' +
           '<span class="mapa__escala-degraus">' + degraus + '</span>' +
           '<span>maior participação</span></div>';
  }

  /**
   * Rota de importação: origem -> travessia -> cais -> cliente.
   * Reaproveita o gerador de fluxograma. Diferente do fluxograma de processo,
   * a rota NÃO é escondida no celular — aqui não existe uma lista de etapas em
   * HTML repetindo a informação, então ela desliza na horizontal.
   */
  function blocoRota(d) {
    return '<figure class="rota">' +
           rolavel(window.CHARTS.fluxograma(d.rota)) +
           (d.legendaRota
             ? '<figcaption class="rota__legenda">' + esc(d.legendaRota) + '</figcaption>'
             : '') +
           '</figure>';
  }

  /* ------------------------------------------ 4. §2 fluxograma de produção */

  function secaoProcesso(id, d) {
    var etapas = d.etapas || [];

    var detalhe = etapas.map(function (e, i) {
      var params = (e.parametros || []).map(function (p) {
        return '<span class="param">' + esc(p.rotulo) + ' <b>' + esc(p.valor) + '</b></span>';
      }).join('');
      return '<li class="etapa">' +
             '<div class="etapa__rail" aria-hidden="true">' +
             '<span class="etapa__no">' + (i + 1) + '</span>' +
             '<span class="etapa__traco"></span></div>' +
             '<h4 class="etapa__nome">' + esc(e.nome) + '</h4>' +
             '<p class="etapa__desc">' + esc(e.descricao) + '</p>' +
             (params ? '<div class="etapa__params">' + params + '</div>' : '') +
             '</li>';
    }).join('');

    var corpo = '<figure class="fluxo">' + window.CHARTS.fluxograma(etapas) + '</figure>' +
                '<ol class="etapas">' + detalhe + '</ol>';

    return envolveSecao(id, 2, d, corpo);
  }

  /* ------------------------------------- 5. §3 subprodutos e coprodutos */

  function secaoCoprodutos(id, d) {
    var html = '';

    if (d.rendimento && d.rendimento.saidas && d.rendimento.saidas.length) {
      var legenda = d.rendimento.saidas.map(function (s) {
        return '<li class="rendimento__item">' +
               '<span class="rendimento__cor" style="background:' +
               esc(s.cor || 'var(--serie-3)') + '"></span>' +
               '<span><b>' + esc(s.nome) + '</b>' +
               '<small>' + esc(num(s.percentual)) + ' ' + esc(s.unidade || 'kg') +
               ' · ' + esc(num(s.percentual)) + '%</small></span></li>';
      }).join('');

      html += '<figure class="rendimento">' +
              '<div class="rendimento__base">' +
              '<strong>Balanço de massa</strong>' +
              '<span>' + esc(d.rendimento.base || '') + '</span></div>' +
              rolavel(window.CHARTS.rendimento(d.rendimento)) +
              '<ul class="rendimento__lista">' + legenda + '</ul>' +
              '</figure>';
    }

    if (d.itens && d.itens.length) {
      var cards = d.itens.map(function (it) {
        return '<article class="coproduto">' +
               '<div class="coproduto__topo">' +
               '<h4 class="coproduto__nome">' + esc(it.nome) + '</h4>' +
               (it.share ? '<span class="coproduto__share">' + esc(it.share) + '</span>' : '') +
               '</div>' +
               '<p class="coproduto__desc">' + esc(it.descricao) + '</p>' +
               (it.destino
                 ? '<p class="coproduto__destino"><b>Destino</b>' + esc(it.destino) + '</p>'
                 : '') +
               '</article>';
      }).join('');

      html += '<div class="bloco">' +
              '<h4 class="bloco__titulo">Correntes geradas</h4>' +
              '<div class="coprodutos">' + cards + '</div></div>';
    }

    return envolveSecao(id, 3, d, html);
  }

  /* ---------------------------------------------------- 6. §4 balanço Brasil */

  function secaoBalanco(id, d) {
    var html = '';

    if (d.indicadores && d.indicadores.length) {
      var tiles = d.indicadores.map(function (k) {
        var chip = '';
        if (typeof k.variacao === 'number') {
          var cls = k.variacao >= 0 ? 'is-alta' : 'is-baixa';
          chip = '<span class="indicador__var ' + cls + '">' +
                 (k.variacao >= 0 ? '▲' : '▼') + ' ' +
                 esc(num(Math.abs(k.variacao))) + '% a/a</span>';
        }
        return '<div class="indicador" style="--cor:' + esc(k.cor || 'var(--navy)') + '">' +
               '<p class="indicador__rotulo">' + esc(k.rotulo) + '</p>' +
               '<p class="indicador__valor">' + esc(num(k.valor, k.decimais)) +
               (k.unidade ? '<span>' + esc(k.unidade) + '</span>' : '') + '</p>' +
               chip +
               (k.nota ? '<p class="indicador__nota">' + esc(k.nota) + '</p>' : '') +
               '</div>';
      }).join('');
      html += '<div class="indicadores">' + tiles + '</div>';
    }

    if (d.grafico && d.grafico.barras && d.grafico.barras.length) {
      html += '<div class="bloco">' +
              '<h4 class="bloco__titulo">' + esc(d.grafico.titulo || 'Balanço') + '</h4>' +
              '<figure class="grafico">' + rolavel(window.CHARTS.barras(d.grafico)) +
              (d.grafico.legenda
                ? '<figcaption class="grafico__legenda">' + esc(d.grafico.legenda) + '</figcaption>'
                : '') +
              '</figure></div>';
    }

    if (d.notas && d.notas.length) {
      html += '<div class="notas">' + d.notas.map(function (n) {
        return '<p class="nota">' + esc(n) + '</p>';
      }).join('') + '</div>';
    }

    return envolveSecao(id, 4, d, html);
  }

  /* ------------------------------------------------ 7. §5 mercados de destino */

  function secaoMercados(id, d) {
    var colunas = '';
    var fontesRender = null;   // fontes de assets usados na renderização
    var comMapa = false;

    if (d.setores && d.setores.length) {
      // Mesma regra da §1: sem `participacao`, sem número e sem barra.
      var setores = d.setores.map(function (s) {
        var temPart = typeof s.participacao === 'number';
        return '<div class="setor' + (temPart ? '' : ' setor--sem-share') + '">' +
               '<div class="setor__topo">' +
               '<span class="setor__nome">' + esc(s.nome) + '</span>' +
               (temPart
                 ? '<span class="setor__share">' + esc(num(s.participacao, 0)) + '%</span>'
                 : '') +
               '</div>' +
               (temPart
                 ? '<div class="setor__barra" style="--w:' +
                   s.participacao.toFixed(1) + '%"><i></i></div>'
                 : '') +
               (s.descricao ? '<p class="setor__desc">' + esc(s.descricao) + '</p>' : '') +
               '</div>';
      }).join('');
      colunas += '<div><h4 class="bloco__titulo">' +
                 esc(d.tituloSetores || 'Consumo interno por setor') + '</h4>' +
                 '<div class="setores">' + setores + '</div></div>';
    }

    if (d.destinos && d.destinos.length) {
      var maxPart = maiorDe(d.destinos, 'participacao');
      var destinos = d.destinos.map(function (x, i) {
        var largura = ((x.participacao || 0) / maxPart) * 100;
        return '<li class="destino">' +
               '<span class="destino__pos">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span>' +
               '<span class="destino__pais">' + esc(x.nome || x.pais) + '</span>' +
               '<span class="destino__valor">' +
               (typeof x.participacao === 'number' ? esc(num(x.participacao, 0)) + '%' : '') +
               (typeof x.valor === 'number'
                 ? '<small>' + esc(num(x.valor)) + ' ' + esc(x.unidade || '') + '</small>'
                 : '') + '</span>' +
               '<span class="destino__trilha" style="--w:' + largura.toFixed(1) +
               '%"><i></i></span>' +
               '</li>';
      }).join('');
      /* Quando os destinos são UFs — caso dos importados, cuja demanda é que é
         brasileira — a mesma malha do IBGE serve aqui. É por isso que o mapa
         não vive preso à §1. */
      var mapaDestinos = window.CHARTS.mapaBrasil(d.destinos);
      if (mapaDestinos) {
        mapaDestinos = '<figure class="mapa mapa--destinos">' + mapaDestinos +
                       escalaMapa() +
                       (d.legendaMapa
                         ? '<figcaption class="mapa__legenda">' +
                           esc(d.legendaMapa) + '</figcaption>'
                         : '') +
                       '</figure>';
        fontesRender = window.MALHA_UF && window.MALHA_UF.fonte
          ? [window.MALHA_UF.fonte] : null;
        comMapa = true;
      }

      colunas += '<div><h4 class="bloco__titulo">' +
                 esc(d.tituloDestinos || 'Destinos de exportação') + '</h4>' +
                 (mapaDestinos
                   ? '<div class="mercados__geo">' + mapaDestinos +
                     '<ul class="destinos">' + destinos + '</ul></div>'
                   : '<ul class="destinos">' + destinos + '</ul>') +
                 '</div>';
    }

    /* Duas colunas iguais só funcionam quando setores e destinos existem e têm
       altura parecida. Com mapa, a coluna de destinos fica muito mais alta; com
       apenas um dos blocos, a outra coluna fica vazia. Nos dois casos, empilha —
       os setores viram uma faixa de cards. Quem decide é o CSS. */
    var temSetores  = !!(d.setores && d.setores.length);
    var temDestinos = !!(d.destinos && d.destinos.length);
    var empilhado = comMapa || (temSetores !== temDestinos);

    return envolveSecao(id, 5, d,
      '<div class="mercados' + (empilhado ? ' mercados--empilhado' : '') + '">' +
      colunas + '</div>', fontesRender);
  }

  /* ------------------------------------------------- 8. fontes consolidadas */

  /**
   * Fonte da malha do IBGE, se algum mapa foi desenhado neste memorial.
   * O mapa pode estar na §1 (origem em UFs) ou na §5 (demanda em UFs, caso dos
   * importados), então a checagem é feita nos dois lugares.
   */
  function fonteDaMalha(d) {
    if (!window.MALHA_UF || !window.MALHA_UF.fonte) return null;
    var temMapa =
      (d.origem && window.CHARTS.mapaBrasil(d.origem.regioes)) ||
      (d.mercados && window.CHARTS.mapaBrasil(d.mercados.destinos));
    return temMapa ? [window.MALHA_UF.fonte] : null;
  }

  /**
   * Lista completa das fontes do memorial, no fim da página.
   * Repete de propósito o que já aparece no rodapé de cada seção: quem lê uma
   * seção isolada vê a atribuição ali, e quem imprime ou encaminha o material
   * inteiro leva a lista fechada num só lugar.
   */
  function fontesGerais(d, extras) {
    var fontes = juntarFontes(
      d.origem && d.origem.fontes,
      d.processo && d.processo.fontes,
      d.coprodutos && d.coprodutos.fontes,
      d.balanco && d.balanco.fontes,
      d.mercados && d.mercados.fontes,
      extras
    );
    if (!fontes.length) return '';

    // agrupa por instituição, preservando a ordem de aparição
    var ordem = [], porOrg = {};
    fontes.forEach(function (f) {
      if (!porOrg[f.org]) { porOrg[f.org] = []; ordem.push(f.org); }
      porOrg[f.org].push(f);
    });

    var itens = ordem.map(function (org) {
      var series = porOrg[org].map(function (f) {
        var partes = [];
        if (f.serie) partes.push(esc(f.serie));
        if (f.ano) partes.push(esc(f.ano));
        return '<li>' + (partes.length ? partes.join(' · ') : '—') + '</li>';
      }).join('');
      return '<div class="fonte-org">' +
             '<p class="fonte-org__nome">' + esc(org) + '</p>' +
             '<ul class="fonte-org__series">' + series + '</ul></div>';
    }).join('');

    return '<section class="fontes-gerais"><div class="container">' +
           '<p class="eyebrow">Procedência dos dados</p>' +
           '<h4>Fontes citadas neste memorial</h4>' +
           '<div class="fontes-gerais__grade">' + itens + '</div>' +
           '<p class="fontes-gerais__nota">' +
           'Séries de terceiros, sujeitas a revisão pelas próprias entidades ' +
           'emissoras. O ano indicado é o da edição consultada, não ' +
           'necessariamente o da última publicada.' +
           '</p></div></section>';
  }

  /* --------------------------------------------------------------- 9. rodapé */

  function pe(slug, grupos) {
    var atalhos = (grupos || []).filter(function (g) {
      return g.slug !== slug;
    }).map(function (g) {
      var breve = g.status !== 'pronto';
      if (breve) {
        return '<span class="atalho is-breve" aria-disabled="true">' +
               icone(g.icone, '') + esc(g.nome) + ' · em breve</span>';
      }
      return '<a class="atalho" href="#' + esc(g.slug) + '">' +
             icone(g.icone, '') + esc(g.nome) + '</a>';
    }).join('');

    return '<div class="memorial__pe"><div class="container">' +
           '<h4>Outros grupos de produto</h4>' +
           '<div class="atalhos">' + atalhos + '</div>' +
           '</div></div>';
  }

  /* ------------------------------------------------------ 10. montagem final */

  /**
   * Monta o memorial completo.
   * @param {Object} d       objeto de window.MEMORIAIS[slug]
   * @param {Array}  grupos  window.GRUPOS, para os atalhos do rodapé
   * @returns {HTMLElement}
   */
  function memorial(d, grupos) {
    var slug = d.slug;
    var defs = [
      { chave: 'origem',     fn: secaoOrigem },
      { chave: 'processo',   fn: secaoProcesso },
      { chave: 'coprodutos', fn: secaoCoprodutos },
      { chave: 'balanco',    fn: secaoBalanco },
      { chave: 'mercados',   fn: secaoMercados }
    ];

    var indice = [];
    var secoes = '';

    defs.forEach(function (def) {
      var bloco = d[def.chave];
      if (!bloco) return;
      var id = slug + '-' + def.chave;
      indice.push({ id: id, titulo: bloco.titulo });
      secoes += def.fn(id, bloco);
    });

    var html = '<article class="memorial" id="memorial-' + esc(slug) + '" ' +
               'data-slug="' + esc(slug) + '">' +
               capa(d) +
               '<div class="container memorial__corpo">' +
               navSecoes(slug, indice) +
               '<div class="memorial__secoes">' + secoes + '</div>' +
               '</div>' +
               fontesGerais(d, fonteDaMalha(d)) +
               pe(slug, grupos) +
               '</article>';

    return elemento(html);
  }

  /* --------------------------------------------------------- 11. card do hub */

  var SETA = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" ' +
             'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
             'aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  /**
   * Card de um grupo no hub.
   * Grupos com status diferente de 'pronto' viram card não navegável.
   */
  function cardHub(g) {
    var breve = g.status !== 'pronto';
    var tag = breve ? 'div' : 'a';
    var attrs = breve
      ? ' aria-disabled="true"'
      : ' href="#' + esc(g.slug) + '" data-slug="' + esc(g.slug) + '"';

    var html = '<' + tag + ' class="card' + (breve ? ' is-breve' : '') + '"' + attrs + '>' +
               '<div class="card__icone">' + icone(g.icone, '') + '</div>' +
               '<div>' +
               '<h3 class="card__nome">' + esc(g.nome) + '</h3>' +
               '<p class="card__desc">' + esc(g.descricao) + '</p>' +
               '</div>' +
               '<div class="card__rodape">' +
               '<span class="card__chip">' + esc(breve ? 'Em breve' : (g.chip || '')) + '</span>' +
               '<span class="card__seta" aria-hidden="true">' + SETA + '</span>' +
               '</div>' +
               '</' + tag + '>';

    return elemento(html);
  }

  window.RENDER = { memorial: memorial, cardHub: cardHub };
})();

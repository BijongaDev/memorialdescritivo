/* =========================================================================
   app.js — roteamento por hash, troca de view, scroll reveal

   Fluxo:
     1. Monta os cards do hub a partir de window.GRUPOS.
     2. Lê location.hash e decide a view. Sem hash (ou #hub) -> hub.
     3. O memorial de um grupo só é montado no DOM quando visitado pela
        primeira vez; depois fica em cache e é apenas mostrado/escondido.
     4. Por memorial visitado, instala os observers de scroll reveal e de
        seção ativa na nav lateral.

   Sem fetch(), sem build: a página funciona aberta direto do disco.
   ========================================================================= */

(function () {
  'use strict';

  var TRANSICAO = 250;   // ms — deve casar com --t-base no CSS

  var reduzido = window.matchMedia &&
                 window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var el = {
    body:      document.body,
    hub:       document.getElementById('view-hub'),
    memorial:  document.getElementById('view-memorial'),
    grade:     document.getElementById('grade-cards'),
    contagem:  document.getElementById('contagem-grupos'),
    titulo:    document.getElementById('topo-titulo'),
    voltar:    document.getElementById('btn-voltar'),
    progresso: document.getElementById('progresso-barra')
  };

  var grupos = window.GRUPOS || [];
  var memoriais = window.MEMORIAIS || {};
  var montados = {};        // slug -> { raiz, secoes, nav }
  var atual = null;         // slug do memorial visível, ou null no hub
  var scrollHub = 0;

  /* ------------------------------------------------------------- utilidades */

  function porSlug(slug) {
    for (var i = 0; i < grupos.length; i++) {
      if (grupos[i].slug === slug) return grupos[i];
    }
    return null;
  }

  /** Um slug só é navegável se está marcado como pronto E tem dados. */
  function disponivel(slug) {
    var g = porSlug(slug);
    return !!(g && g.status === 'pronto' && memoriais[slug]);
  }

  function slugDoHash() {
    var h = (location.hash || '').replace(/^#\/?/, '').trim();
    return h === 'hub' ? '' : h;
  }

  function irPara(y) {
    window.scrollTo(reduzido ? { top: y } : { top: y, behavior: 'auto' });
  }

  /* ------------------------------------------------------------ 1. hub */

  function montarHub() {
    if (!el.grade) return;
    var prontos = 0;

    grupos.forEach(function (g) {
      if (g.status === 'pronto') prontos++;
      el.grade.appendChild(window.RENDER.cardHub(g));
    });

    if (el.contagem) {
      el.contagem.textContent = grupos.length + ' grupos · ' + prontos +
        (prontos === 1 ? ' memorial publicado' : ' memoriais publicados');
    }
  }

  /* --------------------------------------------------- 2. observers do memorial */

  /** Marca um bloco como visível e o retira da lista de pendentes. */
  function revelar(n, ficha) {
    n.classList.add('is-visivel');
    if (ficha.obsRevelar) ficha.obsRevelar.unobserve(n);
    var i = ficha.pendentes.indexOf(n);
    if (i > -1) ficha.pendentes.splice(i, 1);
  }

  /** Fade + translate de entrada dos blocos. */
  function observarRevelar(ficha) {
    var alvos = Array.prototype.slice.call(ficha.raiz.querySelectorAll('.revelar'));
    ficha.pendentes = alvos;

    // Sem animação de entrada: mostra tudo de uma vez.
    if (reduzido || !('IntersectionObserver' in window)) {
      alvos.forEach(function (n) { n.classList.add('is-visivel'); });
      ficha.pendentes = [];
      return;
    }

    ficha.obsRevelar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) revelar(e.target, ficha);
      });
      // threshold 0 (e não uma fração da área) porque os blocos de seção são
      // bem mais altos que a viewport: uma razão de interseção mínima poderia
      // nunca ser atingida em telas baixas.
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

    alvos.forEach(function (n) { ficha.obsRevelar.observe(n); });
  }

  /**
   * Rede de segurança do scroll reveal.
   *
   * Um salto instantâneo de posição — âncora de seção com rolagem suave
   * desativada, restauração de scroll pelo navegador, redimensionamento — pode
   * pular um bloco inteiro: ele vai de "abaixo da viewport" para "acima da
   * viewport" sem nunca intersectar, e o observer não emite evento algum
   * (isIntersecting continua false). O bloco ficaria invisível para sempre.
   * Esta varredura, chamada junto da barra de progresso, revela qualquer
   * pendente que já tenha passado pela dobra.
   */
  function varrerPendentes() {
    if (atual === null) return;
    var ficha = montados[atual];
    if (!ficha || !ficha.pendentes || !ficha.pendentes.length) return;

    var limite = window.innerHeight;
    ficha.pendentes.slice().forEach(function (n) {
      if (n.getBoundingClientRect().top < limite) revelar(n, ficha);
    });
  }

  /** Marca na nav lateral a seção que está sendo lida. */
  function observarSecoes(ficha) {
    var secoes = ficha.secoes;
    var links = ficha.links;

    function marcar(id) {
      Array.prototype.forEach.call(links, function (a) {
        var ativo = a.getAttribute('data-alvo') === id;
        if (ativo) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    if (!secoes.length) return;
    marcar(secoes[0].id);

    if (!('IntersectionObserver' in window)) return;

    var visiveis = {};
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        visiveis[e.target.id] = e.isIntersecting;
      });
      // a seção ativa é a primeira, na ordem do documento, que está na faixa
      for (var i = 0; i < secoes.length; i++) {
        if (visiveis[secoes[i].id]) { marcar(secoes[i].id); return; }
      }
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });

    Array.prototype.forEach.call(secoes, function (s) { obs.observe(s); });
  }

  /* -------------------------------------------------- 3. montagem sob demanda */

  function garantirMemorial(slug) {
    if (montados[slug]) return montados[slug];

    var raiz = window.RENDER.memorial(memoriais[slug], grupos);
    el.memorial.appendChild(raiz);

    var ficha = {
      raiz: raiz,
      secoes: raiz.querySelectorAll('.secao'),
      links: raiz.querySelectorAll('.secnav__link')
    };

    // clique na nav lateral: rola até a seção sem alterar o hash
    Array.prototype.forEach.call(ficha.links, function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var alvo = document.getElementById(a.getAttribute('data-alvo'));
        if (!alvo) return;
        alvo.scrollIntoView({
          behavior: reduzido ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });

    observarRevelar(ficha);
    observarSecoes(ficha);

    montados[slug] = ficha;
    return ficha;
  }

  /* ------------------------------------------------------ 4. troca de view */

  function mostrarHub() {
    if (atual === null) return;

    var anterior = montados[atual];
    atual = null;

    el.memorial.classList.add('is-saindo');
    setTimeout(function () {
      el.memorial.classList.remove('is-ativa', 'is-saindo');
      if (anterior) anterior.raiz.classList.remove('is-ativo');

      el.hub.classList.add('is-ativa');
      el.body.setAttribute('data-view', 'hub');
      el.titulo.textContent = '';
      if (el.progresso) el.progresso.style.width = '0%';
      irPara(scrollHub);
    }, reduzido ? 0 : TRANSICAO);
  }

  function mostrarMemorial(slug) {
    if (atual === slug) return;

    var ficha = garantirMemorial(slug);
    var g = porSlug(slug);

    if (atual === null) scrollHub = window.pageYOffset || 0;

    var anterior = atual ? montados[atual] : null;
    var deHub = atual === null;
    atual = slug;

    function aplicar() {
      if (deHub) el.hub.classList.remove('is-ativa', 'is-saindo');
      if (anterior) anterior.raiz.classList.remove('is-ativo');

      ficha.raiz.classList.add('is-ativo');
      el.memorial.classList.add('is-ativa');
      el.memorial.classList.remove('is-saindo');
      el.body.setAttribute('data-view', 'memorial');
      el.titulo.textContent = g ? g.nome : '';
      irPara(0);
      atualizarProgresso();
    }

    if (reduzido) { aplicar(); return; }

    if (deHub) el.hub.classList.add('is-saindo');
    else el.memorial.classList.add('is-saindo');
    setTimeout(aplicar, TRANSICAO);
  }

  /* ------------------------------------------------------- 5. roteamento */

  function rotear() {
    var slug = slugDoHash();

    if (!slug) { mostrarHub(); return; }

    if (!disponivel(slug)) {
      // hash inválido ou grupo ainda sem memorial: volta ao hub sem erro
      if (location.hash) location.replace('#hub');
      mostrarHub();
      return;
    }

    mostrarMemorial(slug);
  }

  /* ------------------------------------------- 6. barra de progresso de leitura */

  function atualizarProgresso() {
    if (!el.progresso) return;
    if (atual === null) { el.progresso.style.width = '0%'; return; }

    var raiz = montados[atual].raiz;
    var altura = raiz.offsetHeight - window.innerHeight;
    var y = (window.pageYOffset || 0) - raiz.offsetTop;
    var pct = altura > 0 ? (y / altura) * 100 : 0;
    el.progresso.style.width = Math.max(0, Math.min(100, pct)).toFixed(1) + '%';
  }

  /* ---------------------------------------------------------- 7. eventos */

  function ligarEventos() {
    window.addEventListener('hashchange', rotear);

    el.voltar.addEventListener('click', function () {
      if (location.hash && location.hash !== '#hub') location.hash = 'hub';
      else { location.replace('#hub'); rotear(); }
    });

    // ESC também volta ao hub
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && atual !== null) {
        location.hash = 'hub';
      }
    });

    var agendado = false;
    window.addEventListener('scroll', function () {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(function () {
        atualizarProgresso();
        varrerPendentes();
        agendado = false;
      });
    }, { passive: true });

    window.addEventListener('resize', function () {
      atualizarProgresso();
      varrerPendentes();
    });
  }

  /* ------------------------------------------------------------- 8. início */

  function iniciar() {
    if (!el.hub || !el.memorial) return;
    montarHub();
    ligarEventos();
    el.body.setAttribute('data-view', 'hub');
    el.hub.classList.add('is-ativa');
    atual = null;

    var slug = slugDoHash();
    if (slug && disponivel(slug)) {
      // entrada por link direto: sem animação de saída do hub
      var ficha = garantirMemorial(slug);
      el.hub.classList.remove('is-ativa');
      ficha.raiz.classList.add('is-ativo');
      el.memorial.classList.add('is-ativa');
      el.body.setAttribute('data-view', 'memorial');
      var g = porSlug(slug);
      el.titulo.textContent = g ? g.nome : '';
      atual = slug;
      atualizarProgresso();
    } else if (slug) {
      location.replace('#hub');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

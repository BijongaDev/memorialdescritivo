/* =========================================================================
   MEMORIAL DESCRITIVO — DERIVADOS
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Números compilados de publicações públicas de ANP, Comex Stat e ABIQUIM.
   Servem como conteúdo de referência: antes de uso comercial, cada valor deve
   ser conferido contra a última edição da série citada em `fontes`.

   Três pontos merecem atenção do time comercial:
     • a capacidade de refino por estado (§1) é dado firme da ANP, mas as
       refinarias privadas menores estão agregadas em "demais estados";
     • o rendimento do barril (§3) é média do parque nacional. Cada refinaria
       tem perfil próprio, e o corte de especialidades varia muito conforme a
       unidade tenha ou não reforma catalítica e desasfaltação;
     • a divisão do consumo por setor (§5) e a distribuição por estado são as
       estimativas mais frágeis do arquivo — não há série pública que separe
       solventes, bases lubrificantes e aromáticos por uso final. O texto da
       seção diz isso ao leitor, e precisa continuar dizendo.

   Escopo: este grupo é a fatia fina do barril — solventes, bases
   lubrificantes e aromáticos — e não os combustíveis de grande volume.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['derivados'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'derivados',
  nome: 'Derivados',
  subtitulo: 'Grupo de produto · Derivados de petróleo e petroquímicos',
  icone: 'derivados',
  resumo:
    'Este grupo não é o combustível que move o caminhão: é a fatia fina e de ' +
    'maior valor unitário do barril. Solventes, bases lubrificantes e ' +
    'aromáticos somam menos de um décimo do que sai de uma refinaria, mas é ' +
    'neles que estão a especificação apertada, a segregação de linha e o preço ' +
    'por tonelada que justificam tancagem dedicada. Um deles fecha um círculo ' +
    'no próprio terminal: o hexano que extrai o óleo de soja.',

  destaques: [
    { valor: 2.28, unidade: 'mi b/d', rotulo: 'Capacidade instalada de refino no Brasil', decimais: 2 },
    { valor: 1.8,  unidade: 'mi b/d', rotulo: 'Carga de petróleo processada em 2024', decimais: 1 },
    { valor: 8,    unidade: '%',      rotulo: 'Do barril vira lubrificante, solvente ou asfalto', decimais: 0 },
    { valor: 9.1,  unidade: '%',      rotulo: 'Da capacidade nacional está no Paraná', decimais: 1 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'A matéria-prima é petróleo, e nisso o Brasil tem folga: o pré-sal das ' +
      'bacias de Santos e Campos fez do país um dos maiores produtores do mundo. ' +
      'O gargalo está uma etapa depois. A capacidade de refino praticamente não ' +
      'cresceu junto com a produção, então o país exporta cru e importa derivado. ' +
      'Para as especialidades deste grupo a dependência é ainda maior: bases ' +
      'lubrificantes dos grupos II e III quase não são produzidas no Brasil. O ' +
      'mapa mostra onde está o parque de refino — e por que o Paraná pesa aqui, ' +
      'com a refinaria de Araucária a pouco mais de 100 km do cais.',

    regioes: [
      {
        nome: 'São Paulo', uf: 'SP',
        valor: 665, unidade: 'mil b/d', participacao: 29.2,
        detalhe: 'Maior concentração do país: Paulínia, Cubatão e Capuava. ' +
                 'Paulínia é a maior refinaria brasileira e o centro da malha de ' +
                 'dutos que abastece o Sudeste.'
      },
      {
        nome: 'Bahia', uf: 'BA',
        valor: 302, unidade: 'mil b/d', participacao: 13.2,
        detalhe: 'Refinaria de Mataripe, primeira do país e hoje sob controle ' +
                 'privado. Integrada ao polo petroquímico de Camaçari.'
      },
      {
        nome: 'Rio de Janeiro', uf: 'RJ',
        valor: 253, unidade: 'mil b/d', participacao: 11.1,
        detalhe: 'Duque de Caxias, com unidade de lubrificantes — uma das duas ' +
                 'fontes nacionais de bases do grupo I.'
      },
      {
        nome: 'Rio Grande do Sul', uf: 'RS',
        valor: 225, unidade: 'mil b/d', participacao: 9.9,
        detalhe: 'Canoas, mais a refinaria independente de Rio Grande. Abastece ' +
                 'o Sul junto com o Paraná.'
      },
      {
        nome: 'Paraná', uf: 'PR',
        valor: 208, unidade: 'mil b/d', participacao: 9.1,
        detalhe: 'Araucária, na região metropolitana de Curitiba, ligada a ' +
                 'Paranaguá por duto e rodovia. É a referência de suprimento e de ' +
                 'preço para o Sul.'
      },
      {
        nome: 'Minas Gerais', uf: 'MG',
        valor: 166, unidade: 'mil b/d', participacao: 7.3,
        detalhe: 'Betim, na Grande Belo Horizonte, voltada ao mercado interno de ' +
                 'combustíveis e asfalto.'
      },
      {
        nome: 'Pernambuco', uf: 'PE',
        valor: 130, unidade: 'mil b/d', participacao: 5.7,
        detalhe: 'Abreu e Lima, no complexo de Suape, operando com um trem de ' +
                 'refino dos dois projetados.'
      },
      {
        nome: 'Demais estados', uf: 'BR',
        valor: 330, unidade: 'mil b/d', participacao: 14.5,
        detalhe: 'Amazonas, Ceará, Sergipe, Rio Grande do Norte e refinarias ' +
                 'privadas de menor porte. Inclui a unidade de Fortaleza, ' +
                 'especializada em bases lubrificantes e asfalto.'
      }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a capacidade ' +
      'instalada de refino do estado, não o consumo.',

    fontes: [
      { org: 'ANP', serie: 'Capacidade de refino por refinaria e UF', ano: '2024' },
      { org: 'ANP', serie: 'Boletim mensal de produção de petróleo e gás natural', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'Refino é, na origem, separação por temperatura de ebulição: a torre ' +
      'atmosférica corta o petróleo em faixas e cada faixa vira um produto ' +
      'diferente. O que distingue as especialidades deste grupo é o que vem ' +
      'depois do corte. Aromáticos nascem de uma reação, não de uma separação. ' +
      'Bases lubrificantes exigem duas etapas de acabamento que a maioria das ' +
      'refinarias brasileiras não tem. E solvente é essencialmente um corte ' +
      'estreito, definido por uma faixa de destilação de poucos graus.',

    etapas: [
      {
        nome: 'Dessalgação',
        descricao:
          'O petróleo é lavado e desidratado para retirar sais e água emulsionada. ' +
          'Cloretos que passam desta etapa hidrolisam no aquecimento e geram ácido ' +
          'clorídrico, que corrói o topo das torres.',
        parametros: [
          { rotulo: 'Sal residual', valor: '< 5 ptb' },
          { rotulo: 'Água', valor: '< 0,2%' }
        ]
      },
      {
        nome: 'Destilação atmosférica',
        descricao:
          'A carga aquecida entra na torre e se separa por faixa de ebulição: ' +
          'gases e GLP no topo, depois nafta, querosene, diesel, e o resíduo ' +
          'atmosférico no fundo. É o corte que define o que cada refinaria pode ' +
          'produzir.',
        parametros: [
          { rotulo: 'Temperatura de entrada', valor: '340–380 °C' },
          { rotulo: 'Pressão', valor: 'quase atmosférica' }
        ],
        marco: true
      },
      {
        nome: 'Destilação a vácuo',
        descricao:
          'O resíduo atmosférico é redestilado sob vácuo, o que permite separar ' +
          'frações pesadas sem craquear a molécula pelo calor. Daqui saem os ' +
          'gasóleos e o resíduo de vácuo que vira asfalto.',
        parametros: [
          { rotulo: 'Pressão', valor: '20–70 mmHg' },
          { rotulo: 'Saída', valor: 'gasóleos e resíduo' }
        ]
      },
      {
        nome: 'Reforma catalítica',
        descricao:
          'A nafta passa sobre catalisador de platina e se reorganiza em compostos ' +
          'aromáticos — benzeno, tolueno e xilenos. É a origem dos aromáticos e, ' +
          'como subproduto, do hidrogênio que abastece o hidrotratamento.',
        parametros: [
          { rotulo: 'Temperatura', valor: '480–530 °C' },
          { rotulo: 'Catalisador', valor: 'platina-rênio' },
          { rotulo: 'Produto', valor: 'BTX + hidrogênio' }
        ],
        marco: true
      },
      {
        nome: 'Hidrotratamento',
        descricao:
          'Sob hidrogênio e pressão, o produto perde enxofre, nitrogênio e ' +
          'insaturados. É esta etapa que define solvente de baixo odor, ' +
          'estabilidade à oxidação e cor — atributos que o cliente especifica em ' +
          'contrato.',
        parametros: [
          { rotulo: 'Pressão', valor: '30–80 bar' },
          { rotulo: 'Enxofre no produto', valor: '< 10 ppm' }
        ]
      },
      {
        nome: 'Acabamento de bases',
        descricao:
          'Desasfaltação, desparafinação e hidroacabamento ajustam índice de ' +
          'viscosidade e ponto de fluidez das bases lubrificantes. Poucas ' +
          'refinarias no Brasil têm este trem completo, e nenhuma produz base do ' +
          'grupo II em escala.',
        parametros: [
          { rotulo: 'Grupo I nacional', valor: 'IV 80–95' },
          { rotulo: 'Grupo II importado', valor: 'IV ≥ 120' }
        ]
      },
      {
        nome: 'Fracionamento e embarque',
        descricao:
          'Solventes são cortes estreitos, definidos por faixa de destilação ' +
          'inicial e final. Depois de fracionado, cada produto vai a tanque ' +
          'dedicado com linha segregada — contaminação cruzada aqui não se ' +
          'corrige, se descarta.',
        parametros: [
          { rotulo: 'Hexano comercial', valor: '63–70 °C' },
          { rotulo: 'Aguarrás', valor: '150–200 °C' },
          { rotulo: 'Classe de risco', valor: '3 — inflamável' }
        ]
      }
    ],
    fontes: [
      { org: 'ANP', serie: 'Especificação de solventes e óleos básicos', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Processos da indústria petroquímica', ano: '2023' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'Aqui a lógica se inverte em relação aos outros grupos do terminal. No óleo ' +
      'vegetal, o produto movimentado é uma fatia grande do que entra na ' +
      'indústria. No refino, o que a Cattalini movimenta neste grupo é a fatia ' +
      'fina: lubrificantes, solventes e asfalto somados ficam em torno de 8% do ' +
      'barril. Todo o resto — diesel, gasolina, óleo combustível — é volume que ' +
      'segue por outros modais e outras estruturas. Vale ler o balanço abaixo de ' +
      'baixo para cima.',

    rendimento: {
      base: 'Para cada 100 litros de petróleo processado',
      entrada: { valor: 100, rotulo: 'litros de petróleo' },
      saidas: [
        { nome: 'Diesel',                       percentual: 38, unidade: 'L', cor: 'var(--serie-2)' },
        { nome: 'Gasolina',                     percentual: 22, unidade: 'L', cor: 'var(--serie-3)' },
        { nome: 'Nafta, QAV e GLP',             percentual: 16, unidade: 'L', cor: 'var(--serie-5)' },
        { nome: 'Óleo combustível e coque',     percentual: 12, unidade: 'L', cor: 'var(--navy-800)' },
        { nome: 'Lubrificantes, solventes e asfalto', percentual: 8, unidade: 'L', cor: 'var(--serie-4)' },
        { nome: 'Perdas e consumo próprio',     percentual: 4,  unidade: 'L', cor: 'var(--amarelo-700)' }
      ]
    },

    itens: [
      {
        nome: 'Aromáticos (BTX)',
        share: 'reforma',
        descricao:
          'Benzeno, tolueno e xilenos, saídos da reforma catalítica e das centrais ' +
          'petroquímicas. Cadeia curta e de alto valor: viram resinas, poliéster, ' +
          'borracha sintética e solventes de evaporação rápida.',
        destino: 'Indústria química, fibras têxteis, tintas e adesivos.'
      },
      {
        nome: 'Bases lubrificantes',
        share: 'grupos I a III',
        descricao:
          'O Brasil produz base do grupo I em duas unidades e importa praticamente ' +
          'todo o grupo II e III. Como a especificação automotiva caminha para ' +
          'óleos mais leves e estáveis, a demanda migra justamente para o que não ' +
          'se produz aqui.',
        destino: 'Formuladores de lubrificante acabado, automotivo e industrial.'
      },
      {
        nome: 'Solventes alifáticos',
        share: 'corte estreito',
        descricao:
          'Hexano, aguarrás e solvente de borracha. O hexano fecha um círculo no ' +
          'próprio terminal: é o solvente que extrai o óleo da soja no grupo de ' +
          'Óleo Vegetal — o mesmo cais abastece o insumo e recebe o produto.',
        destino: 'Extração de óleo vegetal, tintas, colas, borracha e limpeza industrial.'
      },
      {
        nome: 'Asfalto (CAP)',
        share: 'resíduo de vácuo',
        descricao:
          'O fundo da torre de vácuo. Sólido à temperatura ambiente, movimentado ' +
          'apenas aquecido — o que o coloca junto do grupo de Aquecidos em termos ' +
          'de exigência de tancagem e serpentina.',
        destino: 'Pavimentação rodoviária, impermeabilizantes e construção.'
      },
      {
        nome: 'Coque de petróleo',
        share: 'fundo de barril',
        descricao:
          'Sólido carbonoso do coqueamento retardado, de alto poder calorífico e ' +
          'alto teor de enxofre.',
        destino: 'Combustível de cimenteiras e indústria de calcinação.'
      },
      {
        nome: 'Enxofre',
        share: 'hidrotratamento',
        descricao:
          'Recuperado do gás ácido gerado no hidrotratamento, em unidades Claus. ' +
          'Subproduto obrigatório de qualquer refinaria que produza combustível de ' +
          'baixo teor de enxofre.',
        destino: 'Ácido sulfúrico e indústria de fertilizantes.'
      }
    ],
    fontes: [
      { org: 'ANP', serie: 'Produção de derivados por refinaria — rendimento médio', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Anuário da indústria química brasileira', ano: '2024' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'O balanço dos derivados brasileiros tem uma assimetria que explica quase ' +
      'todo o fluxo de importação nos terminais: o país produz mais petróleo do ' +
      'que consegue refinar, e consome mais derivado do que produz. Exporta cru ' +
      'de alta qualidade e importa produto acabado — em especial diesel e as ' +
      'especialidades deste grupo. Enquanto essa distância não fechar, a ' +
      'importação de derivados é estrutural, não conjuntural.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Produção de petróleo',
        valor: 3.4, unidade: 'mi b/d', decimais: 1, cor: 'var(--serie-1)',
        nota: 'Recorde histórico, puxado pelo pré-sal da Bacia de Santos.'
      },
      {
        rotulo: 'Capacidade de refino',
        valor: 2.28, unidade: 'mi b/d', decimais: 2, cor: 'var(--serie-2)',
        nota: 'Praticamente estável há mais de uma década.'
      },
      {
        rotulo: 'Carga processada',
        valor: 1.8, unidade: 'mi b/d', decimais: 1, cor: 'var(--serie-3)',
        nota: 'Cerca de 79% da capacidade instalada.'
      },
      {
        rotulo: 'Importação de derivados',
        valor: 0.6, unidade: 'mi b/d', decimais: 1, cor: 'var(--serie-4)',
        nota: 'Majoritariamente diesel, mais bases lubrificantes e solventes.'
      }
    ],

    grafico: {
      titulo: 'Petróleo e derivados no Brasil',
      unidade: 'milhões de b/d',
      decimais: 2,
      barras: [
        { rotulo: 'Produção de petróleo',   valor: 3.40, cor: 'var(--serie-1)' },
        { rotulo: 'Capacidade de refino',   valor: 2.28, cor: 'var(--serie-2)' },
        { rotulo: 'Carga processada',       valor: 1.80, cor: 'var(--serie-3)' },
        { rotulo: 'Exportação de petróleo', valor: 1.70, cor: 'var(--serie-5)' },
        { rotulo: 'Importação de derivados', valor: 0.60, cor: 'var(--serie-4)' }
      ],
      legenda:
        'A distância entre produção de petróleo e carga processada é o que o país ' +
        'exporta como cru; a importação de derivados é o outro lado da mesma ' +
        'conta. Valores em milhões de barris por dia.'
    },

    notas: [
      'A capacidade de refino brasileira ficou parada enquanto a produção de ' +
      'petróleo triplicou. É a razão estrutural do fluxo de importação de ' +
      'derivados nos terminais de granel líquido — e não depende de safra, ' +
      'câmbio ou ciclo curto para se manter.',
      'Bases lubrificantes dos grupos II e III praticamente não são produzidas no ' +
      'país. A oferta nacional é de grupo I, e a evolução das especificações ' +
      'automotivas empurra a demanda exatamente na direção do que é importado.',
      'Solventes seguem a atividade das cadeias que abastecem, não o preço do ' +
      'petróleo: a demanda de hexano acompanha o processamento de soja, e a de ' +
      'aguarrás acompanha construção e tintas.'
    ],
    fontes: [
      { org: 'ANP', serie: 'Boletim mensal de produção de petróleo e gás natural', ano: '2024' },
      { org: 'ANP', serie: 'Dados estatísticos — refino e importação de derivados', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 2710 (óleos de petróleo)', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'As especialidades deste grupo não vão para o posto de combustível: vão ' +
      'para dentro de outra indústria, como insumo. A divisão por setor abaixo é ' +
      'estimativa — não há série pública que separe solventes, bases ' +
      'lubrificantes e aromáticos por uso final. O mapa também não mede consumo ' +
      'de derivado: mostra onde está o faturamento da indústria química ' +
      'brasileira, o melhor indicador público de onde essa demanda se concentra. ' +
      'Somando Rio Grande do Sul, Paraná e Santa Catarina, cerca de um quarto ' +
      'dela está na área natural de Paranaguá.',

    tituloSetores: 'Consumo por setor',
    tituloDestinos: 'Onde está a demanda — indústria química por estado',

    setores: [
      {
        nome: 'Indústria química e resinas',
        participacao: 32,
        descricao: 'Aromáticos como matéria-prima de resinas, poliéster, borracha ' +
                   'sintética e intermediários.'
      },
      {
        nome: 'Lubrificantes acabados',
        participacao: 26,
        descricao: 'Bases minerais formuladas com aditivos para uso automotivo e ' +
                   'industrial.'
      },
      {
        nome: 'Extração de óleo vegetal',
        participacao: 18,
        descricao: 'Hexano como solvente de extração no processamento de soja — ' +
                   'liga direta com o grupo de Óleo Vegetal.'
      },
      {
        nome: 'Tintas, adesivos e limpeza',
        participacao: 14,
        descricao: 'Aguarrás, xileno e tolueno como veículo e diluente.'
      },
      {
        nome: 'Asfalto e construção',
        participacao: 10,
        descricao: 'Cimento asfáltico para pavimentação e impermeabilização, ' +
                   'movimentado aquecido.'
      }
    ],

    destinos: [
      { nome: 'São Paulo',          uf: 'SP', participacao: 40 },
      { nome: 'Rio Grande do Sul',  uf: 'RS', participacao: 12 },
      { nome: 'Bahia',              uf: 'BA', participacao: 11 },
      { nome: 'Rio de Janeiro',     uf: 'RJ', participacao: 9 },
      { nome: 'Paraná',             uf: 'PR', participacao: 7 },
      { nome: 'Minas Gerais',       uf: 'MG', participacao: 6 },
      { nome: 'Santa Catarina',     uf: 'SC', participacao: 4 },
      { nome: 'Demais estados',     uf: 'BR', participacao: 11 }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a distribuição ' +
      'regional do faturamento da indústria química — proxy de onde os derivados ' +
      'são consumidos, não medida direta.',

    fontes: [
      { org: 'ABIQUIM', serie: 'Distribuição regional do faturamento da indústria química', ano: '2024' },
      { org: 'ANP', serie: 'Vendas de solventes e óleos lubrificantes por segmento — estimativa', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 2710 (óleos de petróleo)', ano: '2024' }
    ]
  }
};

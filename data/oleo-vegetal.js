/* =========================================================================
   MEMORIAL DESCRITIVO — ÓLEO VEGETAL
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Os números abaixo foram compilados de publicações públicas de ABIOVE, CONAB,
   ANP e Comex Stat e servem como conteúdo de referência do template. Antes de
   uso comercial junto a clientes, cada valor deve ser conferido contra a
   última edição da série citada em `fontes` e o ano atualizado.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['oleo-vegetal'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'oleo-vegetal',
  nome: 'Óleo Vegetal',
  subtitulo: 'Grupo de produto · Granéis líquidos vegetais',
  icone: 'oleo-vegetal',
  resumo:
    'O óleo vegetal movimentado em Paranaguá nasce quase todo de um grão: a soja. ' +
    'O Brasil é o maior produtor mundial e processa internamente pouco mais de um ' +
    'terço da safra, gerando óleo bruto, óleo degomado, óleo refinado e um volume ' +
    'muito maior de farelo proteico. Ao lado da soja, o grupo reúne o óleo de palma ' +
    'importado — que exige tancagem aquecida — e volumes menores de girassol, ' +
    'canola e óleo de milho.',

  destaques: [
    { valor: 147.4, unidade: 'Mt', rotulo: 'Safra brasileira de soja 2023/24' },
    { valor: 54.6,  unidade: 'Mt', rotulo: 'Soja processada no país em 2024' },
    { valor: 11.0,  unidade: 'Mt', rotulo: 'Óleo de soja produzido em 2024', decimais: 1 },
    { valor: 1.3,   unidade: 'Mt', rotulo: 'Óleo de soja exportado em 2024' }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'A soja brasileira vem de duas fronteiras muito distintas. No Centro-Oeste e ' +
      'no Matopiba a lavoura é de escala, com colheita a partir de janeiro e ' +
      'segunda safra de milho na sequência. No Sul, a produção é mais pulverizada, ' +
      'colhida entre fevereiro e abril, e é ela que abastece a maior parte das ' +
      'indústrias de processamento ligadas ao Porto de Paranaguá.',

    regioes: [
      {
        nome: 'Mato Grosso', uf: 'MT',
        valor: 39.4, unidade: 'Mt', participacao: 26.7,
        detalhe: 'Maior produtor nacional. Escoa por Paranaguá, Santos e pelo Arco Norte, ' +
                 'com forte industrialização local voltada a farelo e biodiesel.',
        mapa: { x: 47.2, y: 45.5 }
      },
      {
        nome: 'Rio Grande do Sul', uf: 'RS',
        valor: 21.9, unidade: 'Mt', participacao: 14.9,
        detalhe: 'Produção altamente sensível a estiagem. Abastece o parque de crush gaúcho ' +
                 'e embarca por Rio Grande.',
        mapa: { x: 52.0, y: 86.8 }
      },
      {
        nome: 'Paraná', uf: 'PR',
        valor: 19.4, unidade: 'Mt', participacao: 13.2,
        detalhe: 'Hinterlândia natural de Paranaguá. Concentra cooperativas com ' +
                 'processamento e refino próprios, a menos de 600 km do cais.',
        mapa: { x: 56.1, y: 76.3 }
      },
      {
        nome: 'Goiás', uf: 'GO',
        valor: 18.6, unidade: 'Mt', participacao: 12.6,
        detalhe: 'Polo de crush integrado a biodiesel e a nutrição animal do Sudeste.',
        mapa: { x: 62.5, y: 54.5 }
      },
      {
        nome: 'Mato Grosso do Sul', uf: 'MS',
        valor: 13.7, unidade: 'Mt', participacao: 9.3,
        detalhe: 'Ligado a Paranaguá por rodovia e pela malha ferroviária de bitola métrica.',
        mapa: { x: 49.8, y: 68.6 }
      },
      {
        nome: 'Bahia', uf: 'BA',
        valor: 8.1, unidade: 'Mt', participacao: 5.5,
        detalhe: 'Núcleo do Matopiba no oeste do estado, com escoamento por Ilhéus e Salvador.',
        mapa: { x: 74.0, y: 44.8 }
      },
      {
        nome: 'Demais estados', uf: 'BR',
        valor: 26.3, unidade: 'Mt', participacao: 17.8,
        detalhe: 'Minas Gerais, Tocantins, Maranhão, Piauí, São Paulo, Santa Catarina ' +
                 'e Rondônia, entre outros.'
      }
    ],
    legendaMapa:
      'Mapa esquemático. Os pontos indicam os principais estados produtores de soja; ' +
      'o tamanho não é proporcional ao volume.',
    fontes: [
      { org: 'CONAB', serie: 'Levantamento de Safra — grãos', ano: '2023/24' },
      { org: 'ABIOVE', serie: 'Complexo Soja — estatística mensal', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'O grão de soja não é prensado para dar óleo: ele é laminado e lavado com ' +
      'hexano, que dissolve a fração oleosa e é depois integralmente recuperado. ' +
      'Da extração saem dois produtos simultâneos — óleo bruto e farelo — e é o ' +
      'refino que define se o óleo segue a granel como degomado ou vai embalado ' +
      'como óleo de mesa.',

    etapas: [
      {
        nome: 'Recepção',
        descricao:
          'O grão chega por rodovia e ferrovia, é classificado, pesado e passa por ' +
          'peneiras e secadores. A umidade é ajustada para permitir armazenagem longa ' +
          'sem aquecimento espontâneo.',
        parametros: [
          { rotulo: 'Umidade de armazenagem', valor: '11–13%' },
          { rotulo: 'Impureza máxima', valor: '1%' }
        ]
      },
      {
        nome: 'Preparação',
        descricao:
          'Quebra do grão em quatro a seis partes, separação da casca, condicionamento ' +
          'térmico para plastificar o material e laminação em flocos finos. Quanto mais ' +
          'fino o floco, mais rápido o solvente alcança o óleo.',
        parametros: [
          { rotulo: 'Condicionamento', valor: '60–70 °C' },
          { rotulo: 'Espessura do floco', valor: '0,25–0,35 mm' }
        ]
      },
      {
        nome: 'Extração',
        descricao:
          'Os flocos percorrem o extrator em contracorrente com hexano. Sai uma solução ' +
          'de óleo em solvente e um farelo úmido de solvente. É o coração do processo ' +
          'e o ponto onde os dois produtos se separam.',
        parametros: [
          { rotulo: 'Solvente', valor: 'n-hexano' },
          { rotulo: 'Temperatura', valor: '55–60 °C' },
          { rotulo: 'Óleo residual no farelo', valor: '< 1%' }
        ],
        marco: true
      },
      {
        nome: 'Dessolventização',
        descricao:
          'A solução é destilada para recuperar o hexano e liberar o óleo bruto. Em ' +
          'paralelo, o farelo passa pelo dessolventizador-tostador, que remove o ' +
          'solvente e desativa fatores antinutricionais por calor e vapor.',
        parametros: [
          { rotulo: 'Tostagem do farelo', valor: '100–105 °C' },
          { rotulo: 'Recuperação de hexano', valor: '> 99%' }
        ]
      },
      {
        nome: 'Degomagem',
        descricao:
          'Hidratação e centrifugação retiram os fosfolipídios do óleo bruto. Essa goma ' +
          'é a matéria-prima da lecitina. O resultado é o óleo degomado — o principal ' +
          'produto de exportação a granel do grupo.',
        parametros: [
          { rotulo: 'Fósforo residual', valor: '< 200 ppm' },
          { rotulo: 'Produto', valor: 'óleo degomado' }
        ],
        marco: true
      },
      {
        nome: 'Refino',
        descricao:
          'Neutralização da acidez, branqueamento com terra clarificante, winterização ' +
          'quando se quer óleo límpido a frio e desodorização a vácuo, que remove ' +
          'voláteis e define sabor neutro.',
        parametros: [
          { rotulo: 'Desodorização', valor: '240–260 °C' },
          { rotulo: 'Pressão', valor: '2–4 mbar' }
        ]
      },
      {
        nome: 'Tancagem e embarque',
        descricao:
          'Armazenagem em tanques dedicados com controle de temperatura, nitrogênio ou ' +
          'pulmão de ar seco para evitar oxidação, e carregamento de navio por linha ' +
          'segregada. Óleos de palma e gorduras exigem serpentina de aquecimento.',
        parametros: [
          { rotulo: 'Óleo de soja', valor: 'ambiente' },
          { rotulo: 'Óleo de palma', valor: '45–55 °C' }
        ]
      }
    ],
    fontes: [
      { org: 'ABIOVE', serie: 'Processamento da soja — descrição de processo', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Boas práticas em manuseio de solventes', ano: '2023' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'Processar soja é, antes de tudo, produzir farelo. O óleo responde por menos de ' +
      'um quinto da massa que entra na indústria, e essa proporção fixa explica por que ' +
      'a oferta de óleo vegetal no Brasil é definida pela demanda mundial por proteína ' +
      'animal, e não pelo mercado de óleo em si.',

    rendimento: {
      base: 'Para cada 100 kg de soja processada',
      saidas: [
        { nome: 'Farelo proteico', percentual: 78.5, unidade: 'kg', cor: 'var(--serie-2)' },
        { nome: 'Óleo bruto',      percentual: 18.5, unidade: 'kg', cor: 'var(--serie-4)' },
        { nome: 'Casca e perdas',  percentual: 2.7,  unidade: 'kg', cor: 'var(--serie-5)' },
        { nome: 'Goma / lecitina', percentual: 0.3,  unidade: 'kg', cor: 'var(--amarelo-700)' }
      ]
    },

    itens: [
      {
        nome: 'Farelo de soja',
        share: '78,5 kg',
        descricao:
          'Farelo com 46% a 48% de proteína, principal fonte proteica da nutrição animal ' +
          'no mundo. É granel sólido, mas define a escala do crush e, portanto, a oferta ' +
          'de óleo.',
        destino: 'Avicultura e suinocultura no Brasil; União Europeia e Sudeste Asiático na exportação.'
      },
      {
        nome: 'Lecitina de soja',
        share: '0,3 kg',
        descricao:
          'Obtida da goma retirada na degomagem. Emulsificante de alto valor por tonelada, ' +
          'movimentado em volumes pequenos e com especificação rígida.',
        destino: 'Indústria de alimentos, chocolates, panificação, ração e farmacêutica.'
      },
      {
        nome: 'Borra e ácidos graxos',
        share: 'refino',
        descricao:
          'A neutralização gera soapstock e a desodorização gera destilado de ácidos ' +
          'graxos. São correntes de baixo custo com boa aplicação industrial.',
        destino: 'Oleoquímica, sabões, ração animal e matéria-prima alternativa para biodiesel.'
      },
      {
        nome: 'Casca de soja',
        share: '2,7 kg',
        descricao:
          'Separada na quebra do grão e frequentemente peletizada. Fonte de fibra ' +
          'digestível para ruminantes.',
        destino: 'Nutrição de bovinos de leite e corte; energia térmica na própria planta.'
      },
      {
        nome: 'Tocoferóis e esteróis',
        share: 'traços',
        descricao:
          'Recuperados do destilado de desodorização. Volume muito baixo, valor unitário ' +
          'muito alto — base de vitamina E natural.',
        destino: 'Nutracêuticos, cosméticos e indústria farmacêutica.'
      }
    ],
    fontes: [
      { org: 'ABIOVE', serie: 'Rendimento industrial médio do complexo soja', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Oleoquímica — panorama setorial', ano: '2023' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'O Brasil produz cerca de 11 milhões de toneladas de óleo de soja por ano e ' +
      'consome internamente a maior parte disso. A exportação é o resíduo do balanço: ' +
      'cresce quando a demanda do biodiesel desacelera e encolhe quando a mistura ' +
      'obrigatória sobe. Entender essa gangorra é entender a volatilidade de volume ' +
      'no terminal.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Produção de óleo de soja',
        valor: 11.0, unidade: 'Mt', decimais: 1, cor: 'var(--serie-1)',
        nota: 'Resultado direto do processamento de 54,6 Mt de grão.'
      },
      {
        rotulo: 'Consumo doméstico',
        valor: 9.7, unidade: 'Mt', cor: 'var(--serie-2)',
        nota: 'Soma de uso alimentar e industrial, incluindo biodiesel.'
      },
      {
        rotulo: 'Uso em biodiesel',
        valor: 5.5, unidade: 'Mt', cor: 'var(--serie-4)',
        nota: 'Cerca de 70% de toda a matéria-prima do biodiesel nacional.'
      },
      {
        rotulo: 'Exportação de óleo',
        valor: 1.3, unidade: 'Mt', cor: 'var(--serie-3)',
        nota: 'Majoritariamente óleo degomado, a granel.'
      }
    ],

    grafico: {
      titulo: 'Oferta e demanda de óleo de soja no Brasil',
      unidade: 'Mt',
      decimais: 1,
      barras: [
        { rotulo: 'Produção',    valor: 11.0, cor: 'var(--serie-1)' },
        { rotulo: 'Consumo',     valor: 9.7,  cor: 'var(--serie-2)' },
        { rotulo: 'Biodiesel',   valor: 5.5,  cor: 'var(--serie-4)' },
        { rotulo: 'Alimentar',   valor: 4.2,  cor: 'var(--serie-3)' },
        { rotulo: 'Exportação',  valor: 1.3,  cor: 'var(--serie-3)' },
        { rotulo: 'Importação',  valor: 0.1,  cor: 'var(--serie-5)' }
      ],
      legenda:
        'Biodiesel e alimentar são as duas parcelas do consumo doméstico, não somas ' +
        'adicionais. Valores em milhões de toneladas.'
    },

    notas: [
      'A mistura obrigatória de biodiesel no diesel subiu para B14 em março de 2024 e ' +
      'para B15 em março de 2025. Cada ponto percentual de mistura desloca da ordem de ' +
      '400 mil toneladas de óleo vegetal do mercado exportador para o interno.',
      'O Brasil é exportador líquido de óleo de soja e importador líquido de óleo de ' +
      'palma, o que sustenta fluxos de importação em tancagem aquecida no mesmo grupo ' +
      'de produto.',
      'Estoques de passagem são baixos em relação ao consumo mensal, o que amplifica a ' +
      'reação do preço interno a qualquer mudança de mandato ou de safra.'
    ],
    fontes: [
      { org: 'ABIOVE', serie: 'Estatística mensal do complexo soja', ano: '2024' },
      { org: 'ANP', serie: 'Painel dinâmico de produção de biocombustíveis', ano: '2024' },
      { org: 'Comex Stat', serie: 'Exportação e importação — NCM 1507 e 1511', ano: '2024' },
      { org: 'CONAB', serie: 'Séries históricas de oferta e demanda', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'Dentro do Brasil, o óleo de soja é hoje mais um insumo energético do que um ' +
      'alimento: o biodiesel consome mais do que a mesa. Na exportação, o comprador é ' +
      'a Ásia de renda média, que importa óleo bruto ou degomado para refinar ' +
      'localmente, mais uma frente estável na América Latina e no norte da África.',

    tituloSetores: 'Consumo interno por setor',
    tituloDestinos: 'Destinos de exportação de óleo de soja',

    setores: [
      {
        nome: 'Biodiesel',
        participacao: 57,
        descricao: 'Usinas de éster metílico. Demanda definida por regulação, não por preço.'
      },
      {
        nome: 'Alimentos e óleo de mesa',
        participacao: 33,
        descricao: 'Óleo refinado embalado, margarinas, gorduras especiais e food service.'
      },
      {
        nome: 'Indústria e oleoquímica',
        participacao: 6,
        descricao: 'Tintas, resinas alquídicas, lubrificantes de base vegetal e tensoativos.'
      },
      {
        nome: 'Ração e outros usos',
        participacao: 4,
        descricao: 'Óleo adicionado a rações para elevar densidade energética.'
      }
    ],

    destinos: [
      { pais: 'Índia',      valor: 494, unidade: 'mil t', participacao: 38 },
      { pais: 'Bangladesh', valor: 117, unidade: 'mil t', participacao: 9 },
      { pais: 'Argélia',    valor: 91,  unidade: 'mil t', participacao: 7 },
      { pais: 'Peru',       valor: 78,  unidade: 'mil t', participacao: 6 },
      { pais: 'Chile',      valor: 65,  unidade: 'mil t', participacao: 5 },
      { pais: 'Colômbia',   valor: 52,  unidade: 'mil t', participacao: 4 },
      { pais: 'Demais destinos', valor: 403, unidade: 'mil t', participacao: 31 }
    ],
    fontes: [
      { org: 'Comex Stat', serie: 'Exportações brasileiras — NCM 1507.10 e 1507.90', ano: '2024' },
      { org: 'ABIOVE', serie: 'Consumo doméstico por destinação', ano: '2024' },
      { org: 'StoneX', serie: 'Balanço de óleos vegetais — Brasil', ano: '2024' }
    ]
  }
};

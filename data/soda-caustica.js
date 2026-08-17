/* =========================================================================
   MEMORIAL DESCRITIVO — SODA CÁUSTICA
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Números compilados de publicações públicas de ABIQUIM, Comex Stat, IBÁ e
   ABICLOR. Servem como conteúdo de referência: antes de uso comercial, cada
   valor deve ser conferido contra a última edição da série citada em `fontes`.

   Pontos frágeis, em ordem de risco:
     • a distribuição da capacidade cloro-álcalis por estado (§1) é a
       estimativa mais frágil do arquivo. O parque brasileiro tem poucas
       unidades, os números por planta não são publicados de forma
       consolidada, e a situação de Alagoas muda o quadro. Por isso a §1 traz
       só participação, sem volume absoluto por estado: a proporção é mais
       defensável que o número;
     • a divisão do consumo por setor (§5) é estimativa setorial;
     • o mapa da §5 usa capacidade de celulose como proxy do MAIOR uso — que
       responde por cerca de um terço da demanda —, e não da demanda total.
       Isso está dito no texto da seção, e precisa continuar dito.

   O rendimento da §3 é a única parte do arquivo que não é estimativa: sai
   direto da estequiometria da eletrólise (2 NaCl + 2 H2O -> 2 NaOH + Cl2 + H2).
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['soda-caustica'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'soda-caustica',
  nome: 'Soda Cáustica',
  subtitulo: 'Grupo de produto · Cloro-álcalis',
  icone: 'soda-caustica',
  resumo:
    'A soda cáustica tem uma peculiaridade que define todo o resto: ela não ' +
    'pode ser produzida sozinha. Sai da eletrólise do sal junto com cloro, numa ' +
    'proporção fixa que nenhuma decisão comercial altera — cada tonelada de ' +
    'soda vem acompanhada de 0,89 tonelada de cloro. Por isso o Brasil, que tem ' +
    'sal de sobra e energia renovável, importa metade do que consome: quem ' +
    'limita a produção não é a demanda de soda, é a de cloro. No cais, é o ' +
    'oposto do grupo dos Aquecidos — não exige calor, exige contenção de ' +
    'corrosão.',

  destaques: [
    { valor: 2.4,  unidade: 'Mt', rotulo: 'Consumo aparente de soda no Brasil em 2024', decimais: 1 },
    { valor: 50,   unidade: '%',  rotulo: 'Da oferta nacional vem de importação', decimais: 0 },
    { valor: 0.89, unidade: 't',  rotulo: 'De cloro coproduzido por tonelada de soda', decimais: 2 },
    { valor: 35,   unidade: '%',  rotulo: 'Do consumo vai para celulose e papel', decimais: 0 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'A matéria-prima é sal e eletricidade. O Brasil tem os dois em abundância — ' +
      'sal marinho no Rio Grande do Norte, sal-gema em Alagoas e Sergipe, e uma ' +
      'matriz elétrica majoritariamente renovável —, e ainda assim importa metade ' +
      'da soda que consome. A razão não está na matéria-prima: está no cloro, que ' +
      'sai junto e precisa de mercado. Por isso esta seção tem dois lados. O mapa ' +
      'mostra onde está o parque cloro-álcalis nacional; a rota acima mostra de ' +
      'onde vem a outra metade, majoritariamente da Costa do Golfo americana.',

    /* Só participação, sem volume absoluto: o parque nacional tem poucas
       unidades e os números por planta não são publicados de forma
       consolidada. A proporção é mais defensável que o número. */
    regioes: [
      {
        nome: 'São Paulo', uf: 'SP',
        participacao: 45,
        detalhe: 'Cubatão e Santo André formam o maior polo cloro-álcalis do país, ' +
                 'colados na demanda de PVC, de tratamento de água e da indústria ' +
                 'química da Grande São Paulo.'
      },
      {
        nome: 'Bahia', uf: 'BA',
        participacao: 35,
        detalhe: 'Unidades de Aratu e Camaçari, integradas ao polo petroquímico e ' +
                 'próximas da demanda de celulose do Nordeste.'
      },
      {
        nome: 'Alagoas', uf: 'AL',
        participacao: 12,
        detalhe: 'Capacidade instalada em Maceió, com operação interrompida após a ' +
                 'paralisação da extração de sal-gema. A saída dessa oferta é uma ' +
                 'das razões diretas do aumento recente da dependência externa.'
      },
      {
        nome: 'Demais estados', uf: 'BR',
        participacao: 8,
        detalhe: 'Unidades menores e plantas cativas dentro de fábricas de ' +
                 'celulose, que produzem para consumo próprio e não abastecem o ' +
                 'mercado.'
      }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a participação ' +
      'estimada na capacidade instalada de cloro-álcalis, não a produção efetiva ' +
      '— Alagoas aparece com capacidade, mas está fora de operação.',

    rota: [
      { nome: 'Planta nos EUA' },
      { nome: 'Costa do Golfo' },
      { nome: 'Travessia' },
      { nome: 'Paranaguá', marco: true },
      { nome: 'Tanque revestido' },
      { nome: 'Cliente' }
    ],
    legendaRota:
      'A metade importada vem quase toda da Costa do Golfo dos Estados Unidos, ' +
      'com travessia de 14 a 18 dias. A carga viaja como solução a 50%, que ' +
      'cristaliza por volta de 12 °C — não é um aquecido, mas também não tolera ' +
      'frio sem atenção.',

    fontes: [
      { org: 'ABIQUIM', serie: 'Anuário da indústria química brasileira — cloro-álcalis', ano: '2024' },
      { org: 'ABICLOR', serie: 'Capacidade instalada do setor cloro-álcalis', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 2815.11 e 2815.12 (hidróxido de sódio)', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'Aqui não há reator térmico nem catalisador: há corrente elétrica. A ' +
      'eletrólise quebra o cloreto de sódio dissolvido e entrega três produtos ' +
      'simultâneos em compartimentos separados por uma membrana. É um dos ' +
      'processos industriais mais eletrointensivos que existem, e por isso a ' +
      'competitividade de uma planta cloro-álcalis é, antes de tudo, o preço da ' +
      'energia — o que dá vantagem estrutural a quem opera em matriz limpa e ' +
      'barata.',

    etapas: [
      {
        nome: 'Purificação da salmoura',
        descricao:
          'O sal é dissolvido e a salmoura passa por precipitação e troca iônica. ' +
          'Cálcio e magnésio precisam cair a níveis de partes por bilhão: em ' +
          'concentração maior, entopem e destroem a membrana da célula, que é o ' +
          'item mais caro do processo.',
        parametros: [
          { rotulo: 'Cálcio + magnésio', valor: '< 20 ppb' },
          { rotulo: 'Concentração', valor: '~300 g/L' }
        ]
      },
      {
        nome: 'Eletrólise a membrana',
        descricao:
          'Corrente contínua decompõe o cloreto de sódio. A membrana de troca ' +
          'iônica deixa passar o íon sódio e retém o cloreto, mantendo o cloro do ' +
          'lado do ânodo e a soda do lado do cátodo. É a etapa que consome a ' +
          'energia e define o custo.',
        parametros: [
          { rotulo: 'Consumo elétrico', valor: '2.100–2.400 kWh/t' },
          { rotulo: 'Temperatura', valor: '85–90 °C' },
          { rotulo: 'Tensão por célula', valor: '3,0–3,5 V' }
        ],
        marco: true
      },
      {
        nome: 'Separação dos produtos',
        descricao:
          'Saem três correntes ao mesmo tempo: cloro gasoso no ânodo, soda ' +
          'cáustica e hidrogênio no cátodo. A proporção entre elas é fixada pela ' +
          'estequiometria, não pela operação — não existe ajustar a planta para ' +
          'fazer mais soda e menos cloro.',
        parametros: [
          { rotulo: 'Proporção fixa', valor: '1 t Cl₂ : 1,13 t NaOH' }
        ],
        marco: true
      },
      {
        nome: 'Concentração da soda',
        descricao:
          'A soda deixa a célula diluída, em torno de 32%. Evaporadores de ' +
          'múltiplo efeito retiram água até a concentração comercial de 50%, que ' +
          'é a forma em que praticamente todo o produto é transportado a granel.',
        parametros: [
          { rotulo: 'Saída da célula', valor: '~32%' },
          { rotulo: 'Produto comercial', valor: '50%' }
        ]
      },
      {
        nome: 'Tratamento do cloro',
        descricao:
          'O cloro é resfriado, secado com ácido sulfúrico, comprimido e ' +
          'liquefeito. Se não houver destino para ele, a planta inteira precisa ' +
          'reduzir carga — inclusive a produção de soda.',
        parametros: [
          { rotulo: 'Secagem', valor: 'ácido sulfúrico' },
          { rotulo: 'Destino principal', valor: 'PVC' }
        ]
      },
      {
        nome: 'Tancagem e embarque',
        descricao:
          'Solução a 50%, altamente alcalina e corrosiva. Aço-carbono serve ' +
          'abaixo de uma faixa de temperatura; acima dela aparece corrosão sob ' +
          'tensão e exige-se revestimento de níquel. É a exigência oposta à do ' +
          'grupo dos Aquecidos: aqui o inimigo não é o frio, é o calor combinado ' +
          'com alcalinidade.',
        parametros: [
          { rotulo: 'Concentração', valor: '50%' },
          { rotulo: 'Cristalização', valor: '~12 °C' },
          { rotulo: 'Limite em aço-carbono', valor: '~50 °C' },
          { rotulo: 'Classe de risco', valor: '8 — corrosivo' }
        ]
      }
    ],
    fontes: [
      { org: 'ABICLOR', serie: 'Processo cloro-álcalis — tecnologia de membrana', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Boas práticas em manuseio de produtos corrosivos', ano: '2023' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'Este é o balanço mais rígido de todos os memoriais do terminal, e o único ' +
      'que não é estimativa: os três produtos saem da célula na proporção exata ' +
      'que a estequiometria manda. Não há rendimento a otimizar nem corte a ' +
      'escolher. A consequência comercial é grande — a soda cáustica não tem ' +
      'oferta própria, tem a oferta que o mercado de cloro permitir.',

    rendimento: {
      base: 'Para cada 100 kg de produto que sai da célula eletrolítica',
      entrada: { valor: 100, rotulo: 'kg da célula' },
      saidas: [
        { nome: 'Soda cáustica (NaOH)', percentual: 52.3, unidade: 'kg', cor: 'var(--serie-1)' },
        { nome: 'Cloro (Cl₂)',          percentual: 46.4, unidade: 'kg', cor: 'var(--serie-4)' },
        { nome: 'Hidrogênio (H₂)',      percentual: 1.3,  unidade: 'kg', cor: 'var(--serie-3)' }
      ]
    },

    itens: [
      {
        nome: 'Cloro',
        share: '46,4 kg',
        descricao:
          'O coproduto que governa a cadeia inteira. Cerca de dois terços do cloro ' +
          'mundial vira PVC, então é a construção civil que, indiretamente, define ' +
          'quanta soda cáustica existe no mercado.',
        destino: 'PVC, tratamento de água, desinfetantes, solventes clorados e ' +
                 'química fina.'
      },
      {
        nome: 'Hidrogênio',
        share: '1,3 kg',
        descricao:
          'Sai puro da célula, sem precisar de purificação pesada. Historicamente ' +
          'queimado como combustível na própria planta, hoje é reavaliado: em ' +
          'matriz renovável, é hidrogênio de baixa emissão sem investimento novo.',
        destino: 'Combustível interno, ácido clorídrico, hidrogenação e mercado de ' +
                 'hidrogênio de baixo carbono.'
      },
      {
        nome: 'Ácido clorídrico',
        share: 'Cl₂ + H₂',
        descricao:
          'Feito recombinando os dois coprodutos da própria célula. É a rota que a ' +
          'planta usa quando quer converter cloro excedente em algo estocável e ' +
          'vendável.',
        destino: 'Decapagem de aço, acidificação de poços, tratamento de água e ' +
                 'indústria alimentícia.'
      },
      {
        nome: 'Hipoclorito de sódio',
        share: 'Cl₂ + NaOH',
        descricao:
          'A água sanitária. Consome cloro e soda ao mesmo tempo, o que faz dela a ' +
          'válvula de escape clássica da planta quando o cloro não tem para onde ir.',
        destino: 'Desinfecção, saneamento, branqueamento e limpeza.'
      },
      {
        nome: 'Salmoura residual',
        share: 'recirculação',
        descricao:
          'A salmoura empobrecida volta ao circuito para ser ressaturada com sal ' +
          'novo, em vez de ser descartada. Fecha o ciclo de água e sal da planta.',
        destino: 'Recirculação interna; purga tratada antes do descarte.'
      }
    ],
    fontes: [
      { org: 'ABICLOR', serie: 'Balanço estequiométrico do processo cloro-álcalis', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Cadeia do cloro e derivados', ano: '2024' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'O balanço da soda brasileira só faz sentido quando lido junto com o do ' +
      'cloro. O país consome cerca de 2,4 milhões de toneladas de soda por ano e ' +
      'produz aproximadamente metade disso — não por falta de sal, de energia ou ' +
      'de tecnologia, mas porque produzir mais soda significaria produzir mais ' +
      'cloro do que o mercado brasileiro absorve. A importação, portanto, não é ' +
      'conjuntural: é a forma como o país resolve um desequilíbrio estrutural ' +
      'entre duas demandas que nascem grudadas.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Consumo aparente',
        valor: 2.4, unidade: 'Mt', decimais: 1, cor: 'var(--serie-1)',
        nota: 'Puxado por celulose, alumina e saneamento.'
      },
      {
        rotulo: 'Produção nacional',
        valor: 1.2, unidade: 'Mt', decimais: 1, cor: 'var(--serie-2)',
        nota: 'Limitada pela demanda de cloro, não pela de soda.'
      },
      {
        rotulo: 'Importação',
        valor: 1.2, unidade: 'Mt', decimais: 1, cor: 'var(--serie-4)',
        nota: 'Majoritariamente da Costa do Golfo dos Estados Unidos.'
      },
      {
        rotulo: 'Dependência externa',
        valor: 50, unidade: '%', decimais: 0, cor: 'var(--serie-3)',
        nota: 'Aumentou com a saída da capacidade de Alagoas.'
      }
    ],

    grafico: {
      titulo: 'Oferta e uso de soda cáustica no Brasil',
      unidade: 'Mt',
      decimais: 2,
      barras: [
        { rotulo: 'Consumo aparente',   valor: 2.40, cor: 'var(--serie-1)' },
        { rotulo: 'Produção nacional',  valor: 1.20, cor: 'var(--serie-2)' },
        { rotulo: 'Importação',         valor: 1.20, cor: 'var(--serie-4)' },
        { rotulo: 'Celulose e papel',   valor: 0.84, cor: 'var(--serie-3)' },
        { rotulo: 'Alumina',            valor: 0.53, cor: 'var(--serie-3)' },
        { rotulo: 'Saneamento',         valor: 0.26, cor: 'var(--serie-5)' }
      ],
      legenda:
        'Produção e importação são os dois lados da oferta, e se dividem quase ao ' +
        'meio. Celulose, alumina e saneamento são parcelas do consumo aparente, ' +
        'não somas adicionais. Valores em milhões de toneladas.'
    },

    notas: [
      'Cada tonelada de soda produzida traz 0,89 tonelada de cloro junto. Como ' +
      'cerca de dois terços do cloro viram PVC, é o ritmo da construção civil que ' +
      'define, na prática, quanta soda o país consegue produzir. Um terminal que ' +
      'movimenta soda está exposto a um mercado cujo teto é decidido em outra ' +
      'cadeia.',
      'A interrupção da unidade de Alagoas retirou capacidade relevante do parque ' +
      'nacional e elevou a dependência externa — um deslocamento de oferta que se ' +
      'converteu diretamente em volume portuário.',
      'O Brasil é o maior exportador mundial de celulose, e o branqueamento de ' +
      'polpa é o maior uso de soda no país. Isso dá ao grupo um ciclo de demanda ' +
      'longo: acompanha decisão de investimento em novas linhas de celulose, ' +
      'projetos de cinco a sete anos, e não safra ou câmbio.',
      'Eletrólise cloro-álcalis consome de 2.100 a 2.400 kWh por tonelada de ' +
      'soda. Numa matriz majoritariamente renovável como a brasileira, a soda ' +
      'nacional carrega pegada de carbono bem menor que a de origens apoiadas em ' +
      'geração a carvão — argumento que começa a aparecer em contrato.'
    ],
    fontes: [
      { org: 'ABIQUIM', serie: 'Anuário da indústria química brasileira — cloro-álcalis', ano: '2024' },
      { org: 'ABICLOR', serie: 'Produção e consumo de soda cáustica no Brasil', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 2815.11 e 2815.12 (hidróxido de sódio)', ano: '2024' },
      { org: 'IBÁ', serie: 'Relatório anual — produção de celulose', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'A soda cáustica é um insumo de base: quase nunca aparece no produto final, ' +
      'mas está em quase todas as cadeias industriais pesadas. No Brasil, o maior ' +
      'uso é o branqueamento de celulose, o que amarra a demanda ao setor em que ' +
      'o país é líder mundial. Vem depois a alumina, cujo processo de refino do ' +
      'bauxita consome soda em grande escala. A divisão por setor abaixo é ' +
      'estimativa setorial. E o mapa mede a capacidade de celulose por estado — ' +
      'ou seja, o maior uso, que responde por cerca de um terço da demanda, e ' +
      'não a demanda total.',

    tituloSetores: 'Consumo por setor',
    tituloDestinos: 'Onde está o maior uso — capacidade de celulose por estado',

    setores: [
      {
        nome: 'Celulose e papel',
        participacao: 35,
        descricao: 'Cozimento e branqueamento de polpa. Maior uso individual no ' +
                   'país, e o que mais cresce com as novas linhas de celulose.'
      },
      {
        nome: 'Alumina e metalurgia',
        participacao: 22,
        descricao: 'Refino de bauxita pelo processo Bayer, que dissolve o alumínio ' +
                   'em soda quente. Consumo concentrado em poucas plantas de porte.'
      },
      {
        nome: 'Química e petroquímica',
        participacao: 16,
        descricao: 'Neutralização, produção de fenol, silicatos, sais de sódio e ' +
                   'intermediários diversos.'
      },
      {
        nome: 'Alimentos, têxtil e sabões',
        participacao: 16,
        descricao: 'Refino de óleos vegetais, mercerização de algodão, saponificação ' +
                   'e limpeza industrial.'
      },
      {
        nome: 'Saneamento e tratamento de água',
        participacao: 11,
        descricao: 'Correção de pH em estações de tratamento de água e efluentes. ' +
                   'Demanda estável, pouco sensível a ciclo econômico.'
      }
    ],

    destinos: [
      { nome: 'Mato Grosso do Sul', uf: 'MS', participacao: 30 },
      { nome: 'São Paulo',          uf: 'SP', participacao: 15 },
      { nome: 'Bahia',              uf: 'BA', participacao: 12 },
      { nome: 'Espírito Santo',     uf: 'ES', participacao: 10 },
      { nome: 'Rio Grande do Sul',  uf: 'RS', participacao: 8 },
      { nome: 'Paraná',             uf: 'PR', participacao: 8 },
      { nome: 'Minas Gerais',       uf: 'MG', participacao: 6 },
      { nome: 'Demais estados',     uf: 'BR', participacao: 11 }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a capacidade ' +
      'instalada de produção de celulose — proxy do maior uso da soda, não da ' +
      'demanda total do produto.',

    fontes: [
      { org: 'ABICLOR', serie: 'Consumo de soda cáustica por setor — estimativa', ano: '2024' },
      { org: 'IBÁ', serie: 'Capacidade instalada de celulose por estado', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Cadeia do cloro e derivados', ano: '2024' }
    ]
  }
};

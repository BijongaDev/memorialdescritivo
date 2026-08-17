/* =========================================================================
   MEMORIAL DESCRITIVO — BIOCOMBUSTÍVEIS
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Números compilados de publicações públicas de CONAB, ANP, UNICA e
   Comex Stat. Servem como conteúdo de referência: antes de uso comercial,
   cada valor deve ser conferido contra a última edição da série citada em
   `fontes`.

   Pontos frágeis, em ordem de risco:
     • os destinos de exportação de etanol (§5) mudam MUITO de ano para ano —
       o ranking responde a política tarifária de cada país e a arbitragem de
       preço, não a relação comercial estável. Confira sempre o ano corrente;
     • a destinação da produção por uso (§5) é estimativa que combina etanol
       e biodiesel numa base comum de litros, o que nenhuma entidade publica
       de forma consolidada;
     • a divisão da produção de etanol por estado (§1) mistura rota de cana e
       rota de milho. Mato Grosso aparece alto por milho, não por cana — está
       dito no detalhe do estado, e precisa continuar dito.

   Este grupo cruza com dois outros memoriais do terminal: o óleo de soja é
   matéria-prima de cerca de 70% do biodiesel brasileiro, e o metanol é
   reagente obrigatório da rota metílica. Uma tonelada de biodiesel movimenta
   os três grupos.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['biocombustiveis'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'biocombustiveis',
  nome: 'Biocombustíveis',
  subtitulo: 'Grupo de produto · Etanol, biodiesel e combustíveis de baixo carbono',
  icone: 'biocombustiveis',
  resumo:
    'É o único grupo do terminal em que o Brasil é protagonista mundial, e não ' +
    'comprador. O país construiu em cinco décadas uma cadeia de etanol que ' +
    'nenhum outro replicou, e nos últimos anos abriu uma segunda frente — o ' +
    'etanol de milho — que saiu do zero para um quinto da produção nacional. É ' +
    'também o grupo que amarra os outros: o biodiesel consome o óleo de soja de ' +
    'um memorial e o metanol de outro. E é o único com uma fronteira de ' +
    'exportação que ainda não existe, mas já tem data: o combustível de aviação ' +
    'feito de etanol.',

  destaques: [
    { valor: 35.4, unidade: 'bi L', rotulo: 'Etanol produzido na safra 2023/24', decimais: 1 },
    { valor: 9.0,  unidade: 'bi L', rotulo: 'Biodiesel produzido em 2024', decimais: 1 },
    { valor: 6.5,  unidade: 'bi L', rotulo: 'Etanol de milho — a rota que mais cresce', decimais: 1 },
    { valor: 2.5,  unidade: 'bi L', rotulo: 'Etanol exportado em 2024', decimais: 1 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'A matéria-prima do etanol brasileiro deixou de ser uma só. A cana ainda ' +
      'responde pela maior parte e continua concentrada em São Paulo, mas o ' +
      'milho abriu uma segunda geografia: Mato Grosso, onde a segunda safra ' +
      'sobrava sem escoamento competitivo, virou o segundo maior produtor de ' +
      'etanol do país sem plantar um pé de cana. O mapa abaixo mistura as duas ' +
      'rotas de propósito — é assim que a oferta chega ao mercado —, mas vale ' +
      'ler o detalhe de cada estado para saber qual delas está por trás do ' +
      'número.',

    regioes: [
      {
        nome: 'São Paulo', uf: 'SP',
        valor: 16.6, unidade: 'bi L', participacao: 47,
        detalhe: 'Rota da cana. Concentra o parque sucroalcooleiro histórico e a ' +
                 'infraestrutura de dutos e terminais que nasceu com ele. Define o ' +
                 'preço de referência do etanol brasileiro.'
      },
      {
        nome: 'Mato Grosso', uf: 'MT',
        valor: 4.2, unidade: 'bi L', participacao: 12,
        detalhe: 'Rota do milho, quase integralmente. Segundo maior produtor de ' +
                 'etanol do país sem produzir cana — usa o milho de segunda safra ' +
                 'que antes não tinha destino competitivo.'
      },
      {
        nome: 'Goiás', uf: 'GO',
        valor: 3.9, unidade: 'bi L', participacao: 11,
        detalhe: 'Fronteira de expansão da cana nas últimas duas décadas, hoje com ' +
                 'unidades flex que também processam milho.'
      },
      {
        nome: 'Minas Gerais', uf: 'MG',
        valor: 3.2, unidade: 'bi L', participacao: 9,
        detalhe: 'Cana no Triângulo Mineiro, integrada ao mercado paulista por ' +
                 'proximidade e por duto.'
      },
      {
        nome: 'Mato Grosso do Sul', uf: 'MS',
        valor: 2.8, unidade: 'bi L', participacao: 8,
        detalhe: 'Cana e milho convivendo, com forte presença de unidades de ' +
                 'cogeração vendendo energia à rede.'
      },
      {
        nome: 'Paraná', uf: 'PR',
        valor: 1.4, unidade: 'bi L', participacao: 4,
        detalhe: 'Parque menor e mais antigo, no norte do estado. Relevante para ' +
                 'Paranaguá menos pelo volume próprio e mais pela posição: é a ' +
                 'saída natural do etanol do Centro-Oeste para exportação.'
      },
      {
        nome: 'Demais estados', uf: 'BR',
        valor: 3.3, unidade: 'bi L', participacao: 9,
        detalhe: 'Alagoas, Pernambuco e Paraíba na rota tradicional da cana do ' +
                 'Nordeste, mais unidades de milho em Goiás, Rondônia e Paraná.'
      }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a produção total ' +
      'de etanol do estado, somando as rotas de cana e de milho.',

    fontes: [
      { org: 'CONAB', serie: 'Acompanhamento da safra de cana-de-açúcar', ano: '2023/24' },
      { org: 'UNICA', serie: 'Produção de etanol por unidade da federação', ano: '2023/24' },
      { org: 'ANP', serie: 'Painel dinâmico de produção de biocombustíveis', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'O fluxo abaixo é o do etanol de cana, a rota de maior volume. Vale reter ' +
      'duas coisas que a distinguem. A primeira é que a usina decide, dentro da ' +
      'mesma safra, quanto do caldo vira açúcar e quanto vira etanol — o produto ' +
      'não é definido no plantio, e sim no preço da semana. A segunda é que o ' +
      'resíduo da moagem alimenta a caldeira: a usina não compra energia, vende. ' +
      'A rota do milho substitui as três primeiras etapas por moagem e ' +
      'liquefação enzimática, e daí em diante é praticamente igual.',

    etapas: [
      {
        nome: 'Recepção e preparo',
        descricao:
          'A cana é pesada, amostrada para teor de açúcar e passa por limpeza a ' +
          'seco, picadores e desfibrador. O objetivo é romper as células sem ' +
          'perder caldo antes da moenda.',
        parametros: [
          { rotulo: 'Índice de preparo', valor: '> 88%' },
          { rotulo: 'Prazo após corte', valor: '< 48 h' }
        ]
      },
      {
        nome: 'Extração do caldo',
        descricao:
          'Moendas em série ou difusor separam o caldo do bagaço, com água de ' +
          'embebição para arrastar o açúcar residual. Saem daqui as duas correntes ' +
          'que definem a usina: o caldo, que vira produto, e o bagaço, que vira ' +
          'energia.',
        parametros: [
          { rotulo: 'Extração de açúcar', valor: '96–98%' },
          { rotulo: 'Bagaço', valor: '~270 kg/t de cana' }
        ],
        marco: true
      },
      {
        nome: 'Tratamento do caldo',
        descricao:
          'Peneiramento, aquecimento, calagem e decantação removem terra, fibras e ' +
          'coloides. É neste ponto que a usina direciona o caldo: para a fábrica ' +
          'de açúcar ou para a fermentação.',
        parametros: [
          { rotulo: 'Aquecimento', valor: '105 °C' },
          { rotulo: 'Saída', valor: 'torta de filtro' }
        ]
      },
      {
        nome: 'Fermentação',
        descricao:
          'Leveduras convertem os açúcares em etanol e gás carbônico. O processo ' +
          'brasileiro recicla o fermento a cada ciclo, o que encurta a fermentação ' +
          'para poucas horas — bem menos que o padrão internacional.',
        parametros: [
          { rotulo: 'Temperatura', valor: '30–34 °C' },
          { rotulo: 'Tempo', valor: '8–12 h' },
          { rotulo: 'Vinho', valor: '8–11% de álcool' }
        ],
        marco: true
      },
      {
        nome: 'Destilação',
        descricao:
          'O vinho passa por colunas que separam o etanol da água e da vinhaça. ' +
          'Resulta o etanol hidratado, que já é combustível vendável direto na ' +
          'bomba.',
        parametros: [
          { rotulo: 'Etanol hidratado', valor: '92,6–93,8% INPM' },
          { rotulo: 'Vinhaça', valor: '10–13 L por L de etanol' }
        ]
      },
      {
        nome: 'Desidratação',
        descricao:
          'Peneiras moleculares retiram a água residual e produzem o etanol ' +
          'anidro, que é o que se mistura à gasolina e o que segue para ' +
          'exportação. Sem esta etapa não há mistura nem embarque.',
        parametros: [
          { rotulo: 'Etanol anidro', valor: '≥ 99,3% INPM' },
          { rotulo: 'Tecnologia', valor: 'peneira molecular' }
        ],
        marco: true
      },
      {
        nome: 'Cogeração e tancagem',
        descricao:
          'O bagaço queima na caldeira e move turbinas: a usina abastece a si ' +
          'mesma e vende o excedente à rede. O etanol vai a tanques de aço-carbono ' +
          'com selo de vapor, sem exigência térmica — mas com controle rigoroso de ' +
          'contaminação por água.',
        parametros: [
          { rotulo: 'Excedente elétrico', valor: 'exportado à rede' },
          { rotulo: 'Classe de risco', valor: '3 — inflamável' },
          { rotulo: 'Ponto de fulgor', valor: '13 °C' }
        ]
      }
    ],
    fontes: [
      { org: 'UNICA', serie: 'Processo industrial sucroenergético', ano: '2024' },
      { org: 'ANP', serie: 'Especificação do etanol combustível — RANP 907/2022', ano: '2024' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'A cana é o caso em que o subproduto sustenta o produto. O bagaço não é ' +
      'resíduo a descartar: é o combustível que faz a usina rodar e ainda gera ' +
      'excedente elétrico para vender. A vinhaça, que sai em volume dez vezes ' +
      'maior que o do etanol, volta ao canavial como fertilizante. É essa ' +
      'circularidade — e não a fotossíntese sozinha — que dá ao etanol ' +
      'brasileiro uma das menores intensidades de carbono do mundo.',

    rendimento: {
      base: 'Para cada 100 kg de cana processada',
      entrada: { valor: 100, rotulo: 'kg de cana' },
      saidas: [
        { nome: 'Caldo (água e açúcares)',  percentual: 62,  unidade: 'kg', cor: 'var(--serie-4)' },
        { nome: 'Bagaço',                   percentual: 27,  unidade: 'kg', cor: 'var(--serie-2)' },
        { nome: 'Palha, terra e perdas',    percentual: 7.5, unidade: 'kg', cor: 'var(--serie-5)' },
        { nome: 'Torta de filtro',          percentual: 3.5, unidade: 'kg', cor: 'var(--serie-3)' }
      ]
    },

    itens: [
      {
        nome: 'Bagaço e palha',
        share: '27 kg',
        descricao:
          'Queimados em caldeiras de alta pressão para gerar vapor e eletricidade. ' +
          'As usinas de cana são exportadoras líquidas de energia à rede, e a ' +
          'geração se concentra na seca — justamente quando os reservatórios ' +
          'hidrelétricos estão baixos.',
        destino: 'Cogeração própria, venda de energia à rede e etanol de segunda ' +
                 'geração.'
      },
      {
        nome: 'Vinhaça',
        share: '10–13 L/L',
        descricao:
          'Sai da destilação em volume mais de dez vezes maior que o do etanol. ' +
          'Rica em potássio, é aplicada no canavial por fertirrigação e substitui ' +
          'adubo mineral. Em biodigestores, também vira biogás.',
        destino: 'Fertirrigação do canavial; biogás e biometano.'
      },
      {
        nome: 'Açúcar',
        share: 'mesmo caldo',
        descricao:
          'Não é subproduto, é a alternativa. A usina flex decide ao longo da ' +
          'safra quanto do caldo vai para açúcar e quanto vai para etanol, ' +
          'conforme o preço relativo — o que faz a oferta de etanol responder ao ' +
          'mercado internacional de açúcar.',
        destino: 'Mercado interno e exportação; o Brasil é o maior exportador ' +
                 'mundial.'
      },
      {
        nome: 'DDG do etanol de milho',
        share: 'rota do milho',
        descricao:
          'A rota do milho não gera bagaço, e sim grãos secos de destilaria com ' +
          'solúveis. É ração de alto valor proteico, o que dá à usina de milho uma ' +
          'segunda receita relevante e a aproxima do modelo do esmagamento de soja.',
        destino: 'Nutrição animal, sobretudo avicultura e suinocultura.'
      },
      {
        nome: 'Glicerina do biodiesel',
        share: '~10%',
        descricao:
          'A transesterificação gera cerca de um décimo de glicerina em massa. O ' +
          'crescimento do mandato de mistura ampliou tanto a oferta que a ' +
          'glicerina bruta virou um problema de destinação, e não uma receita.',
        destino: 'Purificação para uso farmacêutico e cosmético, ração, e ' +
                 'conversão química.'
      },
      {
        nome: 'CO₂ da fermentação',
        share: 'biogênico',
        descricao:
          'A fermentação libera gás carbônico de origem biológica, concentrado e ' +
          'de fácil captura — condição rara na indústria. É o candidato natural a ' +
          'projetos de captura e armazenagem com custo baixo.',
        destino: 'Bebidas, gelo seco, e projetos de captura e estocagem de carbono.'
      }
    ],
    fontes: [
      { org: 'UNICA', serie: 'Balanço de massa e cogeração do setor sucroenergético', ano: '2024' },
      { org: 'ANP', serie: 'Produção de biodiesel e glicerina', ano: '2024' },
      { org: 'CONAB', serie: 'Etanol de milho — perfil da rota', ano: '2023/24' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'Diferente de quase todos os outros grupos do terminal, aqui o Brasil é ' +
      'superavitário e exportador. O etanol tem mercado interno grande o ' +
      'bastante para absorver quase toda a produção, e a exportação funciona como ' +
      'válvula — cresce quando o mercado externo paga prêmio, encolhe quando não ' +
      'paga. O biodiesel é o oposto: não se exporta, porque existe por mandato ' +
      'regulatório e é consumido inteiro dentro do país.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Etanol total',
        valor: 35.4, unidade: 'bi L', decimais: 1, cor: 'var(--serie-1)',
        nota: 'Safra 2023/24, somando as rotas de cana e de milho.'
      },
      {
        rotulo: 'Biodiesel',
        valor: 9.0, unidade: 'bi L', decimais: 1, cor: 'var(--serie-2)',
        nota: 'Consumo integralmente interno, definido pelo mandato de mistura.'
      },
      {
        rotulo: 'Etanol de milho',
        valor: 6.5, unidade: 'bi L', decimais: 1, cor: 'var(--serie-4)',
        nota: 'Praticamente zero em 2017. Hoje, perto de um quinto do total.'
      },
      {
        rotulo: 'Exportação de etanol',
        valor: 2.5, unidade: 'bi L', decimais: 1, cor: 'var(--serie-3)',
        nota: 'Volume que responde a tarifa e arbitragem, não a contrato estável.'
      }
    ],

    grafico: {
      titulo: 'Produção e destinação de biocombustíveis no Brasil',
      unidade: 'bilhões de litros',
      decimais: 1,
      barras: [
        { rotulo: 'Etanol total',      valor: 35.4, cor: 'var(--serie-1)' },
        { rotulo: 'Consumo interno',   valor: 32.9, cor: 'var(--serie-2)' },
        { rotulo: 'Biodiesel',         valor: 9.0,  cor: 'var(--serie-3)' },
        { rotulo: 'Etanol de milho',   valor: 6.5,  cor: 'var(--serie-4)' },
        { rotulo: 'Exportação',        valor: 2.5,  cor: 'var(--serie-5)' }
      ],
      legenda:
        'Consumo interno e exportação são as duas parcelas do etanol total; o ' +
        'etanol de milho é uma rota dentro dele, não uma soma. O biodiesel é uma ' +
        'cadeia à parte, com produção e consumo próprios. Valores em bilhões de ' +
        'litros.'
    },

    notas: [
      'Este grupo fecha um triângulo com dois outros memoriais do terminal. Cerca ' +
      'de 70% do biodiesel brasileiro sai de óleo de soja, e a rota metílica ' +
      'exige metanol importado como reagente. Uma tonelada de biodiesel movimenta ' +
      'Óleo Vegetal, Metanol e Biocombustíveis ao mesmo tempo — três memoriais, ' +
      'um único cliente.',
      'O etanol de milho é a mudança estrutural mais rápida do setor. Saiu de ' +
      'praticamente zero em 2017 para perto de um quinto da produção nacional, ' +
      'concentrado em Mato Grosso, onde deu destino competitivo ao milho de ' +
      'segunda safra. Ao contrário da cana, não depende de canavial próprio nem ' +
      'de janela de moagem: opera o ano inteiro.',
      'A Lei do Combustível do Futuro criou mandato de combustível sustentável de ' +
      'aviação a partir de 2027, e a rota alcohol-to-jet converte etanol em ' +
      'querosene. Para um terminal, isso desenha uma demanda de exportação com ' +
      'exigência de rastreabilidade e certificação de carbono que o etanol ' +
      'combustível de hoje não tem.',
      'A usina de cana é exportadora líquida de energia elétrica, e a queima do ' +
      'bagaço se concentra no período seco — quando os reservatórios estão ' +
      'baixos. Essa complementaridade com a hidroeletricidade é parte do que ' +
      'sustenta a baixa intensidade de carbono do etanol brasileiro, atributo que ' +
      'vale prêmio em mercados que precificam carbono.'
    ],
    fontes: [
      { org: 'CONAB', serie: 'Acompanhamento da safra de cana-de-açúcar', ano: '2023/24' },
      { org: 'ANP', serie: 'Painel dinâmico de produção de biocombustíveis', ano: '2024' },
      { org: 'UNICA', serie: 'Balanço da safra sucroenergética', ano: '2023/24' },
      { org: 'Comex Stat', serie: 'Exportação — NCM 2207 (álcool etílico)', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'Quase todo o biocombustível brasileiro é queimado dentro do Brasil, em ' +
      'motores que a própria regulação moldou: o carro flex absorve o etanol ' +
      'hidratado, a gasolina C carrega o anidro e o diesel B carrega o biodiesel. ' +
      'A exportação é a fatia menor e a mais volátil — o ranking de destinos ' +
      'abaixo muda de um ano para o outro conforme tarifa e arbitragem de preço, ' +
      'e não conforme relação comercial estabelecida. É o grupo em que a lista ' +
      'de países envelhece mais rápido, e o que mais pede atualização.',

    tituloSetores: 'Destinação da produção',
    tituloDestinos: 'Destinos da exportação de etanol',

    setores: [
      {
        nome: 'Frota flex — etanol hidratado',
        participacao: 38,
        descricao: 'Vendido direto na bomba. Concorre com a gasolina a cada ' +
                   'abastecimento, o que torna a demanda sensível a preço na ' +
                   'semana, não no ano.'
      },
      {
        nome: 'Diesel B — biodiesel',
        participacao: 25,
        descricao: 'Mistura obrigatória no diesel. Demanda definida por regulação, ' +
                   'imune a preço relativo.'
      },
      {
        nome: 'Gasolina C — etanol anidro',
        participacao: 24,
        descricao: 'Mistura obrigatória na gasolina, hoje em torno de 27%. Piso ' +
                   'firme de demanda, independente da escolha do motorista.'
      },
      {
        nome: 'Química, bebidas e higiene',
        participacao: 7,
        descricao: 'Etanol neutro e industrial para bebidas, cosméticos, ' +
                   'desinfetantes e insumo químico.'
      },
      {
        nome: 'Exportação',
        participacao: 6,
        descricao: 'Válvula do sistema: cresce quando o mercado externo paga ' +
                   'prêmio sobre o interno.'
      }
    ],

    destinos: [
      { nome: 'Coreia do Sul',    valor: 550, unidade: 'mi L', participacao: 22 },
      { nome: 'Estados Unidos',   valor: 450, unidade: 'mi L', participacao: 18 },
      { nome: 'Japão',            valor: 300, unidade: 'mi L', participacao: 12 },
      { nome: 'Países Baixos',    valor: 225, unidade: 'mi L', participacao: 9 },
      { nome: 'Colômbia',         valor: 200, unidade: 'mi L', participacao: 8 },
      { nome: 'Nigéria',          valor: 175, unidade: 'mi L', participacao: 7 },
      { nome: 'México',           valor: 125, unidade: 'mi L', participacao: 5 },
      { nome: 'Demais destinos',  valor: 475, unidade: 'mi L', participacao: 19 }
    ],

    fontes: [
      { org: 'Comex Stat', serie: 'Exportação — NCM 2207 (álcool etílico)', ano: '2024' },
      { org: 'ANP', serie: 'Vendas de combustíveis por segmento', ano: '2024' },
      { org: 'UNICA', serie: 'Destinação da produção de etanol', ano: '2023/24' }
    ]
  }
};

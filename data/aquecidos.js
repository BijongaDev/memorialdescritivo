/* =========================================================================
   MEMORIAL DESCRITIVO — AQUECIDOS
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Números compilados de publicações públicas de Comex Stat, ABIOVE, ANP,
   ABRAPALMA e CONAB. Servem como conteúdo de referência: antes de uso
   comercial, cada valor deve ser conferido contra a última edição da série
   citada em `fontes`.

   Pontos frágeis, em ordem de risco:
     • os volumes nacionais de sebo bovino e de parafinas (§4) são os menos
       firmes do arquivo. Não há série pública mensal consolidada para
       nenhum dos dois; ambos foram estimados a partir de abate e de refino;
     • a divisão do consumo por setor (§5) é estimativa — o grupo reúne
       produtos de cadeias diferentes e nenhuma entidade publica um consumo
       agregado de "aquecidos";
     • a §5 NÃO traz recorte por estado de propósito. Seria preciso inventar
       um proxy geográfico, e nenhum dos disponíveis serve para um grupo tão
       heterogêneo. Melhor não ter do que ter errado.

   Estrutura: este é o único grupo definido por condição operacional, e não
   por química. A §2 descreve a cadeia do óleo de palma, o aquecido importado
   de maior volume e o mais representativo; os aquecidos nacionais — sebo e
   asfalto — entram na §3, porque ambos são, eles próprios, coprodutos de
   outras cadeias.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['aquecidos'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'aquecidos',
  nome: 'Aquecidos',
  subtitulo: 'Grupo de produto · Granéis que exigem tancagem aquecida',
  icone: 'aquecidos',
  resumo:
    'Este é o único grupo do terminal que não se define pela química, e sim ' +
    'pela temperatura. Um produto entra aqui quando solidifica ou fica viscoso ' +
    'demais para ser bombeado à temperatura ambiente — e por isso o grupo ' +
    'atravessa todos os outros: óleo de palma também é óleo vegetal, asfalto ' +
    'também é derivado de petróleo, sebo bovino também é matéria-prima de ' +
    'biodiesel. O que eles têm em comum é a serpentina, o isolamento térmico e ' +
    'a linha que não pode esfriar.',

  destaques: [
    { valor: 480, unidade: 'mil t', rotulo: 'Óleo de palma e palmiste importados em 2024', decimais: 0 },
    { valor: 55,  unidade: '%',     rotulo: 'Dessas importações vêm da Indonésia', decimais: 0 },
    { valor: 33,  unidade: '°C',    rotulo: 'Ponto de fusão do óleo de palma bruto', decimais: 0 },
    { valor: 160, unidade: '°C',    rotulo: 'Manuseio do asfalto — o mais quente do grupo', decimais: 0 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'O aquecido importado de maior volume é o óleo de palma, e a palma cresce ' +
      'onde chove muito o ano inteiro, perto da linha do Equador: Sudeste ' +
      'Asiático, Golfo da Guiné e norte da América do Sul. O Brasil produz palma ' +
      'no Pará, em volume até maior que o importado, mas a distância entre a ' +
      'produção paraense e o consumo do Centro-Sul mantém o fluxo de importação ' +
      'pelos portos do Sul e do Sudeste. Os demais aquecidos do grupo têm origem ' +
      'nacional e cadeia própria — asfalto vem das refinarias e sebo vem dos ' +
      'frigoríficos —, e por isso aparecem na seção de coprodutos.',

    // Sem `uf`: origens são países, então a seção não desenha o mapa do Brasil.
    regioes: [
      {
        nome: 'Indonésia',
        valor: 264, unidade: 'mil t', participacao: 55,
        detalhe: 'Maior produtor e maior exportador mundial, com plantios em ' +
                 'Sumatra e Kalimantan. Define o preço de referência da palma e a ' +
                 'disponibilidade global — inclusive quando restringe exportação ' +
                 'para abastecer o mercado interno.'
      },
      {
        nome: 'Malásia',
        valor: 96, unidade: 'mil t', participacao: 20,
        detalhe: 'Segunda maior origem, com parque de refino maduro e forte ' +
                 'oferta de frações já separadas — oleína e estearina — em vez de ' +
                 'óleo bruto.'
      },
      {
        nome: 'Colômbia',
        valor: 58, unidade: 'mil t', participacao: 12,
        detalhe: 'Maior produtor das Américas. Travessia curta pelo Caribe, o que ' +
                 'reduz tempo sob aquecimento e favorece cargas menores e mais ' +
                 'frequentes.'
      },
      {
        nome: 'Guatemala',
        valor: 29, unidade: 'mil t', participacao: 6,
        detalhe: 'Produtividade por hectare entre as mais altas do mundo. Origem ' +
                 'próxima, usada como complemento das cargas asiáticas.'
      },
      {
        nome: 'Honduras',
        valor: 19, unidade: 'mil t', participacao: 4,
        detalhe: 'Volume menor e concentrado em óleo bruto, geralmente em cargas ' +
                 'combinadas com outras origens centro-americanas.'
      },
      {
        nome: 'Demais origens',
        valor: 14, unidade: 'mil t', participacao: 3,
        detalhe: 'Equador, Costa Rica, Papua-Nova Guiné e cargas de oportunidade.'
      }
    ],

    // Rota de importação. Cada nó abaixo de 33 °C é risco de solidificação.
    rota: [
      { nome: 'Plantio de dendê' },
      { nome: 'Usina de extração' },
      { nome: 'Embarque aquecido' },
      { nome: 'Travessia' },
      { nome: 'Paranaguá', marco: true },
      { nome: 'Tanque com serpentina' }
    ],
    legendaRota:
      'A cadeia do aquecido é uma cadeia térmica: da usina ao tanque do cliente, ' +
      'o produto não pode cruzar o ponto de fusão. A travessia do Sudeste ' +
      'Asiático leva de 35 a 45 dias em tanque aquecido de navio; da Colômbia, ' +
      'cerca de 12 dias. Tempo sob temperatura também degrada — aquecer demais, ' +
      'ou por tempo demais, oxida o produto e derruba a especificação.',

    fontes: [
      { org: 'Comex Stat', serie: 'Importação — NCM 1511 e 1513 (palma e palmiste)', ano: '2024' },
      { org: 'ABIOVE', serie: 'Óleos vegetais — importação por origem', ano: '2024' },
      { org: 'ABRAPALMA', serie: 'Produção brasileira de óleo de palma', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'A palma é o oposto da soja em quase tudo. O fruto não pode esperar: ' +
      'colhido, começa a se degradar em horas, então a usina de extração fica ' +
      'dentro da própria plantação. Não há solvente — a extração é mecânica, por ' +
      'prensagem. E o produto final não é um óleo só: o fracionamento separa uma ' +
      'fase líquida e uma sólida, com pontos de fusão diferentes, que viram ' +
      'produtos comerciais distintos e exigem temperaturas de manuseio ' +
      'diferentes no tanque.',

    etapas: [
      {
        nome: 'Colheita',
        descricao:
          'Os cachos de frutos frescos são cortados e precisam chegar à usina em ' +
          'poucas horas. Depois de colhido, o fruto ativa enzimas que quebram o ' +
          'óleo e elevam a acidez livre — perda que não se recupera em nenhuma ' +
          'etapa posterior.',
        parametros: [
          { rotulo: 'Prazo até a usina', valor: '< 24 h' },
          { rotulo: 'Acidez livre alvo', valor: '< 5%' }
        ]
      },
      {
        nome: 'Esterilização',
        descricao:
          'Os cachos são tratados com vapor sob pressão. O calor inativa as ' +
          'enzimas que degradam o óleo, solta os frutos do cacho e amolece a ' +
          'polpa. É a etapa que estanca a perda de qualidade iniciada na colheita.',
        parametros: [
          { rotulo: 'Vapor', valor: '130–140 °C' },
          { rotulo: 'Tempo', valor: '60–90 min' }
        ],
        marco: true
      },
      {
        nome: 'Prensagem',
        descricao:
          'A polpa é prensada em prensa de rosca e libera o óleo de palma bruto. ' +
          'A amêndoa fica intacta e segue por linha separada, para dar origem ao ' +
          'óleo de palmiste — um óleo quimicamente diferente, apesar do mesmo ' +
          'fruto.',
        parametros: [
          { rotulo: 'Rendimento em óleo', valor: '20–24% do cacho' },
          { rotulo: 'Extração', valor: 'mecânica, sem solvente' }
        ]
      },
      {
        nome: 'Clarificação',
        descricao:
          'Decantação e centrifugação separam sólidos e água arrastados na ' +
          'prensagem. Sai daqui o óleo de palma bruto, que já é produto de ' +
          'exportação a granel.',
        parametros: [
          { rotulo: 'Umidade', valor: '< 0,1%' },
          { rotulo: 'Impurezas', valor: '< 0,02%' }
        ]
      },
      {
        nome: 'Refino',
        descricao:
          'Degomagem, branqueamento com terra clarificante e desodorização a ' +
          'vácuo. No caso da palma, o refino também retira o carotenoide que dá a ' +
          'cor alaranjada intensa do óleo bruto.',
        parametros: [
          { rotulo: 'Desodorização', valor: '240–260 °C' },
          { rotulo: 'Pressão', valor: '2–4 mbar' }
        ]
      },
      {
        nome: 'Fracionamento',
        descricao:
          'Resfriamento controlado cristaliza a fração saturada, separada por ' +
          'filtração. Resultam a oleína, líquida à temperatura ambiente, e a ' +
          'estearina, sólida — dois produtos com pontos de fusão distintos e, ' +
          'portanto, com exigências de tancagem distintas.',
        parametros: [
          { rotulo: 'Cristalização', valor: '20–24 °C' },
          { rotulo: 'Produtos', valor: 'oleína e estearina' }
        ],
        marco: true
      },
      {
        nome: 'Tancagem aquecida',
        descricao:
          'Cada produto tem sua janela térmica. Abaixo dela, solidifica na linha e ' +
          'na serpentina; acima dela, oxida e perde especificação. Tanque com ' +
          'serpentina, isolamento e controle de temperatura são o que define este ' +
          'grupo — mais do que a natureza do produto.',
        parametros: [
          { rotulo: 'Óleo de palma', valor: '45–55 °C' },
          { rotulo: 'Estearina', valor: '60–70 °C' },
          { rotulo: 'Sebo bovino', valor: '45–50 °C' },
          { rotulo: 'Asfalto (CAP)', valor: '140–160 °C' }
        ]
      }
    ],
    fontes: [
      { org: 'ABRAPALMA', serie: 'Cadeia produtiva da palma — descrição de processo', ano: '2024' },
      { org: 'ABIOVE', serie: 'Manuseio e especificação de óleos vegetais', ano: '2024' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'A palma é o cultivo oleaginoso mais produtivo por hectare do mundo, mas em ' +
      'massa o cacho é quase todo resíduo: só cerca de um quinto vira óleo. O ' +
      'resto — fibra, casca, cachos vazios e efluente — fica na própria usina e ' +
      'faz dela energeticamente autossuficiente. Vale reparar nos dois últimos ' +
      'cards: sebo e asfalto são aquecidos nacionais que chegam ao terminal sendo, ' +
      'eles próprios, coprodutos de outras cadeias — o abate e o refino.',

    rendimento: {
      base: 'Para cada 100 kg de cachos de frutos frescos',
      entrada: { valor: 100, rotulo: 'kg de cachos' },
      saidas: [
        { nome: 'Efluente (POME)',      percentual: 25, unidade: 'kg', cor: 'var(--serie-5)' },
        { nome: 'Cachos vazios',        percentual: 22, unidade: 'kg', cor: 'var(--serie-3)' },
        { nome: 'Óleo de palma bruto',  percentual: 21, unidade: 'kg', cor: 'var(--serie-4)' },
        { nome: 'Fibra',                percentual: 14, unidade: 'kg', cor: 'var(--serie-2)' },
        { nome: 'Casca',                percentual: 6,  unidade: 'kg', cor: 'var(--navy-800)' },
        { nome: 'Amêndoas de palmiste', percentual: 6,  unidade: 'kg', cor: 'var(--amarelo-700)' },
        { nome: 'Perdas e umidade',     percentual: 6,  unidade: 'kg', cor: 'var(--cinza-300)' }
      ]
    },

    itens: [
      {
        nome: 'Óleo de palmiste',
        share: 'da amêndoa',
        descricao:
          'Extraído da amêndoa, não da polpa. Apesar da mesma origem, é um óleo ' +
          'quimicamente distinto, rico em ácido láurico — perfil parecido com o do ' +
          'coco e muito diferente do óleo de palma.',
        destino: 'Cosméticos, sabões, detergentes e gorduras especiais de confeitaria.'
      },
      {
        nome: 'Oleína e estearina',
        share: 'fracionamento',
        descricao:
          'As duas frações do óleo de palma. A oleína é líquida e vai para fritura ' +
          'industrial; a estearina é sólida e substitui gordura hidrogenada em ' +
          'aplicações que exigem consistência.',
        destino: 'Fritura industrial, margarinas, sorvetes, panificação e sabões.'
      },
      {
        nome: 'Fibra, casca e cachos vazios',
        share: '42 kg',
        descricao:
          'Fibra e casca são queimadas na caldeira da própria usina, que assim ' +
          'gera o vapor da esterilização e a energia elétrica que consome. Os ' +
          'cachos vazios voltam ao campo.',
        destino: 'Energia térmica e elétrica na usina; cobertura morta e adubação ' +
                 'orgânica no plantio.'
      },
      {
        nome: 'Efluente (POME) e biogás',
        share: '25 kg',
        descricao:
          'O efluente da usina é rico em matéria orgânica e, tratado em lagoas ' +
          'abertas, emite metano. Biodigestores fechados capturam esse metano e o ' +
          'transformam em energia — hoje uma das principais rotas de crédito de ' +
          'carbono do setor.',
        destino: 'Biogás para geração de energia; efluente tratado para fertirrigação.'
      },
      {
        nome: 'Sebo bovino e gorduras animais',
        share: 'aquecido nacional',
        descricao:
          'Coproduto do abate, e não de cultivo. O Brasil, como maior exportador ' +
          'mundial de carne bovina, gera sebo em escala — e ele se tornou a segunda ' +
          'matéria-prima do biodiesel nacional, atrás apenas do óleo de soja.',
        destino: 'Biodiesel, sabões, oleoquímica e nutrição animal.'
      },
      {
        nome: 'Asfalto (CAP)',
        share: 'aquecido nacional',
        descricao:
          'O fundo da torre de vácuo das refinarias — literalmente o que resta do ' +
          'barril. Sólido à temperatura ambiente e o mais quente do grupo em ' +
          'manuseio, o que impõe exigência térmica muito acima da dos óleos.',
        destino: 'Pavimentação rodoviária, impermeabilização e construção civil.'
      }
    ],
    fontes: [
      { org: 'ABRAPALMA', serie: 'Balanço de massa da usina de extração', ano: '2024' },
      { org: 'ABIOVE', serie: 'Matérias-primas para biodiesel — gorduras animais', ano: '2024' },
      { org: 'ANP', serie: 'Produção de asfalto por refinaria', ano: '2024' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'Não existe um "balanço de aquecidos" publicado por ninguém, porque o grupo ' +
      'é um recorte operacional e não uma categoria estatística. O que dá para ' +
      'fazer é somar os principais produtos que exigem tancagem aquecida no ' +
      'Brasil e comparar as ordens de grandeza. O resultado surpreende: o maior ' +
      'volume do grupo não é vegetal nem importado — é o asfalto das refinarias ' +
      'nacionais.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Asfalto (CAP)',
        valor: 1900, unidade: 'mil t', decimais: 0, cor: 'var(--serie-1)',
        nota: 'Maior volume do grupo. Produção nacional, ligada a investimento ' +
              'público em pavimentação.'
      },
      {
        rotulo: 'Sebo bovino',
        valor: 1200, unidade: 'mil t', decimais: 0, cor: 'var(--serie-2)',
        nota: 'Estimativa a partir do abate. Demanda puxada pelo biodiesel.'
      },
      {
        rotulo: 'Óleo de palma nacional',
        valor: 550, unidade: 'mil t', decimais: 0, cor: 'var(--serie-3)',
        nota: 'Concentrado no nordeste do Pará, longe do consumo do Centro-Sul.'
      },
      {
        rotulo: 'Palma e palmiste importados',
        valor: 480, unidade: 'mil t', decimais: 0, cor: 'var(--serie-4)',
        nota: 'Entra pelos portos do Sul e Sudeste, próximo da indústria.'
      }
    ],

    grafico: {
      titulo: 'Principais aquecidos no Brasil, por volume',
      unidade: 'mil t',
      decimais: 0,
      barras: [
        { rotulo: 'Asfalto (CAP)',        valor: 1900, cor: 'var(--serie-1)' },
        { rotulo: 'Sebo bovino',          valor: 1200, cor: 'var(--serie-2)' },
        { rotulo: 'Palma nacional',       valor: 550,  cor: 'var(--serie-3)' },
        { rotulo: 'Palma importada',      valor: 480,  cor: 'var(--serie-4)' },
        { rotulo: 'Parafinas',            valor: 140,  cor: 'var(--serie-5)' }
      ],
      legenda:
        'Produtos de cadeias diferentes, reunidos apenas pela exigência de ' +
        'tancagem aquecida. Não somam um mercado: servem para comparar ordens de ' +
        'grandeza. Valores em mil toneladas.'
    },

    notas: [
      'O que une o grupo é a temperatura, não a química — e isso o torna ' +
      'transversal. Óleo de palma também é óleo vegetal, asfalto também é ' +
      'derivado de petróleo, sebo também é matéria-prima de biodiesel. Um mesmo ' +
      'produto pode ser lido por dois memoriais diferentes, conforme a pergunta ' +
      'do cliente seja de cadeia ou de manuseio.',
      'Sebo bovino é hoje a segunda matéria-prima do biodiesel brasileiro. Cada ' +
      'elevação da mistura obrigatória no diesel puxa demanda por um aquecido ' +
      'que depende do ritmo de abate, não de safra — o que dá a ele um ciclo de ' +
      'oferta completamente diferente do dos óleos vegetais.',
      'Perda de temperatura é perda de produto. Um aquecido que solidifica no ' +
      'tanque ou na linha exige reaquecimento lento e controlado, e pode ' +
      'escalar para sinistro operacional. Neste grupo, integridade de serpentina ' +
      'e de isolamento pesa mais na decisão do cliente do que capacidade ' +
      'nominal de tancagem.',
      'Aquecer demais também destrói valor: tempo prolongado acima da faixa ' +
      'oxida o produto e derruba especificação. O ativo que o terminal vende ' +
      'aqui é controle térmico, não apenas volume.'
    ],
    fontes: [
      { org: 'ANP', serie: 'Produção de asfalto por refinaria', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 1511 e 1513 (palma e palmiste)', ano: '2024' },
      { org: 'ABRAPALMA', serie: 'Produção brasileira de óleo de palma', ano: '2024' },
      { org: 'CONAB', serie: 'Abate e disponibilidade de gorduras animais — estimativa', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'Os aquecidos se separam no destino tanto quanto se parecem no manuseio. ' +
      'Óleo de palma e suas frações vão para a indústria de alimentos, que ' +
      'valoriza a consistência sólida sem hidrogenação. Sebo vai para o ' +
      'biodiesel. Asfalto vai para a estrada, e acompanha o ciclo de obra ' +
      'pública, não o de safra ou de câmbio. A divisão abaixo é estimativa: ' +
      'nenhuma entidade publica consumo agregado de "aquecidos", porque a ' +
      'categoria só existe do ponto de vista de quem armazena. Por isso esta ' +
      'seção também não traz recorte por estado — não há proxy geográfico que ' +
      'sirva a um grupo tão heterogêneo, e um número inventado seria pior que ' +
      'nenhum.',

    tituloSetores: 'Consumo por setor',

    setores: [
      {
        nome: 'Alimentos e gorduras especiais',
        participacao: 34,
        descricao: 'Margarinas, gorduras de panificação e confeitaria, sorvetes e ' +
                   'óleo de fritura industrial. A palma ocupou o espaço da gordura ' +
                   'hidrogenada quando a gordura trans saiu das formulações.'
      },
      {
        nome: 'Pavimentação e construção',
        participacao: 26,
        descricao: 'Cimento asfáltico para rodovias e impermeabilizantes. Demanda ' +
                   'definida por orçamento público e cronograma de obra.'
      },
      {
        nome: 'Biodiesel',
        participacao: 22,
        descricao: 'Sebo bovino e gorduras residuais como matéria-prima de ' +
                   'transesterificação, segunda maior fonte depois do óleo de soja.'
      },
      {
        nome: 'Higiene, cosméticos e sabões',
        participacao: 12,
        descricao: 'Óleo de palmiste e estearina como base de tensoativos, sabões ' +
                   'em barra e produtos de cuidado pessoal.'
      },
      {
        nome: 'Velas, embalagens e outros',
        participacao: 6,
        descricao: 'Parafinas para velas, revestimento de papel e cartão, ceras ' +
                   'técnicas e aplicações industriais diversas.'
      }
    ],

    fontes: [
      { org: 'ABIOVE', serie: 'Consumo de óleos e gorduras por destinação — estimativa', ano: '2024' },
      { org: 'ANP', serie: 'Vendas de asfalto e matérias-primas de biodiesel', ano: '2024' },
      { org: 'ABRAPALMA', serie: 'Destinação do óleo de palma no Brasil', ano: '2024' }
    ]
  }
};

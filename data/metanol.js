/* =========================================================================
   MEMORIAL DESCRITIVO — METANOL
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Números compilados de publicações públicas de Comex Stat, ABIQUIM, ANP e
   Methanex/IMPCA. Servem como conteúdo de referência: antes de uso comercial,
   cada valor deve ser conferido contra a última edição da série citada em
   `fontes` e o ano atualizado.

   Dois pontos merecem atenção especial do time comercial:
     • a divisão do consumo por aplicação (§5) é a estimativa mais frágil do
       arquivo — não há série pública mensal de consumo de metanol por uso;
     • a distribuição por estado (§5) usa a capacidade autorizada de biodiesel
       como PROXY geográfico da demanda, e não como medida direta dela. Isso
       está dito no texto da seção, e precisa continuar dito.

   Estrutura: como o metanol é produto importado, a §1 troca o mapa do Brasil
   por uma lista de países de origem mais a rota de importação. O mapa aparece
   na §5, onde a geografia relevante é a da demanda brasileira.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['metanol'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'metanol',
  nome: 'Metanol',
  subtitulo: 'Grupo de produto · Granéis líquidos químicos',
  icone: 'metanol',
  resumo:
    'O metanol é o insumo que o Brasil não produz. Praticamente todo o volume ' +
    'consumido no país desembarca de navio, e é ele que transforma óleo vegetal ' +
    'em biodiesel e sustenta o formaldeído que cola os painéis de madeira. ' +
    'Molécula simples e cadeia curta — gás natural, gás de síntese, metanol — ' +
    'mas granel exigente: inflamável, tóxico, e incompatível com tancagem ' +
    'compartilhada.',

  destaques: [
    { valor: 1.3,  unidade: 'Mt', rotulo: 'Metanol importado pelo Brasil em 2024' },
    { valor: 93,   unidade: '%',  rotulo: 'Da oferta nacional vem de importação', decimais: 0 },
    { valor: 57,   unidade: '%',  rotulo: 'Do consumo vai para biodiesel', decimais: 0 },
    { valor: 45,   unidade: '%',  rotulo: 'Das importações vêm de Trinidad e Tobago', decimais: 0 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem do produto importado',
    intro:
      'A geografia do metanol é a geografia do gás natural barato. Como o custo ' +
      'do gás responde pela maior parte do custo de produção, as plantas se ' +
      'instalam onde há gás encalhado — sem mercado local nem gasoduto de saída — ' +
      'e exportam a molécula por navio. Daí o Atlântico do metanol: Trinidad e ' +
      'Tobago, a Costa do Golfo americana, o extremo sul do Chile e o Golfo da ' +
      'Guiné. A China, maior produtora mundial, faz metanol de carvão e consome ' +
      'quase tudo internamente, então quase não aparece no fluxo que chega aqui.',

    // Sem `uf`: nenhuma entrada casa com a malha do IBGE e a seção não desenha
    // o mapa do Brasil. Ver mapaBrasil() em js/charts.js.
    regioes: [
      {
        nome: 'Trinidad e Tobago',
        valor: 585, unidade: 'mil t', participacao: 45,
        detalhe: 'Complexo industrial de Point Lisas, o maior polo exportador de ' +
                 'metanol do Atlântico, alimentado pelo gás offshore da ilha. ' +
                 'Travessia curta e cadência regular — é o fornecedor de base do ' +
                 'mercado brasileiro.'
      },
      {
        nome: 'Estados Unidos',
        valor: 286, unidade: 'mil t', participacao: 22,
        detalhe: 'Costa do Golfo, no Texas e na Louisiana. O gás de xisto barato ' +
                 'reindustrializou o metanol americano a partir de 2015 e criou uma ' +
                 'segunda origem confiável no mesmo hemisfério.'
      },
      {
        nome: 'Chile',
        valor: 156, unidade: 'mil t', participacao: 12,
        detalhe: 'Cabo Negro, em Magallanes, no extremo sul do continente. Produção ' +
                 'limitada pela oferta de gás argentino e chileno, mas com a rota ' +
                 'mais curta até os portos do Sul do Brasil.'
      },
      {
        nome: 'Venezuela',
        valor: 91, unidade: 'mil t', participacao: 7,
        detalhe: 'Plantas do complexo de José, em Anzoátegui. Oferta irregular, ' +
                 'sensível a manutenção e a restrições comerciais — entra e sai do ' +
                 'ranking conforme o ano.'
      },
      {
        nome: 'Guiné Equatorial',
        valor: 65, unidade: 'mil t', participacao: 5,
        detalhe: 'Punta Europa, na ilha de Bioko, com gás associado à produção de ' +
                 'petróleo. Travessia transatlântica direta.'
      },
      {
        nome: 'Omã',
        valor: 52, unidade: 'mil t', participacao: 4,
        detalhe: 'Polo de Sohar, no Golfo de Omã. Carga longa, geralmente presente ' +
                 'quando o diferencial de preço compensa o frete.'
      },
      {
        nome: 'Demais origens',
        valor: 65, unidade: 'mil t', participacao: 5,
        detalhe: 'Rússia, Irã, Argélia e cargas de oportunidade, conforme arbitragem ' +
                 'de preço e disponibilidade de navio.'
      }
    ],

    // Rota de importação, no lugar do mapa. Nomes curtos: entram nos nós do SVG.
    rota: [
      { nome: 'Planta de metanol' },
      { nome: 'Embarque na origem' },
      { nome: 'Travessia' },
      { nome: 'Paranaguá', marco: true },
      { nome: 'Tancagem dedicada' },
      { nome: 'Rodovia ao cliente' }
    ],
    legendaRota:
      'Da planta ao consumidor. A travessia leva cerca de 12 a 16 dias vindo do ' +
      'Caribe e do Golfo do México, e mais de 30 dias vindo do Oriente Médio — ' +
      'prazo que define o giro de estoque que o cliente precisa manter em terra.',

    fontes: [
      { org: 'Comex Stat', serie: 'Importação — NCM 2905.11.00 (metanol)', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Anuário da indústria química brasileira', ano: '2024' },
      { org: 'Methanex', serie: 'Capacidade global e preços de referência', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'Metanol não se extrai: sintetiza-se. O gás natural é quebrado com vapor ' +
      'para virar gás de síntese, e o gás de síntese é recombinado sob pressão ' +
      'sobre um catalisador de cobre. A conversão por passe é baixa, então o gás ' +
      'circula muitas vezes no laço de síntese antes de virar produto. O que ' +
      'define o grau comercial não é a síntese, e sim a destilação final.',

    etapas: [
      {
        nome: 'Pré-tratamento do gás',
        descricao:
          'O gás natural passa por dessulfurização. Compostos de enxofre envenenam ' +
          'de forma irreversível os catalisadores de níquel e de cobre das etapas ' +
          'seguintes, então a remoção precisa ser praticamente total.',
        parametros: [
          { rotulo: 'Enxofre residual', valor: '< 0,1 ppm' }
        ]
      },
      {
        nome: 'Reforma a vapor',
        descricao:
          'Metano e vapor d’água reagem sobre catalisador de níquel em fornos ' +
          'tubulares, gerando gás de síntese — uma mistura de monóxido de carbono, ' +
          'dióxido de carbono e hidrogênio. É a etapa que consome energia e ' +
          'responde pela maior parte das emissões da planta.',
        parametros: [
          { rotulo: 'Temperatura', valor: '850–900 °C' },
          { rotulo: 'Pressão', valor: '15–25 bar' },
          { rotulo: 'Catalisador', valor: 'níquel' }
        ]
      },
      {
        nome: 'Compressão',
        descricao:
          'O gás de síntese é comprimido até a pressão de síntese e sua composição ' +
          'é ajustada para a proporção estequiométrica de hidrogênio e carbono. ' +
          'Excesso de hidrogênio é purgado e vira combustível.',
        parametros: [
          { rotulo: 'Pressão', valor: '50–100 bar' }
        ]
      },
      {
        nome: 'Síntese catalítica',
        descricao:
          'Monóxido de carbono e hidrogênio se combinam sobre catalisador de ' +
          'cobre-zinco-alumina, formando metanol. A reação é exotérmica e a ' +
          'conversão por passe é baixa, de modo que o gás não convertido é ' +
          'recirculado continuamente pelo laço de síntese.',
        parametros: [
          { rotulo: 'Temperatura', valor: '200–280 °C' },
          { rotulo: 'Catalisador', valor: 'Cu/ZnO/Al₂O₃' },
          { rotulo: 'Conversão por passe', valor: '4–8%' }
        ],
        marco: true
      },
      {
        nome: 'Destilação',
        descricao:
          'O metanol bruto vai a um trem de colunas: o topo separa os leves, como ' +
          'éter dimetílico, e o fundo retira água e alcoóis superiores. É aqui que ' +
          'se define o grau AA, especificação de referência do comércio ' +
          'internacional.',
        parametros: [
          { rotulo: 'Pureza', valor: '≥ 99,85%' },
          { rotulo: 'Água', valor: '≤ 0,10%' },
          { rotulo: 'Especificação', valor: 'IMPCA grau AA' }
        ],
        marco: true
      },
      {
        nome: 'Tancagem e embarque',
        descricao:
          'Armazenagem em tanques com colchão de nitrogênio para deslocar oxigênio, ' +
          'aterramento contra descarga eletrostática e linhas segregadas. Metanol é ' +
          'inflamável e tóxico por ingestão, inalação e contato — não admite ' +
          'compartilhamento de linha com produto alimentar.',
        parametros: [
          { rotulo: 'Ponto de fulgor', valor: '11 °C' },
          { rotulo: 'Classe de risco', valor: '3 — inflamável' },
          { rotulo: 'Inertização', valor: 'nitrogênio' }
        ]
      }
    ],
    fontes: [
      { org: 'ABIQUIM', serie: 'Processos da indústria química — metanol', ano: '2023' },
      { org: 'IMPCA', serie: 'Methanol Reference Specifications', ano: '2023' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'Em massa, a síntese do metanol é enxuta: o metanol bruto que sai do reator ' +
      'já é quase todo produto, e a destilação separa pouca coisa. O coproduto ' +
      'relevante não está nesse balanço — está uma etapa antes. A reforma do gás ' +
      'libera dióxido de carbono em volume maior que o do próprio metanol ' +
      'produzido, e é exatamente esse CO₂ que o metanol verde propõe usar como ' +
      'matéria-prima em vez de emitir.',

    rendimento: {
      base: 'Para cada 100 kg de metanol bruto que sai do reator',
      saidas: [
        { nome: 'Metanol grau AA',   percentual: 95.5, unidade: 'kg', cor: 'var(--serie-1)' },
        { nome: 'Água de processo',  percentual: 3.2,  unidade: 'kg', cor: 'var(--serie-5)' },
        { nome: 'Gases de purga',    percentual: 0.8,  unidade: 'kg', cor: 'var(--serie-3)' },
        { nome: 'Óleo fusel',        percentual: 0.3,  unidade: 'kg', cor: 'var(--amarelo-700)' },
        { nome: 'Leves e DME',       percentual: 0.2,  unidade: 'kg', cor: 'var(--serie-4)' }
      ]
    },

    itens: [
      {
        nome: 'Dióxido de carbono',
        share: 'reforma',
        descricao:
          'Uma planta a gás natural libera da ordem de 0,7 tonelada de CO₂ por ' +
          'tonelada de metanol, quase toda na reforma. Em rota a carvão, como a ' +
          'chinesa, esse número é várias vezes maior.',
        destino: 'Emissão; recuperação para uso industrial; e insumo do e-metanol, ' +
                 'que combina CO₂ capturado com hidrogênio renovável.'
      },
      {
        nome: 'Gases de purga',
        share: '0,8 kg',
        descricao:
          'Hidrogênio, metano e monóxido de carbono não convertidos, retirados do ' +
          'laço de síntese para evitar acúmulo de inertes.',
        destino: 'Queimados como combustível no próprio reformador, fechando o ' +
                 'balanço energético da planta.'
      },
      {
        nome: 'Óleo fusel',
        share: '0,3 kg',
        descricao:
          'Mistura de alcoóis superiores — etanol, propanol, isobutanol — separada ' +
          'no fundo das colunas de destilação.',
        destino: 'Solventes industriais e combustível interno.'
      },
      {
        nome: 'Água de processo',
        share: '3,2 kg',
        descricao:
          'Água formada na própria reação de síntese e arrastada com o metanol ' +
          'bruto, retirada na destilação.',
        destino: 'Tratada e reusada em caldeiras e torres de resfriamento.'
      },
      {
        nome: 'Enxofre',
        share: 'pré-tratamento',
        descricao:
          'Retirado do gás natural antes da reforma para proteger os catalisadores. ' +
          'Volume pequeno, mas com destino comercial estabelecido.',
        destino: 'Ácido sulfúrico e indústria de fertilizantes.'
      }
    ],
    fontes: [
      { org: 'ABIQUIM', serie: 'Processos da indústria química — metanol', ano: '2023' },
      { org: 'Methanex', serie: 'Responsible Care e intensidade de carbono', ano: '2024' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'O balanço do metanol brasileiro é o mais simples de ler entre os grupos ' +
      'movimentados no terminal, porque tem só um lado. Não há produção nacional ' +
      'relevante, não há exportação: há demanda, e há navio. Isso torna o volume ' +
      'movimentado em Paranaguá um espelho quase direto do consumo do Centro-Sul ' +
      '— e o preço interno, uma função do preço internacional somado ao frete.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Importação',
        valor: 1.3, unidade: 'Mt', decimais: 1, cor: 'var(--serie-1)',
        nota: 'Praticamente toda a oferta disponível no país.'
      },
      {
        rotulo: 'Consumo aparente',
        valor: 1.4, unidade: 'Mt', decimais: 1, cor: 'var(--serie-2)',
        nota: 'Importação mais produção nacional, ajustada por estoques.'
      },
      {
        rotulo: 'Produção nacional',
        valor: 0.1, unidade: 'Mt', decimais: 1, cor: 'var(--serie-3)',
        nota: 'Capacidade residual, concentrada no polo de Camaçari (BA).'
      },
      {
        rotulo: 'Dependência externa',
        valor: 93, unidade: '%', decimais: 0, cor: 'var(--serie-4)',
        nota: 'Sem projeto de planta nova em construção no país.'
      }
    ],

    grafico: {
      titulo: 'Oferta e uso de metanol no Brasil',
      unidade: 'Mt',
      decimais: 2,
      barras: [
        { rotulo: 'Consumo aparente', valor: 1.40, cor: 'var(--serie-1)' },
        { rotulo: 'Importação',       valor: 1.30, cor: 'var(--serie-2)' },
        { rotulo: 'Biodiesel',        valor: 0.80, cor: 'var(--serie-4)' },
        { rotulo: 'Formaldeído',      valor: 0.34, cor: 'var(--serie-3)' },
        { rotulo: 'Outros usos',      valor: 0.26, cor: 'var(--serie-3)' },
        { rotulo: 'Produção nacional', valor: 0.10, cor: 'var(--serie-5)' }
      ],
      legenda:
        'Biodiesel, formaldeído e outros usos são as parcelas do consumo aparente, ' +
        'não somas adicionais. Importação e produção nacional são os dois lados da ' +
        'oferta. Valores em milhões de toneladas.'
    },

    notas: [
      'O biodiesel brasileiro é feito por rota metílica, o que torna o metanol um ' +
      'insumo obrigatório e não substituível a curto prazo. Cada ponto percentual ' +
      'de mistura obrigatória no diesel adiciona da ordem de 55 mil toneladas de ' +
      'demanda anual de metanol.',
      'Sem produção nacional que sirva de âncora, o preço interno acompanha as ' +
      'referências internacionais e o frete marítimo. Volatilidade de frete se ' +
      'transmite ao custo do biodiesel em poucas semanas.',
      'Metanol como combustível marítimo é a fronteira nova: armadores já operam ' +
      'porta-contêineres a metanol e a IMO trata a molécula como rota de ' +
      'descarbonização. Para um terminal, isso desenha uma segunda demanda — ' +
      'abastecer navio, e não apenas indústria.'
    ],
    fontes: [
      { org: 'Comex Stat', serie: 'Importação — NCM 2905.11.00 (metanol)', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Anuário da indústria química brasileira', ano: '2024' },
      { org: 'ANP', serie: 'Painel dinâmico de produção de biocombustíveis', ano: '2024' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'Metanol tem duas aplicações grandes no Brasil e uma cauda química. O ' +
      'biodiesel puxa mais da metade do volume, e o formaldeído para resinas de ' +
      'painéis de madeira vem em seguida. A divisão por aplicação abaixo é ' +
      'estimativa: não há série pública mensal de consumo de metanol por uso. ' +
      'Já o mapa não mede consumo diretamente — mostra a capacidade autorizada ' +
      'de biodiesel por estado, o melhor indicador público disponível de onde a ' +
      'demanda está, e por que Paranaguá é a porta natural dela.',

    tituloSetores: 'Consumo por aplicação',
    tituloDestinos: 'Onde está a demanda — capacidade de biodiesel por estado',

    setores: [
      {
        nome: 'Biodiesel',
        participacao: 57,
        descricao: 'Transesterificação por rota metílica. Demanda definida por ' +
                   'regulação de mistura, não por preço.'
      },
      {
        nome: 'Formaldeído e resinas',
        participacao: 24,
        descricao: 'Resinas ureia-formaldeído e melamina que colam MDF, MDP, ' +
                   'compensados e laminados.'
      },
      {
        nome: 'Solventes e química fina',
        participacao: 11,
        descricao: 'Extração, limpeza industrial, tintas, adesivos e farmoquímica.'
      },
      {
        nome: 'Outros derivados',
        participacao: 8,
        descricao: 'Metilaminas, metacrilato de metila, silicones e biocidas.'
      }
    ],

    // Com `uf`, estas entradas pintam o mapa do IBGE na própria §5.
    destinos: [
      { nome: 'Mato Grosso',        uf: 'MT', participacao: 26 },
      { nome: 'Rio Grande do Sul',  uf: 'RS', participacao: 19 },
      { nome: 'Goiás',              uf: 'GO', participacao: 14 },
      { nome: 'Paraná',             uf: 'PR', participacao: 9 },
      { nome: 'São Paulo',          uf: 'SP', participacao: 8 },
      { nome: 'Mato Grosso do Sul', uf: 'MS', participacao: 7 },
      { nome: 'Bahia',              uf: 'BA', participacao: 6 },
      { nome: 'Demais estados',     uf: 'BR', participacao: 11 }
    ],
    legendaMapa:
      'Malha estadual do IBGE. A intensidade de cor acompanha a capacidade ' +
      'autorizada de produção de biodiesel — proxy da demanda de metanol, não ' +
      'medida direta dela.',

    fontes: [
      { org: 'ABIQUIM', serie: 'Consumo de metanol por aplicação — estimativa', ano: '2024' },
      { org: 'ANP', serie: 'Capacidade autorizada de produção de biodiesel por UF', ano: '2024' },
      { org: 'Comex Stat', serie: 'Importação — NCM 2905.11.00 (metanol)', ano: '2024' }
    ]
  }
};

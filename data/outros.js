/* =========================================================================
   MEMORIAL DESCRITIVO — OUTROS
   Contrato de dados: ver data/_schema.js

   >>> ATENÇÃO — VALIDAÇÃO DE DADOS <<<
   Este é o memorial com MENOS números do projeto, e isso é deliberado.
   "Outros" não é uma categoria estatística: é o que sobra quando os seis
   grupos anteriores já classificaram o resto. Nenhuma entidade publica série
   de "granéis líquidos especiais", porque a categoria só existe do ponto de
   vista de quem opera tancagem.

   A consequência é que aqui não há balanço de oferta e demanda somável, e
   inventar um seria o pior serviço possível ao time comercial. A §4 traz o
   tamanho de cada produto separadamente, com a fonte de cada um, e diz que
   não somam um mercado.

   Pontos frágeis:
     • os volumes da §4 vêm de fontes diferentes, com anos e metodologias
       diferentes. Servem para ordem de grandeza, não para comparação fina;
     • a §5 não traz recorte geográfico nem divisão percentual por setor,
       pelo mesmo motivo da §4. Os setores aparecem sem participação — o que
       importa aqui é QUAIS são, não quanto pesam;
     • a lista de produtos deste grupo muda conforme o contrato. Vale revisar
       com a operação antes de cada uso comercial.
   ========================================================================= */

window.MEMORIAIS = window.MEMORIAIS || {};

window.MEMORIAIS['outros'] = {

  /* ---------------------------------------------------------------- capa */
  slug: 'outros',
  nome: 'Outros',
  subtitulo: 'Grupo de produto · Granéis líquidos especiais',
  icone: 'outros',
  resumo:
    'Este grupo é definido por exclusão: reúne o que não coube nos seis ' +
    'anteriores. São cargas de volume pequeno, especificação apertada e ' +
    'contrato pontual — glicerina, óleos de base biológica, ácidos graxos, ' +
    'lignosulfonatos, melaço, ureia líquida. Individualmente, nenhuma delas ' +
    'sustenta um parque de tancagem. Juntas, ocupam o espaço entre campanhas ' +
    'dos granéis grandes e testam o que o terminal sabe fazer: segregar, ' +
    'limpar e certificar linha para um produto que nunca passou por ela.',

  destaques: [
    { valor: 6,   unidade: 'grupos', rotulo: 'Já classificam a maior parte do movimentado', decimais: 0 },
    { valor: 400, unidade: 'mil t',  rotulo: 'Glicerina bruta gerada pelo biodiesel brasileiro', decimais: 0 },
    { valor: 1,   unidade: 'carga',  rotulo: 'Basta uma para exigir linha dedicada e laudo', decimais: 0 },
    { valor: 100, unidade: '%',      rotulo: 'Das cargas exigem plano de limpeza específico', decimais: 0 }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro:
      'Não há uma matéria-prima comum aqui, e sim um padrão de origem: quase ' +
      'tudo neste grupo é subproduto de outra cadeia. A glicerina vem do ' +
      'biodiesel, os ácidos graxos vêm do refino de óleos vegetais, o melaço vem ' +
      'da produção de açúcar, os lignosulfonatos vêm da polpação da celulose. É ' +
      'a razão pela qual o grupo cresce quando as cadeias grandes crescem — e ' +
      'por que ele aparece, em quase todos os casos, dentro de algum dos outros ' +
      'seis memoriais como coproduto. Aqui ele é o produto.',

    /* Sem `uf`: as origens são cadeias industriais, não estados. Sem
       `participacao`: não há base comum contra a qual medir — as cadeias não
       são comparáveis entre si, e o render omite barra e percentual quando o
       campo falta. A ordem da lista é a única hierarquia declarada. */
    regioes: [
      {
        nome: 'Cadeia do biodiesel',
        detalhe: 'Origem da glicerina bruta e loira. Cada tonelada de biodiesel ' +
                 'produz cerca de um décimo de glicerina — o mandato de mistura ' +
                 'que puxa um puxa o outro.'
      },
      {
        nome: 'Refino de óleos vegetais',
        detalhe: 'Origem dos ácidos graxos destilados, borras e óleos ácidos, ' +
                 'retirados na neutralização e na desodorização.'
      },
      {
        nome: 'Cadeia sucroalcooleira',
        detalhe: 'Origem do melaço e de líquidos de fermentação. Volume ligado ao ' +
                 'mix açúcar-etanol de cada safra.'
      },
      {
        nome: 'Indústria de celulose',
        detalhe: 'Origem dos lignosulfonatos e do tall oil, subprodutos do ' +
                 'cozimento da madeira, usados como dispersantes e em resinas.'
      },
      {
        nome: 'Química e fertilizantes',
        detalhe: 'Origem da ureia líquida, soluções nitrogenadas e insumos de ' +
                 'especialidade, majoritariamente importados.'
      }
    ],
    fontes: [
      { org: 'ANP', serie: 'Produção de biodiesel e glicerina', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Química de especialidades — panorama setorial', ano: '2024' },
      { org: 'ABIOVE', serie: 'Correntes de refino de óleos vegetais', ano: '2024' }
    ]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro:
      'Como cada produto tem processo próprio, o fluxo que faz sentido descrever ' +
      'aqui não é o de fabricação: é o do terminal. Uma carga especial não chega ' +
      'a um tanque pronto — ela obriga a construir a condição antes de descarregar. ' +
      'Este é o roteiro que separa um terminal capaz de receber produto novo de ' +
      'um que só opera o que já opera, e é onde o grupo "Outros" deixa de ser ' +
      'sobra e vira competência.',

    etapas: [
      {
        nome: 'Análise de compatibilidade',
        descricao:
          'Antes de aceitar a carga, avalia-se a ficha de segurança e a ficha ' +
          'técnica: reatividade, corrosividade, faixa de temperatura, ' +
          'compatibilidade com o material do tanque, das juntas e das bombas. É a ' +
          'etapa que evita o erro caro.',
        parametros: [
          { rotulo: 'Documentos', valor: 'FISPQ e ficha técnica' },
          { rotulo: 'Avalia', valor: 'material, junta, bomba' }
        ],
        marco: true
      },
      {
        nome: 'Seleção do tanque',
        descricao:
          'Escolhe-se o tanque pelo histórico de produtos, não só pela ' +
          'capacidade. Um tanque que armazenou produto de odor forte não recebe ' +
          'carga alimentar; um que recebeu produto alcalino não recebe ácido sem ' +
          'tratamento completo.',
        parametros: [
          { rotulo: 'Critério', valor: 'histórico de carga' },
          { rotulo: 'Rastreio', valor: 'três produtos anteriores' }
        ]
      },
      {
        nome: 'Limpeza e certificação',
        descricao:
          'O tanque e a linha passam por limpeza, enxágue e inspeção, com plano ' +
          'específico para aquele produto. A liberação é documentada — é o laudo ' +
          'que o cliente arquiva, e o que responde por ele em caso de disputa de ' +
          'qualidade.',
        parametros: [
          { rotulo: 'Entregável', valor: 'laudo de limpeza' },
          { rotulo: 'Inspeção', valor: 'visual e analítica' }
        ],
        marco: true
      },
      {
        nome: 'Segregação de linha',
        descricao:
          'Define-se o caminho exclusivo entre o cais e o tanque, com bloqueios ' +
          'físicos e travas operacionais. Em produto de especificação apertada, ' +
          'contaminação cruzada não se corrige: a carga é rejeitada inteira.',
        parametros: [
          { rotulo: 'Bloqueio', valor: 'físico, não só procedural' },
          { rotulo: 'Amostragem', valor: 'antes e depois' }
        ]
      },
      {
        nome: 'Descarga e controle',
        descricao:
          'Descarga com amostragem em pontos definidos e acompanhamento de ' +
          'temperatura e vazão. As amostras são retidas por prazo contratado, ' +
          'para permitir contraprova.',
        parametros: [
          { rotulo: 'Amostras', valor: 'retidas por contrato' },
          { rotulo: 'Registro', valor: 'temperatura e vazão' }
        ]
      },
      {
        nome: 'Expedição e liberação',
        descricao:
          'Carregamento rodoviário ou ferroviário com laudo por lote, e liberação ' +
          'do tanque para o próximo produto — o que reinicia o ciclo de limpeza e ' +
          'certificação a partir da primeira etapa.',
        parametros: [
          { rotulo: 'Documento', valor: 'laudo por lote' },
          { rotulo: 'Ciclo', valor: 'reinicia a cada troca' }
        ]
      }
    ],
    fontes: [
      { org: 'ABIQUIM', serie: 'Boas práticas de armazenagem e movimentação de granéis', ano: '2023' },
      { org: 'ANP', serie: 'Regulamentação de instalações de armazenamento', ano: '2024' }
    ]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro:
      'Aqui a seção se inverte em relação aos outros memoriais. Nos demais ' +
      'grupos, listamos o que sai junto do produto principal. Neste, os próprios ' +
      'produtos são o que saiu junto de outra coisa — são os coprodutos das seis ' +
      'cadeias anteriores, chegando ao cais por conta própria. Por isso não há ' +
      'balanço de massa: não existe uma entrada comum da qual todos derivem.',

    itens: [
      {
        nome: 'Glicerina',
        share: 'do biodiesel',
        descricao:
          'Cerca de 10% em massa da transesterificação. O crescimento do mandato ' +
          'de mistura ampliou tanto a oferta que a glicerina bruta passou de ' +
          'receita a problema de destinação — o que abre espaço para quem ' +
          'consegue armazenar e agregar escala.',
        destino: 'Purificação para uso farmacêutico e cosmético, ração animal e ' +
                 'conversão em propilenoglicol e epicloridrina.'
      },
      {
        nome: 'Ácidos graxos e óleos ácidos',
        share: 'do refino',
        descricao:
          'Destilados de desodorização, soapstock e borras retiradas do refino de ' +
          'óleos vegetais. Baixo custo por tonelada e boa aplicação industrial.',
        destino: 'Oleoquímica, sabões, ração e matéria-prima alternativa de ' +
                 'biodiesel.'
      },
      {
        nome: 'Melaço',
        share: 'do açúcar',
        descricao:
          'O xarope residual da cristalização do açúcar, ainda rico em açúcares ' +
          'fermentescíveis. Viscoso, e por isso frequentemente movimentado com ' +
          'algum aquecimento.',
        destino: 'Nutrição animal, fermentação industrial, levedura e álcool.'
      },
      {
        nome: 'Lignosulfonatos e tall oil',
        share: 'da celulose',
        descricao:
          'Subprodutos do cozimento da madeira. Os lignosulfonatos funcionam como ' +
          'dispersantes e aglomerantes; o tall oil é base de resinas e adesivos.',
        destino: 'Aditivos de concreto, rações peletizadas, resinas, tintas e ' +
                 'adesivos.'
      },
      {
        nome: 'Ureia líquida e soluções nitrogenadas',
        share: 'importado',
        descricao:
          'Soluções de ureia para uso agrícola e para redução catalítica de ' +
          'emissões em motores a diesel. Carga corrosiva a certos metais e ' +
          'sensível a cristalização em temperatura baixa.',
        destino: 'Fertilizante fluido e agente redutor em sistemas de escape.'
      },
      {
        nome: 'Óleos de base biológica',
        share: 'especialidades',
        descricao:
          'Ésteres e óleos vegetais modificados que substituem base mineral em ' +
          'lubrificantes e fluidos. Volume pequeno, especificação rígida e preço ' +
          'por tonelada alto.',
        destino: 'Lubrificantes biodegradáveis, fluidos hidráulicos e ' +
                 'desmoldantes.'
      }
    ],
    fontes: [
      { org: 'ANP', serie: 'Produção de biodiesel e glicerina', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Química de especialidades — panorama setorial', ano: '2024' },
      { org: 'ABIOVE', serie: 'Correntes de refino de óleos vegetais', ano: '2024' }
    ]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro:
      'Este é o único memorial do projeto sem balanço de oferta e demanda, e a ' +
      'ausência é a informação. "Outros" não é categoria estatística: nenhuma ' +
      'entidade publica série de granéis líquidos especiais, porque a categoria ' +
      'só existe do ponto de vista de quem opera tancagem. O que dá para mostrar ' +
      'é o tamanho de cada produto isoladamente, cada um com a sua fonte. Eles ' +
      'não somam um mercado — e apresentá-los somados seria inventar um número ' +
      'que ninguém pode conferir.',
    ano: '2024',

    indicadores: [
      {
        rotulo: 'Glicerina bruta',
        valor: 400, unidade: 'mil t', decimais: 0, cor: 'var(--serie-1)',
        nota: 'Estimada a partir de 9 bi L de biodiesel e ~10% de rendimento.'
      },
      {
        rotulo: 'Ácidos graxos do refino',
        valor: 250, unidade: 'mil t', decimais: 0, cor: 'var(--serie-2)',
        nota: 'Ordem de grandeza a partir do volume de óleo vegetal refinado.'
      },
      {
        rotulo: 'Melaço',
        valor: 200, unidade: 'mil t', decimais: 0, cor: 'var(--serie-3)',
        nota: 'Excedente comercializado; a maior parte é consumida na própria usina.'
      },
      {
        rotulo: 'Especialidades diversas',
        valor: 150, unidade: 'mil t', decimais: 0, cor: 'var(--serie-4)',
        nota: 'Lignosulfonatos, tall oil, ureia líquida e óleos de base biológica.'
      }
    ],

    grafico: {
      titulo: 'Ordem de grandeza de cada corrente, isoladamente',
      unidade: 'mil t',
      decimais: 0,
      barras: [
        { rotulo: 'Glicerina bruta',   valor: 400, cor: 'var(--serie-1)' },
        { rotulo: 'Ácidos graxos',     valor: 250, cor: 'var(--serie-2)' },
        { rotulo: 'Melaço',            valor: 200, cor: 'var(--serie-3)' },
        { rotulo: 'Especialidades',    valor: 150, cor: 'var(--serie-4)' }
      ],
      legenda:
        'ATENÇÃO: estas barras NÃO somam um mercado. São quatro correntes de ' +
        'cadeias diferentes, estimadas de fontes diferentes, com anos e ' +
        'metodologias diferentes. Servem para comparar ordem de grandeza entre si ' +
        'e com os outros grupos do terminal — nada além disso.'
    },

    notas: [
      'Todo produto deste grupo é subproduto de outra cadeia. Isso significa que ' +
      'a oferta não responde à demanda dele: responde à demanda do produto ' +
      'principal. Glicerina aparece porque o mandato de biodiesel subiu, não ' +
      'porque alguém quis mais glicerina — e o preço reflete isso.',
      'É o grupo com a maior razão entre valor por tonelada e volume. Cargas ' +
      'pequenas de especificação apertada pagam mais por metro cúbico de tanque ' +
      'do que granel de escala, e ocupam o espaço entre campanhas dos produtos ' +
      'grandes.',
      'O risco operacional também é o mais alto, e por motivo estrutural: é ' +
      'sempre a primeira vez. Um produto que nunca passou pela linha não tem ' +
      'histórico, e a análise de compatibilidade precisa ser feita do zero — ' +
      'é aí que a competência do terminal aparece ou falha.',
      'Vale revisar a composição deste grupo com a operação antes de cada uso ' +
      'comercial. Diferente dos outros seis, a lista de produtos aqui muda ' +
      'conforme o contrato, e um memorial desatualizado engana mais do que ' +
      'informa.'
    ],
    fontes: [
      { org: 'ANP', serie: 'Produção de biodiesel e glicerina', ano: '2024' },
      { org: 'ABIQUIM', serie: 'Química de especialidades — panorama setorial', ano: '2024' },
      { org: 'ABIOVE', serie: 'Correntes de refino de óleos vegetais', ano: '2024' },
      { org: 'CONAB', serie: 'Subprodutos da cadeia sucroalcooleira', ano: '2023/24' }
    ]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro:
      'Os setores abaixo aparecem sem percentual, e isso é deliberado. Como as ' +
      'correntes deste grupo vêm de cadeias diferentes e não somam um mercado, ' +
      'qualquer divisão percentual seria uma conta sobre uma base que não ' +
      'existe. O que importa comercialmente aqui não é quanto cada setor pesa, e ' +
      'sim quais são — porque é essa lista que define para quem o terminal ' +
      'consegue oferecer a carga quando ela aparece. Pelo mesmo motivo, não há ' +
      'recorte por estado nem por país.',

    tituloSetores: 'Setores que absorvem estas correntes',

    setores: [
      {
        nome: 'Oleoquímica',
        descricao: 'Ácidos graxos, glicerina e óleos modificados como matéria-prima ' +
                   'de tensoativos, sabões, lubrificantes e ésteres.'
      },
      {
        nome: 'Nutrição animal',
        descricao: 'Melaço, óleos ácidos e glicerina bruta como fonte energética em ' +
                   'rações, sobretudo de ruminantes.'
      },
      {
        nome: 'Farmacêutica e cosmética',
        descricao: 'Glicerina purificada em grau USP, e ésteres de origem vegetal ' +
                   'em formulações de cuidado pessoal.'
      },
      {
        nome: 'Construção e mineração',
        descricao: 'Lignosulfonatos como aditivo plastificante de concreto e como ' +
                   'aglomerante para controle de poeira.'
      },
      {
        nome: 'Agricultura',
        descricao: 'Ureia líquida e soluções nitrogenadas aplicadas como ' +
                   'fertilizante fluido, em janela sazonal estreita.'
      },
      {
        nome: 'Tintas, resinas e adesivos',
        descricao: 'Tall oil e derivados como base de resinas alquídicas e de ' +
                   'adesivos industriais.'
      }
    ],

    fontes: [
      { org: 'ABIQUIM', serie: 'Química de especialidades — aplicações setoriais', ano: '2024' },
      { org: 'ABIOVE', serie: 'Destinação de correntes de refino', ano: '2024' }
    ]
  }
};

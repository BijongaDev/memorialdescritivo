/* =========================================================================
   Índice dos grupos de produto — alimenta os cards do hub.
   A ordem deste array é a ordem exibida na tela.

   status: 'pronto'  -> card clicável, abre o memorial
           'breve'   -> card em estado "em breve", não navega
   ========================================================================= */

window.GRUPOS = [
  {
    slug: 'oleo-vegetal',
    nome: 'Óleo Vegetal',
    icone: 'oleo-vegetal',
    descricao: 'Óleo de soja degomado e refinado, palma, girassol e canola — ' +
               'o elo entre a lavoura brasileira e a mesa do mundo.',
    chip: 'Soja · Palma · Girassol',
    status: 'pronto'
  },
  {
    slug: 'metanol',
    nome: 'Metanol',
    icone: 'metanol',
    descricao: 'Insumo químico importado, base do biodiesel brasileiro e da ' +
               'cadeia de resinas e formaldeído.',
    chip: 'Importação · Química',
    status: 'pronto'
  },
  {
    slug: 'derivados',
    nome: 'Derivados',
    icone: 'derivados',
    descricao: 'Derivados de petróleo e petroquímicos: solventes, bases ' +
               'lubrificantes e aromáticos.',
    chip: 'Refino · Petroquímica',
    status: 'pronto'
  },
  {
    slug: 'aquecidos',
    nome: 'Aquecidos',
    icone: 'aquecidos',
    descricao: 'Produtos que exigem tancagem aquecida e serpentina: parafinas, ' +
               'asfaltos, óleo de palma e gorduras.',
    chip: 'Tancagem aquecida',
    status: 'pronto'
  },
  {
    slug: 'soda-caustica',
    nome: 'Soda Cáustica',
    icone: 'soda-caustica',
    descricao: 'Hidróxido de sódio em solução: celulose, alumina, saneamento ' +
               'e indústria química.',
    chip: 'Cloro-álcalis',
    status: 'pronto'
  },
  {
    slug: 'biocombustiveis',
    nome: 'Biocombustíveis',
    icone: 'biocombustiveis',
    descricao: 'Etanol, biodiesel e a nova fronteira de combustíveis de baixo ' +
               'carbono para exportação.',
    chip: 'Etanol · Biodiesel · SAF',
    status: 'pronto'
  },
  {
    slug: 'outros',
    nome: 'Outros',
    icone: 'outros',
    descricao: 'Granéis líquidos especiais movimentados sob demanda, de ' +
               'glicerina a óleos de base biológica.',
    chip: 'Especialidades',
    status: 'pronto'
  }
];

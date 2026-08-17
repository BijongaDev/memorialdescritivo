/* =========================================================================
   SCHEMA DO OBJETO DE MEMORIAL  —  referência e template
   =========================================================================

   Este arquivo NÃO é carregado pelo index.html. Ele existe para dois fins:
     1. Documentar o contrato de dados que o render.js espera.
     2. Servir de ponto de partida: copie para `data/<slug>.js`, troque o slug
        e preencha.

   REGRAS
   ------
   • Todo texto, número e fonte vive aqui. O HTML/JS nunca traz conteúdo.
   • Números são NUMBER (não string) — os gráficos calculam escala com eles.
     A formatação pt-BR é feita no render (1.234,5).
   • Percentuais são NUMBER de 0 a 100.
   • Campos marcados [opcional] podem ser omitidos ou receber [] — o render
     simplesmente não desenha o bloco.
   • Cada seção tem `fontes: []`. Nenhum número entra sem fonte + ano.
   • A ordem das 5 seções é fixa: origem, processo, coprodutos, balanco,
     mercados. Os títulos são editáveis por grupo.

   ========================================================================= */

window.MEMORIAL_SCHEMA = {

  /* ---------------------------------------------------------------- capa */
  slug: 'exemplo',            // = chave em window.MEMORIAIS e o #hash da URL
  nome: 'Nome do Grupo',      // título grande do memorial
  subtitulo: 'Linha curta de posicionamento',
  icone: 'exemplo',           // arquivo em /assets/icons/<icone>.svg
  resumo: 'Dois a três períodos explicando o grupo em linguagem comercial.',

  // Faixa de números-chave no topo. Ideal: 3 ou 4.
  destaques: [
    {
      valor: 147.4,           // number
      unidade: 'Mt',          // [opcional] sufixo pequeno ao lado do valor
      rotulo: 'Do que é este número, com ano',
      decimais: 1             // [opcional] default 1
    }
  ],

  /* -------------------------------------------- §1 origem da matéria-prima */
  origem: {
    titulo: 'Origem da matéria-prima',
    intro: 'Parágrafo de abertura da seção.',

    /* Ranking de regiões produtoras. `participacao` alimenta as barras da
       lista E a intensidade de cor da UF no mapa (escala relativa ao maior
       valor da lista, em 5 degraus).

       O mapa usa a malha estadual oficial do IBGE (data/malha-uf.js): basta
       a sigla em `uf` — a forma e a posição do rótulo vêm da malha, não há
       coordenada para informar à mão.

       Linhas agregadas ("Demais estados") podem usar uma sigla que não existe
       na malha, como 'BR': aparecem na lista e são ignoradas no mapa. */
    regioes: [
      {
        nome: 'Mato Grosso',
        uf: 'MT',                       // [opcional] sigla; pinta a UF no mapa
        valor: 39.4,                    // [opcional] volume
        unidade: 'Mt',                  // [opcional]
        participacao: 26.7,             // 0–100: barra da lista + cor no mapa
        detalhe: 'Uma frase de contexto.',   // [opcional]
        mapaRotulo: { x: 47, y: 45 }     // [opcional] só para deslocar o rótulo
                                         // de uma UF pequena; o padrão é o
                                         // centroide calculado da malha
      }
    ],
    legendaMapa: 'Nota de leitura do mapa.',   // [opcional]

    /* A fonte da malha (IBGE) é anexada automaticamente pelo render sempre que
       o mapa é desenhado — não precisa repetir aqui. */
    fontes: [{ org: 'CONAB', serie: 'Levantamento de Safra', ano: '2023/24' }]
  },

  /* ----------------------------------------------- §2 fluxograma de produção */
  processo: {
    titulo: 'Fluxograma de produção',
    intro: 'Parágrafo de abertura.',

    // Vira o fluxograma SVG (nomes curtos) + a lista de etapas detalhadas.
    // 4 a 8 etapas funcionam bem no SVG.
    etapas: [
      {
        nome: 'Recepção',               // curto: entra dentro do nó do SVG
        descricao: 'O que acontece nesta etapa.',
        parametros: [                   // [opcional] chips técnicos
          { rotulo: 'Umidade', valor: '10–12%' }
        ],
        marco: false                    // [opcional] true = nó navy destacado
      }
    ],
    fontes: [{ org: 'ABIOVE', serie: 'Processo industrial', ano: '2024' }]
  },

  /* ------------------------------------------- §3 subprodutos e coprodutos */
  coprodutos: {
    titulo: 'Subprodutos e coprodutos',
    intro: 'Parágrafo de abertura.',

    // Balanço de massa animado. A soma de `percentual` deve fechar em 100.
    rendimento: {
      base: 'Para cada 100 kg de soja processada',   // rótulo da entrada
      saidas: [
        { nome: 'Farelo', percentual: 78.5, unidade: 'kg', cor: 'var(--serie-2)' }
      ]
    },

    // Cards descritivos. Podem ou não espelhar as saídas do rendimento.
    itens: [
      {
        nome: 'Farelo de soja',
        share: '78,5 kg',               // [opcional] chip amarelo
        descricao: 'O que é.',
        destino: 'Para onde vai.'       // [opcional]
      }
    ],
    fontes: [{ org: 'ABIOVE', serie: 'Rendimento industrial', ano: '2024' }]
  },

  /* ------------------------------------------------------ §4 balanço Brasil */
  balanco: {
    titulo: 'Balanço Brasil',
    intro: 'Parágrafo de abertura.',
    ano: '2024',                        // ano de referência do balanço

    // Tiles. `cor` pinta a régua superior; `variacao` é o chip a/a.
    indicadores: [
      {
        rotulo: 'Produção',
        valor: 11.0,
        unidade: 'Mt',
        decimais: 1,                    // [opcional]
        cor: 'var(--serie-1)',          // [opcional]
        variacao: 2.4,                  // [opcional] % a/a; sinal define cor
        nota: 'Detalhe curto.'          // [opcional]
      }
    ],

    // Gráfico de barras da seção. Omitir para não desenhar.
    grafico: {                          // [opcional]
      titulo: 'Oferta e demanda',
      unidade: 'Mt',
      decimais: 1,                      // [opcional] casas nos rótulos das barras;
                                        // fixe para a série não misturar "11" e "9,7"
      barras: [
        { rotulo: 'Produção', valor: 11.0, cor: 'var(--serie-1)' }
      ],
      legenda: 'Nota de leitura do gráfico.'   // [opcional]
    },

    notas: ['Ressalvas metodológicas ou de conjuntura.'],   // [opcional]
    fontes: [{ org: 'ABIOVE', serie: 'Estatística Mensal', ano: '2024' }]
  },

  /* -------------------------------------------------- §5 mercados de destino */
  mercados: {
    titulo: 'Mercados de destino',
    intro: 'Parágrafo de abertura.',

    // Coluna esquerda: para que serve, dentro do Brasil.
    setores: [                          // [opcional]
      {
        nome: 'Biodiesel',
        participacao: 57,               // 0–100
        descricao: 'Uma frase.'
      }
    ],

    // Coluna direita: para onde vai, fora do Brasil.
    destinos: [                         // [opcional]
      {
        pais: 'Índia',
        valor: 494,                     // [opcional]
        unidade: 'mil t',               // [opcional]
        participacao: 38                // 0–100
      }
    ],
    tituloSetores: 'Consumo interno por setor',   // [opcional]
    tituloDestinos: 'Destinos de exportação',     // [opcional]
    fontes: [{ org: 'Comex Stat', serie: 'Exportações', ano: '2024' }]
  }
};

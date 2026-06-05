export interface ModuleQuestionSeed {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  order: number;
}

export interface ModuleVideoSeed {
  title: string;
  videoId: string;
  code?: string;
  language?: string;
  order: number;
}

export interface ModulePDFSeed {
  name: string;
  description: string;
  url: string;
  filename: string;
  order: number;
}

export interface ModuleContentSeed {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  order: number;
  questions: ModuleQuestionSeed[];
  videos: ModuleVideoSeed[];
  pdfMaterials: ModulePDFSeed[];
}

const FUNDAMENTOS_CODE = `# Fundamentos de Ciência de Dados com Python
import pandas as pd
import numpy as np

inteiro = 42
flutuante = 3.14
texto = "Data Science"
booleano = True
lista = [1, 2, 3, 4, 5]

dados = pd.Series([23, 45, 12, 67, 34, 89, 55, 41])

print("Média:   ", dados.mean())
print("Mediana: ", dados.median())
print("Desvio:  ", round(dados.std(), 2))
print("Min/Max: ", dados.min(), "/", dados.max())

etapas = ["1. Coleta","2. Limpeza","3. Exploração","4. Modelagem","5. Visualização","6. Implantação"]
for etapa in etapas:
    print(etapa)
`;

const PANDAS_CODE = `# Manipulação de Dados com Pandas
import pandas as pd

dados = {
    "nome":    ["Ana", "Bruno", "Carla", "Diego"],
    "idade":   [25, 30, 22, 35],
    "salario": [4500, 7200, 3800, 9100],
    "cidade":  ["SP", "RJ", "MG", "SP"],
}
df = pd.DataFrame(dados)
print(df)

resultado = df[(df["cidade"] == "SP") & (df["salario"] > 5000)]
print(resultado)

agrupado = df.groupby("cidade")["salario"].mean()
print(agrupado)

df.to_csv("funcionarios.csv", index=False)
print("Exportado com sucesso!")
`;

const EXPLORACAO_CODE = `# Análise Exploratória de Dados (EDA)
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "idade": np.random.randint(18, 65, 100),
    "renda": np.random.normal(5000, 1500, 100).round(2),
    "score": np.random.uniform(0, 10, 100).round(1),
})

print(df.describe())

Q1 = df["renda"].quantile(0.25)
Q3 = df["renda"].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df["renda"] < Q1 - 1.5 * IQR) | (df["renda"] > Q3 + 1.5 * IQR)]
print(f"Outliers encontrados: {len(outliers)}")

print(df.corr(numeric_only=True).round(2))
print(df["score"].value_counts(bins=5, sort=False))
`;

export const moduleContent: ModuleContentSeed[] = [
  {
    slug: 'fundamentos',
    title: 'Fundamentos de Ciência de Dados e Python',
    description:
      'Introdução ao ciclo de vida dos dados, tipos de variáveis e os primeiros passos com Python para análise.',
    emoji: '🐍',
    order: 1,
    questions: [
      {
        text: 'Qual biblioteca Python é mais usada para manipulação de dados tabulares?',
        options: ['NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
        correctIndex: 2,
        explanation:
          'Pandas é a biblioteca padrão para manipulação de DataFrames e Series, oferecendo funções de filtro, agrupamento, leitura de CSV/Excel, entre muitas outras.',
        order: 1,
      },
      {
        text: 'Qual das opções NÃO é uma etapa do ciclo de vida dos dados?',
        options: ['Coleta', 'Limpeza', 'Compilação', 'Modelagem'],
        correctIndex: 2,
        explanation:
          'Compilação é um processo de programação de baixo nível, não uma etapa do pipeline de Ciência de Dados.',
        order: 2,
      },
      {
        text: 'O que a função describe() do Pandas retorna?',
        options: [
          'O tipo de cada coluna',
          'Estatísticas descritivas (média, desvio, min, max etc.)',
          'Os primeiros 5 registros do DataFrame',
          'O número de valores nulos',
        ],
        correctIndex: 1,
        explanation:
          'df.describe() retorna um resumo estatístico com count, mean, std, min, quartis e max para colunas numéricas.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'aula_01 - Variaveis e operadores',
        videoId: 'drive:1x3I3U8t0PV_rd-uAT2PDlGc-biU1dla6',
        code: FUNDAMENTOS_CODE,
        language: 'python',
        order: 1,
      },
    ],
    pdfMaterials: [
      {
        name: 'Projeto de Aulas Ciencia de Dados',
        description: 'PDF geral do modulo 1',
        url: '/assets/modulo-1/01-projeto-aulas-ciencia-de-dados.pdf',
        filename: '01-projeto-aulas-ciencia-de-dados.pdf',
        order: 1,
      },
      {
        name: 'Aula 01 - Introducao a Ciencia de Dados',
        description: 'Slides da aula 01',
        url: '/assets/modulo-1/02-aula-01-introducao-ciencia-de-dados.pdf',
        filename: '02-aula-01-introducao-ciencia-de-dados.pdf',
        order: 2,
      },
      {
        name: 'Aula 02 - Ciclo do Projeto',
        description: 'Slides da aula 02',
        url: '/assets/modulo-1/03-aula-02-ciclo-do-projeto.pdf',
        filename: '03-aula-02-ciclo-do-projeto.pdf',
        order: 3,
      },
      {
        name: 'Aula 03 - Python e Config',
        description: 'Slides da aula 03',
        url: '/assets/modulo-1/04-aula-03-python-e-config.pdf',
        filename: '04-aula-03-python-e-config.pdf',
        order: 4,
      },
      {
        name: 'Aula 04 - Tipos Basicos e Variaveis',
        description: 'Slides da aula 04',
        url: '/assets/modulo-1/05-aula-04-tipos-basicos-e-variaveis.pdf',
        filename: '05-aula-04-tipos-basicos-e-variaveis.pdf',
        order: 5,
      },
    ],
  },
  {
    slug: 'pandas',
    title: 'Python para Ciência de Dados (Pandas)',
    description:
      'Exemplos práticos de manipulação de dados com Pandas: filtros, agrupamentos e exportação.',
    emoji: '🐼',
    order: 2,
    questions: [
      {
        text: "Como filtrar registros em um DataFrame onde a coluna 'idade' seja maior que 30?",
        options: [
          "df.filter(df['idade'] > 30)",
          "df[df['idade'] > 30]",
          "df.where('idade' > 30)",
          'df.select(idade > 30)',
        ],
        correctIndex: 1,
        explanation:
          "A filtragem booleana df[condição] é a forma idiomática no Pandas. A condição df['idade'] > 30 retorna uma Series de booleanos usada como máscara.",
        order: 1,
      },
      {
        text: "O que o método groupby('cidade')['salario'].mean() faz?",
        options: [
          'Ordena salários por cidade',
          'Calcula a média de salário agrupada por cidade',
          'Filtra funcionários de uma cidade específica',
          'Conta o número de funcionários por cidade',
        ],
        correctIndex: 1,
        explanation:
          "groupby() agrupa linhas por valor de coluna e, combinado com mean(), calcula a média da coluna 'salario' para cada grupo.",
        order: 2,
      },
      {
        text: 'Qual método exporta um DataFrame para CSV?',
        options: [
          'df.export_csv()',
          "df.save('file.csv')",
          "df.to_csv('file.csv')",
          "df.write_csv('file.csv')",
        ],
        correctIndex: 2,
        explanation:
          "df.to_csv('nome.csv') é o método padrão para salvar um DataFrame em arquivo CSV. Use index=False para não incluir o índice como coluna extra.",
        order: 3,
      },
    ],
    videos: [
      {
        title: 'aula_01 - Introdução ao Pandas e Dados Tabulares',
        videoId: 'https://www.youtube.com/watch?v=XBxXgJcd5nU&list=PLGTqm-GzPhSHQxLOYmtxeEfMhnQvwOvdr',
        code: PANDAS_CODE,
        language: 'python',
        order: 1,
      },
      {
        title: 'aula_02 - Estruturas Fundamentais: Series',
        videoId: 'https://youtu.be/i4CsKbhW12k?si=weUYN1-mtJ7A3xNC',
        order: 2,
      },
      {
        title: 'Aula_03 - Estrutura Principal: DataFrame',
        videoId: 'https://www.youtube.com/watch?v=1K6ZNYpIMZED8vWr7YsphGopY8yisdmLo&list=PLGTqm-GzPhSHQxLOYmtxeEfMhnQvwOvdr',
        order: 3,
      },
      {
        title: 'Aula_04 - Leitura de Arquivos (CSV e Excel)',
        videoId: 'https://youtu.be/ft5XwV2zkUo',
        order: 4,
      },
      {
        title: 'Aula_05 - Tipos de Dados no Pandas',
        videoId: 'https://youtu.be/ft5XwV2zkUo',
        order: 5,
      },
      {
        title: 'Aula_06 - Seleção de Linhas e Colunas',
        videoId: 'https://studio.youtube.com/video/7srOGuyglAg/edit',
        order: 6,
      },
      {
        title: 'Aula_07 - Filtros e Consultas',
        videoId: 'https://youtu.be/RPkUx27KAiM?si=lJD5MLSetCEaynDL',
        order: 7,
      },
      {
        title: 'Aula_08 - Operação de Agregação',
        videoId: 'https://youtu.be/BytfizH37TA?si=5OsTNlY-dewG1ZpV',
        order: 8,
      },
      {
        title: 'Aula_09 - Renomeação e Organização de Dados',
        videoId: 'https://youtu.be/NF0Jh1wHkOU?si=hsic82ZmGCefJ8xz',
        order: 9,
      },
    ],
    pdfMaterials: [
      {
        name: 'Aula 1',
        description: 'PDF unico informado para o modulo 2',
        url: '/assets/modulo-2/01-aula-1.pdf',
        filename: '01-aula-1.pdf',
        order: 1,
      },
    ],
  },
  {
    slug: 'preprocessamento',
    title: 'Pré-Processamento de Dados',
    description:
      'Conceitos introdutórios e problemas práticos comuns em datasets reais, com foco em resolução utilizando Python e Pandas.',
    emoji: '⚙️',
    order: 5,
    questions: [
      {
        text: "Qual técnica ajuda a padronizar valores como ' SP ', 'sp' e 'São Paulo' em uma mesma coluna?",
        options: [
          'Apenas remover linhas duplicadas',
          'Aplicar limpeza de strings e mapeamento de categorias',
          'Calcular a média da coluna',
          'Exportar o arquivo para CSV',
        ],
        correctIndex: 1,
        explanation:
          'Limpeza de strings com strip/lower e mapeamento de categorias reduz inconsistências de representação antes da análise.',
        order: 1,
      },
      {
        text: 'Qual função do Pandas é indicada para converter textos de data para datetime?',
        options: ['pd.to_numeric()', 'pd.to_datetime()', 'df.astype("category")', 'df.dropna()'],
        correctIndex: 1,
        explanation:
          'pd.to_datetime() converte strings em datas, permitindo ordenar, filtrar e extrair partes como ano, mês e dia.',
        order: 2,
      },
      {
        text: 'Ao tratar duplicatas, qual é a abordagem mais segura?',
        options: [
          'Excluir todas as linhas repetidas sem analisar contexto',
          'Verificar a chave de negócio antes de usar drop_duplicates()',
          'Substituir duplicatas por zero',
          'Converter todas as colunas para texto',
        ],
        correctIndex: 1,
        explanation:
          'Duplicatas devem ser avaliadas conforme a regra do dataset; só depois faz sentido aplicar drop_duplicates() com subset adequado.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'aula_00_introdução',
        videoId: 'drive:1lFBTyQIKwuadr-t0A1dTt63ueYlwjhhP',
        order: 1,
      },
      {
        title: 'aula_00_overview',
        videoId: 'drive:1GnpaF4B7UR84ee1Fi9FQW6QQr0IyD5Ry',
        order: 2,
      },
      {
        title: 'Aula 1',
        videoId: 'drive:1K6ZNYpIMZED8vWr7YsphGopY8yisdmLo',
        order: 3,
      },
      {
        title: 'Aula 2',
        videoId: 'drive:1R7AtbHn1jSZ01ZqZXBGUODqDxctBseVk',
        order: 4,
      },
      {
        title: 'Aula 3',
        videoId: 'drive:1X9cuOROeBQ82eLRWMxA_0jcMia1XWGyY',
        order: 5,
      },
      {
        title: 'Aula 4',
        videoId: 'drive:16rWhS_MobJkvXzBc98kzuTjp-ApU8g6F',
        order: 6,
      },
    ],
    pdfMaterials: [
      {
        name: 'Introducao',
        description: 'PDF de introducao do modulo 5',
        url: '/assets/modulo-5/01-introducao.pdf',
        filename: '01-introducao.pdf',
        order: 1,
      },
      {
        name: 'Overview do Modulo',
        description: 'Visao geral do modulo 5',
        url: '/assets/modulo-5/02-overview-do-modulo.pdf',
        filename: '02-overview-do-modulo.pdf',
        order: 2,
      },
      {
        name: 'Aula 01',
        description: 'Slides da aula 01',
        url: '/assets/modulo-5/03-aula-01.pdf',
        filename: '03-aula-01.pdf',
        order: 3,
      },
      {
        name: 'Aula 02',
        description: 'Slides da aula 02',
        url: '/assets/modulo-5/04-aula-02.pdf',
        filename: '04-aula-02.pdf',
        order: 4,
      },
      {
        name: 'Aula 03',
        description: 'Slides da aula 03',
        url: '/assets/modulo-5/05-aula-03.pdf',
        filename: '05-aula-03.pdf',
        order: 5,
      },
      {
        name: 'Aula 04',
        description: 'Slides da aula 04',
        url: '/assets/modulo-5/06-aula-04.pdf',
        filename: '06-aula-04.pdf',
        order: 6,
      },
      {
        name: 'Aula 05',
        description: 'Slides da aula 05',
        url: '/assets/modulo-5/07-aula-05.pdf',
        filename: '07-aula-05.pdf',
        order: 7,
      },
      {
        name: 'Aula 07',
        description: 'Slides da aula 07',
        url: '/assets/modulo-5/08-aula-07.pdf',
        filename: '08-aula-07.pdf',
        order: 8,
      },
      {
        name: 'Aula 08',
        description: 'Slides da aula 08',
        url: '/assets/modulo-5/09-aula-08.pdf',
        filename: '09-aula-08.pdf',
        order: 9,
      },
      {
        name: 'Aula 09',
        description: 'Slides da aula 09',
        url: '/assets/modulo-5/10-aula-09.pdf',
        filename: '10-aula-09.pdf',
        order: 10,
      },
      {
        name: 'Aula 10',
        description: 'Slides da aula 10',
        url: '/assets/modulo-5/11-aula-10.pdf',
        filename: '11-aula-10.pdf',
        order: 11,
      },
      {
        name: 'Aula 11',
        description: 'Slides da aula 11',
        url: '/assets/modulo-5/12-aula-11.pdf',
        filename: '12-aula-11.pdf',
        order: 12,
      },
    ],
  },
  {
    slug: 'exploracao',
    title: 'Exploração de Dados e Estatística',
    description:
      'Como explorar conjuntos de dados, identificar padrões, detectar outliers e interpretar estatísticas.',
    emoji: '🔍',
    order: 3,
    questions: [
      {
        text: 'O que é IQR (Intervalo Interquartil)?',
        options: [
          'A média dos dados',
          'A diferença entre o 3º e o 1º quartil (Q3 - Q1)',
          'O desvio padrão da amostra',
          'A diferença entre o máximo e o mínimo',
        ],
        correctIndex: 1,
        explanation:
          'O IQR é Q3 - Q1 e mede a dispersão central dos dados. Ele é usado no método de Tukey para detectar outliers.',
        order: 1,
      },
      {
        text: 'Qual função do Pandas retorna a correlação entre todas as colunas numéricas?',
        options: ['df.describe()', 'df.info()', 'df.corr()', 'df.cov()'],
        correctIndex: 2,
        explanation:
          'df.corr() retorna a matriz de correlação de Pearson entre colunas numéricas.',
        order: 2,
      },
      {
        text: 'Para que serve o parâmetro bins em value_counts(bins=5)?',
        options: [
          'Limita o resultado a 5 valores',
          'Agrupa os dados em 5 intervalos contínuos',
          'Arredonda os valores para 5 casas decimais',
          'Filtra os 5 valores mais frequentes',
        ],
        correctIndex: 1,
        explanation:
          'Com bins=5, value_counts() divide o intervalo dos dados em 5 faixas e conta quantos valores caem em cada uma.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'Video_1',
        videoId: 'drive:1FepShl-qKbA-FEasi1UkAlpSR8NqltFA',
        code: EXPLORACAO_CODE,
        language: 'python',
        order: 1,
      },
      {
        title: 'Video_2',
        videoId: 'drive:1kA5EAOZwwyU3ozCwVXJDA14Sl2tC5VmZ',
        order: 2,
      },
      {
        title: 'Video_3',
        videoId: 'drive:1RrunL-bw8kONCkpFQDGMQdWX-XVwTgBX',
        order: 3,
      },
      {
        title: 'Video_4',
        videoId: 'drive:1phQ6SrUAiCIo2PUUKQWu5tJlDN0rFZIt',
        order: 4,
      },
      {
        title: 'Video_5',
        videoId: 'drive:1fDxhMl3zKE82GKbbFr7yb-nUNw83mNvs',
        order: 5,
      },
      {
        title: 'Video_6',
        videoId: 'drive:1QCPWYXEJcFJ9qMxgAgebadZ-GrX0N_Mg',
        order: 6,
      },
      {
        title: 'Video_7',
        videoId: 'drive:1G_qmQRAYz_V55_w-uamNHuPswDP3Ojxp',
        order: 7,
      },
      {
        title: 'Video_8',
        videoId: 'drive:1k2ny6__nx3-XR1zLx3PF3MZJ9DU5T7dF',
        order: 8,
      },
      {
        title: 'Aula_1',
        videoId: 'drive:16TOxH2XIUEBWJZUBEmb25GfNbNqsoYoJ',
        order: 9,
      },
      {
        title: 'Aula_2',
        videoId: 'drive:1ikRclglFB2qkAfKE8HkBCEJTronFTkhH',
        order: 10,
      },
      {
        title: 'Aula_3',
        videoId: 'drive:10lQ-w23yxaE36xoOI61zfTBgc3qnqD-f',
        order: 11,
      },
      {
        title: 'Aula_4',
        videoId: 'drive:11se2TD-F-lWGnKM2xhCI-mgLJazj7zUU',
        order: 12,
      },
      {
        title: 'Aula_5',
        videoId: 'drive:1_FQjKk6xMkKlGpEpJ2ci_uFrjcM0T2hj',
        order: 13,
      },
      {
        title: 'Aula_6',
        videoId: 'drive:1DL7WPNH5JeIAsacnva46uS3PJFGlW6rp',
        order: 14,
      },
      {
        title: 'Aula_7',
        videoId: 'drive:1WGg_mC2xgOrnzT0tARksGQtZk4mOMc0S',
        order: 15,
      },
      {
        title: 'Aula_8',
        videoId: 'drive:17YrrIPxPAnRAfLFhFW187imFwYxsbzjt',
        order: 16,
      },
    ],
    pdfMaterials: [
      {
        name: 'Modulo 3 - Video 1',
        description: 'PDF gerado a partir do notebook do video 1',
        url: '/assets/modulo-3/01-modulo-3-video-1.pdf',
        filename: '01-modulo-3-video-1.pdf',
        order: 1,
      },
      {
        name: 'Modulo 3 - Video 2',
        description: 'PDF gerado a partir do notebook do video 2',
        url: '/assets/modulo-3/02-modulo-3-video-2.pdf',
        filename: '02-modulo-3-video-2.pdf',
        order: 2,
      },
      {
        name: 'Modulo 3 - Video 3',
        description: 'PDF gerado a partir do notebook do video 3',
        url: '/assets/modulo-3/03-modulo-3-video-3.pdf',
        filename: '03-modulo-3-video-3.pdf',
        order: 3,
      },
      {
        name: 'Modulo 3 - Video 4',
        description: 'PDF gerado a partir do notebook do video 4',
        url: '/assets/modulo-3/04-modulo-3-video-4.pdf',
        filename: '04-modulo-3-video-4.pdf',
        order: 4,
      },
      {
        name: 'Modulo 3 - Video 5',
        description: 'PDF gerado a partir do notebook do video 5',
        url: '/assets/modulo-3/05-modulo-3-video-5.pdf',
        filename: '05-modulo-3-video-5.pdf',
        order: 5,
      },
      {
        name: 'Modulo 3 - Video 6',
        description: 'PDF gerado a partir do notebook do video 6',
        url: '/assets/modulo-3/06-modulo-3-video-6.pdf',
        filename: '06-modulo-3-video-6.pdf',
        order: 6,
      },
      {
        name: 'Modulo 3 - Video 7',
        description: 'PDF gerado a partir do notebook do video 7',
        url: '/assets/modulo-3/07-modulo-3-video-7.pdf',
        filename: '07-modulo-3-video-7.pdf',
        order: 7,
      },
      {
        name: 'Modulo 3 - Video 8',
        description: 'PDF gerado a partir do notebook do video 8',
        url: '/assets/modulo-3/08-modulo-3-video-8.pdf',
        filename: '08-modulo-3-video-8.pdf',
        order: 8,
      },
    ],
  },
  {
    slug: 'visualizacao',
    title: 'Visualização de Dados',
    description:
      'Técnicas para criar gráficos claros e informativos, desde histogramas até gráficos de dispersão.',
    emoji: '📊',
    order: 4,
    questions: [
      {
        text: 'Qual tipo de gráfico é mais adequado para mostrar a distribuição de uma variável contínua?',
        options: ['Gráfico de pizza', 'Histograma', 'Gráfico de barras', 'Scatter plot'],
        correctIndex: 1,
        explanation:
          'O histograma divide os dados em faixas e mostra a frequência de cada intervalo, sendo adequado para variáveis contínuas.',
        order: 1,
      },
      {
        text: 'Para comparar a relação entre duas variáveis numéricas, o melhor gráfico é:',
        options: ['Histograma', 'Gráfico de linhas', 'Scatter plot (dispersão)', 'Gráfico de barras'],
        correctIndex: 2,
        explanation:
          'O scatter plot plota pares (x, y), permitindo visualizar correlações, clusters e outliers.',
        order: 2,
      },
      {
        text: 'O que é uma boa prática ao criar visualizações?',
        options: [
          'Usar o máximo de cores possível',
          'Omitir legendas para simplificar',
          'Garantir que os eixos comecem em zero quando relevante',
          'Sempre usar gráficos 3D para mais impacto visual',
        ],
        correctIndex: 2,
        explanation:
          'Quando zero é referência natural, iniciar o eixo em zero evita distorções visuais e interpretações enganosas.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'aula_01',
        videoId: 'drive:1eF-HIBbwo9DB0n0dhMZ9SD1f95R332Ns',
        order: 1,
      },
      {
        title: 'aula_02',
        videoId: 'drive:16a-0reUPxvwoIpMF5sFc3_Zoq5-svIf_',
        order: 2,
      },
      {
        title: 'Aula_03',
        videoId: 'drive:1Ue49T8yIuN6RHraR0bIKb2j55qJKUCEp',
        order: 3,
      },
      {
        title: 'Aula_04',
        videoId: 'drive:12xoMJ7JxRki5lNwfCgHVA8dsc9T64P3s',
        order: 4,
      },
      {
        title: 'Aula_05',
        videoId: 'drive:1tKAvyg2awwF-eyztO2y34sasPA2ioQQm',
        order: 5,
      },
      {
        title: 'Aula_06',
        videoId: 'drive:159P41UdNqGnVPM_fdMDxDzBJo9qez1OQ',
        order: 6,
      },
      {
        title: 'Aula_07',
        videoId: 'drive:13-AvlMjB4NOl0IUD6I_XuoDba-2A0vpz',
        order: 7,
      },
      {
        title: 'Aula_08',
        videoId: 'drive:1FKf96qP8NOv2jEr8qcEPcWBgM0APL1Sn',
        order: 8,
      },
      {
        title: 'Aula_09',
        videoId: 'drive:17jAnDDcrcyZiaiC5gvmM5drEBdKL3orF',
        order: 9,
      },
      {
        title: 'Aula_10',
        videoId: 'drive:1j2rD_4V8KOLL-LWJTwtvZKywaflCZNDx',
        order: 10,
      },
      {
        title: 'Aula_11',
        videoId: 'drive:1qzHB63G_htrFooIV_5UC3A2Oe2E2B29E',
        order: 11,
      },
    ],
    pdfMaterials: [
      {
        name: 'Guia: Visualização de Dados com Matplotlib e Seaborn',
        description: 'Exemplos de gráficos e boas práticas',
        url: '/assets/visualizacao-guide.pdf',
        filename: 'visualizacao-guide.pdf',
        order: 1,
      },
    ],
  },
];

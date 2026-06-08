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
        text: 'O que é uma variável em Python?',
        options: [
          'Um comando usado apenas para imprimir textos na tela',
          'Um espaço utilizado para armazenar um valor durante a execução do programa',
          'Um tipo de dado usado somente para números inteiros',
          'Uma função obrigatória em todos os programas Python',
        ],
        correctIndex: 1,
        explanation:
          'Uma variável é um espaço usado para armazenar valores de diferentes tipos.',
        order: 1,
      },
      {
        text: 'Qual dos valores abaixo é do tipo float?',
        options: ['10', "'10'", '10.5', 'True'],
        correctIndex: 2,
        explanation: 'Float é o tipo de variável usado para armazenar valores decimais.',
        order: 2,
      },
      {
        text: 'Qual será o resultado da expressão 10 + 5 * 2?',
        options: ['30', '20', '25', '15'],
        correctIndex: 1,
        explanation:
          'A ordem de precedência também está presente no Python: primeiro a multiplicação, depois a adição.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'Aula 01 - Variáveis e Operadores em Python',
        videoId: 'drive:1x3I3U8t0PV_rd-uAT2PDlGc-biU1dla6',
        code: FUNDAMENTOS_CODE,
        language: 'python',
        order: 1,
      },
    ],
    pdfMaterials: [
      {
        name: 'Plano de Estudos do Módulo',
        description: 'Visão geral das aulas, objetivos e sequência de aprendizagem.',
        url: '/assets/modulo-1/01-projeto-aulas-ciencia-de-dados.pdf',
        filename: '01-projeto-aulas-ciencia-de-dados.pdf',
        order: 1,
      },
      {
        name: 'Aula 01 - Introdução à Ciência de Dados',
        description: 'Conceitos iniciais, aplicações e papel da ciência de dados.',
        url: '/assets/modulo-1/02-aula-01-introducao-ciencia-de-dados.pdf',
        filename: '02-aula-01-introducao-ciencia-de-dados.pdf',
        order: 2,
      },
      {
        name: 'Aula 02 - Ciclo de um Projeto de Dados',
        description: 'Etapas de coleta, preparação, análise, modelagem e comunicação.',
        url: '/assets/modulo-1/03-aula-02-ciclo-do-projeto.pdf',
        filename: '03-aula-02-ciclo-do-projeto.pdf',
        order: 3,
      },
      {
        name: 'Aula 03 - Ambiente Python e Configuração',
        description: 'Preparação do ambiente de desenvolvimento para análise de dados.',
        url: '/assets/modulo-1/04-aula-03-python-e-config.pdf',
        filename: '04-aula-03-python-e-config.pdf',
        order: 4,
      },
      {
        name: 'Aula 04 - Tipos Básicos e Variáveis',
        description: 'Fundamentos de variáveis, operadores e tipos de dados em Python.',
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
        text: "Dado o DataFrame df com as colunas 'idade' e 'cidade', qual código retorna corretamente os registros com idade maior que 25 e cidade igual a 'Fortaleza'?",
        options: [
          "df[df['idade'] > 25, df['cidade'] == 'Fortaleza']",
          "df[(df['idade'] > 25) & (df['cidade'] == 'Fortaleza')]",
          "df[df['idade'] > 25 and df['cidade'] == 'Fortaleza']",
          "df[df['idade'] > 25 | df['cidade'] == 'Fortaleza']",
        ],
        correctIndex: 1,
        explanation:
          'Em Pandas, múltiplas condições usam & (AND) e cada condição deve estar entre parênteses.',
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
        text: "Qual código renomeia corretamente a coluna 'salario' para 'Salario' em um DataFrame df, modificando-o diretamente?",
        options: [
          "df.columns['salario'] = 'Salario'",
          "df.rename('salario', 'Salario', inplace=True)",
          "df.rename(columns={'salario': 'Salario'}, inplace=True)",
          "df['salario'].rename('Salario')",
        ],
        correctIndex: 2,
        explanation:
          'df.rename() exige o argumento columns={} com o mapeamento, e inplace=True para modificar direto.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'Aula 01 - Introdução ao Pandas e Dados Tabulares',
        videoId: 'https://www.youtube.com/watch?v=XBxXgJcd5nU&list=PLGTqm-GzPhSHQxLOYmtxeEfMhnQvwOvdr',
        code: PANDAS_CODE,
        language: 'python',
        order: 1,
      },
      {
        title: 'Aula 02 - Estruturas Fundamentais: Series',
        videoId: 'https://youtu.be/i4CsKbhW12k?si=weUYN1-mtJ7A3xNC',
        order: 2,
      },
      {
        title: 'Aula 03 - Estrutura Principal: DataFrame',
        videoId: 'https://www.youtube.com/watch?v=1K6ZNYpIMZED8vWr7YsphGopY8yisdmLo&list=PLGTqm-GzPhSHQxLOYmtxeEfMhnQvwOvdr',
        order: 3,
      },
      {
        title: 'Aula 04 - Leitura de Arquivos CSV e Excel',
        videoId: 'https://youtu.be/ft5XwV2zkUo',
        order: 4,
      },
      {
        title: 'Aula 05 - Tipos de Dados no Pandas',
        videoId: 'https://youtu.be/ft5XwV2zkUo',
        order: 5,
      },
      {
        title: 'Aula 06 - Seleção de Linhas e Colunas',
        videoId: 'https://studio.youtube.com/video/7srOGuyglAg/edit',
        order: 6,
      },
      {
        title: 'Aula 07 - Filtros e Consultas',
        videoId: 'https://youtu.be/RPkUx27KAiM?si=lJD5MLSetCEaynDL',
        order: 7,
      },
      {
        title: 'Aula 08 - Operações de Agregação',
        videoId: 'https://youtu.be/BytfizH37TA?si=5OsTNlY-dewG1ZpV',
        order: 8,
      },
      {
        title: 'Aula 09 - Renomeação e Organização de Dados',
        videoId: 'https://youtu.be/NF0Jh1wHkOU?si=hsic82ZmGCefJ8xz',
        order: 9,
      },
    ],
    pdfMaterials: [
      {
        name: 'Renomeação e Organização de Dados',
        description: 'Slides sobre ajuste de nomes, organização de colunas e estruturação de DataFrames.',
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
        text: 'Qual método do Pandas é utilizado para remover linhas duplicadas de um DataFrame?',
        options: [
          '.dropna()',
          '.drop_duplicates()',
          '.remove_duplicates()',
          '.duplicated()',
        ],
        correctIndex: 1,
        explanation:
          'O método .drop_duplicates() é a função nativa do Pandas para identificar e remover registros duplicados de um DataFrame.',
        order: 1,
      },
      {
        text: "Qual função do Pandas é utilizada para converter a coluna 'Data_Checkin' para o formato datetime?",
        options: [
          'pd.convert_to_datetime()',
          'pd.to_datetime()',
          "df_ex['Data_Checkin'].astype('datetime')",
          'pd.to_date()',
        ],
        correctIndex: 1,
        explanation:
          'A função pd.to_datetime() é a ferramenta padrão do Pandas para converter dados textuais ou numéricos em objetos de data e tempo válidos.',
        order: 2,
      },
      {
        text: 'Qual método do Pandas é utilizado para substituir valores ausentes (NaN) pela mediana de uma coluna?',
        options: [
          '.fillna()',
          '.dropna()',
          '.replace_na()',
          '.median_fill()',
        ],
        correctIndex: 0,
        explanation:
          'O método .fillna() é utilizado para preencher valores ausentes ou nulos em um DataFrame ou Series com um valor específico, como a mediana calculada.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'Aula 00 - Introdução ao Pré-Processamento',
        videoId: 'drive:1lFBTyQIKwuadr-t0A1dTt63ueYlwjhhP',
        order: 1,
      },
      {
        title: 'Visão Geral - Problemas Comuns em Dados Reais',
        videoId: 'drive:1GnpaF4B7UR84ee1Fi9FQW6QQr0IyD5Ry',
        order: 2,
      },
      {
        title: 'Aula 01 - Delimitadores e Leitura de Arquivos',
        videoId: 'drive:1K6ZNYpIMZED8vWr7YsphGopY8yisdmLo',
        order: 3,
      },
      {
        title: 'Aula 02 - Espaços em Branco e Limpeza Textual',
        videoId: 'drive:1R7AtbHn1jSZ01ZqZXBGUODqDxctBseVk',
        order: 4,
      },
      {
        title: 'Aula 03 - Conversão de Tipos de Dados',
        videoId: 'drive:1X9cuOROeBQ82eLRWMxA_0jcMia1XWGyY',
        order: 5,
      },
      {
        title: 'Aula 04 - Tipos Mistos e Padronização',
        videoId: 'drive:16rWhS_MobJkvXzBc98kzuTjp-ApU8g6F',
        order: 6,
      },
    ],
    pdfMaterials: [
      {
        name: 'Introdução ao Pré-Processamento',
        description: 'Apresentação do módulo e dos principais problemas em bases reais.',
        url: '/assets/modulo-5/01-introducao.pdf',
        filename: '01-introducao.pdf',
        order: 1,
      },
      {
        name: 'Visão Geral do Módulo',
        description: 'Mapa dos conteúdos, objetivos e fluxo das aulas.',
        url: '/assets/modulo-5/02-overview-do-modulo.pdf',
        filename: '02-overview-do-modulo.pdf',
        order: 2,
      },
      {
        name: 'Aula 01 - Delimitadores e Leitura de Arquivos',
        description: 'Como lidar com arquivos fora do padrão e problemas de importação.',
        url: '/assets/modulo-5/03-aula-01.pdf',
        filename: '03-aula-01.pdf',
        order: 3,
      },
      {
        name: 'Aula 02 - Espaços em Branco e Limpeza Textual',
        description: 'Tratamento de espaços invisíveis e inconsistências em textos.',
        url: '/assets/modulo-5/04-aula-02.pdf',
        filename: '04-aula-02.pdf',
        order: 4,
      },
      {
        name: 'Aula 03 - Conversão de Tipos de Dados',
        description: 'Transformação de colunas para tipos adequados no Pandas.',
        url: '/assets/modulo-5/05-aula-03.pdf',
        filename: '05-aula-03.pdf',
        order: 5,
      },
      {
        name: 'Aula 04 - Tipos Mistos e Padronização',
        description: 'Correção de colunas com formatos misturados e valores inconsistentes.',
        url: '/assets/modulo-5/06-aula-04.pdf',
        filename: '06-aula-04.pdf',
        order: 6,
      },
      {
        name: 'Aula 05 - Duplicatas e Registros Repetidos',
        description: 'Identificação e remoção de dados duplicados.',
        url: '/assets/modulo-5/07-aula-05.pdf',
        filename: '07-aula-05.pdf',
        order: 7,
      },
      {
        name: 'Aula 07 - Datas em Formatos Diferentes',
        description: 'Padronização de datas e conversão para datetime.',
        url: '/assets/modulo-5/08-aula-07.pdf',
        filename: '08-aula-07.pdf',
        order: 8,
      },
      {
        name: 'Aula 08 - Representações Inconsistentes',
        description: 'Normalização de categorias, rótulos e valores equivalentes.',
        url: '/assets/modulo-5/09-aula-08.pdf',
        filename: '09-aula-08.pdf',
        order: 9,
      },
      {
        name: 'Aula 09 - Outliers e Valores Atípicos',
        description: 'Detecção e interpretação de valores fora do padrão.',
        url: '/assets/modulo-5/10-aula-09.pdf',
        filename: '10-aula-09.pdf',
        order: 10,
      },
      {
        name: 'Aula 10 - Unidades de Medida Inconsistentes',
        description: 'Conversão e padronização de unidades em colunas numéricas.',
        url: '/assets/modulo-5/11-aula-10.pdf',
        filename: '11-aula-10.pdf',
        order: 11,
      },
      {
        name: 'Aula 11 - Checklist Final de Qualidade',
        description: 'Resumo prático para revisar datasets antes da análise.',
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
        text: 'Qual espécie tem as maiores pétalas e as mais consistentes?',
        options: [
          'Iris Virginica',
          'Iris Versicolor',
          'Iris Setosa',
          'Todas as espécies têm tamanho e consistência iguais',
        ],
        correctIndex: 0,
        explanation:
          'A espécie Iris Virginica possui as maiores pétalas (média de 5,55 cm). A Iris Setosa possui as menores (1,46 cm), mas é, de longe, a mais consistente, com um desvio padrão de apenas 0,17.',
        order: 1,
      },
      {
        text: 'Qual espécie é mais homogênea internamente?',
        options: [
          'Iris Versicolor',
          'Iris Virginica',
          'Iris Setosa',
          'Todas as espécies têm a mesma homogeneidade interna',
        ],
        correctIndex: 1,
        explanation: 'A Iris Virginica é a espécie mais homogênea, especialmente no comprimento das pétalas.',
        order: 2,
      },
      {
        text: 'Qual espécie é mais diferente das outras duas?',
        options: [
          'Iris Versicolor',
          'Iris Virginica',
          'Iris Setosa',
          'Não há diferença entre as espécies',
        ],
        correctIndex: 2,
        explanation: 'A Iris Setosa é a espécie mais distinta do conjunto de dados.',
        order: 3,
      },
    ],
    videos: [
      {
        title: 'Vídeo 01 - Introdução ao Dataset Iris',
        videoId: 'drive:1FepShl-qKbA-FEasi1UkAlpSR8NqltFA',
        code: EXPLORACAO_CODE,
        language: 'python',
        order: 1,
      },
      {
        title: 'Vídeo 02 - Média, Mediana e Moda',
        videoId: 'drive:1kA5EAOZwwyU3ozCwVXJDA14Sl2tC5VmZ',
        order: 2,
      },
      {
        title: 'Vídeo 03 - Variância, Desvio Padrão e IQR',
        videoId: 'drive:1RrunL-bw8kONCkpFQDGMQdWX-XVwTgBX',
        order: 3,
      },
      {
        title: 'Vídeo 04 - Describe e Histograma com Densidade',
        videoId: 'drive:1phQ6SrUAiCIo2PUUKQWu5tJlDN0rFZIt',
        order: 4,
      },
      {
        title: 'Vídeo 05 - Correlação e Gráfico de Dispersão',
        videoId: 'drive:1fDxhMl3zKE82GKbbFr7yb-nUNw83mNvs',
        order: 5,
      },
      {
        title: 'Vídeo 06 - Heatmap, Spearman e Limites da Correlação',
        videoId: 'drive:1QCPWYXEJcFJ9qMxgAgebadZ-GrX0N_Mg',
        order: 6,
      },
      {
        title: 'Vídeo 07 - Pipeline Completo de EDA',
        videoId: 'drive:1G_qmQRAYz_V55_w-uamNHuPswDP3Ojxp',
        order: 7,
      },
      {
        title: 'Vídeo 08 - Qualidade de Dados e Checklist',
        videoId: 'drive:1k2ny6__nx3-XR1zLx3PF3MZJ9DU5T7dF',
        order: 8,
      },
      {
        title: 'Aula 01 - Introdução ao Dataset Iris',
        videoId: 'drive:16TOxH2XIUEBWJZUBEmb25GfNbNqsoYoJ',
        order: 9,
      },
      {
        title: 'Aula 02 - Tendência Central',
        videoId: 'drive:1ikRclglFB2qkAfKE8HkBCEJTronFTkhH',
        order: 10,
      },
      {
        title: 'Aula 03 - Medidas de Dispersão',
        videoId: 'drive:10lQ-w23yxaE36xoOI61zfTBgc3qnqD-f',
        order: 11,
      },
      {
        title: 'Aula 04 - Describe, Histograma e Densidade',
        videoId: 'drive:11se2TD-F-lWGnKM2xhCI-mgLJazj7zUU',
        order: 12,
      },
      {
        title: 'Aula 05 - Correlação e Scatter Plot',
        videoId: 'drive:1_FQjKk6xMkKlGpEpJ2ci_uFrjcM0T2hj',
        order: 13,
      },
      {
        title: 'Aula 06 - Heatmap e Correlação de Spearman',
        videoId: 'drive:1DL7WPNH5JeIAsacnva46uS3PJFGlW6rp',
        order: 14,
      },
      {
        title: 'Aula 07 - Pipeline Completo de EDA',
        videoId: 'drive:1WGg_mC2xgOrnzT0tARksGQtZk4mOMc0S',
        order: 15,
      },
      {
        title: 'Aula 08 - Qualidade de Dados e Checklist',
        videoId: 'drive:17YrrIPxPAnRAfLFhFW187imFwYxsbzjt',
        order: 16,
      },
    ],
    pdfMaterials: [
      {
        name: 'Introdução ao Dataset Iris',
        description: 'Notebook em PDF com a apresentação inicial do dataset e objetivos da EDA.',
        url: '/assets/modulo-3/01-modulo-3-video-1.pdf',
        filename: '01-modulo-3-video-1.pdf',
        order: 1,
      },
      {
        name: 'Medidas de Tendência Central',
        description: 'Material sobre média, mediana e moda aplicadas ao dataset Iris.',
        url: '/assets/modulo-3/02-modulo-3-video-2.pdf',
        filename: '02-modulo-3-video-2.pdf',
        order: 2,
      },
      {
        name: 'Medidas de Dispersão',
        description: 'Análise de variância, desvio padrão e intervalo interquartil.',
        url: '/assets/modulo-3/03-modulo-3-video-3.pdf',
        filename: '03-modulo-3-video-3.pdf',
        order: 3,
      },
      {
        name: 'Describe, Histograma e Densidade',
        description: 'Resumo estatístico e visualização de distribuições.',
        url: '/assets/modulo-3/04-modulo-3-video-4.pdf',
        filename: '04-modulo-3-video-4.pdf',
        order: 4,
      },
      {
        name: 'Correlação e Scatter Plot',
        description: 'Relações entre variáveis numéricas e interpretação de dispersão.',
        url: '/assets/modulo-3/05-modulo-3-video-5.pdf',
        filename: '05-modulo-3-video-5.pdf',
        order: 5,
      },
      {
        name: 'Heatmap e Correlação de Spearman',
        description: 'Visualização de correlações e limites da correlação linear.',
        url: '/assets/modulo-3/06-modulo-3-video-6.pdf',
        filename: '06-modulo-3-video-6.pdf',
        order: 6,
      },
      {
        name: 'Pipeline Completo de EDA',
        description: 'Fluxo completo com agrupamentos, similaridade e pairplot.',
        url: '/assets/modulo-3/07-modulo-3-video-7.pdf',
        filename: '07-modulo-3-video-7.pdf',
        order: 7,
      },
      {
        name: 'Qualidade de Dados e Checklist do Analista',
        description: 'Boas práticas para revisar dados e concluir a análise exploratória.',
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
        title: 'Aula 01 - Fundamentos de Visualização de Dados',
        videoId: 'drive:1eF-HIBbwo9DB0n0dhMZ9SD1f95R332Ns',
        order: 1,
      },
      {
        title: 'Aula 02 - Visualização com Matplotlib',
        videoId: 'drive:16a-0reUPxvwoIpMF5sFc3_Zoq5-svIf_',
        order: 2,
      },
      {
        title: 'Aula 03 - Cinco Gráficos Essenciais',
        videoId: 'drive:1Ue49T8yIuN6RHraR0bIKb2j55qJKUCEp',
        order: 3,
      },
      {
        title: 'Aula 04 - Visualizações Avançadas',
        videoId: 'drive:12xoMJ7JxRki5lNwfCgHVA8dsc9T64P3s',
        order: 4,
      },
      {
        title: 'Aula 05 - Boas Práticas Visuais',
        videoId: 'drive:1tKAvyg2awwF-eyztO2y34sasPA2ioQQm',
        order: 5,
      },
      {
        title: 'Aula 06 - Storytelling com Dados',
        videoId: 'drive:159P41UdNqGnVPM_fdMDxDzBJo9qez1OQ',
        order: 6,
      },
      {
        title: 'Aula 07 - Ajustes de Cores e Legendas',
        videoId: 'drive:13-AvlMjB4NOl0IUD6I_XuoDba-2A0vpz',
        order: 7,
      },
      {
        title: 'Aula 08 - Comparações e Distribuições',
        videoId: 'drive:1FKf96qP8NOv2jEr8qcEPcWBgM0APL1Sn',
        order: 8,
      },
      {
        title: 'Aula 09 - Relações entre Variáveis',
        videoId: 'drive:17jAnDDcrcyZiaiC5gvmM5drEBdKL3orF',
        order: 9,
      },
      {
        title: 'Aula 10 - Gráficos para Apresentação',
        videoId: 'drive:1j2rD_4V8KOLL-LWJTwtvZKywaflCZNDx',
        order: 10,
      },
      {
        title: 'Aula 11 - Revisão e Projeto Visual',
        videoId: 'drive:1qzHB63G_htrFooIV_5UC3A2Oe2E2B29E',
        order: 11,
      },
    ],
    pdfMaterials: [
      {
        name: 'Guia de Visualização com Matplotlib e Seaborn',
        description: 'Exemplos de gráficos, boas práticas e recomendações de storytelling visual.',
        url: '/assets/visualizacao-guide.pdf',
        filename: 'visualizacao-guide.pdf',
        order: 1,
      },
    ],
  },
];

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
        title: 'Aula: Fundamentos de Ciência de Dados e Python',
        videoId: 'yhp6rgrCjQ0',
        code: FUNDAMENTOS_CODE,
        language: 'python',
        order: 1,
      },
    ],
    pdfMaterials: [
      {
        name: 'Slides: Fundamentos de Ciência de Dados',
        description: 'PDF com todos os slides da aula',
        url: '/assets/fundamentos-slides.pdf',
        filename: 'fundamentos-slides.pdf',
        order: 1,
      },
      {
        name: 'Resumo: Python para Ciência de Dados',
        description: 'Guia rápido de sintaxe e bibliotecas',
        url: '/assets/python-resumo.pdf',
        filename: 'python-resumo.pdf',
        order: 2,
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
        title: 'Aula: Python para Ciência de Dados com Pandas',
        videoId: 'vmEHCJofvqE',
        code: PANDAS_CODE,
        language: 'python',
        order: 1,
      },
    ],
    pdfMaterials: [
      {
        name: 'Cheatsheet: Pandas',
        description: 'Principais métodos e funções do Pandas em uma página',
        url: '/assets/pandas-cheatsheet.pdf',
        filename: 'pandas-cheatsheet.pdf',
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
        name: 'Cheatsheet: Pré-Processamento',
        description: 'Principais cuidados antes da análise',
        url: '/assets/preprocessamento-cheatsheet.pdf',
        filename: 'preprocessamento-cheatsheet.pdf',
        order: 1,
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
        title: 'Aula: Exploração de Dados e Estatística',
        videoId: 'ZW-V3_TbKrI',
        code: EXPLORACAO_CODE,
        language: 'python',
        order: 1,
      },
    ],
    pdfMaterials: [
      {
        name: 'Guia: Análise Exploratória de Dados',
        description: 'Passo a passo para uma EDA completa',
        url: '/assets/eda-guide.pdf',
        filename: 'eda-guide.pdf',
        order: 1,
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
    videos: [],
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

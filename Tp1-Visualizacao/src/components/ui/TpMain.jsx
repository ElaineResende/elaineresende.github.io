import React from 'react';
import Paper from '@material-ui/core/Paper';
import ReactMarkdown from 'react-markdown';
import Graficos4 from '../graficos/Graficos4';
import Graficos5 from '../graficos/Graficos5';
import Graficos6 from '../graficos/Graficos6';

const texto =
  `# Trabalho prático 2

## Visualização de dados
## **Aluno:** João Marcos Martins da Costa Cota

### Dados usados do TP Final
Grupo composto por: Cristiano, Clebson, Elaine, Geraldo, João Marcos


### Um estudo sobre a parametrização de redes neurais para classificação automática de texto

A maioria dos algoritmos de aprendizado de máquina tem um conjunto de variáveis de configuração que a configuração terá efeito direto nos resultados. 
Essa configuração, chamada de otimização de hiperparametro, é feita antes do treinamento de cada conjunto de dados 
(porque muitas vezes não há configuração ideal para todos os domínios) por meio do ajuste de hiperparâmetros (parâmetros de configuração). 
É uma tarefa muito importante, pois o desempenho do algoritmo pode ser altamente dependente da escolha de hiperparâmetros. 
Geralmente, o conjunto de hiperparâmetros pode ser problemático porque sua combinação de testes exige muito tempo.

Neste site, o processo de parametrização pode ser analisado através de gráficos a partir do tempo de otimização. 
Nós focamos nossa tarefa de classificação na área de texto.

Neste projeto apresentamos a visualização a partir do processo de otimização de duas arquiteturas de redes neurais, 
denominadas Multilayer Perceptron (MLP) e Deep Multilayer Perceptron (DMLP). Mostrado aqui.

#### Datasets

Neste projeto, 4 conjuntos de dados padronizados de classificação de texto são usados para alimentar as redes neurais e relatar a eficiência dos algoritmos.
A ideia é avaliar as duas arquiteturas usando diferentes conjuntos de dados. O resumo estatístico de cada conjunto de dados é mostrado na Tabela abaixo.
A otimização é feita em cada teste, escolhendo um conjunto de parâmetros aplicados a cada conjunto de dados. Existem duas versões de cada conjunto de dados:
TFIDF e meta-recursos baseados em distância (MF)

<table>
<thead>
<th>Dataset </th><th>	Size </th><th>	#Features </th><th>	#Classes </th><th>	Mean </th><th>	Minor Class </th><th>	1st Quartile </th><th>	Median </th><th> 3rd Quartile </th><th>	Major Class </th>
</thead>
<tr>
<td>20NG </td><td> 18766 </td><td>	61050 </td><td>	20 </td><td>	938 </td><td>	627 </td><td>	952 </td><td>	978 </td><td>	988 </td><td>	998 </td>
</tr>
<tr>
<td>4UNI </td><td>	8274 </td><td>	40195 </td><td>	7 </td><td>	1182 </td><td>	13 </td><td> 343 </td><td>	929 </td><td>	1382 </td><td>	3757 </td>
</tr>
<tr>
<td>REUTERS </td><td> 	13327 </td><td>	19590 </td><td>	90 </td><td>	148 </td><td>	2 </td><td>	8 </td><td>	29 </td><td>	91 </td><td>	3964 </td>
</tr>
<tr>
<td>ACM </td><td>	24897 </td><td>	59990 </td><td>	11 </td><td>	2263 </td><td>	63 </td><td>	761 </td><td>	2041 </td><td>	3278 </td><td>	6562 </td>
</tr>
</table>

Os conjuntos de dados que usamos para criar todas as visualizações são derivados do processo de otimização (com validação cruzada de 5 vezes)
de cada conjunto de parâmetros aplicados a cada versão do conjunto de dados. Durante a otimização, obtemos todas as tentativas 
(estabelecemos 80 tentativas) com todos o conjunto de parâmetros que foram testados, tempo e perda.

#### Análise

A análise foi feita usando gráfico de linhas, para que pudesse ser vista a evolução dos paramêtros através da taxa de erro.
A cada tentativa é colocado um ponto com o valor do erro, erros menores, possuem uma combinação de paramêtros que deixou aquele resultado melhor.

A escolha do grafico de linhas foi feita para poder comparar com os outros folds e ter uma visão macro de todo o processo das tentativas.
Tentativas essas que são realizados utilizando variação dos paramêtros.

Portanto foi colocado filtros para que esses pudessem ser alterados para poder verifcar a alteração desses filtros e a
influencia desses parametros nas taxas de erro por tentativa.
As cores das linhas são diferenciadas, de modo que ao passar o cursos no ponto ou na linha é possivel ver o valor e a qual fold refere aquela linha.

# Para começar, clique no menu superior a esquerda e selecione a visualização.`
const TpMain = () => (
  <Paper
    style={{
      marginRight: 12,
      marginLeft: 12,
      paddingRight: 12,
      paddingLeft: 12,
    }}
  >
    <ReactMarkdown
      source={texto}
      escapeHtml={false}
    />
  </Paper>
);

export default TpMain;

export const Todos = () => (
  <Paper
    style={{ marginRight: 12, marginLeft: 12 }}
  >
    <Graficos4 />
    <Graficos5 />
    <Graficos6 />
  </Paper>
);

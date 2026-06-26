# User Stories e Datasets de Teste (Analyst Research)

## 1. User Stories Detalhadas

### 🎯 US01: Abertura Preditiva de Ocorrência (Otimização de Triagem)
**Como** Monitor de Pátio  
**Eu quero** que o sistema filtre a busca de alunos com base no horário atual  
**Para que** eu encontre o aluno muito mais rápido durante um intervalo específico (ex: Recreio do Ensino Fundamental) sem pesquisar na escola inteira.  
* **Cenário Principal:** O Monitor clica em "Novo Chamado" às 09:45. O sistema carrega para autocomplete apenas os alunos das salas de 09 a 15 (que estão em intervalo naquele momento).
* **Edge Case:** O relógio do dispositivo está dessincronizado. O sistema deve validar o timestamp de fallback com o servidor via cabeçalho HTTP de abertura.

### 🎯 US02: Criação de Chamado Offline e Sincronização
**Como** Monitor de Pátio  
**Eu quero** registrar um chamado de "Falta de Uniforme" mesmo sem Wi-Fi na quadra  
**Para que** o fluxo não seja interrompido e a diretoria receba assim que eu voltar para a área de cobertura.  
* **Cenário de Erro Mapeado:** Queda de rede no momento de salvar. O Service Worker intercepta, armazena no IndexedDB e exibe toast "Salvo localmente. Sincronizando quando online...".

### 🎯 US03: Visualização do Painel Campainha (Acessibilidade)
**Como** Coordenador / Diretoria  
**Eu quero** ver na tela o tempo SLA de cada aluno enviado  
**Para que** eu atenda rapidamente antes que a métrica fique crítica.  
* **Edge Case:** Usuário daltônico visualizando a tela. O SLA estourado não deve ficar apenas "vermelho", mas deve piscar e exibir um ícone triangular de alerta com a tag textual "[CRÍTICO]".

## 2. Modelagem de Dados: Autocomplete Typeahead
O script deve responder garantindo formatação limpa.
* **Entrada de Digitação:** "João P"
* **Saída Renderizada Restrita:** `João Pedro Silva - 8º Ano`

## 3. Test Datasets (Simulação Preditiva)
### Dataset: Horários Escolares vs Turmas
```json
{
  "context_rules": [
    {
      "time_window": "09:40-10:00",
      "target_grades": ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
      "classrooms": [9, 10, 11, 12, 13, 14, 15]
    },
    {
      "time_window": "10:30-10:50",
      "target_grades": ["1º EM", "2º EM", "3º EM"],
      "classrooms": [20, 21, 22, 23, 24, 25]
    }
  ],
  "mock_occurrences_recurrency": [
    "Falta de Uniforme (Blusa)",
    "Uso de Piercing Adorno Inadequado",
    "Uso de Unhas em Gel (Infração de laboratório)"
  ]
}
```

## 4. Segurança e Transição de Usuários
* **Cenário Multi-login:** O Monitor A loga às 07:00. Às 12:00, o Monitor B pega o mesmo tablet. A sessão do Monitor A deve ter expirado por inatividade (> 10min de tela inativa ou tela desligada), exigindo re-autenticação, limpando o state local de chamados.

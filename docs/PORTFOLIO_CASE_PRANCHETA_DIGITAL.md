# Case de Portfólio: Prancheta Digital (WUXIA-OPS)

## Visão Geral do Produto
A **Prancheta Digital** é uma solução de inteligência operacional focada na redução da carga cognitiva de inspetores, monitores de pátio e secretaria escolar. Ela substitui fluxos físicos (papel e caneta, planilhas desorganizadas, radiocomunicadores ruidosos) por uma interface ágil, mobile-first, com regras de negócio embutidas.

## Inteligência da UI e UX (Aba Campainha / Pátio)

### 1. Smart Paste e Redução de Carga Cognitiva
Durante horários de pico (como entrada ou intervalos), a velocidade no atendimento é crítica. Para mitigar o atrito:
- **Botões de Ação Rápida (1-Click):** A secretaria e a coordenação possuem botões dinâmicos que injetam templates pré-formatados diretamente no chamado.
- O inspetor não perde tempo digitando textos repetitivos como "Aluno aguardando na secretaria" ou "Verificar uniforme".

### 2. Motor de Tempo e "Modo Pico"
O sistema responde ao contexto temporal do colégio:
- **06:30 às 07:15 (Horário de Pico):** O sistema oculta campos não essenciais (ex: caixa de texto de Observação Livre) e fixa automaticamente a localização em `( ENTRADA )`. Isso força uma padronização do registro rápido, eliminando decisões desnecessárias da tela.
- **Filtros por Turno:** A busca Typeahead de alunos cruza a hora atual com o turno do aluno, removendo ruído (ex: alunos da tarde não aparecem na busca da manhã). Há, ainda, suporte inteligente para alunos em Eletivas ou turnos estendidos.

### 3. Safety Net (Undo/Timer) e Feedback Visual
- **Timer de 120s (Editabilidade Tardia):** Quando um chamado de rádio/campainha é disparado, o operador vê um balão de sucesso com um timer animado de 120 segundos. Isso funciona como um "Safety Net": se o operador errou o chamado, ele pode cancelá-lo ou editá-lo antes que ele seja cobrado do monitor no pátio.
- **Histórico e Paginação:** Foi introduzida a tela "Campainha Lista" para perfis gerenciais (Admin/Secretaria), permitindo rastrear o SLA e o status em tempo real (NOVO, ATENDENDO, FECHADO) do histórico completo de chamados daquele turno.

---
*Atualizado por Antigravity (WUXIA-OPS)*

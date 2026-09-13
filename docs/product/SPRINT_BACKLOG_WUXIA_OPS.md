# 📋 Backlog de Sprints — WUXIA-OPS (Prancheta Digital)

**Projeto:** Prancheta Digital Escola  
**Ambiente:** `prancheta.online.des.br`  
**Gerente de Produto / CTO:** Guilherme Puentes (Web Solutions ETI)  
**Agente Sênior:** Gepto  

---

## 🎯 Sprint 1 — Pátio Inteligente & Dashboard Analytics (CONCLUÍDA ✅)

| ID | Categoria | Descrição da Funcionalidade / Tarefa | Status |
| :--- | :--- | :--- | :---: |
| **SP1-01** | **Git / Ops** | Preservar e documentar stash antigo (`wip: chamados...`) em branch remota dedicada (`archive/wip-smart-paste`) | ✅ Concluído |
| **SP1-02** | **UX / Pátio** | Implementar navegação em abas `TabList` FluentUI 2 (Campainha de Chamada / Registrar Ocorrência) | ✅ Concluído |
| **SP1-03** | **UX / Pátio** | Botões de Ação Rápida no Pátio (Uniforme, Celular, Ir ao Orientador - Felipe/Dani) | ✅ Concluído |
| **SP1-04** | **UX / Pátio** | Busca inteligente de Alunos por Nome, Turma, Turno e Eletivas + Badges nos Cards | ✅ Concluído |
| **SP1-05** | **Analytics** | Dashboard Executivo com 4 Gráficos Recharts (Horários de Pico, Categorias, Tendências, Monitores) | ✅ Concluído |
| **SP1-06** | **DevSecOps** | Proteção rigorosa de credenciais e configs de Agentes IA no `.gitignore` | ✅ Concluído |
| **SP1-07** | **CI/CD** | Pipeline automatizado via GitHub Actions + Deploy no domínio `prancheta.online.des.br` | ✅ Concluído |

---

## 🚀 Sprint 2 — Validação, Dados de Teste & Homologação de Turmas (EM ANDAMENTO 🏃‍♂️)

| ID | Categoria | Descrição da Funcionalidade / Tarefa | Prioridade | Status |
| :--- | :--- | :--- | :---: | :---: |
| **SP2-01** | **Massa de Dados** | Modelagem das salas 20 a 24 (Matriz 6x5, 30 assentos, Ensino Médio) | Alta 🔴 | ✅ Concluído |
| **SP2-02** | **RBAC / Segurança** | Perfil Terminal por Sala física (Salas 20 a 24) com login simplificado | Alta 🔴 | ✅ Concluído |
| **SP2-03** | **UX / Terminal** | Auto-seleção da turma ao logar no Terminal da sala + Botão Ocorrência SALA | Alta 🔴 | ✅ Concluído |
| **SP2-04** | **RBAC / Pátio** | Ocultar aba PRANCHETA para perfil Secretaria e liberar rota Campainha Geral | Alta 🔴 | ✅ Concluído |
| **SP2-05** | **Homologação** | Testar e validar o comportamento no site publicado (`prancheta.online.des.br`) | Alta 🔴 | 🔄 Em Homologação |
| **SP2-06** | **UI / Mobile** | Ajustes de responsividade mobile para tablets/smartphones no pátio | Média 🟡 | ⏳ Planejado |

---

## ⚡ Sprint 3 — Automação n8n & Integração Externa (EM ANDAMENTO 🏃‍♂️)

| ID | Categoria | Descrição da Funcionalidade / Tarefa | Prioridade | Status |
| :--- | :--- | :--- | :---: | :---: |
| **SP3-01** | **Automação** | Disparo de Webhook n8n para Ocorrências Críticas (Diretoria / Severidade Grave) | Alta 🔴 | 🔄 Em Andamento |
| **SP3-02** | **Integração Odoo** | Exportação e sincronização de dados de chamados e alunos com Odoo | Média 🟡 | ⏳ Planejado |

---

### 📝 Registro de Atualização
- **Data:** 13/09/2026
- **Responsável:** Gepto (Senior Unified Agent)
- **Notas:** Implementada auto-injeção de usuários no `localStorage` e atalho de campainha no Mapa de Sala. Commits na branch `feat/mapa-sala`.

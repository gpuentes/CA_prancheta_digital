# CA_prancheta_digital - PWA de Gestão Escolar

## Visão Geral do Produto (PRD)

O **CA_prancheta_digital** é uma aplicação web progressiva (PWA), modular e escalável, projetada para digitalizar o processo de registros e monitoria escolar (Ocorrências de Pátio).

### Funcionalidades Core
- Registro rápido de ocorrências.
- Automação de notificações via WhatsApp (n8n).
- Design System Microsoft Fluent 2.
- Acessibilidade nível AA.

### Linguagem Ubíqua (DDD)
- **Ocorrência de Pátio**: Qualquer infração ou evento atípico no ambiente escolar fora da sala de aula.
- **Super Admin**: Diretor ou coordenador com acesso a mapas de calor, logs e relatórios.
- **Prancheta**: Interface ágil de registro utilizada pelo inspetor.

---

## 📄 PRD: Adendo Fase 3 (Atualização Arquitetural)
Este bloco expande o Documento de Requisitos de Produto (PRD) para contemplar as regras de negócio validadas nas novas frentes operacionais.

### 1. Mapeamento de Controle de Acesso (RBAC) no Menu Lateral
O sistema blindará a interface com base no cargo do usuário (SSO), definindo a visibilidade da navegação:

- **PROFESSOR**: Visualiza apenas Mapa de Sala e Ocorrência de Sala (Foco Kiosk Mode).
- **MONITOR**: Visualiza Pátio (Registro rápido) e Campainha Geral (Fila com SLA Visual).
- **SECRETARIA**: Visualiza Campainha Geral, Cadastros (Locais/Salas) e Histórico.
- **DIRETORIA / SUPER_ADMIN**: Acesso total, incluindo Dashboards Executivos e Configurações.

### 2. Frente UX/UI: Mapa de Sala e Terminal do Professor
A rota `https://prancheta.online.des.br/mapa-sala` é o núcleo tático da sala de aula.

- **Interação em Grid**: O front-end exibe um layout visual das carteiras.
- **Modal Contextual (Popover)**: Ao clicar em um aluno, a rolagem congela e um modal é renderizado contendo três blocos de ação:
  - **Status da Aula**: Alternância rápida entre `[ ✓ ] Presente`, `[ ! ] Advertência`, `[ 🔔 ] Ocorrência` e `[ 👤? ] Ausente`.
  - **Ações Rápidas**: Atalhos para limpar status ou registrar ocorrência direta.
  - **Botão de Pânico**: CTA Vermelho `[ 🚨 ALERTA URGENTE / GRAVE ]`. Exige Double Opt-in (checkbox) para notificar a Coordenação via WhatsApp.

### 3. Fluxo de Integração (State Management)
- **Redirecionamento Inteligente**: Quando o professor seleciona `[ 🔔 Ocorrência ]` no modal do Mapa de Sala, o sistema captura os dados primários (id_aluno, turma, posição) e realiza um Push Route para a URL `https://prancheta.online.des.br/chamados`.
- **Auto-fill**: O formulário de chamados é pré-preenchido automaticamente, restando ao professor apenas digitar o contexto da ocorrência, garantindo um Time-to-Task mínimo.

### 4. Evolução do Dashboard Executivo (Super Admin)
O painel da Vice-Direção/Diretoria evolui de um modelo reativo para preditivo:

- **Heatmap (Mapa de Calor)**: Visualização gráfica de "Locais de Risco" mapeados na Fase 2 (Ex: Cantina, Corredor Superior, Banheiros), indicando onde ocorrem mais infrações.
- **Top Offenders**: Ranking dinâmico de alunos reincidentes.
- **Filtros Globais em Massa**: Implementação do componente Fluent 2 Switch para alternar instantaneamente todo o contexto do dashboard entre Turno: MANHÃ e Turno: TARDE.

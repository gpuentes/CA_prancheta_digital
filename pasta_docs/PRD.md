# PRD: CA Prancheta Digital & Campainha Mobile

## 1. Visão Geral e Objetivos de Negócio
A **CA Prancheta Digital** é uma aplicação PWA (Progressive Web App) focada na eliminação de processos manuais burocráticos no registro e triagem de ocorrências disciplinares em ambiente escolar. 
- **Objetivo Principal:** Reduzir o desperdício de tempo de 3 a 5 minutos por ocorrência por meio de automações como o "Colar Inteligente", otimizando o trabalho dos monitores de pátio e da diretoria.
- **Indicador de Sucesso:** Redução do tempo médio de registro e resolução de ocorrências, além de economia com insumos de papel.

## 2. Perfis de Usuário (Personas)
* **CTO Admin (Guilherme Puentes):** Acesso total irrestrito (God Mode), auditoria sistêmica e acompanhamento de SLA em tempo real.
* **Monitor de Pátio (Operacional):** Funcionários que atuam fisicamente na escola. Realizam triagem e envio de alunos. *Restrição LGPD: Não possuem acesso a dados sensíveis de histórico disciplinar anterior, apenas podem abrir/acompanhar o chamado atual.*
* **Coordenador / Diretoria:** Recebem os alunos triados pelos monitores. Precisam de alertas visíveis de tempo (Campainha) e painel analítico.

## 3. Escopo e Não-Escopo
### 🟢 Dentro do Escopo
* PWA Mobile-first responsivo e com suporte a funcionamento Offline-first (IndexedDB).
* Fluxo de abertura de chamados ágil (Colar Inteligente).
* Campainha de notificação assíncrona para a diretoria.
* Painel de Auditoria e Analytics para Coordenação/CTO.
* Conformidade rigorosa com a LGPD.

### 🔴 Fora do Escopo
* Aplicativo nativo iOS/Android hospedado nas stores (será estritamente PWA via navegador).
* Integração síncrona ou gravação direta no banco do ERP legado (opera de forma isolada, apenas consumindo dados read-only de maneira inteligente).

## 4. Épicos e Funcionalidades Core
### EPIC 01 - Automação e Captura (Fluxo A e B)
* **Feature:** Busca preditiva contextual de alunos (reduz turmas ativas baseando-se no timestamp vigente).
* **Feature:** Simular/Abrir Novo Chamado com touch targets expandidos (mínimo 48x48px).
* **Critérios de Aceitação:** 
  - O autocomplete deve formatar no padrão "[Primeiro Nome] + [Último Sobrenome] - [Série]".
  - O estado do PWA deve persistir off-line se houver queda de rede no corredor/pátio, sincronizando via Service Worker.

### EPIC 02 - Campainha Assíncrona e Notificações (Fluxo C)
* **Feature:** Painel receptivo na diretoria.
* **Feature:** Tempo SLA correndo na tela.
* **Critérios de Aceitação:**
  - A interface deve empregar redundância semântica (ícones + texto) além de cores (para acessibilidade a daltônicos).
  - Atualizações via WebSockets/SSE, sem polling clássico.

## 5. Regras de Negócio (Invariantes) e Segurança
* **Regra 1 (LGPD & Privacidade):** Monitores NÃO podem visualizar ocorrências prévias do aluno ou fotos de cadastro no próprio tablet em armazenamento permanente (LocalStorage bloqueado para dados sensíveis).
* **Regra 2 (Sessão):** Tokens e chaves de validação expiram via SessionStorage em caso de inatividade. Compartilhamento de tablet não pode cruzar sessões de login de funcionários distintos.

## 6. Requisitos Não Funcionais
* **Acessibilidade:** Padrão W3Cx (cores redundantes, semáforos textuais/ícones).
* **Performance:** UI baseada em Fluent 2 Design System, garantindo fluidez extrema sem bloquear a main thread do tablet.
* **Telemetria:** Captura de 'login_windows_detectado' (autenticação herdada) em background.

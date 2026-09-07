# CA Prancheta Digital 📋

O **CA Prancheta Digital** é uma Aplicação Web Progressiva (PWA) modular e escalável. O sistema foi projetado para digitalizar o registro de ocorrências de pátio, a triagem na entrada escolar e a moderação de chamados, eliminando o atrito do uso de papel e garantindo dados acionáveis em tempo real para a diretoria.

## 🚀 Stack Tecnológica
*   **Front-end:** PWA otimizado para Mobile/Tablet, utilizando o **Microsoft Fluent 2 Design System** para consistência visual e acessibilidade.
*   **Back-end (Arquitetura):** MVC (Model-View-Controller) estrito, integrado via SSO herdado do ERP/CRM legado.
*   **Banco de Dados:** PostgreSQL com a extensão `pgvector` (preparado para análises de similaridade e IA).
*   **ORM:** Prisma.

## 📖 Linguagem Ubíqua (Glossário DDD)
Para garantir que a equipe técnica e a área de negócios falem o mesmo idioma, os seguintes termos são a base do Domínio do Sistema:

*   **Chamado:** Ocorrência bruta registrada pela Secretaria ou pelo Terminal da Sala, que entra na fila de atendimento dos monitores.
*   **Registro de Pátio / Ocorrência:** Infração disciplinar ou desvio de conduta identificado e registrado diretamente pelo Monitor via dispositivo móvel.
*   **Monitor (Operador):** Profissional em mobilidade responsável pela triagem de chamados e abordagem proativa de alunos no pátio.
*   **Busca Preditiva (Typeahead):** Motor de filtragem tática que cruza iniciais de nomes com o turno/horário atual para acelerar a localização do aluno no banco de dados.
*   **SLA Visual:** Representação gráfica (heurística de cores e ícones) do tempo decorrido desde a abertura de um chamado, determinando sua prioridade de atendimento.
*   **Terminal da Sala:** Interface *Kiosk Mode* operada pelo professor para disparos ágeis de chamados para a coordenação.

## 🛠️ Metodologias e Padrões (Playbook)
*   **DDD (Domain-Driven Design):** Código focado no domínio de negócios (uso rigoroso do Glossário).
*   **FDD (Feature-Driven Development):** Branches organizadas por funcionalidades (`feature/modulo-terminal`, `feature/modulo-patio`).
*   **A11y (Acessibilidade):** Compliance com contraste Fluent 2 e suporte total a leitores de tela e daltônicos.
*   **TDD / BDD:** Desenvolvimento guiado por testes, traduzidos a partir de histórias de usuário (Gherkin).

---

## 📦 Atualização de Versionamento e Git Flow (06/09/2026)
Para manter a organização do código e a rastreabilidade das entregas, o repositório foi estruturado com as seguintes branches e commits padronizados (Conventional Commits):

### 🌳 Árvore de Branches Atuais
- `main`: Código espelho da produção (estável).
- `develop`: Ambiente de integração e testes.
- `docs/arquitetura-fase3`: Branch dedicada à documentação as Code (DaC) de hoje.
- `feature/schema-prisma`: Branch para o modelo de banco de dados e extensões.
- `feature/mapa-de-sala`: Branch para o desenvolvimento do UI/UX do popover e Kiosk Mode.

### 📝 Registro de Commits (Changelog de Hoje)

```bash
# Branch: docs/arquitetura-fase3
commit 1: docs: atualiza PRD com escopo da Fase 3 e RBAC do menu lateral
commit 2: docs: documenta wireframes lógicos e heurísticas A11y para Safari/iPad

# Branch: feature/schema-prisma
commit 3: feat(db): cria schema.prisma com entidades Aluno, Local, Ocorrencia e pgvector
commit 4: chore(db): prepara script de seed inicial com planta do piso superior e inferior

# Branch: feature/mapa-de-sala
commit 5: feat(ui): cria modal contextual do aluno no mapa com botões de status da aula
commit 6: feat(ui): implementa push route com state management para a tela de chamados
commit 7: feat(kiosk): adiciona botão de Alerta Grave (Double Opt-in) com integração WhatsApp
```

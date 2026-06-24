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

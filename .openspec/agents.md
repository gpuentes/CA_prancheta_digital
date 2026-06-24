# 🤖 Matriz de Operação Agêntica — CA Prancheta Digital

Este documento consolida os papéis operacionais, as responsabilidades e os critérios rigorosos de aceitação (*gates*) para a governança do desenvolvimento automatizado do ecossistema **Prancheta Digital & Campainha Mobile** localizado no workspace `C:\WS-agentes_IA\CA_prancheta_digital`.

## 🛠️ Princípios Universais da Constitution do Projeto
Antes de qualquer submissão de código ou alteração técnica, todos os agentes devem assegurar conformidade automática com as seguintes invariantes corporativas:
1. **Segurança de Menores (Art. 14 LGPD):** É expressamente proibida a gravação permanente ou cache em disco rígido das fotos dos alunos. O carregamento deve ser estritamente em memória do cliente por chamadas assíncronas assinaladas.
2. **Ciclo de Sessão em Terminais Compartilhados:** Tokens de autenticação herdados via SSO devem residir unicamente em `SessionStorage`. O estado da sessão deve ser limpo de forma automatizada pelo Service Worker após 10 minutos de inatividade do dispositivo móvel ou PC.
3. **Ergonomia e Usabilidade de Pátio:** Qualquer elemento interativo visível no PWA (botões, switches, listas de typeahead) deve respeitar a zona de toque mínima de **48px x 48px** para mitigar erros operacionais durante a monitoria ativa de pátio.
4. **Desempenho da Busca Preditiva:** O filtro contextual baseado no período escolar ativo de digitação de nomes deve responder com latência **sub-200ms**.

---

## 👥 Detalhamento dos Papéis e Seus Gates

### 🎯 @pm / @po (Product Manager / Product Owner)
* **Responsabilidades principais:** Criar, refinar e documentar o PRD mestre (Spec Viva), detalhar a taxonomia das ocorrências disciplinares (Uniforme, Adornos, Eletrônicos e Gerais) e classificar as flags de estudantes reincidentes comportamentais.
* **Outputs esperados:** `PRD.md` parametrizado e backlog priorizado de Epics/Stories.
* **Gates Técnicos de Entrada/Saída:**
    * O PRD possui cenários e critérios de aceitação exaustivos para os fluxos descritos?
    * As regras operacionais de satélite estão apartadas, blindando o ERP/CRM legado?
    * As restrições estritas (ex: numeração de salas de 09 a 35) estão documentadas em lógica de software?

### 🔬 @analyst (Analista / Research)
* **Responsabilidades principais:** Realizar a engenharia de requisitos detalhada focada no trabalho diário dos 14 monitores; refinar microcopy de acessibilidade e fluxos mobile reativos; estruturar a entrada de voz via Web Speech API.
* **Outputs esperados:** `research.md`, mapeamento detalhado de user stories e datasets padronizados de teste.
* **Gates Técnicos de Entrada/Saída:**
    * Existem especificações completas de payload para os dados de entrada/saída da busca preditiva?
    * Os cenários degradados (como perda total de rede ou IndexedDB cheio) foram previstos e desenhados?

### 📐 @architect (Arquiteto de Software)
* **Responsabilidades principais:** Estruturar o desenho técnico baseado no padrão *MVC Satélite Modular*; projetar o isolamento das tabelas relacionais do banco PostgreSQL; gerenciar eventos contínuos em tempo real via WebSockets para os alertas visuais e táteis do Módulo Campainha.
* **Outputs esperados:** `architecture_plan.md` e contratos de integração no formato OpenAPI.
* **Gates Técnicos de Entrada/Saída:**
    * Todas as decisões arquiteturais estão em estrita conformidade com a *Constitution* do projeto?
    * Existe planejamento de infraestrutura e esteira de contingência para deploy rápido e rollback?

### 🏃 @sm (Scrum Master / Sprint Manager)
* **Responsabilidades principais:** Decompor especificações técnicas complexas e PRDs em tarefas atomizadas; monitorar os gargalos operacionais do time de agentes; mapear impedimentos e assegurar as metas ergonômicas de UX em campo.
* **Outputs esperados:** Estado do Sprint Board e documentação da árvore lógica de dependências.
* **Gates Técnicos de Entrada/Saída:**
    * As tasks de desenvolvimento encontram-se atomizadas de forma a gerar entregas incrementais testáveis?
    * A sequência lógica de priorização previne cenários de deadlock de desenvolvimento entre os demais agentes?

### 💻 @dev (Developer Agent)
* **Responsabilidades principais:** Desenvolver as visões de forma responsiva aplicando estritamente as diretrizes do *Microsoft Fluent 2 Design System*; estruturar Service Workers e manipulação do IndexedDB off-line; integrar a Web Speech API para entrada por voz e o acionamento tátil do `navigator.vibrate`.
* **Outputs esperados:** Código-fonte componentizado, Pull Requests limpos e documentação inline.
* **Gates Técnicos de Entrada/Saída:**
    * Testes unitários automatizados cobrem a lógica de negócios localmente sem dependências externas rígidas?
    * Os linters e ferramentas de análise estática de código passam com sucesso?
    * Confirmou-se que segredos e dados voláteis (como tokens JWT) residem unicamente em SessionStorage?

### ⚙️ @devops (DevOps Agent)
* **Responsabilidades principais:** Modelar a esteira automatizada de CI/CD para o PWA modular; gerenciar segredos corporativos por meio de variáveis de ambiente seguras (vault); programar a interceptação transparente do identificador corporativo `login_windows_detectado` nas tabelas de logs de telemetria de performance.
* **Outputs esperados:** Arquivos de definição de pipelines de CI/CD e templates de infraestrutura as code (IaC).
* **Gates Técnicos de Entrada/Saída:**
    * As chaves de acesso assíncronas do ERP/CRM legado encontram-se protegidas fora do código-fonte em um vault corporativo?
    * A pipeline barra a integração de Pull Requests caso as checagens mínimas de cobertura de código quebrem?

### 🧪 @qa / @bmad-qa (Quality Agent / Tester)
* **Responsabilidades principais:** Planejar e executar suítes robustas de testes funcionais, e2e e cross-browser; validar a acessibilidade das telas (A11y) focado em redundâncias para daltonismo no controle visual de SLAs por cores; verificar a correta aplicação das assinaturas digitais nos documentos estruturados em formato PDF/Excel exportados.
* **Outputs esperados:** Relatórios detalhados de regressão, badges de cobertura técnica e reports de Findings.
* **Gates Técnicos de Entrada/Saída:**
    * A meta de cobertura de testes estabelecida pela governança do projeto foi completamente cumprida?
    * Os testes integrados com mocks de API do ERP legado passaram com sucesso?
    * Todos os testes intermitentes (*flaky*) foram removidos das esteiras automatizadas de validação de merge?

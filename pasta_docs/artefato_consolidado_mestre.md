# Artefato Consolidado Mestre: Arquitetura, Governança, Sprints e Negócio
**Projeto:** CA Prancheta Digital (PWA Satélite Escolar & Gestão Disciplinar)  
**Ecossistema Institucional:** WUXIA-OPS | Web Solutions ETI  
**CTO & Gestor de Produto:** Guilherme Puentes  
**Agente Sênior Responsável:** Gepto  
**Repositório Oficial:** `github.com/gpuentes/CA_prancheta_digital`  
**Endpoint de Produção / Homologação:** `https://prancheta.online.des.br`  
**Diretório Base Local:** `C:\WS-agentes_IA\CA_prancheta_digital`  
**Padrões de Compatibilidade:** Google Docs (Texto Estruturado / Tabelas Semânticas) & Odoo Projects/Tasks/Knowledge  
**Data de Consolidação:** 06/09/2026 | **Versão:** 2.0 (Consolidada e Deduplicada)  

---

## 1. Sumário Executivo do Produto

A **CA Prancheta Digital** é uma aplicação satélite PWA (Progressive Web App) concebida para erradicar o uso de formulários manuais em papel, pranchetas analógicas e transmissões ruidosas por rádio no ambiente escolar.

### Objetivos Estratégicos
* **Eliminação de Fricção Operacional:** Redução do tempo de registro disciplinar de 3 a 5 minutos (físico) para menos de 15 segundos através de busca preditiva e ações rápidas.
* **Comunicação Assíncrona Integrada:** Substituição de deslocamentos físicos da monitoria por um sistema em tempo real com Campainha, buffer de cancelamento e temporizadores de SLA para a Secretaria e Coordenação.
* **Conformidade Estrita com LGPD (Artigo 14):** Proteção integral aos dados de crianças e adolescentes, impedindo a retenção permanente de fotografias e históricos disciplinares em dispositivos móveis compartilhados de campo.

---

## 2. Perguntas do Gestor e Resoluções Técnicas Consolidadas

| Módulo / Frente | Pergunta / Demanda do Gestor | Resolução Arquitetural e Técnica Adotada |
| :--- | :--- | :--- |
| **Ambiente & IDE** | *Onde solicitar alterações e como operar na IDE Antigravity?* | O chat interno atua como orquestrador central (Gepto). A IDE possui acesso direto ao sistema de arquivos local, compilação de código e terminal integrado, dispensando cópia manual externa. |
| **Linha de Comando** | *Como mitigar lentidões e travamentos de terminal no Windows?* | Identificado o bloqueio assíncrono de pipe (EOF ausente no stdout/stderr). Instituído o uso mandatório do prefixo `cmd /c` para todas as chamadas disparadas por agentes locais. |
| **Git & Sigilo** | *Como versionar o código sem expor documentos e dados sigilosos?* | Implementação do paradigma *Documentation as Code* (DaC) em `docs/`. Blindagem rigorosa via `.gitignore` para variáveis locais, sandboxes de agentes (`.agents/`, `.gemini/`) e chaves privadas. |
| **Domínio & Nomenclatura** | *Como eliminar a terminologia genérica "Chamados" e tratar as salas?* | O termo "Chamados" foi extinto no âmbito pedagógico, substituído por **Ocorrência de Sala**. Criação dos perfis restritos de Terminal por Sala física (Salas 20 a 24) com matriz oficial de assentos. |
| **Acessibilidade (A11y)** | *Por que os controles de tema e acessibilidade não refletiam no Fluent UI?* | Os componentes do Fluent 2 exigem injeção por provedor contextual reativo. Criado o observador de mutações no elemento raiz para alternar temas (Claro, Escuro, Alto Contraste) e escalonar fontes proporcionalmente. |
| **SLA & Feedback** | *Como unificar e evitar discrepâncias no monitoramento temporal?* | Centralização de regras temporais em componente único (`SLABadge.jsx`), com avisos sonoros sintetizados via `AudioContext` para alertas críticos sem necessidade de vigilância constante da tela. |

---

## 3. Matriz de Perfis e Permissões (RBAC)

| Perfil / Papel | Rota Inicial | Módulos Autorizados | Responsabilidade Operacional & Restrições de Privacidade |
| :--- | :--- | :--- | :--- |
| **CTO Admin** | `/dashboard` | Acesso Irrestrito (Dashboard, Pátio, Ocorrência Sala, Campainha, CMS, Config) | Governança técnica, gestão de infraestrutura, auditoria de rede e telemetria anônima. |
| **Diretoria** | `/dashboard` | Dashboard executivo, Ocorrência Sala, Campainha, CMS, Auditoria | Análise de volumetria, indicadores pedagógicos, relatórios consolidados e decisões disciplinares graves. |
| **Secretaria** | `/patio` | Pátio, Ocorrência Sala, Campainha Geral, Aba Campainha Lista, CMS | Recepção, triagem, despacho de apoios e edição dos templates dos botões rápidos de colagem. |
| **Monitoria** | `/patio` | Aba Campainha (reativa) e Aba Prancheta (proativa), Ocorrência Sala | Triagem em campo e atendimento de chamados. **Veto estrito a fotos e históricos completos em LocalStorage.** |
| **Terminal Sala** | `/mapa-sala` | Visualizador de Carteiras (Matriz 6x5) e Campainha Rápida do Docente | Modo Kiosk exclusivo do professor. **Bloqueio total de menus corporativos, históricos e barra de navegação.** |

---

## 4. Regras de Negócio e Taxonomias do Sistema

### 4.1. Motor Preditivo de Horários e Contexto de Pátio
* **Horário de Pico de Entrada (06:30 às 07:15):**
  * Localização travada automaticamente em `( ENTRADA )`.
  * Habilitação apenas de botões de 1-toque para infrações de alto volume (Uniforme, Calçado, Adorno).
  * Campo de texto descritivo ("Observações") oculto para garantir fluidez máxima no portão.
* **Fluxo Regular (Após 07:15):**
  * Liberação da grade completa de dependências institucionais (Pátio, Cantina, Corredor, Quadra).
  * Habilitação do campo de anotações livres e popups informativos de auditoria no card do estudante.
* **Filtragem de Contra-Turno & Eletivas:** O autocomplete prioriza o turno letivo ativo; caso o discente não conste na grade regular, o mecanismo busca automaticamente na base de turmas eletivas/extracurriculares.

### 4.2. Taxonomia Oficial de Infrações
* **Uniforme:** Ausência de agasalho institucional, falta de calça padrão, camisa descaracterizada.
* **Adorno:** Piercings faciais aparentes fora do regulamento, brincos em desacordo, unhas postiças/coloridas vedadas.
* **Eletrônico:** Manuseio de smartphones durante aula sem autorização, fones de ouvido em trânsito nos corredores, periféricos não homologados.
* **Flag Semanal de Reincidência:** Estudantes com $\ge 5$ registros dentro do ciclo semanal móvel (reset aos domingos) recebem destaque visual tático no card e disparo de alerta à coordenação.

### 4.3. Grade de Destinos Oficiais para Ocorrências de Sala
* **Disciplinar:** Infrações graves de conduta, porte de materiais proibidos ou desacato direto.
* **Coordenação:** Demandas pedagógicas, mediação de conflitos interpessoais em aula ou recusa reiterada de tarefas.
* **Orientação (SOE):** Acolhimento emocional, oscilações comportamentais acentuadas ou escuta individualizada.
* **Diretoria:** Casos extraordinários de extrema gravidade ou convocação imediata de responsáveis legais.
* **Secretaria:** Saídas antecipadas, pendências documentais ou recados de portaria.

---

## 5. Arquitetura Técnica, Engenharia e Infraestrutura

### 5.1. Stack Tecnológica
* **Frontend Core:** React 19 + Vite em arquitetura MVC Estrito (Model-View-Controller).
* **Camada PWA:** Suporte nativo a funcionamento Offline-First via Service Workers e persistência segura em IndexedDB.
* **Design System:** Microsoft Fluent 2 Design System oficial com componentes de alta densidade corporativa.
* **Limite de Responsabilidade (SRP):** Teto rígido de **600 linhas por arquivo de código ou configuração**, preservando a janela de contexto de agentes de IA e prevenindo alucinações cognitivas.

### 5.2. Máquina de Estados e Parâmetros de SLA (Campainha)
A máquina de estados dos chamados opera em 3 estágios sincronizados com temporizadores de auditoria:

| Estágio / Janela | Estado do Chamado | Ação Disponível | Comportamento no Frontend e Alertas |
| :--- | :--- | :--- | :--- |
| **0s a 120s** | `RECEBIDO` | Edição Total / Desfazer | Buffer de tolerância: Secretaria pode cancelar ou corrigir o texto sem emitir falso alerta aos monitores. |
| **121s a 180s** | `RECEBIDO` | Cancelamento Rápido | Bloqueia reescrita de texto; permite descarte em 1 clique se a demanda for solucionada no balcão. |
| **181s a 299s** | `ATENDENDO` | Ação do Monitor | O monitor confirma recebimento ("START") e assume a tratativa em deslocamento. Badge em tom amarelo de alerta. |
| **$\ge$ 300s (5 min)** | `CRÍTICO` | Escalação Automática | **SLA Estourado:** Modal bloqueante vermelho no terminal do monitor acompanhado de sirene contínua (`AudioContext` a 880Hz). |
| **Final** | `FECHADO` | Encerramento | Conclusão do registro com arquivamento temporal e liberação do operador. |

### 5.3. Acessibilidade (A11y) e Ergonomia Física
* **Áreas de Toque (Touch Targets):** Dimensão mínima de **48px $\times$ 48px** em botões móveis, garantindo precisão com tablets em movimento nos pátios.
* **Modos de Visualização:** Suporte integral a Modo Claro, Modo Escuro e Alto Contraste verdadeiro via tokens do Fluent 2.
* **Escalonamento Tipográfico Dinâmico:** Controles de zoom global (A+ / A-) que redimensionam elementos vetoriais e fontes sem quebrar grids ou sobrepor cabeçalhos.

### 5.4. Infraestrutura de Borda e Esteira CI/CD
* **Domínio Oficial:** `prancheta.online.des.br`
* **Hospedagem & DNS:** GitHub Pages sob proxy reverso seguro do Cloudflare com certificado SSL de borda.
* **Apontamento de Rede (Cloudflare DNS - Tipo A):**
  * `185.199.108.153`
  * `185.199.109.153`
  * `185.199.110.153`
  * `185.199.111.153`
* **Workflow de Integração:** GitHub Actions acionado a cada push na branch estável `main`, gerando build estático otimizado com divisão de chunks para acomodar o ecossistema Fluent UI 2.

---

## 6. Inventário Consolidado de Arquivos do Repositório

```text
C:\WS-agentes_IA\CA_prancheta_digital
├── index.html                                 # Ponto de entrada HTML e montagem do container raiz
├── vite.config.js                             # Configuração do empacotador Vite, limites de chunk e PWA
├── package.json                               # Definição de dependências corporativas e scripts de build
├── .gitignore                                 # Regras de blindagem: credenciais, chaves e sandboxes de agentes
├── .env.example                               # Modelo público de parâmetros de ambiente
├── README.md                                  # Especificação oficial do projeto e Glossário DDD
├── CLAUDE.md                                  # Diretrizes de governança, regra cmd /c e teto de 600 linhas
├── CNAME                                      # Mapeamento do subdomínio prancheta.online.des.br
├── .agents/
│   ├── mcp_config.json                        # Configuração Model Context Protocol (PostgreSQL satélite)
│   └── skills/patio-monitor-analyst/SKILL.md  # Habilidade declarativa com progressive disclosure
├── .gemini/commands/bmad/prd.toml             # Comando legado de Product Owner no padrão TOML
├── docs/
│   ├── TUTORIAL_PUBLICACAO_GITHUB_PAGES.md    # Guia passo a passo de infraestrutura DNS e abordagem comercial
│   ├── PORTFOLIO_CASE_PRANCHETA_DIGITAL.md    # Storytelling consolidado de UX/UI e produto
│   ├── WUXIA_OPS_CURSO_PASSO_A_PASSO.md       # Trilhas pedagógicas das esteiras de engenharia
│   └── product/ux_user_stories.md             # Histórias de usuário e diretrizes de design
├── pasta_docs/                                # Diretório intermediário de artefatos consolidados
└── src/
    ├── main.jsx                               # Bootstrap do React, ThemeWrapper reativo e captura global de erros
    ├── App.jsx                                # Roteador principal da aplicação e guardas de rota RBAC
    ├── style.css                              # Tokens de design, classes de Glassmorphism e estilos globais
    ├── components/
    │   ├── Shell.jsx                          # Layout mestre: topo, barra de acessibilidade e menus por perfil
    │   ├── SLABadge.jsx                       # Componente centralizador de cálculo temporal e badges visuais
    │   └── patio/
    │       ├── AbaCampainha.jsx               # Fila reativa do monitor com ações rápidas e máquina de estados
    │       └── AbaCampainhaLista.jsx          # Histórico paginado (5 itens/pág) para Secretaria e Direção
    ├── contexts/
    │   └── AuthContext.jsx                    # Provedor global de autenticação, perfis e persistência
    ├── data/
    │   └── classroomSeats.js                  # Plantas físicas das salas 20 a 24 (Grade 6x5 com mesa frontal)
    ├── js/
    │   └── model.js                           # Camada MVC Model: regras temporais de pátio e dados mock
    ├── modules/analytics/
    │   ├── clarity.js                         # Injeção assíncrona do Microsoft Clarity via env vars
    │   ├── hotjar.js                          # Injeção assíncrona do Hotjar via env vars
    │   └── index.js                           # Orquestrador central de telemetria desvinculada
    └── pages/
        ├── Login.jsx                          # Autenticação sanitizada com credenciais de demonstração rápida
        ├── Patio.jsx                          # Container em abas para operação de pátio (Prancheta / Campainha)
        ├── Chamados.jsx                       # Tela formal de Ocorrência de Sala com nova grade de destinos
        ├── CampainhaProfessor.jsx             # Kiosk do docente com chamadas diretas (Monitor / Limpeza / Ocorrência)
        ├── MapaSala.jsx                       # Visualizador de carteiras das turmas com banner obrigatório
        ├── Dashboard.jsx                      # Painel gerencial com volumetria e gráficos analíticos em Recharts
        └── CMS.jsx                            # Gestão de dependências escolares e parâmetros
```

---

## 7. Mapeamento Estruturado para o Odoo (Projetos, Tarefas e Conhecimento)

A matriz a seguir correlaciona as entregas históricas e os próximos marcos com o modelo relacional do Odoo ERP:

| ID Externo Odoo | Título da Tarefa (`name`) | Módulo / Épico (`project_id`) | Estágio (`stage_id`) | Prioridade | Critérios de Aceitação e Definição de Pronto (`description`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-SP1-01` | Fundação PWA & MVC | Arquitetura Core | Concluído ✅ | Média | Aplicação inicializada com React 19 + Vite, manifest PWA operacional e separação estrita em camadas MVC. |
| `TASK-SP1-02` | Design System Fluent 2 | Interface & UX | Concluído ✅ | Alta | Implantação da biblioteca oficial Microsoft Fluent 2, suporte a Dark Mode, Alto Contraste e touch targets $\ge 48\text{px}$. |
| `TASK-SP1-03` | Dashboard Analytics | Gestão & Diretoria | Concluído ✅ | Média | Renderização de 4 gráficos em Recharts com métricas consolidadas de ocorrências e volumetria por turno. |
| `TASK-SP1-04` | Esteira CI/CD GitHub Pages | DevOps & Infra | Concluído ✅ | Alta | Workflow de compilação automatizada com publicação contínua no domínio `prancheta.online.des.br`. |
| `TASK-SP2-01` | Motor Preditivo de Horários | Pátio Inteligente | Concluído ✅ | Alta | Alternância automática entre Pico de Entrada (06:30-07:15) e Fluxo Normal com filtro de contra-turno. |
| `TASK-SP2-02` | Unificação SLABadge | Performance & UX | Concluído ✅ | Alta | Centralização do cálculo de SLA em componente único com estados Verde (<10m), Amarelo (<30m) e Vermelho (>30m). |
| `TASK-SP2-03` | Ocorrência de Sala & Kiosk | Terminal Docente | Concluído ✅ | Alta | Extinção do termo "Chamados", implantação dos 5 destinos oficiais e tela de chamada em 3 níveis para professores. |
| `TASK-SP2-04` | Plantas Físicas (Salas 20-24) | Gestão Escolar | Concluído ✅ | Média | Modelagem das matrizes de 30 assentos (6 fileiras $\times$ 5 colunas) com identificação das turmas do Ensino Médio. |
| `TASK-SP3-01` | Webhooks de Notificação (n8n) | Integração & IA | Planejado ⏳ | Alta | Disparo assíncrono de eventos no encerramento de ocorrências e alertas sonoros/WhatsApp para casos graves via n8n. |
| `TASK-SP3-02` | Sincronização Satélite Odoo | Backend & ERP | Planejado ⏳ | Média | Script de ingestão em lote para sincronizar chamados e cadastros de alunos diretamente na base do Odoo. |

---

## 8. Orientações de Aplicação no Google Docs e no Odoo

1. **Importação no Google Docs:**
   * Acesse `docs.new`, copie o conteúdo deste artefato e cole diretamente no documento.
   * A formatação em Markdown (títulos hierárquicos, tabelas semânticas e caixas de parâmetros) é convertida automaticamente pelo processador de texto com alinhamento rigoroso.
2. **Carga na Base de Conhecimento do Odoo (`knowledge.article`):**
   * Utilize as Seções 3, 4 e 5 como artigos modulares para compor os manuais de treinamento da Monitoria de Pátio, Secretaria e Professores.
3. **Carga no Módulo de Projetos do Odoo (`project.task`):**
   * A tabela da Seção 7 está normalizada com os nomes de campos oficiais do modelo de dados do Odoo, permitindo exportação direta para CSV ou integração programática via API.

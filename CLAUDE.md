CLAUDE.md — Diretrizes de Governança e Regras de Vibe Coding
Este arquivo governa o comportamento do agente do Antigravity (AntG) e do OpenCloud neste workspace.
Referencie-o em cada nova sessão: "Leia o CLAUDE.md e respeite todas as regras."

⚡ REGRAS DE PERFORMANCE WINDOWS (ANTI-LENTIDÃO)
Terminal Protocol: SEMPRE utilize cmd /c para prefixar qualquer execução de linha de comando disparada de forma autônoma pela IA no Windows.

Sinal EOF: Esta prática impede que o terminal trave no estado infinito "Running..." e libera instantaneamente o pipeline de execução da IDE.

🏗️ ARQUITETURA MODULAR & DESIGN SYSTEM (FILES < 600 LINES)
Modularidade Rígida: Divida o código em arquivos pequenos e isolados de responsabilidade única (SRP). Nenhum arquivo de código ou configuração deve ultrapassar o limite estrito de 600 linhas para evitar alucinações na IA.

Componentes Fluent 2: Todas as camadas da View devem consumir estritamente os componentes visuais oficiais da biblioteca do Microsoft Fluent 2 Design System.

Touch Targets: Componentes interativos móveis devem possuir área de clique mínima de 48px x 48px para uso em movimento por pátios e corredores.

🧠 METODOLOGIA BMAD & ESPECIFICAÇÃO RECURSIVA (SDD)
Spec-First: Nenhuma modificação em lote ou linha de código ativo será gerada sem uma especificação técnica ou plano de implementação prévio aprovado pelo usuário (CTO Guilherme).

Processamento de Erros (AUTO-FIX): Caso uma ferramenta falhe ou o terminal retorne erros, leia atentamente os logs de erro e reescreva o prompt de sistema ou as instruções de habilidades em .agents/skills/ antes de tentar novamente.

Persistência de Memória: Ao final de cada ciclo, armazene um resumo de sessão em formato JSON no arquivo .claude/agent-memory/session_notes.json para evitar a perda de contexto arquitetural entre reinicializações de máquina.

🛡️ SEGURANÇA E CONFORMIDADE COM A LGPD (ARTIGO 14)
Minimização de Dados de Menores: É proibido armazenar fotos cadastrais de alunos ou dados sensíveis em LocalStorage permanente nos tablets ou computadores de pátio. Utilize exclusivamente SessionStorage e limpe os tokens de autenticação herdados após 10 minutos de inatividade do hardware.

Auditoria de Telemetria: Capture e registre de forma transparente o logon do Windows corporativo (login_windows_detectado) para popular de forma estatística os gráficos analíticos da diretoria sem violar o anonimato de uso do colaborador.

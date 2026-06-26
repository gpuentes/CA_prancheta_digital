# Planejamento de Arquitetura e Integrações (Fase 2)

Este documento detalha a estratégia para atender às novas demandas de segurança, infraestrutura, automação e versionamento do projeto CA Prancheta Digital, conforme as diretrizes do ecossistema WUXIA-OPS.

## ⚠️ User Review Required

Antes de prosseguirmos com a execução prática, peço que valide as estratégias abaixo, especialmente as ferramentas escolhidas para auditoria e a dúvida sobre o Google Stitch.

## ❓ Open Questions

> [!IMPORTANT]
> Você mencionou "passar essas telas para o google stitch". Você quis dizer Google Sites, Google Slides (para apresentação), ou o aplicativo AppSheet do Google? Por favor, esclareça qual ferramenta exata do Google você deseja usar para eu preparar os arquivos no formato correto.
> 
> Sobre o seu IP atual, eu não consigo detectar de forma retroativa qual foi o seu IP do VPS ou da sua banda larga no passado se não havia um sistema de log rodando. Porém, se você acessar meuip.com.br nos seus aparelhos hoje, você descobre o atual. O que faremos é construir um sistema de logs a partir de agora para gravar tudo isso no futuro.

## Proposed Changes

### 1. Auditoria Silenciosa e Mapa de Calor (Super Admin)
Para garantir que o vice-diretor ou diretor sejam rastreados (heatmap, cliques, tempo de tela) e que você tenha o registro de IPs e aparelhos sem que eles saibam:

*   **Ferramenta de Heatmap:** Integraremos o Microsoft Clarity ou PostHog. Eles rodam de forma invisível no front-end. Somente você (Super Admin) terá o painel de visualização de mapas de calor e gravação de sessões.
*   **Log de Acessos:** Criaremos um script de auditoria que captura o IP do usuário via API externa (ex: ipify) e o modelo do aparelho (User-Agent) no momento do login, enviando silenciosamente para um Webhook seu (pode ser no n8n) para registro.

### 2. Versionamento Seguro (Apenas Código Fonte)
Atualizaremos rigorosamente o arquivo `.gitignore` para garantir que nenhum documento de arquitetura, conversas (`.txt`), ou a pasta de testes do `CLI-gg` vá para o repositório público do GitHub.

*   **Arquivos Ignorados:** `pasta_docs/`, `CLI-gg/`, `*.txt` (`chat_*.txt`, `PRD_prancheta.txt`, etc).
*   **Código Permitido:** Apenas `src/`, `public/`, `package.json`, `index.html` e arquivos de build do Vite.

### 3. Hospedagem e Domínio (GitHub Pages + Cloudflare)
*   O código fonte será upado no GitHub.
*   Usaremos o GitHub Actions para fazer o build automático (compilar o Vite).
*   No Cloudflare, criaremos um subdomínio (ex: `prancheta.sua-escola.com.br`) apontando via CNAME para os servidores do GitHub, garantindo proxy de segurança (DDoS protection) e SSL gratuito.

### 4. Automação de Ocorrências (n8n + WhatsApp)
*   Criaremos fluxos no n8n recebendo dados do frontend (via Webhook).
*   Quando um chamado de "Ocorrência de Pátio" for gerado na UI, o n8n formatará a mensagem e enviará um alerta em tempo real para um grupo de WhatsApp específico usando uma API (ex: Evolution API ou Z-API).

### 5. Banco de Dados Futuro
Estruturação aprovada para a fase de backend: PostgreSQL + PGVector (preparado para buscas semânticas de IA caso você queira cruzar o histórico de alunos no futuro).

## Verification Plan

*   **Testes do `.gitignore`:** Fazer um `git status` para confirmar que nenhum arquivo confidencial está na lista de commit.
*   **Teste de Auditoria:** Acessar a aplicação localmente e verificar se o painel do Clarity/PostHog registrou a sessão e se o log de IP funcionou.
*   **Deploy:** Configurar o repositório, subir o código e amarrar o DNS do Cloudflare.

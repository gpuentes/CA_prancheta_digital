# 📖 MANUAL CONSOLIDADO WUXIA-OPS: Sustentação e Arquitetura

Bem-vindo ao manual completo de operação, homologação e sustentação da **Prancheta Digital** e do **Ecossistema CLI da Web Solutions ETI**.

Este documento consolida a arquitetura e os fluxos desenhados para que Analistas de Negócios, Desenvolvedores, Vendedores e UX/UI Designers possam escalar o projeto com zero atrito.

---

## 1. 💼 Case de Portfólio (Handoff para Negócios e Vendas)
A Prancheta Digital é um PWA progressivo voltado para a eliminação do papel em ocorrências escolares de pátio.
- **Para Vendedores:** Foquem na dor do diretor de escola (risco judicial por falta de histórico) e do coordenador (perda de tempo transcrevendo papéis).
- **Consulte o Portfólio Completo:** \`docs/PORTFOLIO_CASE_PRANCHETA_DIGITAL.md\`
- **Pitch de Vendas:** Integrado no \`docs/TUTORIAL_PUBLICACAO_GITHUB_PAGES.md\`

## 2. 🛡️ Homologação e Produção (Estratégia de Repositórios)
Todo código desenvolvido inicialmente em ambiente seguro e de homologação pessoal (\`gpuentes\`) deve passar por auditoria e ser "promovido" para a conta corporativa (\`websolutionseti\`).
- **Validação de Homologação Concluída:** A separação está perfeitamente executada na raiz de desenvolvimento.
- **Consultar o Playbook de Subida:** \`docs/ESTRATEGIA_HOMOLOGACAO_PRODUCAO.md\`
- **Importante:** Sempre mantenha o \`Co-authored-by\` ativo para pontuar as duas contas no GitHub.

## 3. 🤖 Sustentação do CLI Gemini e IA (Synkra AIOX)
Nossa infraestrutura de Inteligência Artificial roda baseada no \`cli-kit-co\`, que abriga comandos customizados que forçam regras de negócio sobre os LLMs.

### Comandos de Governança Disponíveis
- **`/create-story`**: Utilizado pelo Analista/PO. Converte um requisito raso em um Épico WUXIA-OPS completo, com critérios de aceite e arquitetura técnica.
- **`/wuxia-review [caminho-do-arquivo]`**: Utilizado por Tech Leads. Faz a leitura em disco do código e realiza auditoria automática no Design System (FluentUI), segurança, performance de React e Acessibilidade W3C (WCAG).

### 📖 Material Didático de Suporte
- **Documentação como Código (DaC):** \`docs/WUXIA_OPS_CURSO_PASSO_A_PASSO.md\`
- **Rascunhos da IA:** Todos os logs de *Discovery* e ideação de IA estão centralizados e versionados de forma segura dentro do diretório \`pasta_docs/\` (antes ignorado, agora protegido via nuvem).

---
**Status da Auditoria:** ✅ APROVADO.
*Ecossistema Web Solutions ETI - Guilherme Puentes (CTO)*

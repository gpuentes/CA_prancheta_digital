# Arquitetura de Banco de Dados e Sistema (SDD)

Este documento descreve as decisões arquiteturais do projeto.

## Frontend (Em Produção)
- **Framework:** React.js via Vite (compilação rápida).
- **Design System:** `@fluentui/react-components`.
- **Hosting:** GitHub Pages + Cloudflare (Segurança e CDN).

## Backend / Dados (Fase 3 - Planejamento)
- **Banco de Dados:** PostgreSQL hospedado em Nuvem.
- **Busca Semântica:** Extensão `PGVector` para cruzamento inteligente de histórico de ocorrências.
- **Automação (Middleware):** n8n para orquestrar Webhooks do front-end e disparar mensagens de WhatsApp (via Evolution API/Z-API).

## Auditoria (Segurança Silenciosa)
Integração com **Microsoft Clarity / PostHog** para gravação de sessões e mapas de calor invisíveis para usuários comuns, acessíveis apenas pelo Super Admin.

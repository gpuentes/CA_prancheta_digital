# Blueprint Arquitetural (Módulo Pátio)
**Agente Responsável:** @architect
**Foco:** Profundidade de Módulos e Largura de Integrações

## 1. Stack Tecnológica
* **Frontend:** React + Vite.
* **Design System:** Microsoft Fluent 2 (`@fluentui/react-components`).
* **PWA & Offline:** `vite-plugin-pwa` para gerenciar o Service Worker, e `localforage` como wrapper do IndexedDB para armazenamento seguro em modo offline.
* **Comunicação Assíncrona:** Server-Sent Events (SSE) ou WebSockets no componente da Campainha para evitar o bloqueio da *main thread* (livre de polling).

## 2. Estrutura de Diretórios (Profundidade)
```text
src/
 ├── assets/          # Ícones, manifestos, imagens
 ├── components/      # UI isolada (Botões, Cards, Modais) baseada em Fluent UI
 ├── context/         # Estados globais de autenticação e sessão
 ├── hooks/           # Custom hooks (ex: useOfflineQueue, useSlaTimer)
 ├── pages/           # Views principais (Dashboard, Campainha, NovoChamado)
 ├── services/        # Integrações de API, IndexedDB e WebSockets
 └── utils/           # Funções de formatação e heurísticas de regras
```

## 3. Integração de Dados (Largura)
A "largura" de comunicação deste sistema baseia-se no isolamento MVC:
* **Controller:** Intercepta requests do formulário e gerencia a fila *offline* no IndexedDB.
* **Transição de Estados:** Quando o dispositivo móvel recupera sinal (evento `online` do navegador), o *Service Worker* descarrega o payload de chamados pendentes para o back-end via API REST.
* **Session Management:** O JWT não habita o *LocalStorage*. Reside em memória ou `SessionStorage`, com um timer (`setTimeout` regressivo de 10 min de ociosidade) para matar a sessão caso o tablet seja passado a outro monitor.

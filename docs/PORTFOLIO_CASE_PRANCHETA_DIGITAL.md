# 🚀 Case Study de Portfólio: Prancheta Digital (WUXIA-OPS)
**URL sugerida:** `portfolio.gscpweb.com.br/case-prancheta-digital`

---

## 💎 1. Descoberta (Discovery) - O Problema e o Contexto
Nas instituições de ensino modernas, a gestão de pátio e a disciplina dos alunos frequentemente dependem de processos analógicos: papéis, planilhas descentralizadas e comunicação boca a boca. Isso gera uma enorme fricção cognitiva e operacional.

**A Dor do Usuário:**
- **Lentidão Crítica:** Professores em sala de aula sem um canal rápido, silencioso e seguro para pedir ajuda da monitoria.
- **Falta de Dados Estruturados:** Diretores tomando decisões baseadas em "achismos" em vez de mapas de calor de indisciplina.
- **Sobrecarga Cognitiva:** Perda de tempo da coordenação pedagógica com trabalho braçal de transcrição de ocorrências.

**O Desafio:** Criar uma solução digital "End-to-End" intuitiva o suficiente para ser usada por monitores em movimento (mobile-first) e robusta o bastante para fornecer inteligência de dados à diretoria, reduzindo a carga mental de todos os envolvidos.

---

## 🧭 2. Definição (Definition) - Visão e Estratégia de Produto
Atuando como Product Manager (PM), adotei uma estratégia agressiva de "Time-to-Market" utilizando o ecossistema e aceleradores **WUXIA-OPS**. 

**Estratégia e Metodologia:**
- **DDD (Domain-Driven Design):** Padronização do glossário para que a interface e o código refletissem a realidade escolar sem jargões técnicos (Chamados, Terminal da Sala, Pátio, Diretoria, Ocorrências).
- **Documentation as Code (DaC):** Centralização de requisitos, design system e regras de negócio junto ao código, garantindo rastreabilidade.

---

## 🎨 3. Desenvolvimento (Development) - Product Design e Acessibilidade
Como Senior Product Designer, o foco foi **Clareza Cognitiva e Acessibilidade**. A escolha do Design System não foi arbitrária: optei pelo **Microsoft Fluent 2**.

**Acessibilidade Digital e UX (W3C/WCAG):**
- **Redução de Carga Cognitiva:** Utilização de padrões mentais já estabelecidos (ecossistema Office/Windows), zerando a curva de aprendizado para professores e gestores.
- **Acessibilidade Inclusiva (A11y):** 
  - **Escalonamento de Fonte universal:** (A- / A+) cobrindo 100% da interface, essencial para profissionais de diferentes idades.
  - **Modo Escuro (Dark Mode):** Prevenção de fadiga visual para coordenadores que passam o dia inteiro no sistema.
  - **Alto Contraste:** Suporte nativo ao modo de alto contraste do hardware para usuários com baixa visão.

*(Nota para o Gemini: Inserir Blueprint, Jornadas do Usuário e Mapa do Site)*

---

## 🛠️ 4. Entrega (Delivery) - Engenharia, Arquitetura e DevSecOps
Vestindo o chapéu de Tech Lead / Architect, realizei o "Handoff Solo", transformando o design em código em tempo recorde usando orquestração de Agentes IA (Gepto).

**Arquitetura e Performance:**
- **Frontend Premium:** React (Vite) + Fluent UI + CSS Vanilla focado em performance e variáveis de tokens de design. Padrão MVC interno isolando regras de negócio (`AppModel`) da camada de renderização, garantindo interface fluida de 60fps.
- **Observabilidade UX:** Injeção de **Microsoft Clarity** e **Hotjar** via variáveis de ambiente. Sessões gravadas e heatmaps permitem evolução contínua guiada por dados reais de uso.
- **DevSecOps Edge:** CI/CD via GitHub Actions com deploy direto em Edge Servers (GitHub Pages) protegido por proxy reverso, Anti-DDoS e SSL via **Cloudflare** (`prancheta.online.des.br`).

---

## 📈 5. O Impacto (Resultados e Métricas)
O framework WUXIA-OPS permitiu entregar em dias o que uma equipe tradicional levaria meses. O "Aha Moment" ocorreu na eliminação completa do papel.

**Métricas de Sucesso (Projeção e Ganhos WUXIA-OPS):**
- **Aceleração de Design-to-Code:** Aumento de **300% na eficiência** de prototipagem e desenvolvimento graças ao Design System integrado aos Agentes de IA.
- **Tempo de Resposta a Incidentes:** Redução de **~8 minutos** para **segundos** na triagem de problemas graves via Terminal Isolado de Sala (notificações push/WhatsApp).
- **Gestão Data-Driven:** 100% de visibilidade para a diretoria, com dashboards mapeando horários e locais críticos de indisciplina.

*(Nota para o Gemini: Inserir prints da interface - Login, Pátio, Dashboard, Terminal Isolado)*

---
**Autor & Executor:** Guilherme Puentes (Product Designer, Software Engineer & WUXIA-OPS Founder).

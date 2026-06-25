# 🎓 Curso WUXIA Ops: Engenharia e Design de um PWA Enterprise

Bem-vindo ao treinamento premium da WUXIA Ops. Este não é apenas um tutorial de código; é um guia estratégico ("Documentation as Code") de como construímos a **CA Prancheta Digital** utilizando Inteligência Artificial de alto nível, Design Centrado no Usuário e Engenharia Escalável. 

Nosso objetivo é que você entenda o **"Porquê"** de cada decisão (UX, Arquitetura, Negócios) antes de aprender o **"Como"** (Código, Deploy).

---

## 🧠 Módulo 1: Strategy & Setup (A Fundação WUXIA)
Antes de escrever qualquer linha de código, estruturamos a inteligência do projeto utilizando nosso Agente IA Sênior (Gepto).

**O Porquê:** Projetos falham por falta de clareza, não por falta de código. Um ambiente limpo e blindado garante segurança da propriedade intelectual e direção técnica clara.

**O Como:**
1. **Definição da Stack:** Frontend React + Vite com Fluent UI 2 (foco em acessibilidade cognitiva). Backend futuro via PostgreSQL + PGVector para buscas semânticas, e n8n para orquestração.
2. **Higiene do Repositório:** Configuração agressiva do `.gitignore` bloqueando vazamento de rascunhos de IA (`*.txt`, `pasta_docs/`).

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] A stack escolhida resolve a dor do usuário com o menor custo cognitivo?
- [ ] O repositório está seguro contra vazamentos de prompts e rascunhos de IA?

---

## 🎨 Módulo 2: O Frontend Premium com Fluent UI 2
Nós não fazemos apenas telas; nós construímos "Experiências". O frontend deve refletir estabilidade corporativa.

**O Porquê:** Professores e gestores já estão exaustos. Nossa interface deve usar os modelos mentais do pacote Office que eles já conhecem. O Fluent UI entrega essa familiaridade somada à acessibilidade nativa (WCAG).

**O Como:**
1. Geração do ambiente base via **Vite**.
2. Resolução tática de dependências corporativas forçando compatibilidade segura (`npm install -D @vitejs/plugin-react --legacy-peer-deps`).

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] Os tokens de design (cores, tipografia) garantem contraste adequado para baixa visão?
- [ ] A interface responde instantaneamente (feedback visual) às ações do usuário?

---

## 🚀 Módulo 3: Edge DevOps e CI/CD
Automação é a alma da WUXIA-Ops. Código parado não gera valor.

**O Porquê:** Remover o erro humano do processo de deploy. A equipe deve focar em gerar valor de negócio (features/design), enquanto robôs cuidam de publicar a aplicação com segurança.

**O Como:**
1. Criação do pipeline no GitHub Actions (`.github/workflows/deploy.yml`).
2. Compilação automática e envio da pasta `dist` para o GitHub Pages a cada push na `main`.

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] O build quebra se houver erros críticos de linting/acessibilidade?
- [ ] O tempo de deploy do CI/CD está abaixo de 3 minutos para garantir agilidade?

---

## 👁️ Módulo 4: Observabilidade e Auditoria de UX
Achismo mata produtos. Precisamos de dados comportamentais.

**O Porquê:** A diretoria exige relatórios, mas o Design exige ver como o usuário real clica, rola e se frustra na tela. Mapas de calor são cruciais para melhoria contínua.

**O Como:**
1. Injeção invisível do **Microsoft Clarity / PostHog**.
2. Gravação de sessões sem impactar a performance (carregamento assíncrono do script), municiando o UX Designer de insights.

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] O script de analytics está bloqueando a thread principal de renderização? (Deve ser não-bloqueante).
- [ ] Os dados de identificação pessoal (PII) dos alunos estão sendo ocultados corretamente na gravação?

---

## 📚 Módulo 5: Documentation as Code (DaC)
Documentação solta no Google Drive fica obsoleta. Documentação premium vive no repositório.

**O Porquê:** Manter a fonte da verdade única. Se o código evolui, a documentação evolui no mesmo Commit.

**O Como:**
Organizamos a pasta `/docs/` como o cérebro ágil do projeto:
1. `product/prd.md` -> A essência e escopo.
2. `ux-ui/styleguide.md` -> Regras do Design System.
3. `architecture/sdd.md` -> Decisões técnicas.

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] O PRD reflete a última iteração da interface entregue?
- [ ] Um novo desenvolvedor consegue entender a stack apenas lendo os arquivos locais?

---

## 🌍 Módulo 6: Go-to-Market (Domínio Customizado e Cloudflare)
A entrega final precisa transpirar autoridade e credibilidade.

**O Porquê:** `projeto.github.io` é para testes. `prancheta.online.des.br` é para clientes que pagam caro por soluções Enterprise.

**O Como:**
1. Configuração de DNS no **Cloudflare** via registros A e AAAA para os IPs do GitHub.
2. Ativação de Proxy Reverso e proteção Anti-DDoS.
3. Vinculação do Custom Domain no GitHub Pages com SSL Forçado (HTTPS).

✅ **Checklist de Validação UX/Arquitetura:**
- [ ] O cadeado SSL está verde e válido em todos os navegadores?
- [ ] A rotação de rotas do PWA funciona corretamente se o usuário acessar via subdiretórios?

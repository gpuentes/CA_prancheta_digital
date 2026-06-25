# 🚀 Tutorial Técnico e Pitch de Vendas: Publicação da Prancheta Digital

Parabéns pela publicação, Guilherme! O site `https://prancheta.online.des.br/` está no ar, blindado com SSL e rodando liso na edge. Esse é o momento de materializarmos todo o trabalho de Engenharia e UX em valor percebido para o cliente final.

Para te ajudar a vender a Prancheta Digital para o Diretor e Vice-Diretor, preparei um **Pitch de Vendas Premium** focado nas dores operacionais: Segurança, Tempo/Eficiência e Gestão Data-Driven.

---

## 💼 Pitch Comercial Premium: Vendendo Valor, Não Apenas Software

### 1. Para o Diretor (Foco Estratégico, Mitigação de Riscos e Reputação)
"Diretor, a Prancheta Digital eleva a gestão da sua escola. Transformamos problemas de indisciplina, antes baseados em fofocas e subjetividade, em dados rigorosos, auditáveis e de resposta imediata."

* **Resposta Imediata a Crises:** O *Terminal Isolado* na sala de aula garante aos professores um "Botão de Pânico" silencioso. Ocorrências Graves disparam alertas imediatos para a equipe de apoio, mitigando responsabilidades legais em caso de negligência.
* **Inteligência de Dados (Dashboard Executivo):** O fim dos papéis acumulados. Você terá uma "sala de controle" exibindo mapas de calor de indisciplina, horários de pico e eficácia do time de monitores em tempo real.
* **Autoridade perante as Famílias:** O relacionamento com os pais muda de patamar. Reuniões de alinhamento passam a ser guiadas por relatórios consolidados de comportamento, provando o acompanhamento minucioso da escola.
* **Conformidade Legal e Acessibilidade (A11y):** Sistema preparado de forma nativa para professores com baixa visão, blindando a escola em termos de inclusão (Alto Contraste e Fontes Dinâmicas).

### 2. Para a Coordenação Pedagógica (Foco na Eficiência Operacional)
"Coordenadores, sabemos que a carga cognitiva de vocês está no limite. Nosso software vai eliminar o trabalho braçal e devolver horas valiosas do dia de vocês."

* **Input Inteligente (Redução de Fricção):** Monitores no pátio não perdem tempo. Com interfaces adaptadas para mobile e automações de preenchimento, uma ocorrência é registrada em segundos, sem interromper a fiscalização do recreio.
* **Previsibilidade:** Alertas proativos apontam alunos reincidentes em infrações leves antes que o comportamento escale.
* **Exportação Oficial em 1 Clique:** Históricos perfeitos gerados instantaneamente para conselhos de classe (CSV/PDF).

> 💡 **Gancho Comercial (Piloto):** "O sistema já está publicado em ambiente seguro. Vamos rodar um piloto de 15 dias no pátio e ver o barulho da comunicação virar dados em tempo real."

---

## 🛠️ Validação Técnica WUXIA-OPS: Deploy no GitHub Pages via Cloudflare

Para que a experiência do usuário seja fluida desde o primeiro milissegundo, a infraestrutura deve ser impecável. Abaixo, o checklist técnico validado pela Arquitetura.

### 1. Build e Rotas Relativas (Vite)
**Validação:** No GitHub Pages, assets (CSS/JS) tendem a quebrar se o caminho base de compilação estiver apontando apenas para `/` em rotas aninhadas.
- **Ação:** Certifique-se de que o arquivo `vite.config.js` possui `base: './'` ou está apontando exatamente para a string do subdiretório se aplicável.
- **Resultado esperado:** O HTML indexado (`dist/index.html`) puxará os chunks com caminhos relativos, evitando a famigerada "White Screen of Death" no frontend.

### 2. Apontamento de DNS (Cloudflare)
**Validação:** O domínio customizado (`prancheta.online.des.br`) precisa bater nos Edge Servers do GitHub.
1. Acesse **DNS > Registros** no painel Cloudflare.
2. Crie quatro registros **A** para o subdomínio `prancheta`, apontando para os IPs do GitHub:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Mantenha a **nuvem laranja (Proxy Reverso)** ligada. Isso não apenas mascara seu IP, como ativa as regras de firewall (WAF) do Cloudflare contra acessos maliciosos.

### 3. Configuração CNAME no Repositório (Evitando Quedas)
**Validação:** O GitHub precisa de um arquivo de autorização para o domínio. Se não configurado direito, a cada novo deploy do CI/CD o domínio customizado "cai".
- **Ação Crucial:** O arquivo `CNAME` (contendo o texto `prancheta.online.des.br`) DEVE ser adicionado fisicamente na pasta `public/` do seu projeto Vite.
- **Resultado:** Assim, a cada execução do `npm run build` na pipeline do GitHub Actions, o arquivo `CNAME` será copiado para a pasta `dist` e enviado na branch `gh-pages`, garantindo que o domínio não se perca após o deploy.
- Após isso, valide em **Settings > Pages** se o "DNS check" está com flag de sucesso.

### 4. Certificado SSL (Criptografia HTTPS)
**Validação:** Cadeado verde para atestar nível Enterprise.
- **Ação:** No painel do Cloudflare (em SSL/TLS), garanta que a configuração esteja em **Full** (Completo) ou **Flexible** (Flexível).
- Mesmo que o painel do GitHub acuse "Domain is not eligible for HTTPS at this time" temporariamente, a criptografia será gerida e servida pela rede de proxy do Cloudflare.

✅ **Status da Validação Arquitetural:** Fluxos mapeados e homologados. Infraestrutura robusta e pronta para escala!

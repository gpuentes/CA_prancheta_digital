# PRD Complementar: Histórias de Usuário e Frentes de Evolução (Fase 3)

Este documento foi gerado para guiar o Analista de UX (Gemini) na criação dos protótipos, fluxos de tela e refinamento de experiência (A11y/Fluent 2) do projeto **CA Prancheta Digital**.

---

## 🏗️ Frente 1: Terminal da Sala (Interface Isolada)
**Contexto:** O terminal das salas de aula precisa ser à prova de distrações, focado em agilidade para o professor/inspetor.
- **Layout:** Interface "Kiosk Mode" (sem menu lateral de navegação).
- **Ação Principal:** 3 Botões de alerta baseados em severidade:
  1. 🟢 **Normal**
  2. 🟡 **Urgente**
  3. 🔴 **Grave**
- **Regra de Negócio (Botão Grave):** Ao clicar em "Grave", o sistema deve exibir um modal de confirmação (Double Opt-in) contendo um checkbox ou botão secundário com a opção: *"Notificar Coordenação via WhatsApp imediatamente"*.

## 🏗️ Frente 2: Cadastro de Locais (Módulo CMS)
**Contexto:** O sistema precisa ser escalável para diferentes plantas escolares.
- **Nova Aba no CMS:** Gerenciamento de "Locais e Salas".
- **Carga Inicial (Seed):** O sistema deve vir pré-configurado com as Salas de `09` a `34`.
- **Ações UX:** CRUD básico (Criar, Ler, Atualizar, Deletar) de locais de forma ágil, com suporte total a navegação por teclado (A11y).

## 🏗️ Frente 3: Pátio & Histórico de Ocorrência
**Contexto:** O inspetor do pátio precisa registrar ocorrências com precisão de localização.
- **Novos Campos no Formulário:** 
  - Seletor de "Localização Exata" (Ex: Cantina, Banheiros, Escadas, Quadra).
  - Campo de texto (Textarea) para "Observações/Contexto" do motivo da ocorrência.
- **Requisito de Acessibilidade (A11y):** O formulário deve ter alto contraste, inputs grandes (Touch Target Size mínimo de 48x48px para tablets), e Aria-Labels descritivos no Fluent 2.

## 🏗️ Frente 4: Dashboard Executivo (Super Admin)
**Contexto:** A direção precisa de dados visuais para tomada de decisão preventiva.
- **Métricas Visuais:**
  - Mapa de Calor (Heatmap) de Locais de Risco (Onde ocorrem mais infrações?).
  - Ranking de Alunos Recorrentes (Top ofenders).
- **Filtros Globais:** Botões de toggle rápidos para filtrar o painel inteiro por turno: `MANHÃ` ou `TARDE`.

---

## 🤖 Instruções para o Analista de UX (Gemini)
Por favor, com base nas 4 frentes acima:
1. Gere os wireframes em texto ou detalhe o fluxo de telas passo a passo.
2. Defina o esquema de cores e ícones do Fluent 2 para os 3 botões do Terminal da Sala.
3. Descreva como o formulário de ocorrência no tablet lidará com a ergonomia do usuário (ex: teclado virtual tampando a tela).

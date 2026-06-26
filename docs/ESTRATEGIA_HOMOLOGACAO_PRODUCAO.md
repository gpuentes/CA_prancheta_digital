# 🔄 Estratégia de Homologação e Produção (Backup Ativo e Dupla Recompensa)

Em projetos de software que começam em repositórios pessoais e migram para o ecossistema corporativo (Organizações), é fundamental separar os ambientes. 

Para a **Prancheta Digital**, adotamos a seguinte arquitetura de código:
- **Ambiente de Homologação (Testes/Dev):** Repositório Pessoal (`gpuentes/CA_prancheta_digital`).
- **Ambiente de Produção (Oficial):** Repositório Corporativo (`websolutionseti/CA_PD`).

Este documento explica como realizamos a migração (Cópia de Segurança Segura) sem perder o histórico de código, e como configuramos o Git para garantir que **ambos os perfis do GitHub** (Pessoal e Corporativo) ganhem a pontuação de contribuição.

---

## 🏗️ 1. Como fazer a Cópia de Segurança sem Perder o Histórico

Um erro comum é copiar e colar os arquivos soltos de uma pasta para outra. Isso apaga todo o histórico de contribuições, branches e versões. A maneira correta de migrar o código de homologação para produção é através de um clone limpo.

### Passo a Passo da Sincronização:

1. **Baixar o histórico completo (Clone Limpo):**
   Em uma nova pasta no seu computador (ex: `C:\WS-agentes_IA\CA_PD`), execute o comando para baixar todo o código e histórico:
   ```bash
   git clone git@github.com:gpuentes/CA_prancheta_digital.git .
   ```

2. **Apontar para o novo Repositório de Produção:**
   Agora, mudamos o endereço do repositório remoto (`origin` ou criamos um novo remote) para a organização oficial:
   ```bash
   # Opção A: Substituir a origem principal
   git remote set-url origin git@github.com:websolutionseti/CA_PD.git
   
   # Opção B: Adicionar um segundo remoto (ex: websolutionseti)
   git remote add websolutionseti git@github.com:websolutionseti/CA_PD.git
   ```

3. **Subir para Produção:**
   Por fim, enviamos todo o histórico preservado para o GitHub da empresa:
   ```bash
   git push -u websolutionseti main --tags
   ```
   *Pronto! Todo o histórico feito na homologação passa a existir na produção.*

---

## 🤝 2. Configurando a Dupla Recompensa (Co-Authored-By)

Trabalhar em dois perfis diferentes (um pessoal e um da empresa) não significa que apenas um vai ganhar o crédito pelas contribuições (os famosos "quadradinhos verdes" do GitHub). 

Nós usamos uma funcionalidade nativa do Git chamada **Trailer de Co-Autoria** para pontuar em ambos!

### Como configurar o Template Automático:

1. Na raiz do seu projeto de Produção, crie um arquivo chamado `.gitmessage` com o seguinte conteúdo:
   ```text
   # [Escreva o título do commit aqui]
   
   # [Escreva a descrição se necessário]
   
   Co-authored-by: Nome Perfil 1 <email-pessoal@example.com>
   Co-authored-by: Nome Perfil 2 <email-corporativo@websolutionseti.com>
   ```

2. Informe ao Git local que ele deve usar esse arquivo como template padrão:
   ```bash
   git config commit.template .gitmessage
   ```

### O Resultado:
A partir dessa configuração, toda vez que você fizer um commit, as linhas `Co-authored-by` serão incluídas no rodapé da mensagem. O GitHub lê isso automaticamente e vincula os dois perfis àquele commit, fazendo com que **ambos os perfis ganhem a recompensa de colaboração e engajamento**.

---

**Arquitetura WUXIA-OPS:** Mantendo a propriedade intelectual segura na organização, sem perder o crédito pelo esforço individual.

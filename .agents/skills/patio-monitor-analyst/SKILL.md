---
name: patio-monitor-analyst
description: Analisa ocorrências de pátio e corredor registradas pelos monitores. Executa validações taxonômicas de uniformes, adornos e fones de ouvido. Use esta habilidade para gerar o resumo diário de infrações disciplinares e validar dados contra a tabela ALUNOS.
---
Habilidade de Análise e Triagem de Pátio (MVC - Model / Controller)
Você é o @developer e @tester-qa especializado em regras de negócio escolar. Sempre que o usuário solicitar uma verificação ou resumo das ocorrências do dia:

Validação de Turno e Horário:
Filtre os dados transacionais cruzando o timestamp atual do sistema com o período escolar vigente (entrada, intervalo, saída) para reduzir o escopo de varredura.

Taxonomia Rígida de Infrações:
Garanta que os registros estejam estritamente classificados nas categorias e subcategorias abaixo para evitar a poluição do banco de dados satélite:

UNIFORME: Falta de Calça, Sem Blusa Oficial, Camiseta Descaracterizada.

ADORNO: Brincos Inadequados, Piercing Visível (orelha, nariz), Unhas em Gel Coloridas.

ELETRÔNICO: Uso de Celular em Aula, Fones de Ouvido em Corredor, Periférico Não Autorizado.

Garantia de Qualidade e Prova Visual (walkthrough.md):
Antes de sugerir qualquer commit de alteração de banco ou envio de lote ao repositório central, você deve gerar obrigatoriamente um arquivo docs/artifacts/VERIFICATION.md contendo as provas de testes de persistência locais e heurísticas de acessibilidade (daltonismo e alto contraste).

Regras de Interface (Touch Targets):
Todos os botões e componentes de interface mobile gerados devem possuir tamanho mínimo de 48px x 48px na View para operação segura em movimento pelo pátio.

/**
 * classroomSeats.js — Seed de Mapa de Carteiras
 */

const rawTurmas = [
  {
    "turma_id": "6MA",
    "serie": "6º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "09",
    "conselheiro": "Tatiane",
    "representantes": ["Luana", "Miguel Henrique"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 8,
      "total_assentos": 40,
      "alunos_alocados": 35
    },
    "mapa": [
      ["[Vazio]", "Miguel Henrique", "Yuri", "[Vazio]", "[Vazio]"],
      ["Luana", "Beatriz", "Maria Clara", "[Vazio]", "Sophia"],
      ["Samir", "Yasmin", "Heloísa", "Luana", "Gustavo"],
      ["Maria Luísa", "Miguel Silva", "Rebeca", "Laura", "Lara"],
      ["João Gabriel", "Isabelle", "Davi Pedroso", "Pedro", "Helisa"],
      ["Giovana", "Miguel de Jesus", "Samara", "Davi Augusto", "Antonieta"],
      ["Artur", "Manuella", "Clara", "Bianca", "Maria Eduarda"],
      ["Laís", "Calebe", "Eduardo", "Iago", "Carolina"]
    ]
  },
  {
    "turma_id": "6MB",
    "serie": "6º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "10",
    "conselheiro": "Tatiane",
    "representantes": ["Gabrielly", "Lucas Marcondes"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 8,
      "total_assentos": 40,
      "alunos_alocados": 34
    },
    "mapa": [
      ["[Vazio]", "Saymon", "[Vazio]", "[Vazio]", "[Vazio]"],
      ["[Vazio]", "Felipe", "Henrique Albach", "Gustavo Marques", "Gustavo Henrique"],
      ["Júlia", "Lucca", "Sara Freitas", "Davi Marques", "Lucas Aposan"],
      ["Davi Liberal", "Isabele", "Gabrielly", "Alice", "Rebeca"],
      ["Lucas Marcondes", "Sara O.", "Pietra", "Emanuelly", "Isabella"],
      ["Yasmin", "Henrique Y.", "Hadassa", "Manuella", "Maya"],
      ["Ana Vida", "Tito", "Matheus", "Camila", "Eduarda"],
      ["Manuela M.", "Nicole", "João Henrique", "Arthur", "João Felipe"]
    ]
  },
  {
    "turma_id": "6TA",
    "serie": "6º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "TARDE",
    "sala_fisica": "09",
    "conselheiro": "Karen",
    "representantes": ["Ana Beatriz", "Raul"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 8,
      "total_assentos": 40,
      "alunos_alocados": 37
    },
    "mapa": [
      ["Raul", "Enrico", "Renan", "Miguel Oliveira", "Ana Beatriz"],
      ["Victor", "Conrado", "Samira", "Tomás", "Kauan Lira"],
      ["Caio", "Mariah", "Otávio", "Vitória", "Sofia"],
      ["Samuel Maia", "Davy Luiz", "Isabela", "Samuel Alves", "Davi Vital"],
      ["Pedro Elias", "Isadora", "Amanda Queiroz", "Luiz Gustavo", "Amanda Luqui"],
      ["Miguel Scheffer", "Helena Santos", "Samara", "Cecília", "Helena Duque"],
      ["Oliver", "Amanda Borges", "Vicente", "Yuri", "Luiz Miguel"],
      ["Eike", "[Vazio]", "[Vazio]", "[Vazio]", "Larissa Borges"]
    ]
  },
  {
    "turma_id": "7MA",
    "serie": "7º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "11",
    "conselheiro": "Malu",
    "representantes": ["Bernardo Nohra", "Geovanna Gabrieli"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 8,
      "total_assentos": 40,
      "alunos_alocados": 37
    },
    "mapa": [
      ["Talita", "Yohan", "Geovanna Gabrieli", "Sarah", "Mariana"],
      ["Erick", "Bernardo", "Joaquim", "Emanuelly Rosa", "Daniel"],
      ["Isabela Ferrari", "Agatha Santos", "Maria Eduarda", "Davi", "Ana Júlia"],
      ["Pedro César", "Maria Clara", "Mikaela C.", "Guilherme Souza", "Cecília"],
      ["Giuliano", "Natan Higa", "Ana Luiza", "Agata Yasmin", "Eduardo"],
      ["Giovanna Santos", "Diego", "Rafaela", "Nathan Correa", "Pedro Henrique"],
      ["Guilherme Miguel", "Melissa", "Giulia", "Rachel", "Gabriel"],
      ["Emanuelle Bruna", "[Vazio]", "Lorenzo", "[Vazio]", "[Vazio]"]
    ]
  },
  {
    "turma_id": "7TA",
    "serie": "7º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "TARDE",
    "sala_fisica": "11",
    "conselheiro": "Emily Bianchi",
    "representantes": ["Maria Luiza Ferreira", "Arthur Gustavo"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 5,
      "total_assentos": 30,
      "alunos_alocados": 27
    },
    "mapa": [
      ["Murilo Borges", "Leo Nogarotto", "[Vazio]", "Otavio Sene", "Felipe Guarnieri", "Enzo Zonzini"],
      ["Alícia Gomes", "Gabriela Buzatto", "Davi Amaro", "Beatriz Lopes", "Pietra Ester", "[Vazio]"],
      ["Rafael Castro", "Alice Mayumi", "Melissa Ayumi", "Melissa dos Santos", "Aya Sophie", "Davi Rofi"],
      ["Arthur Gustavo", "Arthur Maciel", "Luana Sayuri", "Nicolas Prado", "Maria Luiza", "[Vazio]"],
      ["Davi Rodrigues", "Benjamyn", "Agnes Maya", "Lívia Ribeiro", "Ladyellen Marine", "Gabriel Alves"]
    ]
  },
  {
    "turma_id": "7TB",
    "serie": "7º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "TARDE",
    "sala_fisica": "12",
    "conselheiro": "Natalia",
    "representantes": ["Beatriz Tavares", "Murilo Rosa"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 5,
      "total_assentos": 30,
      "alunos_alocados": 29
    },
    "mapa": [
      ["Rebeca", "Henry", "[Vazio]", "Alice", "Leonardo", "Nicoly"],
      ["Rafaella Azevedo", "Laira", "Eduardo", "Daniel", "Ana Gabriela", "Felipe"],
      ["Beatriz", "Matheus Ramos", "Clara", "Samuel", "Arthur", "Pérola"],
      ["Davi Lucas", "Melissa", "Murilo", "Gabriela Amaral", "Yuri", "Julia"],
      ["Gabriela Araujo", "André", "Isadora", "Icaro", "Camila", "Heitor"]
    ]
  },
  {
    "turma_id": "8MA",
    "serie": "8º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "13",
    "conselheiro": "Emily Bianchi",
    "representantes": ["Arthur Bessa", "Emanuelly Lima"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 6,
      "total_assentos": 36,
      "alunos_alocados": 36
    },
    "mapa": [
      ["Davi Schio", "Arthur Teixeira", "Manuela Cursino", "Clara Gabrielly", "Julia Baliani", "Samuel Novais"],
      ["Valentina Martins", "Antônio Felipe", "Arthur Gandra", "Eric Rodrigues", "Enzo Comine", "Sofia Araújo"],
      ["Brunno Machado", "Laís Ruiz", "Ellen Vitória", "Davi Luca", "Lara Giglio", "Lucas Silva"],
      ["Luana Galera", "Emanuelly Gonzaga", "Gabriel Bordinhon", "Arthur Penha", "Kainan Mansur", "Livia Procópio"],
      ["Maria Fernanda", "Raquel Gomes", "Maria Victória", "Melissa Salles", "José Henrique", "Lucas Boneti"],
      ["Enzo Fogaça", "João Victor", "Carlos Roberto", "Davi Corrá", "Alice Fernandes", "Débora de Melo"]
    ]
  },
  {
    "turma_id": "8MB",
    "serie": "8º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "14",
    "conselheiro": "Oscar",
    "representantes": ["Samuel Henrique", "Isadora Cesar"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 7,
      "total_assentos": 37,
      "alunos_alocados": 32
    },
    "mapa": [
      ["-", "-", "-", "-", "-", "[Vazio]"],
      ["Samuel Pereira", "[Vazio]", "Lucas Menino", "[Vazio]", "Pietra Cencio", "Liz Mariah"],
      ["Heloisa Rosa", "Isabela Rodrigues", "Luiza Lima", "Isadora Cesar", "Cauã Zanini", "Valentina Gomes"],
      ["Davi Vitória", "Sophia Pereira", "Felipe Marques", "Alice Palma", "Tiffany Sadauskas", "Henrique Pinheiro"],
      ["Gabriel Oliveira", "Harumi Nishio", "Emanuelle Oliveira", "Isabella Machado", "Erick Alves", "Pedro Luciano"],
      ["Nicolas Matheus", "Théo Morais", "Alana Rodrigues", "Lucas Campos", "Samuel Henrique", "Ana Clara"],
      ["Felipe Sakowski", "Enzo Ruan", "Marianna Inocêncio", "Rafael Ferraz", "Giovanna Ribeiro", "Tomás Peccin"]
    ]
  },
  {
    "turma_id": "8MC",
    "serie": "8º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": "15",
    "conselheiro": "Lucimara",
    "representantes": ["Enzo Moriga", "Julia Berlingieri"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 6,
      "total_assentos": 36,
      "alunos_alocados": 30
    },
    "mapa": [
      ["[Vazio]", "Davi Dias", "[Vazio]", "Emily", "[Vazio]", "[Vazio]"],
      ["Enzo F.", "[Vazio]", "Maria Eduarda", "Mirela", "Ana Beatrice", "João Lucas"],
      ["Marina F.", "Julia B.", "Guilherme", "Murilo", "Yuri", "Luma"],
      ["Isaac Rodrigues", "Mariana C.", "Rafael V.", "Laisla", "Enzo M.", "Manuela Luz"],
      ["Miguel L.", "Isabela", "Lavínia Fragoso", "Fouad", "Juliane", "Vinicius"],
      ["[Vazio]", "Isac Calado", "Miguel Silva", "Murilo de Paula", "Nathalie", "Tiago"]
    ]
  },
  {
    "turma_id": "8TA",
    "serie": "8º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "TARDE",
    "sala_fisica": "13",
    "conselheiro": "Ziliana",
    "representantes": ["Davi Lucas dos Santos", "Laura Correia"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 6,
      "total_assentos": 36,
      "alunos_alocados": 29
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "Melissa Mousinho", "Davi Lucas dos Santos", "Pedro Henrique", "Carlos"],
      ["[Vazio]", "Samuel", "Maria Sophia", "Gabrielly", "Isabela Donati", "Lívia Silva"],
      ["[Vazio]", "Isadora", "João Paulo", "Sophia Cardoso", "Guilherme Gabriel", "Isabella Chaud"],
      ["[Vazio]", "Lavínia Helena", "Arthur Soriano", "Lucas Barrros", "Laura Correia", "Leonardo"],
      ["[Vazio]", "Melyssa dos Santos", "Isabelly da Silva", "Guilherme Canettiere", "Yasmin", "Lucas Morais"],
      ["[Vazio]", "Isaque Antunes", "Fernanda Helena", "Felipe Bernini", "Davi Lucas França", "Victor"]
    ]
  },
  {
    "turma_id": "9MA",
    "serie": "9º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Erika",
    "representantes": ["Samuel Chiqueto", "Melissa Pereira"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 7,
      "total_assentos": 42,
      "alunos_alocados": 37
    },
    "mapa": [
      ["Théo", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "Anthony"],
      ["Lara", "Sophia Walder", "Jarbas", "Nataly", "Felipe", "Sophia Kefler"],
      ["Laura Lopes", "Daniel", "Larissa Melo", "Marcos", "Beatriz Barros", "Giovani"],
      ["Matheus Martinez", "Laura Cardoso", "Samir", "Ana Alice", "Melissa Leite", "Ana Beatriz"],
      ["Diego", "Italo", "Maria Eduarda", "Luis Fernando", "Larissa Marcel", "Anna Sophia"],
      ["Estevão", "Samuel", "Luis Renato", "Geovanna", "Isabelly", "Matheus Fernandes"],
      ["Arthur", "Luis Gustavo", "Miguel", "Beatriz Machado", "Isabela Leite", "Milena"]
    ]
  },
  {
    "turma_id": "9MB",
    "serie": "9º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Mathews",
    "representantes": ["Valentina Martins", "Pedro Miguel Olimpio"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 7,
      "total_assentos": 42,
      "alunos_alocados": 30
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]"],
      ["[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "Victor", "Lara"],
      ["Lorena", "Julia Azevedo", "Felipe", "Helena Feijó", "Helena Rodrigues", "Ludmila"],
      ["Rafaela", "Luiza", "Leticia", "Yasmin", "Gean", "Sophia Dias"],
      ["Davi de Barros", "Thais", "Valentina", "Danilo", "Marcela", "Ana Clara"],
      ["Pedro Miguel", "Sara Chung", "Mateus Duarte", "Alice", "Ana Luiza", "Laura"],
      ["Sophia Guimarães", "Maria Eduarda Olimpio", "Isabela Garcia", "Maria Eduarda Dias", "Bryan", "Eduardo"]
    ]
  },
  {
    "turma_id": "9MC",
    "serie": "9º Ano",
    "etapa": "FUNDAMENTAL_2",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Raquel",
    "representantes": ["Talita Barcelar", "Gabriel Rocha"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 7,
      "total_assentos": 42,
      "alunos_alocados": 36
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]"],
      ["Giovanna Vieira", "Miguel Monteiro", "Artur Scheffer", "Davi Ribeiro", "Stella Luz", "Gabriel Henrique"],
      ["Gustavo Lacerda", "Davi Marques", "Rafaela Herreiro", "Lidiany Lima", "Daniel Dias", "Luara"],
      ["Daniel Monteiro", "Isabella Pinheiro", "Lucas Miranda", "Enzo Henrique", "Sarah Seco", "Caio Rocha"],
      ["Luiza Guimarães", "Pedro Lucas", "Beatriz Yanni", "Maria Julia Leite", "Kevin", "Kethelym Camila"],
      ["Gabriel Rocha", "Leticia Correa", "Luiz Fernando", "Pedro Araújo", "Maria Orbach", "Talita Barcelar"],
      ["Isabella Maria", "Gabriel Benjamin", "Bianca", "Maria Julia Oliv.", "Melina", "Eduardo Henrique"]
    ]
  },
  {
    "turma_id": "1EM_A",
    "serie": "1º EM A",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.ª Viviane",
    "representantes": ["Alice Boneti"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 7,
      "total_assentos": 42,
      "alunos_alocados": 37
    },
    "mapa": [
      ["Luigi", "Murilo", "[Vazio]", "[Vazio]", "[Vazio]", "Leonardo Fogaça"],
      ["Manuela Paiva", "Vitoria", "Guilherme Barboni", "Lucas", "Ana Beatriz", "Laura Beatriz"],
      ["Leonardo Deiró", "Vinicius Barboni", "Eduarda", "Rebeca", "Gabriel Rodrigues", "Annyta"],
      ["Emilly", "Alice", "Sarah", "Gabriel Oliveira", "Giovana", "Enzo"],
      ["João Francisco", "Victor Hugo", "Marianna", "Miguel Petrolini", "Yasmin", "Valentina"],
      ["Manuella Teixeira", "Miguel Beleza", "Ester", "Livia", "Arthur", "Nicolle"],
      ["Bernardo", "Bruno", "Isaac", "Frederico", "Clara", "Emanuelle"]
    ]
  },
  {
    "turma_id": "1EM_B",
    "serie": "1º EM B",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.ª Érika",
    "representantes": ["Pedro Penna", "Ana Lívia"],
    "orientacao": {
      "porta": "LEFT",
      "mesa_professor": "BOTTOM_RIGHT"
    },
    "grid": {
      "colunas": 7,
      "linhas": 6,
      "total_assentos": 42,
      "alunos_alocados": 37
    },
    "mapa": [
      ["Nycolas", "Matheus Ribeiro", "[Vazio]", "[Vazio]", "Lorenzo", "[Vazio]", "Davi Novais"],
      ["Miguel Pagliarin", "Miguel Pereira", "Vitória", "Eduardo", "Benjamin", "Daniel", "Luan"],
      ["Luana", "Davi Barcelar", "Gabriel", "Pedro Penna", "Lara", "Diego", "Lorena"],
      ["Danilo Salles", "Lucas", "Eike", "Enzo", "João Victor", "Manuela", "Cauã"],
      ["Ana Livia", "Rafael", "Pedro Augusto", "Matheus Ramos", "Samuel", "Felipe", "Pedro Giraldi"],
      ["Kauê", "Isabela", "Ana Beatriz", "Rebeca", "Miguel Davi", "Nichole", "Pedro Henrique"]
    ]
  },
  {
    "turma_id": "1EM_C",
    "serie": "1º EM C",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.º Marcelo",
    "representantes": ["Reubentien", "Mariana Araújo"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 7,
      "linhas": 6,
      "total_assentos": 42,
      "alunos_alocados": 36
    },
    "mapa": [
      ["Vitor Rangel", "Daniel Vanço", "Louise", "Samuel", "[Vazio]", "[Vazio]", "Reubentien"],
      ["Nicholas", "Guilherme Lira", "Davi", "Brenda", "Ashley", "Daniel Morita", "Geovana"],
      ["Raphael", "Guilherme Carvalho", "Antonella", "Ana Lis", "Vitória", "Gabriel Venâncio", "Bruna"],
      ["Vicenzo", "Fábio", "Mariana", "Laura", "Leonardo", "Amanda", "Maria Luiza"],
      ["[Vazio]", "Vitor Policarpo", "Pedro", "Larissa", "Clara", "Samara", "Luis Otavio"],
      ["Kenji", "Felipe", "Maria Julia", "Ana Livia", "João", "Camila", "Luis Guilherme"]
    ]
  },
  {
    "turma_id": "2EM_A",
    "serie": "2º EM A",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.º Éder",
    "representantes": ["Pedro Henrique", "Maria Eduarda"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 7,
      "linhas": 6,
      "total_assentos": 42,
      "alunos_alocados": 31
    },
    "mapa": [
      ["[Vazio]", "Rafael M.", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "Pietro"],
      ["Muhamad", "[Vazio]", "Arthur", "Marco", "Pedro J.", "Vinicius", "Gustavo"],
      ["Maria E. Cotrim", "Nicole", "Rafael", "Millena E.", "Guilherme", "Luis", "[Vazio]"],
      ["Daniel", "Mateus", "Maria L.", "Murilo", "Maria C.", "Levy", "Luigi"],
      ["Geovani E.", "[Vazio]", "Maria E. N.", "Daniel", "Milena P.", "Caroline", "Rhyan"],
      ["Ricardo", "Giovanne Marques", "Pedro P.", "Yasmin", "[Vazio]", "Breno", "Samara"]
    ]
  },
  {
    "turma_id": "2EM_B",
    "serie": "2º EM B",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.ª Raquel",
    "representantes": ["João Gabriel", "Ágatha Gandra"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 7,
      "linhas": 6,
      "total_assentos": 42,
      "alunos_alocados": 32
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]", "[Vazio]"],
      ["Isabelly V.", "Helena", "Manuela Bressan", "Mariano", "Eloisa", "[Vazio]", "Bianca"],
      ["Igor", "Manuela Cruz", "Rafaela D.", "Beatriz Pisciotta", "Rafaela Gaspar", "Bruno", "Felipe"],
      ["Luiza", "Vitor Hugo", "Caio", "Guilherme", "Enzo Gabriel", "Mariame", "Laura"],
      ["João Gabriel", "Amanda", "Ágatha", "Sofia", "Melissa", "Gabriel", "Yudi"],
      ["Heitor", "João Vitor", "Beatriz L.", "Isabelle Braga", "João Peneluppi", "[Vazio]", "Giovanna"]
    ]
  },
  {
    "turma_id": "2EM_C",
    "serie": "2º EM C",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.ª Ziliana",
    "representantes": [],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 7,
      "total_assentos": 35,
      "alunos_alocados": 29
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "Jessica", "[Vazio]", "[Vazio]"],
      ["Gabriel Ferraz", "Levi", "Gustavo Ferraz", "Arthur", "Danielle"],
      ["Felipe", "Davi A.", "Lara Gabrielle", "Karina", "Pietro"],
      ["Camilly", "Yasmin", "João Marcos", "Andrey", "Gabriela Aprigio"],
      ["João Gabriel", "Heitor", "Tales", "Lavínia", "Pedro Portilho"],
      ["Joaquim", "Gabriel Freitas", "Maria Eduarda", "Victor", "Gabrielle Jarcem"],
      ["Lara Mourão", "Isabelle", "Davi do Carmo", "Valentina", "Raphael Vitta"]
    ]
  },
  {
    "turma_id": "2EM_ITIN_HUMANAS",
    "serie": "Itinerário Humanas 2º EM",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": null,
    "representantes": [],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 5,
      "linhas": 7,
      "total_assentos": 35,
      "alunos_alocados": 34
    },
    "mapa": [
      ["Nicole", "Rhyan", "Luisa", "Eloisa", "Muhamad"],
      ["Pietro", "[Vazio]", "Ricardo", "Guilherme", "Danielle"],
      ["Rafael", "Heitor", "Isabelly Vitória", "Karina", "Pedro Paixão"],
      ["Beatriz Longobardi", "Caio", "Amanda", "Andrey", "Rafaela"],
      ["Isabelle Braga", "João Vitor", "Murilo", "Lavínia S.", "Vinicius"],
      ["Yudi", "Mariame", "Maria Eduarda", "Milena", "Gabrielle Jarcem"],
      ["Lara Mourão", "Luis", "Yasmin", "Maria Clara", "Breno"]
    ]
  },
  {
    "turma_id": "3EM_A",
    "serie": "3º EM A",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Prof.º Santana",
    "representantes": ["Arthur Schio", "Nicolly Beatriz"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 7,
      "linhas": 6,
      "total_assentos": 42,
      "alunos_alocados": 37
    },
    "mapa": [
      ["[Vazio]", "Arthur", "Gabriel", "Mateus", "Maria Eduarda F.", "Murilo Barbosa", "[Vazio]"],
      ["Luis", "Natalia", "Giovana", "Iago", "Emilly Palermo", "Nicolly", "Rafael"],
      ["Lucas Penna", "Pedro", "Felipe", "Thiago", "Ana Pires", "Lucas Augusto", "Vinicius da Matta"],
      ["Ana Sofia", "Maria Eduarda P.", "Daniel P.", "Andrey", "Murilo Emidio", "Beatriz", "[Vazio]"],
      ["Julia Tuchtler", "[Vazio]", "Vini Gaspar", "Ana Beatriz Bauer", "Julia Mendes", "Alice", "[Vazio]"],
      ["Vinicius Costa", "Marcus", "Yan", "Livia", "Júlia Katayama", "Davi", "Sarah"]
    ]
  },
  {
    "turma_id": "3EM_B",
    "serie": "3º EM B",
    "etapa": "ENSINO_MEDIO",
    "turno": "MANHA",
    "sala_fisica": null,
    "conselheiro": "Jeanderson",
    "representantes": ["Gustavo Volú", "Mariana Chiqueto"],
    "orientacao": {
      "porta": "RIGHT",
      "mesa_professor": "BOTTOM_LEFT"
    },
    "grid": {
      "colunas": 6,
      "linhas": 9,
      "total_assentos": 54,
      "alunos_alocados": 48
    },
    "mapa": [
      ["[Vazio]", "[Vazio]", "Gustavo Casagrande", "[Vazio]", "[Vazio]", "[Vazio]"],
      ["Julia", "Cristian Teles", "Camile", "Isabela Pereira", "Miguel de Assis", "Joshua"],
      ["Mariana", "Larissa", "Fernando", "Daniel Davi", "Lais", "Lidia"],
      ["Matheus Gomes", "Beatriz Razuk", "Isabelly Urtado", "Isabela Bertanha", "Kaique", "João Guilherme"],
      ["Paulo", "Thalyssa", "Miguel Doniani", "Luan", "Manuela Huber", "Emilly Rodrigues"],
      ["Anna Clara", "Nathan", "Rafaella", "Ana Clara", "Williane", "Beatriz Brito"],
      ["Yasmin", "Victor Pimentel", "Gustavo Volú", "Davi", "Giovana", "Cristyan"],
      ["Nicolas", "Maria Luísa", "Letícia", "Isabella Bom Sucesso", "Mateus Vinicius", "Pietra"],
      ["João Paulo", "Lyvia", "Rayssa", "Graziele", "Maria Eduarda", "João Pedro"]
    ]
  }
];

export const TURMAS_SEED = rawTurmas.map(turma => {
  const assentos = [];
  const linhas = turma.grid.linhas;
  const colunas = turma.grid.colunas;
  
  if (turma.mapa) {
    for (let l = 0; l < linhas; l++) {
      for (let c = 0; c < colunas; c++) {
        let nome = null;
        if (turma.mapa[l] && turma.mapa[l][c] && turma.mapa[l][c] !== "[Vazio]" && turma.mapa[l][c] !== "-") {
          nome = turma.mapa[l][c];
        }
        
        assentos.push({
          posicao: `C${c + 1}_L${l + 1}`,
          coluna: c + 1,
          linha: l + 1,
          aluno_nome: nome,
          status: nome ? 'OCUPADO' : 'VAZIO'
        });
      }
    }
  }

  return {
    turma_id: turma.turma_id,
    serie: turma.serie,
    turno: turma.turno,
    sala_numero: turma.sala_fisica || '-',
    conselheiro: turma.conselheiro || null,
    representantes: turma.representantes || [],
    grid: {
      colunas: turma.grid.colunas,
      linhas: turma.grid.linhas,
      porta: turma.orientacao?.porta || 'LEFT'
    },
    assentos: assentos
  };
});

export default TURMAS_SEED;

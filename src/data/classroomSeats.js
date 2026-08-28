/**
 * classroomSeats.js — Seed de Mapa de Carteiras
 * Fonte: Plantas físicas (fotos) das salas do CASJC 2025
 *
 * Orientação padrão: Frente = Lousa (L1 = fundo, Lmax = frente)
 * Coluna 1 = lado da porta (exceto 8MC: porta na Col6)
 */

/**
 * @typedef {Object} Assento
 * @property {string} posicao — ex: "C1_L1"
 * @property {number} coluna
 * @property {number} linha
 * @property {string|null} aluno_nome
 * @property {'OCUPADO'|'VAZIO'} status
 */

/**
 * @typedef {Object} Turma
 * @property {string} turma_id
 * @property {string} serie
 * @property {string} turno
 * @property {string} sala_numero
 * @property {string} conselheiro
 * @property {string[]} representantes
 * @property {{ colunas: number, linhas: number, porta: 'LEFT'|'RIGHT' }} grid
 * @property {Assento[]} assentos
 */

function seat(coluna, linha, aluno_nome) {
  return {
    posicao: `C${coluna}_L${linha}`,
    coluna,
    linha,
    aluno_nome: aluno_nome || null,
    status: aluno_nome ? 'OCUPADO' : 'VAZIO',
  };
}

/** Gera grid completo e sobrescreve com os nomes fornecidos.
 * @param {number} colunas
 * @param {number} linhas
 * @param {Array<[number,number,string]>} nomes — [coluna, linha, nome]
 */
function buildGrid(colunas, linhas, nomes) {
  const assentos = [];
  for (let l = 1; l <= linhas; l++) {
    for (let c = 1; c <= colunas; c++) {
      assentos.push(seat(c, l, null));
    }
  }
  nomes.forEach(([c, l, nome]) => {
    const idx = assentos.findIndex(a => a.coluna === c && a.linha === l);
    if (idx !== -1) {
      assentos[idx].aluno_nome = nome;
      assentos[idx].status = 'OCUPADO';
    }
  });
  return assentos;
}

// ─────────────────────────────────────────────
// 6º ANO
// ─────────────────────────────────────────────

const turma_6MA = {
  turma_id: '6MA',
  serie: '6º Ano',
  turma: 'A',
  turno: 'MANHA',
  sala_numero: '09',
  conselheiro: 'Tatiane',
  representantes: ['Luana', 'Miguel Henrique'],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: buildGrid(5, 8, [
    // L1 (Fundo)
    [2,1,'Miguel Henrique'], [3,1,'Yuri'],
    // L2
    [1,2,'Luana'], [2,2,'Beatriz'], [3,2,'Maria Clara'], [5,2,'Sophia'],
    // L3
    [1,3,'Samir'], [2,3,'Yasmin'], [3,3,'Heloísa'], [4,3,'Luana'], [5,3,'Gustavo'],
    // L4
    [1,4,'Maria Luísa'], [2,4,'Miguel Silva'], [3,4,'Rebeca'], [4,4,'Laura'], [5,4,'Lara'],
    // L5
    [1,5,'João Gabriel'], [2,5,'Isabelle'], [3,5,'Davi Pedroso'], [4,5,'Pedro'], [5,5,'Helisa'],
    // L6
    [1,6,'Giovana'], [2,6,'Miguel de Jesus'], [3,6,'Samara'], [4,6,'Davi Augusto'], [5,6,'Antonieta'],
    // L7
    [1,7,'Artur'], [2,7,'Manuella'], [3,7,'Clara'], [4,7,'Bianca'], [5,7,'Maria Eduarda'],
    // L8 (Frente)
    [1,8,'Laís'], [2,8,'Calebe'], [3,8,'Eduardo'], [4,8,'Iago'], [5,8,'Carolina'],
  ]),
};

const turma_6MB = {
  turma_id: '6MB',
  serie: '6º Ano',
  turma: 'B',
  turno: 'MANHA',
  sala_numero: '10',
  conselheiro: 'Tatiane',
  representantes: ['Gabrielly', 'Lucas Marcondes'],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: buildGrid(5, 8, [
    // L1 (Fundo)
    [2,1,'Saymon'],
    // L2
    [2,2,'Felipe'], [3,2,'Henrique Albach'], [4,2,'Gustavo Marques'], [5,2,'Gustavo Henrique'],
    // L3
    [1,3,'Júlia'], [2,3,'Lucca'], [3,3,'Sara Freitas'], [4,3,'Davi Marques'], [5,3,'Lucas Aposon'],
    // L4
    [1,4,'Davi Liberal'], [2,4,'Isabele'], [3,4,'Gabrielly'], [4,4,'Alice'], [5,4,'Rebeca'],
    // L5
    [1,5,'Lucas Marcondes'], [2,5,'Sara O.'], [3,5,'Pietra'], [4,5,'Emanelly'], [5,5,'Isabella'],
    // L6
    [1,6,'Yasmin'], [2,6,'Henrique Y.'], [3,6,'Hadassa'], [4,6,'Manuella'], [5,6,'Maya'],
    // L7
    [1,7,'Ana Vida'], [2,7,'Tito'], [3,7,'Matheus'], [4,7,'Camila'], [5,7,'Eduarda'],
    // L8 (Frente)
    [1,8,'Manuela M.'], [2,8,'Nicole'], [3,8,'João Henrique'], [4,8,'Arthur'], [5,8,'João Felipe'],
  ]),
};

const turma_6TA = {
  turma_id: '6TA',
  serie: '6º Ano',
  turma: 'A',
  turno: 'TARDE',
  sala_numero: '09',
  conselheiro: 'Karen',
  representantes: ['Ana Beatriz', 'Raul'],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: buildGrid(5, 8, [
    // L1 (Fundo)
    [1,1,'Raul'], [2,1,'Enrico'], [3,1,'Renan'], [4,1,'Miguel Oliveira'], [5,1,'Ana Beatriz'],
    // L2
    [1,2,'Victor'], [2,2,'Conrado'], [3,2,'Samira'], [4,2,'Tomás'], [5,2,'Kauan Lira'],
    // L3
    [1,3,'Caio'], [2,3,'Mariah'], [3,3,'Otávio'], [4,3,'Vitória'], [5,3,'Sofia'],
    // L4
    [1,4,'Samuel Maia'], [2,4,'Davy Luiz'], [3,4,'Isabela'], [4,4,'Samuel Alves'], [5,4,'Davi Vital'],
    // L5
    [1,5,'Pedro Elias'], [2,5,'Isadora'], [3,5,'Amanda Queiroz'], [4,5,'Luiz Gustavo'], [5,5,'Amanda Luqui'],
    // L6
    [1,6,'Miguel Scheffer'], [2,6,'Helena Santos'], [3,6,'Samara'], [4,6,'Cecília'], [5,6,'Helena Duque'],
    // L7
    [1,7,'Oliver'], [2,7,'Amanda Borges'], [3,7,'Vicente'], [4,7,'Yuri'], [5,7,'Luiz Miguel'],
    // L8 (Frente) — assento 2,3,4 vazios
    [1,8,'Eike'], [5,8,'Larissa Borges'],
  ]),
};

// 6TB — Aguardando foto
const turma_6TB = {
  turma_id: '6TB',
  serie: '6º Ano',
  turma: 'B',
  turno: 'TARDE',
  sala_numero: '10',
  conselheiro: null,
  representantes: [],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: [], // Mapeamento pendente
  pendente: true,
};

// ─────────────────────────────────────────────
// 7º ANO
// ─────────────────────────────────────────────

const turma_7MA = {
  turma_id: '7MA',
  serie: '7º Ano',
  turma: 'A',
  turno: 'MANHA',
  sala_numero: '11',
  conselheiro: 'Malu',
  representantes: ['Bernardo Nohra', 'Geovanna Gabrieli'],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: buildGrid(5, 8, [
    // L1 (Fundo)
    [1,1,'Talita'], [2,1,'Yohan'], [3,1,'Geovanna Gabrieli'], [4,1,'Sarah'], [5,1,'Mariana'],
    // L2
    [1,2,'Erick'], [2,2,'Bernardo'], [3,2,'Joaquim'], [4,2,'Emanuelly Rosa'], [5,2,'Daniel'],
    // L3
    [1,3,'Isabela Ferrari'], [2,3,'Agatha Santos'], [3,3,'Maria Eduarda'], [4,3,'Davi'], [5,3,'Ana Júlia'],
    // L4
    [1,4,'Pedro César'], [2,4,'Maria Clara'], [3,4,'Mikaela C.'], [4,4,'Guilherme Souza'], [5,4,'Cecília'],
    // L5
    [1,5,'Giuliano'], [2,5,'Natan Higa'], [3,5,'Ana Luiza'], [4,5,'Agata Yasmin'], [5,5,'Eduardo'],
    // L6
    [1,6,'Giovanna Santos'], [2,6,'Diego'], [3,6,'Rafaela'], [4,6,'Nathan Corrêa'], [5,6,'Pedro Henrique'],
    // L7
    [1,7,'Guilherme Miguel'], [2,7,'Melissa'], [3,7,'Giulia'], [4,7,'Rachel'], [5,7,'Gabriel'],
    // L8 (Frente)
    [1,8,'Emanuelle Bruna'], [3,8,'Lorenzo'],
  ]),
};

// 7MB — Aguardando foto
const turma_7MB = {
  turma_id: '7MB',
  serie: '7º Ano',
  turma: 'B',
  turno: 'MANHA',
  sala_numero: '12',
  conselheiro: null,
  representantes: [],
  grid: { colunas: 5, linhas: 8, porta: 'LEFT' },
  assentos: [],
  pendente: true,
};

const turma_7TA = {
  turma_id: '7TA',
  serie: '7º Ano',
  turma: 'A',
  turno: 'TARDE',
  sala_numero: '11',
  conselheiro: 'Emily Bianchi',
  representantes: ['Maria Luiza Ferreira', 'Arthur Gustavo'],
  grid: { colunas: 6, linhas: 5, porta: 'LEFT' },
  assentos: buildGrid(6, 5, [
    // L1 (Fundo)
    [1,1,'Murilo Borges'], [2,1,'Leo Nogarotto'], [4,1,'Otavio Sene'], [5,1,'Felipe Guarnieri'], [6,1,'Enzo Zonzini'],
    // L2
    [1,2,'Alícia Gomes'], [2,2,'Gabriela Buzatto'], [3,2,'Davi Amaro'], [4,2,'Beatriz Lopes'], [5,2,'Pietra Ester'],
    // L3
    [1,3,'Rafael Castro'], [2,3,'Alice Mayumi'], [3,3,'Melissa Ayumi'], [4,3,'Melissa dos Santos'], [5,3,'Aya Sophie'], [6,3,'Davi Rofi'],
    // L4
    [1,4,'Arthur Gustavo'], [2,4,'Arthur Maciel'], [3,4,'Luana Sayuri'], [4,4,'Nicolas Prado'], [5,4,'Maria Luiza'],
    // L5 (Frente)
    [1,5,'Davi Rodrigues'], [2,5,'Benjamyn'], [3,5,'Agnes Maya'], [4,5,'Lívia Ribeiro'], [5,5,'Ladyellen Marine'], [6,5,'Gabriel Alves'],
  ]),
};

const turma_7TB = {
  turma_id: '7TB',
  serie: '7º Ano',
  turma: 'B',
  turno: 'TARDE',
  sala_numero: '12',
  conselheiro: 'Natalia',
  representantes: ['Beatriz Tavares', 'Murilo Rosa'],
  grid: { colunas: 6, linhas: 5, porta: 'LEFT' },
  assentos: buildGrid(6, 5, [
    // L1 (Fundo)
    [1,1,'Rebeca'], [2,1,'Henry'], [4,1,'Alice'], [5,1,'Leonardo'], [6,1,'Nicoly'],
    // L2
    [1,2,'Rafaella Azevedo'], [2,2,'Laira'], [3,2,'Eduardo'], [4,2,'Daniel'], [5,2,'Ana Gabriela'], [6,2,'Felipe'],
    // L3
    [1,3,'Beatriz'], [2,3,'Matheus Ramos'], [3,3,'Clara'], [4,3,'Samuel'], [5,3,'Arthur'], [6,3,'Pérola'],
    // L4
    [1,4,'Davi Lucas'], [2,4,'Melissa'], [3,4,'Murilo'], [4,4,'Gabriela Amaral'], [5,4,'Yuri'], [6,4,'Julia'],
    // L5 (Frente)
    [1,5,'Gabriela Araujo'], [2,5,'André'], [3,5,'Isadora'], [4,5,'Icaro'], [5,5,'Camila'], [6,5,'Heitor'],
  ]),
};

// ─────────────────────────────────────────────
// 8º ANO
// ─────────────────────────────────────────────

const turma_8MA = {
  turma_id: '8MA',
  serie: '8º Ano',
  turma: 'A',
  turno: 'MANHA',
  sala_numero: '13',
  conselheiro: 'Emily Bianchi',
  representantes: ['Arthur Bessa', 'Emanuelly Lima'],
  grid: { colunas: 6, linhas: 6, porta: 'LEFT' },
  assentos: buildGrid(6, 6, [
    // L1 (Fundo)
    [1,1,'Davi Schio'], [2,1,'Arthur Teixeira'], [3,1,'Manuela Cursino'], [4,1,'Clara Gabrielly'], [5,1,'Julia Baliani'], [6,1,'Samuel Novais'],
    // L2
    [1,2,'Valentina Martins'], [2,2,'Antônio Felipe'], [3,2,'Arthur Gandra'], [4,2,'Eric Rodrigues'], [5,2,'Enzo Comine'], [6,2,'Sofia Araújo'],
    // L3
    [1,3,'Brunno Machado'], [2,3,'Laís Ruiz'], [3,3,'Ellen Vitória'], [4,3,'Davi Luca'], [5,3,'Lara Giglio'], [6,3,'Lucas Silva'],
    // L4
    [1,4,'Luana Galera'], [2,4,'Emanuelly Gonzaga'], [3,4,'Gabriel Bordinhon'], [4,4,'Arthur Penha'], [5,4,'Kainan Mansur'], [6,4,'Livia Procópio'],
    // L5
    [1,5,'Maria Fernanda'], [2,5,'Raquel Gomes'], [3,5,'Maria Victória'], [4,5,'Melissa Salles'], [5,5,'José Henrique'], [6,5,'Lucas Boneti'],
    // L6 (Frente)
    [1,6,'Enzo Fogaça'], [2,6,'João Victor'], [3,6,'Carlos Roberto'], [4,6,'Davi Corrá'], [5,6,'Alice Fernandes'], [6,6,'Débora de Melo'],
  ]),
};

const turma_8MB = {
  turma_id: '8MB',
  serie: '8º Ano',
  turma: 'B',
  turno: 'MANHA',
  sala_numero: '14',
  conselheiro: 'Oscar',
  representantes: ['Samuel Henrique', 'Isadora Cesar'],
  grid: { colunas: 6, linhas: 6, porta: 'LEFT' },
  assentos: buildGrid(6, 6, [
    // L1 (Fundo) — col2 e col4 vazios
    [1,1,'Samuel Pereira'], [3,1,'Lucas Menino'], [5,1,'Pietra Cencio'], [6,1,'Liz Mariah'],
    // L2
    [1,2,'Heloisa Rosa'], [2,2,'Isabela Rodrigues'], [3,2,'Luiza Lima'], [4,2,'Isadora Cesar'], [5,2,'Cauã Zanini'], [6,2,'Valentina Gomes'],
    // L3
    [1,3,'Davi Vitória'], [2,3,'Sophia Pereira'], [3,3,'Felipe Marques'], [4,3,'Alice Palma'], [5,3,'Tiffany Sadauskas'], [6,3,'Henrique Pinheiro'],
    // L4
    [1,4,'Gabriel Oliveira'], [2,4,'Harumi Nishio'], [3,4,'Emanuelle Oliveira'], [4,4,'Isabella Machado'], [5,4,'Erick Alves'], [6,4,'Pedro Luciano'],
    // L5
    [1,5,'Nicolas Matheus'], [2,5,'Théo Morais'], [3,5,'Alana Rodrigues'], [4,5,'Lucas Campos'], [5,5,'Samuel Henrique'], [6,5,'Ana Clara'],
    // L6 (Frente)
    [1,6,'Felipe Sakowski'], [2,6,'Enzo Ruan'], [3,6,'Marianna Inocêncio'], [4,6,'Rafael Ferraz'], [5,6,'Giovanna Ribeiro'], [6,6,'Tomás Peccin'],
  ]),
};

const turma_8MC = {
  turma_id: '8MC',
  serie: '8º Ano',
  turma: 'C',
  turno: 'MANHA',
  sala_numero: '15',
  conselheiro: 'Lucimara',
  representantes: ['Enzo Moriga', 'Julia Berlingieri'],
  grid: { colunas: 6, linhas: 6, porta: 'RIGHT' }, // Porta à direita (Col6)
  assentos: buildGrid(6, 6, [
    // L1 (Fundo) — maioria vazio
    [2,1,'Davi Dias'], [4,1,'Emily'],
    // L2
    [1,2,'Enzo F.'], [3,2,'Maria Eduarda'], [4,2,'Mirela'], [5,2,'Ana Beatrice'], [6,2,'João Lucas'],
    // L3
    [1,3,'Marina F.'], [2,3,'Julia B.'], [3,3,'Guilherme'], [4,3,'Murilo'], [5,3,'Yuri'], [6,3,'Luma'],
    // L4
    [1,4,'Isaac Rodrigues'], [2,4,'Mariana C.'], [3,4,'Rafael V.'], [4,4,'Laísla'], [5,4,'Enzo M.'], [6,4,'Manuela Luz'],
    // L5
    [1,5,'Miguel L.'], [2,5,'Isabela'], [3,5,'Lavínia Fragoso'], [4,5,'Fouad'], [5,5,'Juliane'], [6,5,'Vinicius'],
    // L6 (Frente)
    [2,6,'Isac Calado'], [3,6,'Miguel Silva'], [4,6,'Murilo de Paula'], [5,6,'Nathalie'], [6,6,'Tiago'],
  ]),
};

const turma_8TA = {
  turma_id: '8TA',
  serie: '8º Ano',
  turma: 'A',
  turno: 'TARDE',
  sala_numero: '13',
  conselheiro: 'Ziliana',
  representantes: ['Davi Lucas dos Santos', 'Laura Correia'],
  grid: { colunas: 6, linhas: 6, porta: 'LEFT' },
  assentos: buildGrid(6, 6, [
    // L1 (Fundo) — col1 e col2 vazios
    [3,1,'Melissa Mousinho'], [4,1,'Davi Lucas dos Santos'], [5,1,'Pedro Henrique'], [6,1,'Carlos'],
    // L2 — col1 vazio
    [2,2,'Samuel'], [3,2,'Maria Sophia'], [4,2,'Gabrielly'], [5,2,'Isabela Donati'], [6,2,'Lívia Silva'],
    // L3 — col1 vazio
    [2,3,'Isadora'], [3,3,'João Paulo'], [4,3,'Sophia Cardoso'], [5,3,'Guilherme Gabriel'], [6,3,'Isabella Chaud'],
    // L4 — col1 vazio
    [2,4,'Lavínia Helena'], [3,4,'Arthur Soriano'], [4,4,'Lucas Barros'], [5,4,'Laura Correia'], [6,4,'Leonardo'],
    // L5 — col1 vazio
    [2,5,'Melyssa dos Santos'], [3,5,'Isabelly da Silva'], [4,5,'Guilherme Canetiere'], [5,5,'Yasmin'], [6,5,'Lucas Morais'],
    // L6 (Frente) — col1 vazio
    [2,6,'Isaque Antunes'], [3,6,'Fernanda Helena'], [4,6,'Felipe Bernini'], [5,6,'Davi Lucas França'], [6,6,'Victor'],
  ]),
};

// 8TB — Aguardando foto
const turma_8TB = {
  turma_id: '8TB',
  serie: '8º Ano',
  turma: 'B',
  turno: 'TARDE',
  sala_numero: '14',
  conselheiro: null,
  representantes: [],
  grid: { colunas: 6, linhas: 6, porta: 'LEFT' },
  assentos: [],
  pendente: true,
};

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

/** @type {Turma[]} */
export const TURMAS_SEED = [
  turma_6MA,
  turma_6MB,
  turma_6TA,
  turma_6TB,
  turma_7MA,
  turma_7MB,
  turma_7TA,
  turma_7TB,
  turma_8MA,
  turma_8MB,
  turma_8MC,
  turma_8TA,
  turma_8TB,
];

export default TURMAS_SEED;

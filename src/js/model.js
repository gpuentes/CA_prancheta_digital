// Model Layer for Prancheta Digital MVC Application
export class AppModel {
  constructor() {
    this.storageKey = 'prancheta_digital_state';

    // Default system configurations
    this.defaultSettings = {
      appTitle: 'Prancheta Digital Escola',
      logoUrl: '', // Base64 image or empty for default SVG
      customTabs: {
        monitor: ['patio', 'chamados', 'perfil'],
        secretaria: ['chamados', 'patio', 'cms', 'a11y'],
        diretor: ['dashboard', 'patio', 'chamados', 'cms', 'settings', 'a11y'],
        admin: ['dashboard', 'patio', 'chamados', 'cms', 'settings', 'a11y']
      },
      patioCta: {
        label: 'FALTA DE UNIFORME',
        bgColor: '#107c41',
        textColor: '#ffffff',
        borderRadius: '2px' // Sharp corners per PRD
      }
    };

    // Default Occurrence Types
    this.defaultOccurrenceTypes = [
      { id: '1', label: 'Falta de calçado (Crokqs)', severity: 'warning' },
      { id: '2', label: 'Uso de Celular', severity: 'warning' },
      { id: '3', label: 'Conversa em Excesso', severity: 'info' },
      { id: '4', label: 'Corrida / Acidente', severity: 'error' },
      { id: '5', label: 'Adorno Inadequado', severity: 'info' },
      { id: '6', label: 'Atraso de Entrada', severity: 'info' },
      { id: '7', label: 'Falta de Uniforme (Calça)', severity: 'warning' },
      { id: '8', label: 'Falta de Uniforme (Blusa)', severity: 'warning' },
      { id: '9', label: 'Falta de Uniforme (Camiseta)', severity: 'warning' },
      { id: '10', label: 'Falta de Uniforme (Short)', severity: 'warning' },
      { id: '11', label: 'Falta de Uniforme (Chinelo)', severity: 'warning' },
    ];

    // Prepopulated Students — 55 alunos seed (EF + EM)
    this.defaultStudents = [
      // ─ 6º ano ─
      { id: 's1', firstName: 'Gabriel', lastName: 'Oliveira', classId: '06 MA', photoSeed: 'gabriel' },
      { id: 's2', firstName: 'Cristian', lastName: 'Anderson', classId: '06 MB', photoSeed: 'cristian' },
      { id: 's3', firstName: 'Eloísa', lastName: 'Monteiro', classId: '06 MA', photoSeed: 'eloisa' },
      { id: 's23', firstName: 'Fernanda', lastName: 'Borges', classId: '06 MB', photoSeed: 'fernanda' },
      { id: 's24', firstName: 'Henrique', lastName: 'Amaral', classId: '06 MA', photoSeed: 'henrique' },
      // ─ 7º ano ─
      { id: 's4', firstName: 'Rafael', lastName: 'Paval', classId: '07 MA', photoSeed: 'rafael' },
      { id: 's5', firstName: 'Luís', lastName: 'Ramos', classId: '07 MB', photoSeed: 'luis' },
      { id: 's6', firstName: 'Marcos', lastName: 'Vinícius', classId: '07 MA', photoSeed: 'marcos' },
      { id: 's7', firstName: 'Lorenzo', lastName: 'Santos', classId: '07 MC', photoSeed: 'lorenzo' },
      { id: 's9', firstName: 'Ana', lastName: 'Costa', classId: '07 MA', photoSeed: 'ana' }, // Recorrente
      { id: 's11', firstName: 'Maria', lastName: 'Clara', classId: '07 MB', photoSeed: 'maria' },
      { id: 's19', firstName: 'Emanuelle', lastName: 'Rosa', classId: '07 MC', photoSeed: 'emanuelle' },
      { id: 's25', firstName: 'Kaíque', lastName: 'Ferreira', classId: '07 MA', photoSeed: 'kaique' },
      { id: 's26', firstName: 'Letícia', lastName: 'Nakamura', classId: '07 MB', photoSeed: 'leticia' },
      // ─ 8º ano ─
      { id: 's8', firstName: 'Miguel', lastName: 'Assis', classId: '08 MA', photoSeed: 'miguel' },
      { id: 's10', firstName: 'Kethelyn', lastName: 'Camila', classId: '08 MB', photoSeed: 'kethelyn' },
      { id: 's17', firstName: 'Lucas', lastName: 'Penna', classId: '08 MA', photoSeed: 'lucas' },
      { id: 's22', firstName: 'Beatriz', lastName: 'Costa', classId: '08 MC', photoSeed: 'beatriz' },
      { id: 's27', firstName: 'Davi', lastName: 'Pereira', classId: '08 MB', photoSeed: 'davi' },
      { id: 's28', firstName: 'Isabela', lastName: 'Mendes', classId: '08 MC', photoSeed: 'isabela' },
      { id: 's29', firstName: 'Thiago', lastName: 'Cardoso', classId: '08 MA', photoSeed: 'thiago' },
      { id: 's30', firstName: 'Camila', lastName: 'Freitas', classId: '08 MB', photoSeed: 'camila' },
      // ─ 9º ano ─
      { id: 's12', firstName: 'Sophia', lastName: 'Carvalho', classId: '09 MA', photoSeed: 'sophia' },
      { id: 's21', firstName: 'Giovanna', lastName: 'Loredo', classId: '09 MB', photoSeed: 'giovanna' },
      { id: 's31', firstName: 'Pedro', lastName: 'Henrique', classId: '09 MA', photoSeed: 'pedro' },
      { id: 's32', firstName: 'Valentina', lastName: 'Souza', classId: '09 MB', photoSeed: 'valentina' },
      { id: 's33', firstName: 'Matheus', lastName: 'Lima', classId: '09 MA', photoSeed: 'matheus' },
      { id: 's34', firstName: 'Julia', lastName: 'Rodrigues', classId: '09 MC', photoSeed: 'julia' },
      { id: 's35', firstName: 'Arthur', lastName: 'Nunes', classId: '09 MC', photoSeed: 'arthur' },
      // ─ 1º EM ─
      { id: 's13', firstName: 'Joshua', lastName: 'Guimarães', classId: '01 EMA', photoSeed: 'joshua' },
      { id: 's16', firstName: 'Gabriel', lastName: 'Rodrigues', classId: '01 EMA', photoSeed: 'gabrielr' },
      { id: 's18', firstName: 'Nicole', lastName: 'Silva', classId: '01 EMA', photoSeed: 'nicole' },
      { id: 's36', firstName: 'Rebeca', lastName: 'Almeida', classId: '01 EMB', photoSeed: 'rebeca' },
      { id: 's37', firstName: 'Vitor', lastName: 'Gonçalves', classId: '01 EMB', photoSeed: 'vitor' },
      { id: 's38', firstName: 'Bruna', lastName: 'Tavares', classId: '01 EMC', photoSeed: 'bruna' },
      { id: 's39', firstName: 'Felipe', lastName: 'Barbosa', classId: '01 EMC', photoSeed: 'felipe' },
      // ─ 2º EM ─
      { id: 's14', firstName: 'Ricardo', lastName: 'Leão', classId: '02 EMA', photoSeed: 'ricardo' },
      { id: 's15', firstName: 'Rafael', lastName: 'Alves', classId: '02 EMA', photoSeed: 'rafaela' },
      { id: 's20', firstName: 'Enzo', lastName: 'Naka', classId: '02 EMB', photoSeed: 'enzo' },
      { id: 's40', firstName: 'Larissa', lastName: 'Pinto', classId: '02 EMB', photoSeed: 'larissa' },
      { id: 's41', firstName: 'Eduardo', lastName: 'Correia', classId: '02 EMA', photoSeed: 'eduardo' },
      { id: 's42', firstName: 'Amanda', lastName: 'Teixeira', classId: '02 EMC', photoSeed: 'amanda' },
      { id: 's43', firstName: 'Bruno', lastName: 'Campos', classId: '02 EMC', photoSeed: 'bruno' },
      // ─ 3º EM ─
      { id: 's44', firstName: 'Aline', lastName: 'Machado', classId: '03 EMA', photoSeed: 'aline' },
      { id: 's45', firstName: 'Carlos', lastName: 'Henrique', classId: '03 EMA', photoSeed: 'carlos' },
      { id: 's46', firstName: 'Débora', lastName: 'Fonseca', classId: '03 EMB', photoSeed: 'debora' },
      { id: 's47', firstName: 'Igor', lastName: 'Batista', classId: '03 EMB', photoSeed: 'igor' },
      { id: 's48', firstName: 'Juliana', lastName: 'Moraes', classId: '03 EMC', photoSeed: 'juliana' },
      { id: 's49', firstName: 'Leandro', lastName: 'Cruz', classId: '03 EMA', photoSeed: 'leandro' },
      { id: 's50', firstName: 'Mariana', lastName: 'Vieira', classId: '03 EMC', photoSeed: 'mariana' },
      { id: 's51', firstName: 'Nathan', lastName: 'Araujo', classId: '03 EMB', photoSeed: 'nathan' },
      { id: 's52', firstName: 'Patrícia', lastName: 'Lopes', classId: '03 EMA', photoSeed: 'patricia' },
      { id: 's53', firstName: 'Rodrigo', lastName: 'Nascimento', classId: '03 EMC', photoSeed: 'rodrigo' },
      { id: 's54', firstName: 'Sabrina', lastName: 'Barros', classId: '03 EMB', photoSeed: 'sabrina' },
      { id: 's55', firstName: 'Tiago', lastName: 'Rezende', classId: '03 EMA', photoSeed: 'tiago' },
    ];

    // Default users
    this.defaultUsers = [
      { id: 'u1', name: 'Guilherme Puentes',   role: 'admin',      login: 'guilherme', password: '123', loginWindows: 'eti.guilherme', active: true },
      { id: 'u2', name: 'Ana Paula',           role: 'monitor',    login: 'anapaula',  password: '123', loginWindows: 'esc.anapaula',  active: true },
      { id: 'u3', name: 'Renata Costa',        role: 'secretaria', login: 'renata',    password: '123', loginWindows: 'esc.renata',    active: true },
      { id: 'u4', name: 'Marcelo Dias',        role: 'diretor',    login: 'marcelo',   password: '123', loginWindows: 'esc.marcelo',   active: true },
      { id: 'u5', name: 'Terminal Sala',       role: 'sala',       login: 'sala',      password: '123', loginWindows: 'esc.sala',      active: true },
      { id: 'u6', name: 'Dani Marques Souza', role: 'monitor',    login: 'dani',      password: '123', loginWindows: 'esc.dani',      active: true },
    ];


    // Default Rooms (Salas 09 a 34 + others)
    this.defaultRooms = [
      { id: 'r_patio', name: 'Pátio Principal', type: 'Comum' },
      { id: 'r_cantina', name: 'Cantina', type: 'Comum' },
      { id: 'r_quadra', name: 'Quadra', type: 'Esportes' },
      { id: 'r_biblio', name: 'Biblioteca', type: 'Comum' },
      { id: 'r_banheiro_t1_f', name: 'Banheiro T1 F', type: 'Banheiro' },
      { id: 'r_banheiro_t1_m', name: 'Banheiro T1 M', type: 'Banheiro' },
      { id: 'r_banheiro_m2_f', name: 'Banheiro Mesanino 2 F', type: 'Banheiro' },
      { id: 'r_banheiro_m2_m', name: 'Banheiro Mesanino 2 M', type: 'Banheiro' },
      { id: 'r_escada_m', name: 'Escada Monitoria', type: 'Corredor' },
      { id: 'r_escada_c', name: 'Escada Conservação', type: 'Corredor' }
    ];
    // Populate Salas 09 to 34
    for (let i = 9; i <= 34; i++) {
      const numStr = i.toString().padStart(2, '0');
      this.defaultRooms.push({ id: `r_sala_${numStr}`, name: `Sala ${numStr}`, type: 'Sala de Aula' });
    }

    // Initialize state
    this.state = {
      users: [],
      students: [],
      rooms: [],
      occurrenceTypes: [],
      occurrences: [],
      tickets: [],
      settings: {},
      currentUser: null,
      dashboardWidgets: ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors']
    };

    this.loadState();
    this.listeners = [];
  }

  // Subscribe to changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
    this.saveState();
  }

  // LocalStorage Sync
  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.state = JSON.parse(data);
        // Guarantee settings compatibility
        this.state.settings = { ...this.defaultSettings, ...this.state.settings };
        if (!this.state.dashboardWidgets || !this.state.dashboardWidgets.includes('list-monitors')) {
          this.state.dashboardWidgets = ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'];
        }
      } else {
        this.initializeDefaultState();
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
      this.initializeDefaultState();
    }
  }

  initializeDefaultState() {
    this.state.users = [...this.defaultUsers];
    this.state.students = [...this.defaultStudents];
    this.state.rooms = [...this.defaultRooms];
    this.state.occurrenceTypes = [...this.defaultOccurrenceTypes];
    this.state.settings = { ...this.defaultSettings };
    this.state.occurrences = [];
    this.state.tickets = [];
    this.state.currentUser = null;
    this.state.dashboardWidgets = ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'];

    // ── Rich historical seed: 35 ocorrências + 5 chamados ativos ──────────────
    const today = new Date();
    const mockOccurrences = [
      // ─ Ana Costa (s9) — aluna recorrente uniforme ─
      { studentId: 's9', reasons: ['Falta de Uniforme (Blusa)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 0, hour: 6, minute: 50 },
      { studentId: 's9', reasons: ['Falta de Uniforme (Blusa)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 1, hour: 7, minute: 10 },
      { studentId: 's9', reasons: ['Falta de Uniforme (Blusa)', 'Uso de Celular'], monitor: 'Carlos Souza', location: 'Corredor', daysAgo: 3, hour: 6, minute: 50 },
      { studentId: 's9', reasons: ['Falta de Uniforme (Blusa)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 5, hour: 9, minute: 0 },
      { studentId: 's9', reasons: ['Adorno Inadequado'], monitor: 'Guilherme Puentes', location: 'Quadra', daysAgo: 8, hour: 13, minute: 15 },
      // ─ Gabriel Oliveira (s1) — uso de celular ─
      { studentId: 's1', reasons: ['Uso de Celular'], monitor: 'Guilherme Puentes', location: 'Cantina', daysAgo: 0, hour: 12, minute: 15 },
      { studentId: 's1', reasons: ['Uso de Celular'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 4, hour: 15, minute: 0 },
      { studentId: 's1', reasons: ['Adorno Inadequado'], monitor: 'Ana Paula', location: 'Corredor', daysAgo: 6, hour: 9, minute: 30 },
      { studentId: 's1', reasons: ['Falta de calçado (Chinelo)'], monitor: 'Carlos Souza', location: 'Pátio Principal', daysAgo: 10, hour: 7, minute: 5 },
      // ─ Sophia Carvalho (s12) ─
      { studentId: 's12', reasons: ['Uso de Celular'], monitor: 'Ana Paula', location: 'Cantina', daysAgo: 2, hour: 12, minute: 30 },
      { studentId: 's12', reasons: ['Conversa em Excesso'], monitor: 'Guilherme Puentes', location: 'Corredor', daysAgo: 7, hour: 10, minute: 45 },
      // ─ Cristian Anderson (s2) ─
      { studentId: 's2', reasons: ['Atraso de Entrada'], monitor: 'Marcelo Dias', location: 'Entrada Principal', daysAgo: 1, hour: 7, minute: 30 },
      { studentId: 's2', reasons: ['Falta de calçado (Chinelo)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 4, hour: 6, minute: 55 },
      // ─ Miguel Assis (s8) ─
      { studentId: 's8', reasons: ['Conversa em Excesso'], monitor: 'Carlos Souza', location: 'Corredor', daysAgo: 0, hour: 15, minute: 40 },
      { studentId: 's8', reasons: ['Corrida / Acidente'], monitor: 'Ana Paula', location: 'Quadra', daysAgo: 9, hour: 14, minute: 20 },
      // ─ Rafael Paval (s4) ─
      { studentId: 's4', reasons: ['Corrida / Acidente'], monitor: 'Ana Paula', location: 'Quadra', daysAgo: 4, hour: 15, minute: 10 },
      { studentId: 's4', reasons: ['Falta de Uniforme (Calça)'], monitor: 'Carlos Souza', location: 'Pátio Principal', daysAgo: 12, hour: 7, minute: 0 },
      // ─ Demais alunos — histórico variado ─
      { studentId: 's3', reasons: ['Conversa em Excesso'], monitor: 'Carlos Souza', location: 'Cantina', daysAgo: 1, hour: 9, minute: 15 },
      { studentId: 's5', reasons: ['Falta de calçado (Chinelo)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 2, hour: 6, minute: 48 },
      { studentId: 's6', reasons: ['Uso de Celular'], monitor: 'Guilherme Puentes', location: 'Biblioteca', daysAgo: 3, hour: 11, minute: 0 },
      { studentId: 's7', reasons: ['Atraso de Entrada'], monitor: 'Marcelo Dias', location: 'Entrada Principal', daysAgo: 1, hour: 7, minute: 40 },
      { studentId: 's10', reasons: ['Falta de Uniforme (Blusa)'], monitor: 'Ana Paula', location: 'Pátio Principal', daysAgo: 0, hour: 7, minute: 5 },
      { studentId: 's11', reasons: ['Falta de calçado (Chinelo)', 'Adorno Inadequado'], monitor: 'Carlos Souza', location: 'Pátio Principal', daysAgo: 2, hour: 7, minute: 12 },
      { studentId: 's13', reasons: ['Uso de Celular'], monitor: 'Guilherme Puentes', location: 'Corredor', daysAgo: 5, hour: 12, minute: 50 },
      { studentId: 's17', reasons: ['Corrida / Acidente'], monitor: 'Ana Paula', location: 'Quadra', daysAgo: 6, hour: 14, minute: 30 },
      { studentId: 's19', reasons: ['Conversa em Excesso'], monitor: 'Carlos Souza', location: 'Biblioteca', daysAgo: 3, hour: 10, minute: 20 },
      { studentId: 's22', reasons: ['Adorno Inadequado'], monitor: 'Ana Paula', location: 'Corredor', daysAgo: 1, hour: 8, minute: 55 },
      { studentId: 's25', reasons: ['Falta de Uniforme (Blusa)'], monitor: 'Guilherme Puentes', location: 'Pátio Principal', daysAgo: 0, hour: 7, minute: 2 },
      { studentId: 's31', reasons: ['Uso de Celular'], monitor: 'Ana Paula', location: 'Cantina', daysAgo: 2, hour: 12, minute: 10 },
      { studentId: 's33', reasons: ['Atraso de Entrada'], monitor: 'Marcelo Dias', location: 'Entrada Principal', daysAgo: 0, hour: 7, minute: 35 },
      { studentId: 's40', reasons: ['Falta de Uniforme (Calça)'], monitor: 'Carlos Souza', location: 'Pátio Principal', daysAgo: 1, hour: 6, minute: 58 },
      { studentId: 's45', reasons: ['Falta de calçado (Chinelo)'], monitor: 'Ana Paula', location: 'Quadra', daysAgo: 4, hour: 15, minute: 5 },
      { studentId: 's50', reasons: ['Conversa em Excesso'], monitor: 'Guilherme Puentes', location: 'Corredor', daysAgo: 7, hour: 11, minute: 0 },
      { studentId: 's55', reasons: ['Uso de Celular'], monitor: 'Ana Paula', location: 'Biblioteca', daysAgo: 3, hour: 9, minute: 45 },
    ];

    mockOccurrences.forEach((item, index) => {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - item.daysAgo);
      pastDate.setHours(item.hour, item.minute, 0, 0);
      this.state.occurrences.push({
        id: `occ-init-${index}`,
        studentId: item.studentId,
        reasons: item.reasons,
        details: 'Registro histórico gerado automaticamente pelo sistema de seed para validação.',
        location: item.location,
        date: pastDate.toISOString(),
        monitorName: item.monitor,
        severity: item.reasons.includes('Corrida / Acidente') ? 'error' :
          item.reasons.some(r => r.includes('Uniforme') || r.includes('Celular') || r.includes('calçado')) ? 'warning' : 'info',
        auditLog: [{ action: 'CREATED', timestamp: pastDate.toISOString(), user: item.monitor, details: 'Seed inicial' }]
      });
    });

    // ── 5 chamados ativos pré-carregados para testar SLA Visual ──────────────
    const seedTickets = [
      { id: 'tkt-seed-1', studentName: 'Lucas Penna', studentId: 's17', classId: '08 MA', reasons: ['Uso de Celular'], destination: 'Coordenação', rawText: 'Lucas da 8A com celular na cantina', status: 'Aberto', minutesAgo: 3 },
      { id: 'tkt-seed-2', studentName: 'Ana Costa', studentId: 's9', classId: '07 MA', reasons: ['Falta de Uniforme (Blusa)'], destination: 'Coordenação', rawText: 'Ana Costa 7MA sem blusa de novo', status: 'Aberto', minutesAgo: 11 },
      { id: 'tkt-seed-3', studentName: 'Thiago Cardoso', studentId: 's29', classId: '08 MA', reasons: ['Corrida / Acidente'], destination: 'Coordenação', rawText: 'Thiago caiu correndo no pátio, ver se machucou', status: 'Em Andamento', minutesAgo: 22, acceptedBy: 'Ana Paula' },
      { id: 'tkt-seed-4', studentName: 'Fernanda Borges', studentId: 's23', classId: '06 MB', reasons: ['Conversa em Excesso'], destination: 'Orientação', rawText: 'Fernanda Borges 6MB conversando muito', status: 'Aberto', minutesAgo: 45 },
      { id: 'tkt-seed-5', studentName: 'Eduardo Correia', studentId: 's41', classId: '02 EMA', reasons: ['Atraso de Entrada'], destination: 'Diretoria', rawText: 'Eduardo 2EMA atrasou 30min sem justificativa', status: 'Em Andamento', minutesAgo: 68, acceptedBy: 'Guilherme Puentes' },
    ];
    seedTickets.forEach(t => {
      const createdAt = new Date();
      createdAt.setMinutes(createdAt.getMinutes() - t.minutesAgo);
      this.state.tickets.push({
        id: t.id,
        studentName: t.studentName,
        studentId: t.studentId,
        classId: t.classId,
        reasons: t.reasons,
        destination: t.destination,
        rawText: t.rawText,
        status: t.status,
        createdAt: createdAt.toISOString(),
        acceptedBy: t.acceptedBy || null,
        completedAt: null
      });
    });

    this.saveState();
  }


  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  // Auth operations
  login(username, password) {
    const user = this.state.users.find(u => u.login === username && u.password === password && u.active);
    if (user) {
      this.state.currentUser = { ...user };
      this.notify();
      return { success: true, user };
    }
    return { success: false, message: 'Usuário ou senha inválidos' };
  }

  logout() {
    this.state.currentUser = null;
    this.notify();
  }

  // Students filtering and autocomplete (typeahead)
  searchStudents(query) {
    if (!query || query.length < 2) return [];

    const term = this.normalizeString(query);
    return this.state.students.filter(student => {
      const fullName = `${student.firstName} ${student.lastName}`;
      const nameMatch = this.normalizeString(fullName).includes(term);
      const classMatch = this.normalizeString(student.classId).includes(term);
      return nameMatch || classMatch;
    });
  }

  normalizeString(str) {
    return str ? str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  }

  // Recurrence check: check if student has occurrences in the last 30 days
  checkRecurrence(studentId, motive) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find matching occurrences
    const occurrences = this.state.occurrences.filter(occ => {
      const occDate = new Date(occ.date);
      return occ.studentId === studentId &&
        occDate >= thirtyDaysAgo &&
        (!motive || occ.reasons.includes(motive));
    });

    return {
      isRecurrent: occurrences.length > 0,
      count: occurrences.length,
      history: occurrences
    };
  }

  // Manage Occurrences
  addOccurrence(studentId, reasons, details, location, date = new Date().toISOString()) {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return null;

    // Calculate dynamic severity based on reasons
    let maxSeverity = 'info';
    reasons.forEach(r => {
      const typeObj = this.state.occurrenceTypes.find(t => t.label === r);
      if (typeObj) {
        if (typeObj.severity === 'error') maxSeverity = 'error';
        else if (typeObj.severity === 'warning' && maxSeverity !== 'error') maxSeverity = 'warning';
      }
    });

    const creator = this.state.currentUser ? `${this.state.currentUser.name} (${this.state.currentUser.role})` : 'Sistema';

    const occurrence = {
      id: 'occ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      studentId,
      reasons,
      details,
      location,
      date,
      monitorName: this.state.currentUser ? this.state.currentUser.name : 'Sistema',
      severity: maxSeverity,
      auditLog: [
        {
          action: 'CREATED',
          timestamp: new Date().toISOString(),
          user: creator,
          details: `Registro inicial de ocorrência criado com gravidade ${maxSeverity.toUpperCase()}`
        }
      ]
    };

    this.state.occurrences.push(occurrence);
    this.notify();
    return occurrence;
  }

  // Smart Paste Regex/NLP Engine
  parseSmartPaste(text) {
    if (!text) return null;
    const cleanText = this.normalizeString(text);

    // List of active monitor/user names and first names to ignore when searching for students
    const systemUserFirstNames = this.state.users.map(u => this.normalizeString(u.name.split(' ')[0]));

    let detectedStudent = null;
    let detectedClass = null;
    let detectedReasons = [];
    let detectedDestination = 'Coordenação'; // Default destination

    // Helper to check if string contains word with boundary
    const containsWord = (source, target) => {
      const escapedTarget = target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp('\\b' + escapedTarget + '\\b', 'i');
      return regex.test(source);
    };

    // 1. Identify student & class matching (Full Name first)
    for (const student of this.state.students) {
      const firstNameNorm = this.normalizeString(student.firstName);
      const lastNameNorm = this.normalizeString(student.lastName);
      const fullNameNorm = `${firstNameNorm} ${lastNameNorm}`;

      if (containsWord(cleanText, fullNameNorm) || (containsWord(cleanText, firstNameNorm) && containsWord(cleanText, lastNameNorm))) {
        detectedStudent = student;
        detectedClass = student.classId;
        break;
      }
    }

    // Fallback to matching first name, but ignore monitor names to prevent false-positives
    if (!detectedStudent) {
      for (const student of this.state.students) {
        const firstNameNorm = this.normalizeString(student.firstName);
        if (systemUserFirstNames.includes(firstNameNorm)) {
          continue; // skip monitor/user name collisions
        }
        if (containsWord(cleanText, firstNameNorm)) {
          detectedStudent = student;
          detectedClass = student.classId;
          break;
        }
      }
    }

    // 2. Class mapping override if class text found separately (e.g. 7A, 8MB, 3EMB)
    for (const student of this.state.students) {
      const classNorm = student.classId.toLowerCase().replace(/\s+/g, '');
      const textNormNoSpace = text.toLowerCase().replace(/\s+/g, '');
      if (textNormNoSpace.includes(classNorm)) {
        detectedClass = student.classId;
        break;
      }
    }

    // Fallback: If no exact class match, use regex to check for series tags
    if (!detectedClass) {
      const classMatch = text.match(/\b([0-9]{1,2})\s*º?\s*(Série|Ano|EM|EMA|EMB|EMC|MA|MB|MC|MD|A|B|C|D)\b/i);
      if (classMatch) {
        const num = parseInt(classMatch[1]);
        const letter = classMatch[2].toUpperCase();

        let searchClass = `${num.toString().padStart(2, '0')} ${letter}`;
        if (letter === 'A' || letter === 'B' || letter === 'C' || letter === 'D') {
          searchClass = `${num.toString().padStart(2, '0')} M${letter}`;
        }

        const foundClass = this.state.students.some(s => s.classId.replace(/\s+/g, '') === searchClass.replace(/\s+/g, ''));
        if (foundClass) {
          detectedClass = this.state.students.find(s => s.classId.replace(/\s+/g, '') === searchClass.replace(/\s+/g, '')).classId;
        }
      }
    }

    // 3. Destination mapping
    if (cleanText.includes('coordenacao') || cleanText.includes('coordena')) {
      detectedDestination = 'Coordenação';
    } else if (cleanText.includes('orientacao') || cleanText.includes('orienta')) {
      detectedDestination = 'Orientação';
    } else if (cleanText.includes('embora') || cleanText.includes('saida') || cleanText.includes('casa')) {
      detectedDestination = 'Ir embora';
    } else if (cleanText.includes('diretoria') || cleanText.includes('diretor')) {
      detectedDestination = 'Diretoria';
    }

    // 4. Motive keywords mapping
    const keywordMappings = [
      { key: 'uniforme', label: 'Falta de Uniforme (Blusa)' },
      { key: 'blusa', label: 'Falta de Uniforme (Blusa)' },
      { key: 'celular', label: 'Uso de Celular' },
      { key: 'telefone', label: 'Uso de Celular' },
      { key: 'conversa', label: 'Conversa em Excesso' },
      { key: 'conversar', label: 'Conversa em Excesso' },
      { key: 'falando', label: 'Conversa em Excesso' },
      { key: 'correndo', label: 'Corrida / Acidente' },
      { key: 'machucou', label: 'Corrida / Acidente' },
      { key: 'empurrou', label: 'Corrida / Acidente' },
      { key: 'briga', label: 'Corrida / Acidente' },
      { key: 'adorno', label: 'Adorno Inadequado' },
      { key: 'bone', label: 'Adorno Inadequado' },
      { key: 'brinco', label: 'Adorno Inadequado' },
      { key: 'atraso', label: 'Atraso de Entrada' },
      { key: 'atrasado', label: 'Atraso de Entrada' },
      { key: 'tarde', label: 'Atraso de Entrada' }
    ];

    keywordMappings.forEach(mapping => {
      if (cleanText.includes(mapping.key) && !detectedReasons.includes(mapping.label)) {
        detectedReasons.push(mapping.label);
      }
    });

    if (detectedReasons.length === 0) {
      detectedReasons.push('Outro / Observação');
    }

    return {
      student: detectedStudent,
      className: detectedClass || (detectedStudent ? detectedStudent.classId : ''),
      reasons: detectedReasons,
      destination: detectedDestination,
      rawText: text
    };
  }

  // Ticket (Chamado) Operations
  createTicket(rawText) {
    const parsed = this.parseSmartPaste(rawText);
    const ticket = {
      id: 'tkt-' + Date.now(),
      studentName: parsed.student ? `${parsed.student.firstName} ${parsed.student.lastName}` : 'Desconhecido',
      studentId: parsed.student ? parsed.student.id : null,
      classId: parsed.className || 'Não identificada',
      reasons: parsed.reasons,
      destination: parsed.destination,
      rawText: parsed.rawText,
      status: 'Aberto', // Aberto, Em Andamento, Concluído
      createdAt: new Date().toISOString(),
      acceptedBy: null,
      completedAt: null
    };

    this.state.tickets.push(ticket);
    this.notify();
    return ticket;
  }

  acceptTicket(ticketId) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status === 'Aberto') {
      ticket.status = 'Em Andamento';
      ticket.acceptedBy = this.state.currentUser ? this.state.currentUser.name : 'Monitor';
      this.notify();
    }
  }

  completeTicket(ticketId, finalReasons, details) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status === 'Em Andamento') {
      ticket.status = 'Concluído';
      ticket.completedAt = new Date().toISOString();

      // Create an occurrence if student is identified
      if (ticket.studentId) {
        const occ = this.addOccurrence(
          ticket.studentId,
          finalReasons || ticket.reasons,
          details || `Chamado finalizado: ${ticket.rawText}`,
          ticket.destination
        );
        if (occ) {
          occ.auditLog.push({
            action: 'TICKET_LINKED',
            timestamp: new Date().toISOString(),
            user: this.state.currentUser ? `${this.state.currentUser.name} (${this.state.currentUser.role})` : 'Sistema',
            details: `Ocorrência associada ao chamado original: ${ticketId}`
          });
        }
      }
      this.notify();
    }
  }

  // Dashboard configuration: widgets reordering
  updateWidgetPositions(orderedWidgetIds) {
    this.state.dashboardWidgets = orderedWidgetIds;
    this.notify();
  }

  // Settings & White Label config
  updateSettings(settings) {
    this.state.settings = { ...this.state.settings, ...settings };
    this.notify();
  }

  // CRUD Operations for CMS
  addCMSItem(type, data) {
    const list = this.state[type];
    if (!list) return;

    let prefix = 't';
    if (type === 'students') prefix = 's';
    else if (type === 'users') prefix = 'u';
    else if (type === 'rooms') prefix = 'r';

    data.id = prefix + Date.now();
    list.push(data);
    this.notify();
  }

  updateCMSItem(type, id, data) {
    const list = this.state[type];
    if (!list) return;

    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data, id };
      this.notify();
    }
  }

  deleteCMSItem(type, id) {
    const list = this.state[type];
    if (!list) return;

    this.state[type] = list.filter(item => item.id !== id);
    this.notify();
  }

  // Data import: CSV loading
  importStudentsCSV(csvText) {
    try {
      const lines = csvText.split('\n');
      const newStudents = [];

      lines.forEach((line, index) => {
        if (index === 0 || !line.trim()) return; // skip header or empty lines

        // Split by comma or semicolon
        const columns = line.split(/[;,]/);
        if (columns.length >= 3) {
          const firstName = columns[0].trim();
          const lastName = columns[1].trim();
          const classId = columns[2].trim();
          const id = 's-imported-' + index + '-' + Date.now();

          if (firstName && classId) {
            newStudents.push({
              id,
              firstName,
              lastName,
              classId,
              photoSeed: firstName.toLowerCase()
            });
          }
        }
      });

      if (newStudents.length > 0) {
        this.state.students = [...this.state.students, ...newStudents];
        this.notify();
        return { success: true, count: newStudents.length };
      }
      return { success: false, message: 'Nenhum registro válido encontrado no CSV' };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  // Data export: CSV generation
  exportOccurrencesCSV() {
    const header = ['ID Ocorrencia', 'Nome Aluno', 'Turma', 'Monitor Responsavel', 'Motivos', 'Localizacao', 'Data/Hora', 'Detalhes'];
    const rows = this.state.occurrences.map(occ => {
      const student = this.state.students.find(s => s.id === occ.studentId);
      const studentName = student ? `${student.firstName} ${student.lastName}` : 'Aluno Removido';
      const studentClass = student ? student.classId : 'N/A';
      return [
        occ.id,
        studentName,
        studentClass,
        occ.monitorName || 'N/A',
        occ.reasons.join(' | '),
        occ.location,
        new Date(occ.date).toLocaleString('pt-BR'),
        (occ.details || '').replace(/[\r\n]/g, ' ')
      ];
    });

    const csvContent = [header, ...rows]
      .map(e => e.map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(';'))
      .join('\n');

    return csvContent;
  }
}
export default AppModel;

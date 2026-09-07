// Model Layer for Prancheta Digital MVC Application
import { TURMAS_SEED } from '../data/classroomSeats.js';
import { webhookService } from '../services/webhookService.js';
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

    // Default Schedule Intervals (for dynamic taxonomy)
    this.defaultScheduleIntervals = [
      {
        id: 'ENTRADA_MANHA',
        tipo: 'Entrada Manhã',
        hora_inicio: '06:30',
        hora_fim: '07:15',
        local_padrao: '( ENTRADA )',
        motivos_sugeridos: ['Falta de Uniforme (Blusa)', 'Falta de calçado (Chinelo)', 'Adorno Inadequado']
      },
      {
        id: 'INT_MANHA_1',
        tipo: 'Intervalo Fundamental 2',
        hora_inicio: '09:30',
        hora_fim: '09:50',
        local_padrao: 'Cantina / Pátio Central',
        motivos_sugeridos: ['Falta de Uniforme (Blusa)', 'Uso de Celular', 'Adorno Inadequado']
      },
      {
        id: 'INT_MANHA_2',
        tipo: 'Intervalo Ensino Médio',
        hora_inicio: '10:00',
        hora_fim: '10:20',
        local_padrao: 'Pátio Principal',
        motivos_sugeridos: ['Uso de Celular', 'Falta de Uniforme (Blusa)', 'Conversa em Excesso']
      },
      {
        id: 'ALMOCO_FUND',
        tipo: 'Almoço / Saída Fundamental',
        hora_inicio: '12:00',
        hora_fim: '12:30',
        local_padrao: 'Refeitório / Portão Principal',
        motivos_sugeridos: ['Atraso de Retorno', 'Saída não autorizada']
      },
      {
        id: 'ALMOCO_MEDIO',
        tipo: 'Almoço / Saída Médio',
        hora_inicio: '12:15',
        hora_fim: '13:00',
        local_padrao: 'Refeitório / Portão Principal',
        motivos_sugeridos: ['Atraso de Retorno', 'Saída não autorizada']
      },
      {
        id: 'ENTRADA_TARDE',
        tipo: 'Entrada Tarde',
        hora_inicio: '13:00',
        hora_fim: '13:30',
        local_padrao: '( ENTRADA )',
        motivos_sugeridos: ['Falta de Uniforme (Blusa)', 'Falta de calçado (Chinelo)', 'Adorno Inadequado']
      },
      {
        id: 'INT_TARDE_1',
        tipo: 'Intervalo Tarde',
        hora_inicio: '15:00',
        hora_fim: '15:20',
        local_padrao: 'Cantina / Pátio Central',
        motivos_sugeridos: ['Falta de Uniforme (Blusa)', 'Corrida / Acidente', 'Conversa em Excesso']
      }
    ];

    // Default Occurrence Types
    this.defaultOccurrenceTypes = [
      { id: '1', label: 'Falta de calçado (Chinelo)', severity: 'warning' },
      { id: '2', label: 'Uso de Celular', severity: 'warning' },
      { id: '3', label: 'Conversa em Excesso', severity: 'info' },
      { id: '4', label: 'Corrida / Acidente', severity: 'error' },
      { id: '5', label: 'Adorno Inadequado', severity: 'info' },
      { id: '6', label: 'Atraso de Entrada', severity: 'info' },
      { id: '7', label: 'Falta de Uniforme (Calça)', severity: 'warning' },
      { id: '8', label: 'Falta de Uniforme (Blusa)', severity: 'warning' },
    ];

    // Prepopulated Students
    this.defaultStudents = [
      { id: 's1', firstName: 'Gabriel', lastName: 'Oliveira', classId: '08 MB', photoSeed: 'gabriel' },
      { id: 's2', firstName: 'Cristian', lastName: 'Anderson', classId: '03 EMB', photoSeed: 'cristian' },
      { id: 's3', firstName: 'Eloísa', lastName: 'Monteiro', classId: '07 MB', photoSeed: 'eloisa' },
      { id: 's4', firstName: 'Rafael', lastName: 'Paval', classId: '02 EMA', photoSeed: 'rafael' },
      { id: 's5', firstName: 'Luís', lastName: 'Ramos', classId: '02 EMA', photoSeed: 'luis' },
      { id: 's6', firstName: 'Marcos', lastName: 'Vinícius', classId: '08 MA', photoSeed: 'marcos' },
      { id: 's7', firstName: 'Lorenzo', lastName: 'Santos', classId: '07 MA', photoSeed: 'lorenzo' },
      { id: 's8', firstName: 'Miguel', lastName: 'Assis', classId: '03 EMB', photoSeed: 'miguel' },
      { id: 's9', firstName: 'Ana', lastName: 'Costa', classId: '07 MA', photoSeed: 'ana' }, // Recurrent student
      { id: 's10', firstName: 'Kethelyn', lastName: 'Camila', classId: '09 MC', photoSeed: 'kethelyn', isEletiva: true }, // Aluno de Eletiva
      { id: 's11', firstName: 'Maria', lastName: 'Clara', classId: '07 MA', photoSeed: 'maria', isEletiva: true }, // Aluno de Eletiva
      { id: 's12', firstName: 'Sophia', lastName: 'Carvalho', classId: '09 MA', photoSeed: 'sophia' },
      { id: 's13', firstName: 'Joshua', lastName: 'Guimarães', classId: '03 EMB', photoSeed: 'joshua' },
      { id: 's14', firstName: 'Ricardo', lastName: 'Leão', classId: '02 EMA', photoSeed: 'ricardo' },
      { id: 's15', firstName: 'Rafael', lastName: 'Alves', classId: '02 EMC', photoSeed: 'rafaela' },
      { id: 's16', firstName: 'Gabriel', lastName: 'Rodrigues', classId: '01 EMA', photoSeed: 'gabrielr' },
      { id: 's17', firstName: 'Lucas', lastName: 'Penna', classId: '08 MA', photoSeed: 'lucas' },
      { id: 's18', firstName: 'Nicole', lastName: 'Silva', classId: '01 EMA', photoSeed: 'nicole' },
      { id: 's19', firstName: 'Emanuelle', lastName: 'Rosa', classId: '07 MA', photoSeed: 'emanuelle' },
      { id: 's20', firstName: 'Enzo', lastName: 'Naka', classId: '03 EMA', photoSeed: 'enzo' },
      { id: 's21', firstName: 'Giovanna', lastName: 'Loredo', classId: '09 MC', photoSeed: 'giovanna' },
      { id: 's22', firstName: 'Beatriz', lastName: 'Costa', classId: '08 MC', photoSeed: 'beatriz' }
    ];

    // Default users
    this.defaultUsers = [
      { id: 'u1', name: 'Guilherme Puentes', role: 'admin', login: 'guilherme', password: '123', loginWindows: 'eti.guilherme', active: true },
      { id: 'u2', name: 'Ana Paula', role: 'monitor', login: 'anapaula', password: '123', loginWindows: 'esc.anapaula', active: true },
      { id: 'u3', name: 'Renata Costa', role: 'secretaria', login: 'renata', password: '123', loginWindows: 'esc.renata', active: true },
      { id: 'u4', name: 'Marcelo Dias', role: 'diretor', login: 'marcelo', password: '123', loginWindows: 'esc.marcelo', active: true },
      { id: 'u5', name: 'Terminal 20', role: 'terminal', login: '20', password: '123', loginWindows: 'esc.20', active: true },
      { id: 'u6', name: 'Terminal 21', role: 'terminal', login: '21', password: '123', loginWindows: 'esc.21', active: true },
      { id: 'u7', name: 'Terminal 22', role: 'terminal', login: '22', password: '123', loginWindows: 'esc.22', active: true },
      { id: 'u8', name: 'Terminal 23', role: 'terminal', login: '23', password: '123', loginWindows: 'esc.23', active: true },
      { id: 'u9', name: 'Terminal 24', role: 'terminal', login: '24', password: '123', loginWindows: 'esc.24', active: true }
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
      classrooms: [],
      scheduleIntervals: [],
      dashboardWidgets: ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'],
      quickActionTemplates: [],
      monitorSchedules: [],
    };

    this.loadState();
    this.listeners = [];
  }

  // Default Quick Actions
  defaultQuickActions = [
    { id: 'qa-1', label: 'Secretaria (Buscar item)', template: 'Monitor na secretaria, buscar item' },
    { id: 'qa-2', label: 'Ir à Biblioteca', template: 'Monitor ir à biblioteca' },
    { id: 'qa-3', label: 'Saída Antecipada', template: 'Aluno [Nome], motivo: vai embora (Saída Antecipada)' },
    { id: 'qa-4', label: 'Ir ao Orientador', template: 'Ir: Felipe ou Dani, motivo: fora do mapa' },
    { id: 'qa-5', label: 'Saída de Irmãos', template: 'Irmãos: Aluno [Nome1] e Aluno [Nome2], motivo: sair pela secretaria' },

  ];

  // Default Monitor Schedules
  defaultMonitorSchedules = [
    { id: 'ms-1', name: 'Ana Paula', location: 'Pátio Principal', shift: 'Manhã', status: 'Ativo' },
    { id: 'ms-2', name: 'Carlos Souza', location: 'Portão Entrada / Biblioteca', shift: 'Manhã', status: 'Ativo' },
    { id: 'ms-3', name: 'Marcelo Dias', location: 'Quadra Esportiva', shift: 'Tarde', status: 'Ativo' },
  ];

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
        if (!this.state.rooms || this.state.rooms.length === 0) {
          this.state.rooms = [...this.defaultRooms];
        }
        if (!this.state.dashboardWidgets || !this.state.dashboardWidgets.includes('list-monitors')) {
          this.state.dashboardWidgets = ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'];
        }
        if (!this.state.quickActionTemplates || this.state.quickActionTemplates.length === 0) {
          this.state.quickActionTemplates = [...this.defaultQuickActions];
        }
        if (!this.state.monitorSchedules || this.state.monitorSchedules.length === 0) {
          this.state.monitorSchedules = [...this.defaultMonitorSchedules];
        }
        if (!this.state.scheduleIntervals || this.state.scheduleIntervals.length === 0) {
          this.state.scheduleIntervals = [...this.defaultScheduleIntervals];
        }
        // Lazy-init classrooms: preserve saved statuses, fill missing turmas from seed
        if (!this.state.classrooms || this.state.classrooms.length === 0) {
          this.state.classrooms = TURMAS_SEED.map(t => ({ ...t, assentos: t.assentos.map(a => ({ ...a })) }));
        } else {
          // Merge: add any new turmas from seed that aren't in saved state
          const savedIds = new Set(this.state.classrooms.map(c => c.turma_id));
          TURMAS_SEED.forEach(t => {
            if (!savedIds.has(t.turma_id)) {
              this.state.classrooms.push({ ...t, assentos: t.assentos.map(a => ({ ...a })) });
            }
          });
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
    this.state.classrooms = TURMAS_SEED.map(t => ({ ...t, assentos: t.assentos.map(a => ({ ...a })) }));
    this.state.scheduleIntervals = [...this.defaultScheduleIntervals];
    this.state.dashboardWidgets = ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'];
    this.state.quickActionTemplates = [...this.defaultQuickActions];
    this.state.monitorSchedules = [...this.defaultMonitorSchedules];

    // Generate some history to trigger recurrence and monitor statistics
    const today = new Date();
    const mockData = [
      { studentId: 's9', reason: 'Falta de Uniforme (Blusa)', monitor: 'Ana Paula', daysAgo: 1, hour: 6, minute: 45 },
      { studentId: 's9', reason: 'Falta de Uniforme (Blusa)', monitor: 'Ana Paula', daysAgo: 2, hour: 9, minute: 0 },
      { studentId: 's9', reason: 'Falta de Uniforme (Blusa)', monitor: 'Carlos Souza', daysAgo: 3, hour: 6, minute: 50 },
      { studentId: 's1', reason: 'Uso de Celular', monitor: 'Guilherme Puentes', daysAgo: 1, hour: 12, minute: 15 },
      { studentId: 's1', reason: 'Uso de Celular', monitor: 'Ana Paula', daysAgo: 4, hour: 15, minute: 0 },
      { studentId: 's3', reason: 'Conversa em Excesso', monitor: 'Carlos Souza', daysAgo: 2, hour: 9, minute: 15 },
      { studentId: 's4', reason: 'Corrida / Acidente', monitor: 'Ana Paula', daysAgo: 5, hour: 15, minute: 10 },
      { studentId: 's9', reason: 'Falta de Uniforme (Blusa)', monitor: 'Ana Paula', daysAgo: 1, hour: 7, minute: 10 },
      { studentId: 's12', reason: 'Uso de Celular', monitor: 'Ana Paula', daysAgo: 3, hour: 12, minute: 30 },
      { studentId: 's2', reason: 'Atraso de Entrada', monitor: 'Marcelo Dias', daysAgo: 2, hour: 7, minute: 30 },
      { studentId: 's8', reason: 'Conversa em Excesso', monitor: 'Carlos Souza', daysAgo: 1, hour: 15, minute: 40 },
      { studentId: 's1', reason: 'Adorno Inadequado', monitor: 'Ana Paula', daysAgo: 2, hour: 9, minute: 30 }
    ];

    mockData.forEach((item, index) => {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - item.daysAgo);
      pastDate.setHours(item.hour, item.minute, 0, 0);
      this.state.occurrences.push({
        id: `occ-init-${index}`,
        studentId: item.studentId,
        reasons: [item.reason],
        details: 'Registro histórico preenchido para fins de validação do sistema.',
        location: 'Pátio Principal',
        date: pastDate.toISOString(),
        monitorName: item.monitor
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

  // Enhanced search with current shift & Eletiva fallback
  searchStudentsWithShift(query, currentShift = 'manha') {
    if (!query || query.length < 2) return [];

    const term = this.normalizeString(query);
    const matches = this.state.students.filter(student => {
      const fullName = `${student.firstName} ${student.lastName}`;
      const nameMatch = this.normalizeString(fullName).includes(term);
      const classMatch = this.normalizeString(student.classId).includes(term);
      return nameMatch || classMatch;
    });

    return matches.map(student => {
      const classUpper = student.classId ? student.classId.toUpperCase() : '';
      const isManha = classUpper.includes('M'); // 06 MA, 01 EMA, etc.
      const studentShift = isManha ? 'manha' : 'tarde';
      const isEletiva = currentShift !== 'todos' && studentShift !== currentShift;

      return {
        ...student,
        detectedShift: studentShift,
        isEletiva,
      };
    }).filter(s => currentShift === 'todos' || s.detectedShift === currentShift || s.isEletiva).sort((a, b) => (a.isEletiva === b.isEletiva ? 0 : a.isEletiva ? 1 : -1));
  }

  // Get occurrences recorded today for a given student
  getTodayStudentOccurrences(studentId) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return this.state.occurrences.filter(occ => {
      const occDate = new Date(occ.date);
      return occ.studentId === studentId && occDate >= startOfDay;
    });
  }

  normalizeString(str) {
    return str ? str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  }

  // Recurrence check: check if student has occurrences in the last 30 days (legacy)
  checkRecurrence(studentId, motive) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

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

  // Weekly recurrence: exact 7-day cycle (Mon-Sun), resets each Sunday 23:59
  checkWeeklyRecurrence(studentId) {
    const now = new Date();
    // Find start of current week (Monday)
    const dayOfWeek = now.getDay(); // 0=Sun..6=Sat
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const occurrences = this.state.occurrences.filter(occ => {
      const occDate = new Date(occ.date);
      return occ.studentId === studentId && occDate >= weekStart;
    });

    return {
      count: occurrences.length,
      isFlagged: occurrences.length >= 5,
      history: occurrences,
    };
  }

  // Get active schedule interval based on current time
  getActiveInterval() {
    const now = new Date();
    const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const intervals = this.state.scheduleIntervals || [];
    return intervals.find(i => hhmm >= i.hora_inicio && hhmm <= i.hora_fim) || null;
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

    // TRIGGER WEBHOOK IF CRITICAL (n8n Integration - SP3-01)
    if (occurrence.severity === 'error' || occurrence.destination === 'Diretoria' || occurrence.location === 'Diretoria') {
      webhookService.sendCriticalAlert(occurrence, student);
    }

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
    let detectedDestination = 'Disciplinar'; // Default destination

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
    if (cleanText.includes('disciplinar') || cleanText.includes('disciplinador')) {
      detectedDestination = 'Disciplinar';
    } else if (cleanText.includes('secretaria')) {
      detectedDestination = 'Secretaria';
    } else if (cleanText.includes('coordenacao') || cleanText.includes('coordena')) {
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

  // Ticket (Chamado) Operations — State Machine v2: RECEBIDO → ATENDENDO → FECHADO
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
      status: 'RECEBIDO',
      priority: 'NORMAL',
      createdAt: new Date().toISOString(),
      createdBy: this.state.currentUser ? this.state.currentUser.name : 'Sistema',
      readAt: null,
      attendedAt: null,
      closedAt: null,
      acceptedBy: null,
      cancelledAt: null,
      cancelledBy: null,
    };

    this.state.tickets.push(ticket);
    this.notify();
    return ticket;
  }

  // Stage 1: Monitor confirms read
  acceptTicket(ticketId) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status === 'RECEBIDO') {
      ticket.status = 'ATENDENDO';
      ticket.readAt = new Date().toISOString();
      ticket.acceptedBy = this.state.currentUser ? this.state.currentUser.name : 'Monitor';
      this.notify();
    }
  }

  // Stage 3: Monitor closes (porta azul)
  completeTicket(ticketId, finalReasons, details) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status === 'ATENDENDO') {
      ticket.status = 'FECHADO';
      ticket.closedAt = new Date().toISOString();

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

  // Secretaria: edit ticket content (within 120s)
  editTicket(ticketId, updates) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    const elapsed = (Date.now() - new Date(ticket.createdAt).getTime()) / 1000;
    if (elapsed > 118) return; // Cannot edit after 118s
    Object.assign(ticket, updates);
    this.notify();
  }

  // Secretaria: cancel ticket (within 180s, no reason required)
  cancelTicket(ticketId) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    const elapsed = (Date.now() - new Date(ticket.createdAt).getTime()) / 1000;
    if (elapsed > 118) return; // Cannot cancel after 118s
    ticket.status = 'CANCELADO';
    ticket.cancelledAt = new Date().toISOString();
    ticket.cancelledBy = this.state.currentUser ? this.state.currentUser.name : 'Secretaria';
    this.notify();
  }

  // Check SLA status of a ticket
  getTicketSLA(ticket) {
    if (!ticket || ticket.status !== 'RECEBIDO') return 'NORMAL';
    const elapsed = (Date.now() - new Date(ticket.createdAt).getTime()) / 1000;
    if (elapsed >= 120) return 'ESTOURADO';
    if (elapsed >= 90) return 'ALERTA';
    return 'NORMAL';
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
  // Quick Action Templates Management (RBAC: Secretaria, Diretor, Admin)
  addQuickActionTemplate(label, template) {
    const newAction = {
      id: 'qa-' + Date.now(),
      label,
      template,
    };
    this.state.quickActionTemplates = [...(this.state.quickActionTemplates || []), newAction];
    this.notify();
    return newAction;
  }

  updateQuickActionTemplate(id, label, template) {
    this.state.quickActionTemplates = (this.state.quickActionTemplates || []).map(qa => {
      if (qa.id === id) {
        return { ...qa, label, template };
      }
      return qa;
    });
    this.notify();
  }

  deleteQuickActionTemplate(id) {
    this.state.quickActionTemplates = (this.state.quickActionTemplates || []).filter(qa => qa.id !== id);
    this.notify();
  }

  // ── Classroom Seating Map ──

  /** Retorna a turma pelo ID ou null */
  getClassroom(turmaId) {
    return (this.state.classrooms || []).find(c => c.turma_id === turmaId) || null;
  }

  /** Atualiza o status de um assento específico e persiste */
  updateSeatStatus(turmaId, posicao, status) {
    const classrooms = (this.state.classrooms || []).map(turma => {
      if (turma.turma_id !== turmaId) return turma;
      return {
        ...turma,
        assentos: turma.assentos.map(a =>
          a.posicao === posicao ? { ...a, status } : a
        ),
      };
    });
    this.state.classrooms = classrooms;
    this.notify();
  }

  /** Atualiza a posição de um aluno (drag-and-drop) */
  swapSeats(turmaId, posicaoA, posicaoB) {
    const classrooms = (this.state.classrooms || []).map(turma => {
      if (turma.turma_id !== turmaId) return turma;
      const assentos = turma.assentos.map(a => ({ ...a }));
      const idxA = assentos.findIndex(a => a.posicao === posicaoA);
      const idxB = assentos.findIndex(a => a.posicao === posicaoB);
      if (idxA === -1 || idxB === -1) return turma;
      const tmpNome = assentos[idxA].aluno_nome;
      const tmpStatus = assentos[idxA].status;
      assentos[idxA].aluno_nome = assentos[idxB].aluno_nome;
      assentos[idxA].status = assentos[idxB].status;
      assentos[idxB].aluno_nome = tmpNome;
      assentos[idxB].status = tmpStatus;
      return { ...turma, assentos };
    });
    this.state.classrooms = classrooms;
    this.notify();
  }
}
export default AppModel;

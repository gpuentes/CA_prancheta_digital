// View Components and Templates for Prancheta Digital (Fluent 2 Design)

// Helper to generate deterministic student avatar (inline SVG)
export function getStudentAvatar(seed, size = 80) {
  let hash = 0;
  const seedStr = seed || 'default';
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = ['#0078D4', '#107C41', '#FF8C00', '#E81123', '#8660A9', '#00B7C3'];
  const skinTones = ['#ffe0bd', '#f1c40f', '#e0ac69', '#c68642', '#8d5524', '#ffdbac'];
  const hairColors = ['#1a1a1a', '#4a3728', '#9a3324', '#d9a066', '#7f8c8d'];
  
  const colorIndex = Math.abs(hash) % colors.length;
  const skinIndex = Math.abs(hash >> 2) % skinTones.length;
  const hairIndex = Math.abs(hash >> 4) % hairColors.length;
  
  const bgColor = colors[colorIndex];
  const skinColor = skinTones[skinIndex];
  const hairColor = hairColors[hairIndex];
  const shirtColor = colors[(colorIndex + 2) % colors.length];

  // hair styles
  const hairStyles = [
    `<path d="M18 32 C 18 16, 62 16, 62 32 C 62 20, 18 20, 18 32" fill="${hairColor}"/>`, // Short
    `<path d="M15 36 C 10 12, 70 12, 65 36 C 60 22, 20 22, 15 36 M 15 36 L 12 70 L 20 70 L 15 36 M 65 36 L 68 70 L 60 70 L 65 36" fill="${hairColor}"/>`, // Long
    `<path d="M20 30 C 30 18, 50 18, 60 30 Z" fill="${hairColor}"/>`, // Crop
    `<path d="M18 32 Q 40 8 62 32 Q 40 18 18 32" fill="${hairColor}"/>` // Spike
  ];
  const hair = hairStyles[Math.abs(hash) % hairStyles.length];

  return `
    <svg width="100%" height="100%" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" style="background:${bgColor}; display:block;">
      <!-- Body Neck -->
      <rect x="34" y="65" width="12" height="15" fill="${skinColor}" opacity="0.9"/>
      <!-- Face -->
      <circle cx="40" cy="45" r="22" fill="${skinColor}"/>
      <!-- Eyes -->
      <circle cx="32" cy="42" r="3" fill="#2c3e50"/>
      <circle cx="48" cy="42" r="3" fill="#2c3e50"/>
      <!-- Smile -->
      <path d="M35 55 Q 40 60 45 55" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Hair -->
      ${hair}
      <!-- Shirt -->
      <path d="M15 80 C 15 68, 65 68, 65 80 L 72 100 L 8 100 Z" fill="${shirtColor}"/>
    </svg>
  `;
}

// Shell Component Renders Topbar + Sidebar Shell
export function renderShell(state, activeTab, appTitle, logoUrl) {
  const user = state.currentUser;
  const configTabs = state.settings.customTabs[user.role] || [];
  
  const logoHtml = logoUrl 
    ? `<img src="${logoUrl}" class="app-logo" alt="Logo">`
    : `<svg class="app-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect width="24" height="24" rx="6" fill="var(--color-brand)"/>
         <path d="M6 8V16H18V8H6ZM8 10H16V14H8V10Z" fill="white"/>
       </svg>`;

  const tabLabels = {
    dashboard: { label: 'Painel Geral', icon: '📊' },
    patio: { label: 'Ocorrências Pátio', icon: '📋' },
    chamados: { label: 'Chamados Escola', icon: '🔔' },
    cms: { label: 'Painel CMS (CRUD)', icon: '⚙️' },
    settings: { label: 'Configurações', icon: '🔧' },
    a11y: { label: 'Legendas A11y', icon: '♿' }
  };

  const navItems = configTabs.map(tab => {
    const info = tabLabels[tab] || { label: tab, icon: '📄' };
    const isActive = activeTab === tab ? 'active' : '';
    return `
      <div class="nav-item ${isActive}" data-tab="${tab}">
        <span class="nav-item-icon">${info.icon}</span>
        <span>${info.label}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="header-bar">
      <div class="header-left">
        ${logoHtml}
        <span class="app-title">${appTitle || 'Prancheta Digital'}</span>
      </div>
      <div class="header-actions">
        <div class="a11y-controls">
          <button class="tool-btn" id="btn-dec-font" title="Diminuir Fonte">A-</button>
          <button class="tool-btn" id="btn-inc-font" title="Aumentar Fonte">A+</button>
          <button class="tool-btn" id="btn-contrast-toggle" title="Alto Contraste">◐ Contraste</button>
        </div>
        <button class="tool-btn" id="btn-logout">Sair ➔</button>
      </div>
    </div>
    
    <div class="main-container">
      <div class="sidebar">
        <div class="sidebar-nav">
          ${navItems}
        </div>
        <div class="sidebar-footer">
          <div class="user-badge">
            <div class="user-avatar">${user.name.substring(0, 2).toUpperCase()}</div>
            <div class="user-info">
              <span class="user-name">${user.name}</span>
              <span class="user-role">${user.role.toUpperCase()} (Win: ${user.loginWindows})</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-area" id="tab-content">
        <!-- Tab Content Loaded Dynamic -->
      </div>
    </div>
  `;
}

// Login Component
export function renderLogin(state) {
  return `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="8" fill="var(--color-brand)"/>
            <path d="M12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5ZM12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7ZM12 17.2C10.03 17.2 8.3 16.19 7.3 14.65C7.33 13.09 10.43 12.23 12 12.23C13.57 12.23 16.67 13.09 16.7 14.65C15.7 16.19 13.97 17.2 12 17.2Z" fill="white"/>
          </svg>
          <h2>Acesso Prancheta Digital</h2>
          <p>Módulo Escolar de Gestão & SSO Herdado</p>
        </div>
        
        <form class="login-form" id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-user">Usuário</label>
            <input class="form-input" type="text" id="login-user" required autocomplete="username">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-pass">Senha</label>
            <input class="form-input" type="password" id="login-pass" required autocomplete="current-password">
          </div>
          <button class="tool-btn primary" type="submit" style="height:40px; margin-top:8px;">Entrar no Sistema</button>
        </form>

        <div class="test-creds">
          <details>
            <summary>Credenciais Homologadas (Clique p/ Autocompletar)</summary>
            <ul>
              <li><a href="#" class="quick-login-link" data-user="anapaula" data-pass="123">👩‍🏫 <b>Ana Paula</b> (Monitora Pátio)</a></li>
              <li><a href="#" class="quick-login-link" data-user="renata" data-pass="123">💻 <b>Renata Costa</b> (Secretária)</a></li>
              <li><a href="#" class="quick-login-link" data-user="marcelo" data-pass="123">👨‍💼 <b>Marcelo Dias</b> (Vice-Diretor)</a></li>
              <li><a href="#" class="quick-login-link" data-user="guilherme" data-pass="123">🛠️ <b>Guilherme Puentes</b> (CTO Admin)</a></li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  `;
}

// Dashboard View
export function renderDashboard(state, isEditingLayout = false) {
  const occurrences = state.occurrences;
  const students = state.students;

  // Calculo de KPI
  const totalOccurrencesToday = occurrences.filter(occ => {
    const occDate = new Date(occ.date);
    const today = new Date();
    return occDate.toDateString() === today.toDateString();
  }).length;

  const recurrentStudentsCount = students.filter(s => {
    // Check if s has > 1 occurrences in history
    const occs = occurrences.filter(occ => occ.studentId === s.id);
    return occs.length > 1;
  }).length;

  const activeMonitorsCount = state.users.filter(u => u.role === 'monitor' && u.active).length;

  // Map widgets rendering functions
  const widgetsTemplates = {
    'metric-volumetry': `
      <div class="widget" id="metric-volumetry" draggable="${isEditingLayout}">
        <div class="widget-header">
          <span class="widget-title">⚡ Métricas de SLA</span>
          ${isEditingLayout ? '<span style="font-size:11px; color:var(--color-brand)">Arrastável</span>' : ''}
        </div>
        <div class="widget-content">
          <div class="metrics-row">
            <div class="metric-card">
              <div class="metric-value">${totalOccurrencesToday}</div>
              <div class="metric-label">Hoje</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${recurrentStudentsCount}</div>
              <div class="metric-label">Reincidentes</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${activeMonitorsCount}</div>
              <div class="metric-label">Monitores Ativos</div>
            </div>
          </div>
        </div>
      </div>
    `,
    'chart-hours': (() => {
      const intervals = { entrada: 0, recManha: 0, almoco: 0, recTarde: 0 };
      occurrences.forEach(occ => {
        const date = new Date(occ.date);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const timeVal = hour * 60 + minutes;
        
        // Categorize 24 hours into 4 periods to cover all occurrences, including test data
        if (timeVal < 510) intervals.entrada++; // 00:00 - 08:29
        else if (timeVal < 690) intervals.recManha++; // 08:30 - 11:29
        else if (timeVal < 870) intervals.almoco++; // 11:30 - 14:29
        else intervals.recTarde++; // 14:30 - 23:59
      });

      const maxVal = Math.max(intervals.entrada, intervals.recManha, intervals.almoco, intervals.recTarde, 1);
      const getBarHeight = (val) => (val / maxVal) * 80;

      const hEnt = getBarHeight(intervals.entrada);
      const hMnh = getBarHeight(intervals.recManha);
      const hAlm = getBarHeight(intervals.almoco);
      const hTrd = getBarHeight(intervals.recTarde);

      return `
        <div class="widget" id="chart-hours" draggable="${isEditingLayout}">
          <div class="widget-header">
            <span class="widget-title">📈 Intervalos (recreio)</span>
            ${isEditingLayout ? '<span style="font-size:11px; color:var(--color-brand)">Arrastável</span>' : ''}
          </div>
          <div class="widget-content">
            <div class="chart-container">
              <svg class="chart-svg" viewBox="0 0 300 150">
                <line x1="30" y1="120" x2="280" y2="120" stroke="var(--border-color-strong)" stroke-width="1" />
                
                <text x="50" y="135" font-size="8" fill="var(--color-text-secondary)" text-anchor="middle">Entrada (06:45)</text>
                <rect class="chart-bar" x="40" y="${120 - hEnt}" width="20" height="${hEnt}" rx="2" />
                <text x="50" y="${120 - hEnt - 8}" font-size="8" fill="var(--color-text)" font-weight="600" text-anchor="middle">${intervals.entrada} occ</text>

                <text x="120" y="135" font-size="8" fill="var(--color-text-secondary)" text-anchor="middle">Rec. Manhã (09:00)</text>
                <rect class="chart-bar" x="110" y="${120 - hMnh}" width="20" height="${hMnh}" rx="2" />
                <text x="120" y="${120 - hMnh - 8}" font-size="8" fill="var(--color-text)" font-weight="600" text-anchor="middle">${intervals.recManha} occ</text>

                <text x="190" y="135" font-size="8" fill="var(--color-text-secondary)" text-anchor="middle">Almoço (12:00)</text>
                <rect class="chart-bar" x="180" y="${120 - hAlm}" width="20" height="${hAlm}" rx="2" />
                <text x="190" y="${120 - hAlm - 8}" font-size="8" fill="var(--color-text)" font-weight="600" text-anchor="middle">${intervals.almoco} occ</text>

                <text x="250" y="135" font-size="8" fill="var(--color-text-secondary)" text-anchor="middle">Rec. Tarde (15:00)</text>
                <rect class="chart-bar" x="240" y="${120 - hTrd}" width="20" height="${hTrd}" rx="2" />
                <text x="250" y="${120 - hTrd - 8}" font-size="8" fill="var(--color-text)" font-weight="600" text-anchor="middle">${intervals.recTarde} occ</text>
              </svg>
            </div>
          </div>
        </div>
      `;
    })(),
    'chart-categories': `
      <div class="widget" id="chart-categories" draggable="${isEditingLayout}">
        <div class="widget-header">
          <span class="widget-title">🍕 Motivos Recorrentes</span>
          ${isEditingLayout ? '<span style="font-size:11px; color:var(--color-brand)">Arrastável</span>' : ''}
        </div>
        <div class="widget-content">
          <div style="display:flex; align-items:center; gap:20px;">
            <div class="chart-container" style="width:120px; height:120px;">
              <svg class="chart-svg" viewBox="0 0 100 100">
                <!-- Static SVG Pie Chart demonstration -->
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#107c41" stroke-width="8" stroke-dasharray="150 251.2" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0078d4" stroke-width="8" stroke-dasharray="70 251.2" stroke-dashoffset="-150" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffaa44" stroke-width="8" stroke-dasharray="31.2 251.2" stroke-dashoffset="-220" />
              </svg>
            </div>
            <div style="font-size:12px; display:flex; flex-direction:column; gap:4px;">
              <div><span style="display:inline-block; width:10px; height:10px; background-color:#107c41; margin-right:6px;"></span>Uniforme (60%)</div>
              <div><span style="display:inline-block; width:10px; height:10px; background-color:#0078d4; margin-right:6px;"></span>Celular (28%)</div>
              <div><span style="display:inline-block; width:10px; height:10px; background-color:#ffaa44; margin-right:6px;"></span>Outros (12%)</div>
            </div>
          </div>
        </div>
      </div>
    `,
    'list-recurrent': (() => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const counts = {};
      occurrences.forEach(occ => {
        const occDate = new Date(occ.date);
        if (occDate >= thirtyDaysAgo) {
          counts[occ.studentId] = (counts[occ.studentId] || 0) + 1;
        }
      });

      const recurrent = Object.entries(counts)
        .filter(([studentId, count]) => count > 1)
        .map(([studentId, count]) => {
          const student = students.find(s => s.id === studentId);
          const studentOccs = occurrences.filter(occ => occ.studentId === studentId && new Date(occ.date) >= thirtyDaysAgo);
          const reasonCounts = {};
          studentOccs.forEach(occ => {
            occ.reasons.forEach(r => {
              reasonCounts[r] = (reasonCounts[r] || 0) + 1;
            });
          });
          const topReason = Object.entries(reasonCounts)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Ocorrência';
          
          let shortReason = topReason;
          if (shortReason.toLowerCase().includes('uniforme')) shortReason = 'Uniforme';
          else if (shortReason.toLowerCase().includes('celular')) shortReason = 'Celular';
          else if (shortReason.toLowerCase().includes('conversa')) shortReason = 'Conversa';
          else if (shortReason.toLowerCase().includes('corrida')) shortReason = 'Corrida';
          else if (shortReason.toLowerCase().includes('adorno')) shortReason = 'Adorno';
          else if (shortReason.toLowerCase().includes('atraso')) shortReason = 'Atraso';

          return { student, count, reason: shortReason };
        })
        .filter(item => item.student !== undefined)
        .sort((a, b) => b.count - a.count);

      const itemsHtml = recurrent.map(item => {
        const isCelular = item.reason === 'Celular';
        const badgeStyle = isCelular 
          ? 'background-color:var(--color-info-bg); border-color:var(--color-info); color:var(--color-info);'
          : '';
        const icon = isCelular ? 'ℹ️' : '⚠️';
        return `
          <li style="display:flex; justify-content:space-between; align-items:center; padding:6px; border-bottom:1px solid var(--border-color);">
            <div><b>${item.student.firstName} ${item.student.lastName}</b> (${item.student.classId})</div>
            <span class="student-recurrent-badge" style="${badgeStyle}">${icon} ${item.count}x ${item.reason}</span>
          </li>
        `;
      }).join('');

      return `
        <div class="widget" id="list-recurrent" draggable="${isEditingLayout}">
          <div class="widget-header">
            <span class="widget-title">⚠️ Reincidentes (Últimos 30 dias)</span>
            ${isEditingLayout ? '<span style="font-size:11px; color:var(--color-brand)">Arrastável</span>' : ''}
          </div>
          <div class="widget-content" style="max-height:160px; overflow-y:auto; justify-content:flex-start;">
            <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; width:100%; font-size:13px;">
              ${itemsHtml || '<li style="text-align:center; padding:10px; color:var(--color-text-secondary);">Nenhum reincidente nos últimos 30 dias</li>'}
            </ul>
          </div>
        </div>
      `;
    })(),
    'list-monitors': `
      <div class="widget" id="list-monitors" draggable="${isEditingLayout}">
        <div class="widget-header">
          <span class="widget-title">🏆 Top Monitores (Pátio)</span>
          ${isEditingLayout ? '<span style="font-size:11px; color:var(--color-brand)">Arrastável</span>' : ''}
        </div>
        <div class="widget-content" style="max-height:160px; overflow-y:auto; justify-content:flex-start;">
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; width:100%; font-size:13px;">
            ${(() => {
              const counts = {};
              occurrences.forEach(occ => {
                const mName = occ.monitorName || 'Outro';
                counts[mName] = (counts[mName] || 0) + 1;
              });
              const sorted = Object.entries(counts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count);
              
              return sorted.map(m => `
                <li style="display:flex; justify-content:space-between; align-items:center; padding:6px; border-bottom:1px solid var(--border-color);">
                  <div>👤 <b>${m.name}</b></div>
                  <span style="font-size:11px; padding:2px 8px; border-radius:10px; background-color:var(--color-success-bg); color:var(--color-success); font-weight:600;">${m.count} registros</span>
                </li>
              `).join('') || '<li style="text-align:center; padding:10px; color:var(--color-text-secondary);">Nenhuma ocorrência registrada</li>';
            })()}
          </ul>
        </div>
      </div>
    `
  };

  const widgetOrder = state.dashboardWidgets || ['metric-volumetry', 'chart-hours', 'chart-categories', 'list-recurrent', 'list-monitors'];
  const widgetsHtml = widgetOrder.map(id => widgetsTemplates[id]).join('');

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <h2>Dashboard Executivo</h2>
        <p>Acompanhamento analítico da monitoria em tempo real</p>
      </div>
      <button class="tool-btn ${isEditingLayout ? 'primary' : ''}" id="btn-edit-layout">
        ${isEditingLayout ? 'Salvar Organização' : '⚙️ Reorganizar Cards'}
      </button>
    </div>
    
    <div class="dashboard-grid ${isEditingLayout ? 'edit-mode-active' : ''}" id="dashboard-widgets-container">
      ${widgetsHtml}
    </div>
  `;
}

// Pátio View (Monitor Tablet occurrence panel)
export function renderPatio(state, selectedStudent = null, savedState = null) {
  const customCta = state.settings.patioCta || {
    label: 'FALTA DE UNIFORME',
    bgColor: '#107c41',
    textColor: '#ffffff',
    borderRadius: '2px'
  };

  let studentCardHtml = `
    <div class="student-card" style="justify-content:center; align-items:center; border-style:dashed; min-height:142px;">
      <p style="text-align:center;">Pesquise e selecione um aluno para prosseguir</p>
    </div>
  `;

  if (selectedStudent) {
    const recurrence = savedState ? savedState.recurrence : { isRecurrent: false };
    const recurrentBadge = recurrence.isRecurrent 
      ? `<div class="student-recurrent-badge">⚠️ Recorrente (${recurrence.count}x Ocorrências)</div>`
      : '';

    studentCardHtml = `
      <div class="student-card">
        <div class="student-photo-wrapper">
          ${getStudentAvatar(selectedStudent.photoSeed)}
        </div>
        <div class="student-details">
          <div>
            <div class="student-name-title">${selectedStudent.firstName} ${selectedStudent.lastName}</div>
            <div class="student-meta">Série: ${selectedStudent.classId}</div>
            ${recurrentBadge}
          </div>
          <button class="tool-btn" id="btn-clear-student" style="align-self:flex-start; margin-top:8px; height:28px; font-size:11px;">Mudar Aluno</button>
        </div>
      </div>
    `;
  }

  // Active occurrence confirmation panel
  const confirmationHtml = (savedState && savedState.occurrenceLogged)
    ? `
      <div class="occurrence-summary-panel" style="border-color:var(--color-success); background-color:var(--color-success-bg);">
        <h4 style="color:var(--color-success)">✓ Registro Concluído!</h4>
        <p style="font-size:13px; color:var(--color-text);"><b>Aluno:</b> ${selectedStudent.firstName} ${selectedStudent.lastName}<br><b>Motivo:</b> ${savedState.occurrenceLogged.reasons.join(', ')}<br><b>Por:</b> ${savedState.occurrenceLogged.monitorName}</p>
        <button class="tool-btn primary" id="btn-reset-patio" style="margin-top:8px; height:32px;">Registrar Nova Ocorrência</button>
      </div>
    `
    : '';

  // Generate list of Quick Occurrence buttons
  const disabledAttr = selectedStudent ? '' : 'disabled';

  return `
    <div style="margin-bottom:16px;">
      <h2>Registro Rápido de Pátio</h2>
      <p>Terminal Mobile do Monitor Escolar</p>
    </div>
    
    <div class="patio-container">
      <div class="patio-column">
        <h3>1. Identificação do Aluno</h3>
        
        <div class="search-wrapper">
          <input class="form-input" type="text" id="patio-student-search" placeholder="Digite nome ou série do aluno (ex: Ana, 08 MB)..." autocomplete="off" ${savedState && savedState.occurrenceLogged ? 'disabled' : ''}>
          <ul class="search-results" id="patio-search-results" style="display:none;"></ul>
        </div>
        
        ${studentCardHtml}
        ${confirmationHtml}
      </div>
      
      <div class="patio-column">
        <h3>2. Motivos de Entrada (Ações Rápidas)</h3>
        <div class="patio-cta-grid">
          <button class="patio-cta-button" id="btn-patio-primary-cta" ${disabledAttr} style="background-color:${customCta.bgColor}; color:${customCta.textColor}; border-radius:${customCta.borderRadius};">
            <span>${customCta.label}</span>
            <span style="font-size:10px; font-weight:400; opacity:0.8;">Ação Positiva Rápida</span>
          </button>
          <button class="patio-cta-button secondary-action" data-motive="Uso de Celular" ${disabledAttr}>
            <span>📱 Celular</span>
          </button>
          <button class="patio-cta-button secondary-action" data-motive="Conversa em Excesso" ${disabledAttr}>
            <span>🗣️ Conversa</span>
          </button>
          <button class="patio-cta-button secondary-action" data-motive="Corrida / Acidente" ${disabledAttr}>
            <span>🏃 Corrida / Acidente</span>
          </button>
          <button class="patio-cta-button secondary-action" data-motive="Adorno Inadequado" ${disabledAttr}>
            <span>🧢 Adorno Inadequado</span>
          </button>
          <button class="patio-cta-button secondary-action" id="btn-patio-other-cta" ${disabledAttr}>
            <span>✏️ Outro Motivo</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Chamados View (Tickets & Moderação)
export function renderChamados(state, smartPasteResult = null, activeTimers = null) {
  const user = state.currentUser;
  const showSecretariaPanel = (user.role === 'secretaria' || user.role === 'admin' || user.role === 'diretor');
  const showMonitorFila = (user.role === 'monitor' || user.role === 'admin' || user.role === 'diretor');

  // Preview form for Smart Paste
  let smartPastePreviewHtml = '';
  if (smartPasteResult) {
    const studentInfo = smartPasteResult.student 
      ? `<b>✓ Encontrado:</b> ${smartPasteResult.student.firstName} ${smartPasteResult.student.lastName} (${smartPasteResult.student.classId})`
      : `<span style="color:var(--color-warning);">⚠️ Aluno não cadastrado. Criar ocorrência avulsa?</span>`;

    smartPastePreviewHtml = `
      <div class="smart-paste-preview">
        <h4>📋 Pré-visualização do Chamado Interpretado</h4>
        <div style="font-size:13px; display:flex; flex-direction:column; gap:8px;">
          <div>${studentInfo}</div>
          <div class="form-group">
            <label class="form-label">Destino do Encaminhamento</label>
            <select class="form-input" id="smart-paste-destination">
              <option value="Coordenação" ${smartPasteResult.destination === 'Coordenação' ? 'selected' : ''}>Coordenação</option>
              <option value="Orientação" ${smartPasteResult.destination === 'Orientação' ? 'selected' : ''}>Orientação</option>
              <option value="Diretoria" ${smartPasteResult.destination === 'Diretoria' ? 'selected' : ''}>Diretoria</option>
              <option value="Ir embora" ${smartPasteResult.destination === 'Ir embora' ? 'selected' : ''}>Ir embora</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Motivos Selecionados</label>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${state.occurrenceTypes.map(type => {
                const checked = smartPasteResult.reasons.includes(type.label) ? 'checked' : '';
                return `
                  <label class="form-checkbox">
                    <input type="checkbox" class="smart-paste-reason" value="${type.label}" ${checked}> ${type.label}
                  </label>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button class="tool-btn primary" id="btn-smart-paste-confirm" style="height:32px;">Confirmar e Enviar</button>
          <button class="tool-btn" id="btn-smart-paste-cancel" style="height:32px;">Cancelar</button>
        </div>
      </div>
    `;
  }

  // Fila de chamados
  const activeTickets = state.tickets.filter(t => t.status !== 'Concluído');
  
  const ticketsHtml = activeTickets.map(ticket => {
    // SLA Color coding
    const createdDate = new Date(ticket.createdAt);
    const elapsedMinutes = Math.floor((Date.now() - createdDate.getTime()) / 60000);
    
    let slaClass = 'sla-green';
    let slaLabel = 'Recente';
    if (elapsedMinutes >= 10) {
      slaClass = 'sla-red';
      slaLabel = 'Crítico';
    } else if (elapsedMinutes >= 5) {
      slaClass = 'sla-yellow';
      slaLabel = 'Atenção';
    }

    // A11y Dalto Icons
    const daltoIcon = slaClass === 'sla-red' ? '🛑' : slaClass === 'sla-yellow' ? '⚠️' : '✓';

    const actionButton = ticket.status === 'Abertura' || ticket.status === 'Aberto'
      ? `<button class="tool-btn primary btn-accept-ticket" data-id="${ticket.id}">Atender Chamado</button>`
      : `<button class="tool-btn btn-complete-ticket" data-id="${ticket.id}" style="background-color:var(--color-success); color:white;">Concluir Atendimento</button>`;

    return `
      <div class="ticket-card ${slaClass}" data-id="${ticket.id}">
        <div class="ticket-meta">
          <span style="font-weight:600;">SLA: ${daltoIcon} ${slaLabel} (${elapsedMinutes}m decorridos)</span>
          <span>${createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="ticket-student">${ticket.studentName} (${ticket.classId})</div>
        <div class="ticket-description">
          <b>Destino:</b> ${ticket.destination} <br>
          <b>Motivo:</b> ${ticket.reasons.join(', ')} <br>
          <i style="font-size:12px; color:var(--color-text-secondary);">${ticket.rawText}</i>
        </div>
        <div class="ticket-actions">
          ${actionButton}
        </div>
      </div>
    `;
  }).join('') || '<p style="text-align:center; padding:20px; color:var(--color-text-secondary);">Nenhum chamado pendente na fila</p>';

  // Auto-refresh progress bar info
  const countdown = activeTimers ? activeTimers.countdown : 30;
  const progressPercent = ((30 - countdown) / 30) * 100;

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <h2>Campainha & Moderação Escolar</h2>
        <p>Orquestração de atendimento e despacho em tempo real</p>
      </div>
      
      <div class="refresh-indicator">
        <span>Próxima Sincronização em ${countdown}s</span>
        <div class="refresh-bar-wrapper">
          <div class="refresh-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    </div>
    
    <div class="moderation-layout">
      ${showSecretariaPanel ? `
        <div class="smart-paste-card">
          <h3>✍️ Colar Inteligente (Secretaria)</h3>
          <p style="font-size:12px;">Cole a mensagem do ERP ou chat. O motor Regex/NLP preencherá o chamado automaticamente.</p>
          
          <div class="form-group">
            <textarea class="form-textarea" id="smart-paste-text" placeholder="Cole o texto aqui. Ex: O aluno Gabriel Oliveira da turma 08 MB foi para a coordenação por falta de uniforme..."></textarea>
          </div>
          
          <button class="tool-btn primary" id="btn-smart-paste-parse">Processar Texto</button>
          
          ${smartPastePreviewHtml}
        </div>
      ` : ''}

      ${showMonitorFila ? `
        <div class="tickets-panel">
          <div class="tickets-header">
            <h3>🔔 Fila de Chamados Ativos</h3>
            <button class="tool-btn" id="btn-trigger-mock-ticket" style="font-size:11px;">⚡ Simular Novo Chamado</button>
          </div>
          <div class="ticket-list">
            ${ticketsHtml}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// CMS CRUD Component
export function renderCMS(state, activeTab = 'students', editItem = null) {
  const list = activeTab === 'occurrences' ? state.occurrences : (state[activeTab] || []);
  
  const headers = {
    students: ['Nome Completo', 'Turma', 'Ações'],
    users: ['Nome', 'Perfil', 'Login Windows', 'Status', 'Ações'],
    occurrenceTypes: ['Identificador', 'Grau de Risco', 'Ações'],
    occurrences: ['Data/Hora', 'Aluno (Turma)', 'Monitor', 'Infrações', 'Severidade', 'Auditoria']
  };

  const tableHeaderHtml = headers[activeTab].map(h => `<th>${h}</th>`).join('');

  const tableBodyHtml = list.map(item => {
    if (activeTab === 'students') {
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:24px; height:28px; border-radius:3px; overflow:hidden;">
                ${getStudentAvatar(item.photoSeed, 24)}
              </div>
              <span>${item.firstName} ${item.lastName}</span>
            </div>
          </td>
          <td>${item.classId}</td>
          <td>
            <button class="tool-btn btn-edit-cms" data-id="${item.id}" data-type="students" style="height:26px; padding:0 8px; font-size:11px;">Editar</button>
            <button class="tool-btn btn-delete-cms" data-id="${item.id}" data-type="students" style="height:26px; padding:0 8px; font-size:11px; color:var(--color-error);">Excluir</button>
          </td>
        </tr>
      `;
    } else if (activeTab === 'users') {
      return `
        <tr>
          <td><b>${item.name}</b> (${item.login})</td>
          <td>${item.role.toUpperCase()}</td>
          <td><code>${item.loginWindows}</code></td>
          <td>${item.active ? '🟢 Ativo' : '🔴 Inativo'}</td>
          <td>
            <button class="tool-btn btn-edit-cms" data-id="${item.id}" data-type="users" style="height:26px; padding:0 8px; font-size:11px;">Editar</button>
            <button class="tool-btn btn-delete-cms" data-id="${item.id}" data-type="users" style="height:26px; padding:0 8px; font-size:11px; color:var(--color-error);">Excluir</button>
          </td>
        </tr>
      `;
    } else if (activeTab === 'occurrenceTypes') {
      return `
        <tr>
          <td>${item.label}</td>
          <td><span style="font-size:11px; padding:2px 6px; border-radius:4px; font-weight:600; background-color:var(--color-${item.severity}-bg); color:var(--color-${item.severity});">${item.severity.toUpperCase()}</span></td>
          <td>
            <button class="tool-btn btn-edit-cms" data-id="${item.id}" data-type="occurrenceTypes" style="height:26px; padding:0 8px; font-size:11px;">Editar</button>
            <button class="tool-btn btn-delete-cms" data-id="${item.id}" data-type="occurrenceTypes" style="height:26px; padding:0 8px; font-size:11px; color:var(--color-error);">Excluir</button>
          </td>
        </tr>
      `;
    } else {
      // occurrences log tab
      const student = state.students.find(s => s.id === item.studentId);
      const studentName = student ? `${student.firstName} ${student.lastName} (${student.classId})` : 'Estudante Desconhecido';
      
      const auditHtml = item.auditLog ? item.auditLog.map(log => `
        <div style="font-size:10px; border-left:2px solid var(--color-brand); padding-left:6px; margin-bottom:4px; line-height:1.2;">
          <b>${log.action}</b> [${new Date(log.timestamp).toLocaleTimeString('pt-BR')}]: ${log.details} <span style="color:var(--color-text-secondary);">(${log.user})</span>
        </div>
      `).join('') : 'Sem histórico de auditoria';

      return `
        <tr>
          <td style="font-size:12px; white-space:nowrap;">${new Date(item.date).toLocaleString('pt-BR')}</td>
          <td><b>${studentName}</b></td>
          <td>👤 ${item.monitorName || 'Sistema'}</td>
          <td><span style="font-size:12px;">${item.reasons.join(', ')}</span></td>
          <td>
            <span style="font-size:11px; padding:2px 6px; border-radius:4px; font-weight:600; background-color:var(--color-${item.severity || 'info'}-bg); color:var(--color-${item.severity || 'info'});">
              ${(item.severity || 'info').toUpperCase()}
            </span>
          </td>
          <td style="font-size:11px; max-width:260px;">
            <div style="max-height:80px; overflow-y:auto; padding-right:4px;">
              ${auditHtml}
            </div>
          </td>
        </tr>
      `;
    }
  }).join('');

  return `
    <div style="margin-bottom:16px;">
      <h2>Painel Administrativo (CMS)</h2>
      <p>Gerenciamento de tabelas e cadastros no ecossistema modular</p>
    </div>

    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
      <button class="tool-btn ${activeTab === 'students' ? 'primary' : ''}" id="btn-cms-students">Estudantes</button>
      <button class="tool-btn ${activeTab === 'users' ? 'primary' : ''}" id="btn-cms-users">Operadores / Monitores</button>
      <button class="tool-btn ${activeTab === 'occurrenceTypes' ? 'primary' : ''}" id="btn-cms-types">Tipos Ocorrências</button>
      <button class="tool-btn ${activeTab === 'occurrences' ? 'primary' : ''}" id="btn-cms-occurrences">Registro de Ocorrências (Auditoria)</button>
    </div>

    <div class="crud-container">
      <div class="crud-header">
        <h3>Lista de Registros</h3>
        ${activeTab !== 'occurrences' ? `<button class="tool-btn primary" id="btn-cms-add" data-type="${activeTab}">+ Adicionar Item</button>` : ''}
      </div>
      <div class="crud-table-wrapper">
        <table class="crud-table">
          <thead>
            <tr>
              ${tableHeaderHtml}
            </tr>
          </thead>
          <tbody>
            ${tableBodyHtml || '<tr><td colspan="6" style="text-align:center;">Nenhum registro encontrado</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Render Modal dialog for CMS Add/Edit
export function renderCMSModal(type, item = null) {
  const isEdit = !!item;
  const title = isEdit ? 'Editar Registro' : 'Novo Registro';

  let formHtml = '';
  if (type === 'students') {
    formHtml = `
      <div class="form-group">
        <label class="form-label">Primeiro Nome</label>
        <input class="form-input" type="text" id="cms-student-first" value="${item ? item.firstName : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Último Sobrenome</label>
        <input class="form-input" type="text" id="cms-student-last" value="${item ? item.lastName : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Série / Turma</label>
        <input class="form-input" type="text" id="cms-student-class" placeholder="Ex: 08 MB" value="${item ? item.classId : ''}" required>
      </div>
    `;
  } else if (type === 'users') {
    formHtml = `
      <div class="form-group">
        <label class="form-label">Nome Completo</label>
        <input class="form-input" type="text" id="cms-user-name" value="${item ? item.name : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Login</label>
        <input class="form-input" type="text" id="cms-user-login" value="${item ? item.login : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Senha</label>
        <input class="form-input" type="password" id="cms-user-pass" value="${item ? item.password : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Login Windows (AD/SSO)</label>
        <input class="form-input" type="text" id="cms-user-win" value="${item ? item.loginWindows : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Perfil / Função</label>
        <select class="form-input" id="cms-user-role">
          <option value="monitor" ${item && item.role === 'monitor' ? 'selected' : ''}>Monitor</option>
          <option value="secretaria" ${item && item.role === 'secretaria' ? 'selected' : ''}>Secretária</option>
          <option value="diretor" ${item && item.role === 'diretor' ? 'selected' : ''}>Vice-Diretor / Diretor</option>
          <option value="admin" ${item && item.role === 'admin' ? 'selected' : ''}>Administrador</option>
        </select>
      </div>
      <label class="form-checkbox">
        <input type="checkbox" id="cms-user-active" ${!item || item.active ? 'checked' : ''}> Operador Ativo
      </label>
    `;
  } else {
    formHtml = `
      <div class="form-group">
        <label class="form-label">Nome da Infração</label>
        <input class="form-input" type="text" id="cms-type-label" value="${item ? item.label : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Nível de Severidade</label>
        <select class="form-input" id="cms-type-severity">
          <option value="info" ${item && item.severity === 'info' ? 'selected' : ''}>Informativo (Azul)</option>
          <option value="warning" ${item && item.severity === 'warning' ? 'selected' : ''}>Alerta (Amarelo)</option>
          <option value="error" ${item && item.severity === 'error' ? 'selected' : ''}>Crítico (Vermelho)</option>
        </select>
      </div>
    `;
  }

  return `
    <div class="modal-overlay" id="cms-modal-overlay">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="tool-btn" id="btn-cms-modal-close">✕</button>
        </div>
        <form id="cms-modal-form" style="display:flex; flex-direction:column; gap:16px;">
          ${formHtml}
          <div class="modal-footer">
            <button class="tool-btn" type="button" id="btn-cms-modal-cancel">Cancelar</button>
            <button class="tool-btn primary" type="submit">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// A11y Guidelines view
export function renderA11y(state) {
  return `
    <div style="margin-bottom:16px;">
      <h2>Acessibilidade & Heurísticas de Cores</h2>
      <p>Legenda de conformidade visual para daltonismo e A11y (Diretrizes WCAG)</p>
    </div>

    <div class="widget" style="margin-bottom:20px;">
      <h3>1. Padrões Gráficos de Prioridade (Daltonismo)</h3>
      <p>Nossas filas e ocorrências não dependem de cores isoladamente para transmitir o status e SLA. Cada nível possui um padrão textural redundante:</p>
      
      <div class="pattern-legend-grid">
        <div class="pattern-legend-card">
          <div class="a11y-status-indicator pattern-stripes-green">✓</div>
          <div>
            <b style="color:var(--color-success)">🟢 SLA Baixo (Resolvido/Recente)</b>
            <p style="font-size:12px;">Padrão: Listras Diagonais. Sem riscos iminentes.</p>
          </div>
        </div>
        <div class="pattern-legend-card">
          <div class="a11y-status-indicator pattern-dots-yellow">⚠️</div>
          <div>
            <b style="color:var(--color-warning)">🟡 SLA Médio (Atenção - 5m+)</b>
            <p style="font-size:12px;">Padrão: Pontos (Dots). Requer atenção da monitoria.</p>
          </div>
        </div>
        <div class="pattern-legend-card">
          <div class="a11y-status-indicator pattern-cross-red">🛑</div>
          <div>
            <b style="color:var(--color-error)">🔴 SLA Crítico (Ação Urgente - 10m+)</b>
            <p style="font-size:12px;">Padrão: Quadriculado. Alerta urgente visual e sonoro.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="widget">
      <h3>2. Heurísticas de Acessibilidade do Sistema</h3>
      <p style="margin-bottom:12px;">Este PWA implementa as seguintes regras de A11y para facilitar o uso por monitores no pátio e secretários:</p>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:14px; padding-left:10px;">
        <li>🔍 <b>Escala de Fonte Flexível:</b> Ajuste do tamanho da fonte via botões <code>A-</code> / <code>A+</code> no cabeçalho (+/- 40% do padrão).</li>
        <li>🌓 <b>Alto Contraste Nativo:</b> Alteração instantânea para o tema com contraste maximizado, ideal para ambientes de pátio sob sol forte.</li>
        <li>📱 <b>Touch Targets Ampliados:</b> Todos os botões do monitor possuem no mínimo 48px de altura/largura para evitar cliques errados.</li>
        <li>🔊 <b>Alertas Perceptíveis:</b> Notificação vibratória (API de vibração) e beeps sonoros nativos ao receber demandas, não dependendo apenas de monitoramento visual.</li>
      </ul>
    </div>
  `;
}

// Settings View (White label settings & CSV imports)
export function renderSettings(state, uploadStatus = '') {
  const settings = state.settings;
  const customCta = settings.patioCta || {};

  return `
    <div style="margin-bottom:16px;">
      <h2>Configurações do Sistema</h2>
      <p>Ajustes de White Label, Navegação e Importação de Cadastros</p>
    </div>

    <div class="dashboard-grid">
      <!-- Section 1: White Label & CTAs -->
      <div class="widget">
        <div class="widget-header">
          <span class="widget-title">🎨 White Label & Visual do Pátio</span>
        </div>
        <div class="widget-content">
          <form id="settings-white-label-form" style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group">
              <label class="form-label">Nome do Colégio / Sistema</label>
              <input class="form-input" type="text" id="settings-app-title" value="${settings.appTitle || ''}">
            </div>
            
            <div class="form-group">
              <label class="form-label">Substituir Logotipo</label>
              <input type="file" id="settings-app-logo-file" accept="image/*" style="font-size:12px;">
              ${settings.logoUrl ? `<div style="margin-top:6px;"><img src="${settings.logoUrl}" style="height:30px; border:1px solid var(--border-color); padding:2px;"> <a href="#" id="settings-logo-clear" style="font-size:11px; margin-left:10px; color:var(--color-error);">Remover</a></div>` : ''}
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top:10px; margin-top:10px;">
              <h4 style="margin-bottom:8px;">Botão CTA Pátio Primário</h4>
              <div class="form-group">
                <label class="form-label">Texto da Label</label>
                <input class="form-input" type="text" id="settings-cta-label" value="${customCta.label || ''}">
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:6px;">
                <div class="form-group">
                  <label class="form-label">Cor de Fundo</label>
                  <input class="form-input" type="color" id="settings-cta-bg" value="${customCta.bgColor || '#107c41'}" style="padding:0; height:36px; cursor:pointer;">
                </div>
                <div class="form-group">
                  <label class="form-label">Cor do Texto</label>
                  <input class="form-input" type="color" id="settings-cta-text" value="${customCta.textColor || '#ffffff'}" style="padding:0; height:36px; cursor:pointer;">
                </div>
              </div>
            </div>

            <button class="tool-btn primary" type="submit" style="margin-top:12px; height:36px;">Salvar Ajustes Visuais</button>
          </form>
        </div>
      </div>

      <!-- Section 2: Tab visibility configuration -->
      <div class="widget">
        <div class="widget-header">
          <span class="widget-title">🔗 Configurações de Abas por Perfil</span>
        </div>
        <div class="widget-content">
          <form id="settings-tabs-form" style="display:flex; flex-direction:column; gap:12px;">
            <p style="font-size:12px; margin-bottom:8px;">Defina quais seções de navegação do menu lateral estarão ativas para cada perfil de usuário:</p>
            
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${Object.keys(settings.customTabs).map(role => {
                const activeRoleTabs = settings.customTabs[role] || [];
                return `
                  <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px;">
                    <b style="font-size:13px; text-transform:uppercase; color:var(--color-brand);">${role}</b>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:4px;">
                      ${['dashboard', 'patio', 'chamados', 'cms', 'settings', 'a11y'].map(tab => {
                        const checked = activeRoleTabs.includes(tab) ? 'checked' : '';
                        return `
                          <label class="form-checkbox" style="font-size:11px;">
                            <input type="checkbox" class="role-tab-checkbox" data-role="${role}" value="${tab}" ${checked}> ${tab}
                          </label>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <button class="tool-btn primary" type="submit" style="margin-top:12px; height:36px;">Salvar Permissões de Menu</button>
          </form>
        </div>
      </div>

      <!-- Section 3: CSV Import & Export -->
      <div class="widget">
        <div class="widget-header">
          <span class="widget-title">📥 Carga de Dados (Alunos e Turmas)</span>
        </div>
        <div class="widget-content" style="gap:12px;">
          <p style="font-size:12px;">Carregue novos alunos e turmas em massa importando um arquivo CSV formatado com <code>Nome;Sobrenome;Série</code></p>
          
          <div class="form-group">
            <label class="form-label" for="settings-csv-file">Importar Arquivo CSV</label>
            <input type="file" id="settings-csv-file" accept=".csv, .txt" style="font-size:12px;">
          </div>
          
          <div style="margin-top:4px;">
            <button class="tool-btn" id="btn-import-csv" style="height:36px;">Importar CSV</button>
          </div>
          
          ${uploadStatus ? `<div style="font-size:12px; padding:8px; border-radius:4px; background-color:var(--color-info-bg); color:var(--color-info);">${uploadStatus}</div>` : ''}

          <div style="border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">
            <h4>📤 Exportar Dados do Dia</h4>
            <p style="font-size:12px; margin-bottom:8px;">Gere e faça o download da planilha das ocorrências consolidadas no dia, com carimbo de auditoria de monitoria.</p>
            <button class="tool-btn" id="btn-export-occurrences" style="background-color:var(--color-success); color:white; height:36px; border:none;">Download CSV Ocorrências</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

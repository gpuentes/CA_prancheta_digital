import './style.css';
import AppModel from './js/model.js';
import * as views from './js/components.js';

// Initialize MVC Model
const model = new AppModel();

// Application controller state
let activeTab = '';
let selectedStudent = null;
let uploadStatus = '';
let isEditingDashboard = false;

// Modal dialog state
let activeModalType = null;
let activeModalItem = null;

// Timer and countdown variables for sync
let syncCountdown = 30;
let syncIntervalId = null;

// Temporary states for occurrences and smart pastes
let patioSavedState = {
  occurrenceLogged: null,
  recurrence: { isRecurrent: false, count: 0 }
};
let activeSmartPasteResult = null;

// Sound generator using Web Audio API (No files required)
function playBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, audioCtx.currentTime); // E5 note
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
    
    // Double beep
    setTimeout(() => {
      const audioCtx2 = new AudioContextClass();
      const osc2 = audioCtx2.createOscillator();
      const gain2 = audioCtx2.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx2.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, audioCtx2.currentTime); // A5 note
      gain2.gain.setValueAtTime(0.05, audioCtx2.currentTime);
      osc2.start();
      osc2.stop(audioCtx2.currentTime + 0.2);
    }, 180);
  } catch (e) {
    console.warn('Audio blocked by browser permissions', e);
  }
}

// Vibration alert using device hardware
function triggerVibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([150, 80, 150]);
  }
}

// Visual screen flash alert for daltonism & audio impaired users
function triggerVisualFlash() {
  const container = document.querySelector('.content-area');
  if (container) {
    container.classList.add('alert-flashing');
    setTimeout(() => {
      container.classList.remove('alert-flashing');
    }, 2500);
  }
}

// Set up CSS global accessibility settings (Font scale & Contrast)
function initA11ySettings() {
  const savedContrast = localStorage.getItem('a11y_contrast') === 'true';
  const savedScale = parseFloat(localStorage.getItem('a11y_scale')) || 1.0;
  
  if (savedContrast) {
    document.documentElement.classList.add('high-contrast');
  }
  document.documentElement.style.setProperty('--font-scale', savedScale);
}

// Primary Render function
function render() {
  const appContainer = document.querySelector('#app');
  if (!model.state.currentUser) {
    // Render Login Screen
    appContainer.innerHTML = views.renderLogin(model.state);
    bindLoginEvents();
    // Stop timers if not logged in
    stopSyncTimer();
    return;
  }

  // Ensure active tab is within permitted tabs for active user role
  const permittedTabs = model.state.settings.customTabs[model.state.currentUser.role] || [];
  if (!activeTab || !permittedTabs.includes(activeTab)) {
    activeTab = permittedTabs[0] || 'a11y';
  }

  // Render main layout shell
  appContainer.innerHTML = views.renderShell(
    model.state,
    activeTab,
    model.state.settings.appTitle,
    model.state.settings.logoUrl
  );
  
  // Render active tab view
  renderActiveTab();
  
  // Bind shell events (navbar, a11y)
  bindShellEvents();

  // Start Sync timer for ticket updates
  startSyncTimer();
}

function renderActiveTab() {
  if (!model.state.currentUser) {
    render();
    return;
  }
  const contentArea = document.querySelector('#tab-content');
  if (!contentArea) return;

  if (activeTab === 'dashboard') {
    contentArea.innerHTML = views.renderDashboard(model.state, isEditingDashboard);
    bindDashboardEvents();
  } else if (activeTab === 'patio') {
    contentArea.innerHTML = views.renderPatio(model.state, selectedStudent, patioSavedState);
    bindPatioEvents();
  } else if (activeTab === 'chamados') {
    contentArea.innerHTML = views.renderChamados(
      model.state, 
      activeSmartPasteResult, 
      { countdown: syncCountdown }
    );
    bindChamadosEvents();
  } else if (activeTab === 'cms') {
    // Default sub-tab inside CMS is students
    if (!window.currentCmsSubTab) window.currentCmsSubTab = 'students';
    contentArea.innerHTML = views.renderCMS(model.state, window.currentCmsSubTab);
    bindCMSEvents();
  } else if (activeTab === 'settings') {
    contentArea.innerHTML = views.renderSettings(model.state, uploadStatus);
    bindSettingsEvents();
  } else if (activeTab === 'a11y') {
    contentArea.innerHTML = views.renderA11y(model.state);
  }

  // If a modal is open, render it
  if (activeModalType) {
    const body = document.body;
    let modalEl = document.querySelector('#cms-modal-overlay');
    if (!modalEl) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = views.renderCMSModal(activeModalType, activeModalItem);
      body.appendChild(wrapper.firstElementChild);
      bindModalEvents();
    }
  }
}

// ---------------------------------------------------------------------
// Event Bindings
// ---------------------------------------------------------------------

function bindLoginEvents() {
  const form = document.querySelector('#login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.querySelector('#login-user').value;
      const pass = document.querySelector('#login-pass').value;
      
      const result = model.login(user, pass);
      if (result.success) {
        selectedStudent = null;
        patioSavedState.occurrenceLogged = null;
        activeTab = '';
        render();
      } else {
        alert(result.message);
      }
    });
  }

  // Quick credentials autologin links
  document.querySelectorAll('.quick-login-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#login-user').value = link.dataset.user;
      document.querySelector('#login-pass').value = link.dataset.pass;
      form.dispatchEvent(new Event('submit'));
    });
  });
}

function bindShellEvents() {
  // Navigation tabs
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      activeTab = item.dataset.tab;
      renderActiveTab();
      
      // Remove active class from all and add to current
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // A11y Font Scaler
  const btnInc = document.querySelector('#btn-inc-font');
  const btnDec = document.querySelector('#btn-dec-font');
  
  if (btnInc && btnDec) {
    btnInc.addEventListener('click', () => {
      let currentScale = parseFloat(document.documentElement.style.getPropertyValue('--font-scale')) || 1.0;
      if (currentScale < 1.4) {
        currentScale += 0.1;
        document.documentElement.style.setProperty('--font-scale', currentScale);
        localStorage.setItem('a11y_scale', currentScale);
        renderActiveTab(); // Refresh active tab elements
      }
    });

    btnDec.addEventListener('click', () => {
      let currentScale = parseFloat(document.documentElement.style.getPropertyValue('--font-scale')) || 1.0;
      if (currentScale > 0.7) {
        currentScale -= 0.1;
        document.documentElement.style.setProperty('--font-scale', currentScale);
        localStorage.setItem('a11y_scale', currentScale);
        renderActiveTab();
      }
    });
  }

  // A11y High Contrast Toggler
  const btnContrast = document.querySelector('#btn-contrast-toggle');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const isHighContrast = document.documentElement.classList.toggle('high-contrast');
      localStorage.setItem('a11y_contrast', isHighContrast);
    });
  }

  // Logout button
  const btnLogout = document.querySelector('#btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      model.logout();
    });
  }
}

function bindDashboardEvents() {
  const btnEditLayout = document.querySelector('#btn-edit-layout');
  if (btnEditLayout) {
    btnEditLayout.addEventListener('click', () => {
      isEditingDashboard = !isEditingDashboard;
      renderActiveTab();
    });
  }

  // If in edit mode, activate drag and drop reordering
  if (isEditingDashboard) {
    const container = document.querySelector('#dashboard-widgets-container');
    const widgets = container.querySelectorAll('.widget');

    widgets.forEach(widget => {
      widget.addEventListener('dragstart', () => {
        widget.classList.add('dragging');
      });

      widget.addEventListener('dragend', () => {
        widget.classList.remove('dragging');
        
        // Save new order
        const currentOrder = Array.from(container.querySelectorAll('.widget')).map(w => w.id);
        model.updateWidgetPositions(currentOrder);
      });
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const dragging = container.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(dragging);
      } else {
        container.insertBefore(dragging, afterElement);
      }
    });
  }
}

// Helper to determine draggable insertion point
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function bindPatioEvents() {
  const searchInput = document.querySelector('#patio-student-search');
  const resultsContainer = document.querySelector('#patio-search-results');

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      if (query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
      }

      const list = model.searchStudents(query);
      if (list.length > 0) {
        resultsContainer.innerHTML = list.map(student => `
          <li class="search-item" data-id="${student.id}">
            <span><b>${student.firstName} ${student.lastName}</b></span>
            <span style="font-size:11px; color:var(--color-text-secondary);">${student.classId}</span>
          </li>
        `).join('');
        resultsContainer.style.display = 'block';
        
        // Bind item selection
        resultsContainer.querySelectorAll('.search-item').forEach(item => {
          item.addEventListener('click', () => {
            const studentId = item.dataset.id;
            selectedStudent = model.state.students.find(s => s.id === studentId);
            
            // Check student recurrence history
            const customCtaLabel = model.state.settings.patioCta.label;
            const recCheck = model.checkRecurrence(studentId, customCtaLabel);
            
            patioSavedState.occurrenceLogged = null;
            patioSavedState.recurrence = recCheck;
            
            resultsContainer.style.display = 'none';
            searchInput.value = '';
            renderActiveTab();
          });
        });
      } else {
        resultsContainer.innerHTML = `<li style="padding:10px; font-size:12px; text-align:center;">Nenhum estudante compatível</li>`;
        resultsContainer.style.display = 'block';
      }
    });

    // Close typeahead when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = 'none';
      }
    });
  }

  // Clear selected student
  const btnClear = document.querySelector('#btn-clear-student');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      selectedStudent = null;
      patioSavedState.occurrenceLogged = null;
      renderActiveTab();
    });
  }

  // CTA buttons event trigger
  const ctaPrimary = document.querySelector('#btn-patio-primary-cta');
  if (ctaPrimary && selectedStudent) {
    ctaPrimary.addEventListener('click', () => {
      const motive = model.state.settings.patioCta.label;
      const occ = model.addOccurrence(selectedStudent.id, [motive], 'Registrado via CTA rápido do pátio', 'Pátio / Recreio');
      patioSavedState.occurrenceLogged = occ;
      renderActiveTab();
    });
  }

  document.querySelectorAll('.patio-cta-button.secondary-action').forEach(btn => {
    if (selectedStudent) {
      btn.addEventListener('click', () => {
        const motive = btn.dataset.motive;
        const occ = model.addOccurrence(selectedStudent.id, [motive], 'Registrado via CTA secundário do pátio', 'Pátio / Recreio');
        patioSavedState.occurrenceLogged = occ;
        renderActiveTab();
      });
    }
  });

  // Custom occurrence button click
  const btnOther = document.querySelector('#btn-patio-other-cta');
  if (btnOther && selectedStudent) {
    btnOther.addEventListener('click', () => {
      const customMotive = prompt('Digite o motivo da ocorrência de pátio:');
      if (customMotive && customMotive.trim()) {
        const occ = model.addOccurrence(selectedStudent.id, [customMotive.trim()], 'Registrado manualmente no pátio', 'Pátio / Recreio');
        patioSavedState.occurrenceLogged = occ;
        renderActiveTab();
      }
    });
  }

  // Reset pátio view
  const btnReset = document.querySelector('#btn-reset-patio');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      selectedStudent = null;
      patioSavedState.occurrenceLogged = null;
      renderActiveTab();
    });
  }
}

function bindChamadosEvents() {
  // Smart Paste parser
  const btnParse = document.querySelector('#btn-smart-paste-parse');
  if (btnParse) {
    btnParse.addEventListener('click', () => {
      const rawText = document.querySelector('#smart-paste-text').value;
      if (!rawText.trim()) {
        alert('Por favor, cole um texto primeiro.');
        return;
      }
      activeSmartPasteResult = model.parseSmartPaste(rawText);
      renderActiveTab();
    });
  }

  // Cancel smart paste preview
  const btnCancelPaste = document.querySelector('#btn-smart-paste-cancel');
  if (btnCancelPaste) {
    btnCancelPaste.addEventListener('click', () => {
      activeSmartPasteResult = null;
      renderActiveTab();
    });
  }

  // Confirm smart paste and save ticket
  const btnConfirmPaste = document.querySelector('#btn-smart-paste-confirm');
  if (btnConfirmPaste) {
    btnConfirmPaste.addEventListener('click', () => {
      const destination = document.querySelector('#smart-paste-destination').value;
      const checkboxes = document.querySelectorAll('.smart-paste-reason:checked');
      const selectedReasons = Array.from(checkboxes).map(cb => cb.value);

      if (selectedReasons.length === 0) {
        alert('Selecione pelo menos um motivo.');
        return;
      }

      // Create ticket
      model.createTicket(
        `[Encaminhamento: ${destination}] - Motivos: ${selectedReasons.join(', ')} - Original: ${activeSmartPasteResult.rawText}`
      );

      // Reset
      activeSmartPasteResult = null;
      const textEl = document.querySelector('#smart-paste-text');
      if (textEl) textEl.value = '';
      
      renderActiveTab();
    });
  }

  // Accept ticket
  document.querySelectorAll('.btn-accept-ticket').forEach(btn => {
    btn.addEventListener('click', () => {
      model.acceptTicket(btn.dataset.id);
      renderActiveTab();
    });
  });

  // Complete ticket
  document.querySelectorAll('.btn-complete-ticket').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = prompt('Insira observações finais sobre a conclusão da ocorrência (opcional):');
      model.completeTicket(btn.dataset.id, null, details);
      renderActiveTab();
    });
  });

  // Simulated background ticket click
  const btnMock = document.querySelector('#btn-trigger-mock-ticket');
  if (btnMock) {
    btnMock.addEventListener('click', () => {
      // Pick a random student
      const randStudent = model.state.students[Math.floor(Math.random() * model.state.students.length)];
      const motives = ['Falta de Uniforme (Blusa)', 'Uso de Celular', 'Conversa em Excesso'];
      const randMotive = motives[Math.floor(Math.random() * motives.length)];
      const destinations = ['Coordenação', 'Orientação', 'Ir embora'];
      const randDest = destinations[Math.floor(Math.random() * destinations.length)];

      model.createTicket(
        `O aluno ${randStudent.firstName} ${randStudent.lastName} da turma ${randStudent.classId} foi enviado para a ${randDest.toLowerCase()} por ${randMotive.toLowerCase()}.`
      );
      
      // Sound + Vibration trigger
      playBeep();
      triggerVibrate();
      triggerVisualFlash();
      
      renderActiveTab();
    });
  }
}

function bindCMSEvents() {
  // Sub-tabs navigation
  const btnStud = document.querySelector('#btn-cms-students');
  const btnUsr = document.querySelector('#btn-cms-users');
  const btnTyp = document.querySelector('#btn-cms-types');

  if (btnStud) {
    btnStud.addEventListener('click', () => { window.currentCmsSubTab = 'students'; renderActiveTab(); });
  }
  if (btnUsr) {
    btnUsr.addEventListener('click', () => { window.currentCmsSubTab = 'users'; renderActiveTab(); });
  }
  if (btnTyp) {
    btnTyp.addEventListener('click', () => { window.currentCmsSubTab = 'occurrenceTypes'; renderActiveTab(); });
  }
  const btnOcc = document.querySelector('#btn-cms-occurrences');
  if (btnOcc) {
    btnOcc.addEventListener('click', () => { window.currentCmsSubTab = 'occurrences'; renderActiveTab(); });
  }

  // CMS Delete Item
  document.querySelectorAll('.btn-delete-cms').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja excluir este item?')) {
        model.deleteCMSItem(btn.dataset.type, btn.dataset.id);
        renderActiveTab();
      }
    });
  });

  // Add Item triggering modal
  const btnAdd = document.querySelector('#btn-cms-add');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      activeModalType = btnAdd.dataset.type;
      activeModalItem = null;
      renderActiveTab();
    });
  }

  // Edit Item triggering modal
  document.querySelectorAll('.btn-edit-cms').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      const list = model.state[type];
      activeModalItem = list.find(item => item.id === id);
      activeModalType = type;
      renderActiveTab();
    });
  });
}

function bindModalEvents() {
  const overlay = document.querySelector('#cms-modal-overlay');
  const form = document.querySelector('#cms-modal-form');
  const closeBtn = document.querySelector('#btn-cms-modal-close');
  const cancelBtn = document.querySelector('#btn-cms-modal-cancel');

  const closeModal = () => {
    activeModalType = null;
    activeModalItem = null;
    overlay.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const payload = {};
      if (activeModalType === 'students') {
        payload.firstName = document.querySelector('#cms-student-first').value;
        payload.lastName = document.querySelector('#cms-student-last').value;
        payload.classId = document.querySelector('#cms-student-class').value;
        payload.photoSeed = payload.firstName.toLowerCase();
      } else if (activeModalType === 'users') {
        payload.name = document.querySelector('#cms-user-name').value;
        payload.login = document.querySelector('#cms-user-login').value;
        payload.password = document.querySelector('#cms-user-pass').value;
        payload.loginWindows = document.querySelector('#cms-user-win').value;
        payload.role = document.querySelector('#cms-user-role').value;
        payload.active = document.querySelector('#cms-user-active').checked;
      } else if (activeModalType === 'occurrenceTypes') {
        payload.label = document.querySelector('#cms-type-label').value;
        payload.severity = document.querySelector('#cms-type-severity').value;
      }

      if (activeModalItem) {
        model.updateCMSItem(activeModalType, activeModalItem.id, payload);
      } else {
        model.addCMSItem(activeModalType, payload);
      }

      closeModal();
      renderActiveTab();
    });
  }
}

function bindSettingsEvents() {
  // Settings White Label submit
  const whiteLabelForm = document.querySelector('#settings-white-label-form');
  if (whiteLabelForm) {
    whiteLabelForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newTitle = document.querySelector('#settings-app-title').value;
      const ctaLabel = document.querySelector('#settings-cta-label').value;
      const ctaBg = document.querySelector('#settings-cta-bg').value;
      const ctaText = document.querySelector('#settings-cta-text').value;

      model.updateSettings({
        appTitle: newTitle,
        patioCta: {
          label: ctaLabel,
          bgColor: ctaBg,
          textColor: ctaText,
          borderRadius: '2px'
        }
      });
      alert('Configurações visuais atualizadas com sucesso!');
      render(); // Complete redraw to apply title
    });
  }

  // Upload Logo base64 converter
  const logoInput = document.querySelector('#settings-app-logo-file');
  if (logoInput) {
    logoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          model.updateSettings({ logoUrl: reader.result });
          alert('Logo atualizado com sucesso!');
          render();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const clearLogo = document.querySelector('#settings-logo-clear');
  if (clearLogo) {
    clearLogo.addEventListener('click', (e) => {
      e.preventDefault();
      model.updateSettings({ logoUrl: '' });
      render();
    });
  }

  // Permissões de Abas form
  const tabsForm = document.querySelector('#settings-tabs-form');
  if (tabsForm) {
    tabsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newTabConfig = {
        monitor: [],
        secretaria: [],
        diretor: [],
        admin: []
      };

      document.querySelectorAll('.role-tab-checkbox:checked').forEach(cb => {
        const role = cb.dataset.role;
        newTabConfig[role].push(cb.value);
      });

      // Always guarantee 'a11y' is available to all roles
      Object.keys(newTabConfig).forEach(role => {
        if (!newTabConfig[role].includes('a11y')) {
          newTabConfig[role].push('a11y');
        }
      });

      model.updateSettings({ customTabs: newTabConfig });
      alert('Configurações de menus de navegação salvas com sucesso!');
      render();
    });
  }

  // CSV Import triggers
  const fileInput = document.querySelector('#settings-csv-file');
  const importBtn = document.querySelector('#btn-import-csv');
  if (importBtn && fileInput) {
    importBtn.addEventListener('click', () => {
      const file = fileInput.files[0];
      if (!file) {
        alert('Selecione um arquivo .csv para importar');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = model.importStudentsCSV(e.target.result);
        if (result.success) {
          uploadStatus = `✓ Sucesso! ${result.count} estudantes carregados.`;
        } else {
          uploadStatus = `❌ Erro na importação: ${result.message}`;
        }
        renderActiveTab();
      };
      reader.readAsText(file, 'UTF-8');
    });
  }

  // Export CSV occurrences trigger
  const exportBtn = document.querySelector('#btn-export-occurrences');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const csvContent = model.exportOccurrencesCSV();
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Ocorrencias_Patio_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// ---------------------------------------------------------------------
// Sync and Auto-Refresh Counters Simulation
// ---------------------------------------------------------------------

function startSyncTimer() {
  if (syncIntervalId) clearInterval(syncIntervalId);

  syncCountdown = 30;
  syncIntervalId = setInterval(() => {
    syncCountdown--;
    if (syncCountdown <= 0) {
      syncCountdown = 30;
      // Simulate WebSocket background updates: occasional mock tickets
      if (model.state.currentUser && Math.random() < 0.25) {
        // 25% chance of background ticket arriving every 30s
        const randStudent = model.state.students[Math.floor(Math.random() * model.state.students.length)];
        const randDest = ['Coordenação', 'Orientação'][Math.floor(Math.random() * 2)];
        
        model.createTicket(
          `Nova notificação: Aluno ${randStudent.firstName} da série ${randStudent.classId} encaminhado para a ${randDest.toLowerCase()} por falta de blusa uniforme.`
        );
        
        // Notify user
        playBeep();
        triggerVibrate();
        triggerVisualFlash();
      }
    }
    
    // Update indicator if present on screen without completely re-rendering view
    const counterEl = document.querySelector('.refresh-indicator span');
    const barEl = document.querySelector('.refresh-bar-fill');
    if (counterEl) {
      counterEl.textContent = `Próxima Sincronização em ${syncCountdown}s`;
    }
    if (barEl) {
      const percent = ((30 - syncCountdown) / 30) * 100;
      barEl.style.width = `${percent}%`;
    }
  }, 1000);
}

function stopSyncTimer() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
  }
}

// ---------------------------------------------------------------------
// App Init
// ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initA11ySettings();
  render();
});

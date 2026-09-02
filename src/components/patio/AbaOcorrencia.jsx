import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title3,
  Text,
  Input,
  Card,
  Button,
  Badge,
  Divider,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components';
import {
  SearchRegular,
  AlertUrgentRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
  EyeRegular,
  ClockRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '650px', margin: '0 auto',
  },
  modeBar: {
    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px',
    backgroundColor: 'var(--bg-sidebar)', borderRadius: '20px', border: '1px solid var(--border-color)',
    marginBottom: '8px', flexWrap: 'wrap',
  },
  searchWrapper: { position: 'relative', width: '100%' },
  resultsList: {
    position: 'absolute', top: '100%', left: '0', right: '0',
    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color-strong)',
    borderRadius: '8px', boxShadow: 'var(--shadow-md)', maxHeight: '300px',
    overflowY: 'auto', zIndex: '50', listStyle: 'none', padding: '0', margin: '4px 0 0 0',
  },
  resultItem: {
    padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    transition: 'background-color 0.15s ease',
    ':hover': { backgroundColor: 'var(--bg-sidebar-hover)' },
  },
  studentCard: {
    display: 'flex', gap: '16px', padding: '20px', position: 'relative',
    animationName: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
    animationDuration: '0.25s', animationFillMode: 'forwards',
  },
  photoWrapper: {
    width: '72px', height: '90px', borderRadius: '8px',
    border: '1px solid var(--border-color)', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'var(--bg-sidebar)', flexShrink: '0',
  },
  photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  studentInfo: {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1', gap: '6px',
  },
  historyBadgeRow: {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginTop: '4px',
  },
  historyIconBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px',
    borderRadius: '12px', fontSize: '12px', fontWeight: '600',
  },
  weeklyFlag: {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    backgroundColor: 'rgba(220,38,38,0.12)', border: '2px solid #dc2626',
    color: '#dc2626', borderRadius: '6px', padding: '4px 10px',
    fontSize: '12px', fontWeight: '700', width: 'fit-content',
    animationName: { '0%': { opacity: 1 }, '50%': { opacity: 0.6 }, '100%': { opacity: 1 } },
    animationDuration: '1.5s', animationIterationCount: 'infinite',
  },
  recurrentBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    backgroundColor: 'rgba(216,59,1,0.1)', border: '1px solid var(--color-warning)',
    color: 'var(--color-warning)', borderRadius: '4px', padding: '2px 8px',
    fontSize: '11px', fontWeight: '600', width: 'fit-content',
  },
  ctaGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  ctaButton: {
    padding: '16px 12px', fontSize: 'var(--font-size-md)', fontWeight: '600', textAlign: 'center',
    cursor: 'pointer', border: '1px solid transparent', borderRadius: '4px', minHeight: '64px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    transition: 'filter 0.2s, transform 0.15s', boxShadow: 'var(--shadow-sm)',
    ':hover': { filter: 'brightness(0.92)', transform: 'translateY(-1px)' },
    ':active': { filter: 'brightness(0.85)', transform: 'translateY(0)' },
  },
  chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
  locationChip: {
    minHeight: '44px', padding: '8px 16px', borderRadius: '22px',
    border: '1px solid var(--border-color-strong)', backgroundColor: 'var(--bg-card)',
    color: 'var(--color-text)', cursor: 'pointer', fontWeight: '600',
    transition: 'all 0.2s',
    ':hover': { backgroundColor: 'var(--bg-sidebar-hover)' },
  },
  locationChipSelected: {
    backgroundColor: 'var(--color-brand)', color: '#fff', borderColor: 'var(--color-brand)',
    ':hover': { backgroundColor: 'var(--color-brand-hover)' },
  },
  stickyFooter: {
    position: 'sticky', bottom: '0', padding: '16px', backgroundColor: 'var(--bg-app)',
    borderTop: '1px solid var(--border-color)', zIndex: 20, display: 'flex', justifyContent: 'center',
    boxShadow: '0 -4px 16px rgba(0,0,0,0.1)', margin: '20px -20px -20px -20px',
  },
  successCard: {
    padding: '24px', textAlign: 'center',
    animationName: { from: { opacity: 0, transform: 'scale(0.96)' }, to: { opacity: 1, transform: 'scale(1)' } },
    animationDuration: '0.3s', animationFillMode: 'forwards',
  },
});

export default function AbaOcorrencia() {
  const styles = useStyles();
  const {
    state, searchStudentsWithShift, checkRecurrence, checkWeeklyRecurrence,
    getTodayStudentOccurrences, addOccurrence, getActiveInterval,
  } = useAuth();

  const [devForcePeak, setDevForcePeak] = useState(null);

  // Active interval based on current time
  const activeInterval = useMemo(() => getActiveInterval(), []);

  const timeInfo = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    let currentShift = hours < 13 ? 'manha' : 'tarde';
    const isPeakMode = devForcePeak !== null
      ? devForcePeak
      : !!activeInterval && (activeInterval.id.startsWith('ENTRADA'));
      
    if (devForcePeak) {
      currentShift = 'manha';
    }
    
    return { currentShift, isPeakMode };
  }, [devForcePeak, activeInterval]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [recurrence, setRecurrence] = useState({ isRecurrent: false, count: 0 });
  const [weeklyRec, setWeeklyRec] = useState({ count: 0, isFlagged: false });
  const [todayOccurrences, setTodayOccurrences] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMotive, setSelectedMotive] = useState('');
  const [observation, setObservation] = useState('');
  const [occurrenceLogged, setOccurrenceLogged] = useState(null);

  // Auto-fill location from active interval
  useEffect(() => {
    if (activeInterval) {
      setSelectedLocation(activeInterval.local_padrao);
    }
  }, [activeInterval]);

  // Suggested motives from active interval (or defaults)
  const suggestedMotives = useMemo(() => {
    if (activeInterval && activeInterval.motivos_sugeridos) {
      return activeInterval.motivos_sugeridos;
    }
    return ['Falta de Uniforme (Blusa)', 'Adorno Inadequado', 'Falta de calçado (Chinelo)', 'Uso de Celular', 'Conversa em Excesso', 'Corrida / Acidente'];
  }, [activeInterval]);

  const results = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    return searchStudentsWithShift(searchQuery, timeInfo.currentShift);
  }, [searchQuery, timeInfo.currentShift, searchStudentsWithShift]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchQuery('');
    setOccurrenceLogged(null);
    setObservation('');
    setSelectedMotive('');

    const ctaLabel = state?.settings?.patioCta?.label || 'FALTA DE UNIFORME';
    const rec = checkRecurrence(student.id, ctaLabel);
    setRecurrence(rec);

    const weekly = checkWeeklyRecurrence(student.id);
    setWeeklyRec(weekly);

    const todays = getTodayStudentOccurrences(student.id);
    setTodayOccurrences(todays);
  };

  const handleConfirm = () => {
    if (!selectedStudent || !selectedMotive || !selectedLocation) return;
    const detailsText = timeInfo.isPeakMode
      ? 'Registro ágil (Horário de Pico - Entrada)'
      : observation ? `Obs: ${observation}` : 'Registrado via Prancheta Pátio';

    const occ = addOccurrence(selectedStudent.id, [selectedMotive], detailsText, selectedLocation);
    setOccurrenceLogged(occ);
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setOccurrenceLogged(null);
    setRecurrence({ isRecurrent: false, count: 0 });
    setWeeklyRec({ count: 0, isFlagged: false });
    setTodayOccurrences([]);
    setSelectedMotive('');
    setObservation('');
    if (activeInterval) setSelectedLocation(activeInterval.local_padrao);
  };

  const commonLocations = useMemo(() => {
    if (!state.rooms) return [];
    return state.rooms.filter(r => r.type !== 'Sala de Aula').slice(0, 8);
  }, [state.rooms]);

  const historyBadges = useMemo(() => {
    if (!todayOccurrences || todayOccurrences.length === 0) return [];
    const allReasons = todayOccurrences.flatMap(o => o.reasons || []);
    const badges = [];
    if (allReasons.some(r => r.toLowerCase().includes('uniforme')))
      badges.push({ icon: '👕', label: 'Uniforme', color: 'var(--color-brand)', bg: 'rgba(0,120,212,0.1)' });
    if (allReasons.some(r => r.toLowerCase().includes('calçado') || r.toLowerCase().includes('crokqs')))
      badges.push({ icon: '🩴', label: 'Calçado', color: '#d83b01', bg: 'rgba(216,59,1,0.1)' });
    if (allReasons.some(r => r.toLowerCase().includes('adorno')))
      badges.push({ icon: '💍', label: 'Adorno', color: '#8764b8', bg: 'rgba(135,100,184,0.1)' });
    if (allReasons.some(r => r.toLowerCase().includes('celular')))
      badges.push({ icon: '📱', label: 'Celular', color: '#d83b01', bg: 'rgba(216,59,1,0.1)' });
    return badges;
  }, [todayOccurrences]);

  const todayObservations = useMemo(() => {
    return todayOccurrences.filter(o => o.details && !o.details.includes('Registro ágil'));
  }, [todayOccurrences]);

  const photoUrl = selectedStudent
    ? `https://api.dicebear.com/8.x/initials/svg?seed=${selectedStudent.firstName}+${selectedStudent.lastName}&backgroundColor=0078d4`
    : null;

  return (
    <div className={styles.container}>
      {/* Indicator & Dev Toggle */}
      <div className={styles.modeBar}>
        <ClockRegular style={{ color: activeInterval ? 'var(--color-warning)' : 'var(--color-brand)' }} />
        <Text size={200} weight="semibold">
          {activeInterval ? `${activeInterval.tipo}` : 'Fluxo Normal (fora do intervalo)'}
        </Text>
        {activeInterval && (
          <Badge appearance="tint" color="warning" size="small">
            {activeInterval.hora_inicio} — {activeInterval.hora_fim}
          </Badge>
        )}
        <Badge appearance="tint" color={timeInfo.currentShift === 'manha' ? 'brand' : 'important'}>
          {timeInfo.currentShift === 'manha' ? 'Manhã' : 'Tarde'}
        </Badge>
        <Button
          appearance="subtle" size="small"
          onClick={() => setDevForcePeak(prev => prev === null ? !timeInfo.isPeakMode : !prev)}
          title="Alternar Modo de Pico (Teste)"
          style={{ fontSize: '11px', padding: '2px 6px', marginLeft: 'auto' }}
        >
          {timeInfo.isPeakMode ? 'Modo Normal' : 'Modo Pico'}
        </Button>
      </div>

      {/* Search */}
      {!selectedStudent && (
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Buscar aluno por nome ou turma..."
            contentBefore={<SearchRegular />}
            value={searchQuery}
            onChange={(e, data) => setSearchQuery(data.value)}
            size="large" style={{ width: '100%' }} autoFocus id="patio-student-search"
          />
          {results.length > 0 && (
            <ul className={styles.resultsList} role="listbox">
              {results.map(student => {
                const weeklyCheck = checkWeeklyRecurrence(student.id);
                return (
                  <li key={student.id} className={styles.resultItem} role="option"
                    onClick={() => handleSelectStudent(student)} tabIndex={0}
                    style={weeklyCheck.isFlagged ? { borderLeft: '3px solid #dc2626' } : {}}
                  >
                    <div>
                      <Text weight="semibold">{student.firstName} {student.lastName}</Text>
                      {weeklyCheck.isFlagged && (
                        <Badge appearance="filled" color="danger" style={{ marginLeft: '8px', fontSize: '10px' }}>
                          ⚠ {weeklyCheck.count}x semana
                        </Badge>
                      )}
                      {student.isEletiva && (
                        <Badge appearance="tint" color="important" style={{ marginLeft: '8px', fontSize: '10px' }}>
                          Eletiva / Turno Oposto
                        </Badge>
                      )}
                    </div>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{student.classId}</Text>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Student Profile & Form */}
      {selectedStudent && !occurrenceLogged && (
        <>
          {/* Weekly Flag Alert */}
          {weeklyRec.isFlagged && (
            <div className={styles.weeklyFlag}>
              <AlertUrgentRegular style={{ fontSize: '16px' }} />
              ⚠ REINCIDENTE SEMANAL — {weeklyRec.count} ocorrências esta semana
            </div>
          )}

          <Card className={styles.studentCard} appearance="outline">
            <div className={styles.photoWrapper}>
              <img className={styles.photoImg} src={photoUrl} alt={`Foto de ${selectedStudent.firstName}`} />
            </div>
            <div className={styles.studentInfo}>
              <div>
                <Title3>{selectedStudent.firstName} {selectedStudent.lastName}</Title3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    Turma: {selectedStudent.classId}
                  </Text>
                  <Badge appearance="tint" color="brand" size="small">
                    {selectedStudent.detectedShift === 'manha' ? 'Manhã' : 'Tarde'}
                  </Badge>
                  {selectedStudent.isEletiva && (
                    <Badge appearance="tint" color="important" size="small">Eletiva</Badge>
                  )}
                </div>
              </div>

              <div className={styles.historyBadgeRow}>
                {historyBadges.map((b, idx) => (
                  <span key={idx} className={styles.historyIconBadge} style={{ backgroundColor: b.bg, color: b.color }}>
                    {b.icon} {b.label}
                  </span>
                ))}

                {todayObservations.length > 0 && (
                  <Popover trapFocus>
                    <PopoverTrigger disableButtonEnhancement>
                      <Button appearance="subtle" size="small" icon={<EyeRegular />} style={{ color: 'var(--color-brand)', fontWeight: '600' }}>
                        Obs ({todayObservations.length})
                      </Button>
                    </PopoverTrigger>
                    <PopoverSurface tabIndex={-1}>
                      <div style={{ padding: '8px', maxWidth: '280px' }}>
                        <Text weight="semibold" block style={{ marginBottom: '6px' }}>Histórico de Observações Hoje</Text>
                        {todayObservations.map((occ, i) => (
                          <div key={i} style={{ marginBottom: '8px', fontSize: '12px' }}>
                            <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                              {new Date(occ.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} — {occ.reasons.join(', ')}
                            </Text>
                            <Text block style={{ marginTop: '2px' }}>{occ.details}</Text>
                          </div>
                        ))}
                      </div>
                    </PopoverSurface>
                  </Popover>
                )}

                {recurrence.isRecurrent && (
                  <div className={styles.recurrentBadge}>
                    <AlertUrgentRegular style={{ fontSize: '12px' }} />
                    RECORRENTE ({recurrence.count}x 30d)
                  </div>
                )}
              </div>
            </div>

            <Button appearance="subtle" icon={<DismissCircleRegular />} onClick={handleReset} aria-label="Limpar" style={{ alignSelf: 'flex-start' }} />
          </Card>

          {/* Location */}
          <div style={{ marginTop: '4px' }}>
            <Text weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>1. Localização Exata</Text>
            {activeInterval ? (
              <div className={styles.chipContainer}>
                <button className={`${styles.locationChip} ${selectedLocation === activeInterval.local_padrao ? styles.locationChipSelected : ''}`}
                  onClick={() => setSelectedLocation(activeInterval.local_padrao)}>
                  📍 {activeInterval.local_padrao} ({activeInterval.tipo})
                </button>
                {!timeInfo.isPeakMode && commonLocations.filter(l => l.name !== activeInterval.local_padrao).slice(0, 4).map(loc => (
                  <button key={loc.id}
                    className={`${styles.locationChip} ${selectedLocation === loc.name ? styles.locationChipSelected : ''}`}
                    onClick={() => setSelectedLocation(loc.name)}>
                    {loc.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.chipContainer} role="radiogroup" aria-label="Localização">
                {commonLocations.map(loc => (
                  <button key={loc.id}
                    className={`${styles.locationChip} ${selectedLocation === loc.name ? styles.locationChipSelected : ''}`}
                    onClick={() => setSelectedLocation(loc.name)} role="radio" aria-checked={selectedLocation === loc.name}>
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Motive — dynamic from interval */}
          <div>
            <Text weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
              2. Motivo {activeInterval && `(${activeInterval.tipo})`}
            </Text>
            <div className={styles.ctaGrid}>
              {suggestedMotives.map((motive, idx) => (
                <button key={motive} className={styles.ctaButton}
                  style={{
                    backgroundColor: selectedMotive === motive ? 'var(--color-brand)' : (idx === 0 ? '#107c41' : 'var(--bg-card)'),
                    color: selectedMotive === motive ? '#fff' : (idx === 0 ? '#fff' : 'var(--color-text)'),
                    borderColor: idx === 0 ? 'transparent' : 'var(--border-color-strong)',
                    gridColumn: idx === 0 ? '1 / -1' : undefined,
                    opacity: selectedMotive && selectedMotive !== motive ? 0.6 : 1,
                  }}
                  onClick={() => setSelectedMotive(motive)}
                >
                  {motive}
                </button>
              ))}

              {/* Sempre mostrar "Outro" */}
              {!suggestedMotives.includes('Outro / Observação') && (
                <button className={styles.ctaButton}
                  style={{
                    backgroundColor: selectedMotive === 'Outro / Observação' ? 'var(--color-brand)' : 'var(--bg-card)',
                    color: selectedMotive === 'Outro / Observação' ? '#fff' : 'var(--color-text)',
                    borderColor: 'var(--border-color-strong)',
                    opacity: selectedMotive && selectedMotive !== 'Outro / Observação' ? 0.6 : 1,
                  }}
                  onClick={() => setSelectedMotive('Outro / Observação')}
                >
                  📝 Outro / Observação
                </button>
              )}
            </div>
          </div>

          {/* Observations */}
          {!timeInfo.isPeakMode && selectedMotive && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Text weight="semibold">3. Observações (Opcional)</Text>
              <Textarea
                placeholder="Descreva detalhes da ocorrência..."
                size="large" resize="vertical" rows={2}
                value={observation} onChange={(e, data) => setObservation(data.value)}
              />
            </div>
          )}

          {/* Sticky Confirm */}
          <div className={styles.stickyFooter}>
            <Button
              appearance="primary" size="large"
              style={{ width: '100%', minHeight: '52px', fontSize: '16px' }}
              disabled={!selectedLocation || !selectedMotive}
              onClick={handleConfirm}
            >
              Confirmar Ocorrência
            </Button>
          </div>
        </>
      )}

      {/* Success */}
      {occurrenceLogged && (
        <Card className={styles.successCard} appearance="filled-alternative">
          <CheckmarkCircleRegular style={{ fontSize: '48px', color: 'var(--color-success)', marginBottom: '12px' }} />
          <Title3>Ocorrência Registrada!</Title3>
          <Text block style={{ marginTop: '8px', color: 'var(--color-text-secondary)' }}>
            {selectedStudent.firstName} {selectedStudent.lastName} — {occurrenceLogged.reasons.join(', ')}
          </Text>
          <Divider style={{ margin: '16px 0' }} />
          <Button appearance="primary" size="large" onClick={handleReset} style={{ width: '100%' }}>
            Registrar Nova Ocorrência
          </Button>
        </Card>
      )}
    </div>
  );
}

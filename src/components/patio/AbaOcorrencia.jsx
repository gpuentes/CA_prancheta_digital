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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '650px',
    margin: '0 auto',
  },
  modeBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
    marginBottom: '8px',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
  },
  resultsList: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color-strong)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-md)',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: '50',
    listStyle: 'none',
    padding: '0',
    margin: '4px 0 0 0',
  },
  resultItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
    },
  },
  studentCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    position: 'relative',
    animationName: {
      from: { opacity: 0, transform: 'translateY(8px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.25s',
    animationFillMode: 'forwards',
  },
  photoWrapper: {
    width: '72px',
    height: '90px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-sidebar)',
    flexShrink: '0',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  studentInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '1',
    gap: '6px',
  },
  historyBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
  },
  historyIconBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  recurrentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'rgba(216, 59, 1, 0.1)',
    border: '1px solid var(--color-warning)',
    color: 'var(--color-warning)',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '600',
    width: 'fit-content',
  },
  ctaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  ctaButton: {
    padding: '16px 12px',
    fontSize: 'var(--font-size-md)',
    fontWeight: '600',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid transparent',
    borderRadius: '4px',
    minHeight: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'filter 0.2s, transform 0.15s',
    boxShadow: 'var(--shadow-sm)',
    ':hover': {
      filter: 'brightness(0.92)',
      transform: 'translateY(-1px)',
    },
    ':active': {
      filter: 'brightness(0.85)',
      transform: 'translateY(0)',
    },
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  locationChip: {
    minHeight: '44px',
    padding: '8px 16px',
    borderRadius: '22px',
    border: '1px solid var(--border-color-strong)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
    },
  },
  locationChipSelected: {
    backgroundColor: 'var(--color-brand)',
    color: '#fff',
    borderColor: 'var(--color-brand)',
    ':hover': {
      backgroundColor: 'var(--color-brand-hover)',
    },
  },
  stickyFooter: {
    position: 'sticky',
    bottom: '0',
    padding: '16px',
    backgroundColor: 'var(--bg-app)',
    borderTop: '1px solid var(--border-color)',
    zIndex: 20,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
    margin: '20px -20px -20px -20px',
  },
  successCard: {
    padding: '24px',
    textAlign: 'center',
    animationName: {
      from: { opacity: 0, transform: 'scale(0.96)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
});

export default function AbaOcorrencia() {
  const styles = useStyles();
  const {
    state,
    searchStudentsWithShift,
    checkRecurrence,
    getTodayStudentOccurrences,
    addOccurrence,
  } = useAuth();

  const [devForcePeak, setDevForcePeak] = useState(null);

  const timeInfo = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMins = hours * 60 + minutes;

    const currentShift = hours < 13 ? 'manha' : 'tarde';
    const isPeakWindow = totalMins >= 390 && totalMins <= 435;
    const isPeakMode = devForcePeak !== null ? devForcePeak : isPeakWindow;

    return { currentShift, isPeakMode, isPeakWindow };
  }, [devForcePeak]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [recurrence, setRecurrence] = useState({ isRecurrent: false, count: 0 });
  const [todayOccurrences, setTodayOccurrences] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMotive, setSelectedMotive] = useState('');
  const [observation, setObservation] = useState('');
  const [occurrenceLogged, setOccurrenceLogged] = useState(null);

  useEffect(() => {
    if (timeInfo.isPeakMode) {
      setSelectedLocation('( ENTRADA )');
    } else if (selectedLocation === '( ENTRADA )') {
      setSelectedLocation('');
    }
  }, [timeInfo.isPeakMode]);

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
    if (!timeInfo.isPeakMode) setSelectedLocation('');

    const ctaLabel = state?.settings?.patioCta?.label || 'FALTA DE UNIFORME';
    const rec = checkRecurrence(student.id, ctaLabel);
    setRecurrence(rec);

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
    setTodayOccurrences([]);
    setSelectedMotive('');
    if (!timeInfo.isPeakMode) setSelectedLocation('');
    setObservation('');
  };

  const commonLocations = useMemo(() => {
    if (!state.rooms) return [];
    return state.rooms.filter(r => r.type !== 'Sala de Aula').slice(0, 8);
  }, [state.rooms]);

  const historyBadges = useMemo(() => {
    if (!todayOccurrences || todayOccurrences.length === 0) return [];
    const allReasons = todayOccurrences.flatMap(o => o.reasons || []);
    const badges = [];

    if (allReasons.some(r => r.toLowerCase().includes('uniforme'))) {
      badges.push({ icon: '👕', label: 'Uniforme', color: 'var(--color-brand)', bg: 'rgba(0,120,212,0.1)' });
    }
    if (allReasons.some(r => r.toLowerCase().includes('calçado') || r.toLowerCase().includes('crokqs'))) {
      badges.push({ icon: '🩴', label: 'Calçado', color: '#d83b01', bg: 'rgba(216,59,1,0.1)' });
    }
    if (allReasons.some(r => r.toLowerCase().includes('adorno'))) {
      badges.push({ icon: '💍', label: 'Adorno', color: '#8764b8', bg: 'rgba(135,100,184,0.1)' });
    }

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
        <ClockRegular style={{ color: timeInfo.isPeakMode ? 'var(--color-warning)' : 'var(--color-brand)' }} />
        <Text size={200} weight="semibold">
          {timeInfo.isPeakMode ? 'Horário de Pico (Entrada)' : 'Fluxo Normal'}
        </Text>
        <Badge appearance="tint" color={timeInfo.currentShift === 'manha' ? 'brand' : 'important'}>
          {timeInfo.currentShift === 'manha' ? 'Manhã' : 'Tarde'}
        </Badge>
        <Button
          appearance="subtle"
          size="small"
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
            size="large"
            style={{ width: '100%' }}
            autoFocus
            id="patio-student-search"
          />
          {results.length > 0 && (
            <ul className={styles.resultsList} role="listbox">
              {results.map(student => (
                <li
                  key={student.id}
                  className={styles.resultItem}
                  role="option"
                  onClick={() => handleSelectStudent(student)}
                  tabIndex={0}
                >
                  <div>
                    <Text weight="semibold">{student.firstName} {student.lastName}</Text>
                    {student.isEletiva && (
                      <Badge appearance="tint" color="important" style={{ marginLeft: '8px', fontSize: '10px' }}>
                        Eletiva / Turno Oposto
                      </Badge>
                    )}
                  </div>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{student.classId}</Text>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Student Profile & Form */}
      {selectedStudent && !occurrenceLogged && (
        <>
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

              {/* History Badges & Observation Popover */}
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
            {timeInfo.isPeakMode ? (
              <div className={styles.chipContainer}>
                <button className={`${styles.locationChip} ${styles.locationChipSelected}`}>
                  📍 ( ENTRADA ) — Pico de Entrada
                </button>
              </div>
            ) : (
              <div className={styles.chipContainer} role="radiogroup" aria-label="Localização">
                {commonLocations.map(loc => (
                  <button
                    key={loc.id}
                    className={`${styles.locationChip} ${selectedLocation === loc.name ? styles.locationChipSelected : ''}`}
                    onClick={() => setSelectedLocation(loc.name)}
                    role="radio"
                    aria-checked={selectedLocation === loc.name}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Motive */}
          <div>
            <Text weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
              2. Motivo {timeInfo.isPeakMode && '(Botões Rápidos)'}
            </Text>
            <div className={styles.ctaGrid}>
              <button
                className={styles.ctaButton}
                style={{
                  backgroundColor: selectedMotive === 'FALTA DE UNIFORME' ? 'var(--color-brand)' : '#107c41',
                  color: '#ffffff',
                  gridColumn: '1 / -1',
                  opacity: selectedMotive && selectedMotive !== 'FALTA DE UNIFORME' ? 0.6 : 1,
                }}
                onClick={() => setSelectedMotive('FALTA DE UNIFORME')}
              >
                👕 FALTA DE UNIFORME
              </button>

              <button
                className={styles.ctaButton}
                style={{
                  backgroundColor: selectedMotive === 'Adorno Inadequado' ? 'var(--color-brand)' : 'var(--bg-card)',
                  color: selectedMotive === 'Adorno Inadequado' ? '#fff' : 'var(--color-text)',
                  borderColor: 'var(--border-color-strong)',
                }}
                onClick={() => setSelectedMotive('Adorno Inadequado')}
              >
                💍 Adorno Inadequado
              </button>

              <button
                className={styles.ctaButton}
                style={{
                  backgroundColor: selectedMotive === 'Falta de calçado (Crokqs)' ? 'var(--color-brand)' : 'var(--bg-card)',
                  color: selectedMotive === 'Falta de calçado (Crokqs)' ? '#fff' : 'var(--color-text)',
                  borderColor: 'var(--border-color-strong)',
                }}
                onClick={() => setSelectedMotive('Falta de calçado (Crokqs)')}
              >
                🩴 Falta de Calçado
              </button>

              {!timeInfo.isPeakMode && (
                <>
                  <button
                    className={styles.ctaButton}
                    style={{
                      backgroundColor: selectedMotive === 'Uso de Celular' ? 'var(--color-brand)' : 'var(--bg-card)',
                      color: selectedMotive === 'Uso de Celular' ? '#fff' : 'var(--color-text)',
                      borderColor: 'var(--border-color-strong)',
                    }}
                    onClick={() => setSelectedMotive('Uso de Celular')}
                  >
                    📱 Uso de Celular
                  </button>

                  <button
                    className={styles.ctaButton}
                    style={{
                      backgroundColor: selectedMotive === 'Conversa em Excesso' ? 'var(--color-brand)' : 'var(--bg-card)',
                      color: selectedMotive === 'Conversa em Excesso' ? '#fff' : 'var(--color-text)',
                      borderColor: 'var(--border-color-strong)',
                    }}
                    onClick={() => setSelectedMotive('Conversa em Excesso')}
                  >
                    🗣️ Conversa Excesso
                  </button>

                  <button
                    className={styles.ctaButton}
                    style={{
                      backgroundColor: selectedMotive === 'Corrida / Acidente' ? 'var(--color-brand)' : 'var(--bg-card)',
                      color: selectedMotive === 'Corrida / Acidente' ? '#fff' : 'var(--color-text)',
                      borderColor: 'var(--border-color-strong)',
                    }}
                    onClick={() => setSelectedMotive('Corrida / Acidente')}
                  >
                    🏃 Corrida / Acidente
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Observations */}
          {!timeInfo.isPeakMode && selectedMotive && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Text weight="semibold">3. Observações (Opcional)</Text>
              <Textarea
                placeholder="Descreva detalhes da ocorrência..."
                size="large"
                resize="vertical"
                rows={2}
                value={observation}
                onChange={(e, data) => setObservation(data.value)}
              />
            </div>
          )}

          {/* Sticky Confirm */}
          <div className={styles.stickyFooter}>
            <Button
              appearance="primary"
              size="large"
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

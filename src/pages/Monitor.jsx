import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Input,
  Card,
  Button,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  SearchRegular,
  AlertUrgentRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
  PersonRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
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
    borderRadius: '6px',
    boxShadow: 'var(--shadow-md)',
    maxHeight: '280px',
    overflowY: 'auto',
    zIndex: '10',
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
    gap: '20px',
    padding: '20px',
    animationName: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  photoWrapper: {
    width: '80px',
    height: '100px',
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
  },
  recurrentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'var(--color-warning-bg)',
    border: '1px solid var(--color-warning)',
    color: 'var(--color-warning)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '6px',
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
    borderRadius: '2px',
    minHeight: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'filter 0.2s, transform 0.15s',
    boxShadow: 'var(--shadow-sm)',
    ':hover': {
      filter: 'brightness(0.9)',
      transform: 'translateY(-1px)',
    },
    ':active': {
      filter: 'brightness(0.8)',
      transform: 'translateY(0)',
    },
  },
  successCard: {
    padding: '20px',
    textAlign: 'center',
    animationName: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
});

export default function Monitor() {
  const styles = useStyles();
  const { state, searchStudents, checkRecurrence, addOccurrence } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [recurrence, setRecurrence] = useState({ isRecurrent: false, count: 0 });
  const [occurrenceLogged, setOccurrenceLogged] = useState(null);

  const ctaLabel = state?.settings?.patioCta?.label || 'FALTA DE UNIFORME';
  const ctaBg = state?.settings?.patioCta?.bgColor || '#107c41';
  const ctaText = state?.settings?.patioCta?.textColor || '#ffffff';

  const secondaryMotives = [
    'Uso de Celular',
    'Conversa em Excesso',
    'Corrida / Acidente',
    'Adorno Inadequado',
    'Atraso de Entrada',
  ];

  // Search results
  const results = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    return searchStudents(searchQuery);
  }, [searchQuery, searchStudents]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchQuery('');
    setOccurrenceLogged(null);
    const rec = checkRecurrence(student.id, ctaLabel);
    setRecurrence(rec);
  };

  const handleCTA = (motive) => {
    if (!selectedStudent) return;
    const occ = addOccurrence(selectedStudent.id, [motive], `Registrado via CTA rápido do pátio`, 'Pátio / Recreio');
    setOccurrenceLogged(occ);
  };

  const handleCustomCTA = () => {
    const motive = prompt('Digite o motivo da ocorrência:');
    if (motive && motive.trim()) {
      handleCTA(motive.trim());
    }
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setOccurrenceLogged(null);
    setRecurrence({ isRecurrent: false, count: 0 });
  };

  const photoUrl = selectedStudent
    ? `https://api.dicebear.com/8.x/initials/svg?seed=${selectedStudent.firstName}+${selectedStudent.lastName}&backgroundColor=0078d4`
    : null;

  return (
    <div className={styles.container}>
      <Title2>Novo Chamado (Pátio)</Title2>

      {/* ─── Search ─── */}
      {!selectedStudent && (
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Buscar aluno (mín. 2 letras)..."
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
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectStudent(student)}
                  tabIndex={0}
                >
                  <Text weight="semibold">{student.firstName} {student.lastName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{student.classId}</Text>
                </li>
              ))}
            </ul>
          )}
          {searchQuery.length >= 2 && results.length === 0 && (
            <ul className={styles.resultsList}>
              <li style={{ padding: '12px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                Nenhum aluno encontrado
              </li>
            </ul>
          )}
        </div>
      )}

      {/* ─── Student Profile ─── */}
      {selectedStudent && !occurrenceLogged && (
        <>
          <Card className={styles.studentCard} appearance="outline">
            <div className={styles.photoWrapper}>
              <img className={styles.photoImg} src={photoUrl} alt={`Foto de ${selectedStudent.firstName}`} />
            </div>
            <div className={styles.studentInfo}>
              <div>
                <Title3>{selectedStudent.firstName} {selectedStudent.lastName}</Title3>
                <Text block style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Turma: {selectedStudent.classId}
                </Text>
              </div>
              {recurrence.isRecurrent && (
                <div className={styles.recurrentBadge}>
                  <AlertUrgentRegular style={{ fontSize: '14px' }} />
                  RECORRENTE ({recurrence.count}x nos últimos 30 dias)
                </div>
              )}
            </div>
            <Button
              appearance="subtle"
              icon={<DismissCircleRegular />}
              onClick={handleReset}
              aria-label="Limpar seleção"
              style={{ alignSelf: 'flex-start' }}
            />
          </Card>

          {/* ─── CTAs ─── */}
          <div className={styles.ctaGrid}>
            <button
              className={styles.ctaButton}
              style={{
                backgroundColor: ctaBg,
                color: ctaText,
                gridColumn: '1 / -1',
              }}
              onClick={() => handleCTA(ctaLabel)}
              id="btn-patio-primary-cta"
            >
              {ctaLabel}
            </button>
            {secondaryMotives.map(motive => (
              <button
                key={motive}
                className={styles.ctaButton}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--border-color-strong)',
                }}
                onClick={() => handleCTA(motive)}
              >
                {motive}
              </button>
            ))}
            <button
              className={styles.ctaButton}
              style={{
                backgroundColor: 'var(--color-text-secondary)',
                color: '#fff',
              }}
              onClick={handleCustomCTA}
              id="btn-patio-other-cta"
            >
              Outro motivo...
            </button>
          </div>
        </>
      )}

      {/* ─── Success Confirmation ─── */}
      {occurrenceLogged && (
        <Card className={styles.successCard} appearance="filled-alternative">
          <CheckmarkCircleRegular style={{ fontSize: '48px', color: 'var(--color-success)', marginBottom: '12px' }} />
          <Title3>Ocorrência Registrada!</Title3>
          <Text block style={{ marginTop: '8px', color: 'var(--color-text-secondary)' }}>
            {selectedStudent.firstName} {selectedStudent.lastName} — {occurrenceLogged.reasons.join(', ')}
          </Text>
          <Text block size={200} style={{ marginTop: '4px', color: 'var(--color-text-secondary)' }}>
            {new Date(occurrenceLogged.date).toLocaleString('pt-BR')}
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

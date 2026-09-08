import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  Title2,
  Text,
  Card,
} from '@fluentui/react-components';
import {
  TableRegular,
  ClockRegular,
  PersonRegular,
} from '@fluentui/react-icons';
import { useAuth } from '../contexts/AuthContext.jsx';
import ClassroomSelector from '../modules/classroom/ClassroomSelector.jsx';
import ClassroomMap from '../modules/classroom/ClassroomMap.jsx';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '960px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-brand)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '20px',
    flexShrink: '0',
  },
  mapCard: {
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    boxShadow: 'var(--shadow-sm)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 40px',
    gap: '16px',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '64px',
    opacity: '0.3',
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border-color)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    fontWeight: '500',
  },
});

const TURNO_LABEL = { MANHA: 'Manhã', TARDE: 'Tarde' };

export default function MapaSala() {
  const styles = useStyles();
  const { state } = useAuth();

  const turmas = useMemo(() => state.classrooms || [], [state.classrooms]);

  const defaultId = useMemo(() => {
    // Se o usuário logado for um terminal (sala de aula), seleciona a turma daquela sala física
    if (state.currentUser?.role === 'terminal' && state.currentUser?.login) {
      const matchingRoom = turmas.find(t => t.sala_numero === state.currentUser.login);
      if (matchingRoom) return matchingRoom.turma_id;
    }
    const first = turmas.find(t => !t.pendente);
    return first?.turma_id || turmas[0]?.turma_id || '6MA';
  }, [turmas, state.currentUser]);

  const [selectedId, setSelectedId] = useState(defaultId);

  const turma = useMemo(
    () => turmas.find(t => t.turma_id === selectedId),
    [turmas, selectedId]
  );

  const totalAlunos = turma?.assentos.filter(a => a.status !== 'VAZIO').length || 0;
  const presentes = turma?.assentos.filter(a => a.status === 'OCUPADO' || a.status === 'PRESENTE').length || 0;
  const ocorrencias = turma?.assentos.filter(a => a.status === 'OCORRENCIA').length || 0;
  const ausentes = turma?.assentos.filter(a => a.status === 'AUSENTE').length || 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <TableRegular />
          </div>
          <div>
            <Title2>Mapa de Sala</Title2>
            <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
              Planta de carteiras com status em tempo real
            </Text>
          </div>
        </div>

        {/* Stats da turma ativa */}
        {turma && !turma.pendente && (
          <div className={styles.statsRow}>
            <span className={styles.statChip}>
              <PersonRegular style={{ fontSize: '14px' }} />
              {totalAlunos} alunos
            </span>
            <span className={styles.statChip} style={{ borderColor: '#107c10', color: '#107c10' }}>
              ✓ {presentes} presentes
            </span>
            {ocorrencias > 0 && (
              <span className={styles.statChip} style={{ borderColor: '#dc2626', color: '#dc2626' }}>
                ⚠ {ocorrencias} ocorrência{ocorrencias > 1 ? 's' : ''}
              </span>
            )}
            {ausentes > 0 && (
              <span className={styles.statChip} style={{ borderColor: '#9ca3af', color: '#9ca3af' }}>
                ✗ {ausentes} ausente{ausentes > 1 ? 's' : ''}
              </span>
            )}
            <span className={styles.statChip}>
              <ClockRegular style={{ fontSize: '14px' }} />
              {turma.serie} — {TURNO_LABEL[turma.turno]} {turma.turma}
            </span>
          </div>
        )}
      </div>

      {/* Seletor */}
      <ClassroomSelector
        turmas={turmas}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {/* Mapa ou Estado Vazio */}
      <div className={styles.mapCard}>
        {!turma || turma.pendente ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📋</span>
            <Text size={500} weight="semibold">Mapeamento pendente</Text>
            <Text size={300}>
              A planta desta turma ainda não foi enviada.<br />
              Assim que a foto chegar, o seed será atualizado automaticamente.
            </Text>
            <Text size={200} style={{ opacity: 0.6 }}>
              Turmas faltantes: 6º TB · 7º MB · 8º TB
            </Text>
          </div>
        ) : (
          <ClassroomMap turma={turma} />
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { makeStyles, Text, Badge } from '@fluentui/react-components';
import { useAuth } from '../../contexts/AuthContext.jsx';
import SeatCard from './SeatCard.jsx';
import SeatPopover from './SeatPopover.jsx';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  teacherDesk: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  deskBadge: {
    padding: '8px 32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-brand)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    boxShadow: '0 2px 8px rgba(0,120,212,0.3)',
  },
  orientationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
  portaLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  grid: {
    display: 'grid',
    gap: '8px',
    width: '100%',
  },
  rowHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: 'var(--color-text-secondary)',
    fontWeight: '600',
    minWidth: '20px',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '12px 0 0',
    borderTop: '1px solid var(--border-color)',
    marginTop: '8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: '0',
  },
});

const LEGEND_ITEMS = [
  { color: '#107c10', label: 'Presente' },
  { color: '#f59e0b', label: 'Advertência' },
  { color: '#dc2626', label: 'Ocorrência' },
  { color: '#9ca3af', label: 'Ausente' },
  { color: 'transparent', label: 'Vazio', border: '1px solid #9ca3af' },
];

/**
 * @param {{ turma: import('../../data/classroomSeats').Turma }} props
 */
export default function ClassroomMap({ turma }) {
  const styles = useStyles();
  const { updateSeatStatus, state } = useAuth();

  // Buscar turma sempre atualizada do state (reativo a mudanças)
  const liveTurma = React.useMemo(() => {
    if (!state.classrooms) return turma;
    return state.classrooms.find(c => c.turma_id === turma.turma_id) || turma;
  }, [state.classrooms, turma]);

  const { grid, assentos } = liveTurma;
  const portaLado = grid.porta === 'RIGHT' ? 'right' : 'left';

  // Organizar assentos em matriz [linha][coluna]
  const matrix = React.useMemo(() => {
    const mat = {};
    assentos.forEach(a => {
      if (!mat[a.linha]) mat[a.linha] = {};
      mat[a.linha][a.coluna] = a;
    });
    return mat;
  }, [assentos]);

  const handleStatusChange = React.useCallback((posicao, newStatus) => {
    updateSeatStatus(liveTurma.turma_id, posicao, newStatus);
  }, [updateSeatStatus, liveTurma.turma_id]);

  return (
    <div className={styles.wrapper}>
      {/* Mesa do Professor */}
      <div className={styles.teacherDesk}>
        <div className={styles.deskBadge}>🖥 Mesa do Professor — Lousa</div>
      </div>

      {/* Orientação porta */}
      <div className={styles.orientationRow}>
        {portaLado === 'left' ? (
          <>
            <span className={styles.portaLabel}>🚪 Porta</span>
            <span className={styles.portaLabel} style={{ opacity: 0.4 }}>Janelas →</span>
          </>
        ) : (
          <>
            <span className={styles.portaLabel} style={{ opacity: 0.4 }}>← Janelas</span>
            <span className={styles.portaLabel}>Porta 🚪</span>
          </>
        )}
      </div>

      {/* Grade de Carteiras */}
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${grid.colunas}, 1fr)` }}
        role="grid"
        aria-label={`Mapa de carteiras da turma ${liveTurma.turma_id}`}
      >
        {Array.from({ length: grid.linhas }, (_, li) => li + 1).map(linha => (
          Array.from({ length: grid.colunas }, (_, ci) => ci + 1).map(coluna => {
            const assento = matrix[linha]?.[coluna] || {
              posicao: `C${coluna}_L${linha}`,
              coluna,
              linha,
              aluno_nome: null,
              status: 'VAZIO',
            };
            return (
              <div key={assento.posicao} role="gridcell" aria-label={assento.posicao}>
                <SeatPopover
                  assento={assento}
                  turmaId={liveTurma.turma_id}
                  onStatusChange={handleStatusChange}
                >
                  <SeatCard assento={assento} />
                </SeatPopover>
              </div>
            );
          })
        ))}
      </div>

      {/* Legenda */}
      <div className={styles.legend} role="note" aria-label="Legenda de status">
        {LEGEND_ITEMS.map(item => (
          <span key={item.label} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: item.color, border: item.border || 'none' }}
            />
            {item.label}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
          {assentos.filter(a => a.status !== 'VAZIO').length} alunos mapeados
        </span>
      </div>
    </div>
  );
}

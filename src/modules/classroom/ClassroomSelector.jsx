import React from 'react';
import { makeStyles, Text, Select, Badge } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    padding: '16px 20px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '120px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    color: 'var(--color-text-secondary)',
  },
  select: {
    minWidth: '120px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingLeft: '16px',
    borderLeft: '2px solid var(--border-color)',
    marginLeft: '8px',
  },
  badgeRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  conselheiro: {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
  },
});

const SERIES = ['6', '7', '8'];
const TURNOS = [
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
];

/**
 * @param {{
 *   turmas: import('../../data/classroomSeats').Turma[],
 *   selectedId: string,
 *   onSelect: (turmaId: string) => void,
 * }} props
 */
export default function ClassroomSelector({ turmas, selectedId, onSelect }) {
  const styles = useStyles();

  const selectedTurma = turmas.find(t => t.turma_id === selectedId);

  // Derive current selections from selectedId (e.g. '7TA' → serie=7, turno=T, turma=A)
  const deriveSerie = (id) => id?.replace(/[^0-9]/g, '') || '6';
  const deriveTurno = (id) => {
    if (!id) return 'MANHA';
    return id.includes('M') ? 'MANHA' : 'TARDE';
  };
  const deriveTurma = (id) => {
    if (!id) return 'A';
    const match = id.match(/[A-C]$/);
    return match ? match[0] : 'A';
  };

  const [serie, setSerie] = React.useState(() => deriveSerie(selectedId));
  const [turno, setTurno] = React.useState(() => deriveTurno(selectedId));
  const [turmaLetra, setTurmaLetra] = React.useState(() => deriveTurma(selectedId));

  // Available turma letters for the current serie+turno
  const available = React.useMemo(() => {
    return turmas
      .filter(t => {
        const s = t.turma_id.replace(/[^0-9]/g, '');
        const tn = t.turma_id.includes('M') ? 'MANHA' : 'TARDE';
        return s === serie && tn === turno;
      })
      .map(t => t.turma);
  }, [turmas, serie, turno]);

  // Auto-select first available if current letter not present
  React.useEffect(() => {
    if (available.length && !available.includes(turmaLetra)) {
      setTurmaLetra(available[0]);
    }
  }, [available]);

  // Resolve turmaId and call onSelect on any change
  React.useEffect(() => {
    const turnoCode = turno === 'MANHA' ? 'M' : 'T';
    const id = `${serie}${turnoCode}${turmaLetra}`;
    if (id !== selectedId) onSelect(id);
  }, [serie, turno, turmaLetra]);

  const isPendente = selectedTurma?.pendente;

  return (
    <div className={styles.container}>
      {/* Série */}
      <div className={styles.group}>
        <span className={styles.label}>Série</span>
        <Select
          className={styles.select}
          value={serie}
          onChange={(_, data) => setSerie(data.value)}
          aria-label="Selecionar série"
        >
          {SERIES.map(s => (
            <option key={s} value={s}>{s}º Ano</option>
          ))}
        </Select>
      </div>

      {/* Turno */}
      <div className={styles.group}>
        <span className={styles.label}>Turno</span>
        <Select
          className={styles.select}
          value={turno}
          onChange={(_, data) => setTurno(data.value)}
          aria-label="Selecionar turno"
        >
          {TURNOS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>
      </div>

      {/* Turma */}
      <div className={styles.group}>
        <span className={styles.label}>Turma</span>
        <Select
          className={styles.select}
          value={turmaLetra}
          onChange={(_, data) => setTurmaLetra(data.value)}
          aria-label="Selecionar turma"
        >
          {['A', 'B', 'C'].map(l => {
            const exists = available.includes(l);
            return (
              <option key={l} value={l} disabled={!exists}>
                {l}{!exists ? ' (indisponível)' : ''}
              </option>
            );
          })}
        </Select>
      </div>

      {/* Info da turma selecionada */}
      {selectedTurma && (
        <div className={styles.info}>
          <div className={styles.badgeRow}>
            <Badge
              appearance="filled"
              color={isPendente ? 'warning' : 'success'}
              size="medium"
            >
              {isPendente ? '⚠ Mapeamento pendente' : `✓ ${selectedTurma.assentos.filter(a => a.status !== 'VAZIO').length} alunos`}
            </Badge>
            <Badge appearance="outline" color="brand" size="medium">
              Sala {selectedTurma.sala_numero}
            </Badge>
          </div>
          {selectedTurma.conselheiro && (
            <span className={styles.conselheiro}>
              Prof. Conselheiro: <strong>{selectedTurma.conselheiro}</strong>
            </span>
          )}
          {selectedTurma.representantes?.length > 0 && (
            <span className={styles.conselheiro}>
              Representantes: {selectedTurma.representantes.join(' e ')}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

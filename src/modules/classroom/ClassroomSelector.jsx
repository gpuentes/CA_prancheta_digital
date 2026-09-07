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

const getBaseSerie = (id) => {
  if (id === '2EM_ITIN_HUMANAS') return '2EM_ITIN';
  if (id.includes('EM')) return id.split('_')[0];
  return id.replace(/[^0-9]/g, '');
};

const getSerieLabel = (base) => {
  if (base === '2EM_ITIN') return 'Itinerários (2º EM)';
  if (base.includes('EM')) return `${base.charAt(0)}º EM`;
  return `${base}º Ano`;
};

const getTurmaLetra = (id) => {
  if (id === '2EM_ITIN_HUMANAS') return 'HUMANAS';
  if (id.includes('EM')) return id.split('_')[1];
  const match = id.match(/[A-C]$/);
  return match ? match[0] : 'A';
};

export default function ClassroomSelector({ turmas, selectedId, onSelect }) {
  const styles = useStyles();

  const selectedTurma = turmas.find(t => t.turma_id === selectedId);

  const baseSerie = getBaseSerie(selectedId);
  const turno = selectedTurma ? selectedTurma.turno : 'MANHA';
  const letra = getTurmaLetra(selectedId);

  const availableSeries = React.useMemo(() => {
    return Array.from(new Set(turmas.map(t => getBaseSerie(t.turma_id))));
  }, [turmas]);

  const availableTurnosForSerie = React.useMemo(() => {
    return Array.from(new Set(turmas.filter(t => getBaseSerie(t.turma_id) === baseSerie).map(t => t.turno)));
  }, [turmas, baseSerie]);

  const availableLetras = React.useMemo(() => {
    return turmas
      .filter(t => getBaseSerie(t.turma_id) === baseSerie && t.turno === turno)
      .map(t => ({ id: t.turma_id, letra: getTurmaLetra(t.turma_id) }));
  }, [turmas, baseSerie, turno]);

  const handleSerieChange = (newBase) => {
    const subset = turmas.filter(t => getBaseSerie(t.turma_id) === newBase);
    if (subset.length) onSelect(subset[0].turma_id);
  };

  const handleTurnoChange = (newTurno) => {
    const subset = turmas.filter(t => getBaseSerie(t.turma_id) === baseSerie && t.turno === newTurno);
    if (subset.length) onSelect(subset[0].turma_id);
  };

  const isPendente = selectedTurma?.pendente;

  return (
    <div className={styles.container}>
      {/* Série */}
      <div className={styles.group}>
        <span className={styles.label}>Série</span>
        <Select
          className={styles.select}
          value={baseSerie}
          onChange={(_, data) => handleSerieChange(data.value)}
          aria-label="Selecionar série"
        >
          {availableSeries.map(s => (
            <option key={s} value={s}>{getSerieLabel(s)}</option>
          ))}
        </Select>
      </div>

      {/* Turno */}
      <div className={styles.group}>
        <span className={styles.label}>Turno</span>
        <Select
          className={styles.select}
          value={turno}
          onChange={(_, data) => handleTurnoChange(data.value)}
          aria-label="Selecionar turno"
        >
          {availableTurnosForSerie.map(t => (
            <option key={t} value={t}>{t === 'MANHA' ? 'Manhã' : 'Tarde'}</option>
          ))}
        </Select>
      </div>

      {/* Turma */}
      <div className={styles.group}>
        <span className={styles.label}>Turma</span>
        <Select
          className={styles.select}
          value={selectedId}
          onChange={(_, data) => onSelect(data.value)}
          aria-label="Selecionar turma"
        >
          {availableLetras.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.letra === 'HUMANAS' ? 'Humanas' : opt.letra}
            </option>
          ))}
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

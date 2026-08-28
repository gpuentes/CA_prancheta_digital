import React from 'react';
import { makeStyles, Text, tokens } from '@fluentui/react-components';

const STATUS_CONFIG = {
  PRESENTE:    { bg: '#d4f7d4', border: '#2e7d32', dot: '#2e7d32', label: 'Presente' },
  ADVERTENCIA: { bg: '#fff9c4', border: '#f59e0b', dot: '#f59e0b', label: 'Advertência' },
  OCORRENCIA:  { bg: '#fde8e8', border: '#dc2626', dot: '#dc2626', label: 'Ocorrência' },
  AUSENTE:     { bg: '#f3f4f6', border: '#9ca3af', dot: '#9ca3af', label: 'Ausente' },
  OCUPADO:     { bg: 'var(--bg-sidebar)', border: 'var(--border-color)', dot: '#107c10', label: 'Presente' },
  VAZIO:       { bg: 'transparent', border: 'var(--border-color)', dot: null, label: '' },
};

const useStyles = makeStyles({
  seat: {
    position: 'relative',
    width: '100%',
    minHeight: '64px',
    borderRadius: '8px',
    border: '1.5px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '6px 4px',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    userSelect: 'none',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  seatVazio: {
    cursor: 'default',
    opacity: '0.35',
    ':hover': {
      transform: 'none',
      boxShadow: 'none',
    },
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '11px',
    flexShrink: '0',
    letterSpacing: '-0.5px',
  },
  name: {
    fontSize: '10px',
    lineHeight: '1.2',
    textAlign: 'center',
    color: 'var(--color-text)',
    fontWeight: '500',
    wordBreak: 'break-word',
    maxWidth: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  dot: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: '1.5px solid white',
  },
  posLabel: {
    position: 'absolute',
    bottom: '3px',
    left: '4px',
    fontSize: '8px',
    color: 'var(--color-text-secondary)',
    opacity: '0.6',
  },
});

function getInitials(nome) {
  if (!nome) return '?';
  const parts = nome.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * @param {{ assento: import('../../data/classroomSeats').Assento, onClick: () => void }} props
 */
export default function SeatCard({ assento, onClick }) {
  const styles = useStyles();

  const cfg = STATUS_CONFIG[assento.status] || STATUS_CONFIG.VAZIO;
  const isEmpty = assento.status === 'VAZIO';

  return (
    <div
      className={`${styles.seat} ${isEmpty ? styles.seatVazio : ''}`}
      style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
      onClick={isEmpty ? undefined : onClick}
      role={isEmpty ? undefined : 'button'}
      aria-label={isEmpty ? `Assento ${assento.posicao} vazio` : `${assento.aluno_nome} — ${cfg.label}`}
      tabIndex={isEmpty ? -1 : 0}
      onKeyDown={isEmpty ? undefined : (e) => e.key === 'Enter' && onClick?.()}
    >
      {!isEmpty && (
        <>
          <div className={styles.avatar} style={{ backgroundColor: 'var(--color-brand)' }}>
            {getInitials(assento.aluno_nome)}
          </div>
          <span className={styles.name}>{assento.aluno_nome}</span>
          {cfg.dot && (
            <span className={styles.dot} style={{ backgroundColor: cfg.dot }} aria-hidden="true" />
          )}
        </>
      )}
      <span className={styles.posLabel}>{assento.posicao}</span>
    </div>
  );
}

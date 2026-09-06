import React from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '700',
    fontVariantNumeric: 'tabular-nums',
    fontSize: '0.8rem',
    padding: '4px 10px',
    borderRadius: '8px',
    justifyContent: 'center',
  },
  // Variantes de cores para Dashboard (menores e arredondados)
  greenDash: { color: '#107c41', backgroundColor: '#dff6dd', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' },
  yellowDash: { color: '#7f5200', backgroundColor: '#fff4ce', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' },
  redDash: { color: '#a80000', backgroundColor: '#fde7e9', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' }
});

export function getSLAInfo(createdAt, format = 'full') {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diffMs / 60000);
  const secs = Math.floor((diffMs % 60000) / 1000);
  
  let label = '';
  if (format === 'short') {
    label = `${mins}min`;
  } else {
    label = mins >= 60
      ? `${Math.floor(mins/60)}h${String(mins % 60).padStart(2,'0')}m`
      : `${mins}:${String(secs).padStart(2,'0')}`;
  }

  if (mins < 10) return { label, color: '#107c41', bg: 'rgba(16,124,65,0.1)', border: '#107c41', emoji: '🟢', status: 'green' };
  if (mins < 30) return { label, color: '#d83b01', bg: 'rgba(255,170,68,0.1)', border: '#d83b01', emoji: '🟡', status: 'yellow' };
  return { label, color: '#a80000', bg: 'rgba(168,0,0,0.12)', border: '#a80000', emoji: '🔴', status: 'red' };
}

export default function SLABadge({ createdAt, variant = 'default' }) {
  const styles = useStyles();
  const info = getSLAInfo(createdAt, variant === 'dashboard' ? 'short' : 'full');
  
  if (variant === 'dashboard') {
    const dashClass = info.status === 'green' ? styles.greenDash : info.status === 'yellow' ? styles.yellowDash : styles.redDash;
    return (
      <span className={dashClass} aria-label={`SLA: ${info.label}`}>
        <span aria-hidden="true">{info.emoji}</span> {info.label}
      </span>
    );
  }

  return (
    <div 
      className={styles.badge} 
      style={{ background: info.bg, color: info.color }}
      aria-label={`Tempo decorrido: ${info.label}`}
    >
      <span aria-hidden="true">{info.emoji}</span> {info.label}
    </div>
  );
}

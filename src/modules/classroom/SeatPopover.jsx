import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  Text,
  Divider,
  makeStyles,
} from '@fluentui/react-components';
import {
  PersonRegular,
  WarningRegular,
  DismissRegular,
  AlertRegular,
  AlertUrgentRegular,
  CheckmarkCircleRegular,
  PersonQuestionMarkRegular,
} from '@fluentui/react-icons';
import { useAuth } from '../../contexts/AuthContext.jsx';

const STATUS_OPTIONS = [
  { key: 'OCUPADO',     label: 'Presente',    icon: <CheckmarkCircleRegular /> },
  { key: 'ADVERTENCIA', label: 'Advertência', icon: <WarningRegular /> },
  { key: 'OCORRENCIA',  label: 'Ocorrência',  icon: <AlertRegular /> },
  { key: 'AUSENTE',     label: 'Ausente',     icon: <PersonQuestionMarkRegular /> },
];

const useStyles = makeStyles({
  surface: {
    minWidth: '240px',
    maxWidth: '280px',
    padding: '0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
    border: '1px solid var(--border-color)',
  },
  header: {
    padding: '14px 16px 10px',
    backgroundColor: 'var(--bg-sidebar)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid var(--border-color)',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '13px',
    flexShrink: '0',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  body: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: 'var(--bg-card)',
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '2px',
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
  },
  statusBtn: {
    justifyContent: 'flex-start',
    fontSize: '12px',
    height: '32px',
    borderRadius: '6px',
  },
  actionBtn: {
    justifyContent: 'flex-start',
    fontSize: '12px',
    height: '32px',
    width: '100%',
  },
  urgentBtn: {
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    height: '40px',
    width: '100%',
    borderRadius: '6px',
    marginTop: '4px',
  },
});

function getInitials(nome) {
  if (!nome) return '?';
  const parts = nome.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function SeatPopover({ assento, turmaId, onStatusChange, children }) {
  const styles = useStyles();
  const { createTicket } = useAuth();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  if (!assento || assento.status === 'VAZIO') return <>{children}</>;

  const handleStatusChange = (status) => {
    onStatusChange(assento.posicao, status);
    setOpen(false);
  };

  const handleOccurrence = () => {
    onStatusChange(assento.posicao, 'OCORRENCIA');
    setOpen(false);
    navigate(`/chamados?aluno_nome=${encodeURIComponent(assento.aluno_nome)}&turma=${encodeURIComponent(turmaId)}&posicao=${encodeURIComponent(assento.posicao)}&origem=mapa_sala`);
  };

  const handleUrgent = () => {
    onStatusChange(assento.posicao, 'OCORRENCIA');
    setOpen(false);
    navigate(`/chamados?aluno_nome=${encodeURIComponent(assento.aluno_nome)}&turma=${encodeURIComponent(turmaId)}&posicao=${encodeURIComponent(assento.posicao)}&origem=mapa_sala&urgente=true`);
  };

  return (
    <Popover
      withArrow
      positioning="above-start"
      open={open}
      onOpenChange={(_, data) => setOpen(data.open)}
    >
      <PopoverTrigger disableButtonEnhancement>
        <div style={{ width: '100%', height: '100%' }} onClick={() => setOpen(o => !o)}>
          {children}
        </div>
      </PopoverTrigger>

      <PopoverSurface className={styles.surface}>
        <div className={styles.header}>
          <div className={styles.avatar}>{getInitials(assento.aluno_nome)}</div>
          <div className={styles.headerInfo}>
            <Text weight="semibold" size={300}>{assento.aluno_nome}</Text>
            <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
              Posição {assento.posicao} • Turma {turmaId}
            </Text>
          </div>
        </div>

        <div className={styles.body}>
          <div>
            <div className={styles.sectionLabel}>Status da aula</div>
            <div className={styles.statusGrid}>
              {STATUS_OPTIONS.map(opt => (
                <Button
                  key={opt.key}
                  size="small"
                  appearance={assento.status === opt.key ? 'primary' : 'outline'}
                  icon={opt.icon}
                  className={styles.statusBtn}
                  onClick={() => handleStatusChange(opt.key)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <div className={styles.sectionLabel}>Ações rápidas</div>
            <Button
              size="small"
              appearance="subtle"
              icon={<AlertRegular />}
              className={styles.actionBtn}
              style={{ color: 'var(--color-error)' }}
              onClick={handleOccurrence}
            >
              Registrar Ocorrência
            </Button>
            <Button
              size="small"
              appearance="subtle"
              icon={<PersonRegular />}
              className={styles.actionBtn}
              onClick={() => handleStatusChange('AUSENTE')}
            >
              Marcar Ausente
            </Button>
            <Button
              size="small"
              appearance="subtle"
              icon={<DismissRegular />}
              className={styles.actionBtn}
              onClick={() => handleStatusChange('OCUPADO')}
            >
              Limpar / Resetar
            </Button>
          </div>

          <Divider />

          {/* Botão URGENTE/GRAVE — destaque visual vermelho */}
          <Button
            appearance="primary"
            icon={<AlertUrgentRegular />}
            className={styles.urgentBtn}
            style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
            onClick={handleUrgent}
          >
            🚨 ALERTA URGENTE / GRAVE
          </Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
}

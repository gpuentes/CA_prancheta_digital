import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  makeStyles,
  Card,
  Title3,
  Text,
  Button,
  Textarea,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  AlertRegular,
  SendRegular,
  EditRegular,
  PeopleRegular,
  CheckmarkCircleRegular,
  LocationRegular,
} from '@fluentui/react-icons';
import QuickActionEditorModal from './QuickActionEditorModal.jsx';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '10px',
  },
  quickButton: {
    padding: '12px 14px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color-strong)',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'all 0.15s ease',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
      borderColor: 'var(--color-brand)',
      transform: 'translateY(-1px)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  smartCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  scheduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px',
  },
  scheduleCard: {
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
  },
  monitorAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
    flexShrink: '0',
  },
});

export default function AbaCampainha() {
  const styles = useStyles();
  const { state, createTicket, currentUser } = useAuth();

  const [rawText, setRawText] = useState('');
  const [ticketCreated, setTicketCreated] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const canManageQuickActions = currentUser && ['admin', 'diretor', 'secretaria'].includes(currentUser.role);
  const quickActions = state.quickActionTemplates || [];
  const schedules = state.monitorSchedules || [];

  const handleQuickClick = (qa) => {
    setRawText(qa.template);
    setTicketCreated(null);
  };

  const handleSend = () => {
    if (!rawText.trim()) return;
    const ticket = createTicket(rawText.trim());
    setTicketCreated(ticket);
    setRawText('');
  };

  return (
    <div className={styles.container}>
      {/* ─── 1. Quick Action Templates ─── */}
      <Card appearance="outline" style={{ padding: '20px' }}>
        <div className={styles.sectionTitle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertRegular style={{ color: 'var(--color-brand)' }} />
            <Title3>Botões de Ação Rápida (Campainha)</Title3>
          </div>
          {canManageQuickActions && (
            <Button
              appearance="subtle"
              size="small"
              icon={<EditRegular />}
              onClick={() => setIsEditorOpen(true)}
            >
              Editar Botões
            </Button>
          )}
        </div>
        <Text size={200} style={{ color: 'var(--color-text-secondary)', marginBottom: '12px', display: 'block' }}>
          Clique em um botão abaixo para injetar o texto pré-formatado no chamado.
        </Text>

        <div className={styles.quickGrid}>
          {quickActions.map(qa => (
            <button
              key={qa.id}
              className={styles.quickButton}
              onClick={() => handleQuickClick(qa)}
            >
              <Text weight="semibold" size={200}>{qa.label}</Text>
              <Text size={100} style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {qa.template}
              </Text>
            </button>
          ))}
        </div>
      </Card>

      {/* ─── 2. Smart Paste Input & Dispatch ─── */}
      <Card appearance="outline" className={styles.smartCard}>
        <Title3>Smart Paste / Digitação de Chamado</Title3>
        <Textarea
          placeholder="Digite ou cole o chamado aqui (ex: Aluno Gabriel Oliveira da 8ªMB encaminhado para coordenação)..."
          rows={3}
          size="large"
          value={rawText}
          onChange={(e, data) => setRawText(data.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            appearance="primary"
            size="large"
            icon={<SendRegular />}
            disabled={!rawText.trim()}
            onClick={handleSend}
          >
            Disparar Chamado (Campainha)
          </Button>
        </div>

        {ticketCreated && (
          <div style={{ marginTop: '8px', padding: '12px', backgroundColor: 'rgba(16, 124, 65, 0.1)', borderRadius: '6px', border: '1px solid var(--color-success)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckmarkCircleRegular style={{ color: 'var(--color-success)', fontSize: '20px' }} />
            <div>
              <Text weight="semibold" style={{ color: 'var(--color-success)' }}>Chamado Disparado com Sucesso!</Text>
              <Text block size={200} style={{ color: 'var(--color-text-secondary)' }}>
                {ticketCreated.studentName ? `${ticketCreated.studentName} — ${ticketCreated.reason}` : ticketCreated.rawText}
              </Text>
            </div>
          </div>
        )}
      </Card>

      {/* ─── 3. Escala de Localização dos Monitores ─── */}
      <Card appearance="outline" style={{ padding: '20px' }}>
        <div className={styles.sectionTitle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PeopleRegular style={{ color: 'var(--color-brand)' }} />
            <Title3>Escala de Posto dos Monitores</Title3>
          </div>
          <Badge appearance="tint" color="brand">Em Serviço</Badge>
        </div>
        <Text size={200} style={{ color: 'var(--color-text-secondary)', marginBottom: '12px', display: 'block' }}>
          Localização atual da equipe no pátio para direcionamento dos chamados.
        </Text>

        <div className={styles.scheduleGrid}>
          {schedules.map(ms => {
            const init = ms.name.split(' ').map(n => n[0]).join('').substring(0, 2);
            return (
              <div key={ms.id} className={styles.scheduleCard}>
                <div className={styles.monitorAvatar}>{init}</div>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" block>{ms.name}</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <LocationRegular style={{ fontSize: '13px', color: 'var(--color-brand)' }} />
                    <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>{ms.location}</Text>
                  </div>
                </div>
                <Badge appearance="filled" color={ms.shift === 'Manhã' ? 'brand' : 'important'} size="small">
                  {ms.shift}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* RBAC Quick Action Editor Modal */}
      <QuickActionEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
}

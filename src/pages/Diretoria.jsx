import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { triggerAllAlerts } from '../hooks/useAudio.js';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Card,
  Button,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  AlertRegular,
  AlertUrgentFilled,
  CheckmarkRegular,
  CheckmarkCircleFilled,
  ArrowSyncRegular,
  PersonRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  stats: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  statBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '16px',
  },
  urgentCard: {
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    borderLeft: '4px solid var(--color-warning)',
    animationName: {
      from: { opacity: 0, transform: 'translateX(-10px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    animationDuration: '0.4s',
    animationFillMode: 'forwards',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    ':hover': {
      boxShadow: 'var(--shadow-md)',
      transform: 'translateY(-2px)',
    },
  },
  progressCard: {
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    borderLeft: '4px solid var(--color-brand)',
    animationName: {
      from: { opacity: 0, transform: 'translateX(-10px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    animationDuration: '0.4s',
    animationFillMode: 'forwards',
  },
  doneCard: {
    padding: '20px',
    opacity: '0.7',
    borderLeft: '4px solid var(--color-success)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: '1',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  glassOverlay: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(255,170,68,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(30px, -30px)',
    pointerEvents: 'none',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  pulseIcon: {
    fontSize: '48px',
    color: 'var(--color-success)',
    animationName: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    animationDuration: '2s',
    animationIterationCount: 'infinite',
  },
});

export default function Diretoria() {
  const styles = useStyles();
  const { state, acceptTicket, completeTicket, createTicket } = useAuth();
  const prevTicketCountRef = useRef(state.tickets?.length || 0);

  // Alert on new ticket arrival
  useEffect(() => {
    const currentCount = state.tickets?.length || 0;
    if (currentCount > prevTicketCountRef.current) {
      triggerAllAlerts();
    }
    prevTicketCountRef.current = currentCount;
  }, [state.tickets?.length]);

  const openTickets = (state.tickets || []).filter(t => t.status === 'Aberto');
  const progressTickets = (state.tickets || []).filter(t => t.status === 'Em Andamento');
  const doneTickets = (state.tickets || []).filter(t => t.status === 'Concluído').slice(-5).reverse();

  const handleAccept = (id) => {
    acceptTicket(id);
  };

  const handleComplete = (id) => {
    const details = prompt('Observações finais (opcional):');
    completeTicket(id, null, details);
  };

  const handleSimulate = () => {
    const rand = state.students[Math.floor(Math.random() * state.students.length)];
    const motives = ['Falta de Uniforme (Blusa)', 'Uso de Celular', 'Conversa em Excesso', 'Corrida / Acidente'];
    const dests = ['Coordenação', 'Orientação', 'Diretoria'];
    const m = motives[Math.floor(Math.random() * motives.length)];
    const d = dests[Math.floor(Math.random() * dests.length)];
    createTicket(`Aluno ${rand.firstName} ${rand.lastName} (${rand.classId}) encaminhado para a ${d} por ${m.toLowerCase()}.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>🔔 Painel Campainha</Title2>
        <div className={styles.stats}>
          <div className={styles.statBadge} style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
            <AlertRegular /> {openTickets.length} Aberto{openTickets.length !== 1 ? 's' : ''}
          </div>
          <div className={styles.statBadge} style={{ backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
            <ArrowSyncRegular /> {progressTickets.length} Em Andamento
          </div>
          <Button appearance="subtle" size="small" onClick={handleSimulate}>
            🔔 Simular Chamado
          </Button>
        </div>
      </div>

      {/* ─── No tickets state ─── */}
      {openTickets.length === 0 && progressTickets.length === 0 && (
        <Card className={styles.emptyState} appearance="subtle">
          <div className={styles.pulseIcon}>
            <CheckmarkCircleFilled />
          </div>
          <Title3>Tudo tranquilo!</Title3>
          <Text style={{ color: 'var(--color-text-secondary)' }}>
            Nenhum chamado pendente no momento. Novos chamados aparecerão aqui com alerta sonoro.
          </Text>
        </Card>
      )}

      {/* ─── Open Tickets ─── */}
      {openTickets.length > 0 && (
        <>
          <Title3 style={{ color: 'var(--color-warning)' }}>
            <AlertUrgentFilled style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Chamados Aguardando ({openTickets.length})
          </Title3>
          <div className={styles.grid}>
            {openTickets.map(ticket => (
              <Card key={ticket.id} className={styles.urgentCard} appearance="outline">
                <div className={styles.glassOverlay} />
                <div className={styles.cardHeader}>
                  <div className={styles.cardInfo}>
                    <Text weight="bold" size={400}>{ticket.studentName}</Text>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                      Turma: {ticket.classId}
                    </Text>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      {ticket.reasons?.join(', ')}
                    </Text>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                      → {ticket.destination}
                    </Text>
                  </div>
                  <Badge appearance="filled" color="warning" style={{ flexShrink: 0 }}>NOVO</Badge>
                </div>
                <Text size={100} style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                  {new Date(ticket.createdAt).toLocaleString('pt-BR')}
                </Text>
                <div className={styles.cardActions}>
                  <Button appearance="primary" icon={<CheckmarkRegular />} onClick={() => handleAccept(ticket.id)} style={{ flex: 1 }}>
                    Aceitar Chamado
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ─── In Progress ─── */}
      {progressTickets.length > 0 && (
        <>
          <Divider />
          <Title3 style={{ color: 'var(--color-brand)' }}>
            <ArrowSyncRegular style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Em Andamento ({progressTickets.length})
          </Title3>
          <div className={styles.grid}>
            {progressTickets.map(ticket => (
              <Card key={ticket.id} className={styles.progressCard} appearance="outline">
                <div className={styles.cardInfo}>
                  <Text weight="bold">{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {ticket.classId} • {ticket.reasons?.join(', ')} → {ticket.destination}
                  </Text>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                    Aceito por {ticket.acceptedBy} • {new Date(ticket.createdAt).toLocaleString('pt-BR')}
                  </Text>
                </div>
                <div className={styles.cardActions}>
                  <Button
                    appearance="primary"
                    icon={<CheckmarkRegular />}
                    onClick={() => handleComplete(ticket.id)}
                    style={{ backgroundColor: 'var(--color-success)', flex: 1 }}
                  >
                    Concluir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ─── Recently Completed ─── */}
      {doneTickets.length > 0 && (
        <>
          <Divider />
          <Title3>Últimos Concluídos</Title3>
          <div className={styles.grid}>
            {doneTickets.map(ticket => (
              <Card key={ticket.id} className={styles.doneCard} appearance="outline">
                <div className={styles.cardInfo}>
                  <Text weight="semibold">{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {ticket.classId} • {ticket.reasons?.join(', ')}
                  </Text>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                    Concluído: {ticket.completedAt ? new Date(ticket.completedAt).toLocaleString('pt-BR') : '—'}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

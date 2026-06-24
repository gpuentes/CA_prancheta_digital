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
  Textarea,
  Badge,
  Input,
  Checkbox,
  Select,
  Divider,
} from '@fluentui/react-components';
import {
  SendRegular,
  CheckmarkRegular,
  DismissRegular,
  AlertRegular,
  ClipboardPasteRegular,
  ArrowSyncRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '900px',
  },
  smartPasteSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
  },
  previewCard: {
    padding: '20px',
    border: '2px solid var(--color-brand)',
    animationName: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '12px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  previewField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  reasonsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '8px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginTop: '12px',
  },
  ticketsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ticketCard: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: 'var(--shadow-md)',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  ticketInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: '1',
  },
  ticketActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: '0',
  },
  syncBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-secondary)',
  },
  syncBarFill: {
    height: '3px',
    backgroundColor: 'var(--color-brand)',
    borderRadius: '2px',
    transition: 'width 1s linear',
  },
  mockBtn: {
    marginLeft: 'auto',
  },
});

const STATUS_CONFIG = {
  'Aberto': { color: 'warning', icon: <AlertRegular /> },
  'Em Andamento': { color: 'brand', icon: <ArrowSyncRegular /> },
  'Concluído': { color: 'success', icon: <CheckmarkRegular /> },
};

export default function Chamados() {
  const styles = useStyles();
  const {
    state,
    parseSmartPaste,
    createTicket,
    acceptTicket,
    completeTicket,
  } = useAuth();

  const [pasteText, setPasteText] = useState('');
  const [preview, setPreview] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [destination, setDestination] = useState('Coordenação');
  const [syncCountdown, setSyncCountdown] = useState(30);

  // Sync timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncCountdown(prev => {
        if (prev <= 1) return 30;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleParse = () => {
    if (!pasteText.trim()) return;
    const result = parseSmartPaste(pasteText);
    setPreview(result);
    setSelectedReasons(result.reasons || []);
    setDestination(result.destination || 'Coordenação');
  };

  const handleConfirm = () => {
    if (selectedReasons.length === 0) {
      alert('Selecione pelo menos um motivo.');
      return;
    }
    createTicket(
      `[Encaminhamento: ${destination}] - Motivos: ${selectedReasons.join(', ')} - Original: ${pasteText}`
    );
    setPasteText('');
    setPreview(null);
    setSelectedReasons([]);
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedReasons([]);
  };

  const handleMockTicket = () => {
    const rand = state.students[Math.floor(Math.random() * state.students.length)];
    const motives = ['Falta de Uniforme (Blusa)', 'Uso de Celular', 'Conversa em Excesso'];
    const dests = ['Coordenação', 'Orientação', 'Ir embora'];
    const m = motives[Math.floor(Math.random() * motives.length)];
    const d = dests[Math.floor(Math.random() * dests.length)];

    createTicket(
      `O aluno ${rand.firstName} ${rand.lastName} da turma ${rand.classId} foi enviado para a ${d.toLowerCase()} por ${m.toLowerCase()}.`
    );
    triggerAllAlerts();
  };

  const handleAccept = (id) => {
    acceptTicket(id);
  };

  const handleComplete = (id) => {
    const details = prompt('Observações finais (opcional):');
    completeTicket(id, null, details);
  };

  const toggleReason = (reason) => {
    setSelectedReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  };

  // Sort tickets: open first, then in progress, then completed
  const sortedTickets = [...(state.tickets || [])].sort((a, b) => {
    const order = { 'Aberto': 0, 'Em Andamento': 1, 'Concluído': 2 };
    return (order[a.status] || 0) - (order[b.status] || 0);
  });

  const syncPercent = ((30 - syncCountdown) / 30) * 100;

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Title2>Chamados</Title2>
        <div className={styles.syncBar}>
          <ArrowSyncRegular />
          <span>Sincronização em {syncCountdown}s</span>
          <div style={{ width: '80px', height: '3px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
            <div className={styles.syncBarFill} style={{ width: `${syncPercent}%` }} />
          </div>
        </div>
      </div>

      {/* ─── Smart Paste ─── */}
      <Card className={styles.smartPasteSection} appearance="outline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ClipboardPasteRegular />
          <Title3>Smart Paste</Title3>
        </div>
        <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
          Cole a mensagem do professor ou inspetor abaixo. O sistema identificará automaticamente aluno, motivo e destino.
        </Text>
        <Textarea
          placeholder="Ex: O aluno Gabriel Oliveira da 8ºMB foi encaminhado para a coordenação por uso de celular..."
          value={pasteText}
          onChange={(e, data) => setPasteText(data.value)}
          resize="vertical"
          style={{ minHeight: '100px' }}
          id="smart-paste-text"
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button appearance="primary" icon={<SendRegular />} onClick={handleParse} disabled={!pasteText.trim()}>
            Analisar Texto
          </Button>
          <Button appearance="subtle" onClick={handleMockTicket} className={styles.mockBtn} id="btn-trigger-mock-ticket">
            🔔 Simular Chamado
          </Button>
        </div>
      </Card>

      {/* ─── Preview ─── */}
      {preview && (
        <Card className={styles.previewCard} appearance="outline">
          <Title3>Pré-visualização do Chamado</Title3>
          <div className={styles.previewGrid}>
            <div className={styles.previewField}>
              <Text weight="semibold" size={200}>Aluno Identificado</Text>
              <Text>{preview.student ? `${preview.student.firstName} ${preview.student.lastName}` : '⚠️ Não identificado'}</Text>
            </div>
            <div className={styles.previewField}>
              <Text weight="semibold" size={200}>Turma</Text>
              <Text>{preview.className || 'Não identificada'}</Text>
            </div>
            <div className={styles.previewField}>
              <Text weight="semibold" size={200}>Destino</Text>
              <Select value={destination} onChange={(e, data) => setDestination(data.value)} id="smart-paste-destination">
                <option>Coordenação</option>
                <option>Orientação</option>
                <option>Diretoria</option>
                <option>Ir embora</option>
              </Select>
            </div>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <Text weight="semibold" size={200}>Motivos Detectados</Text>
          <div className={styles.reasonsList}>
            {(state.occurrenceTypes || []).map(type => (
              <Checkbox
                key={type.id}
                label={type.label}
                checked={selectedReasons.includes(type.label)}
                onChange={() => toggleReason(type.label)}
                className="smart-paste-reason"
              />
            ))}
          </div>
          <div className={styles.actions}>
            <Button appearance="secondary" icon={<DismissRegular />} onClick={handleCancel}>Cancelar</Button>
            <Button appearance="primary" icon={<CheckmarkRegular />} onClick={handleConfirm}>Confirmar Chamado</Button>
          </div>
        </Card>
      )}

      {/* ─── Tickets List ─── */}
      <div className={styles.ticketsList}>
        {sortedTickets.length === 0 && (
          <Card appearance="subtle" style={{ padding: '24px', textAlign: 'center' }}>
            <Text style={{ color: 'var(--color-text-secondary)' }}>Nenhum chamado registrado ainda.</Text>
          </Card>
        )}
        {sortedTickets.map(ticket => {
          const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG['Aberto'];
          return (
            <Card key={ticket.id} className={styles.ticketCard} appearance="outline">
              <div className={styles.ticketInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge appearance="filled" color={cfg.color} icon={cfg.icon}>
                    {ticket.status}
                  </Badge>
                  <Text weight="semibold">{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{ticket.classId}</Text>
                </div>
                <Text size={200} style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {ticket.reasons?.join(', ')} → {ticket.destination}
                </Text>
                <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                  {new Date(ticket.createdAt).toLocaleString('pt-BR')}
                  {ticket.acceptedBy && ` • Aceito por ${ticket.acceptedBy}`}
                </Text>
              </div>
              <div className={styles.ticketActions}>
                {ticket.status === 'Aberto' && (
                  <Button
                    appearance="primary"
                    size="small"
                    icon={<CheckmarkRegular />}
                    onClick={() => handleAccept(ticket.id)}
                  >
                    Aceitar
                  </Button>
                )}
                {ticket.status === 'Em Andamento' && (
                  <Button
                    appearance="primary"
                    size="small"
                    icon={<CheckmarkRegular />}
                    onClick={() => handleComplete(ticket.id)}
                    style={{ backgroundColor: 'var(--color-success)' }}
                  >
                    Concluir
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

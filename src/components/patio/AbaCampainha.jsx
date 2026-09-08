import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  Checkbox,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from '@fluentui/react-components';
import {
  AlertRegular,
  AlertUrgentRegular,
  SendRegular,
  EditRegular,
  PeopleRegular,
  CheckmarkCircleRegular,
  CheckmarkRegular,
  ArrowSyncRegular,
  DismissRegular,
  LocationRegular,
} from '@fluentui/react-icons';
import QuickActionEditorModal from './QuickActionEditorModal.jsx';

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', gap: '20px' },
  sectionTitle: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px',
  },
  quickGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px',
  },
  quickButton: {
    padding: '12px 14px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color-strong)',
    borderRadius: '6px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px',
    transition: 'all 0.15s ease',
    ':hover': { backgroundColor: 'var(--bg-sidebar-hover)', borderColor: 'var(--color-brand)', transform: 'translateY(-1px)' },
    ':active': { transform: 'translateY(0)' },
  },
  smartCard: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' },
  ticketCard: {
    padding: '20px', position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--color-warning)',
    transition: 'box-shadow 0.2s, transform 0.2s',
    ':hover': { boxShadow: 'var(--shadow-md)', transform: 'translateY(-2px)' },
  },
  progressCard: {
    padding: '20px', position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--color-brand)',
  },
  doneCard: { padding: '20px', opacity: '0.7', borderLeft: '4px solid var(--color-success)' },
  cardInfo: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' },
  cardActions: { display: 'flex', gap: '8px', marginTop: '12px' },
  slaOverlay: {
    position: 'fixed', inset: '0', backgroundColor: 'rgba(220,38,38,0.9)', zIndex: '9999',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
    color: '#fff',
  },
  scheduleGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px',
  },
  scheduleCard: {
    padding: '14px', display: 'flex', alignItems: 'center', gap: '12px',
    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px',
  },
  monitorAvatar: {
    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-brand)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '600', fontSize: '14px', flexShrink: '0',
  },
  stageBtn: {
    flex: '1', minHeight: '48px', fontSize: '14px', fontWeight: '700', borderRadius: '8px',
  },
});

export default function AbaCampainha() {
  const styles = useStyles();
  const {
    state, createTicket, acceptTicket, completeTicket, cancelTicket,
    getTicketSLA, currentUser, parseSmartPaste,
  } = useAuth();

  const [rawText, setRawText] = useState('');
  const [ticketCreated, setTicketCreated] = useState(null);
  const [ticketCountdown, setTicketCountdown] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [callSibling, setCallSibling] = useState(true);
  const [slaModal, setSlaModal] = useState(null);
  const audioRef = useRef(null);
  const slaIntervalRef = useRef(null);

  const isMonitor = currentUser && currentUser.role === 'monitor';
  const isSecretaria = currentUser && ['secretaria', 'admin', 'diretor'].includes(currentUser.role);
  const canManageQuickActions = isSecretaria;
  const quickActions = state.quickActionTemplates || [];
  const schedules = state.monitorSchedules || [];

  // Filter tickets by status
  const recebidos = useMemo(() =>
    (state.tickets || []).filter(t => t.status === 'RECEBIDO'), [state.tickets]);
  const atendendo = useMemo(() =>
    (state.tickets || []).filter(t => t.status === 'ATENDENDO'), [state.tickets]);
  const fechados = useMemo(() =>
    (state.tickets || []).filter(t => t.status === 'FECHADO').slice(-6).reverse(), [state.tickets]);

  // SLA Watcher (every 10s check for ESTOURADO)
  useEffect(() => {
    slaIntervalRef.current = setInterval(() => {
      recebidos.forEach(t => {
        const sla = getTicketSLA(t);
        if (sla === 'ESTOURADO' && isMonitor) {
          setSlaModal(t);
          // Play beep
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            gain.gain.value = 0.3;
            osc.start();
            osc.stop(ctx.currentTime + 1.5);
            audioRef.current = ctx;
          } catch (e) { /* ignore audio errors */ }
        }
      });
    }, 10000);
    return () => clearInterval(slaIntervalRef.current);
  }, [recebidos, getTicketSLA, isMonitor]);

  // Success message countdown
  useEffect(() => {
    let interval;
    if (ticketCountdown > 0) {
      interval = setInterval(() => {
        setTicketCountdown(prev => prev - 1);
      }, 1000);
    } else if (ticketCountdown === 0 && ticketCreated) {
      setTicketCreated(null);
    }
    return () => clearInterval(interval);
  }, [ticketCountdown, ticketCreated]);

  const handleQuickClick = (qa) => { setRawText(qa.template); setTicketCreated(null); };

  const parsedPreview = useMemo(() => {
    return parseSmartPaste(rawText);
  }, [rawText, parseSmartPaste]);

  const handleSend = () => {
    if (!rawText.trim()) return;
    let finalRawText = rawText.trim();
    if (parsedPreview?.destination === 'Ir embora' && parsedPreview?.sibling && callSibling) {
      finalRawText += `, com o irmão ${parsedPreview.sibling.firstName} (${parsedPreview.sibling.classId})`;
    }
    const ticket = createTicket(finalRawText);
    ticket.rawInput = finalRawText;
    setTicketCreated(ticket);
    setRawText('');
    setCallSibling(true);
    setTicketCountdown(118);
  };

  const handleEditLast = () => {
    if (ticketCreated) {
      cancelTicket(ticketCreated.id);
      setRawText(ticketCreated.rawInput || `${ticketCreated.studentName} — ${ticketCreated.reasons?.join(', ')}`);
      setTicketCreated(null);
      setTicketCountdown(0);
    }
  };

  const handleSlaAccept = useCallback((ticketId) => {
    acceptTicket(ticketId);
    setSlaModal(null);
    if (audioRef.current) { try { audioRef.current.close(); } catch (e) {} }
  }, [acceptTicket]);

  const getElapsedLabel = (createdAt) => {
    const secs = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
    if (secs < 60) return `${secs}s`;
    return `${Math.floor(secs / 60)}m${secs % 60}s`;
  };

  return (
    <div className={styles.container}>
      {/* ─── SLA ESTOURADO Modal ─── */}
      {slaModal && (
        <div className={styles.slaOverlay} role="alertdialog" aria-label="SLA Estourado">
          <AlertUrgentRegular style={{ fontSize: '80px' }} />
          <Title3 style={{ color: '#fff', fontSize: '28px' }}>⚠ PRIORIZAR ESSE CHAMADO</Title3>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', textAlign: 'center', maxWidth: '400px' }}>
            {slaModal.classId} — {slaModal.studentName}
            <br />{slaModal.reasons?.join(', ')}
            <br />→ {slaModal.destination}
            <br />Aguardando há {getElapsedLabel(slaModal.createdAt)}
          </Text>
          <Button
            appearance="primary"
            size="large"
            style={{ backgroundColor: '#fff', color: '#dc2626', fontWeight: '700', minWidth: '200px', minHeight: '56px', fontSize: '18px' }}
            onClick={() => handleSlaAccept(slaModal.id)}
          >
            ✓ RECEBIDO — ATENDER AGORA
          </Button>
        </div>
      )}

      {/* ─── 1. Secretaria: Quick Actions + Input ─── */}
      {isSecretaria && (
        <>
          <Card appearance="outline" style={{ padding: '20px' }}>
            <div className={styles.sectionTitle}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertRegular style={{ color: 'var(--color-brand)' }} />
                <Title3>Botões de Ação Rápida (Campainha)</Title3>
              </div>
              {canManageQuickActions && (
                <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => setIsEditorOpen(true)}>
                  Editar Botões
                </Button>
              )}
            </div>
            <Text size={200} style={{ color: 'var(--color-text-secondary)', marginBottom: '12px', display: 'block' }}>
              Clique em um botão abaixo para injetar o texto pré-formatado no chamado.
            </Text>
            <div className={styles.quickGrid}>
              {quickActions.map(qa => (
                <button key={qa.id} className={styles.quickButton} onClick={() => handleQuickClick(qa)}>
                  <Text weight="semibold" size={200}>{qa.label}</Text>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {qa.template}
                  </Text>
                </button>
              ))}
            </div>
          </Card>

          <Card appearance="outline" className={styles.smartCard}>
            <Title3>Disparar Chamado</Title3>
            <Textarea
              placeholder="Digite ou cole o chamado aqui..."
              rows={3} size="large" value={rawText} onChange={(e, data) => setRawText(data.value)}
            />
            
            {parsedPreview?.destination === 'Ir embora' && parsedPreview?.sibling && (
              <div style={{ padding: '8px 12px', backgroundColor: 'var(--bg-sidebar-hover)', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                <Checkbox 
                  checked={callSibling} 
                  onChange={(e, d) => setCallSibling(!!d.checked)} 
                  label={`Chamar irmão junto: ${parsedPreview.sibling.firstName} ${parsedPreview.sibling.lastName} (${parsedPreview.sibling.classId})`}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button appearance="primary" size="large" icon={<SendRegular />} disabled={!rawText.trim()} onClick={handleSend}>
                Disparar Chamado (Campainha)
              </Button>
            </div>
            {ticketCreated && (
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: 'rgba(16,124,65,0.1)', borderRadius: '6px', border: '1px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckmarkCircleRegular style={{ color: 'var(--color-success)', fontSize: '20px' }} />
                  <div>
                    <Text weight="semibold" style={{ color: 'var(--color-success)' }}>Chamado Disparado!</Text>
                    <Text block size={200} style={{ color: 'var(--color-text-secondary)' }}>
                      {ticketCreated.studentName} — {ticketCreated.reasons?.join(', ')}
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Button appearance="transparent" onClick={handleEditLast} style={{ color: 'var(--color-brand)' }}>
                    EDITAR
                  </Button>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {'>'} TIMER, {ticketCountdown} segundo{ticketCountdown !== 1 ? 's' : ''}
                  </Text>
                </div>
              </div>
            )}
          </Card>
        </>
      )}

      {/* ─── 2. Monitor: Fila de Chamados em 3 Estágios ─── */}
      {recebidos.length > 0 && (
        <>
          <Title3 style={{ color: 'var(--color-warning)' }}>
            <AlertUrgentRegular style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Chamados Aguardando ({recebidos.length})
          </Title3>
          <div className={styles.grid}>
            {recebidos.map(ticket => {
              const elapsedStr = getElapsedLabel(ticket.createdAt);
              const isOverdue = elapsedStr.includes('m') && parseInt(elapsedStr.split('m')[0]) >= 3;
              
              return (
                <Card key={ticket.id} className={styles.ticketCard} appearance="outline" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge appearance="filled" color={isOverdue ? 'danger' : 'warning'} style={{ backgroundColor: isOverdue ? '#dc2626' : undefined }}>
                      ⏱️ {elapsedStr}
                    </Badge>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                      {new Date(ticket.createdAt).toLocaleTimeString('pt-BR')}
                    </Text>
                  </div>
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Text size={200}>📍 <strong>DESTINO:</strong> {ticket.destination}</Text>
                    <Text size={200}>👤 <strong>ABERTO POR:</strong> {ticket.createdBy}</Text>
                    <Text size={200}>🏷️ <strong>TIPO:</strong> {ticket.reasons?.join(', ')}</Text>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-neutral-background-2)', padding: '12px', borderRadius: '6px' }}>
                    <Text size={200} weight="semibold" block style={{ marginBottom: '4px' }}>📝 DESCRIÇÃO:</Text>
                    <Text size={200} block style={{ whiteSpace: 'pre-wrap' }}>
                      {ticket.rawInput || ticket.rawText || `${ticket.studentName} (${ticket.classId})`}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    {isSecretaria && (
                      <Button
                        appearance="outline"
                        icon={<DismissRegular />}
                        style={{ flex: 1, minHeight: '48px', fontSize: '13px' }}
                        onClick={() => cancelTicket(ticket.id)}
                      >
                        NOTIFICAR
                      </Button>
                    )}
                    <Button
                      appearance="primary"
                      icon={<CheckmarkRegular />}
                      style={{ flex: 2, minHeight: '48px', fontSize: '14px', fontWeight: 'bold' }}
                      onClick={() => acceptTicket(ticket.id)}
                    >
                      ✔️ ATENDER
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* ─── Em Atendimento (Stage 2) ─── */}
      {atendendo.length > 0 && (
        <>
          <Divider />
          <Title3 style={{ color: 'var(--color-brand)' }}>
            <ArrowSyncRegular style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Atendendo ({atendendo.length})
          </Title3>
          <div className={styles.grid}>
            {atendendo.map(ticket => (
              <Card key={ticket.id} className={styles.progressCard} appearance="outline">
                <div className={styles.cardInfo}>
                  <Text weight="bold">{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {ticket.classId} • {ticket.reasons?.join(', ')} → {ticket.destination}
                  </Text>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                    Aceito por {ticket.acceptedBy} • {getElapsedLabel(ticket.createdAt)}
                  </Text>
                </div>
                <div className={styles.cardActions}>
                  <Button
                    appearance="primary"
                    icon={<CheckmarkCircleRegular />}
                    className={styles.stageBtn}
                    style={{ backgroundColor: 'var(--color-success)', flex: 2 }}
                    onClick={() => completeTicket(ticket.id, null, 'Porta azul — concluído')}
                  >
                    Concluído
                  </Button>
                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <Button appearance="subtle" className={styles.stageBtn} style={{ flex: 1, border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>
                        FALHA
                      </Button>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem onClick={() => completeTicket(ticket.id, ['Outro / Observação'], 'Aluno Ausente / Não Encontrado na sala')}>
                          Aluno Ausente
                        </MenuItem>
                        <MenuItem onClick={() => completeTicket(ticket.id, ['Outro / Observação'], 'Aluno Não Encontrado no pátio')}>
                          Não Encontrado
                        </MenuItem>
                        <MenuItem onClick={() => completeTicket(ticket.id, ['Outro / Observação'], 'Já havia descido')}>
                          Já Desceu
                        </MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ─── Concluídos do Dia ─── */}
      {fechados.length > 0 && (
        <>
          <Divider />
          <Title3>Últimos Concluídos</Title3>
          <div className={styles.grid}>
            {fechados.map(ticket => (
              <Card key={ticket.id} className={styles.doneCard} appearance="outline">
                <div className={styles.cardInfo}>
                  <Text weight="semibold">{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {ticket.classId} • {ticket.reasons?.join(', ')}
                  </Text>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                    Concluído: {ticket.closedAt ? new Date(ticket.closedAt).toLocaleString('pt-BR') : '—'}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ─── Escala dos Monitores ─── */}
      <Card appearance="outline" style={{ padding: '20px' }}>
        <div className={styles.sectionTitle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PeopleRegular style={{ color: 'var(--color-brand)' }} />
            <Title3>Escala de Posto dos Monitores</Title3>
          </div>
          <Badge appearance="tint" color="brand">Em Serviço</Badge>
        </div>
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

      <QuickActionEditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
    </div>
  );
}

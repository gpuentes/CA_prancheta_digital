import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title1,
  Title3,
  Text,
  Button,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  Checkbox,
} from '@fluentui/react-components';
import {
  ChatHelpRegular,
  AlertUrgentRegular,
  WarningFilled,
  SignOutRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'var(--bg-card)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 40px',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-sidebar)',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '40px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    maxWidth: '600px',
  },
  kioskBtn: {
    width: '100%',
    padding: '32px 24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '24px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s',
    boxShadow: 'var(--shadow-md)',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--shadow-lg)',
    },
    ':active': {
      transform: 'translateY(2px)',
      boxShadow: 'var(--shadow-sm)',
    },
  },
  btnNormal: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border-color)',
    color: 'var(--color-text)',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
    },
  },
  btnUrgente: {
    backgroundColor: 'var(--color-warning-bg)',
    border: '2px solid var(--color-warning)',
    color: 'var(--color-warning)',
    ':hover': {
      backgroundColor: 'var(--color-warning)',
      color: 'var(--color-text-on-brand)',
    },
  },
  btnGrave: {
    backgroundColor: 'var(--color-error-bg)',
    border: '2px solid var(--color-error)',
    color: 'var(--color-error)',
    ':hover': {
      backgroundColor: 'var(--color-error)',
      color: 'var(--color-text-on-brand)',
    },
  },
  iconWrapper: {
    fontSize: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  whatsappCheckbox: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: 'var(--color-warning-bg)',
    borderRadius: '8px',
    border: '1px solid var(--color-warning)',
  },
});

export default function TerminalSala() {
  const styles = useStyles();
  const { state, createTicket, logout } = useAuth();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [graveDest, setGraveDest] = useState('Disciplinar');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(false);

  const roomName = state.currentUser?.name || 'Terminal Local';

  const handleAlert = (level) => {
    if (level === 'Grave') {
      setModalOpen(true);
      return;
    }

    const dest = level === 'Normal' ? 'Orientação' : 'Coordenação';
    createTicket(`[${level.toUpperCase()}] Solicitação originada por ${roomName} via Terminal.`);
    alert(`Alerta ${level} enviado com sucesso! Aguarde o atendimento.`);
  };

  const handleConfirmGrave = () => {
    createTicket(`[GRAVE] Solicitação originada por ${roomName}. Encaminhamento: ${graveDest}`);
    
    if (notifyWhatsapp) {
      // WUXIA-OPS: Integrating WhatsApp Web API
      const phone = '5511999999999'; // Configurable via Settings in future
      const text = encodeURIComponent(`🚨 ALERTA GRAVE na ${roomName}! Necessidade de apoio imediato da ${graveDest}.`);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else {
      alert('Alerta GRAVE enviado com sucesso! Aguarde o atendimento imediato.');
    }
    
    setModalOpen(false);
    setGraveDest('Disciplinar');
    setNotifyWhatsapp(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          {state.settings?.logoUrl ? (
            <img src={state.settings.logoUrl} alt="Logo" className={styles.logo} />
          ) : (
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-brand)', borderRadius: '4px' }} />
          )}
          <Title3>{state.settings?.appTitle || 'Prancheta Digital Escola'}</Title3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text weight="semibold">{roomName}</Text>
          <Button appearance="subtle" icon={<SignOutRegular />} onClick={logout}>Sair</Button>
        </div>
      </header>

      <main className={styles.main}>
        <div style={{ textAlign: 'center' }}>
          <Title1>Selecione o nível de suporte</Title1>
          <Text size={400} style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '12px' }}>
            A equipe será notificada e enviará um monitor ao local.
          </Text>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={`${styles.kioskBtn} ${styles.btnNormal}`} onClick={() => handleAlert('Normal')}>
            <div className={styles.iconWrapper}><ChatHelpRegular /></div>
            <div className={styles.btnText}>
              <Text size={600} weight="bold">NORMAL</Text>
              <Text size={300}>Suporte comum, sem urgência.</Text>
            </div>
          </button>

          <button className={`${styles.kioskBtn} ${styles.btnUrgente}`} onClick={() => handleAlert('Urgente')}>
            <div className={styles.iconWrapper}><AlertUrgentRegular /></div>
            <div className={styles.btnText}>
              <Text size={600} weight="bold">URGENTE</Text>
              <Text size={300}>Necessidade de monitoria rápida.</Text>
            </div>
          </button>

          <button className={`${styles.kioskBtn} ${styles.btnGrave}`} onClick={() => handleAlert('Grave')}>
            <div className={styles.iconWrapper}><WarningFilled /></div>
            <div className={styles.btnText}>
              <Text size={600} weight="bold">GRAVE</Text>
              <Text size={300}>Emergência disciplinar ou médica.</Text>
            </div>
          </button>
        </div>
      </main>

      <Dialog open={modalOpen} onOpenChange={(e, data) => setModalOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle style={{ color: 'var(--color-danger)' }}>Confirmação de Chamado Grave</DialogTitle>
            <DialogContent>
              <Text block style={{ marginBottom: '16px' }}>
                Você está prestes a emitir um alerta <strong>Grave</strong>. Para qual área devemos notificar a emergência?
              </Text>
              
              <RadioGroup value={graveDest} onChange={(e, data) => setGraveDest(data.value)}>
                <Radio value="Disciplinar" label="Disciplinar" />
                <Radio value="Orientação" label="Orientação" />
                <Radio value="Direção" label="Direção" />
              </RadioGroup>

              <div className={styles.whatsappCheckbox}>
                <Checkbox
                  size="large"
                  label="🚨 Notificar Coordenação via WhatsApp (Alta Prioridade)"
                  checked={notifyWhatsapp}
                  onChange={(e, data) => setNotifyWhatsapp(data.checked)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button appearance="primary" style={{ backgroundColor: 'var(--color-danger)' }} onClick={handleConfirmGrave}>
                Confirmar Alerta
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}

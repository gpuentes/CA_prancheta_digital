import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title1,
  Text,
} from '@fluentui/react-components';
import {
  ChatHelpRegular,
  AlertUrgentRegular,
  WarningFilled,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '40px',
    minHeight: '100%',
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
});

export default function CampainhaProfessor() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { state, createTicket } = useAuth();
  
  const roomName = state.currentUser?.name || 'Sala';

  const handleMonitorAlert = () => {
    createTicket(`[MONITOR] Solicitação de presença originada por ${roomName}.`);
    alert('Chamado para MONITOR enviado com sucesso!');
  };

  const handleAguaAlert = () => {
    createTicket(`[URGENTE] Água no chão / Limpeza solicitada por ${roomName}.`);
    alert('Chamado urgente de LIMPEZA enviado com sucesso!');
  };

  const handleOcorrencia = () => {
    // Redireciona para a tela de Ocorrência de Sala
    navigate('/chamados');
  };

  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'center' }}>
        <Title1>Campainha de Sala</Title1>
        <Text size={400} style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '12px' }}>
          Selecione o tipo de chamado para notificar a equipe.
        </Text>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={`${styles.kioskBtn} ${styles.btnNormal}`} onClick={handleMonitorAlert}>
          <div className={styles.iconWrapper}><ChatHelpRegular /></div>
          <div className={styles.btnText}>
            <Text size={600} weight="bold">MONITOR</Text>
            <Text size={300}>Chamado geral de presença na sala.</Text>
          </div>
        </button>

        <button className={`${styles.kioskBtn} ${styles.btnUrgente}`} onClick={handleAguaAlert}>
          <div className={styles.iconWrapper}><AlertUrgentRegular /></div>
          <div className={styles.btnText}>
            <Text size={600} weight="bold">MONITOR / Água no chão</Text>
            <Text size={300}>Chamado urgente de limpeza ou apoio.</Text>
          </div>
        </button>

        <button className={`${styles.kioskBtn} ${styles.btnGrave}`} onClick={handleOcorrencia}>
          <div className={styles.iconWrapper}><WarningFilled /></div>
          <div className={styles.btnText}>
            <Text size={600} weight="bold">MONITOR / Ocorrência</Text>
            <Text size={300}>Abre a tela de Ocorrência de Sala.</Text>
          </div>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title1,
  Text,
  Input,
  Button,
} from '@fluentui/react-components';
import {
  PersonRegular,
  LockClosedRegular,
  ArrowRightRegular,
  ShieldCheckmarkRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--login-bg, linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 40%, #0a2a5c 70%, #0e0e28 100%))',
  },
  // Animated background orbs
  orb1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,120,212,0.25) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    animationName: {
      '0%': { transform: 'translate(0,0) scale(1)' },
      '50%': { transform: 'translate(60px,40px) scale(1.1)' },
      '100%': { transform: 'translate(0,0) scale(1)' },
    },
    animationDuration: '8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(107,70,193,0.2) 0%, transparent 70%)',
    bottom: '-80px',
    right: '-80px',
    animationName: {
      '0%': { transform: 'translate(0,0) scale(1)' },
      '50%': { transform: 'translate(-40px,-30px) scale(1.15)' },
      '100%': { transform: 'translate(0,0) scale(1)' },
    },
    animationDuration: '10s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    pointerEvents: 'none',
  },
  orb3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,124,65,0.2) 0%, transparent 70%)',
    top: '50%',
    right: '10%',
    animationName: {
      '0%': { transform: 'translateY(0) scale(1)' },
      '50%': { transform: 'translateY(-30px) scale(1.2)' },
      '100%': { transform: 'translateY(0) scale(1)' },
    },
    animationDuration: '7s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '20px',
    boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset',
    animationName: {
      from: { opacity: 0, transform: 'translateY(32px) scale(0.97)' },
      to: { opacity: 1, transform: 'translateY(0) scale(1)' },
    },
    animationDuration: '0.6s',
    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    animationFillMode: 'forwards',
    margin: '0 16px',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  logoWrap: {
    position: 'relative',
    width: '72px',
    height: '72px',
    marginBottom: '4px',
  },
  logoCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0078d4 0%, #2b88d8 50%, #005a9e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '30px',
    fontWeight: '700',
    boxShadow: '0 0 0 8px rgba(0,120,212,0.15), 0 8px 32px rgba(0,120,212,0.4)',
    animationName: {
      '0%': { boxShadow: '0 0 0 8px rgba(0,120,212,0.15), 0 8px 32px rgba(0,120,212,0.4)' },
      '50%': { boxShadow: '0 0 0 14px rgba(0,120,212,0.1), 0 8px 40px rgba(0,120,212,0.5)' },
      '100%': { boxShadow: '0 0 0 8px rgba(0,120,212,0.15), 0 8px 32px rgba(0,120,212,0.4)' },
    },
    animationDuration: '3s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.875rem',
  },
  label: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.8125rem',
    fontWeight: '600',
    marginBottom: '2px',
    letterSpacing: '0.01em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputWrapper: {
    '& input': {
      background: 'rgba(255,255,255,0.08) !important',
      color: '#fff !important',
      borderColor: 'rgba(255,255,255,0.15) !important',
    },
    '& input::placeholder': {
      color: 'rgba(255,255,255,0.35) !important',
    },
    '& svg': {
      color: 'rgba(255,255,255,0.5) !important',
    },
  },
  submitBtn: {
    marginTop: '8px',
    background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%) !important',
    boxShadow: '0 4px 20px rgba(0,120,212,0.4) !important',
    transition: 'all 0.2s ease !important',
    ':hover': {
      background: 'linear-gradient(135deg, #2b88d8 0%, #0078d4 100%) !important',
      boxShadow: '0 6px 28px rgba(0,120,212,0.5) !important',
      transform: 'translateY(-1px)',
    },
  },
  errorMsg: {
    color: '#ff8080',
    fontSize: '0.8125rem',
    textAlign: 'center',
    padding: '10px 12px',
    backgroundColor: 'rgba(168,0,0,0.25)',
    border: '1px solid rgba(255,80,80,0.3)',
    borderRadius: '8px',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
    margin: '0 -8px',
  },
  quickCreds: {
    backgroundColor: 'rgba(0,120,212,0.12)',
    border: '1px solid rgba(0,120,212,0.25)',
    borderRadius: '10px',
    padding: '12px 14px',
    cursor: 'pointer',
  },
  quickSummary: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    fontSize: '0.8125rem',
    userSelect: 'none',
  },
  quickCredsList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  quickLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgba(255,255,255,0.75)',
    cursor: 'pointer',
    fontSize: '0.78rem',
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: '#ffffff',
    },
  },
  roleBadge: {
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '2px 7px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.6)',
  },
});

const QUICK_CREDENTIALS = [
  { label: 'Guilherme Puentes',  user: 'guilherme', pass: '123', role: 'Admin' },
  { label: 'Ana Paula',          user: 'anapaula',  pass: '123', role: 'Monitor' },
  { label: 'Dani Marques Souza', user: 'dani',      pass: '123', role: 'Monitor' },
  { label: 'Renata Costa',       user: 'renata',    pass: '123', role: 'Secretaria' },
  { label: 'Marcelo Dias',       user: 'marcelo',   pass: '123', role: 'Diretor' },
  { label: 'Terminal Sala',      user: 'sala',      pass: '123', role: 'Sala' },
];

export default function Login() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = (user, pass) => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(user, pass);
      if (result.success) {
        navigate(result.user.role === 'sala' ? '/terminal' : '/monitor');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(username, password);
  };

  const handleQuickLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    doLogin(user, pass);
  };

  return (
    <div className={styles.container}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoCircle}>📋</div>
          <div className={styles.title}>Prancheta Digital</div>
          <div className={styles.subtitle}>Sistema de Gestão Escolar · ETI</div>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} id="login-form">
          <div className={styles.formGroup}>
            <div className={styles.label}>Usuário</div>
            <div className={styles.inputWrapper}>
              <Input
                id="login-user"
                contentBefore={<PersonRegular />}
                placeholder="Digite seu login"
                value={username}
                onChange={(e, data) => setUsername(data.value)}
                size="large"
                autoFocus
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.label}>Senha</div>
            <div className={styles.inputWrapper}>
              <Input
                id="login-pass"
                contentBefore={<LockClosedRegular />}
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e, data) => setPassword(data.value)}
                size="large"
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

          <Button
            appearance="primary"
            size="large"
            type="submit"
            icon={<ArrowRightRegular />}
            iconPosition="after"
            disabled={loading}
            className={styles.submitBtn}
            style={{ width: '100%', marginTop: '4px', height: '44px', fontWeight: '600' }}
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </Button>
        </form>

        <div className={styles.divider} />

        {/* Quick Credentials */}
        <details className={styles.quickCreds}>
          <summary className={styles.quickSummary}>
            <ShieldCheckmarkRegular style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Acesso Rápido — Credenciais de Teste
          </summary>
          <ul className={styles.quickCredsList}>
            {QUICK_CREDENTIALS.map(cred => (
              <li key={cred.user}>
                <span
                  className={styles.quickLink}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuickLogin(cred.user, cred.pass)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuickLogin(cred.user, cred.pass)}
                >
                  <span>{cred.label} <span style={{ opacity: 0.5, fontSize: '0.73rem' }}>({cred.user} / {cred.pass})</span></span>
                  <span className={styles.roleBadge}>{cred.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

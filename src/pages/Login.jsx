import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title1,
  Text,
  Input,
  Button,
  Divider,
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
    backgroundColor: 'var(--bg-app)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute',
    top: '-10%', left: '-5%', width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(0,120,212,0.15) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%', filter: 'blur(40px)', zIndex: 0,
  },
  orb2: {
    position: 'absolute',
    bottom: '-15%', right: '-10%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(16,124,65,0.1) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%', filter: 'blur(50px)', zIndex: 0,
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color-strong)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1,
    backdropFilter: 'blur(20px)',
    animationName: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.6s',
    animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    animationFillMode: 'forwards',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  logoCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    boxShadow: '0 4px 16px rgba(0, 120, 212, 0.3)',
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
  errorMsg: {
    color: 'var(--color-error)',
    fontSize: 'var(--font-size-sm)',
    textAlign: 'center',
    padding: '8px',
    backgroundColor: 'var(--color-error-bg)',
    borderRadius: '4px',
    fontWeight: '600',
  },
  quickCreds: {
    backgroundColor: 'var(--color-brand-light)',
    border: '1px solid var(--color-brand)',
    borderRadius: '8px',
    padding: '12px',
    fontSize: 'var(--font-size-xs)',
  },
  quickCredsSummary: {
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-brand)',
    userSelect: 'none',
  },
  quickCredsList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  quickLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-app)',
    border: '1px solid var(--border-color)',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
      transform: 'translateY(-1px)',
      boxShadow: 'var(--shadow-sm)',
    },
    ':focus-visible': {
      outline: '2px solid var(--color-brand)',
      outlineOffset: '2px',
    }
  },
  roleBadge: {
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: '20px',
    backgroundColor: 'rgba(0,120,212,0.1)',
    color: 'var(--color-brand)',
  },
  submitBtn: {
    marginTop: '8px',
    height: '44px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    ':disabled': {
      backgroundColor: 'var(--color-brand-light)',
      color: 'var(--color-brand)',
      opacity: 0.8,
    }
  }
});

const QUICK_CREDENTIALS = [
  { label: 'Admin (Guilherme)', user: 'guilherme', pass: '123', role: 'admin' },
  { label: 'Monitor (Ana Paula)', user: 'anapaula', pass: '123', role: 'monitor' },
  { label: 'Secretaria (Renata)', user: 'renata', pass: '123', role: 'secretaria' },
  { label: 'Diretor (Marcelo)', user: 'marcelo', pass: '123', role: 'diretor' },
  { label: 'Terminal Sala 20', user: '20', pass: '123', role: 'terminal' },
  { label: 'Terminal Sala 21', user: '21', pass: '123', role: 'terminal' },
  { label: 'Terminal Sala 22', user: '22', pass: '123', role: 'terminal' },
  { label: 'Terminal Sala 23', user: '23', pass: '123', role: 'terminal' },
  { label: 'Terminal Sala 24', user: '24', pass: '123', role: 'terminal' },
];

export default function Login() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sanitização Básica OWASP Preventiva
  const sanitizeInput = (val) => val.trim().replace(/['";=]/g, '');

  const doLogin = (user, pass) => {
    const cleanUser = sanitizeInput(user);
    if (!cleanUser || !pass) {
      setError('Preencha os campos corretamente.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(cleanUser, pass);
      if (result.success) {
        navigate(result.user.role === 'terminal' ? '/mapa-sala' : '/monitor');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 400);
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
      {/* Background elements hidden from screen readers */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <main className={styles.card} role="main">
        <header className={styles.header}>
          <div className={styles.logoCircle} aria-hidden="true">📋</div>
          <Title1 as="h1">Prancheta Digital</Title1>
          <Text style={{ color: 'var(--color-text-secondary)' }}>
            Sistema de Gestão Escolar · ETI
          </Text>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} id="login-form" noValidate>
          <div className={styles.formGroup}>
            <Text weight="semibold" size={200} as="label" htmlFor="login-user">Usuário</Text>
            <Input
              id="login-user"
              contentBefore={<PersonRegular aria-hidden="true" />}
              placeholder="Digite seu login"
              value={username}
              onChange={(e, data) => setUsername(data.value)}
              size="large"
              autoFocus
              required
              aria-required="true"
              aria-invalid={!!error}
            />
          </div>

          <div className={styles.formGroup}>
            <Text weight="semibold" size={200} as="label" htmlFor="login-pass">Senha</Text>
            <Input
              id="login-pass"
              contentBefore={<LockClosedRegular aria-hidden="true" />}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e, data) => setPassword(data.value)}
              size="large"
              required
              aria-required="true"
            />
          </div>

          {/* Live region for accessibility announcements (errors) */}
          <div aria-live="polite" aria-atomic="true">
            {error && <div className={styles.errorMsg}>⚠️ {error}</div>}
          </div>

          <Button
            appearance="primary"
            size="large"
            type="submit"
            icon={<ArrowRightRegular />}
            iconPosition="after"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </Button>
        </form>

        <Divider />

        <details className={styles.quickCreds}>
          <summary className={styles.quickCredsSummary} aria-expanded="false">
            <ShieldCheckmarkRegular aria-hidden="true" /> Acesso Rápido — Credenciais de Teste
          </summary>
          <ul className={styles.quickCredsList} aria-label="Lista de credenciais rápidas">
            {QUICK_CREDENTIALS.map(cred => (
              <li key={cred.user}>
                <div
                  className={styles.quickLink}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuickLogin(cred.user, cred.pass)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuickLogin(cred.user, cred.pass)}
                  aria-label={`Entrar como ${cred.label}`}
                >
                  <span>
                    {cred.label} <span style={{ opacity: 0.6, fontSize: '0.75rem', marginLeft: '4px' }}>({cred.user})</span>
                  </span>
                  <span className={styles.roleBadge}>{cred.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </details>
      </main>
    </div>
  );
}

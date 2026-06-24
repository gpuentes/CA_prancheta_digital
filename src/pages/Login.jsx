import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title1,
  Text,
  Input,
  Button,
  Card,
  Divider,
} from '@fluentui/react-components';
import {
  PersonRegular,
  LockClosedRegular,
  ArrowRightRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-app)',
    padding: '20px',
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
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    animationName: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.5s',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
  },
  quickCreds: {
    backgroundColor: 'var(--color-brand-light)',
    border: '1px solid var(--color-brand)',
    borderRadius: '6px',
    padding: '12px',
    fontSize: 'var(--font-size-xs)',
  },
  quickCredsList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  quickLink: {
    color: 'var(--color-brand)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-xs)',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
      textDecoration: 'underline',
    },
  },
});

const QUICK_CREDENTIALS = [
  { label: 'Admin (Guilherme)', user: 'guilherme', pass: '123', role: 'admin' },
  { label: 'Monitor (Ana Paula)', user: 'anapaula', pass: '123', role: 'monitor' },
  { label: 'Secretaria (Renata)', user: 'renata', pass: '123', role: 'secretaria' },
  { label: 'Diretor (Marcelo)', user: 'marcelo', pass: '123', role: 'diretor' },
];

export default function Login() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        navigate('/monitor');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 300);
  };

  const handleQuickLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(user, pass);
      if (result.success) {
        navigate('/monitor');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoCircle}>P</div>
          <Title1>Prancheta Digital</Title1>
          <Text style={{ color: 'var(--color-text-secondary)' }}>
            Sistema de Gestão Escolar
          </Text>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} id="login-form">
          <div className={styles.formGroup}>
            <Text weight="semibold" size={200}>Usuário</Text>
            <Input
              id="login-user"
              contentBefore={<PersonRegular />}
              placeholder="Digite seu login"
              value={username}
              onChange={(e, data) => setUsername(data.value)}
              size="large"
              autoFocus
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Text weight="semibold" size={200}>Senha</Text>
            <Input
              id="login-pass"
              contentBefore={<LockClosedRegular />}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e, data) => setPassword(data.value)}
              size="large"
              required
            />
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <Button
            appearance="primary"
            size="large"
            type="submit"
            icon={<ArrowRightRegular />}
            iconPosition="after"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <Divider />

        <details className={styles.quickCreds}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
            🔑 Credenciais de teste
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
                  {cred.label} → {cred.user} / {cred.pass}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

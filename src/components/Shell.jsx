import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Text,
  Button,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import {
  HomeRegular,
  HomeFilled,
  ClipboardTaskListLtrRegular,
  ClipboardTaskListLtrFilled,
  AlertRegular,
  AlertFilled,
  PeopleRegular,
  PeopleFilled,
  SettingsRegular,
  SettingsFilled,
  SignOutRegular,
  TextFontSizeRegular,
  ColorRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  NavigationRegular,
  BoardRegular,
  BoardFilled,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-app)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    padding: '0 20px',
    backgroundColor: 'var(--bg-card)',
    borderBottom: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    zIndex: '100',
    position: 'sticky',
    top: '0',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: '600',
    letterSpacing: '-0.2px',
    color: 'var(--color-text)',
    whiteSpace: 'nowrap',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  a11yControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRight: '1px solid var(--border-color)',
    paddingRight: '12px',
    marginRight: '12px',
  },
  mainContainer: {
    display: 'flex',
    flex: '1',
  },
  sidebar: {
    width: '240px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px 8px',
    transition: 'width 0.2s ease, opacity 0.2s ease',
    flexShrink: '0',
    overflowY: 'auto',
    '@media (max-width: 768px)': {
      position: 'fixed',
      left: '0',
      top: '56px',
      bottom: '0',
      zIndex: '99',
      boxShadow: 'var(--shadow-lg)',
    },
  },
  sidebarHidden: {
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)',
      opacity: '0',
      pointerEvents: 'none',
    },
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '40px',
    padding: '0 12px',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textDecoration: 'none',
    userSelect: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    ':hover': {
      backgroundColor: 'var(--bg-sidebar-hover)',
      textDecoration: 'none',
    },
  },
  navItemActive: {
    backgroundColor: 'var(--bg-sidebar-active)',
    color: 'var(--color-brand)',
    fontWeight: '600',
  },
  sidebarFooter: {
    padding: '12px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
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
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentArea: {
    flex: '1',
    padding: '24px',
    overflowY: 'auto',
    backgroundColor: 'var(--bg-app)',
    minHeight: 'calc(100vh - 56px)',
  },
  mobileOverlay: {
    position: 'fixed',
    inset: '0',
    top: '56px',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: '98',
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
});

const TAB_CONFIG = {
  dashboard: { label: 'Dashboard', path: '/dashboard', icon: <BoardRegular />, iconActive: <BoardFilled />, roles: ['diretor', 'admin'] },
  patio:     { label: 'Pátio', path: '/monitor', icon: <ClipboardTaskListLtrRegular />, iconActive: <ClipboardTaskListLtrFilled />, roles: ['monitor', 'secretaria', 'diretor', 'admin'] },
  chamados:  { label: 'Chamados', path: '/chamados', icon: <AlertRegular />, iconActive: <AlertFilled />, roles: ['monitor', 'secretaria', 'diretor', 'admin'] },
  diretoria: { label: 'Campainha', path: '/diretoria', icon: <AlertRegular />, iconActive: <AlertFilled />, roles: ['secretaria', 'diretor', 'admin'] },
  cms:       { label: 'Cadastros', path: '/cms', icon: <PeopleRegular />, iconActive: <PeopleFilled />, roles: ['secretaria', 'diretor', 'admin'] },
  settings:  { label: 'Configurações', path: '/settings', icon: <SettingsRegular />, iconActive: <SettingsFilled />, roles: ['diretor', 'admin'] },
};

const ROLE_LABELS = {
  admin: 'Administrador',
  diretor: 'Diretor(a)',
  secretaria: 'Secretaria',
  monitor: 'Monitor(a)',
};

export default function Shell() {
  const styles = useStyles();
  const { currentUser, logout, state } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  // Permitted tabs based on role
  const permittedTabs = currentUser
    ? Object.entries(TAB_CONFIG).filter(([key, cfg]) => cfg.roles.includes(currentUser.role))
    : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsDark(!isDark);
  };

  const handleFontScale = (delta) => {
    let currentScale = parseFloat(document.documentElement.style.getPropertyValue('--font-scale')) || 1.0;
    currentScale = Math.max(0.7, Math.min(1.4, currentScale + delta));
    document.documentElement.style.setProperty('--font-scale', currentScale);
    localStorage.setItem('a11y_scale', currentScale);
  };

  const toggleContrast = () => {
    const isHigh = document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('a11y_contrast', isHigh);
  };

  // Restore theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      setIsDark(saved === 'dark');
    }
    const savedScale = parseFloat(localStorage.getItem('a11y_scale')) || 1.0;
    document.documentElement.style.setProperty('--font-scale', savedScale);
    const savedContrast = localStorage.getItem('a11y_contrast') === 'true';
    if (savedContrast) document.documentElement.classList.add('high-contrast');
  }, []);

  const appTitle = state?.settings?.appTitle || 'Prancheta Digital';
  const initials = currentUser ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '';

  return (
    <div className={styles.layout}>
      {/* ─── Header ─── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Button
            appearance="subtle"
            icon={<NavigationRegular />}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
            className="mobile-menu-btn"
          />
          <span className={styles.headerTitle}>{appTitle}</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.a11yControls}>
            <Tooltip content="Diminuir fonte" relationship="label">
              <Button appearance="subtle" size="small" icon={<TextFontSizeRegular />} onClick={() => handleFontScale(-0.1)} aria-label="Diminuir fonte">A-</Button>
            </Tooltip>
            <Tooltip content="Aumentar fonte" relationship="label">
              <Button appearance="subtle" size="small" icon={<TextFontSizeRegular />} onClick={() => handleFontScale(0.1)} aria-label="Aumentar fonte">A+</Button>
            </Tooltip>
            <Tooltip content="Alto contraste" relationship="label">
              <Button appearance="subtle" size="small" icon={<ColorRegular />} onClick={toggleContrast} aria-label="Alto contraste" />
            </Tooltip>
            <Tooltip content={isDark ? 'Modo claro' : 'Modo escuro'} relationship="label">
              <Button
                appearance="subtle"
                size="small"
                icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
                onClick={toggleTheme}
                aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
              />
            </Tooltip>
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <div className={styles.mainContainer}>
        {/* Sidebar */}
        {sidebarOpen && (
          <>
            <nav className={`${styles.sidebar}`} aria-label="Navegação principal">
              <div className={styles.sidebarNav}>
                {permittedTabs.map(([key, cfg]) => (
                  <NavLink
                    key={key}
                    to={cfg.path}
                    className={({ isActive }) =>
                      `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                    }
                    onClick={() => {
                      if (window.innerWidth <= 768) setSidebarOpen(false);
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? cfg.iconActive : cfg.icon}
                        <span>{cfg.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className={styles.sidebarFooter}>
                <div className={styles.userBadge}>
                  <div className={styles.userAvatar}>{initials}</div>
                  <div className={styles.userInfo}>
                    <Text weight="semibold" size={200}>{currentUser?.name}</Text>
                    <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                      {ROLE_LABELS[currentUser?.role] || currentUser?.role}
                    </Text>
                  </div>
                </div>
                <Button
                  appearance="subtle"
                  icon={<SignOutRegular />}
                  onClick={handleLogout}
                  style={{ justifyContent: 'flex-start' }}
                >
                  Sair
                </Button>
              </div>
            </nav>
            {/* Mobile overlay */}
            <div
              className={styles.mobileOverlay}
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}

        {/* Content */}
        <main className={`${styles.contentArea} content-area`} aria-label="Conteúdo principal">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

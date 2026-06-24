import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Card,
  Button,
  Input,
  Checkbox,
  Divider,
} from '@fluentui/react-components';
import {
  SaveRegular,
  ArrowUploadRegular,
  ArrowDownloadRegular,
  PaintBrushRegular,
  ImageRegular,
  DismissRegular,
  NavigationRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '800px',
  },
  section: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  colorPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  colorSwatch: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
  },
  tabPermGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto repeat(4, 1fr)',
    gap: '8px',
    alignItems: 'center',
    marginTop: '12px',
  },
  tabPermHeader: {
    fontWeight: '600',
    fontSize: 'var(--font-size-sm)',
    textAlign: 'center',
  },
  dataSection: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  uploadStatus: {
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: 'var(--font-size-sm)',
  },
});

const ALL_TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'patio', label: 'Pátio' },
  { key: 'chamados', label: 'Chamados' },
  { key: 'cms', label: 'Cadastros' },
  { key: 'settings', label: 'Configurações' },
];

const ROLES = ['monitor', 'secretaria', 'diretor', 'admin'];

export default function Settings() {
  const styles = useStyles();
  const { state, updateSettings, importStudentsCSV, exportOccurrencesCSV } = useAuth();
  const fileInputRef = useRef(null);

  const [appTitle, setAppTitle] = useState(state.settings?.appTitle || 'Prancheta Digital Escola');
  const [ctaLabel, setCtaLabel] = useState(state.settings?.patioCta?.label || 'FALTA DE UNIFORME');
  const [ctaBg, setCtaBg] = useState(state.settings?.patioCta?.bgColor || '#107c41');
  const [ctaText, setCtaText] = useState(state.settings?.patioCta?.textColor || '#ffffff');
  const [uploadMsg, setUploadMsg] = useState('');
  const [tabConfig, setTabConfig] = useState(state.settings?.customTabs || {});

  const handleSaveWhiteLabel = (e) => {
    e.preventDefault();
    updateSettings({
      appTitle,
      patioCta: {
        label: ctaLabel,
        bgColor: ctaBg,
        textColor: ctaText,
        borderRadius: '2px',
      },
    });
    alert('Configurações salvas com sucesso!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateSettings({ logoUrl: reader.result });
        alert('Logo atualizado!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    updateSettings({ logoUrl: '' });
  };

  const handleCSVImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = importStudentsCSV(ev.target.result);
          if (result.success) {
            setUploadMsg(`✓ Sucesso! ${result.count} estudantes carregados.`);
          } else {
            setUploadMsg(`❌ Erro: ${result.message}`);
          }
        };
        reader.readAsText(file, 'UTF-8');
      }
    };
    input.click();
  };

  const handleCSVExport = () => {
    const csv = exportOccurrencesCSV();
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ocorrencias_Patio_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleTabPerm = (role, tab) => {
    setTabConfig(prev => {
      const current = prev[role] || [];
      const updated = current.includes(tab)
        ? current.filter(t => t !== tab)
        : [...current, tab];
      return { ...prev, [role]: updated };
    });
  };

  const handleSaveTabPerms = (e) => {
    e.preventDefault();
    // Ensure a11y is always available
    const finalConfig = {};
    ROLES.forEach(role => {
      const tabs = tabConfig[role] || [];
      if (!tabs.includes('a11y')) tabs.push('a11y');
      finalConfig[role] = tabs;
    });
    updateSettings({ customTabs: finalConfig });
    alert('Permissões de navegação salvas!');
  };

  return (
    <div className={styles.container}>
      <Title2>Configurações</Title2>

      {/* ─── White Label ─── */}
      <Card className={styles.section} appearance="outline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PaintBrushRegular />
          <Title3>White Label</Title3>
        </div>
        <form onSubmit={handleSaveWhiteLabel}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <Text weight="semibold" size={200}>Título do App</Text>
              <Input value={appTitle} onChange={(e, d) => setAppTitle(d.value)} />
            </div>
            <div className={styles.formGroup}>
              <Text weight="semibold" size={200}>CTA Principal (Pátio)</Text>
              <Input value={ctaLabel} onChange={(e, d) => setCtaLabel(d.value)} />
            </div>
            <div className={styles.formGroup}>
              <Text weight="semibold" size={200}>Cor de Fundo CTA</Text>
              <div className={styles.colorPreview}>
                <input type="color" value={ctaBg} onChange={(e) => setCtaBg(e.target.value)} />
                <div className={styles.colorSwatch} style={{ backgroundColor: ctaBg }} />
                <Text size={200}>{ctaBg}</Text>
              </div>
            </div>
            <div className={styles.formGroup}>
              <Text weight="semibold" size={200}>Cor do Texto CTA</Text>
              <div className={styles.colorPreview}>
                <input type="color" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
                <div className={styles.colorSwatch} style={{ backgroundColor: ctaText }} />
                <Text size={200}>{ctaText}</Text>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <Button appearance="primary" icon={<SaveRegular />} type="submit">Salvar Configurações</Button>
            <Button appearance="secondary" icon={<ImageRegular />} onClick={() => fileInputRef.current?.click()}>Upload Logo</Button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleLogoUpload} />
            {state.settings?.logoUrl && (
              <Button appearance="subtle" icon={<DismissRegular />} onClick={handleClearLogo}>Remover Logo</Button>
            )}
          </div>
        </form>
      </Card>

      {/* ─── Tab Permissions ─── */}
      <Card className={styles.section} appearance="outline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NavigationRegular />
          <Title3>Permissões de Navegação</Title3>
        </div>
        <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
          Configure quais abas cada perfil pode acessar.
        </Text>
        <form onSubmit={handleSaveTabPerms}>
          <div className={styles.tabPermGrid}>
            <div />
            {ROLES.map(role => (
              <div key={role} className={styles.tabPermHeader}>{role}</div>
            ))}
            {ALL_TABS.map(tab => (
              <React.Fragment key={tab.key}>
                <Text size={200} weight="semibold">{tab.label}</Text>
                {ROLES.map(role => (
                  <div key={`${role}-${tab.key}`} style={{ textAlign: 'center' }}>
                    <Checkbox
                      checked={(tabConfig[role] || []).includes(tab.key)}
                      onChange={() => toggleTabPerm(role, tab.key)}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <Button appearance="primary" icon={<SaveRegular />} type="submit" style={{ marginTop: '16px' }}>
            Salvar Permissões
          </Button>
        </form>
      </Card>

      {/* ─── Data Import/Export ─── */}
      <Card className={styles.section} appearance="outline">
        <Title3>Dados</Title3>
        <div className={styles.dataSection}>
          <Button appearance="secondary" icon={<ArrowUploadRegular />} onClick={handleCSVImport}>
            Importar Alunos (CSV)
          </Button>
          <Button appearance="secondary" icon={<ArrowDownloadRegular />} onClick={handleCSVExport}>
            Exportar Ocorrências (CSV)
          </Button>
        </div>
        {uploadMsg && (
          <div
            className={styles.uploadStatus}
            style={{
              backgroundColor: uploadMsg.includes('✓') ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
              color: uploadMsg.includes('✓') ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {uploadMsg}
          </div>
        )}
      </Card>
    </div>
  );
}

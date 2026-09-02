import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  TabList,
  Tab,
} from '@fluentui/react-components';
import { AlertRegular, ClipboardTaskListLtrRegular } from '@fluentui/react-icons';
import AbaCampainha from '../components/patio/AbaCampainha.jsx';
import AbaOcorrencia from '../components/patio/AbaOcorrencia.jsx';
import AbaCampainhaLista from '../components/patio/AbaCampainhaLista.jsx';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '850px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
});

export default function Patio() {
  const styles = useStyles();
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState('campainha');

  const isSecretaria = currentUser && ['secretaria', 'admin', 'diretor'].includes(currentUser.role);

  return (
    <div className={styles.container}>
      {/* ─── Header & Navigation Tabs ─── */}
      <div className={styles.headerRow}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          {isSecretaria ? (
            <>
              <Title2 style={{ fontWeight: '400' }}>Secretaria</Title2>
              <Title2>{currentUser?.name}</Title2>
            </>
          ) : (
            <Title2>Prancheta</Title2>
          )}
        </div>

        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value)}
          size="large"
        >
          <Tab value="campainha" icon={<AlertRegular />}>
            CAMPAINHA
          </Tab>
          {isSecretaria && (
            <Tab value="campainha_lista" icon={<ClipboardTaskListLtrRegular />}>
              CAMPAINHA LISTA
            </Tab>
          )}
          <Tab value="ocorrencia" icon={<ClipboardTaskListLtrRegular />}>
            PRANCHETA
          </Tab>
        </TabList>
      </div>

      {/* ─── Active Tab Content ─── */}
      {selectedTab === 'campainha' && <AbaCampainha />}
      {selectedTab === 'ocorrencia' && <AbaOcorrencia />}
      {selectedTab === 'campainha_lista' && <AbaCampainhaLista />}
    </div>
  );
}

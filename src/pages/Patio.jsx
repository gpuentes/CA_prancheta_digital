import React, { useState } from 'react';
import {
  makeStyles,
  Title2,
  TabList,
  Tab,
} from '@fluentui/react-components';
import { AlertRegular, ClipboardTaskListLtrRegular } from '@fluentui/react-icons';
import AbaCampainha from '../components/patio/AbaCampainha.jsx';
import AbaOcorrencia from '../components/patio/AbaOcorrencia.jsx';

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
  const [selectedTab, setSelectedTab] = useState('campainha');

  return (
    <div className={styles.container}>
      {/* ─── Header & Navigation Tabs ─── */}
      <div className={styles.headerRow}>
        <Title2>Prancheta</Title2>

        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value)}
          size="large"
        >
          <Tab value="campainha" icon={<AlertRegular />}>
            CAMPAINHA
          </Tab>
          <Tab value="ocorrencia" icon={<ClipboardTaskListLtrRegular />}>
            OCORRÊNCIA PÁTIO
          </Tab>
        </TabList>
      </div>

      {/* ─── Active Tab Content ─── */}
      {selectedTab === 'campainha' && <AbaCampainha />}
      {selectedTab === 'ocorrencia' && <AbaOcorrencia />}
    </div>
  );
}

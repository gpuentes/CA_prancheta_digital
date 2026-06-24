import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Card,
  Badge,
  Divider,
  TabList,
  Tab,
} from '@fluentui/react-components';
import {
  DataBarVerticalRegular,
  ClockRegular,
  TagRegular,
  AlertUrgentRegular,
  PersonRegular,
  LocationRegular,
  WeatherSunnyRegular,
  WeatherPartlyCloudyDayRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    padding: '20px',
    textAlign: 'center',
    animationName: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.4s',
    animationFillMode: 'forwards',
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--color-brand)',
    lineHeight: '1.2',
  },
  metricLabel: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-secondary)',
    marginTop: '4px',
  },
  widgetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px',
  },
  widget: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animationName: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid var(--border-color)',
  },
  chartContainer: {
    width: '100%',
    height: '200px',
  },
  barChart: {
    width: '100%',
    height: '100%',
  },
  heatmapItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
  },
  heatmapBarWrapper: {
    flex: 1,
    height: '12px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  heatmapBar: {
    height: '100%',
    backgroundColor: 'var(--color-danger)', // Red for heatmap
    borderRadius: '6px',
    transition: 'width 0.3s ease',
  },
});

// Severity color mapping
const SEVERITY_COLORS = {
  error: '#a80000',
  warning: '#d83b01',
  info: '#0078d4',
};

export default function Dashboard() {
  const styles = useStyles();
  const { state } = useAuth();
  const [shift, setShift] = React.useState('todos'); // 'todos', 'manha', 'tarde'

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Filter occurrences based on shift
    const filteredOccurrences = state.occurrences.filter(occ => {
      if (shift === 'todos') return true;
      const h = new Date(occ.date).getHours();
      if (shift === 'manha') return h >= 6 && h < 13;
      if (shift === 'tarde') return h >= 13 && h < 19;
      return false; // Night occurrences ignored in these filters
    });

    const totalOcc = filteredOccurrences.length;
    const todayOcc = filteredOccurrences.filter(o => new Date(o.date) >= today).length;
    const weekOcc = filteredOccurrences.filter(o => new Date(o.date) >= weekAgo).length;
    const openTickets = state.tickets.filter(t => t.status === 'Aberto').length;
    const totalStudents = state.students.length;

    // Heatmap (Locations)
    const locationMap = {};
    filteredOccurrences.forEach(occ => {
      const loc = occ.location || 'Não informado';
      locationMap[loc] = (locationMap[loc] || 0) + 1;
    });
    const locations = Object.entries(locationMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const maxLocationCount = locations.length > 0 ? locations[0][1] : 1;

    // Recurrent students (3+ in 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const studentOccCount = {};
    filteredOccurrences
      .filter(o => new Date(o.date) >= thirtyDaysAgo)
      .forEach(o => {
        studentOccCount[o.studentId] = (studentOccCount[o.studentId] || 0) + 1;
      });
    const recurrentStudents = Object.entries(studentOccCount)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => {
        const student = state.students.find(s => s.id === id);
        return { student, count };
      })
      .filter(item => item.student);

    return { totalOcc, todayOcc, weekOcc, openTickets, totalStudents, locations, maxLocationCount, recurrentStudents };
  }, [state.occurrences, state.tickets, state.students, shift]);

  const maxHourVal = Math.max(...(stats.hours.map(h => h[1])), 1);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Title2>Dashboard Executivo</Title2>
        <TabList selectedValue={shift} onTabSelect={(e, data) => setShift(data.value)}>
          <Tab value="todos">Tudo</Tab>
          <Tab value="manha" icon={<WeatherSunnyRegular />}>Manhã</Tab>
          <Tab value="tarde" icon={<WeatherPartlyCloudyDayRegular />}>Tarde</Tab>
        </TabList>
      </div>

      {/* ─── Metrics ─── */}
      <div className={styles.metricsRow}>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue}>{stats.totalOcc}</div>
          <div className={styles.metricLabel}>Ocorrências Total</div>
        </Card>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue}>{stats.todayOcc}</div>
          <div className={styles.metricLabel}>Hoje</div>
        </Card>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue}>{stats.weekOcc}</div>
          <div className={styles.metricLabel}>Últimos 7 dias</div>
        </Card>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue} style={{ color: stats.openTickets > 0 ? 'var(--color-warning)' : 'var(--color-success)' }}>
            {stats.openTickets}
          </div>
          <div className={styles.metricLabel}>Chamados Abertos</div>
        </Card>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue}>{stats.totalStudents}</div>
          <div className={styles.metricLabel}>Alunos Cadastrados</div>
        </Card>
      </div>

      {/* ─── Widgets ─── */}
      <div className={styles.widgetGrid}>

        {/* Heatmap (Áreas Quentes) */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <LocationRegular />
              <Title3>Áreas Quentes (Heatmap)</Title3>
            </div>
            <Badge appearance="tint" color="danger">Risco</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.locations.map(([label, count]) => {
              const widthPct = Math.max(10, (count / stats.maxLocationCount) * 100);
              return (
                <div key={label} className={styles.heatmapItem}>
                  <Text style={{ width: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</Text>
                  <div className={styles.heatmapBarWrapper}>
                    <div className={styles.heatmapBar} style={{ width: `${widthPct}%`, opacity: Math.max(0.4, count / stats.maxLocationCount) }} />
                  </div>
                  <Text weight="semibold" style={{ width: '30px', textAlign: 'right' }}>{count}</Text>
                </div>
              );
            })}
            {stats.locations.length === 0 && (
              <Text style={{ color: 'var(--color-text-secondary)' }}>Sem dados de localização no período.</Text>
            )}
          </div>
        </Card>

        {/* Recurrent Students (Top Offenders) */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <AlertUrgentRegular />
              <Title3>Alunos em Risco</Title3>
            </div>
            <Badge appearance="tint" color="warning">Atenção</Badge>
          </div>
          {stats.recurrentStudents.map(({ student, count }) => (
            <div key={student.id} className={styles.listItem}>
              <Text weight="semibold">{student.firstName} {student.lastName}</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{student.classId}</Text>
                <Badge appearance="filled" color="warning">{count}x</Badge>
              </div>
            </div>
          ))}
          {stats.recurrentStudents.length === 0 && (
            <Text style={{ color: 'var(--color-text-secondary)' }}>Nenhum aluno recorrente.</Text>
          )}
        </Card>
      </div>
    </div>
  );
}

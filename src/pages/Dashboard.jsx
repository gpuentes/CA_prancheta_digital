import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Card,
  Badge,
  TabList,
  Tab,
} from '@fluentui/react-components';
import {
  AlertUrgentRegular,
  LocationRegular,
  WeatherSunnyRegular,
  WeatherPartlyCloudyDayRegular,
  ClockRegular,
  TicketDiagonalRegular,
  PeopleRegular,
  DataBarVerticalRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  // ── Metric Cards ──
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px !important',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.1) !important',
    },
    animationName: {
      from: { opacity: 0, transform: 'translateY(16px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.4s',
    animationFillMode: 'forwards',
  },
  metricIconBg: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.02em',
  },
  metricLabel: {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.3',
    fontWeight: '500',
  },
  metricAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3px',
    height: '100%',
    borderRadius: '12px 0 0 12px',
  },
  // ── Widget Grid ──
  widgetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
  },
  widget: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderRadius: '12px !important',
    animationName: {
      from: { opacity: 0, transform: 'translateY(12px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    fontSize: '0.9375rem',
  },
  // ── Heatmap Bars ──
  heatmapItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 0',
  },
  heatmapLabel: {
    width: '130px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.8125rem',
    flexShrink: 0,
  },
  heatmapBarWrapper: {
    flex: 1,
    height: '10px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  heatmapBar: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  heatmapCount: {
    width: '28px',
    textAlign: 'right',
    fontSize: '0.8125rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  // ── List Items (Recurrent / Tickets) ──
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid var(--border-color)',
    ':last-child': { borderBottom: 'none' },
  },
  studentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  // ── SLA Badge ──
  slaBadgeGreen: { color: '#107c41', backgroundColor: '#dff6dd', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' },
  slaBadgeYellow: { color: '#7f5200', backgroundColor: '#fff4ce', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' },
  slaBadgeRed: { color: '#a80000', backgroundColor: '#fde7e9', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' },
  // ── Bar Chart (Hora por hora) ──
  hourChart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    height: '80px',
    padding: '8px 0 0',
  },
  hourBar: {
    flex: 1,
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.5s ease',
    cursor: 'default',
    ':hover': { opacity: '0.8' },
  },
  hourBarLabel: {
    fontSize: '0.6rem',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    marginTop: '4px',
  },
  emptyState: {
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '0.875rem',
  },
});

// Mapa de cores por local (heatmap)
const LOCATION_COLORS = [
  'linear-gradient(90deg, #a80000, #d83b01)',
  'linear-gradient(90deg, #d83b01, #ffaa44)',
  'linear-gradient(90deg, #ffaa44, #ffd966)',
  'linear-gradient(90deg, #0078d4, #2b88d8)',
  'linear-gradient(90deg, #107c41, #27ae60)',
];

// SLA helper (minutes)
function getSLAStatus(createdAt) {
  const mins = Math.floor((Date.now() - new Date(createdAt)) / 60000);
  if (mins < 10) return { label: `${mins}min`, cls: 'green', emoji: '🟢' };
  if (mins < 30) return { label: `${mins}min`, cls: 'yellow', emoji: '🟡' };
  return { label: `${mins}min`, cls: 'red', emoji: '🔴' };
}

const METRIC_CONFIG = [
  { key: 'totalOcc',    label: 'Ocorrências Total',    color: '#0078d4', bg: 'rgba(0,120,212,0.12)',  icon: <DataBarVerticalRegular style={{ color: '#0078d4' }} /> },
  { key: 'todayOcc',   label: 'Hoje',                 color: '#107c41', bg: 'rgba(16,124,65,0.12)',  icon: <WeatherSunnyRegular style={{ color: '#107c41' }} /> },
  { key: 'weekOcc',    label: 'Últimos 7 Dias',        color: '#6b46c1', bg: 'rgba(107,70,193,0.12)', icon: <ClockRegular style={{ color: '#6b46c1' }} /> },
  { key: 'openTickets',label: 'Chamados Abertos',      color: '#d83b01', bg: 'rgba(216,59,1,0.12)',  icon: <TicketDiagonalRegular style={{ color: '#d83b01' }} /> },
  { key: 'totalStudents', label: 'Alunos Cadastrados', color: '#8764b8', bg: 'rgba(135,100,184,0.12)', icon: <PeopleRegular style={{ color: '#8764b8' }} /> },
];

const SHIFT_HOURS = {
  manha: [6, 7, 8, 9, 10, 11, 12],
  tarde: [13, 14, 15, 16, 17, 18],
  todos: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
};

export default function Dashboard() {
  const styles = useStyles();
  const { state } = useAuth();
  const [shift, setShift] = React.useState('todos');

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const filteredOccurrences = state.occurrences.filter(occ => {
      if (shift === 'todos') return true;
      const h = new Date(occ.date).getHours();
      if (shift === 'manha') return h >= 6 && h < 13;
      if (shift === 'tarde') return h >= 13 && h < 19;
      return false;
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

    // Recurrent students (2+ in 30 days)
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
      .filter(item => item.student)
      .slice(0, 6);

    // Hourly distribution
    const hourMap = {};
    SHIFT_HOURS[shift].forEach(h => { hourMap[h] = 0; });
    filteredOccurrences.forEach(occ => {
      const h = new Date(occ.date).getHours();
      if (hourMap[h] !== undefined) hourMap[h]++;
    });
    const hours = Object.entries(hourMap);
    const maxHourVal = Math.max(...hours.map(([, v]) => v), 1);

    // Active tickets sorted by SLA urgency
    const activeTickets = state.tickets
      .filter(t => t.status !== 'Concluído')
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 5);

    return { totalOcc, todayOcc, weekOcc, openTickets, totalStudents, locations, maxLocationCount, recurrentStudents, hours, maxHourVal, activeTickets };
  }, [state.occurrences, state.tickets, state.students, shift]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <Title2>Dashboard Executivo</Title2>
        <TabList selectedValue={shift} onTabSelect={(e, data) => setShift(data.value)}>
          <Tab value="todos">Todos os turnos</Tab>
          <Tab value="manha" icon={<WeatherSunnyRegular />}>Manhã</Tab>
          <Tab value="tarde" icon={<WeatherPartlyCloudyDayRegular />}>Tarde</Tab>
        </TabList>
      </div>

      {/* ── Metric Cards ── */}
      <div className={styles.metricsRow}>
        {METRIC_CONFIG.map((m, i) => {
          const value = stats[m.key];
          return (
            <Card key={m.key} className={styles.metricCard} appearance="outline"
              style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={styles.metricAccent} style={{ background: m.color }} />
              <div className={styles.metricIconBg} style={{ background: m.bg }}>
                {m.icon}
              </div>
              <div className={styles.metricValue} style={{ color: m.color }}>{value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </Card>
          );
        })}
      </div>

      {/* ── Widgets Row 1 ── */}
      <div className={styles.widgetGrid}>

        {/* Heatmap (Áreas Quentes) */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <LocationRegular />
              <span>Áreas Quentes (Heatmap)</span>
            </div>
            <Badge appearance="tint" color="danger">Risco</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {stats.locations.map(([label, count], i) => {
              const widthPct = Math.max(8, (count / stats.maxLocationCount) * 100);
              return (
                <div key={label} className={styles.heatmapItem}>
                  <span className={styles.heatmapLabel}>{label}</span>
                  <div className={styles.heatmapBarWrapper}>
                    <div
                      className={styles.heatmapBar}
                      style={{ width: `${widthPct}%`, background: LOCATION_COLORS[i] || LOCATION_COLORS[4] }}
                    />
                  </div>
                  <span className={styles.heatmapCount}>{count}</span>
                </div>
              );
            })}
            {stats.locations.length === 0 && (
              <div className={styles.emptyState}>Sem dados de localização no período.</div>
            )}
          </div>
        </Card>

        {/* Hourly Distribution */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <ClockRegular />
              <span>Distribuição por Hora</span>
            </div>
            <Badge appearance="tint" color="informative">Período</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div className={styles.hourChart}>
              {stats.hours.map(([hour, count]) => {
                const pct = stats.maxHourVal > 0 ? (count / stats.maxHourVal) : 0;
                const h = parseInt(hour);
                const isManha = h < 13;
                return (
                  <div key={hour} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div
                      className={styles.hourBar}
                      title={`${hour}h: ${count} ocorrências`}
                      style={{
                        height: `${Math.max(4, pct * 72)}px`,
                        background: count > 0
                          ? (isManha ? 'linear-gradient(to top, #0078d4, #40a9ff)' : 'linear-gradient(to top, #d83b01, #ffaa44)')
                          : 'var(--bg-sidebar)',
                        opacity: count > 0 ? 0.7 + pct * 0.3 : 0.3,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '4px', paddingTop: '4px' }}>
              {stats.hours.map(([hour]) => (
                <div key={hour} className={styles.hourBarLabel} style={{ flex: 1 }}>
                  {hour}h
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Widgets Row 2 ── */}
      <div className={styles.widgetGrid}>

        {/* Alunos em Risco */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <AlertUrgentRegular />
              <span>Alunos em Risco (30 dias)</span>
            </div>
            <Badge appearance="tint" color="warning">Atenção</Badge>
          </div>
          {stats.recurrentStudents.length > 0 ? stats.recurrentStudents.map(({ student, count }) => (
            <div key={student.id} className={styles.listItem}>
              <div className={styles.studentInfo}>
                <Text weight="semibold" size={300}>{student.firstName} {student.lastName}</Text>
                <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>{student.classId}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  background: count >= 4 ? 'rgba(168,0,0,0.12)' : 'rgba(216,59,1,0.1)',
                  color: count >= 4 ? 'var(--color-error)' : 'var(--color-warning)',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  padding: '4px 12px',
                  borderRadius: '8px',
                }}>
                  {count}x
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>✅ Nenhum aluno recorrente no período.</div>
          )}
        </Card>

        {/* SLA de Chamados Ativos */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <TicketDiagonalRegular />
              <span>Fila de Chamados (SLA)</span>
            </div>
            <Badge appearance="filled" color={stats.openTickets > 0 ? 'danger' : 'success'}>
              {stats.openTickets} aberto{stats.openTickets !== 1 ? 's' : ''}
            </Badge>
          </div>
          {stats.activeTickets.length > 0 ? stats.activeTickets.map(ticket => {
            const sla = getSLAStatus(ticket.createdAt);
            const slaCls = sla.cls === 'green' ? styles.slaBadgeGreen : sla.cls === 'yellow' ? styles.slaBadgeYellow : styles.slaBadgeRed;
            return (
              <div key={ticket.id} className={styles.listItem}>
                <div className={styles.studentInfo}>
                  <Text weight="semibold" size={300}>{ticket.studentName}</Text>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                    {ticket.classId} · {ticket.reasons[0]}
                  </Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className={slaCls}>{sla.emoji} {sla.label}</span>
                  <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>{ticket.status}</Text>
                </div>
              </div>
            );
          }) : (
            <div className={styles.emptyState}>✅ Nenhum chamado ativo no momento.</div>
          )}
        </Card>
      </div>
    </div>
  );
}

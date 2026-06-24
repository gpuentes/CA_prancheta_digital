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
} from '@fluentui/react-components';
import {
  DataBarVerticalRegular,
  ClockRegular,
  TagRegular,
  AlertUrgentRegular,
  PersonRegular,
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
    gap: '8px',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--border-color)',
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

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const totalOcc = state.occurrences.length;
    const todayOcc = state.occurrences.filter(o => new Date(o.date) >= today).length;
    const weekOcc = state.occurrences.filter(o => new Date(o.date) >= weekAgo).length;
    const openTickets = state.tickets.filter(t => t.status === 'Aberto').length;
    const totalStudents = state.students.length;

    // Category breakdown
    const categoryMap = {};
    state.occurrences.forEach(occ => {
      occ.reasons.forEach(r => {
        categoryMap[r] = (categoryMap[r] || 0) + 1;
      });
    });
    const categories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    // Hourly distribution
    const hourMap = {};
    state.occurrences.forEach(occ => {
      const h = new Date(occ.date).getHours();
      const label = `${h}h`;
      hourMap[label] = (hourMap[label] || 0) + 1;
    });
    const hours = Object.entries(hourMap).sort((a, b) => {
      return parseInt(a[0]) - parseInt(b[0]);
    });

    // Recurrent students (3+ in 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const studentOccCount = {};
    state.occurrences
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

    // Monitor activity
    const monitorMap = {};
    state.occurrences.forEach(occ => {
      if (occ.monitorName) {
        monitorMap[occ.monitorName] = (monitorMap[occ.monitorName] || 0) + 1;
      }
    });
    const monitors = Object.entries(monitorMap)
      .sort((a, b) => b[1] - a[1]);

    return { totalOcc, todayOcc, weekOcc, openTickets, totalStudents, categories, hours, recurrentStudents, monitors };
  }, [state.occurrences, state.tickets, state.students]);

  const maxHourVal = Math.max(...(stats.hours.map(h => h[1])), 1);

  return (
    <div className={styles.container}>
      <Title2>Dashboard</Title2>

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
        {/* Hourly Chart */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <ClockRegular />
            <Title3>Distribuição por Horário</Title3>
          </div>
          <div className={styles.chartContainer}>
            <svg className={styles.barChart} viewBox="0 0 400 200" preserveAspectRatio="none">
              {stats.hours.map(([label, count], i) => {
                const barWidth = Math.max(30, 400 / (stats.hours.length || 1) - 8);
                const barHeight = (count / maxHourVal) * 160;
                const x = i * (barWidth + 8) + 4;
                return (
                  <g key={label}>
                    <rect
                      x={x}
                      y={200 - barHeight - 20}
                      width={barWidth}
                      height={barHeight}
                      fill="var(--color-brand)"
                      rx="3"
                      style={{ transition: 'height 0.3s ease' }}
                    >
                      <title>{label}: {count} ocorrências</title>
                    </rect>
                    <text
                      x={x + barWidth / 2}
                      y={195}
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--color-text-secondary)"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Card>

        {/* Categories */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <TagRegular />
            <Title3>Por Categoria</Title3>
          </div>
          {stats.categories.map(([label, count]) => (
            <div key={label} className={styles.listItem}>
              <Text>{label}</Text>
              <Badge appearance="filled" color="informative">{count}</Badge>
            </div>
          ))}
          {stats.categories.length === 0 && (
            <Text style={{ color: 'var(--color-text-secondary)' }}>Nenhuma ocorrência registrada.</Text>
          )}
        </Card>

        {/* Recurrent Students */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <AlertUrgentRegular />
            <Title3>Alunos Recorrentes</Title3>
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

        {/* Monitor Activity */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <PersonRegular />
            <Title3>Atividade por Monitor</Title3>
          </div>
          {stats.monitors.map(([name, count]) => (
            <div key={name} className={styles.listItem}>
              <Text>{name}</Text>
              <Badge appearance="filled" color="brand">{count}</Badge>
            </div>
          ))}
          {stats.monitors.length === 0 && (
            <Text style={{ color: 'var(--color-text-secondary)' }}>Sem registros.</Text>
          )}
        </Card>
      </div>
    </div>
  );
}

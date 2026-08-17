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
} from '@fluentui/react-icons';
import {
  ChartHorarioPico,
  ChartCategorias,
  ChartTendenciaSemanal,
  ChartMonitores,
} from './DashboardCharts.jsx';

// ─── Estilos ────────────────────────────────────────────────────────────────
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
    backgroundColor: 'var(--color-danger)',
    borderRadius: '6px',
    transition: 'width 0.3s ease',
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function buildByHour(occurrences) {
  const map = {};
  for (let h = 6; h <= 18; h++) map[h] = 0;
  occurrences.forEach(occ => {
    const h = new Date(occ.date).getHours();
    if (h >= 6 && h <= 18) map[h] = (map[h] || 0) + 1;
  });
  return Object.entries(map).map(([hora, total]) => ({ hora: Number(hora), total }));
}

function buildByCategory(occurrences) {
  const map = {};
  occurrences.forEach(occ => {
    (occ.reasons || []).forEach(r => { map[r] = (map[r] || 0) + 1; });
  });
  return Object.entries(map)
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
}

function buildByDay(occurrences) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const end = new Date(start); end.setDate(end.getDate() + 1);
    return {
      dia: WEEK_DAYS[d.getDay()],
      total: occurrences.filter(o => {
        const dt = new Date(o.date);
        return dt >= start && dt < end;
      }).length,
    };
  });
}

function buildByMonitor(occurrences) {
  const map = {};
  occurrences.forEach(occ => {
    const m = occ.monitorName || 'Desconhecido';
    map[m] = (map[m] || 0) + 1;
  });
  return Object.entries(map)
    .map(([monitor, total]) => ({ monitor, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function Dashboard() {
  const styles = useStyles();
  const { state } = useAuth();
  const [shift, setShift] = React.useState('todos');

  const filtered = useMemo(() => {
    return state.occurrences.filter(occ => {
      if (shift === 'todos') return true;
      const h = new Date(occ.date).getHours();
      if (shift === 'manha') return h >= 6 && h < 13;
      if (shift === 'tarde') return h >= 13 && h < 19;
      return false;
    });
  }, [state.occurrences, shift]);

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
    const thirtyAgo = new Date(); thirtyAgo.setDate(thirtyAgo.getDate() - 30);

    // Métricas simples
    const totalOcc   = filtered.length;
    const todayOcc   = filtered.filter(o => new Date(o.date) >= today).length;
    const weekOcc    = filtered.filter(o => new Date(o.date) >= weekAgo).length;
    const openTickets = state.tickets.filter(t => t.status === 'Aberto').length;
    const totalStudents = state.students.length;

    // Heatmap de locais
    const locationMap = {};
    filtered.forEach(occ => {
      const loc = occ.location || 'Não informado';
      locationMap[loc] = (locationMap[loc] || 0) + 1;
    });
    const locations = Object.entries(locationMap)
      .sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxLocationCount = locations.length > 0 ? locations[0][1] : 1;

    // Alunos recorrentes
    const studentOccCount = {};
    filtered.filter(o => new Date(o.date) >= thirtyAgo)
      .forEach(o => { studentOccCount[o.studentId] = (studentOccCount[o.studentId] || 0) + 1; });
    const recurrentStudents = Object.entries(studentOccCount)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ student: state.students.find(s => s.id === id), count }))
      .filter(item => item.student);

    // Dados para os 4 gráficos
    const byHour     = buildByHour(filtered);
    const byCategory = buildByCategory(filtered);
    const byDay      = buildByDay(filtered);
    const byMonitor  = buildByMonitor(filtered);

    return {
      totalOcc, todayOcc, weekOcc, openTickets, totalStudents,
      locations, maxLocationCount, recurrentStudents,
      byHour, byCategory, byDay, byMonitor,
    };
  }, [filtered, state.tickets, state.students]);

  return (
    <div className={styles.container}>

      {/* ─── Cabeçalho + Filtro de Turno ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Title2>Dashboard Executivo</Title2>
        <TabList selectedValue={shift} onTabSelect={(_, data) => setShift(data.value)}>
          <Tab value="todos">Tudo</Tab>
          <Tab value="manha" icon={<WeatherSunnyRegular />}>Manhã</Tab>
          <Tab value="tarde" icon={<WeatherPartlyCloudyDayRegular />}>Tarde</Tab>
        </TabList>
      </div>

      {/* ─── Cards de Métricas ─── */}
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
          <div
            className={styles.metricValue}
            style={{ color: stats.openTickets > 0 ? 'var(--color-warning)' : 'var(--color-success)' }}
          >
            {stats.openTickets}
          </div>
          <div className={styles.metricLabel}>Chamados Abertos</div>
        </Card>
        <Card className={styles.metricCard} appearance="outline">
          <div className={styles.metricValue}>{stats.totalStudents}</div>
          <div className={styles.metricLabel}>Alunos Cadastrados</div>
        </Card>
      </div>

      {/* ─── Grade de Widgets ─── */}
      <div className={styles.widgetGrid}>

        {/* Heatmap de Áreas */}
        <Card className={styles.widget} appearance="outline">
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <LocationRegular />
              <Title3>Áreas Quentes</Title3>
            </div>
            <Badge appearance="tint" color="danger">Risco</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.locations.map(([label, count]) => {
              const widthPct = Math.max(10, (count / stats.maxLocationCount) * 100);
              return (
                <div key={label} className={styles.heatmapItem}>
                  <Text style={{ width: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {label}
                  </Text>
                  <div className={styles.heatmapBarWrapper}>
                    <div
                      className={styles.heatmapBar}
                      style={{ width: `${widthPct}%`, opacity: Math.max(0.4, count / stats.maxLocationCount) }}
                    />
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

        {/* Alunos em Risco */}
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

        {/* Gráfico — Horário de Pico */}
        <Card appearance="outline" style={{ padding: 0 }}>
          <ChartHorarioPico data={stats.byHour} />
        </Card>

        {/* Gráfico — Tipos de Infração */}
        <Card appearance="outline" style={{ padding: 0 }}>
          <ChartCategorias data={stats.byCategory} />
        </Card>

        {/* Gráfico — Tendência 7 dias */}
        <Card appearance="outline" style={{ padding: 0 }}>
          <ChartTendenciaSemanal data={stats.byDay} />
        </Card>

        {/* Gráfico — Monitores */}
        <Card appearance="outline" style={{ padding: 0 }}>
          <ChartMonitores data={stats.byMonitor} />
        </Card>

      </div>
    </div>
  );
}


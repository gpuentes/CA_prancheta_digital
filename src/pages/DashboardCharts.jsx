import React from 'react';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from 'recharts';
import { makeStyles, Title3, Text } from '@fluentui/react-components';
import {
  ClockRegular,
  TagRegular,
  CalendarRegular,
  PeopleRegular,
} from '@fluentui/react-icons';

// ─── Paleta do Design System ──────────────────────────────────────────────
const C = {
  blue:   '#0078d4',
  orange: '#d83b01',
  green:  '#107c41',
  purple: '#8764b8',
  red:    '#a80000',
  yellow: '#f7a417',
};
const PIE_COLORS = [C.blue, C.orange, C.green, C.purple, C.red, C.yellow];

// ─── Tooltip customizado ──────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--colorNeutralBackground1)',
      border: '1px solid var(--colorNeutralStroke1)',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '13px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    }}>
      {label && <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} style={{ color: entry.color, display: 'flex', gap: 8 }}>
          <span>{entry.name}:</span>
          <span style={{ fontWeight: 700 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Estilos compartilhados ───────────────────────────────────────────────
const useStyles = makeStyles({
  widget: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animationName: {
      from: { opacity: 0, transform: 'translateY(12px)' },
      to:   { opacity: 1, transform: 'translateY(0)' },
    },
    animationDuration: '0.45s',
    animationFillMode: 'forwards',
  },
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--colorNeutralStroke2)',
  },
  empty: {
    color: 'var(--colorNeutralForeground3)',
    textAlign: 'center',
    padding: '32px 0',
  },
});

// ─── 1. Linha — Horário de Pico ───────────────────────────────────────────
export function ChartHorarioPico({ data }) {
  const styles = useStyles();
  const hasData = data?.some(d => d.total > 0);
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <ClockRegular style={{ color: C.blue }} />
        <Title3>Horário de Pico</Title3>
      </div>
      {!hasData
        ? <Text className={styles.empty}>Sem ocorrências no período.</Text>
        : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colorNeutralStroke2)" />
              <XAxis dataKey="hora" tick={{ fontSize: 11 }} tickFormatter={h => `${h}h`} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="total" name="Ocorrências"
                stroke={C.blue} strokeWidth={2.5}
                dot={{ r: 3, fill: C.blue }} activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}

// ─── 2. Barras — Categorias de Infração ──────────────────────────────────
export function ChartCategorias({ data }) {
  const styles = useStyles();
  const hasData = data?.length > 0;
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <TagRegular style={{ color: C.orange }} />
        <Title3>Tipos de Infração</Title3>
      </div>
      {!hasData
        ? <Text className={styles.empty}>Sem ocorrências no período.</Text>
        : (
          <ResponsiveContainer width="100%" height={Math.max(180, data.length * 36)}>
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colorNeutralStroke2)" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="categoria" width={135} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Ocorrências" fill={C.orange} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}

// ─── 3. Área — Tendência dos Últimos 7 Dias ──────────────────────────────
export function ChartTendenciaSemanal({ data }) {
  const styles = useStyles();
  const hasData = data?.some(d => d.total > 0);
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <CalendarRegular style={{ color: C.green }} />
        <Title3>Tendência (7 dias)</Title3>
      </div>
      {!hasData
        ? <Text className={styles.empty}>Sem dados na última semana.</Text>
        : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.green} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colorNeutralStroke2)" />
              <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="total" name="Ocorrências"
                stroke={C.green} strokeWidth={2.5} fill="url(#areaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}

// ─── 4. Pizza — Ranking de Monitores ─────────────────────────────────────
const RADIAN = Math.PI / 180;
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.06) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function ChartMonitores({ data }) {
  const styles = useStyles();
  const hasData = data?.length > 0;
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <PeopleRegular style={{ color: C.purple }} />
        <Title3>Monitores Ativos</Title3>
      </div>
      {!hasData
        ? <Text className={styles.empty}>Sem registros de monitores.</Text>
        : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data} dataKey="total" nameKey="monitor"
                cx="50%" cy="50%" outerRadius={80}
                labelLine={false} label={PieLabel}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle" iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
                formatter={v => (
                  <span style={{ color: 'var(--colorNeutralForeground1)' }}>{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}

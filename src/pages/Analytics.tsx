import GlassCard from '../components/GlassCard';
import { leadTimeSeriesData, channelMetrics, funnelData, franchises } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, LineChart, Line, Legend,
} from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

const COLORS = ['#34d399', '#22d3ee', '#818cf8', '#f59e0b', '#f43f5e', '#a78bfa', '#fb923c'];

const pieData = channelMetrics.map(ch => ({ name: ch.label, value: ch.leads, color: ch.color }));

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}h`,
  leads: Math.floor(Math.random() * 20) + (i >= 9 && i <= 18 ? 30 : 5),
  converted: Math.floor(Math.random() * 8) + (i >= 9 && i <= 18 ? 10 : 1),
}));

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-sm text-slate-400 mt-1">Análise detalhada de performance e conversão</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads Mês', value: '938', change: '+15.5%', positive: true },
          { label: 'Taxa Conversão', value: '22.4%', change: '+2.6pp', positive: true },
          { label: 'Receita Mês', value: 'R$ 284k', change: '+15.7%', positive: true },
          { label: 'CAC Médio', value: 'R$ 42', change: '-8.2%', positive: true },
        ].map((item, i) => (
          <GlassCard key={item.label} delay={i * 0.1}>
            <p className="text-xs text-slate-500 mb-1">{item.label}</p>
            <p className="text-xl font-bold text-white">{item.value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {item.change}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Over Time */}
        <GlassCard delay={0.4}>
          <h3 className="text-sm font-semibold text-white mb-1">Receita ao Longo do Tempo</h3>
          <p className="text-xs text-slate-500 mb-4">Últimos 15 dias</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadTimeSeriesData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1629', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'Receita']} />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Channel Distribution */}
        <GlassCard delay={0.5}>
          <h3 className="text-sm font-semibold text-white mb-1">Distribuição por Canal</h3>
          <p className="text-xs text-slate-500 mb-4">Leads captados por fonte</p>
          <div className="h-64 flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f1629', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {pieData.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span className="text-xs text-slate-400 flex-1">{ch.name}</span>
                  <span className="text-xs font-mono text-slate-300">{ch.value}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hourly Activity */}
        <GlassCard delay={0.6}>
          <h3 className="text-sm font-semibold text-white mb-1">Atividade por Hora</h3>
          <p className="text-xs text-slate-500 mb-4">Distribuição horária de captação</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1629', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
                <Bar dataKey="leads" fill="#34d399" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Conversion Funnel Detailed */}
        <GlassCard delay={0.7}>
          <h3 className="text-sm font-semibold text-white mb-1">Funil de Conversão Detalhado</h3>
          <p className="text-xs text-slate-500 mb-4">Taxa de conversão por etapa</p>
          <div className="space-y-4">
            {funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-300">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{stage.value}</span>
                    <span className="text-xs font-bold text-emerald-400">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${stage.percentage}%`,
                      background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i + 1] || COLORS[0]})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Franchise Comparison */}
      <GlassCard delay={0.8}>
        <h3 className="text-sm font-semibold text-white mb-1">Comparativo por Franquia</h3>
        <p className="text-xs text-slate-500 mb-4">Leads vs Conversão vs Receita</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={franchises}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="city" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f1629', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              <Legend />
              <Bar dataKey="monthlyLeads" name="Leads" fill="#34d399" radius={[6, 6, 0, 0]} barSize={24} />
              <Bar dataKey="activeConsultants" name="Consultores" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

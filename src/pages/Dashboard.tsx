import { kpiData, leadTimeSeriesData, channelMetrics, recentActivities, funnelData, franchises, brands } from '../data/mockData';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import { useApp } from '../context/AppContext';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from 'recharts';
import {
  MessageCircle, Globe, Bot, Workflow, Instagram, Facebook, UserPlus,
  Radio, ArrowUpRight, ArrowDownRight, Users, DollarSign, TrendingUp,
  Activity, Zap, Clock, ChevronRight, Circle, Sparkles, Trophy,
  Shield, BookOpen, GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

const channelIconMap: Record<string, typeof MessageCircle> = {
  MessageCircle, Globe, Bot, Workflow, Instagram, Facebook, UserPlus,
};

const activityIcons: Record<string, typeof Activity> = {
  lead_new: Users,
  lead_converted: DollarSign,
  whatsapp_message: MessageCircle,
  automation: Zap,
  n8n_workflow: Workflow,
  lead_qualified: TrendingUp,
  chatbot: Bot,
  ranking_update: Trophy,
};

export default function Dashboard() {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Visão geral em tempo real de todas as operações</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-medium text-brand-700">Online</span>
          </div>
          <span className="text-xs text-gray-400">Atualizado agora</span>
        </div>
      </div>

      {/* Brands Bar */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${brand.color}15` }}>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{brand.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span>{brand.leadCount} leads</span>
                <span>•</span>
                <span className="text-brand-600 font-medium">{brand.conversionRate}% conv.</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <StatCard key={kpi.label} data={kpi} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Flow Chart */}
        <GlassCard className="lg:col-span-2" delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Fluxo de Leads</h3>
              <p className="text-xs text-gray-500 mt-0.5">Últimos 15 dias</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-400" />
                <span className="text-gray-500">Leads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-gray-500">Convertidos</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadTimeSeriesData}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#26BBA1" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#26BBA1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    color: '#111827',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="#26BBA1" fill="url(#leadGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="converted" stroke="#3B82F6" fill="url(#convGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Funnel */}
        <GlassCard delay={0.5}>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Funil de Conversão</h3>
            <p className="text-xs text-gray-500 mt-0.5">Mês atual</p>
          </div>
          <div className="space-y-2.5">
            {funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700">{stage.stage}</span>
                  <span className="text-xs font-mono text-gray-500">{stage.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-brand-400' :
                      i === 1 ? 'bg-blue-400' :
                      i === 2 ? 'bg-indigo-400' :
                      i === 3 ? 'bg-violet-400' :
                      i === 4 ? 'bg-amber-400' :
                      'bg-green-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Channel Performance */}
        <GlassCard delay={0.6}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Performance por Canal</h3>
              <p className="text-xs text-gray-500 mt-0.5">Capturas e conversão</p>
            </div>
            <button onClick={() => setCurrentPage('channels')} className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Ver tudo <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {channelMetrics.slice(0, 5).map((ch) => {
              const Icon = channelIconMap[ch.icon] || Radio;
              return (
                <div key={ch.channel} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
                    <Icon className="w-4 h-4" style={{ color: ch.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{ch.label}</span>
                      <span className="text-xs font-mono text-gray-500">{ch.leads}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(ch.leads / 342) * 100}%`, backgroundColor: ch.color }}
                      />
                    </div>
                  </div>
                  <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${ch.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {ch.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(ch.growth)}%
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Franchise Performance */}
        <GlassCard delay={0.7}>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Performance por Franquia</h3>
            <p className="text-xs text-gray-500 mt-0.5">Leads mensais e conversão</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={franchises} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="city" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    color: '#111827',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="monthlyLeads" fill="#26BBA1" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard delay={0.8}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Atividade Recente</h3>
              <p className="text-xs text-gray-500 mt-0.5">Em tempo real</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-amber-600 font-medium">LIVE</span>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {recentActivities.map((act) => {
              const Icon = activityIcons[act.type] || Activity;
              return (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-700 leading-relaxed">{act.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-400">{act.time}</span>
                      <Circle className="w-1 h-1 text-gray-300" />
                      <span className="text-[10px] text-gray-400">{act.franchise}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <motion.button
          onClick={() => setCurrentPage('monitoring')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="rounded-xl border border-red-200 bg-red-50 p-5 text-left hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors">Monitoramento</h3>
              <p className="text-[10px] text-gray-500">Tempo real</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Acompanhe franquias, alertas e eventos ao vivo</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-red-600 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            3 alertas ativos
          </div>
        </motion.button>

        <motion.button
          onClick={() => setCurrentPage('qualification')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-left hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Qualificação</h3>
              <p className="text-[10px] text-gray-500">Motor de regras</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Configure regras automáticas de qualificação e roteamento</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-indigo-600 font-medium">
            <Zap className="w-3 h-3" />
            4 regras ativas
          </div>
        </motion.button>

        <motion.button
          onClick={() => setCurrentPage('capture')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="rounded-xl border border-brand-200 bg-brand-50 p-5 text-left hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
              <Radio className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Captura</h3>
              <p className="text-[10px] text-gray-500">Multi-canal</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">WhatsApp, Web, API, CSV, Chatbot e muito mais</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-brand-600 font-medium">
            <Radio className="w-3 h-3" />
            6 canais ativos
          </div>
        </motion.button>

        <motion.button
          onClick={() => setCurrentPage('docs')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="rounded-xl border border-violet-200 bg-violet-50 p-5 text-left hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">Documentação</h3>
              <p className="text-[10px] text-gray-500">Técnica completa</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Schema, cores, arquitetura, segurança, métricas e roadmap</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-violet-600 font-medium">
            <BookOpen className="w-3 h-3" />
            8 seções
          </div>
        </motion.button>

        <motion.button
          onClick={() => setCurrentPage('flows')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="rounded-2xl border border-orange-500/15 bg-gradient-to-br from-orange-500/[0.06] to-amber-500/[0.03] backdrop-blur-xl p-5 text-left hover:border-orange-500/30 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">Fluxos</h3>
              <p className="text-[10px] text-slate-500">Processos</p>
            </div>
n          </div>
          <p className="text-xs text-slate-400">Captura, qualificação e monitoramento em tempo real</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-orange-400">
            <GitBranch className="w-3 h-3" />
            3 fluxos
          </div>
        </motion.button>
      </div>
    </div>
  );
}

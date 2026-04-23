import GlassCard from '../components/GlassCard';
import { channelMetrics } from '../data/mockData';
import {
  MessageCircle, Globe, Bot, Workflow, Instagram, Facebook, UserPlus,
  ArrowUpRight, ArrowDownRight, Settings, ExternalLink, Plug, Radio,
  BarChart3, Users, DollarSign, TrendingUp, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const channelIconMap: Record<string, typeof MessageCircle> = {
  MessageCircle, Globe, Bot, Workflow, Instagram, Facebook, UserPlus,
};

export default function Channels() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Canais de Captura</h2>
          <p className="text-sm text-slate-400 mt-1">Gerencie múltiplos canais de captação de leads</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
          <Plug className="w-4 h-4" /> Conectar Canal
        </button>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {channelMetrics.map((ch, i) => {
          const Icon = channelIconMap[ch.icon] || Radio;
          return (
            <motion.div
              key={ch.channel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ch.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: ch.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{ch.label}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Ativo</span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500">Leads</span>
                  </div>
                  <p className="text-sm font-bold text-white">{ch.leads}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500">Conv.</span>
                  </div>
                  <p className="text-sm font-bold text-emerald-400">{ch.conversion}%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500">Receita</span>
                  </div>
                  <p className="text-sm font-bold text-amber-400">{(ch.revenue / 1000).toFixed(1)}k</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <div className={`flex items-center gap-1 text-xs font-medium ${ch.growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {ch.growth >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {Math.abs(ch.growth)}% vs mês anterior
                </div>
                <button className="text-xs text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Detalhes <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Integration Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.6}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Integração n8n</h3>
              <p className="text-xs text-slate-500">Automação de workflows personalizados</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-300">Workflow: Qualificação Automática</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] text-emerald-400 font-medium">Ativo</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-300">Workflow: Sincronização CRM</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] text-emerald-400 font-medium">Ativo</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-300">Workflow: Notificação Slack</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-[10px] text-amber-400 font-medium">Pausado</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors flex items-center justify-center gap-2">
            <Plug className="w-4 h-4" /> Configurar n8n
          </button>
        </GlassCard>

        <GlassCard delay={0.7}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Chatbot Inteligente</h3>
              <p className="text-xs text-slate-500">Captura e qualificação 24/7</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-300">Conversas Hoje</span>
                <span className="text-sm font-bold text-white">47</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-amber-400" style={{ width: '78%' }} />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-300">Taxa de Qualificação</span>
                <span className="text-sm font-bold text-emerald-400">68%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: '68%' }} />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-300">Tempo Médio de Resposta</span>
                <span className="text-sm font-bold text-cyan-400">1.2s</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-cyan-400" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2">
            <Bot className="w-4 h-4" /> Configurar Chatbot
          </button>
        </GlassCard>
      </div>
    </div>
  );
}

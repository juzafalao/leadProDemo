import GlassCard from '../components/GlassCard';
import { automationRules, workflowTemplates } from '../data/mockData';
import {
  Zap, Play, Pause, Settings, Plus, ArrowRight,
  Clock, CheckCircle2, AlertCircle, Workflow, RefreshCw, ExternalLink,
  MessageCircle, UserPlus, TrendingUp, Tag, Shield, Globe, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

const triggerLabels: Record<string, { label: string; color: string }> = {
  'message.received': { label: 'Mensagem Recebida', color: 'text-emerald-400' },
  'lead.created': { label: 'Lead Criado', color: 'text-cyan-400' },
  'schedule.weekly': { label: 'Agendamento Semanal', color: 'text-violet-400' },
  'schedule.daily': { label: 'Agendamento Diário', color: 'text-violet-400' },
};

const categoryConfig: Record<string, { label: string; color: string; icon: typeof Zap }> = {
  onboarding: { label: 'Onboarding', color: 'emerald', icon: MessageCircle },
  followup: { label: 'Follow-up', color: 'amber', icon: Clock },
  recovery: { label: 'Recuperação', color: 'rose', icon: AlertCircle },
  qualification: { label: 'Qualificação', color: 'indigo', icon: Shield },
  notification: { label: 'Notificação', color: 'cyan', icon: Globe },
};

export default function Workflows() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Workflows & Automações</h2>
          <p className="text-sm text-slate-400 mt-1">Configure regras automáticas e integrações n8n</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-sm font-medium text-orange-400 hover:bg-orange-500/20 transition-colors">
            <Workflow className="w-4 h-4" /> Conectar n8n
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
            <Plus className="w-4 h-4" /> Nova Regra
          </button>
        </div>
      </div>

      {/* n8n Connection Status */}
      <GlassCard delay={0.1}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <Workflow className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">n8n Integration</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Conectado</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-500">URL: n8n.leadcapture.pro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Sincronizar
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400 hover:text-white transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Abrir n8n
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Automation Rules */}
      <div className="space-y-3">
        {automationRules.map((rule, i) => {
          const trigger = triggerLabels[rule.triggerEvent] || { label: rule.triggerEvent, color: 'text-slate-400' };
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className={`rounded-2xl border bg-white/[0.02] backdrop-blur-xl p-5 hover:border-white/[0.12] transition-all duration-300 ${
                rule.active ? 'border-emerald-500/10' : 'border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    rule.active ? 'bg-emerald-500/15' : 'bg-white/[0.06]'
                  }`}>
                    <Zap className={`w-5 h-5 ${rule.active ? 'text-emerald-400' : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{rule.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        rule.active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'
                      }`}>
                        {rule.active ? 'Ativo' : 'Pausado'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-[10px] text-indigo-400 font-medium">
                        P{rule.priority}
                      </span>
                      {rule.franchiseId && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-[10px] text-amber-400 font-medium">
                          Franquia
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${trigger.color}`}>{trigger.label}</span>
                      {rule.conditions.length > 0 && (
                        <>
                          <ArrowRight className="w-3 h-3 text-slate-600" />
                          <span className="text-xs text-slate-400">{rule.conditions.length} condição(ões)</span>
                        </>
                      )}
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className="text-xs text-slate-400">{rule.actions.length} ação(ões)</span>
                    </div>
                    {rule.description && <p className="text-[10px] text-slate-500 mt-0.5">{rule.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-white">{rule.executions.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">execuções</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400">{rule.lastExecution ? new Date(rule.lastExecution).toLocaleDateString('pt-BR') : '—'}</p>
                    <p className="text-[10px] text-slate-500">última exec.</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className={`p-2 rounded-lg transition-colors ${
                      rule.active ? 'hover:bg-amber-500/10 text-emerald-400 hover:text-amber-400' : 'hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400'
                    }`}>
                      {rule.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Workflow Templates */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Templates de Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowTemplates.map((template, i) => {
            const cat = categoryConfig[template.category] || { label: template.category, color: 'slate', icon: Workflow };
            const Icon = cat.icon;
            return (
              <GlassCard key={template.id} delay={0.5 + i * 0.1}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${cat.color}-500/15 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${cat.color}-400`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium bg-${cat.color}-500/10 text-${cat.color}-400`}>{cat.label}</span>
                      <span className="text-[9px] text-slate-500">{template.steps.length} steps</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{template.description}</p>
                <div className="mt-3 space-y-1.5">
                  {template.steps.slice(0, 4).map((step: { id: string; type: string }, si: number) => (
                    <div key={step.id} className="flex items-center gap-2 text-[10px]">
                      <div className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[8px] font-bold text-slate-400">{si + 1}</div>
                      <span className="text-slate-400 font-mono">{step.type}</span>
                    </div>
                  ))}
                  {template.steps.length > 4 && <p className="text-[9px] text-slate-600 pl-6">+{template.steps.length - 4} mais steps</p>}
                </div>
                <button className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  Usar template <ArrowRight className="w-3 h-3" />
                </button>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

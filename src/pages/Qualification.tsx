import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { qualificationRules } from '../data/mockData';
import type { QualificationRule, QualificationCondition, QualificationAction } from '../types';
import {
  Zap, Plus, Play, Pause, Trash2, Edit3, ChevronRight,
  ArrowRight, Shield, CheckCircle2, Clock, MessageCircle,
  UserPlus, TrendingUp, Tag, Webhook, Copy, Settings, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const operatorLabels: Record<string, string> = {
  equals: 'igual a',
  not_equals: 'diferente de',
  contains: 'contém',
  not_contains: 'não contém',
  greater_than: 'maior que',
  less_than: 'menor que',
  starts_with: 'começa com',
  is_empty: 'está vazio',
  is_not_empty: 'não está vazio',
};

const actionTypeLabels: Record<string, { label: string; icon: typeof Zap; color: string }> = {
  set_status: { label: 'Alterar Status', icon: Shield, color: 'text-indigo-400' },
  assign_to: { label: 'Atribuir a', icon: UserPlus, color: 'text-cyan-400' },
  send_notification: { label: 'Enviar Notificação', icon: MessageCircle, color: 'text-amber-400' },
  send_whatsapp: { label: 'Enviar WhatsApp', icon: MessageCircle, color: 'text-emerald-400' },
  schedule_followup: { label: 'Agendar Follow-up', icon: Clock, color: 'text-violet-400' },
  change_score: { label: 'Alterar Score', icon: TrendingUp, color: 'text-emerald-400' },
  add_tag: { label: 'Adicionar Tag', icon: Tag, color: 'text-blue-400' },
  trigger_webhook: { label: 'Disparar Webhook', icon: Webhook, color: 'text-orange-400' },
  trigger_n8n: { label: 'Disparar n8n', icon: Zap, color: 'text-orange-400' },
};

export default function Qualification() {
  const [selectedRule, setSelectedRule] = useState<QualificationRule | null>(null);
  const [showNewRule, setShowNewRule] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Motor de Qualificação</h2>
          <p className="text-sm text-slate-400 mt-1">Configure regras automáticas de qualificação e roteamento de leads</p>
        </div>
        <button
          onClick={() => setShowNewRule(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Nova Regra
        </button>
      </div>

      {/* Engine Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Regras Ativas', value: qualificationRules.filter(r => r.active).length, total: qualificationRules.length, color: 'emerald' },
          { label: 'Execuções Hoje', value: 456, color: 'cyan' },
          { label: 'Leads Qualificados', value: 89, color: 'indigo' },
          { label: 'Taxa de Acerto', value: '94.2%', color: 'amber' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.08}>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-xl font-bold text-${stat.color}-400`}>
              {stat.value}{stat.total ? <span className="text-sm text-slate-500">/{stat.total}</span> : ''}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {qualificationRules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            className={`rounded-2xl border bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 ${
              rule.active ? 'border-emerald-500/10' : 'border-white/[0.06] opacity-70'
            }`}
          >
            {/* Rule Header */}
            <div
              className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setSelectedRule(selectedRule?.id === rule.id ? null : rule)}
            >
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
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">{rule.executions}</p>
                  <p className="text-[10px] text-slate-500">execuções</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedRule?.id === rule.id ? 'rotate-90' : ''}`} />
              </div>
            </div>

            {/* Expanded Rule Detail */}
            <AnimatePresence>
              {selectedRule?.id === rule.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-white/[0.04] pt-4">
                    {/* Conditions */}
                    <div className="mb-5">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">Condições (SE)</h4>
                      <div className="space-y-2">
                        {rule.conditions.map((cond, ci) => (
                          <div key={cond.id} className="flex items-center gap-2">
                            {ci > 0 && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                cond.logicOperator === 'OR' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'
                              }`}>
                                {cond.logicOperator}
                              </span>
                            )}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-1">
                              <span className="text-xs font-medium text-cyan-400">{cond.field}</span>
                              <span className="text-[10px] text-slate-500">{operatorLabels[cond.operator]}</span>
                              <span className="text-xs font-medium text-amber-400">"{cond.value}"</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center my-3">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <ArrowRight className="w-5 h-5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">ENTÃO</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">Ações (ENTÃO)</h4>
                      <div className="space-y-2">
                        {rule.actions.map((action) => {
                          const actionConfig = actionTypeLabels[action.type] || { label: action.type, icon: Zap, color: 'text-slate-400' };
                          const Icon = actionConfig.icon;
                          return (
                            <div key={action.id} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                              <Icon className={`w-4 h-4 ${actionConfig.color}`} />
                              <span className="text-xs text-slate-400">{actionConfig.label}:</span>
                              <span className="text-xs font-medium text-white">{action.value}</span>
                              {action.template && (
                                <span className="text-[10px] text-slate-500 ml-auto">template: {action.template}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rule Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
                      <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        rule.active ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}>
                        {rule.active ? <><Pause className="w-3.5 h-3.5" /> Pausar</> : <><Play className="w-3.5 h-3.5" /> Ativar</>}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-slate-400 hover:text-white transition-colors">
                        <Edit3 className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-slate-400 hover:text-white transition-colors">
                        <Copy className="w-3.5 h-3.5" /> Duplicar
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors ml-auto">
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* New Rule Modal */}
      <AnimatePresence>
        {showNewRule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewRule(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0f1629] border border-white/[0.08] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Nova Regra de Qualificação</h3>
                    <p className="text-xs text-slate-400">Configure condições e ações automáticas</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Nome da Regra</label>
                    <input type="text" placeholder="Ex: Lead Quente WhatsApp" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Prioridade</label>
                    <select className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none">
                      <option value="1">P1 — Máxima</option>
                      <option value="2">P2 — Alta</option>
                      <option value="3">P3 — Média</option>
                      <option value="4">P4 — Baixa</option>
                      <option value="5">P5 — Mínima</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Descrição</label>
                  <textarea placeholder="Descreva quando esta regra deve ser acionada..." rows={2} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30 resize-none" />
                </div>

                {/* Conditions Builder */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">CONDIÇÕES (SE)</label>
                    <button className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Adicionar condição
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <select className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none">
                        <option>origem</option>
                        <option>score</option>
                        <option>mensagem</option>
                        <option>status</option>
                        <option>valor_estimado</option>
                        <option>interesse</option>
                        <option>cidade</option>
                      </select>
                      <select className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none">
                        <option>igual a</option>
                        <option>contém</option>
                        <option>maior que</option>
                        <option>menor que</option>
                        <option>começa com</option>
                      </select>
                      <input type="text" placeholder="Valor" className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Actions Builder */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">AÇÕES (ENTÃO)</label>
                    <button className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Adicionar ação
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <select className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none">
                        {Object.entries(actionTypeLabels).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                      <input type="text" placeholder="Valor" className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowNewRule(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowNewRule(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                  >
                    Criar Regra
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

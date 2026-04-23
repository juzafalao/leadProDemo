import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { franchises, anomalyAlerts, monitoringEvents } from '../data/mockData';
import type { AnomalyAlert, MonitoringEvent } from '../types';
import {
  Activity, AlertTriangle, Wifi, WifiOff, Clock, Users, TrendingUp,
  TrendingDown, MessageCircle, Zap, Shield, Eye, CheckCircle2,
  XCircle, Radio, ChevronDown, Filter, RefreshCw, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const severityColors = {
  low: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: Activity },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: AlertTriangle },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: AlertTriangle },
  critical: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', icon: XCircle },
};

const statusConfig = {
  healthy: { label: 'Saudável', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  warning: { label: 'Atenção', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  critical: { label: 'Crítico', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', dot: 'bg-rose-400' },
};

const eventTypeIcons: Record<string, typeof Activity> = {
  lead_captured: Users,
  lead_converted: TrendingUp,
  lead_qualified: Shield,
  message_received: MessageCircle,
  workflow_triggered: Zap,
  anomaly_detected: AlertTriangle,
  instance_status_change: Wifi,
};

const eventTypeColors: Record<string, string> = {
  lead_captured: 'text-emerald-400',
  lead_converted: 'text-amber-400',
  lead_qualified: 'text-indigo-400',
  message_received: 'text-cyan-400',
  workflow_triggered: 'text-orange-400',
  anomaly_detected: 'text-rose-400',
  instance_status_change: 'text-violet-400',
};

export default function Monitoring() {
  const [liveEvents, setLiveEvents] = useState<MonitoringEvent[]>(monitoringEvents);
  const [showResolved, setShowResolved] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [wsConnected, setWsConnected] = useState(true);
  const [pulseKey, setPulseKey] = useState(0);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(k => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = anomalyAlerts.filter(a => {
    if (!showResolved && a.resolved) return false;
    if (selectedSeverity !== 'all' && a.severity !== selectedSeverity) return false;
    return true;
  });

  const criticalCount = anomalyAlerts.filter(a => !a.resolved && a.severity === 'critical').length;
  const highCount = anomalyAlerts.filter(a => !a.resolved && a.severity === 'high').length;
  const totalUnresolved = anomalyAlerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Monitoramento em Tempo Real</h2>
          <p className="text-sm text-slate-400 mt-1">Visão ao vivo de todas as operações e alertas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${wsConnected ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
            <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <span className={`text-xs font-medium ${wsConnected ? 'text-emerald-400' : 'text-rose-400'}`}>
              {wsConnected ? 'WebSocket Conectado' : 'Desconectado'}
            </span>
          </div>
          <button
            onClick={() => setWsConnected(!wsConnected)}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Alertas Críticos', value: criticalCount, color: 'rose', icon: XCircle },
          { label: 'Alertas Altos', value: highCount, color: 'orange', icon: AlertTriangle },
          { label: 'Total Não Resolvidos', value: totalUnresolved, color: 'amber', icon: Shield },
          { label: 'Franquias Saudáveis', value: franchises.filter(f => f.status === 'healthy').length, color: 'emerald', icon: CheckCircle2 },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border bg-${item.color}-500/[0.06] border-${item.color}-500/15 p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${item.color}-400`} />
                <span className={`text-2xl font-bold text-${item.color}-400`}>{item.value}</span>
              </div>
              <p className="text-xs text-slate-400">{item.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Franchise Grid - Real-time Status */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Status das Franquias</h3>
          <span className="text-[10px] text-slate-500">Atualizado em tempo real via WebSocket</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {franchises.map((franchise, i) => {
            const status = statusConfig[franchise.status];
            return (
              <motion.div
                key={franchise.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border ${status.border} ${status.bg} backdrop-blur-xl p-5 relative overflow-hidden`}
              >
                {/* Pulse indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${status.dot} ${franchise.status === 'critical' ? 'animate-pulse' : ''}`} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}>
                    <Activity className={`w-5 h-5 ${status.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{franchise.city}</h4>
                    <p className="text-[10px] text-slate-500">{franchise.code} • {franchise.state} • {franchise.activeConsultants} consultores</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${status.color} ${status.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </div>
                  {franchise.autoQualificationEnabled && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-indigo-500/10 text-indigo-400">Auto-qualificação</span>
                  )}
                  {franchise.autoResponseEnabled && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-400">Auto-resposta</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-black/20">
                    <p className="text-[10px] text-slate-500 mb-0.5">Leads Hoje</p>
                    <p className="text-sm font-bold text-white">{franchise.todayLeads}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20">
                    <p className="text-[10px] text-slate-500 mb-0.5">Conversão</p>
                    <p className={`text-sm font-bold ${franchise.todayConversion >= 20 ? 'text-emerald-400' : franchise.todayConversion >= 15 ? 'text-amber-400' : 'text-rose-400'}`}>{franchise.todayConversion}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20">
                    <p className="text-[10px] text-slate-500 mb-0.5">Resp. Médio</p>
                    <p className={`text-sm font-bold ${franchise.avgResponseTime <= 5 ? 'text-emerald-400' : franchise.avgResponseTime <= 10 ? 'text-amber-400' : 'text-rose-400'}`}>{franchise.avgResponseTime}min</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20">
                    <p className="text-[10px] text-slate-500 mb-0.5">Chats Ativos</p>
                    <p className="text-sm font-bold text-cyan-400">{franchise.activeChats}</p>
                  </div>
                </div>

                {/* Mini sparkline */}
                <div className="mt-3 flex items-end gap-0.5 h-8">
                  {franchise.weeklyTrend.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm ${franchise.status === 'healthy' ? 'bg-emerald-400/40' : franchise.status === 'warning' ? 'bg-amber-400/40' : 'bg-rose-400/40'}`}
                      style={{ height: `${(val / Math.max(...franchise.weeklyTrend)) * 100}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Anomaly Alerts */}
        <GlassCard delay={0.5} noPadding>
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Alertas de Anomalias</h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedSeverity}
                onChange={e => setSelectedSeverity(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none"
              >
                <option value="all">Todas</option>
                <option value="critical">Crítico</option>
                <option value="high">Alto</option>
                <option value="medium">Médio</option>
                <option value="low">Baixo</option>
              </select>
              <button
                onClick={() => setShowResolved(!showResolved)}
                className={`text-[10px] px-2 py-1 rounded-lg transition-colors ${showResolved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.04] text-slate-500'}`}
              >
                {showResolved ? 'Ocultar resolvidos' : 'Mostrar resolvidos'}
              </button>
            </div>
          </div>
          <div className="divide-y divide-white/[0.03] max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400/50 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Nenhum alerta ativo</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const config = severityColors[alert.severity];
                const Icon = config.icon;
                return (
                  <div key={alert.id} className={`px-5 py-3.5 hover:bg-white/[0.02] transition-colors ${alert.resolved ? 'opacity-50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-semibold uppercase ${config.text}`}>{alert.severity}</span>
                          <span className="text-[10px] text-slate-600">•</span>
                          <span className="text-[10px] text-slate-500">{alert.franchiseName}</span>
                          {alert.resolved && <span className="text-[10px] text-emerald-400 font-medium ml-1">✓ Resolvido</span>}
                        </div>
                        <p className="text-xs text-slate-300">{alert.message}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] text-slate-500">{alert.metric}: <span className="text-rose-400">{alert.currentValue}</span> / esperado: <span className="text-emerald-400">{alert.expectedValue}</span></span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-600 flex-shrink-0">{new Date(alert.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>

        {/* Live Event Feed */}
        <GlassCard delay={0.6} noPadding>
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Feed de Eventos</h3>
              <span className="text-[10px] text-emerald-400 font-medium animate-pulse">LIVE</span>
            </div>
            <span className="text-[10px] text-slate-500">{liveEvents.length} eventos</span>
          </div>
          <div className="divide-y divide-white/[0.03] max-h-96 overflow-y-auto">
            {liveEvents.map((event, i) => {
              const Icon = eventTypeIcons[event.type] || Activity;
              const color = eventTypeColors[event.type] || 'text-slate-400';
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="px-5 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300">{event.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500">{event.franchiseName}</span>
                        <span className="text-[10px] text-slate-600">•</span>
                        <span className="text-[10px] text-slate-500">{new Date(event.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

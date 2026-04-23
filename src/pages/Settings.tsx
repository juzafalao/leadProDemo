import GlassCard from '../components/GlassCard';
import { franchises } from '../data/mockData';
import {
  Building2, Users, Shield, Bell, Palette, Database,
  Key, Webhook, Globe, Clock, Save, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="relative">
      {enabled ? (
        <ToggleRight className="w-8 h-8 text-emerald-400" />
      ) : (
        <ToggleLeft className="w-8 h-8 text-slate-500" />
      )}
    </button>
  );
}

export default function Settings() {
  const [notifications, setNotifications] = useState({ email: true, push: true, whatsapp: false, slack: true });
  const [security, setSecurity] = useState({ twoFactor: true, sessionTimeout: true, ipWhitelist: false });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Configurações</h2>
        <p className="text-sm text-slate-400 mt-1">Gerencie as configurações do sistema e tenant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tenant Info */}
          <GlassCard delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Dados do Tenant</h3>
                <p className="text-xs text-slate-500">Informações da franqueadora</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Nome da Empresa</label>
                <input type="text" defaultValue="LeadCapture Franquias" className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 outline-none focus:border-emerald-500/30" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">CNPJ</label>
                <input type="text" defaultValue="12.345.678/0001-90" className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 outline-none focus:border-emerald-500/30" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Email Admin</label>
                <input type="email" defaultValue="admin@leadcapture.pro" className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 outline-none focus:border-emerald-500/30" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Plano Atual</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm font-medium text-emerald-400">Enterprise</span>
                  <span className="text-[10px] text-emerald-400/60">• 5 franquias ativas</span>
                </div>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 text-sm font-medium hover:bg-emerald-500/25 transition-colors">
              <Save className="w-4 h-4" /> Salvar Alterações
            </button>
          </GlassCard>

          {/* Notifications */}
          <GlassCard delay={0.2}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Notificações</h3>
                <p className="text-xs text-slate-500">Configurar alertas e notificações</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'email' as const, label: 'Notificações por Email', desc: 'Receba alertas importantes por email' },
                { key: 'push' as const, label: 'Push Notifications', desc: 'Notificações no navegador em tempo real' },
                { key: 'whatsapp' as const, label: 'Alertas WhatsApp', desc: 'Receba alertas críticos via WhatsApp' },
                { key: 'slack' as const, label: 'Integração Slack', desc: 'Enviar notificações para canais Slack' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <Toggle enabled={notifications[item.key]} onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Security */}
          <GlassCard delay={0.3}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Segurança</h3>
                <p className="text-xs text-slate-500">Configurações de segurança e acesso</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'twoFactor' as const, label: 'Autenticação 2FA', desc: 'Exigir segundo fator de autenticação' },
                { key: 'sessionTimeout' as const, label: 'Timeout de Sessão', desc: 'Encerrar sessões inativas após 30min' },
                { key: 'ipWhitelist' as const, label: 'IP Whitelist', desc: 'Restringir acesso por endereço IP' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <Toggle enabled={security[item.key]} onChange={() => setSecurity(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* API Keys */}
          <GlassCard delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">API Keys</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Production Key</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-indigo-400 font-mono flex-1 truncate">lcp_prod_••••••••••••xYz9</code>
                  <button className="text-[10px] text-slate-500 hover:text-white transition-colors">Copiar</button>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Webhook Secret</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-amber-400 font-mono flex-1 truncate">whk_••••••••••••aBc7</code>
                  <button className="text-[10px] text-slate-500 hover:text-white transition-colors">Copiar</button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Webhooks */}
          <GlassCard delay={0.3}>
            <div className="flex items-center gap-3 mb-4">
              <Webhook className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Webhooks</h3>
            </div>
            <div className="space-y-2">
              {[
                { url: 'https://api.leadcapture.pro/webhooks/whatsapp', status: 'active' },
                { url: 'https://n8n.leadcapture.pro/webhook/leads', status: 'active' },
                { url: 'https://api.leadcapture.pro/webhooks/chatbot', status: 'active' },
              ].map((wh, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <code className="text-[10px] text-slate-400 font-mono flex-1 truncate">{wh.url}</code>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Franchises Quick View */}
          <GlassCard delay={0.4}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Franquias</h3>
              </div>
              <span className="text-xs text-slate-500">{franchises.length} unidades</span>
            </div>
            <div className="space-y-2">
              {franchises.map(f => (
                <div key={f.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer">
                  <div>
                    <p className="text-xs font-medium text-slate-200">{f.city}</p>
                    <p className="text-[10px] text-slate-500">{f.activeConsultants} consultores</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

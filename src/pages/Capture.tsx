import { useState, useRef } from 'react';
import GlassCard from '../components/GlassCard';
import { leads, customFields, webhookConfigs } from '../data/mockData';
import type { CustomField, WebhookConfig } from '../types';
import {
  Plus, Upload, FileUp, Globe, Webhook, MessageCircle,
  Bot, UserPlus, Download, Save, X, ChevronRight,
  CheckCircle2, AlertCircle, FileSpreadsheet, Link2,
  Copy, ExternalLink, Settings, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const captureChannels = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: '#25D366', desc: 'Captura via Evolution API' },
  { id: 'website', label: 'Formulário Web', icon: Globe, color: '#6366f1', desc: 'Embed no seu site' },
  { id: 'webhook', label: 'API / Webhook', icon: Webhook, color: '#8b5cf6', desc: 'Receba leads via API' },
  { id: 'csv_import', label: 'Importação CSV', icon: FileUp, color: '#06b6d4', desc: 'Upload de planilha' },
  { id: 'chatbot', label: 'Chatbot', icon: Bot, color: '#f59e0b', desc: 'Captura automática 24/7' },
  { id: 'referral', label: 'Indicações', icon: UserPlus, color: '#10b981', desc: 'Programa de referência' },
];

export default function Capture() {
  const [activeTab, setActiveTab] = useState<'form' | 'csv' | 'webhook' | 'embed'>('form');
  const [showNewField, setShowNewField] = useState(false);
  const [csvFile, setCsvFile] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; errors: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInterest, setFormInterest] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formSource, setFormSource] = useState('manual');
  const [formCustomFields, setFormCustomFields] = useState<Record<string, string>>({});

  const handleCsvImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportResult({ success: 47, errors: 3 });
    }, 2000);
  };

  const handleFormSubmit = () => {
    // Simulate submission
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormInterest('');
    setFormNotes('');
    setFormCustomFields({});
  };

  const embedCode = `<script src="https://cdn.leadcapture.pro/widget.js" data-tenant="t1" data-form="contact"></script>
<div id="leadcapture-form"></div>`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Captura de Leads</h2>
          <p className="text-sm text-slate-400 mt-1">Múltiplos canais de captação com campos customizáveis</p>
        </div>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {captureChannels.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.button
              key={ch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                if (ch.id === 'webhook') setActiveTab('webhook');
                else if (ch.id === 'csv_import') setActiveTab('csv');
                else if (ch.id === 'website') setActiveTab('embed');
                else setActiveTab('form');
              }}
              className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 text-center group"
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${ch.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: ch.color }} />
              </div>
              <p className="text-xs font-medium text-white">{ch.label}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{ch.desc}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        {[
          { id: 'form' as const, label: 'Formulário Manual', icon: Plus },
          { id: 'csv' as const, label: 'Importar CSV', icon: FileUp },
          { id: 'webhook' as const, label: 'API / Webhook', icon: Webhook },
          { id: 'embed' as const, label: 'Embed no Site', icon: Globe },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Manual Form */}
          {activeTab === 'form' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white mb-4">Novo Lead</h3>
                  <div className="space-y-4">
                    {/* Standard Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Nome *</label>
                        <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="Nome completo" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Telefone *</label>
                        <input type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="(11) 99999-9999" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
                        <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@exemplo.com" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Origem</label>
                        <select value={formSource} onChange={e => setFormSource(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none">
                          <option value="manual">Manual</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="website">Website</option>
                          <option value="chatbot">Chatbot</option>
                          <option value="referral">Indicação</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Interesse</label>
                        <select value={formInterest} onChange={e => setFormInterest(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none">
                          <option value="">Selecione...</option>
                          <option value="starter">Plano Starter</option>
                          <option value="professional">Plano Professional</option>
                          <option value="enterprise">Plano Enterprise</option>
                          <option value="consultoria">Consultoria</option>
                          <option value="info">Informações gerais</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Valor Estimado</label>
                        <input type="text" placeholder="R$ 0,00" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Observações</label>
                      <textarea rows={3} value={formNotes} onChange={e => setFormNotes(e.target.value)} placeholder="Notas sobre o lead..." className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30 resize-none" />
                    </div>

                    {/* Custom Fields */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Campos Customizados</label>
                        <button
                          onClick={() => setShowNewField(true)}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Adicionar campo
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {customFields.map(field => (
                          <div key={field.id}>
                            <label className="text-[10px] text-slate-500 mb-1 block">
                              {field.label} {field.required && <span className="text-rose-400">*</span>}
                            </label>
                            {field.type === 'select' ? (
                              <select
                                value={formCustomFields[field.name] || ''}
                                onChange={e => setFormCustomFields(prev => ({ ...prev, [field.name]: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none"
                              >
                                <option value="">Selecione...</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                            ) : field.type === 'boolean' ? (
                              <label className="flex items-center gap-2 cursor-pointer py-2">
                                <input
                                  type="checkbox"
                                  checked={formCustomFields[field.name] === 'true'}
                                  onChange={e => setFormCustomFields(prev => ({ ...prev, [field.name]: e.target.checked ? 'true' : 'false' }))}
                                  className="w-4 h-4 rounded border-white/20 bg-white/[0.04] accent-emerald-500"
                                />
                                <span className="text-xs text-slate-400">Aceito os termos da LGPD</span>
                              </label>
                            ) : (
                              <input
                                type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                                value={formCustomFields[field.name] || ''}
                                onChange={e => setFormCustomFields(prev => ({ ...prev, [field.name]: e.target.value }))}
                                placeholder={field.label}
                                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleFormSubmit}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Capturar Lead
                    </button>
                  </div>
                </GlassCard>
              </div>

              {/* Recent Captures */}
              <div>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white mb-3">Capturas Recentes</h3>
                  <div className="space-y-2.5">
                    {leads.slice(0, 6).map(lead => (
                      <div key={lead.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{lead.name}</p>
                          <p className="text-[10px] text-slate-500">{lead.channel} • {lead.interest || 'Sem interesse'}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold ${
                          lead.score >= 80 ? 'bg-emerald-500/15 text-emerald-400' : lead.score >= 50 ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'
                        }`}>
                          {lead.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* CSV Import */}
          {activeTab === 'csv' && (
            <GlassCard>
              <h3 className="text-sm font-semibold text-white mb-4">Importar Leads via CSV</h3>
              <div className="space-y-5">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/[0.08] rounded-2xl p-8 text-center hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all cursor-pointer"
                >
                  <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={e => setCsvFile(e.target.files?.[0]?.name || null)} />
                  <FileSpreadsheet className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-300 mb-1">Arraste seu arquivo CSV aqui ou clique para selecionar</p>
                  <p className="text-xs text-slate-500">Suporta CSV com colunas: nome, telefone, email, origem, interesse, observações</p>
                  {csvFile && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">{csvFile}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <h4 className="text-xs font-semibold text-white mb-2">Formato esperado do CSV</h4>
                  <code className="block text-[10px] text-slate-400 font-mono bg-black/30 p-3 rounded-lg overflow-x-auto">
                    nome,telefone,email,origem,interesse,observações,cidade,empresa<br />
                    Maria Silva,11999887766,maria@email.com,whatsapp,Plano Enterprise,Interessada,SP,Tech Corp
                  </code>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 hover:bg-white/[0.06] transition-colors">
                    <Download className="w-4 h-4" /> Baixar Template
                  </button>
                  <button
                    onClick={handleCsvImport}
                    disabled={!csvFile || importing}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    {importing ? (
                      <div className="w-4 h-4 border-2 border-[#070b18]/30 border-t-[#070b18] rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {importing ? 'Importando...' : 'Importar'}
                  </button>
                </div>

                {importResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">Importação Concluída!</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-300">✅ {importResult.success} importados com sucesso</span>
                      <span className="text-xs text-amber-400">⚠️ {importResult.errors} com erros</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          )}

          {/* Webhook/API */}
          {activeTab === 'webhook' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-sm font-semibold text-white mb-4">Configuração de Webhook</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">URL do Webhook</label>
                    <input type="url" defaultValue="https://api.seusistema.com/leads" className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none focus:border-emerald-500/30 font-mono" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Método HTTP</label>
                    <select className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 outline-none">
                      <option>POST</option>
                      <option>PUT</option>
                      <option>PATCH</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 block">Headers</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="text" defaultValue="Authorization" className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none font-mono" />
                        <input type="text" defaultValue="Bearer ***" className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none font-mono" />
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
                    Salvar Webhook
                  </button>
                </div>
              </GlassCard>

              <div className="space-y-4">
                {/* Incoming Webhook URL */}
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white mb-3">URL de Recebimento</h3>
                  <p className="text-xs text-slate-500 mb-3">Envie leads para esta URL via POST</p>
                  <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                    <code className="text-xs text-emerald-400 font-mono break-all">https://api.leadcapture.pro/v1/webhooks/t1/incoming</code>
                  </div>
                  <button className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors">
                    <Copy className="w-3 h-3" /> Copiar URL
                  </button>
                </GlassCard>

                {/* Payload Example */}
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white mb-3">Exemplo de Payload</h3>
                  <code className="block text-[10px] text-slate-400 font-mono bg-black/30 p-3 rounded-lg overflow-x-auto whitespace-pre">{`{
  "name": "Maria Silva",
  "phone": "11999887766",
  "email": "maria@email.com",
  "source": "webhook",
  "interest": "Plano Enterprise",
  "notes": "Lead via API",
  "custom_fields": {
    "cidade": "São Paulo",
    "empresa": "Tech Corp"
  }
}`}</code>
                </GlassCard>

                {/* Active Webhooks */}
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white mb-3">Webhooks Configurados</h3>
                  <div className="space-y-2">
                    {webhookConfigs.map(wh => (
                      <div key={wh.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03]">
                        <div className={`w-2 h-2 rounded-full ${wh.active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white">{wh.name}</p>
                          <p className="text-[10px] text-slate-500 truncate font-mono">{wh.url}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-emerald-400 font-medium">{wh.successRate}%</p>
                          <p className="text-[9px] text-slate-500">{wh.totalCalls} calls</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* Embed */}
          {activeTab === 'embed' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-sm font-semibold text-white mb-4">Embed no seu Site</h3>
                <p className="text-xs text-slate-500 mb-4">Copie o código abaixo e cole no HTML do seu site para capturar leads automaticamente</p>
                <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] relative">
                  <code className="block text-[10px] text-slate-400 font-mono whitespace-pre">{embedCode}</code>
                  <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  <h4 className="text-xs font-semibold text-white">Configurações do Widget</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Cor Principal</label>
                      <input type="color" defaultValue="#34d399" className="w-full h-8 rounded-lg bg-transparent cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Posição</label>
                      <select className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none">
                        <option>Bottom Right</option>
                        <option>Bottom Left</option>
                        <option>Center Modal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Texto do Botão</label>
                      <input type="text" defaultValue="Fale Conosco" className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Auto-abrir</label>
                      <select className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 outline-none">
                        <option>Desativado</option>
                        <option>Após 5s</option>
                        <option>Após 10s</option>
                        <option>Na intenção de saída</option>
                      </select>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Preview */}
              <GlassCard>
                <h3 className="text-sm font-semibold text-white mb-4">Preview do Widget</h3>
                <div className="rounded-xl bg-[#0a0f1e] border border-white/[0.06] p-6 min-h-[400px] flex items-end justify-end relative">
                  <div className="text-xs text-slate-600 absolute top-4 left-4">seusite.com.br</div>
                  {/* Widget Preview */}
                  <div className="w-72 rounded-2xl bg-[#0f1629] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4">
                      <h4 className="text-sm font-bold text-[#070b18]">Fale Conosco</h4>
                      <p className="text-[10px] text-[#070b18]/70">Preencha e entraremos em contato</p>
                    </div>
                    <div className="p-4 space-y-3">
                      <input type="text" placeholder="Nome" className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-slate-300 outline-none" disabled />
                      <input type="tel" placeholder="Telefone" className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-slate-300 outline-none" disabled />
                      <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-slate-300 outline-none" disabled />
                      <select className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-slate-500 outline-none" disabled>
                        <option>Interesse...</option>
                      </select>
                      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-semibold text-[#070b18]">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
                {/* Floating button */}
                <div className="mt-4 flex justify-end">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 cursor-pointer hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 text-[#070b18]" />
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

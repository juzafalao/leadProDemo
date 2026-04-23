import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { leads } from '../data/mockData';
import type { Lead, LeadSource } from '../types';
import {
  Search, Filter, Download, Plus, MoreHorizontal,
  MessageCircle, Globe, Bot, Workflow, Instagram, Facebook, UserPlus,
  ArrowUpDown, Eye, Phone, Mail, Star, Clock, ChevronDown, FileUp, Webhook as WebhookIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sourceIcons: Record<string, typeof MessageCircle> = {
  whatsapp: MessageCircle, website: Globe, chatbot: Bot, n8n: Workflow,
  instagram: Instagram, facebook: Facebook, referral: UserPlus,
  csv_import: Download, webhook: Workflow, api: Workflow, manual: Plus,
};

const sourceColors: Record<string, string> = {
  whatsapp: '#25D366', website: '#6366f1', chatbot: '#f59e0b', n8n: '#ea580c',
  instagram: '#E1306C', facebook: '#1877F2', referral: '#10b981', manual: '#8b5cf6',
  csv_import: '#06b6d4', webhook: '#8b5cf6', api: '#8b5cf6',
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Novo', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  contacted: { label: 'Contatado', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  qualified: { label: 'Qualificado', color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  proposal: { label: 'Proposta', color: 'text-violet-400', bg: 'bg-violet-500/15' },
  negotiation: { label: 'Negociação', color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  closed_won: { label: 'Fechado ✓', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  closed_lost: { label: 'Perdido', color: 'text-rose-400', bg: 'bg-rose-500/15' },
};

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm);
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchSource = sourceFilter === 'all' || l.source === sourceFilter;
    return matchSearch && matchStatus && matchSource;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Leads</h2>
          <p className="text-sm text-slate-400 mt-1">Gerencie e qualifique seus leads em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-colors">
            <Download className="w-4 h-4" /> Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
            <Plus className="w-4 h-4" /> Novo Lead
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <GlassCard delay={0.1}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] flex-1">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                showFilters ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/[0.04] border-white/[0.06] text-slate-400 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 outline-none"
                >
                  <option value="all">Todos Status</option>
                  {Object.entries(statusConfig).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
                <select
                  value={sourceFilter}
                  onChange={e => setSourceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 outline-none"
                >
                  <option value="all">Todas Origens</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="website">Formulário Web</option>
                  <option value="chatbot">Chatbot</option>
                  <option value="n8n">n8n</option>
                  <option value="webhook">API / Webhook</option>
                  <option value="csv_import">Importação CSV</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="referral">Indicação</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-xs text-slate-500">
            {filtered.length} leads encontrados
          </div>
        </div>
      </GlassCard>

      {/* Leads Table */}
      <GlassCard delay={0.2} noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300">Lead <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Canal</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Marca</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Consultor</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Última Interação</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const status = statusConfig[lead.status];
                const SourceIcon = sourceIcons[lead.source] || Globe;
                const sourceColor = sourceColors[lead.source] || '#8b5cf6';
                return (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedLead(lead)}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{lead.name}</p>
                          <p className="text-[11px] text-slate-500">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <SourceIcon className="w-3.5 h-3.5" style={{ color: sourceColor }} />
                        <span className="text-xs text-slate-300">{lead.channel}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${lead.brandColor}15`, color: lead.brandColor }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lead.brandColor }} />
                        {lead.brandName}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          lead.score >= 80 ? 'bg-emerald-500/15 text-emerald-400' :
                          lead.score >= 50 ? 'bg-amber-500/15 text-amber-400' :
                          'bg-rose-500/15 text-rose-400'
                        }`}>
                          {lead.score}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          lead.temperature === 'quente' ? 'bg-rose-500/15 text-rose-400' :
                          lead.temperature === 'morno' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-cyan-500/15 text-cyan-400'
                        }`}>
                          {lead.temperature}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${status.color} ${status.bg}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-mono text-slate-300">
                        {lead.value ? lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }) : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-400">{lead.consultantName}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-500">
                        {lead.lastInteraction ? new Date(lead.lastInteraction).toLocaleDateString('pt-BR') : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-emerald-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-indigo-400 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0f1629] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center text-lg font-bold text-white">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedLead.name}</h3>
                      <p className="text-sm text-slate-400">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    selectedLead.score >= 80 ? 'bg-emerald-500/15 text-emerald-400' :
                    selectedLead.score >= 50 ? 'bg-amber-500/15 text-amber-400' :
                    'bg-rose-500/15 text-rose-400'
                  }`}>
                    {selectedLead.score}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    selectedLead.temperature === 'quente' ? 'bg-rose-500/15 text-rose-400' :
                    selectedLead.temperature === 'morno' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-cyan-500/15 text-cyan-400'
                  }`}>
                    🔥 {selectedLead.temperature}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Telefone</p>
                    <p className="text-sm text-slate-200">{selectedLead.phone}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Canal</p>
                    <p className="text-sm text-slate-200">{selectedLead.channel}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Valor</p>
                    <p className="text-sm text-emerald-400 font-semibold">
                      {selectedLead.value ? selectedLead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Não definido'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Consultor</p>
                    <p className="text-sm text-slate-200">{selectedLead.consultantName}</p>
                  </div>
                  {selectedLead.interest && (
                    <div className="p-3 rounded-xl bg-white/[0.03]">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Interesse</p>
                      <p className="text-sm text-indigo-400">{selectedLead.interest}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${statusConfig[selectedLead.status]?.color} ${statusConfig[selectedLead.status]?.bg}`}>
                      {statusConfig[selectedLead.status]?.label}
                    </span>
                  </div>
                  {selectedLead.sourceDetail && (
                    <div className="p-3 rounded-xl bg-white/[0.03]">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Detalhe da Origem</p>
                      <p className="text-sm text-slate-200">{selectedLead.sourceDetail}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Marca</p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${selectedLead.brandColor}15`, color: selectedLead.brandColor }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedLead.brandColor }} />
                      {selectedLead.brandName}
                    </span>
                  </div>
                </div>
                {(selectedLead.utmSource || selectedLead.utmMedium || selectedLead.utmCampaign) && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">UTM Tracking</p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedLead.utmSource && (
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <p className="text-[9px] text-slate-500">Source</p>
                          <p className="text-xs text-cyan-400 font-mono">{selectedLead.utmSource}</p>
                        </div>
                      )}
                      {selectedLead.utmMedium && (
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <p className="text-[9px] text-slate-500">Medium</p>
                          <p className="text-xs text-cyan-400 font-mono">{selectedLead.utmMedium}</p>
                        </div>
                      )}
                      {selectedLead.utmCampaign && (
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <p className="text-[9px] text-slate-500">Campaign</p>
                          <p className="text-xs text-cyan-400 font-mono">{selectedLead.utmCampaign}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {selectedLead.notes && (
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Observações</p>
                    <p className="text-sm text-slate-300">{selectedLead.notes}</p>
                  </div>
                )}
                {selectedLead.customFields && Object.keys(selectedLead.customFields).length > 0 && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Campos Customizados</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedLead.customFields).map(([key, val]) => (
                        <div key={key} className="p-2 rounded-lg bg-white/[0.02]">
                          <p className="text-[9px] text-slate-500">{key}</p>
                          <p className="text-xs text-slate-300">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedLead.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.06] text-[11px] text-slate-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 text-sm font-medium hover:bg-emerald-500/25 transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 text-sm font-medium hover:bg-indigo-500/25 transition-colors">
                    <Phone className="w-4 h-4" /> Ligar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/15 text-amber-400 text-sm font-medium hover:bg-amber-500/25 transition-colors">
                    <Mail className="w-4 h-4" /> Email
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

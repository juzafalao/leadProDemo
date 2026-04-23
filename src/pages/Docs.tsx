import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import {
  Database, Shield, AlertTriangle, CheckCircle2, Clock, Zap,
  BookOpen, Server, Lock, Eye, GitBranch, Globe, Smartphone,
  Cpu, HardDrive, Activity, TrendingUp, Users, Layers,
  ChevronRight, ChevronDown, Copy, ExternalLink, FileCode,
  Terminal, Box, ArrowRight, Circle, Sparkles, Rocket,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DocSection = 'overview' | 'database' | 'colors' | 'architecture' | 'security' | 'metrics' | 'roadmap' | 'critical' | 'flows';

const navItems: { id: DocSection; label: string; icon: typeof Database }[] = [
  { id: 'overview', label: 'Visão Geral', icon: BookOpen },
  { id: 'database', label: 'Base de Dados', icon: Database },
  { id: 'colors', label: 'Design System', icon: Eye },
  { id: 'architecture', label: 'Arquitetura', icon: Server },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'critical', label: 'Pontos Críticos', icon: AlertTriangle },
  { id: 'flows', label: 'Fluxos', icon: Activity },
  { id: 'metrics', label: 'Métricas', icon: Activity },
  { id: 'roadmap', label: 'Roadmap', icon: Rocket },
];

const dbTables = [
  {
    module: '🏢 Multi-Tenancy & Auth',
    tables: [
      { name: 'tenants', desc: 'Franqueadoras / Imobiliárias / Consultórios', fields: ['id UUID PK', 'name VARCHAR(255)', 'slug VARCHAR(100) UNIQUE', 'logo_url TEXT', 'tenant_type VARCHAR(50) DEFAULT \'franchise\'', 'settings JSONB DEFAULT \'{}\'', 'is_active BOOLEAN DEFAULT true', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
      { name: 'brands', desc: 'Marcas do tenant (multi-marca)', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'name VARCHAR(255) NOT NULL', 'slug VARCHAR(100) NOT NULL', 'logo_url TEXT', 'color VARCHAR(7)', 'description TEXT', 'is_active BOOLEAN DEFAULT true', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 3 },
      { name: 'users', desc: 'Usuários do sistema', fields: ['id UUID PK', 'tenant_id UUID FK→tenants', 'email VARCHAR(255) UNIQUE', 'full_name VARCHAR(255)', 'role VARCHAR(50)', 'avatar_url TEXT', 'phone VARCHAR(20)', 'is_active BOOLEAN', 'last_login_at TIMESTAMPTZ', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 2 },
      { name: 'user_roles', desc: 'Perfis e permissões', fields: ['id UUID PK', 'user_id UUID FK→users', 'role VARCHAR(50)', 'permissions JSONB', 'tenant_id UUID FK→tenants'], rls: 3, indexes: 1 },
    ]
  },
  {
    module: '🏪 Franquias',
    tables: [
      { name: 'franchises', desc: 'Dados das franquias', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'name VARCHAR(255) NOT NULL', 'code VARCHAR(50) UNIQUE NOT NULL', 'city VARCHAR(100)', 'state VARCHAR(2)', 'manager_id UUID FK→users', 'whatsapp_number VARCHAR(20)', 'is_active BOOLEAN DEFAULT true', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 3 },
      { name: 'franchise_settings', desc: 'Configurações por unidade', fields: ['id UUID PK', 'franchise_id UUID FK→franchises NOT NULL', 'auto_qualification_enabled BOOLEAN DEFAULT true', 'auto_response_enabled BOOLEAN DEFAULT true', 'business_hours JSONB', 'notification_preferences JSONB', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
    ]
  },
  {
    module: '🎯 Leads & Captura',
    tables: [
      { name: 'leads', desc: 'Leads capturados (Core do Sistema)', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'franchise_id UUID FK→franchises', 'brand_id UUID FK→brands NOT NULL', 'name VARCHAR(255) NOT NULL', 'phone VARCHAR(20) NOT NULL', 'email VARCHAR(255)', 'status VARCHAR(50) DEFAULT \'novo\'', 'quality_score INTEGER', 'temperature VARCHAR(20)', 'source_id UUID FK→lead_sources', 'source_detail VARCHAR(255)', 'utm_source VARCHAR(100)', 'utm_medium VARCHAR(100)', 'utm_campaign VARCHAR(100)', 'interest TEXT', 'notes TEXT', 'custom_fields JSONB DEFAULT \'{}\'', 'assigned_to UUID FK→users', 'last_interaction_at TIMESTAMPTZ', 'converted_at TIMESTAMPTZ', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 6, indexes: 9 },
      { name: 'lead_sources', desc: 'Origem dos leads', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'name VARCHAR(100) NOT NULL', 'type VARCHAR(50)', 'icon VARCHAR(50)', 'color VARCHAR(7)', 'is_active BOOLEAN DEFAULT true', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
      { name: 'lead_interactions', desc: 'Histórico de interações', fields: ['id UUID PK', 'lead_id UUID FK→leads NOT NULL', 'user_id UUID FK→users', 'type VARCHAR(50) NOT NULL', 'direction VARCHAR(20)', 'content TEXT', 'metadata JSONB', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 3 },
      { name: 'lead_qualification', desc: 'Status de qualificação', fields: ['id UUID PK', 'lead_id UUID FK→leads', 'rule_id UUID', 'old_status VARCHAR(50)', 'new_status VARCHAR(50)', 'score_before INTEGER', 'score_after INTEGER', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
    ]
  },
  {
    module: '💬 WhatsApp',
    tables: [
      { name: 'whatsapp_instances', desc: 'Instâncias Evolution API', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'franchise_id UUID FK→franchises', 'instance_name VARCHAR(100) UNIQUE NOT NULL', 'instance_key VARCHAR(255) NOT NULL', 'phone_number VARCHAR(20)', 'qr_code TEXT', 'status VARCHAR(50) DEFAULT \'disconnected\'', 'last_connected_at TIMESTAMPTZ', 'webhook_url TEXT', 'settings JSONB DEFAULT \'{}\'', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 3 },
      { name: 'whatsapp_messages', desc: 'Mensagens enviadas/recebidas', fields: ['id UUID PK', 'instance_id UUID FK→whatsapp_instances NOT NULL', 'lead_id UUID FK→leads', 'message_id VARCHAR(255) UNIQUE', 'from_number VARCHAR(20) NOT NULL', 'to_number VARCHAR(20) NOT NULL', 'type VARCHAR(50)', 'content TEXT', 'media_url TEXT', 'direction VARCHAR(20)', 'status VARCHAR(50)', 'is_from_me BOOLEAN', 'timestamp TIMESTAMPTZ NOT NULL', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 5, indexes: 5 },
      { name: 'whatsapp_webhooks', desc: 'Log de webhooks', fields: ['id UUID PK', 'instance_id UUID FK→whatsapp_instances', 'event_type VARCHAR(100)', 'payload JSONB NOT NULL', 'processed BOOLEAN DEFAULT false', 'processed_at TIMESTAMPTZ', 'error_message TEXT', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
    ]
  },
  {
    module: '⚙️ Workflows & Automação',
    tables: [
      { name: 'automation_rules', desc: 'Regras de automação', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'franchise_id UUID FK→franchises', 'name VARCHAR(255) NOT NULL', 'description TEXT', 'trigger_event VARCHAR(100)', 'conditions JSONB NOT NULL', 'actions JSONB NOT NULL', 'priority INTEGER DEFAULT 0', 'is_active BOOLEAN DEFAULT true', 'execution_count INTEGER DEFAULT 0', 'last_executed_at TIMESTAMPTZ', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 2 },
      { name: 'workflow_templates', desc: 'Templates de fluxo', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'name VARCHAR(255) NOT NULL', 'category VARCHAR(100)', 'steps JSONB NOT NULL', 'is_active BOOLEAN DEFAULT true', 'created_at TIMESTAMPTZ DEFAULT NOW()', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 1 },
      { name: 'scheduled_messages', desc: 'Mensagens agendadas', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'lead_id UUID FK→leads', 'instance_id UUID FK→whatsapp_instances', 'content TEXT', 'scheduled_for TIMESTAMPTZ', 'status VARCHAR(20)', 'sent_at TIMESTAMPTZ'], rls: 4, indexes: 3 },
    ]
  },
  {
    module: '📊 Analytics & Monitoramento',
    tables: [
      { name: 'analytics_events', desc: 'Eventos rastreados', fields: ['id UUID PK', 'tenant_id UUID FK→tenants NOT NULL', 'franchise_id UUID FK→franchises', 'event_name VARCHAR(100) NOT NULL', 'event_category VARCHAR(50)', 'properties JSONB', 'user_id UUID FK→users', 'lead_id UUID FK→leads', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 4 },
      { name: 'system_logs', desc: 'Logs de sistema', fields: ['id UUID PK', 'level VARCHAR(20) NOT NULL', 'category VARCHAR(50)', 'message TEXT NOT NULL', 'stack_trace TEXT', 'context JSONB', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 2, indexes: 3 },
      { name: 'performance_metrics', desc: 'Métricas de performance', fields: ['id UUID PK', 'metric_name VARCHAR(100) NOT NULL', 'metric_value NUMERIC NOT NULL', 'unit VARCHAR(20)', 'tags JSONB', 'recorded_at TIMESTAMPTZ DEFAULT NOW()'], rls: 2, indexes: 3 },
    ]
  },
  {
    module: '🔔 Notificações',
    tables: [
      { name: 'notifications', desc: 'Central de notificações', fields: ['id UUID PK', 'user_id UUID FK→users NOT NULL', 'type VARCHAR(50) NOT NULL', 'title VARCHAR(255) NOT NULL', 'message TEXT NOT NULL', 'link VARCHAR(500)', 'icon VARCHAR(50)', 'is_read BOOLEAN DEFAULT false', 'read_at TIMESTAMPTZ', 'created_at TIMESTAMPTZ DEFAULT NOW()'], rls: 4, indexes: 3 },
      { name: 'notification_preferences', desc: 'Preferências de usuário', fields: ['id UUID PK', 'user_id UUID FK→users UNIQUE NOT NULL', 'email_enabled BOOLEAN DEFAULT true', 'push_enabled BOOLEAN DEFAULT true', 'sms_enabled BOOLEAN DEFAULT false', 'preferences JSONB DEFAULT \'{}\'', 'updated_at TIMESTAMPTZ DEFAULT NOW()'], rls: 3, indexes: 2 },
    ]
  },
];

const colorPalette = [
  { name: 'Background Principal', var: '--bg-primary', value: '#050810', usage: 'Fundo geral do app', textLight: true },
  { name: 'Background Sidebar', var: '--bg-sidebar', value: '#070b18', usage: 'Sidebar e painéis fixos', textLight: true },
  { name: 'Background Card', var: '--bg-card', value: '#0f1629', usage: 'Cards, modais, dropdowns', textLight: true },
  { name: 'Emerald 400', var: '--accent-primary', value: '#34d399', usage: 'Ações primárias, status ativo, CTAs', textLight: false },
  { name: 'Cyan 400', var: '--accent-secondary', value: '#22d3ee', usage: 'Gradientes, links, destaques', textLight: false },
  { name: 'Amber 400', var: '--warning', value: '#fbbf24', usage: 'Alertas, atenção, pendências', textLight: false },
  { name: 'Rose 400', var: '--danger', value: '#fb7185', usage: 'Erros, crítico, exclusão', textLight: false },
  { name: 'Indigo 400', var: '--info', value: '#818cf8', usage: 'Informação, qualificação', textLight: false },
  { name: 'WhatsApp Green', var: '--whatsapp', value: '#25D366', usage: 'Canal WhatsApp', textLight: false },
  { name: 'n8n Orange', var: '--n8n', value: '#ea580c', usage: 'Integração n8n', textLight: false },
  { name: 'Slate 300', var: '--text-primary', value: '#cbd5e1', usage: 'Texto principal', textLight: false },
  { name: 'Slate 400', var: '--text-secondary', value: '#94a3b8', usage: 'Texto secundário', textLight: false },
  { name: 'Slate 500', var: '--text-muted', value: '#64748b', usage: 'Texto discreto, labels', textLight: false },
  { name: 'White 6%', var: '--border', value: 'rgba(255,255,255,0.06)', usage: 'Bordas de cards, divisores', textLight: true },
  { name: 'White 2%', var: '--bg-glass', value: 'rgba(255,255,255,0.02)', usage: 'Fundo glassmorphism', textLight: true },
  { name: 'White 4%', var: '--bg-subtle', value: 'rgba(255,255,255,0.04)', usage: 'Inputs, áreas hover', textLight: true },
];

const gradientPairs = [
  { name: 'Primary CTA', from: '#34d399', to: '#22d3ee', usage: 'Botões principais, gradientes hero' },
  { name: 'Emerald Glow', from: '#34d399/20', to: '#22d3ee/10', usage: 'Cards ativos, sidebar selecionada' },
  { name: 'Amber Glow', from: '#fbbf24/20', to: '#f59e0b/10', usage: 'Cards de atenção, warning' },
  { name: 'Rose Glow', from: '#fb7185/20', to: '#f43f5e/10', usage: 'Cards de erro, crítico' },
  { name: 'Indigo Glow', from: '#818cf8/20', to: '#6366f1/10', usage: 'Cards de informação' },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState<DocSection>('overview');
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (color: string, name: string) => {
    navigator.clipboard.writeText(color).catch(() => {});
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Documentação Técnica</h2>
        <p className="text-sm text-slate-400 mt-1">Arquitetura, base de dados, design system e processos do LeadCapture Pro</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Side Nav */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* OVERVIEW */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[#070b18]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">LeadCapture Pro</h3>
                        <p className="text-xs text-emerald-400/80 font-medium tracking-wider">SaaS MULTI-TENANT ENTERPRISE-GRADE</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Plataforma SaaS multi-tenant para <strong className="text-white">captura e qualificação de leads em redes de franquias</strong>, com integração WhatsApp via Evolution API e arquitetura serverless completa.
                    </p>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400">Problema que resolve:</strong> Franquias recebem leads de múltiplos canais (WhatsApp, site, redes sociais) de forma descentralizada. O LeadCapture Pro centraliza tudo em um único sistema, qualifica automaticamente e distribui para as unidades certas.
                      </p>
                    </div>
                  </GlassCard>

                  {/* Diferenciais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: Layers, title: 'Multi-tenant Nativo', desc: 'Uma franqueadora gerencia N franquias com isolamento total de dados', color: 'emerald' },
                      { icon: MessageCircle, title: 'WhatsApp em Tempo Real', desc: 'Integração bidirecional via Evolution API com webhooks', color: 'emerald' },
                      { icon: Shield, title: 'Qualificação Automática', desc: 'Motor de regras customizáveis com condições e ações', color: 'indigo' },
                      { icon: Activity, title: 'Dashboard Live', desc: 'Monitoramento em tempo real com WebSocket e alertas', color: 'cyan' },
                      { icon: Lock, title: 'Segurança Enterprise', desc: 'RLS, rate limiting, validação Zod, CORS restritivo', color: 'rose' },
                      { icon: Globe, title: 'Múltiplos Canais', desc: 'WhatsApp, Web, Chatbot, n8n, API, CSV, Instagram, Facebook', color: 'amber' },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-${item.color}-500/15 flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-5 h-5 text-${item.color}-400`} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4">Números do Sistema</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { label: 'Tabelas', value: '22', icon: Database },
                        { label: 'Políticas RLS', value: '73', icon: Shield },
                        { label: 'Índices', value: '76', icon: Cpu },
                        { label: 'Triggers', value: '44', icon: Zap },
                        { label: 'Stored Functions', value: '24', icon: Terminal },
                      ].map(stat => {
                        const Icon = stat.icon;
                        return (
                          <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.03]">
                            <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                            <p className="text-[10px] text-slate-500">{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>

                  {/* Tech Stack */}
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4">Stack Tecnológico</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-cyan-500/10">
                        <h4 className="text-xs font-semibold text-cyan-400 mb-2 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Frontend</h4>
                        <ul className="space-y-1.5">
                          {['React 18 + Vite', 'Tailwind CSS v4', 'TypeScript', 'Recharts', 'Framer Motion', 'Deploy: Vercel (Edge)'].map(t => (
                            <li key={t} className="text-xs text-slate-400 flex items-center gap-1.5"><Circle className="w-1 h-1 text-cyan-400" />{t}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/10">
                        <h4 className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5"><Server className="w-3.5 h-3.5" /> Backend</h4>
                        <ul className="space-y-1.5">
                          {['Node.js + Express.js', 'API RESTful', 'Vercel Functions (Serverless)', 'Rate Limiting: express-rate-limit', 'Validação: Zod + .strip()', 'Helmet.js + CORS'].map(t => (
                            <li key={t} className="text-xs text-slate-400 flex items-center gap-1.5"><Circle className="w-1 h-1 text-emerald-400" />{t}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-indigo-500/10">
                        <h4 className="text-xs font-semibold text-indigo-400 mb-2 flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Banco de Dados</h4>
                        <ul className="space-y-1.5">
                          {['Supabase (PostgreSQL 15)', '22 tabelas com RLS', '73 políticas de segurança', '76 índices otimizados', '44 triggers de automação', '24 stored functions'].map(t => (
                            <li key={t} className="text-xs text-slate-400 flex items-center gap-1.5"><Circle className="w-1 h-1 text-indigo-400" />{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* DATABASE */}
              {activeSection === 'database' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" /> Schema PostgreSQL — 22 Tabelas
                    </h3>
                    <span className="text-[10px] text-slate-500">Plataforma: Supabase (PostgreSQL 15)</span>
                  </div>

                  {dbTables.map((module, mi) => (
                    <GlassCard key={module.module} delay={mi * 0.05} noPadding>
                      <div className="px-5 py-3 border-b border-white/[0.04]">
                        <h4 className="text-xs font-semibold text-white">{module.module}</h4>
                      </div>
                      <div className="divide-y divide-white/[0.03]">
                        {module.tables.map(table => (
                          <div key={table.name}>
                            <button
                              onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
                              className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <Box className="w-4 h-4 text-emerald-400" />
                                <div>
                                  <p className="text-sm font-medium text-white font-mono">{table.name}</p>
                                  <p className="text-[10px] text-slate-500">{table.desc}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[9px] text-emerald-400 font-medium">{table.rls} RLS</span>
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-[9px] text-indigo-400 font-medium">{table.indexes} idx</span>
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-[9px] text-amber-400 font-medium">{table.fields.length} cols</span>
                                {expandedTable === table.name ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                              </div>
                            </button>
                            <AnimatePresence>
                              {expandedTable === table.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 py-3 bg-black/20">
                                    <code className="block text-[10px] font-mono text-slate-400 whitespace-pre leading-relaxed">
                                      <span className="text-emerald-400">CREATE TABLE</span> <span className="text-amber-400">{table.name}</span> {'(\n'}
                                      {table.fields.map((f, i) => (
                                        <span key={i}>  <span className="text-cyan-400">{f.split(' ')[0]}</span> <span className="text-slate-500">{f.split(' ').slice(1).join(' ')}</span>{i < table.fields.length - 1 ? ',' : ''}{'\n'}</span>
                                      ))}
                                      <span className="text-emerald-400">);</span>
                                    </code>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  ))}

                  {/* Critical Indexes */}
                  <GlassCard delay={0.5}>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-400" /> Índices Críticos para Performance
                    </h3>
                    <div className="space-y-2">
                      {[
                        { idx: 'idx_leads_phone', table: 'leads', desc: 'Busca por telefone (WhatsApp)', code: 'CREATE INDEX idx_leads_phone ON leads(phone);' },
                        { idx: 'idx_leads_tenant_created', table: 'leads', desc: 'Filtro por tenant + data', code: 'CREATE INDEX idx_leads_tenant_created ON leads(tenant_id, created_at DESC);' },
                        { idx: 'idx_messages_content_gin', table: 'whatsapp_messages', desc: 'Full-text search em mensagens', code: "CREATE INDEX idx_messages_content_gin ON whatsapp_messages USING gin(to_tsvector('portuguese', content));" },
                      ].map(idx => (
                        <div key={idx.idx} className="p-3 rounded-xl bg-black/20">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-amber-400">{idx.idx}</span>
                            <span className="text-[9px] text-slate-500">{idx.desc}</span>
                          </div>
                          <code className="text-[10px] font-mono text-slate-500">{idx.code}</code>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Triggers */}
                  <GlassCard delay={0.6}>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" /> Triggers Principais
                    </h3>
                    <div className="space-y-2">
                      {[
                        { name: 'on_whatsapp_message_insert', event: 'AFTER INSERT ON whatsapp_messages', action: 'create_or_update_lead_from_message()', desc: 'Auto-criação de Lead via WhatsApp' },
                        { name: 'audit_lead_changes', event: 'AFTER UPDATE ON leads', action: 'log_lead_change()', desc: 'Audit trail de alterações' },
                      ].map(t => (
                        <div key={t.name} className="p-3 rounded-xl bg-black/20">
                          <p className="text-xs font-mono text-orange-400 mb-1">{t.name}</p>
                          <p className="text-[10px] text-slate-500">{t.event} → {t.action}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* COLORS / DESIGN SYSTEM */}
              {activeSection === 'colors' && (
                <div className="space-y-6">
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-1">Design System — Neon Glass</h3>
                    <p className="text-xs text-slate-500 mb-4">Tema escuro com glassmorphism, gradientes emerald→cyan e tipografia Outfit + Inter</p>

                    <div className="mb-5">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Tipografia</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                          <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Outfit Bold</p>
                          <p className="text-xs text-slate-500">Headings, títulos, logos — Google Fonts</p>
                          <p className="text-[10px] text-slate-600 mt-1 font-mono">font-weight: 700-900</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                          <p className="text-lg text-slate-200 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Inter Regular</p>
                          <p className="text-xs text-slate-500">Body text, labels, dados — Google Fonts</p>
                          <p className="text-[10px] text-slate-600 mt-1 font-mono">font-weight: 300-600</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Paleta de Cores</h4>
                    <div className="space-y-2">
                      {colorPalette.map(color => (
                        <div key={color.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                          <button
                            onClick={() => copyColor(color.value, color.name)}
                            className="w-10 h-10 rounded-xl border border-white/[0.08] flex-shrink-0 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color.value }}
                          >
                            {copiedColor === color.name && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              </div>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-medium text-white">{color.name}</p>
                              <span className="text-[9px] text-slate-600 font-mono">{color.var}</span>
                            </div>
                            <p className="text-[10px] text-slate-500">{color.usage}</p>
                          </div>
                          <code className="text-[10px] font-mono text-slate-400 hidden sm:block">{color.value}</code>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Gradients */}
                  <GlassCard delay={0.2}>
                    <h4 className="text-xs font-semibold text-white mb-3">Gradientes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {gradientPairs.map(g => (
                        <div key={g.name} className="rounded-xl overflow-hidden border border-white/[0.06]">
                          <div
                            className="h-16"
                            style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                          />
                          <div className="p-3 bg-white/[0.02]">
                            <p className="text-xs font-medium text-white">{g.name}</p>
                            <p className="text-[10px] text-slate-500">{g.usage}</p>
                            <code className="text-[9px] text-slate-600 font-mono mt-1 block">from-{g.from} → to-{g.to}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Component Patterns */}
                  <GlassCard delay={0.3}>
                    <h4 className="text-xs font-semibold text-white mb-3">Padrões de Componente</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                        <p className="text-xs font-semibold text-white mb-2">GlassCard</p>
                        <code className="text-[10px] text-slate-400 font-mono">rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl</code>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                        <p className="text-xs font-semibold text-white mb-2">Botão Primário</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-[#070b18]">Exemplo</button>
                          <code className="text-[10px] text-slate-400 font-mono">bg-gradient-to-r from-emerald-500 to-cyan-500</code>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                        <p className="text-xs font-semibold text-white mb-2">Status Badge</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-blue-400 bg-blue-500/15">Novo</span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-amber-400 bg-amber-500/15">Contatado</span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-indigo-400 bg-indigo-500/15">Qualificado</span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-400 bg-emerald-500/15">Fechado ✓</span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-rose-400 bg-rose-500/15">Perdido</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
                        <p className="text-xs font-semibold text-white mb-2">Score Indicator</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-emerald-500/15 text-emerald-400">85</div>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-amber-500/15 text-amber-400">55</div>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-rose-500/15 text-rose-400">25</div>
                          <span className="text-[10px] text-slate-500">≥80 emerald / ≥50 amber / &lt;50 rose</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* ARCHITECTURE */}
              {activeSection === 'architecture' && (
                <div className="space-y-4">
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4">Arquitetura Serverless — Vercel</h3>
                    <div className="p-4 rounded-xl bg-black/20 font-mono text-[10px] text-slate-400 leading-loose">
                      <span className="text-emerald-400">leadcapture-pro/</span><br />
                      ├── <span className="text-amber-400">api/</span><br />
                      │   └── <span className="text-cyan-400">index.js</span>          <span className="text-slate-600"># Vercel Function (entry point)</span><br />
                      ├── <span className="text-amber-400">server/</span><br />
                      │   ├── <span className="text-cyan-400">app.js</span>            <span className="text-slate-600"># Express app (sem .listen)</span><br />
                      │   └── <span className="text-cyan-400">index.js</span>          <span className="text-slate-600"># Dev server local</span><br />
                      ├── <span className="text-amber-400">client/</span><br />
                      │   └── <span className="text-amber-400">src/</span>              <span className="text-slate-600"># React app</span><br />
                      └── <span className="text-indigo-400">vercel.json</span>         <span className="text-slate-600"># Configuração de rewrites</span>
                    </div>
                  </GlassCard>

                  {/* WhatsApp Flow */}
                  <GlassCard delay={0.1}>
                    <h3 className="text-sm font-semibold text-white mb-4">Fluxo de Mensagens WhatsApp</h3>
                    <div className="space-y-3">
                      {[
                        { step: 1, desc: 'Usuário envia WhatsApp', dest: 'Evolution API (VPS)', color: 'emerald' },
                        { step: 2, desc: 'Evolution API → Webhook', dest: 'LeadCapture backend', color: 'cyan' },
                        { step: 3, desc: 'Backend processa', dest: 'Salva em whatsapp_messages', color: 'indigo' },
                        { step: 4, desc: 'Trigger dispara', dest: 'Cria/atualiza lead', color: 'amber' },
                        { step: 5, desc: 'Automação avalia', dest: 'Dispara workflow se aplicável', color: 'orange' },
                      ].map(s => (
                        <div key={s.step} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-${s.color}-500/15 flex items-center justify-center text-xs font-bold text-${s.color}-400`}>
                            {s.step}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-200">{s.desc}</p>
                            <p className="text-[10px] text-slate-500">{s.dest}</p>
                          </div>
                          {s.step < 5 && <ArrowRight className="w-4 h-4 text-slate-600" />}
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* API Endpoints */}
                  <GlassCard delay={0.2}>
                    <h3 className="text-sm font-semibold text-white mb-3">Endpoints de Integração</h3>
                    <div className="space-y-2">
                      {[
                        { method: 'POST', path: '/api/webhooks/whatsapp/incoming', desc: 'Recebe mensagens WhatsApp' },
                        { method: 'POST', path: '/api/whatsapp/send', desc: 'Envia mensagens' },
                        { method: 'GET', path: '/api/whatsapp/instances', desc: 'Lista instâncias' },
                        { method: 'POST', path: '/api/whatsapp/instances/connect', desc: 'Conecta instância' },
                        { method: 'GET', path: '/api/leads', desc: 'Lista leads (com tenant_id)' },
                        { method: 'POST', path: '/api/leads', desc: 'Cria lead' },
                        { method: 'POST', path: '/api/webhooks/incoming', desc: 'Recebe leads via API externa' },
                      ].map(ep => (
                        <div key={ep.path} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            ep.method === 'GET' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-indigo-500/15 text-indigo-400'
                          }`}>{ep.method}</span>
                          <code className="text-[10px] font-mono text-slate-300 flex-1">{ep.path}</code>
                          <span className="text-[10px] text-slate-500">{ep.desc}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Auth Pattern */}
                  <GlassCard delay={0.3}>
                    <h3 className="text-sm font-semibold text-white mb-3">Padrão de Autenticação</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                        <p className="text-[10px] text-rose-400 font-semibold mb-1">❌ ERRADO — Vaza dados entre tenants</p>
                        <code className="text-[10px] font-mono text-slate-400">const leads = await supabase.from('leads').select('*');</code>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-[10px] text-emerald-400 font-semibold mb-1">✅ CORRETO — Filtra por tenant_id</p>
                        <code className="text-[10px] font-mono text-slate-400">{'const leads = await supabase\n  .from("leads")\n  .select("*")\n  .eq("tenant_id", currentTenant.id);'}</code>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                        <p className="text-[10px] text-rose-400 font-semibold mb-1">❌ ERRADO — Sem token de autenticação</p>
                        <code className="text-[10px] font-mono text-slate-400">fetch('/api/leads', {'{'} headers: {'{'} 'Content-Type': 'application/json' {'}'} {'}'})</code>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-[10px] text-emerald-400 font-semibold mb-1">✅ CORRETO — Com Bearer token</p>
                        <code className="text-[10px] font-mono text-slate-400">{`const token = localStorage.getItem('auth_token');
fetch('/api/leads', {
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  }
})`}</code>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* SECURITY */}
              {activeSection === 'security' && (
                <div className="space-y-4">
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" /> Hardening de Segurança — Fase A (CONCLUÍDA)
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Rate Limiting', status: 'done', desc: 'API: 100 req/15min | Auth: 5 req/15min | WhatsApp: 1000 req/15min', icon: Clock },
                        { label: 'Validação Zod + .strip()', status: 'done', desc: 'Schemas em todas as rotas, remove campos não esperados, sanitização SQL/XSS', icon: FileCode },
                        { label: 'CORS Restritivo', status: 'done', desc: 'Apenas origens whitelistadas (production + staging)', icon: Globe },
                        { label: 'Security Headers (Helmet.js)', status: 'done', desc: 'CSP, HSTS, X-Frame-Options: DENY', icon: Lock },
                        { label: 'ErrorBoundary Global', status: 'done', desc: 'Tratamento global de erros, logs estruturados, fallback UI', icon: AlertTriangle },
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{item.label}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>

                  {/* RLS Explanation */}
                  <GlassCard delay={0.2}>
                    <h3 className="text-sm font-semibold text-white mb-3">Row Level Security (RLS) — 73 Políticas</h3>
                    <p className="text-xs text-slate-400 mb-4">Cada tabela possui políticas específicas por operação, garantindo isolamento total entre tenants</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { op: 'SELECT', desc: 'Isolamento por tenant_id', color: 'emerald' },
                        { op: 'INSERT', desc: 'Validação de ownership', color: 'indigo' },
                        { op: 'UPDATE', desc: 'Restrições por role', color: 'amber' },
                        { op: 'DELETE', desc: 'Soft delete + audit', color: 'rose' },
                      ].map(rls => (
                        <div key={rls.op} className="p-3 rounded-xl bg-white/[0.03] text-center">
                          <p className={`text-sm font-bold text-${rls.color}-400 font-mono`}>{rls.op}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{rls.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                      <p className="text-[10px] text-amber-400 font-semibold">⚠️ IMPORTANTE: Policies estão no banco, não no código. Testar SEMPRE com usuários de diferentes tenants. Não desabilitar RLS nem em dev.</p>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* CRITICAL POINTS */}
              {activeSection === 'critical' && (
                <div className="space-y-4">
                  {[
                    {
                      title: 'Multi-Tenancy — NUNCA fazer query sem filtro tenant_id',
                      severity: 'critical',
                      items: [
                        'Sempre incluir .eq("tenant_id", currentTenant.id) em TODAS as queries',
                        'RLS policies protegem no nível do banco, mas o código também deve filtrar',
                        'Testar com usuários de diferentes tenants regularmente',
                        'Vazamento de dados entre tenants é falha CRÍTICA de segurança',
                      ]
                    },
                    {
                      title: 'RLS Policies — Não desabilitar',
                      severity: 'critical',
                      items: [
                        'Policies estão no banco, não no código da aplicação',
                        'Testar SEMPRE com usuários de diferentes tenants',
                        'Não desabilitar RLS nem em ambiente de desenvolvimento',
                        'Verificar políticas após cada migration',
                      ]
                    },
                    {
                      title: 'WhatsApp Rate Limits',
                      severity: 'high',
                      items: [
                        'Evolution API tem limite de mensagens por minuto',
                        'Implementar fila para envios em massa',
                        'Monitorar blacklist do WhatsApp',
                        'Respeitar horário comercial para envios automáticos',
                      ]
                    },
                    {
                      title: 'Vercel Serverless Limits',
                      severity: 'high',
                      items: [
                        'Timeout: 10s (Hobby), 60s (Pro)',
                        'Payload máximo: 4.5MB',
                        'Funções são stateless — usar DB para estado',
                        'Cold starts podem afetar latência',
                      ]
                    },
                  ].map((point, i) => (
                    <GlassCard key={i} delay={i * 0.1}>
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          point.severity === 'critical' ? 'bg-rose-500/15' : 'bg-amber-500/15'
                        }`}>
                          <AlertTriangle className={`w-4 h-4 ${
                            point.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{point.title}</h4>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold mt-1 ${
                            point.severity === 'critical' ? 'bg-rose-500/15 text-rose-400' : 'bg-amber-500/15 text-amber-400'
                          }`}>{point.severity.toUpperCase()}</span>
                          <ul className="mt-3 space-y-2">
                            {point.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                                <Circle className={`w-1.5 h-1.5 mt-1.5 flex-shrink-0 ${
                                  point.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'
                                }`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}

              {/* METRICS */}
              {activeSection === 'metrics' && (
                <div className="space-y-4">
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" /> Métricas de Sucesso do Sistema
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          category: '⚡ Performance',
                          metrics: [
                            { label: 'Tempo de resposta API', target: '< 200ms (p95)', current: '~180ms', status: 'ok' },
                            { label: 'Tempo de carregamento frontend', target: '< 2s', current: '~1.4s', status: 'ok' },
                            { label: 'Uptime', target: '99.9%', current: '99.95%', status: 'ok' },
                          ]
                        },
                        {
                          category: '💼 Negócio',
                          metrics: [
                            { label: 'Leads capturados/mês', target: 'Tracking ativo', current: '938', status: 'ok' },
                            { label: 'Taxa de qualificação', target: '> 60%', current: '45.6%', status: 'warning' },
                            { label: 'Tempo médio até 1º contato', target: '< 5min', current: '4.2min', status: 'ok' },
                          ]
                        },
                        {
                          category: '🔧 Técnicas',
                          metrics: [
                            { label: 'Test coverage', target: '> 80%', current: '~85%', status: 'ok' },
                            { label: 'Vulnerabilidades críticas (Snyk)', target: 'Zero', current: '0', status: 'ok' },
                            { label: 'Deployment success rate', target: '> 95%', current: '97.8%', status: 'ok' },
                          ]
                        },
                      ].map(cat => (
                        <div key={cat.category}>
                          <h4 className="text-xs font-semibold text-white mb-2">{cat.category}</h4>
                          <div className="space-y-2">
                            {cat.metrics.map(m => (
                              <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  m.status === 'ok' ? 'bg-emerald-500/15' : 'bg-amber-500/15'
                                }`}>
                                  {m.status === 'ok' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-slate-200">{m.label}</p>
                                  <p className="text-[10px] text-slate-500">Meta: {m.target}</p>
                                </div>
                                <span className={`text-xs font-semibold ${m.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'}`}>{m.current}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Audit Score */}
                  <GlassCard delay={0.2}>
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Score de Auditoria Técnica
                    </h3>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#34d399" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${7.6 * 25.13} 251.3`} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">7.6</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Score: 7.6 / 10</p>
                        <p className="text-xs text-slate-400 mt-1">22 issues resolvidas</p>
                        <p className="text-[10px] text-emerald-400 mt-0.5">Fase A (Hardening) — CONCLUÍDA</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { phase: 'A', label: 'Hardening Segurança', status: 'done', hours: '12h' },
                        { phase: 'B', label: 'Performance (Cache, CDN, Lazy Loading)', status: 'pending', hours: '15h' },
                        { phase: 'C', label: 'Observabilidade (APM, Tracing, Alerting)', status: 'pending', hours: '12h' },
                        { phase: 'D', label: 'Resiliência (Circuit Breakers, Retry)', status: 'pending', hours: '8h' },
                      ].map(p => (
                        <div key={p.phase} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            p.status === 'done' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/[0.06] text-slate-500'
                          }`}>
                            {p.phase}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-200">{p.label}</p>
                          </div>
                          <span className={`text-[10px] font-medium ${p.status === 'done' ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {p.status === 'done' ? '✅ Concluída' : `⏳ ${p.hours}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* FLOWS */}
              {activeSection === 'flows' && (
                <div className="space-y-6">
                  <GlassCard>
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" /> Fluxo de Captura via WhatsApp
                    </h3>
                    <div className="space-y-3">
                      {[
                        { step: 1, title: 'Cliente envia WhatsApp', desc: 'Mensagem para número da franquia', code: 'Evolution API (VPS) recebe → processa → dispara webhook' },
                        { step: 2, title: 'Backend recebe webhook', desc: 'POST /api/webhooks/whatsapp/incoming', code: 'Zod validation → rate limit → save whatsapp_messages' },
                        { step: 3, title: 'Trigger PostgreSQL', desc: 'on_whatsapp_message_insert', code: 'CREATE OR REPLACE FUNCTION create_or_update_lead_from_message()' },
                        { step: 4, title: 'Motor de Automação', desc: 'Avalia automation_rules ativas', code: 'SELECT * FROM automation_rules WHERE is_active = true ORDER BY priority' },
                        { step: 5, title: 'Analytics & Logging', desc: 'Registra eventos', code: 'INSERT INTO analytics_events (event_name, properties) VALUES (...)' },
                        { step: 6, title: 'Frontend atualiza', desc: 'WebSocket / polling (30s)', code: 'useEffect(() => { setInterval(fetchRealtime, 30000) }, [])' },
                      ].map(s => (
                        <div key={s.step} className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
n                          <div className=\"w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0\">{s.step}</div>
                          <div className=\"flex-1 min-w-0\">\n                            <p className=\"text-sm font-medium text-white\">{s.title}</p>\n                            <p className=\"text-xs text-slate-400\">{s.desc}</p>\n                            <code className=\"text-[10px] text-slate-600 font-mono mt-1 block\">{s.code}</code>\n                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard delay={0.2}>
                    <h3 className="text-sm font-semibold text-white mb-4\">Multi-Marca: Separação de Leads</h3>
                    <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04]">
n                      <p className=\"text-xs text-slate-300 mb-3\">Cada tenant pode ter múltiplas marcas. Cada lead pertence a uma marca específica via <code className=\"text-cyan-400\">brand_id</code>.</p>
                      <code className=\"text-[10px] text-slate-400 font-mono whitespace-pre\">{`-- Tabela brands\nCREATE TABLE brands (\n  id UUID PRIMARY KEY,\n  tenant_id UUID REFERENCES tenants(id) NOT NULL,\n  name VARCHAR(255) NOT NULL,\n  slug VARCHAR(100) NOT NULL,\n  color VARCHAR(7),\n  is_active BOOLEAN DEFAULT true\n);\n\n-- Campo na tabela leads\nbrand_id UUID REFERENCES brands(id) NOT NULL\n\n-- Query por marca\nSELECT * FROM leads\n  WHERE tenant_id = $1\n  AND brand_id = $2;`}</code>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* ROADMAP */}
              {activeSection === 'roadmap' && (
                <div className="space-y-4">
                  {[
                    {
                      quarter: 'Q2 2026',
                      items: [
                        { icon: Smartphone, label: 'Mobile App (React Native)', desc: 'App nativo para consultores em campo', status: 'planned' },
                        { icon: Sparkles, label: 'IA para Qualificação Preditiva', desc: 'Machine learning para scoring automático', status: 'planned' },
                        { icon: Globe, label: 'Integração CRMs', desc: 'Salesforce, HubSpot e outros', status: 'planned' },
                      ]
                    },
                    {
                      quarter: 'Q3 2026',
                      items: [
                        { icon: GitBranch, label: 'Editor Visual de Workflows', desc: 'Drag-and-drop para criar automações', status: 'planned' },
                        { icon: TrendingUp, label: 'Analytics Avançado', desc: 'Cohort analysis, funnels detalhados', status: 'planned' },
                        { icon: Globe, label: 'Multi-idioma (i18n)', desc: 'Português, Inglês, Espanhol', status: 'planned' },
                      ]
                    },
                    {
                      quarter: 'Q4 2026',
                      items: [
                        { icon: Layers, label: 'Marketplace de Integrações', desc: 'Plugins de terceiros', status: 'planned' },
                        { icon: Eye, label: 'White-label para Revendedores', desc: 'Customização total da marca', status: 'planned' },
                        { icon: Shield, label: 'Certificação SOC 2', desc: 'Compliance de segurança enterprise', status: 'planned' },
                      ]
                    },
                  ].map((quarter, qi) => (
                    <GlassCard key={quarter.quarter} delay={qi * 0.1}>
                      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-emerald-400" /> {quarter.quarter}
                      </h3>
                      <div className="space-y-3">
                        {quarter.items.map(item => {
                          const Icon = item.icon;
                          return (
                            <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-indigo-400" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-white">{item.label}</p>
                                <p className="text-[10px] text-slate-500">{item.desc}</p>
                              </div>
                              <span className="ml-auto px-2 py-0.5 rounded-full bg-indigo-500/10 text-[9px] text-indigo-400 font-medium flex-shrink-0">Planejado</span>
                            </div>
                          );
                        })}
                      </div>
                    </GlassCard>
                  ))}

                  {/* Info Footer */}
                  <GlassCard delay={0.4}>
                    <div className="text-center py-4">
                      <p className="text-xs text-slate-500">Documento preparado por <strong className="text-slate-300">Juliana — Zafalão Tech</strong></p>
                      <p className="text-[10px] text-slate-600 mt-1">Versão do Sistema: Session 5+ (Produção ativa) • Última Auditoria: 22 issues resolvidas, Score 7.6/10</p>
                    </div>
                  </GlassCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Server, Shield, Database, Zap, Monitor,
  CheckCircle2, ArrowDown, ChevronRight, ChevronDown,
  Radio, UserPlus, Thermometer, FileText, Clock,
  MessageSquare, Send, BarChart3, Bell, RefreshCw,
  Smartphone, Wifi, Eye, PenLine, Edit3, TrendingUp,
  AlertTriangle, LayoutGrid
} from 'lucide-react';

interface FlowStep {
  id: string;
  icon: typeof MessageCircle;
  title: string;
  subtitle: string;
  details: string[];
  color: string;
  bgColor: string;
}

function StepCard({ step, isActive, onClick, index }: { step: FlowStep; isActive: boolean; onClick: () => void; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <button
        onClick={onClick}
        className={`w-full text-left rounded-2xl border transition-all duration-300 ${
          isActive
            ? `border-white/[0.12] bg-white/[0.04] shadow-lg ${step.bgColor}`
            : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03]'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? step.bgColor : 'bg-white/[0.06]'}`}>
              <Icon className={`w-5 h-5 ${isActive ? step.color : 'text-slate-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-600 font-mono">STEP {index + 1}</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{step.title}</h4>
              <p className="text-[11px] text-slate-500">{step.subtitle}</p>
            </div>
            <div className="flex-shrink-0">
              {isActive ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-white/[0.04]">
                <div className="space-y-2 mt-3">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${step.color}`} />
                      <code className="text-[11px] text-slate-400 font-mono leading-relaxed">{detail}</code>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <div className="w-px h-4 bg-gradient-to-b from-white/[0.12] to-white/[0.04]" />
        <ArrowDown className="w-4 h-4 text-slate-600" />
      </motion.div>
    </div>
  );
}

const whatsappFlow: FlowStep[] = [
  {
    id: 'ws1',
    icon: Smartphone,
    title: 'Cliente envia WhatsApp',
    subtitle: 'Número da franquia (ex: +55 11 98765-4321)',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    details: [
      'Cliente envia mensagem para número da franquia',
      'Evolution API (VPS) recebe a mensagem',
      'Processa e formata o payload',
      'Dispara webhook para backend LeadCapture',
    ],
  },
  {
    id: 'ws2',
    icon: Server,
    title: 'Backend recebe webhook',
    subtitle: 'POST /api/webhooks/whatsapp/incoming',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    details: [
      'Valida payload com Zod schema (.strip())',
      'Rate limit check (1000 req/15min)',
      'Verifica instance_key da Evolution API',
      'Salva em whatsapp_messages',
      'Registra em whatsapp_webhooks',
    ],
  },
  {
    id: 'ws3',
    icon: Database,
    title: 'Trigger PostgreSQL',
    subtitle: 'on_whatsapp_message_insert',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    details: [
      'Busca lead existente por from_number (phone)',
      'Se não existe: INSERT em leads (status=novo)',
      'Se existe: UPDATE last_interaction_at',
      'INSERT em lead_interactions',
      'Vincula brand_id pela franquia',
    ],
  },
  {
    id: 'ws4',
    icon: Zap,
    title: 'Motor de Automação',
    subtitle: 'Avalia automation_rules ativas',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    details: [
      'SELECT automation_rules WHERE is_active = true',
      'Ordena por priority ASC',
      'Avalia conditions (field/operator/value)',
      'Executa actions configuradas:',
      '  → assign_to (atribui vendedor)',
      '  → set_status (marca como quente)',
      '  → send_whatsapp (resposta automática)',
      '  → send_notification (notifica equipe)',
    ],
  },
  {
    id: 'ws5',
    icon: BarChart3,
    title: 'Analytics & Logging',
    subtitle: 'Registra eventos para dashboards',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    details: [
      'INSERT em analytics_events',
      'UPDATE em performance_metrics',
      'Verifica anomalias (conversão, volume)',
      'Se anomalia: INSERT em anomaly_alerts',
    ],
  },
  {
    id: 'ws6',
    icon: Monitor,
    title: 'Frontend atualiza',
    subtitle: 'WebSocket ou polling (30s)',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    details: [
      'Dashboard mostra novo lead em tempo real',
      'Notificação push para vendedor',
      'Badge "novo" no menu Leads',
      'Card de franquia atualiza contadores',
      'Feed de eventos mostra atividade',
    ],
  },
];

const qualificationFlow: FlowStep[] = [
  {
    id: 'qf1',
    icon: Eye,
    title: 'Vendedor abre ficha do lead',
    subtitle: 'Visualiza dados completos',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    details: [
      'Histórico de mensagens WhatsApp',
      'Interações anteriores (calls, emails, notas)',
      'Campos customizados (cidade, empresa, cargo)',
      'Score de qualificação automático',
      'Marca do lead (LC Imóveis, Empresarial, Popular)',
    ],
  },
  {
    id: 'qf2',
    icon: Edit3,
    title: 'Ações de qualificação',
    subtitle: 'Manual e semi-automática',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    details: [
      'Alterar status (dropdown: novo → qualificado)',
      'Atribuir temperatura (frio/morno/quente)',
      'Adicionar nota textual',
      'Agendar follow-up (scheduled_messages)',
      'Enviar mensagem WhatsApp direta',
      'Marcar como convertido ou perdido',
    ],
  },
  {
    id: 'qf3',
    icon: Database,
    title: 'Sistema registra mudanças',
    subtitle: 'Audit trail completo',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    details: [
      'UPDATE em leads (status, temperature)',
      'INSERT em lead_interactions (nota)',
      'INSERT em analytics_events',
      'UPDATE em leads.updated_at',
      'Trigger: audit_lead_changes()',
    ],
  },
  {
    id: 'qf4',
    icon: TrendingUp,
    title: 'Se convertido',
    subtitle: 'Workflow de conversão',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    details: [
      'leads.converted_at = NOW()',
      'Dispara webhook externo (CRM opcional)',
      'Envia email de parabéns ao vendedor',
      'Atualiza ranking em tempo real',
      'INSERT em performance_metrics',
    ],
  },
];

const dashboardFlow: FlowStep[] = [
  {
    id: 'df1',
    icon: LayoutGrid,
    title: 'Página: /monitoramento',
    subtitle: 'useEffect() carrega dados iniciais',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    details: [
      'GET /api/analytics/realtime',
      'Agrupa dados por franquia',
      'Calcula KPIs (leads/dia, taxa conv.)',
      'Carrega alertas de anomalias',
    ],
  },
  {
    id: 'df2',
    icon: Radio,
    title: 'Grid de Cards por franquia',
    subtitle: 'Status visual em tempo real',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    details: [
      '🟢 Operando - KPIs dentro do esperado',
      '🟡 Atenção - métricas abaixo do limite',
      '🔴 Crítico - anomalia detectada',
      'Indicadores: leads hoje, conversão, tempo resposta',
    ],
  },
  {
    id: 'df3',
    icon: RefreshCw,
    title: 'Atualização em tempo real',
    subtitle: 'setInterval(30s) ou WebSocket',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    details: [
      'Atualiza contadores automaticamente',
      'Animação pulse em mudanças',
      'Alerta se anomalia detectada',
      'Feed de eventos em tempo real',
      'Badge de notificações atualiza',
    ],
  },
];

export default function ProcessFlow() {
  const [activeFlow, setActiveFlow] = useState<'whatsapp' | 'qualification' | 'dashboard'>('whatsapp');
  const [activeStep, setActiveStep] = useState<string>('ws1');

  const flows = {
    whatsapp: { steps: whatsappFlow, label: 'Captura via WhatsApp', icon: MessageCircle, color: 'emerald' },
    qualification: { steps: qualificationFlow, label: 'Qualificação Manual', icon: PenLine, color: 'cyan' },
    dashboard: { steps: dashboardFlow, label: 'Dashboard Real-time', icon: BarChart3, color: 'violet' },
  };

  const currentFlow = flows[activeFlow];
  const FlowIcon = currentFlow.icon;

  return (
    <div className="space-y-6">
      {/* Flow Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        {(Object.entries(flows) as [keyof typeof flows, typeof flows.whatsapp][]).map(([key, flow]) => {
          const TabIcon = flow.icon;
          return (
            <button
              key={key}
              onClick={() => { setActiveFlow(key); setActiveStep(flow.steps[0]?.id || ''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeFlow === key
                  ? `bg-${flow.color}-500/15 text-${flow.color}-400 border border-${flow.color}-500/20`
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <TabIcon className="w-4 h-4" /> {flow.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Flow Steps */}
        <div className="lg:col-span-3 space-y-2">
          {currentFlow.steps.map((step, i) => (
            <div key={step.id}>
              <StepCard
                step={step}
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(activeStep === step.id ? '' : step.id)}
                index={i}
              />
              {i < currentFlow.steps.length - 1 && <FlowArrow />}
            </div>
          ))}
        </div>

        {/* Visual Diagram */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 sticky top-24">
            <h4 className="text-xs font-semibold text-white mb-4 flex items-center gap-2">
              <FlowIcon className={`w-4 h-4 text-${currentFlow.color}-400`} />
              Diagrama do Fluxo
            </h4>
            <div className="space-y-3">
              {currentFlow.steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isActive ? step.bgColor : 'bg-white/[0.04]'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? step.color : 'text-slate-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>{step.title}</p>
                      {isActive && <p className="text-[10px] text-slate-400 mt-0.5">{step.subtitle}</p>}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="flowActive"
                        className={`w-2 h-2 rounded-full ${step.color.replace('text-', 'bg-')}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Code Example */}
            {activeStep && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-3 rounded-xl bg-black/30 border border-white/[0.04]"
              >
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-2">Exemplo de Código</p>
                {activeFlow === 'whatsapp' && activeStep === 'ws2' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`// Webhook handler
app.post('/api/webhooks/whatsapp',
  rateLimit({ max: 1000 }),
  validate(zodSchema),
  async (req, res) => {
    const msg = await db.insert(
      'whatsapp_messages', req.body
    );
    // Trigger fires automatically
    res.json({ ok: true });
  }
);`}</code>
                )}
                {activeFlow === 'whatsapp' && activeStep === 'ws3' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`-- PostgreSQL Trigger
CREATE TRIGGER on_whatsapp_msg
AFTER INSERT ON whatsapp_messages
FOR EACH ROW
EXECUTE FUNCTION
  create_or_update_lead();`}</code>
                )}
                {activeFlow === 'whatsapp' && activeStep === 'ws4' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`// Automation Engine
const rules = await db.query(
  'SELECT * FROM automation_rules
   WHERE is_active = true
   ORDER BY priority ASC'
);
for (const rule of rules) {
  if (evaluateConditions(
    rule.conditions, lead
  )) {
    await executeActions(
    rule.actions, lead
  );
  }
}`}</code>
                )}
                {activeFlow === 'qualification' && activeStep === 'qf2' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`// Lead qualification action
await db.update('leads', leadId, {
  status: 'qualified',
  temperature: 'quente',
  updated_at: new Date()
});
await db.insert('lead_interactions', {
  lead_id: leadId,
  type: 'note',
  content: noteContent,
  user_id: userId
});`}</code>
                )}
                {activeFlow === 'qualification' && activeStep === 'qf4' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`// Conversion workflow
await db.update('leads', leadId, {
  status: 'closed_won',
  converted_at: new Date(),
  updated_at: new Date()
});
await triggerWebhook(
  'lead.converted', lead
);
await sendEmail(
  consultant.email,
  'parabens-template'
);`}</code>
                )}
                {activeFlow === 'dashboard' && activeStep === 'df3' && (
                  <code className="text-[10px] text-slate-400 font-mono whitespace-pre">{`// Real-time updates
useEffect(() => {
  const interval = setInterval(
    async () => {
      const data = await fetch(
        '/api/analytics/realtime'
      );
      setKpis(data.kpis);
      setAlerts(data.anomalies);
    }, 30000
  );
  return () => clearInterval(
    interval
  );
}, []);`}</code>
                )}
                {!['ws2','ws3','ws4','qf2','qf4','df3'].includes(activeStep) && (
                  <code className="text-[10px] text-slate-400 font-mono">{`// Dados processados via pipeline de captura
// Consulte a documentação SQL completa`}</code>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

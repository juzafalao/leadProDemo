import type { Lead, RankingEntry, ChannelMetrics, KPIData, WhatsAppInstance, Franchise, AutomationRule, Notification, QualificationRule, CustomField, AnomalyAlert, MonitoringEvent, WebhookConfig, WorkflowTemplate, Brand, ScheduledMessage, AnalyticsEvent, SystemLog } from '../types';

export const brands: Brand[] = [
  { id: 'b1', tenantId: 't1', name: 'LeadCapture Imóveis', slug: 'lc-imoveis', color: '#6366f1', description: 'Marca de imóveis de médio e alto padrão', isActive: true, franchiseIds: ['f1', 'f2'], leadCount: 560, conversionRate: 24.2, revenue: 168500 },
  { id: 'b2', tenantId: 't1', name: 'LeadCapture Empresarial', slug: 'lc-empresarial', color: '#f59e0b', description: 'Soluções corporativas e salas comerciais', isActive: true, franchiseIds: ['f1', 'f3'], leadCount: 218, conversionRate: 19.8, revenue: 89600 },
  { id: 'b3', tenantId: 't1', name: 'LeadCapture Popular', slug: 'lc-popular', color: '#10b981', description: 'Imóveis populares e programas habitacionais', isActive: true, franchiseIds: ['f4', 'f5'], leadCount: 160, conversionRate: 28.1, revenue: 26400 },
];

export const franchises: Franchise[] = [
  { id: 'f1', name: 'LeadCapture SP Centro', code: 'SP-001', city: 'São Paulo', state: 'SP', tenantId: 't1', managerId: 'u1', managerName: 'Carlos Mendes', whatsappNumber: '+55 11 99988-7766', activeConsultants: 12, monthlyLeads: 342, conversionRate: 23.5, status: 'healthy', todayLeads: 28, todayConversion: 25.0, avgResponseTime: 3.2, activeChats: 7, weeklyTrend: [42, 38, 55, 48, 62, 45, 58], isActive: true, autoQualificationEnabled: true, autoResponseEnabled: true, businessHours: { seg: '9-18', ter: '9-18', qua: '9-18', qui: '9-18', sex: '9-18', sab: '9-13' }, brandId: 'b1', brandName: 'LC Imóveis' },
  { id: 'f2', name: 'LeadCapture RJ Zona Sul', code: 'RJ-001', city: 'Rio de Janeiro', state: 'RJ', tenantId: 't1', managerId: 'u3', managerName: 'Roberto Alves', whatsappNumber: '+55 21 98877-6655', activeConsultants: 8, monthlyLeads: 218, conversionRate: 19.8, status: 'warning', todayLeads: 15, todayConversion: 16.5, avgResponseTime: 8.4, activeChats: 3, weeklyTrend: [30, 28, 35, 32, 38, 29, 34], isActive: true, autoQualificationEnabled: true, autoResponseEnabled: true, businessHours: { seg: '9-18', ter: '9-18', qua: '9-18', qui: '9-18', sex: '9-18' }, brandId: 'b1', brandName: 'LC Imóveis' },
  { id: 'f3', name: 'LeadCapture BH Savassi', code: 'MG-001', city: 'Belo Horizonte', state: 'MG', tenantId: 't1', managerId: 'u4', managerName: 'Patricia Rocha', whatsappNumber: '+55 31 97766-5544', activeConsultants: 6, monthlyLeads: 156, conversionRate: 21.2, status: 'critical', todayLeads: 8, todayConversion: 12.5, avgResponseTime: 15.6, activeChats: 1, weeklyTrend: [22, 18, 25, 20, 28, 15, 12], isActive: true, autoQualificationEnabled: false, autoResponseEnabled: false, businessHours: { seg: '8-18', ter: '8-18', qua: '8-18', qui: '8-18', sex: '8-17' }, brandId: 'b2', brandName: 'LC Empresarial' },
  { id: 'f4', name: 'LeadCapture Curitiba', code: 'PR-001', city: 'Curitiba', state: 'PR', tenantId: 't1', managerId: 'u5', managerName: 'Juliana Martins', whatsappNumber: '+55 41 96655-4433', activeConsultants: 5, monthlyLeads: 124, conversionRate: 25.1, status: 'healthy', todayLeads: 18, todayConversion: 27.8, avgResponseTime: 2.8, activeChats: 4, weeklyTrend: [18, 22, 20, 24, 19, 26, 23], isActive: true, autoQualificationEnabled: true, autoResponseEnabled: true, businessHours: { seg: '9-18', ter: '9-18', qua: '9-18', qui: '9-18', sex: '9-18', sab: '9-12' }, brandId: 'b3', brandName: 'LC Popular' },
  { id: 'f5', name: 'LeadCapture Porto Alegre', code: 'RS-001', city: 'Porto Alegre', state: 'RS', tenantId: 't1', managerId: 'u6', managerName: 'Marcos Dias', whatsappNumber: '+55 51 95544-3322', activeConsultants: 4, monthlyLeads: 98, conversionRate: 18.9, status: 'warning', todayLeads: 10, todayConversion: 14.2, avgResponseTime: 11.3, activeChats: 2, weeklyTrend: [14, 12, 18, 15, 16, 11, 10], isActive: true, autoQualificationEnabled: true, autoResponseEnabled: false, businessHours: { seg: '9-18', ter: '9-18', qua: '9-18', qui: '9-18', sex: '9-17' }, brandId: 'b3', brandName: 'LC Popular' },
];

export const kpiData: KPIData[] = [
  { label: 'Leads Captados', value: 938, previousValue: 812, format: 'number', trend: 'up', icon: 'Users' },
  { label: 'Taxa de Conversão', value: 22.4, previousValue: 19.8, format: 'percentage', trend: 'up', icon: 'TrendingUp' },
  { label: 'Receita Mensal', value: 284500, previousValue: 245800, format: 'currency', trend: 'up', icon: 'DollarSign' },
  { label: 'Tempo de Resposta', value: 4.2, previousValue: 6.8, format: 'time', trend: 'down', icon: 'Clock' },
];

export const leads: Lead[] = [
  { id: 'l1', name: 'Maria Silva', email: 'maria@email.com', phone: '11999887766', source: 'whatsapp', sourceDetail: 'WhatsApp Direct', status: 'new', score: 85, temperature: 'quente', franchiseId: 'f1', consultantId: 'u1', consultantName: 'Carlos Mendes', channel: 'WhatsApp', brandId: 'b1', brandName: 'LC Imóveis', brandColor: '#6366f1', createdAt: '2025-01-15T10:30:00', updatedAt: '2025-01-15T10:30:00', lastInteraction: '2025-01-15T11:00:00', tags: ['premium', 'urgente'], value: 15000, interest: 'Plano Empresarial', notes: 'Interessada em plano para equipe de 20 pessoas', customFields: { cidade: 'São Paulo', empresa: 'Tech Corp' }, utmSource: 'whatsapp', utmMedium: 'organic', utmCampaign: 'jan2025' },
  { id: 'l2', name: 'João Santos', email: 'joao@email.com', phone: '21988776655', source: 'website', sourceDetail: 'Landing Page Premium', status: 'qualified', score: 72, temperature: 'morno', franchiseId: 'f1', consultantId: 'u2', consultantName: 'Ana Costa', channel: 'Website', brandId: 'b2', brandName: 'LC Empresarial', brandColor: '#f59e0b', createdAt: '2025-01-14T14:20:00', updatedAt: '2025-01-15T09:00:00', lastInteraction: '2025-01-15T09:00:00', tags: ['corporativo'], value: 28000, interest: 'Consultoria', customFields: { cidade: 'Rio de Janeiro', empresa: 'Santos & Filhos' }, utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand-search' },
  { id: 'l3', name: 'Fernanda Lima', email: 'fernanda@email.com', phone: '31977665544', source: 'chatbot', sourceDetail: 'Chatbot Widget Site', status: 'contacted', score: 68, temperature: 'morno', franchiseId: 'f2', consultantId: 'u3', consultantName: 'Roberto Alves', channel: 'Chatbot', brandId: 'b1', brandName: 'LC Imóveis', brandColor: '#6366f1', createdAt: '2025-01-14T16:45:00', updatedAt: '2025-01-14T17:30:00', tags: ['interessado'], value: 8500, interest: 'Plano Starter', notes: 'Perguntou sobre preços no chatbot', utmSource: 'website', utmMedium: 'organic' },
  { id: 'l4', name: 'Ricardo Oliveira', email: 'ricardo@email.com', phone: '41966554433', source: 'instagram', sourceDetail: 'Instagram Stories Ad', status: 'proposal', score: 91, temperature: 'quente', franchiseId: 'f1', consultantId: 'u1', consultantName: 'Carlos Mendes', channel: 'Instagram', brandId: 'b2', brandName: 'LC Empresarial', brandColor: '#f59e0b', createdAt: '2025-01-13T09:15:00', updatedAt: '2025-01-15T08:00:00', lastInteraction: '2025-01-15T08:00:00', tags: ['alto-valor', 'decisor'], value: 45000, interest: 'Plano Enterprise', customFields: { cidade: 'Curitiba', empresa: 'Oliveira Group', cargo: 'CEO' }, utmSource: 'instagram', utmMedium: 'paid', utmCampaign: 'enterprise-q1' },
  { id: 'l5', name: 'Camila Souza', email: 'camila@email.com', phone: '51955443322', source: 'n8n', sourceDetail: 'n8n Workflow: CRM Sync', status: 'negotiation', score: 95, temperature: 'quente', franchiseId: 'f3', consultantId: 'u4', consultantName: 'Patricia Rocha', channel: 'n8n Workflow', brandId: 'b2', brandName: 'LC Empresarial', brandColor: '#f59e0b', createdAt: '2025-01-12T11:30:00', updatedAt: '2025-01-15T07:00:00', lastInteraction: '2025-01-15T07:00:00', tags: ['vip', 'fechamento'], value: 62000, interest: 'Plano Enterprise', notes: 'Negociação avançada, aguardando aprovação jurídica', utmSource: 'n8n', utmMedium: 'api' },
  { id: 'l6', name: 'Pedro Almeida', email: 'pedro@email.com', phone: '11944332211', source: 'whatsapp', sourceDetail: 'WhatsApp QR Code', status: 'closed_won', score: 98, temperature: 'quente', franchiseId: 'f1', consultantId: 'u2', consultantName: 'Ana Costa', channel: 'WhatsApp', brandId: 'b1', brandName: 'LC Imóveis', brandColor: '#6366f1', createdAt: '2025-01-10T08:00:00', updatedAt: '2025-01-14T16:00:00', lastInteraction: '2025-01-14T16:00:00', convertedAt: '2025-01-14T16:00:00', tags: ['fechado', 'premium'], value: 38000, interest: 'Plano Professional', utmSource: 'whatsapp', utmMedium: 'qrcode' },
  { id: 'l7', name: 'Luciana Ferreira', email: 'luciana@email.com', phone: '21933221100', source: 'facebook', sourceDetail: 'Facebook Lead Form', status: 'new', score: 45, temperature: 'frio', franchiseId: 'f2', consultantId: 'u3', consultantName: 'Roberto Alves', channel: 'Facebook', brandId: 'b1', brandName: 'LC Imóveis', brandColor: '#6366f1', createdAt: '2025-01-15T12:00:00', updatedAt: '2025-01-15T12:00:00', tags: ['novo'], value: 5000, interest: 'Informações gerais', utmSource: 'facebook', utmMedium: 'paid', utmCampaign: 'awareness-q1' },
  { id: 'l8', name: 'Marcos Pereira', email: 'marcos@email.com', phone: '31922110099', source: 'referral', sourceDetail: 'Indicação: Juliana Martins', status: 'qualified', score: 78, temperature: 'quente', franchiseId: 'f4', consultantId: 'u5', consultantName: 'Juliana Martins', channel: 'Indicação', brandId: 'b3', brandName: 'LC Popular', brandColor: '#10b981', createdAt: '2025-01-13T15:30:00', updatedAt: '2025-01-15T10:00:00', lastInteraction: '2025-01-15T10:00:00', tags: ['indicação', 'quente'], value: 22000, interest: 'Plano Professional' },
  { id: 'l9', name: 'Beatriz Cardoso', email: 'beatriz@email.com', phone: '41911009988', source: 'whatsapp', sourceDetail: 'WhatsApp Link Site', status: 'contacted', score: 62, temperature: 'morno', franchiseId: 'f1', consultantId: 'u1', consultantName: 'Carlos Mendes', channel: 'WhatsApp', brandId: 'b3', brandName: 'LC Popular', brandColor: '#10b981', createdAt: '2025-01-14T13:00:00', updatedAt: '2025-01-15T11:00:00', lastInteraction: '2025-01-15T11:00:00', tags: ['retorno'], value: 12000, interest: 'Plano Starter', utmSource: 'website', utmMedium: 'organic' },
  { id: 'l10', name: 'Thiago Ribeiro', email: 'thiago@email.com', phone: '51900998877', source: 'chatbot', sourceDetail: 'Chatbot WhatsApp', status: 'closed_lost', score: 35, temperature: 'frio', franchiseId: 'f5', consultantId: 'u6', consultantName: 'Marcos Dias', channel: 'Chatbot', brandId: 'b3', brandName: 'LC Popular', brandColor: '#10b981', createdAt: '2025-01-08T10:00:00', updatedAt: '2025-01-12T14:00:00', lastInteraction: '2025-01-12T14:00:00', tags: ['perdido', 'sem-orçamento'], value: 0, interest: 'Plano Starter', notes: 'Sem orçamento disponível no momento' },
  { id: 'l11', name: 'Ana Paula Gomes', email: 'anapaula@email.com', phone: '11977665544', source: 'csv_import', sourceDetail: 'Importação CSV Jan/2025', status: 'new', score: 55, temperature: 'frio', franchiseId: 'f1', consultantId: 'u1', consultantName: 'Carlos Mendes', channel: 'Importação CSV', brandId: 'b1', brandName: 'LC Imóveis', brandColor: '#6366f1', createdAt: '2025-01-15T14:00:00', updatedAt: '2025-01-15T14:00:00', tags: ['importado', 'csv'], value: 8000, interest: 'Plano Starter', customFields: { cidade: 'São Paulo', empresa: 'Gomes Tech' } },
  { id: 'l12', name: 'Roberto Costa Lima', email: 'roberto.lima@email.com', phone: '21966554433', source: 'webhook', sourceDetail: 'API: HubSpot Integration', status: 'qualified', score: 82, temperature: 'quente', franchiseId: 'f2', consultantId: 'u3', consultantName: 'Roberto Alves', channel: 'API Webhook', brandId: 'b2', brandName: 'LC Empresarial', brandColor: '#f59e0b', createdAt: '2025-01-15T13:30:00', updatedAt: '2025-01-15T13:45:00', tags: ['api', 'hot'], value: 35000, interest: 'Plano Enterprise', customFields: { cidade: 'Rio de Janeiro', empresa: 'Lima Corp', cargo: 'CTO' }, utmSource: 'hubspot', utmMedium: 'api' },
];

export const rankings: RankingEntry[] = [
  { position: 1, consultantId: 'u1', consultantName: 'Carlos Mendes', franchiseName: 'SP Centro', leadsCaptured: 87, leadsConverted: 24, conversionRate: 27.6, revenue: 186500, score: 98, trend: 'up', trendValue: 12 },
  { position: 2, consultantId: 'u2', consultantName: 'Ana Costa', franchiseName: 'SP Centro', leadsCaptured: 76, leadsConverted: 21, conversionRate: 27.6, revenue: 158200, score: 94, trend: 'up', trendValue: 8 },
  { position: 3, consultantId: 'u4', consultantName: 'Patricia Rocha', franchiseName: 'BH Savassi', leadsCaptured: 68, leadsConverted: 18, conversionRate: 26.5, revenue: 142800, score: 89, trend: 'up', trendValue: 5 },
  { position: 4, consultantId: 'u3', consultantName: 'Roberto Alves', franchiseName: 'RJ Zona Sul', leadsCaptured: 62, leadsConverted: 14, conversionRate: 22.6, revenue: 98400, score: 82, trend: 'stable', trendValue: 0 },
  { position: 5, consultantId: 'u5', consultantName: 'Juliana Martins', franchiseName: 'Curitiba', leadsCaptured: 54, leadsConverted: 16, conversionRate: 29.6, revenue: 89600, score: 78, trend: 'up', trendValue: 3 },
  { position: 6, consultantId: 'u7', consultantName: 'Lucas Barbosa', franchiseName: 'SP Centro', leadsCaptured: 48, leadsConverted: 11, conversionRate: 22.9, revenue: 72400, score: 72, trend: 'down', trendValue: -4 },
  { position: 7, consultantId: 'u6', consultantName: 'Marcos Dias', franchiseName: 'Porto Alegre', leadsCaptured: 42, leadsConverted: 9, conversionRate: 21.4, revenue: 58900, score: 65, trend: 'down', trendValue: -7 },
  { position: 8, consultantId: 'u8', consultantName: 'Fernanda Nunes', franchiseName: 'RJ Zona Sul', leadsCaptured: 38, leadsConverted: 10, conversionRate: 26.3, revenue: 54200, score: 61, trend: 'up', trendValue: 2 },
];

export const channelMetrics: ChannelMetrics[] = [
  { channel: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', leads: 342, conversion: 24.8, revenue: 124500, growth: 18.5, color: '#25D366', status: 'active', type: 'organic' },
  { channel: 'website', label: 'Formulário Web', icon: 'Globe', leads: 218, conversion: 19.2, revenue: 89600, growth: 12.3, color: '#6366f1', status: 'active', type: 'organic' },
  { channel: 'chatbot', label: 'Chatbot', icon: 'Bot', leads: 156, conversion: 21.5, revenue: 52300, growth: 45.2, color: '#f59e0b', status: 'active', type: 'organic' },
  { channel: 'n8n', label: 'n8n Workflows', icon: 'Workflow', leads: 98, conversion: 28.9, revenue: 48200, growth: 67.8, color: '#ea580c', status: 'active', type: 'organic' },
  { channel: 'webhook', label: 'API / Webhook', icon: 'Webhook', leads: 87, conversion: 31.2, revenue: 42100, growth: 52.1, color: '#8b5cf6', status: 'active', type: 'organic' },
  { channel: 'csv_import', label: 'Importação CSV', icon: 'FileUp', leads: 64, conversion: 14.5, revenue: 18600, growth: 8.9, color: '#06b6d4', status: 'active', type: 'organic' },
  { channel: 'instagram', label: 'Instagram', icon: 'Instagram', leads: 74, conversion: 15.4, revenue: 28900, growth: 8.7, color: '#E1306C', status: 'active', type: 'paid' },
  { channel: 'facebook', label: 'Facebook', icon: 'Facebook', leads: 32, conversion: 12.1, revenue: 12400, growth: -3.2, color: '#1877F2', status: 'paused', type: 'paid' },
  { channel: 'referral', label: 'Indicações', icon: 'UserPlus', leads: 18, conversion: 42.3, revenue: 38600, growth: 22.1, color: '#10b981', status: 'active', type: 'referral' },
];

export const whatsappInstances: WhatsAppInstance[] = [
  { id: 'wi1', instanceName: 'sp-centro-principal', instanceKey: 'ev_sp001_key', phone: '+55 11 99988-7766', status: 'connected', franchiseId: 'f1', franchiseName: 'SP Centro', lastConnectedAt: '2025-01-15T12:00:00', webhookUrl: 'https://api.leadcapture.pro/webhooks/whatsapp/wi1', settings: { autoReply: true, businessHours: true }, messagesToday: 87 },
  { id: 'wi2', instanceName: 'rj-zona-sul', instanceKey: 'ev_rj001_key', phone: '+55 21 98877-6655', status: 'connected', franchiseId: 'f2', franchiseName: 'RJ Zona Sul', lastConnectedAt: '2025-01-15T11:55:00', webhookUrl: 'https://api.leadcapture.pro/webhooks/whatsapp/wi2', settings: { autoReply: true, businessHours: true }, messagesToday: 54 },
  { id: 'wi3', instanceName: 'bh-savassi', instanceKey: 'ev_mg001_key', phone: '+55 31 97766-5544', status: 'disconnected', franchiseId: 'f3', franchiseName: 'BH Savassi', lastConnectedAt: '2025-01-14T18:00:00', webhookUrl: 'https://api.leadcapture.pro/webhooks/whatsapp/wi3', settings: { autoReply: false, businessHours: true }, messagesToday: 0 },
  { id: 'wi4', instanceName: 'curitiba-pr', instanceKey: 'ev_pr001_key', phone: '+55 41 96655-4433', status: 'connected', franchiseId: 'f4', franchiseName: 'Curitiba', lastConnectedAt: '2025-01-15T11:50:00', webhookUrl: 'https://api.leadcapture.pro/webhooks/whatsapp/wi4', settings: { autoReply: true, businessHours: true }, messagesToday: 32 },
  { id: 'wi5', instanceName: 'porto-alegre-rs', instanceKey: 'ev_rs001_key', phone: '+55 51 95544-3322', status: 'connecting', franchiseId: 'f5', franchiseName: 'Porto Alegre', lastConnectedAt: '2025-01-15T10:00:00', webhookUrl: 'https://api.leadcapture.pro/webhooks/whatsapp/wi5', settings: { autoReply: false, businessHours: false }, messagesToday: 5 },
];

export const automationRules: AutomationRule[] = [
  { id: 'ar1', name: 'Auto-resposta WhatsApp', description: 'Envia mensagem de boas-vindas quando uma nova mensagem é recebida via WhatsApp', triggerEvent: 'message.received', conditions: [{ id: 'c1', field: 'source', operator: 'equals', value: 'whatsapp' }], actions: [{ id: 'a1', type: 'send_whatsapp', value: 'boas_vindas', template: 'boas_vindas', params: { delay: 0 } }], priority: 1, active: true, executions: 1243, lastExecution: '2025-01-15T12:00:00', createdAt: '2025-01-01T00:00:00', updatedAt: '2025-01-15T12:00:00' },
  { id: 'ar2', name: 'Qualificação automática', description: 'Qualifica leads com score alto e notifica o consultor responsável', triggerEvent: 'lead.created', conditions: [{ id: 'c2', field: 'score', operator: 'greater_than', value: '80' }], actions: [{ id: 'a2', type: 'set_status', value: 'qualified' }, { id: 'a3', type: 'assign_to', value: 'vendedor_senior' }, { id: 'a4', type: 'send_notification', value: 'lead_quente', template: 'lead_quente' }], priority: 1, active: true, franchiseId: undefined, executions: 89, lastExecution: '2025-01-15T11:30:00', createdAt: '2025-01-02T00:00:00', updatedAt: '2025-01-15T11:30:00' },
  { id: 'ar3', name: 'Follow-up 24h', description: 'Envia follow-up automático quando um lead fica 24h sem interação', triggerEvent: 'lead.created', conditions: [{ id: 'c3', field: 'last_interaction', operator: 'less_than', value: '-24h' }], actions: [{ id: 'a5', type: 'send_whatsapp', value: 'followup_24h', template: 'followup_24h' }, { id: 'a6', type: 'add_tag', value: 'follow-up-24h' }], priority: 3, active: true, executions: 456, lastExecution: '2025-01-15T10:00:00', createdAt: '2025-01-03T00:00:00', updatedAt: '2025-01-15T10:00:00' },
  { id: 'ar4', name: 'Integrar n8n - CRM', description: 'Sincroniza leads qualificados com CRM externo via n8n workflow', triggerEvent: 'lead.created', conditions: [{ id: 'c4', field: 'status', operator: 'equals', value: 'qualified' }, { id: 'c5', field: 'score', operator: 'greater_than', value: '60' }], actions: [{ id: 'a7', type: 'trigger_webhook', value: 'https://n8n.leadcapture.pro/webhook/crm-sync' }, { id: 'a8', type: 'add_tag', value: 'synced-crm' }], priority: 2, active: true, franchiseId: undefined, executions: 234, lastExecution: '2025-01-15T09:45:00', createdAt: '2025-01-04T00:00:00', updatedAt: '2025-01-15T09:45:00' },
  { id: 'ar5', name: 'Relatório semanal', description: 'Gera e envia relatório de performance toda segunda-feira às 8h', triggerEvent: 'schedule.weekly', conditions: [], actions: [{ id: 'a9', type: 'send_notification', value: 'relatorio_semanal', template: 'relatorio_semanal' }], priority: 5, active: false, franchiseId: undefined, executions: 12, lastExecution: '2025-01-13T08:00:00', createdAt: '2025-01-05T00:00:00', updatedAt: '2025-01-13T08:00:00' },
  { id: 'ar6', name: 'Distribuição automática', description: 'Distribui leads automaticamente entre consultores com menor carga', triggerEvent: 'lead.created', conditions: [{ id: 'c6', field: 'assigned_to', operator: 'is_empty', value: '' }], actions: [{ id: 'a10', type: 'assign_to', value: 'round_robin' }], priority: 2, active: true, franchiseId: 'f1', executions: 567, lastExecution: '2025-01-15T11:00:00', createdAt: '2025-01-06T00:00:00', updatedAt: '2025-01-15T11:00:00' },
  { id: 'ar7', name: 'Alerta anomalia', description: 'Notifica gestor quando conversão cai abaixo de 10% por 3 dias consecutivos', triggerEvent: 'schedule.daily', conditions: [{ id: 'c7', field: 'conversion_rate', operator: 'less_than', value: '10' }], actions: [{ id: 'a11', type: 'send_notification', value: 'anomalia_conversao', template: 'alerta_anomalia' }], priority: 1, active: true, franchiseId: undefined, executions: 8, lastExecution: '2025-01-14T16:00:00', createdAt: '2025-01-07T00:00:00', updatedAt: '2025-01-14T16:00:00' },
];

export const workflowTemplates: WorkflowTemplate[] = [
  { id: 'wt1', name: 'Onboarding WhatsApp', category: 'onboarding', isActive: true, description: 'Fluxo completo de boas-vindas para novos leads via WhatsApp', steps: [{ id: 's1', type: 'delay', params: { minutes: 0 } }, { id: 's2', type: 'send_whatsapp', params: { template: 'boas_vindas' } }, { id: 's3', type: 'delay', params: { minutes: 30 } }, { id: 's4', type: 'condition', params: { field: 'replied', operator: 'equals', value: 'false' } }, { id: 's5', type: 'send_whatsapp', params: { template: 'followup_30min' } }] },
  { id: 'wt2', name: 'Follow-up 24h', category: 'followup', isActive: true, description: 'Follow-up automático após 24h sem resposta', steps: [{ id: 's6', type: 'delay', params: { hours: 24 } }, { id: 's7', type: 'condition', params: { field: 'last_interaction', operator: 'greater_than', value: '24h' } }, { id: 's8', type: 'send_whatsapp', params: { template: 'followup_24h' } }, { id: 's9', type: 'add_tag', params: { tag: 'follow-up-24h' } }] },
  { id: 'wt3', name: 'Recuperação de Leads', category: 'recovery', isActive: true, description: 'Tenta recuperar leads perdidos após 30 dias', steps: [{ id: 's10', type: 'delay', params: { days: 30 } }, { id: 's11', type: 'condition', params: { field: 'status', operator: 'equals', value: 'closed_lost' } }, { id: 's12', type: 'send_whatsapp', params: { template: 'reengajamento_30d' } }, { id: 's13', type: 'change_status', params: { status: 'contacted' } }, { id: 's14', type: 'add_tag', params: { tag: 'reengajamento' } }] },
  { id: 'wt4', name: 'Qualificação Progressiva', category: 'qualification', isActive: false, description: 'Série de perguntas automáticas para qualificar o lead', steps: [{ id: 's15', type: 'send_whatsapp', params: { template: 'pergunta_interesse' } }, { id: 's16', type: 'delay', params: { minutes: 5 } }, { id: 's17', type: 'condition', params: { field: 'replied', operator: 'equals', value: 'true' } }, { id: 's18', type: 'send_whatsapp', params: { template: 'pergunta_orcamento' } }, { id: 's19', type: 'change_status', params: { status: 'qualified' } }] },
  { id: 'wt5', name: 'Notificação Equipe', category: 'notification', isActive: true, description: 'Notifica a equipe de vendas sobre leads quentes', steps: [{ id: 's20', type: 'condition', params: { field: 'score', operator: 'greater_than', value: '80' } }, { id: 's21', type: 'assign_to', params: { strategy: 'round_robin' } }, { id: 's22', type: 'send_notification', params: { template: 'lead_quente', channel: 'slack' } }, { id: 's23', type: 'add_tag', params: { tag: 'hot-lead' } }] },
];

export const qualificationRules: QualificationRule[] = [
  {
    id: 'qr1', name: 'Lead Quente WhatsApp', description: 'Leads do WhatsApp com intenção de compra', active: true, priority: 1, executions: 234,
    conditions: [
      { id: 'c1', field: 'origem', operator: 'equals', value: 'whatsapp', logicOperator: 'AND' },
      { id: 'c2', field: 'mensagem', operator: 'contains', value: 'quero comprar', logicOperator: 'AND' },
      { id: 'c3', field: 'score', operator: 'greater_than', value: '70' },
    ],
    actions: [
      { id: 'a1', type: 'set_status', value: 'qualified' },
      { id: 'a2', type: 'assign_to', value: 'vendedor_senior' },
      { id: 'a3', type: 'send_notification', value: 'lead_quente', template: 'lead_quente_whatsapp' },
    ],
    lastExecution: '2025-01-15T11:30:00', createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'qr2', name: 'Lead Frio - Follow-up', description: 'Leads com baixo score que precisam de acompanhamento', active: true, priority: 3, executions: 89,
    conditions: [
      { id: 'c4', field: 'score', operator: 'less_than', value: '40', logicOperator: 'AND' },
      { id: 'c5', field: 'status', operator: 'equals', value: 'new' },
    ],
    actions: [
      { id: 'a4', type: 'schedule_followup', value: '24h', delay: 24 },
      { id: 'a5', type: 'send_whatsapp', value: 'template_followup_frio', template: 'followup_frio' },
      { id: 'a6', type: 'add_tag', value: 'follow-up-necessário' },
    ],
    lastExecution: '2025-01-15T10:00:00', createdAt: '2025-01-02T00:00:00',
  },
  {
    id: 'qr3', name: 'VIP Enterprise', description: 'Leads de alto valor para tratamento prioritário', active: true, priority: 1, executions: 45,
    conditions: [
      { id: 'c6', field: 'valor_estimado', operator: 'greater_than', value: '30000', logicOperator: 'AND' },
      { id: 'c7', field: 'interesse', operator: 'equals', value: 'Plano Enterprise' },
    ],
    actions: [
      { id: 'a7', type: 'set_status', value: 'qualified' },
      { id: 'a8', type: 'change_score', value: '+20' },
      { id: 'a9', type: 'assign_to', value: 'diretor_vendas' },
      { id: 'a10', type: 'send_notification', value: 'vip_enterprise', template: 'vip_alert' },
      { id: 'a11', type: 'trigger_n8n', value: 'workflow_vip_onboarding' },
    ],
    lastExecution: '2025-01-15T08:00:00', createdAt: '2025-01-03T00:00:00',
  },
  {
    id: 'qr4', name: 'Lead Perdido - Reengajamento', description: 'Tentar recuperar leads perdidos após 30 dias', active: false, priority: 5, executions: 12,
    conditions: [
      { id: 'c8', field: 'status', operator: 'equals', value: 'closed_lost', logicOperator: 'AND' },
      { id: 'c9', field: 'updated_at', operator: 'less_than', value: '-30d' },
    ],
    actions: [
      { id: 'a12', type: 'send_whatsapp', value: 'template_reengajamento', template: 'reengajamento_30d' },
      { id: 'a13', type: 'set_status', value: 'contacted' },
      { id: 'a14', type: 'add_tag', value: 'reengajamento' },
    ],
    lastExecution: '2025-01-10T14:00:00', createdAt: '2025-01-05T00:00:00',
  },
  {
    id: 'qr5', name: 'Webhook Externo - CRM Sync', description: 'Sincronizar leads qualificados com CRM externo', active: true, priority: 2, executions: 178,
    conditions: [
      { id: 'c10', field: 'status', operator: 'equals', value: 'qualified', logicOperator: 'AND' },
      { id: 'c11', field: 'score', operator: 'greater_than', value: '60' },
    ],
    actions: [
      { id: 'a15', type: 'trigger_webhook', value: 'https://crm.empresa.com/api/leads' },
      { id: 'a16', type: 'add_tag', value: 'synced-crm' },
    ],
    lastExecution: '2025-01-15T11:45:00', createdAt: '2025-01-04T00:00:00',
  },
];

export const customFields: CustomField[] = [
  { id: 'cf1', name: 'cidade', label: 'Cidade', type: 'text', required: false, tenantId: 't1' },
  { id: 'cf2', name: 'empresa', label: 'Empresa', type: 'text', required: false, tenantId: 't1' },
  { id: 'cf3', name: 'cargo', label: 'Cargo', type: 'select', required: false, options: ['CEO', 'CTO', 'Diretor', 'Gerente', 'Coordenador', 'Analista', 'Outro'], tenantId: 't1' },
  { id: 'cf4', name: 'num_funcionarios', label: 'Nº Funcionários', type: 'number', required: false, tenantId: 't1' },
  { id: 'cf5', name: 'data_nascimento', label: 'Data de Nascimento', type: 'date', required: false, tenantId: 't1' },
  { id: 'cf6', name: 'aceita_lgpd', label: 'Aceita LGPD', type: 'boolean', required: true, tenantId: 't1' },
];

export const anomalyAlerts: AnomalyAlert[] = [
  { id: 'aa1', type: 'slow_response', severity: 'high', franchiseId: 'f3', franchiseName: 'BH Savassi', message: 'Tempo de resposta acima de 15 minutos — 3x o limite aceitável', metric: 'Tempo de Resposta', currentValue: 15.6, expectedValue: 5.0, timestamp: '2025-01-15T11:30:00', resolved: false },
  { id: 'aa2', type: 'drop_leads', severity: 'medium', franchiseId: 'f3', franchiseName: 'BH Savassi', message: 'Queda de 52% na captação de leads nos últimos 3 dias', metric: 'Leads/Dia', currentValue: 8, expectedValue: 17, timestamp: '2025-01-15T10:00:00', resolved: false },
  { id: 'aa3', type: 'instance_down', severity: 'critical', franchiseId: 'f3', franchiseName: 'BH Savassi', message: 'Instância WhatsApp desconectada há 18 horas', metric: 'WhatsApp Status', currentValue: 0, expectedValue: 1, timestamp: '2025-01-14T18:00:00', resolved: false },
  { id: 'aa4', type: 'low_conversion', severity: 'medium', franchiseId: 'f2', franchiseName: 'RJ Zona Sul', message: 'Taxa de conversão abaixo de 17% pela 2ª semana consecutiva', metric: 'Taxa de Conversão', currentValue: 16.5, expectedValue: 22.0, timestamp: '2025-01-15T09:00:00', resolved: false },
  { id: 'aa5', type: 'slow_response', severity: 'low', franchiseId: 'f5', franchiseName: 'Porto Alegre', message: 'Tempo de resposta acima de 10 minutos', metric: 'Tempo de Resposta', currentValue: 11.3, expectedValue: 5.0, timestamp: '2025-01-15T08:00:00', resolved: false },
  { id: 'aa6', type: 'high_churn', severity: 'low', franchiseId: 'f5', franchiseName: 'Porto Alegre', message: 'Aumento de 15% em leads perdidos este mês', metric: 'Churn Rate', currentValue: 28.5, expectedValue: 20.0, timestamp: '2025-01-14T16:00:00', resolved: true },
];

export const monitoringEvents: MonitoringEvent[] = [
  { id: 'me1', type: 'lead_captured', description: 'Novo lead capturado: Maria Silva via WhatsApp', franchiseName: 'SP Centro', timestamp: '2025-01-15T12:05:00', metadata: { source: 'whatsapp', score: '85' } },
  { id: 'me2', type: 'lead_converted', description: 'Venda fechada: Pedro Almeida — R$ 38.000', franchiseName: 'SP Centro', timestamp: '2025-01-15T11:58:00', metadata: { value: '38000', consultant: 'Ana Costa' } },
  { id: 'me3', type: 'message_received', description: 'Mensagem recebida de +55 21 98877-6655', franchiseName: 'RJ Zona Sul', timestamp: '2025-01-15T11:45:00', metadata: { channel: 'whatsapp' } },
  { id: 'me4', type: 'workflow_triggered', description: 'Workflow "Qualificação automática" executado', franchiseName: 'SP Centro', timestamp: '2025-01-15T11:30:00', metadata: { rule: 'qr1' } },
  { id: 'me5', type: 'anomaly_detected', description: '⚠️ Anomalia: Tempo de resposta BH acima do limite', franchiseName: 'BH Savassi', timestamp: '2025-01-15T11:30:00', metadata: { severity: 'high' } },
  { id: 'me6', type: 'lead_qualified', description: 'Lead qualificado: Ricardo Oliveira (score 91)', franchiseName: 'SP Centro', timestamp: '2025-01-15T11:15:00', metadata: { score: '91' } },
  { id: 'me7', type: 'lead_captured', description: 'Lead capturado via API Webhook: Roberto Costa Lima', franchiseName: 'RJ Zona Sul', timestamp: '2025-01-15T11:00:00', metadata: { source: 'webhook' } },
  { id: 'me8', type: 'workflow_triggered', description: 'Workflow "Distribuição automática" executado', franchiseName: 'SP Centro', timestamp: '2025-01-15T10:45:00', metadata: { rule: 'ar6' } },
  { id: 'me9', type: 'instance_status_change', description: 'Instância WhatsApp "Porto Alegre" reconectando...', franchiseName: 'Porto Alegre', timestamp: '2025-01-15T10:30:00', metadata: { status: 'connecting' } },
  { id: 'me10', type: 'lead_captured', description: '5 leads importados via CSV — Curitiba', franchiseName: 'Curitiba', timestamp: '2025-01-15T10:15:00', metadata: { source: 'csv_import', count: '5' } },
  { id: 'me11', type: 'lead_qualified', description: 'Lead qualificado via chatbot: Fernanda Lima', franchiseName: 'RJ Zona Sul', timestamp: '2025-01-15T10:00:00', metadata: { source: 'chatbot' } },
  { id: 'me12', type: 'anomaly_detected', description: '⚠️ Anomalia: Queda de leads em BH Savassi', franchiseName: 'BH Savassi', timestamp: '2025-01-15T09:30:00', metadata: { severity: 'medium' } },
  { id: 'me13', type: 'lead_converted', description: 'Venda fechada: Camila Souza — R$ 62.000', franchiseName: 'BH Savassi', timestamp: '2025-01-15T09:00:00', metadata: { value: '62000' } },
  { id: 'me14', type: 'workflow_triggered', description: 'n8n Workflow "CRM Sync" executado com sucesso', franchiseName: 'SP Centro', timestamp: '2025-01-15T08:45:00', metadata: { rule: 'qr5' } },
  { id: 'me15', type: 'message_received', description: '3 mensagens WhatsApp recebidas simultaneamente', franchiseName: 'Curitiba', timestamp: '2025-01-15T08:30:00', metadata: { channel: 'whatsapp', count: '3' } },
];

export const webhookConfigs: WebhookConfig[] = [
  { id: 'wh1', name: 'CRM Externo', url: 'https://crm.empresa.com/api/leads', method: 'POST', headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' }, active: true, lastTriggered: '2025-01-15T11:45:00', successRate: 98.5, totalCalls: 178 },
  { id: 'wh2', name: 'n8n Qualificação', url: 'https://n8n.leadcapture.pro/webhook/qualify', method: 'POST', headers: { 'X-Webhook-Secret': '***' }, active: true, lastTriggered: '2025-01-15T11:30:00', successRate: 99.2, totalCalls: 234 },
  { id: 'wh3', name: 'Slack Notificações', url: 'https://hooks.slack.com/services/T***/B***/***', method: 'POST', headers: { 'Content-Type': 'application/json' }, active: true, lastTriggered: '2025-01-15T10:00:00', successRate: 100, totalCalls: 89 },
  { id: 'wh4', name: 'Google Sheets Sync', url: 'https://n8n.leadcapture.pro/webhook/sheets', method: 'POST', headers: { 'Authorization': 'Bearer ***' }, active: false, lastTriggered: '2025-01-10T08:00:00', successRate: 95.0, totalCalls: 45 },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Novo lead VIP', message: 'Ricardo Oliveira (score 91) aguardando contato', type: 'warning', userId: 'u1', isRead: false, createdAt: '2025-01-15T12:05:00' },
  { id: 'n2', title: 'Venda fechada!', message: 'Ana Costa fechou negócio de R$ 38.000', type: 'success', userId: 'u1', isRead: false, createdAt: '2025-01-15T11:30:00' },
  { id: 'n3', title: 'Instância desconectada', message: 'BH Savassi - WhatsApp desconectado há 18h', type: 'error', userId: 'u1', isRead: false, createdAt: '2025-01-15T10:00:00' },
  { id: 'n4', title: 'Meta atingida', message: 'SP Centro atingiu 100% da meta mensal', type: 'success', userId: 'u1', isRead: true, createdAt: '2025-01-15T09:00:00' },
  { id: 'n5', title: 'n8n Workflow atualizado', message: 'Workflow de qualificação atualizado com sucesso', type: 'info', userId: 'u1', isRead: true, createdAt: '2025-01-14T16:00:00' },
  { id: 'n6', title: 'Anomalia detectada', message: 'Queda de 52% na captação em BH Savassi', type: 'error', userId: 'u1', isRead: false, createdAt: '2025-01-15T11:30:00' },
  { id: 'n7', title: 'CSV Importado', message: '5 leads importados com sucesso via CSV', type: 'info', userId: 'u1', isRead: true, createdAt: '2025-01-15T10:15:00' },
];

export const leadTimeSeriesData = [
  { date: '01/Jan', leads: 42, converted: 8, revenue: 28400 },
  { date: '02/Jan', leads: 38, converted: 7, revenue: 24200 },
  { date: '03/Jan', leads: 55, converted: 12, revenue: 42600 },
  { date: '04/Jan', leads: 48, converted: 10, revenue: 35800 },
  { date: '05/Jan', leads: 62, converted: 14, revenue: 52100 },
  { date: '06/Jan', leads: 45, converted: 9, revenue: 31400 },
  { date: '07/Jan', leads: 58, converted: 13, revenue: 46200 },
  { date: '08/Jan', leads: 71, converted: 16, revenue: 58900 },
  { date: '09/Jan', leads: 65, converted: 15, revenue: 53200 },
  { date: '10/Jan', leads: 78, converted: 18, revenue: 64800 },
  { date: '11/Jan', leads: 82, converted: 19, revenue: 71200 },
  { date: '12/Jan', leads: 69, converted: 16, revenue: 55600 },
  { date: '13/Jan', leads: 74, converted: 17, revenue: 61400 },
  { date: '14/Jan', leads: 88, converted: 21, revenue: 78500 },
  { date: '15/Jan', leads: 65, converted: 15, revenue: 54300 },
];

export const funnelData = [
  { stage: 'Leads Captados', value: 938, percentage: 100 },
  { stage: 'Contatados', value: 712, percentage: 75.9 },
  { stage: 'Qualificados', value: 428, percentage: 45.6 },
  { stage: 'Proposta', value: 215, percentage: 22.9 },
  { stage: 'Negociação', value: 142, percentage: 15.1 },
  { stage: 'Fechados', value: 98, percentage: 10.4 },
];

export const recentActivities = [
  { id: 'a1', type: 'lead_new', description: 'Novo lead: Maria Silva via WhatsApp', time: '2 min atrás', franchise: 'SP Centro' },
  { id: 'a2', type: 'lead_converted', description: 'Venda fechada: Pedro Almeida R$ 38.000', time: '15 min atrás', franchise: 'SP Centro' },
  { id: 'a3', type: 'whatsapp_message', description: 'Mensagem recebida de +55 21 98877-6655', time: '22 min atrás', franchise: 'RJ Zona Sul' },
  { id: 'a4', type: 'automation', description: 'Auto-resposta enviada para 3 leads', time: '30 min atrás', franchise: 'SP Centro' },
  { id: 'a5', type: 'n8n_workflow', description: 'Workflow n8n executado: Qualificação automática', time: '45 min atrás', franchise: 'BH Savassi' },
  { id: 'a6', type: 'lead_qualified', description: 'Lead qualificado: Ricardo Oliveira (score 91)', time: '1h atrás', franchise: 'SP Centro' },
  { id: 'a7', type: 'chatbot', description: 'Chatbot capturou 5 novos leads', time: '1h atrás', franchise: 'Curitiba' },
  { id: 'a8', type: 'ranking_update', description: 'Carlos Mendes subiu para #1 no ranking', time: '2h atrás', franchise: 'SP Centro' },
];

export const scheduledMessages: ScheduledMessage[] = [
  { id: 'sm1', leadId: 'l1', leadName: 'Maria Silva', instanceId: 'wi1', messageContent: 'Olá Maria! Como posso ajudar com seu interesse no Plano Empresarial?', scheduledFor: '2025-01-15T14:00:00', status: 'pending', createdAt: '2025-01-15T13:00:00' },
  { id: 'sm2', leadId: 'l3', leadName: 'Fernanda Lima', instanceId: 'wi2', messageContent: 'Fernanda, ainda tem interesse no Plano Starter? Posso agendar uma visita!', scheduledFor: '2025-01-15T16:00:00', status: 'pending', createdAt: '2025-01-15T10:00:00' },
  { id: 'sm3', leadId: 'l7', leadName: 'Luciana Ferreira', instanceId: 'wi2', messageContent: 'Luciana, recebemos sua solicitação. Vou te passar as informações!', scheduledFor: '2025-01-15T13:30:00', status: 'sent', sentAt: '2025-01-15T13:30:00', createdAt: '2025-01-15T12:00:00' },
  { id: 'sm4', leadId: 'l9', leadName: 'Beatriz Cardoso', instanceId: 'wi1', messageContent: 'Beatriz, temos novidades no Plano Starter! Quer conhecer?', scheduledFor: '2025-01-16T09:00:00', status: 'pending', createdAt: '2025-01-15T14:00:00' },
  { id: 'sm5', leadId: 'l10', leadName: 'Thiago Ribeiro', instanceId: 'wi5', messageContent: 'Thiago, temos condições especiais para você!', scheduledFor: '2025-01-14T10:00:00', status: 'failed', errorMessage: 'Instance disconnected', createdAt: '2025-01-13T18:00:00' },
  { id: 'sm6', leadId: 'l11', leadName: 'Ana Paula Gomes', instanceId: 'wi1', messageContent: 'Ana Paula, bem-vinda! Vou te apresentar nossas soluções.', scheduledFor: '2025-01-15T15:00:00', status: 'cancelled', createdAt: '2025-01-15T14:30:00' },
];

export const analyticsEvents: AnalyticsEvent[] = [
  { id: 'ae1', eventName: 'lead.created', eventCategory: 'lead', properties: { source: 'whatsapp', brand: 'LC Imóveis', score: 85 }, leadId: 'l1', franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T10:30:00' },
  { id: 'ae2', eventName: 'lead.qualified', eventCategory: 'lead', properties: { score: 91, temperature: 'quente' }, leadId: 'l4', franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T08:00:00' },
  { id: 'ae3', eventName: 'message.sent', eventCategory: 'whatsapp', properties: { direction: 'outgoing', type: 'text' }, franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T12:06:00' },
  { id: 'ae4', eventName: 'message.received', eventCategory: 'whatsapp', properties: { direction: 'incoming', from: '+55 11 99988-7766' }, franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T12:05:00' },
  { id: 'ae5', eventName: 'automation.executed', eventCategory: 'automation', properties: { rule: 'Auto-resposta WhatsApp' }, franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T12:00:00' },
  { id: 'ae6', eventName: 'lead.converted', eventCategory: 'lead', properties: { value: 38000, brand: 'LC Imóveis' }, leadId: 'l6', franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-14T16:00:00' },
  { id: 'ae7', eventName: 'user.login', eventCategory: 'user', properties: { role: 'director' }, userId: 'u1', franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T08:00:00' },
  { id: 'ae8', eventName: 'webhook.received', eventCategory: 'whatsapp', properties: { instance: 'sp-centro-principal', event: 'message.received' }, franchiseId: 'f1', tenantId: 't1', createdAt: '2025-01-15T11:55:00' },
];

export const systemLogs: SystemLog[] = [
  { id: 'sl1', level: 'info', category: 'api', message: 'GET /api/leads - 200 OK (142ms)', context: { endpoint: '/api/leads', method: 'GET', statusCode: 200, responseTime: 142 }, createdAt: '2025-01-15T12:05:00' },
  { id: 'sl2', level: 'warning', category: 'webhook', message: 'Webhook processing delayed for instance bh-savassi', context: { instanceId: 'wi3', queueSize: 12 }, createdAt: '2025-01-15T11:30:00' },
  { id: 'sl3', level: 'error', category: 'webhook', message: 'Failed to send scheduled message - instance disconnected', stackTrace: 'Error: Instance disconnected\n  at WhatsAppService.send()', context: { instanceId: 'wi3', messageId: 'sm5' }, createdAt: '2025-01-14T10:00:00' },
  { id: 'sl4', level: 'critical', category: 'api', message: 'Rate limit exceeded for tenant t1 on /api/leads', context: { tenantId: 't1', endpoint: '/api/leads', limit: '100/15min' }, createdAt: '2025-01-15T09:45:00' },
  { id: 'sl5', level: 'info', category: 'automation', message: 'Automation rule "Auto-resposta WhatsApp" executed successfully', context: { ruleId: 'ar1', executionTime: '234ms' }, createdAt: '2025-01-15T12:00:00' },
  { id: 'sl6', level: 'info', category: 'auth', message: 'User carlos@leadcapture.pro logged in successfully', context: { userId: 'u1', ip: '189.44.xxx.xxx' }, createdAt: '2025-01-15T08:00:00' },
  { id: 'sl7', level: 'warning', category: 'database', message: 'Slow query detected on leads table (890ms)', context: { query: 'SELECT * FROM leads WHERE tenant_id = $1', duration: 890 }, createdAt: '2025-01-15T07:30:00' },
  { id: 'sl8', level: 'error', category: 'automation', message: 'n8n webhook returned 502 Bad Gateway', context: { url: 'https://n8n.leadcapture.pro/webhook/crm-sync', statusCode: 502 }, createdAt: '2025-01-15T06:15:00' },
];

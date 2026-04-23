export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  activeFranchises: number;
  createdAt: string;
  customFields: CustomField[];
  settings: Record<string, unknown>;
  isActive: boolean;
  tenantType: 'franchise' | 'real_estate' | 'clinic' | 'other';
}

export interface Brand {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  logo?: string;
  color: string;
  description?: string;
  isActive: boolean;
  franchiseIds: string[];
  leadCount: number;
  conversionRate: number;
  revenue: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'manager' | 'consultant' | 'admin';
  avatar?: string;
  phone?: string;
  franchiseId: string;
  tenantId: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface Franchise {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  tenantId: string;
  managerId?: string;
  managerName?: string;
  whatsappNumber?: string;
  activeConsultants: number;
  monthlyLeads: number;
  conversionRate: number;
  status: 'healthy' | 'warning' | 'critical';
  todayLeads: number;
  todayConversion: number;
  avgResponseTime: number;
  activeChats: number;
  weeklyTrend: number[];
  isActive: boolean;
  autoQualificationEnabled: boolean;
  autoResponseEnabled: boolean;
  businessHours?: Record<string, string>;
  brandId?: string;
  brandName?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  sourceDetail?: string;
  status: LeadStatus;
  score: number;
  temperature: 'frio' | 'morno' | 'quente';
  franchiseId: string;
  consultantId: string;
  consultantName: string;
  channel: string;
  brandId: string;
  brandName: string;
  brandColor: string;
  createdAt: string;
  updatedAt: string;
  lastInteraction?: string;
  convertedAt?: string;
  tags: string[];
  value?: number;
  interest?: string;
  notes?: string;
  customFields?: Record<string, string>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export type LeadSource = 'whatsapp' | 'website' | 'chatbot' | 'n8n' | 'instagram' | 'facebook' | 'referral' | 'manual' | 'csv_import' | 'webhook' | 'api';

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'boolean';
  required: boolean;
  options?: string[];
  tenantId: string;
}

export interface LeadInteraction {
  id: string;
  leadId: string;
  type: 'call' | 'whatsapp' | 'email' | 'meeting' | 'note';
  direction?: 'inbound' | 'outbound';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  userId: string;
}

export interface WhatsAppInstance {
  id: string;
  instanceName: string;
  instanceKey: string;
  phone: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  franchiseId: string;
  franchiseName?: string;
  qrCode?: string;
  lastConnectedAt?: string;
  webhookUrl?: string;
  settings?: Record<string, unknown>;
  messagesToday: number;
}

export interface WhatsAppMessage {
  id: string;
  instanceId: string;
  leadId?: string;
  messageId: string;
  from: string;
  to: string;
  type: 'text' | 'image' | 'audio' | 'document';
  content: string;
  mediaUrl?: string;
  direction: 'incoming' | 'outgoing';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isFromMe: boolean;
  timestamp: string;
}

export interface WhatsAppWebhook {
  id: string;
  instanceId: string;
  eventType: string;
  payload: Record<string, unknown>;
  processed: boolean;
  processedAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface ScheduledMessage {
  id: string;
  leadId: string;
  leadName: string;
  instanceId: string;
  messageContent: string;
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  sentAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  triggerEvent: string;
  conditions: QualificationCondition[];
  actions: QualificationAction[];
  priority: number;
  active: boolean;
  franchiseId?: string;
  executions: number;
  lastExecution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  category: 'onboarding' | 'followup' | 'recovery' | 'qualification' | 'notification';
  steps: WorkflowStep[];
  isActive: boolean;
  description?: string;
}

export interface WorkflowStep {
  id: string;
  type: 'delay' | 'send_whatsapp' | 'send_email' | 'change_status' | 'assign_to' | 'add_tag' | 'condition' | 'trigger_webhook' | 'send_notification';
  params: Record<string, unknown>;
  nextStepId?: string;
}

export interface QualificationRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  priority: number;
  conditions: QualificationCondition[];
  actions: QualificationAction[];
  executions: number;
  lastExecution?: string;
  createdAt: string;
}

export interface QualificationCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'starts_with' | 'is_empty' | 'is_not_empty';
  value: string;
  logicOperator?: 'AND' | 'OR';
}

export interface QualificationAction {
  id: string;
  type: 'set_status' | 'assign_to' | 'send_notification' | 'send_whatsapp' | 'schedule_followup' | 'change_score' | 'add_tag' | 'trigger_webhook' | 'trigger_n8n';
  value: string;
  template?: string;
  delay?: number;
  params?: Record<string, unknown>;
}

export interface RankingEntry {
  position: number;
  consultantId: string;
  consultantName: string;
  avatar?: string;
  franchiseName: string;
  leadsCaptured: number;
  leadsConverted: number;
  conversionRate: number;
  revenue: number;
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface ChannelMetrics {
  channel: LeadSource;
  label: string;
  icon: string;
  leads: number;
  conversion: number;
  revenue: number;
  growth: number;
  color: string;
  status: 'active' | 'paused' | 'error';
  type: 'organic' | 'paid' | 'referral';
}

export interface KPIData {
  label: string;
  value: number;
  previousValue: number;
  format: 'number' | 'currency' | 'percentage' | 'time';
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  eventCategory: 'lead' | 'whatsapp' | 'user' | 'automation' | 'system';
  properties?: Record<string, unknown>;
  userId?: string;
  leadId?: string;
  franchiseId: string;
  tenantId: string;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  category: 'api' | 'webhook' | 'automation' | 'database' | 'auth';
  message: string;
  stackTrace?: string;
  context?: Record<string, unknown>;
  createdAt: string;
}

export interface PerformanceMetric {
  id: string;
  metricName: string;
  metricValue: number;
  unit: 'ms' | 'count' | 'percentage';
  tags?: Record<string, string>;
  recordedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  icon?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  preferences: Record<string, { email: boolean; push: boolean }>;
  updatedAt: string;
}

export interface AnomalyAlert {
  id: string;
  type: 'drop_leads' | 'slow_response' | 'low_conversion' | 'instance_down' | 'high_churn';
  severity: 'low' | 'medium' | 'high' | 'critical';
  franchiseId: string;
  franchiseName: string;
  message: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
  timestamp: string;
  resolved: boolean;
}

export interface MonitoringEvent {
  id: string;
  type: 'lead_captured' | 'lead_qualified' | 'lead_converted' | 'message_received' | 'workflow_triggered' | 'anomaly_detected' | 'instance_status_change';
  description: string;
  franchiseName: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers: Record<string, string>;
  active: boolean;
  lastTriggered?: string;
  successRate: number;
  totalCalls: number;
}

export type PageType = 'dashboard' | 'leads' | 'channels' | 'rankings' | 'whatsapp' | 'analytics' | 'settings' | 'workflows' | 'monitoring' | 'qualification' | 'capture' | 'docs' | 'flows';

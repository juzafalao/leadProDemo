import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { whatsappInstances, leads } from '../data/mockData';
import {
  MessageCircle, Phone, Send, MoreVertical, Search,
  Wifi, WifiOff, Loader2, QrCode, RefreshCw, Settings,
  Check, CheckCheck, Clock, Plus, ArrowLeft, Paperclip, Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockMessages = [
  { id: 'm1', direction: 'incoming' as const, from: 'Maria Silva', content: 'Olá, gostaria de saber mais sobre o plano empresarial', time: '12:05', read: true, type: 'text' as const, status: 'read' as const },
  { id: 'm2', direction: 'outgoing' as const, from: 'Você', content: 'Oi Maria! Claro, vou te passar todas as informações. Qual o tamanho da sua equipe?', time: '12:06', read: true, type: 'text' as const, status: 'delivered' as const },
  { id: 'm3', direction: 'incoming' as const, from: 'Maria Silva', content: 'Somos uma equipe de 15 pessoas', time: '12:08', read: true, type: 'text' as const, status: 'read' as const },
  { id: 'm4', direction: 'outgoing' as const, from: 'Você', content: 'Perfeito! Para esse tamanho, recomendo nosso plano Professional. Vou preparar uma proposta personalizada.', time: '12:10', read: true, type: 'text' as const, status: 'delivered' as const },
  { id: 'm5', direction: 'incoming' as const, from: 'Maria Silva', content: 'Ótimo! Qual o valor mensal?', time: '12:12', read: false, type: 'text' as const, status: 'delivered' as const },
  { id: 'm6', direction: 'incoming' as const, from: 'Maria Silva', content: '📎 Proposta_Comercial_2025.pdf', time: '12:14', read: false, type: 'document' as const, status: 'delivered' as const },
  { id: 'm7', direction: 'outgoing' as const, from: 'Você', content: '🎵 Mensagem de áudio (0:32)', time: '12:15', read: true, type: 'audio' as const, status: 'read' as const },
];

export default function WhatsApp() {
  const [selectedInstance, setSelectedInstance] = useState(whatsappInstances[0]);
  const [selectedChat, setSelectedChat] = useState<string | null>('Maria Silva');
  const [messageInput, setMessageInput] = useState('');

  const statusIcon = {
    connected: <Wifi className="w-3.5 h-3.5 text-emerald-400" />,
    disconnected: <WifiOff className="w-3.5 h-3.5 text-rose-400" />,
    connecting: <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />,
  };

  const statusLabel = {
    connected: { text: 'Conectado', color: 'text-emerald-400' },
    disconnected: { text: 'Desconectado', color: 'text-rose-400' },
    connecting: { text: 'Conectando...', color: 'text-amber-400' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">WhatsApp</h2>
          <p className="text-sm text-slate-400 mt-1">Integração Evolution API — mensagens em tempo real</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-[#25D366] text-sm font-semibold text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
          <Plus className="w-4 h-4" /> Nova Instância
        </button>
      </div>

      {/* Instances Bar */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {whatsappInstances.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setSelectedInstance(inst)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border flex-shrink-0 transition-all ${
              selectedInstance.id === inst.id
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-slate-300" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#070b18] bg-current" style={{ color: inst.status === 'connected' ? '#34d399' : inst.status === 'disconnected' ? '#f43f5e' : '#f59e0b' }} />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-white whitespace-nowrap">{inst.franchiseName || inst.instanceName}</p>
              <p className="text-[10px] text-slate-500">{inst.instanceName} • {inst.messagesToday} msgs</p>
            </div>
          </button>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Chat List */}
        <GlassCard noPadding className="overflow-hidden">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04]">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar conversa..."
                className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
              />
            </div>
          </div>
          <div className="overflow-y-auto">
            {leads.filter(l => l.source === 'whatsapp').map((lead) => (
              <button
                key={lead.id}
                onClick={() => setSelectedChat(lead.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors text-left ${
                  selectedChat === lead.name ? 'bg-white/[0.06]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">{lead.name}</p>
                    <span className="text-[10px] text-slate-500">12:05</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Última mensagem...</p>
                </div>
                {lead.status === 'new' && (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                    1
                  </div>
                )}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Chat Window */}
        <GlassCard noPadding className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <button className="lg:hidden p-1" onClick={() => setSelectedChat(null)}>
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center text-sm font-bold text-white">
                    {selectedChat.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{selectedChat}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-emerald-400">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                      msg.direction === 'outgoing'
                        ? 'bg-emerald-500/15 rounded-br-md'
                        : 'bg-white/[0.06] rounded-bl-md'
                    }`}>
                      <p className="text-sm text-slate-200">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-1 ${msg.direction === 'outgoing' ? 'justify-end' : ''}`}>
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                        {msg.direction === 'outgoing' && (
                          msg.read ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Check className="w-3 h-3 text-slate-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
                    />
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#25D366] text-[#070b18] hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Selecione uma conversa</p>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

import GlassCard from '../components/GlassCard';
import { rankings } from '../data/mockData';
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Crown, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const positionStyles: Record<number, { border: string; glow: string; badge: string }> = {
  1: { border: 'border-amber-400/30', glow: 'shadow-amber-500/10', badge: 'from-amber-400 to-yellow-500' },
  2: { border: 'border-slate-300/30', glow: 'shadow-slate-400/10', badge: 'from-slate-300 to-slate-400' },
  3: { border: 'border-amber-600/30', glow: 'shadow-amber-600/10', badge: 'from-amber-600 to-amber-700' },
};

export default function Rankings() {
  const { setCurrentPage } = useApp();
  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Rankings</h2>
        <p className="text-sm text-slate-400 mt-1">Performance dos consultores em tempo real</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:mt-8"
        >
          <GlassCard className={`h-full border ${positionStyles[2]?.border || ''} ${positionStyles[2]?.glow || ''}`}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-[#070b18]">
                2
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white">
                {top3[1]?.consultantName.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-base font-semibold text-white">{top3[1]?.consultantName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{top3[1]?.franchiseName}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Leads</span>
                  <span className="text-slate-200 font-medium">{top3[1]?.leadsCaptured}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Conversão</span>
                  <span className="text-emerald-400 font-medium">{top3[1]?.conversionRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Receita</span>
                  <span className="text-amber-400 font-medium">R$ {(top3[1]?.revenue || 0).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className={`h-full border ${positionStyles[1]?.border || ''} ${positionStyles[1]?.glow || ''}`}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 mx-auto mb-3 flex items-center justify-center">
                <Crown className="w-8 h-8 text-[#070b18]" />
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white ring-2 ring-amber-400/30">
                {top3[0]?.consultantName.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-lg font-bold text-white">{top3[0]?.consultantName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{top3[0]?.franchiseName}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Leads</span>
                  <span className="text-slate-200 font-medium">{top3[0]?.leadsCaptured}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Conversão</span>
                  <span className="text-emerald-400 font-medium">{top3[0]?.conversionRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Receita</span>
                  <span className="text-amber-400 font-semibold">R$ {(top3[0]?.revenue || 0).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:mt-12"
        >
          <GlassCard className={`h-full border ${positionStyles[3]?.border || ''} ${positionStyles[3]?.glow || ''}`}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-[#070b18]">
                3
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white">
                {top3[2]?.consultantName.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-base font-semibold text-white">{top3[2]?.consultantName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{top3[2]?.franchiseName}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Leads</span>
                  <span className="text-slate-200 font-medium">{top3[2]?.leadsCaptured}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Conversão</span>
                  <span className="text-emerald-400 font-medium">{top3[2]?.conversionRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Receita</span>
                  <span className="text-amber-400 font-medium">R$ {(top3[2]?.revenue || 0).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Rest of Rankings */}
      <GlassCard delay={0.4} noPadding>
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white">Classificação Completa</h3>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {rankings.map((entry, i) => (
            <motion.div
              key={entry.consultantId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                entry.position <= 3 ? 'bg-amber-500/15 text-amber-400' : 'bg-white/[0.06] text-slate-400'
              }`}>
                {entry.position}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {entry.consultantName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{entry.consultantName}</p>
                <p className="text-xs text-slate-500">{entry.franchiseName}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">{entry.leadsCaptured}</p>
                  <p className="text-[10px] text-slate-500">Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-emerald-400">{entry.conversionRate}%</p>
                  <p className="text-[10px] text-slate-500">Conversão</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-amber-400">R$ {entry.revenue.toLocaleString('pt-BR')}</p>
                  <p className="text-[10px] text-slate-500">Receita</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                entry.trend === 'up' ? 'text-emerald-400' : entry.trend === 'down' ? 'text-rose-400' : 'text-slate-500'
              }`}>
                {entry.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : entry.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                {entry.trendValue !== 0 && `${entry.trendValue > 0 ? '+' : ''}${entry.trendValue}`}
              </div>
              <div className="w-16">
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    style={{ width: `${entry.score}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

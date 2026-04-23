import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { KPIData } from '../types';
import {
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const iconMap: Record<string, typeof Users> = { Users, TrendingUp, DollarSign, Clock };

function formatValue(value: number, format: KPIData['format']): string {
  switch (format) {
    case 'currency': return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
    case 'percentage': return `${value.toFixed(1)}%`;
    case 'time': return `${value.toFixed(1)}min`;
    default: return value.toLocaleString('pt-BR');
  }
}

function AnimatedNumber({ value, format }: { value: number; format: KPIData['format'] }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
      else ref.current = end;
    }

    requestAnimationFrame(animate);
  }, [value]);

  return <>{formatValue(display, format)}</>;
}

const colorSchemes = [
  { bg: 'bg-brand-50', border: 'border-brand-200', icon: 'text-brand-600', accent: 'text-brand-700', value: 'text-brand-800' },
  { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', accent: 'text-blue-700', value: 'text-blue-800' },
  { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', accent: 'text-amber-700', value: 'text-amber-800' },
  { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-600', accent: 'text-rose-700', value: 'text-rose-800' },
];

export default function StatCard({ data, index }: { data: KPIData; index: number }) {
  const Icon = iconMap[data.icon] || Users;
  const colors = colorSchemes[index % colorSchemes.length];
  const changePercent = data.previousValue > 0
    ? ((data.value - data.previousValue) / data.previousValue * 100).toFixed(1)
    : '0';
  const isPositive = data.trend === 'up';
  const isGood = (data.format === 'time' ? !isPositive : isPositive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-xl border ${colors.border} ${colors.bg} p-5 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${colors.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isGood ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(parseFloat(changePercent))}%
        </div>
      </div>
      <div className={`text-2xl font-bold ${colors.value} mb-1`}>
        <AnimatedNumber value={data.value} format={data.format} />
      </div>
      <p className="text-xs text-gray-500 font-medium">{data.label}</p>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

export default function GlassCard({ children, className = '', delay = 0, noPadding = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`
        rounded-xl border border-gray-200 bg-white shadow-sm
        ${noPadding ? '' : 'p-5'}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

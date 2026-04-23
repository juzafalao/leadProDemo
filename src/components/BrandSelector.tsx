import { brands } from '../data/mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, Check } from 'lucide-react';

interface BrandSelectorProps {
  selectedBrand: string;
  onBrandChange: (brandId: string) => void;
}

export default function BrandSelector({ selectedBrand, onBrandChange }: BrandSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = brands.find(b => b.id === selectedBrand);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-colors"
      >
        {selected ? (
          <>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selected.color }} />
            <span>{selected.name}</span>
          </>
        ) : (
          <>
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Todas Marcas</span>
          </>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-2 right-0 w-64 bg-[#0f1629] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 py-2 z-50"
          >
            <button
              onClick={() => { onBrandChange('all'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.06] transition-colors ${
                selectedBrand === 'all' ? 'text-emerald-400' : 'text-slate-300'
              }`}
            >
              Todas Marcas
            </button>
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => { onBrandChange(brand.id); setIsOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.06] transition-colors flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: brand.color }} />
                <div className="flex-1">
                  <p className={`font-medium ${selectedBrand === brand.id ? 'text-emerald-400' : 'text-slate-200'}`}>{brand.name}</p>
                  <p className="text-[10px] text-slate-500">{brand.leadCount} leads • {brand.conversionRate}% conv.</p>
                </div>
                {selectedBrand === brand.id && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

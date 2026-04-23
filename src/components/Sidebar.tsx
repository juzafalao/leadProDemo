import { useApp } from '../context/AppContext';
import type { PageType } from '../types';
import {
  LayoutDashboard,
  Users,
  Radio,
  Trophy,
  MessageCircle,
  BarChart3,
  Settings,
  Workflow,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity,
  Shield,
  PlusCircle,
  BookOpen,
  GitBranch,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems: { page: PageType; label: string; icon: typeof LayoutDashboard; section?: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'Principal' },
  { page: 'monitoring', label: 'Monitoramento', icon: Activity, section: 'Principal' },
  { page: 'capture', label: 'Captura de Leads', icon: PlusCircle, section: 'Operação' },
  { page: 'leads', label: 'Leads', icon: Users, section: 'Operação' },
  { page: 'channels', label: 'Canais', icon: Radio, section: 'Operação' },
  { page: 'qualification', label: 'Qualificação', icon: Shield, section: 'Automação' },
  { page: 'rankings', label: 'Rankings', icon: Trophy, section: 'Performance' },
  { page: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, section: 'Integrações' },
  { page: 'workflows', label: 'Workflows', icon: Workflow, section: 'Integrações' },
  { page: 'analytics', label: 'Analytics', icon: BarChart3, section: 'Insights' },
  { page: 'flows', label: 'Fluxos', icon: GitBranch, section: 'Sistema' },
  { page: 'docs', label: 'Documentação', icon: BookOpen, section: 'Sistema' },
  { page: 'settings', label: 'Configurações', icon: Settings, section: 'Sistema' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useApp();

  let lastSection = '';

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col border-r border-gray-200 bg-white shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-sm font-bold text-gray-900 whitespace-nowrap tracking-tight">LeadCapture</h1>
                <p className="text-[10px] text-brand-500 font-semibold tracking-widest uppercase">PRO</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          const Icon = item.icon;
          const showSection = sidebarOpen && item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;

          return (
            <div key={item.page}>
              {showSection && (
                <div className="px-3 pt-4 pb-1.5">
                  <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-semibold">{item.section}</span>
                </div>
              )}
              <button
                onClick={() => setCurrentPage(item.page)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-brand-50 text-brand-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-brand-500' : ''}`} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && sidebarOpen && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500"
                  />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors text-xs"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {sidebarOpen && <span>Recolher</span>}
        </button>
      </div>
    </motion.aside>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { franchises, notifications, brands } from '../data/mockData';
import BrandSelector from './BrandSelector';
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';

export default function Header() {
  const { currentUser, sidebarOpen, setSidebarOpen, selectedFranchise, setSelectedFranchise } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFranchisePicker, setShowFranchisePicker] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const notifRef = useRef<HTMLDivElement>(null);
  const franchiseRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (franchiseRef.current && !franchiseRef.current.contains(e.target as Node)) setShowFranchisePicker(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-16 border-b border-white/[0.06] bg-[#070b18]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-slate-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Franchise Picker */}
        <div ref={franchiseRef} className="relative">
          <button
            onClick={() => setShowFranchisePicker(!showFranchisePicker)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{selectedFranchise === 'all' ? 'Todas Franquias' : franchises.find(f => f.id === selectedFranchise)?.name || 'Franquia'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
          {showFranchisePicker && (
            <div className="absolute top-full mt-2 left-0 w-64 bg-[#0f1629] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 py-2 z-50">
              <button
                onClick={() => { setSelectedFranchise('all'); setShowFranchisePicker(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.06] transition-colors ${selectedFranchise === 'all' ? 'text-emerald-400' : 'text-slate-300'}`}
              >
                Todas Franquias
              </button>
              {franchises.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setSelectedFranchise(f.id); setShowFranchisePicker(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.06] transition-colors ${selectedFranchise === f.id ? 'text-emerald-400' : 'text-slate-300'}`}
                >
                  <span className="font-medium">{f.name}</span>
                  <span className="block text-xs text-slate-500">{f.city}, {f.state}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Selector */}
        <BrandSelector selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar leads, consultores..."
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-[#0f1629] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 py-2 z-50 max-h-96 overflow-y-auto">
              <div className="px-4 py-2 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-white">Notificações</p>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 hover:bg-white/[0.04] transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}>
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-400' :
                      n.type === 'warning' ? 'bg-amber-400' :
                      n.type === 'error' ? 'bg-rose-400' : 'bg-blue-400'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-white">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-[#070b18]">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-emerald-400/70 font-medium uppercase tracking-wider">{currentUser.role === 'director' ? 'Diretor' : currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

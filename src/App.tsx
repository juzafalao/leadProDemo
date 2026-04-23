import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Rankings from './pages/Rankings';
import Channels from './pages/Channels';
import WhatsApp from './pages/WhatsApp';
import Analytics from './pages/Analytics';
import Workflows from './pages/Workflows';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Monitoring from './pages/Monitoring';
import Qualification from './pages/Qualification';
import Capture from './pages/Capture';
import Docs from './pages/Docs';
import Flows from './pages/Flows';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { currentPage, sidebarOpen } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    leads: <Leads />,
    rankings: <Rankings />,
    channels: <Channels />,
    whatsapp: <WhatsApp />,
    analytics: <Analytics />,
    workflows: <Workflows />,
    settings: <Settings />,
    monitoring: <Monitoring />,
    qualification: <Qualification />,
    capture: <Capture />,
    docs: <Docs />,
    flows: <Flows />,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 260 : 72 }}
      >
        <Header />
        <main className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {pages[currentPage] || <Dashboard />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

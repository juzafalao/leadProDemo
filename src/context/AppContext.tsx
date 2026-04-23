import { useState, createContext, useContext, type ReactNode } from 'react';
import type { PageType, User } from '../types';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  currentUser: User;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedFranchise: string;
  setSelectedFranchise: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

const mockUser: User = {
  id: 'u1',
  name: 'Carlos Mendes',
  email: 'carlos@leadcapture.pro',
  role: 'director',
  franchiseId: 'f1',
  tenantId: 't1',
  isActive: true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFranchise, setSelectedFranchise] = useState('all');

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      currentUser: mockUser,
      sidebarOpen,
      setSidebarOpen,
      selectedFranchise,
      setSelectedFranchise,
    }}>
      {children}
    </AppContext.Provider>
  );
}

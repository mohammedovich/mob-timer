// components/SessionContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getEngineersConfig, saveEngineersConfig } from '../config/engineers.config';
import type { EngineersData, SessionHistoryEntry } from '../types';

type Engineer = string;

type Theme = 'light' | 'dark';

type SessionState = {
  selectedEngineers: Engineer[];
  availableEngineers: Engineer[];
  selectedTime: number;
  sessionStarted: boolean;
  currentEngineers: Engineer[];
  currentRoles: Record<Engineer, 'Driver' | 'Navigator' | 'Observer'>;
  history: SessionHistoryEntry[];
  theme: Theme;
  settingsOpen: boolean;
  soundEnabled: boolean;
  messageTheme: 'default' | 'pirate' | 'robot' | 'hacker' | 'dino';
  toast: { show: boolean; message: string; type: 'success' | 'error' | 'info' };
  driverQueue: Engineer[];
};

type SessionActions = {
  toggleEngineer: (name: Engineer) => void;
  setSelectedTime: (minutes: number) => void;
  startSession: () => void;
  resetSession: () => void;
  addEngineer: (name: Engineer) => boolean;
  removeEngineer: (name: Engineer) => void;
  refreshEngineers: () => void;
  exportConfig: () => void;
  importConfig: (data: EngineersData) => void;
  toggleTheme: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSound: () => void;
  clearHistory: () => void;
  setMessageTheme: (theme: MessageTheme) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  nextEngineers: string[];
  setCurrentEngineers: (engineers: string[]) => void;
  setCurrentRoles: (roles: Record<string, 'Driver' | 'Navigator' | 'Observer'>) => void;
  setNextEngineers: (engineers: string[]) => void;
  setLastDriver: (driver: string | null) => void;
  assignRoles: (team: string[], lastDriver: string | null) => Record<string, string>;
  setDriverQueue: (queue: string[] | ((prev: string[]) => string[])) => void;
  skipToNext: () => void;
};

export type SessionContextType = SessionState & SessionActions;
type MessageTheme = 'default' | 'pirate' | 'robot' | 'hacker' | 'dino';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const config = getEngineersConfig();
  const savedHistory = typeof window !== 'undefined' ? localStorage.getItem('sessionHistory') : null;
  const savedTheme = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme) || 'light' : 'light';
  const savedSound = typeof window !== 'undefined' ? localStorage.getItem('soundEnabled') !== 'false' : true; // default true

  const [availableEngineers, setAvailableEngineers] = useState<Engineer[]>(config.engineers);
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  const [nextEngineers, setNextEngineers] = useState<Engineer[]>([]);
  const [selectedTime, setSelectedTime] = useState<number>(5);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [currentEngineers, setCurrentEngineers] = useState<Engineer[]>([]);
  const [currentRoles, setCurrentRoles] = useState<Record<Engineer, 'Driver' | 'Navigator' | 'Observer'>>({});
  const [lastDriver, setLastDriver] = useState<string | null>(null);
  const [driverQueue, setDriverQueue] = useState<Engineer[]>([]);
  const [history, setHistory] = useState<SessionHistoryEntry[]>(savedHistory ? JSON.parse(savedHistory) : []);
  const [theme, setTheme] = useState<Theme>(savedTheme);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(savedSound);
  const [messageTheme, setMessageTheme] = useState<MessageTheme>('default');
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save engineers & history
  useEffect(() => {
    saveEngineersConfig(availableEngineers);
  }, [availableEngineers]);

  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    // Initialize queue on load or selection
    setDriverQueue(selectedEngineers.sort(() => 0.5 - Math.random()));
  }, [selectedEngineers]);

  const toggleEngineer = (name: Engineer) => {
    setSelectedEngineers((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type }); // Trigger re-render

    // Auto-hide after 3s
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false })); // Copy to trigger update
    }, 3000);
  };

  const startSession = () => {
    if (selectedEngineers.length === 0) return;

    // Shuffle once for fairness
    const shuffled = [...selectedEngineers].sort(() => 0.5 - Math.random());

    // Use shuffled list as rotating queue
    setDriverQueue(shuffled);

    const roles = assignRoles(shuffled);

    setCurrentEngineers(shuffled);
    setCurrentRoles(roles);
    setSessionStarted(true);

    // Save to history
    const entry: SessionHistoryEntry = {
      id: Date.now().toString(),
      team: shuffled,
      roles,
      duration: selectedTime,
      timestamp: Date.now(),
    };
    setHistory((prev) => [entry, ...prev]);
  }

  const resetSession = () => {
    setSessionStarted(false);
    setCurrentEngineers([]);
    setCurrentRoles({});
  };

  const addEngineer = (name: Engineer): boolean => {
    const trimmed = name.trim();
    if (!trimmed || availableEngineers.includes(trimmed)) return false;
    setAvailableEngineers((prev) => [...prev, trimmed]);
    return true;
  };

  const removeEngineer = (name: Engineer) => {
    setAvailableEngineers((prev) => prev.filter((n) => n !== name));
    setSelectedEngineers((prev) => prev.filter((n) => n !== name));
  };

  const refreshEngineers = () => {
    const saved = localStorage.getItem('engineersConfig');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAvailableEngineers(parsed.engineers || []);
    }
  };

  const exportConfig = () => {
    const data = JSON.stringify({ engineers: availableEngineers }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: 'mob-config.json' });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importConfig = (data: EngineersData) => {
    if (Array.isArray(data.engineers)) {
      setAvailableEngineers(data.engineers);
      alert(`Successfully imported ${data.engineers.length} engineers.`);
    } else {
      alert('Invalid config format.');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const skipToNext = () => {
    setDriverQueue((prev) => {
      if (prev.length <= 1) return prev;

      const [currentDriver, ...rest] = prev;
      const newQueue = [...rest, currentDriver]; // Move current to end

      // Reassign roles with new driver
      const newDriver = newQueue[0];
      const available = selectedEngineers.filter(e => e !== newDriver);
      const navigator = available[0];
      const observer = available[1];

      const newRoles: Record<string, 'Driver' | 'Navigator' | 'Observer'> = {
        [newDriver]: 'Driver',
        [navigator]: 'Navigator',
        ...(observer && { [observer]: 'Observer' as 'Observer' })
      };

      setCurrentEngineers([newDriver, navigator, ...(observer ? [observer] : [])]);
      setCurrentRoles(newRoles);
      setNextEngineers([newQueue[1] || newQueue[0]]); // Update visual queue

      console.log(`Skipped ${currentDriver}, now ${newDriver} is driving`);
      return newQueue;
    });
  };

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);
  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const clearHistory = () => setHistory([]);

  const value: SessionContextType = {
    selectedEngineers,
    availableEngineers,
    selectedTime,
    setSelectedTime,
    sessionStarted,
    currentEngineers,
    currentRoles,
    history,
    theme,
    settingsOpen,
    soundEnabled,
    messageTheme,
    toggleEngineer,
    startSession,
    resetSession,
    addEngineer,
    removeEngineer,
    refreshEngineers,
    exportConfig,
    importConfig,
    toggleTheme,
    openSettings,
    closeSettings,
    toggleSound,
    clearHistory,
    setMessageTheme,
    showToast,
    toast,
    nextEngineers,
    setCurrentEngineers,
    setNextEngineers,
    setLastDriver,
    assignRoles,
    setCurrentRoles,
    driverQueue,
    setDriverQueue,
    skipToNext
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

// Helper to assign roles
export const assignRoles = (
  team: string[],
  lastDriver: string | null = null
): Record<string, 'Driver' | 'Navigator' | 'Observer'> => {
  const roles: Record<string, 'Driver' | 'Navigator' | 'Observer'> = {};
  if (team.length === 0) return roles;

  // Shuffle team
  const shuffled = [...team].sort(() => 0.5 - Math.random());

  // Prevent same driver twice
  let driverIndex = 0;
  if (lastDriver && shuffled[0] === lastDriver && shuffled.length > 1) {
    driverIndex = 1; // pick second person
  }

  roles[shuffled[driverIndex]] = 'Driver';

  // Assign navigator (skip driver)
  if (team.length > 1) {
    const navIndex = (driverIndex + 1) % shuffled.length;
    roles[shuffled[navIndex]] = 'Navigator';
  }

  // Assign observers
  for (let i = 0; i < shuffled.length; i++) {
    if (!roles[shuffled[i]]) {
      roles[shuffled[i]] = 'Observer';
    }
  }

  return roles;
};

export const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSessionContext must be used within SessionProvider');
  return context;
};
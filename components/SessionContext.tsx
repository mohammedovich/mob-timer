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
};

export type SessionContextType = SessionState & SessionActions;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const config = getEngineersConfig();
  const savedHistory = typeof window !== 'undefined' ? localStorage.getItem('sessionHistory') : null;
  const savedTheme = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme) || 'light' : 'light';
  const savedSound = typeof window !== 'undefined' ? localStorage.getItem('soundEnabled') !== 'false' : true; // default true

  const [availableEngineers, setAvailableEngineers] = useState<Engineer[]>(config.engineers);
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  const [selectedTime, setSelectedTime] = useState<number>(5);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [currentEngineers, setCurrentEngineers] = useState<Engineer[]>([]);
  const [currentRoles, setCurrentRoles] = useState<Record<Engineer, 'Driver' | 'Navigator' | 'Observer'>>({});
  const [history, setHistory] = useState<SessionHistoryEntry[]>(savedHistory ? JSON.parse(savedHistory) : []);
  const [theme, setTheme] = useState<Theme>(savedTheme);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(savedSound);

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

  const toggleEngineer = (name: Engineer) => {
    setSelectedEngineers((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const assignRoles = (team: Engineer[]): Record<Engineer, 'Driver' | 'Navigator' | 'Observer'> => {
    const roles: Record<Engineer, 'Driver' | 'Navigator' | 'Observer'> = {};
    if (team.length === 0) return roles;

    // Random shuffle
    const shuffled = [...team].sort(() => 0.5 - Math.random());
    roles[shuffled[0]] = 'Driver';
    if (shuffled[1]) roles[shuffled[1]] = 'Navigator';
    for (let i = 2; i < shuffled.length; i++) {
      roles[shuffled[i]] = 'Observer';
    }
    return roles;
  };

  const startSession = () => {
    if (selectedEngineers.length === 0) {
      alert('Please select at least one engineer.');
      return;
    }

    const team = [...selectedEngineers].sort(() => 0.5 - Math.random()).slice(0, 3);
    const roles = assignRoles(team);

    setCurrentEngineers(team);
    setCurrentRoles(roles);
    setSessionStarted(true);

    // Add to history
    const entry: SessionHistoryEntry = {
      id: Date.now().toString(),
      team,
      roles,
      duration: selectedTime,
      timestamp: Date.now(),
    };
    setHistory((prev) => [entry, ...prev]);
  };

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
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

const assignRoles = (team: Engineer[]): Record<Engineer, 'Driver' | 'Navigator' | 'Observer'> => {
  const roles: Record<Engineer, 'Driver' | 'Navigator' | 'Observer'> = {};
  if (team.length === 0) return roles;

  const shuffled = [...team].sort(() => 0.5 - Math.random());
  roles[shuffled[0]] = 'Driver';
  if (shuffled[1]) roles[shuffled[1]] = 'Navigator';
  for (let i = 2; i < shuffled.length; i++) {
    roles[shuffled[i]] = 'Observer';
  }
  return roles;
};

export const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSessionContext must be used within SessionProvider');
  return context;
};
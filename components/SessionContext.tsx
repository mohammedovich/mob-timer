// components/SessionContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Engineer } from '../types';

type SessionState = {
  selectedEngineers: Engineer[];
  selectedTime: number;
  sessionStarted: boolean;
  currentEngineers: Engineer[];
};

type SessionActions = {
  toggleEngineer: (name: Engineer) => void;
  setSelectedTime: (minutes: number) => void;
  startSession: () => void;
  resetSession: () => void;
};

export type SessionContextType = SessionState & SessionActions;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  const [selectedTime, setSelectedTime] = useState<number>(5);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [currentEngineers, setCurrentEngineers] = useState<Engineer[]>([]);

  const toggleEngineer = (name: Engineer) => {
    setSelectedEngineers((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const startSession = () => {
    if (selectedEngineers.length === 0) {
      alert('Please select at least one engineer.');
      return;
    }

    const shuffled = [...selectedEngineers].sort(() => 0.5 - Math.random());
    const numToPick = Math.min(3, shuffled.length);
    const picked = shuffled.slice(0, numToPick);

    setCurrentEngineers(picked);
    setSessionStarted(true);
  };

  const resetSession = () => {
    setSessionStarted(false);
    setCurrentEngineers([]);
  };

  const value: SessionContextType = {
    selectedEngineers,
    selectedTime,
    setSelectedTime,
    sessionStarted,
    currentEngineers,
    toggleEngineer,
    startSession,
    resetSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider');
  }
  return context;
};
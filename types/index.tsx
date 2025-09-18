export type Engineer = string;

export interface EngineersData {
  engineers: Engineer[];
  defaultTimes?: number[];
}

export interface SessionHistoryEntry {
  id: string;
  team: Engineer[];
  roles: Record<Engineer, 'Driver' | 'Navigator' | 'Observer'>;
  duration: number; // minutes
  timestamp: number; // Date.now()
}
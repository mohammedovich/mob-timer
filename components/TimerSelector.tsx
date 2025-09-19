'use client';
import { useSessionContext } from './SessionContext';
import { useEffect, useState } from 'react';
import type { EngineersData } from '../types';

export default function TimerSelector() {
  const { selectedTime, setSelectedTime } = useSessionContext();
  const [times, setTimes] = useState<number[]>([]);

  useEffect(() => {
    const loadTimes = async () => {
      const data: EngineersData = (await import('../data/engineers.json')).default;
      setTimes(data.defaultTimes ?? []);
    };
    loadTimes();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Select Timer Duration</h2>
      <div className="flex space-x-4">
        {times.map((minutes) => (
          <label key={minutes} className="flex items-center space-x-1">
            <input
              type="radio"
              name="timer"
              value={minutes}
              checked={selectedTime === minutes}
              onChange={() => setSelectedTime(minutes)}
              className="w-4 h-4"
            />
            <span>{minutes} min</span>
          </label>
        ))}
      </div>
    </div>
  );
}
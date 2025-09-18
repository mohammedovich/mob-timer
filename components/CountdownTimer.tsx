'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  duration: number; // in minutes
  onEnd?: () => void;
}

export default function CountdownTimer({ duration, onEnd }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60); // seconds
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onEnd?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onEnd]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => setIsActive((prev) => !prev);
  const handleReset = () => setTimeLeft(duration * 60);

  return (
    <div className="mt-6 p-4 border rounded bg-red-50">
      <h3 className="text-lg font-bold text-red-700">Session Timer</h3>
      <p className="text-4xl font-mono mt-2">{formatTime(timeLeft)}</p>
      <div className="mt-3 space-x-2">
        <button onClick={handlePause} className="btn btn-primary">
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button onClick={handleReset} className="btn btn-primary">
          Reset
        </button>
      </div>
    </div>
  );
}
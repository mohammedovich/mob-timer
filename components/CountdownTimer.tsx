'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useSessionContext } from './SessionContext';

interface CountdownTimerProps {
  duration: number;
  onEnd?: () => void;
}

export default function CountdownTimer({ duration, onEnd }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState<string>('');

  const { soundEnabled, skipToNext } = useSessionContext();

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive]);

  const playSound = () => {
    if (!soundEnabled) return;
    const audio = new Audio('/sounds/sound-01.mp3');
    audio.play().catch(() => console.warn('Audio play failed'));
  };

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      setIsActive(false);
      triggerConfetti();
      playSound();

      if (onEnd && typeof onEnd === 'function') {
        onEnd(); // ← This must run now
      } else {
        console.warn('onEnd is not a function!', onEnd);
      }

      // Optional: auto-reset after 3s
      const resetTimer = setTimeout(() => {
        setTimeLeft(duration * 60);
        setIsActive(true);
        setMessage('');
        onEnd?.(); // e.g., log session end
      }, 3000);

      return () => clearTimeout(resetTimer);
    }
  }, [timeLeft, isActive, duration, onEnd, playSound]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      ticks: 200,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => setIsActive(prev => !prev);
  const handleReset = () => {
    setTimeLeft(duration * 60);
    setIsActive(true);
    setMessage('');
  };

  const isUrgent = timeLeft <= 10;

  return (
    <div className="mt-6 p-5 border-4 rounded-xl shadow-lg">
      {/* Timer */}
      <div
        className={`text-center font-mono text-5xl font-bold mb-3 ${isUrgent ? 'text-red-600 animate-pulse' : 'text-blue-700 dark:text-blue-400'
          }`}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Message */}
      {message ? (
        <div className="text-center mb-4 whitespace-pre-line text-lg font-semibold text-green-600">
          {message.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-center">
          Session active — rotating soon!
        </p>
      )}

      {/* Controls */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={handlePause}
          className={`px-4 py-1.5 rounded-full font-medium text-white ${!isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}>
          {isActive ? '⏸️ Pause' : '▶️ Resume'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-medium">
          ♻️ Reset
        </button>
        <button
          onClick={skipToNext}
          className="
          mt-4 w-full py-2 px-4
          bg-orange-500 hover:bg-orange-600 text-white
          rounded font-medium transition
          flex items-center justify-center space-x-2">
          ⏭️ <span>Skip to Next Engineer</span>
        </button>
      </div>
    </div>
  );
}
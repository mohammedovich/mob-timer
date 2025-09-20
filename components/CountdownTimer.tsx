'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useSessionContext } from './SessionContext';

interface CountdownTimerProps {
  duration: number;
  onEnd?: () => void;
}

// Themed Messages
const themedMessages: Record<string, ((m: number, s: number) => string)[]> = {
  default: [
    (m) => `${m} min left — keep going!`,
    () => "Keep calm and pair on.",
    () => "No bugs were harmed… yet.",
    () => "Is this the driver or the backseat coder?",
    () => "Git commit -m 'WTF'",
    () => "This function could be simpler…",
    () => "Wait, did we save?",
    () => "It works on my machine!",
    () => "Just one more line…",
  ],
  pirate: [
    (m, s) => m > 0 ? `⚓ ${m} minutes till mutiny!` : '🏴‍☠️ WALK THE PLANK!',
    () => "Yarr! That code be cursed!",
    () => "Full sail ahead, matey!",
    () => "Where be the treasure? In the merge request!",
    () => "Batten down the hatches!",
    () => "Squawk! Refactor that method!",
    () => "Dead men tell no lies... but this bug does!",
  ],
  robot: [
    (m, s) => m > 0 ? `⏱️ ${m} minutes until reboot.` : '🚨 SYSTEM OVERLOAD!',
    () => "Beep boop. Optimal coding path engaged.",
    () => "Error 418: I am a teapot.",
    () => "Processing... please remain stationary.",
    () => "Logic levels nominal.",
    () => "Emotion chip: overloaded.",
    () => "Recalibrating driver role...",
  ],
  hacker: [
    (m, s) => m > 0 ? `🔓 ${m} min until hack complete...` : '🎉 SYSTEM ROOTED!',
    () => "Accessing mainframe...",
    () => "Firewall breached.",
    () => "Encrypting thoughts...",
    () => "sudo make me a sandwich",
    () => "Exploiting human error...",
    () => "Decrypting coffee supply...",
  ],
  dino: [
    (m, s) => m > 0 ? `🦖 ${m} min since last meteor!` : '☄️ RUN FOR YOUR LIFE!',
    () => "Rawr! Bad code detected!",
    () => "Code chase: C++ vs Java",
    () => "Extinction-level refactor incoming!",
    () => "Did someone say ‘Jurassic Stack’?",
    () => "This branch is a fossil.",
    () => "Debugging like it’s 99 million BC",
  ],
};

const getThemedMessage = (minutes: number, seconds: number, theme: string) => {
  const pool = themedMessages[theme] || themedMessages.default;
  const generator = pool[Math.floor(Math.random() * pool.length)];
  return generator(minutes, seconds);
};

const getEmoji = (minutes: number, seconds: number, theme: string) => {
  if (minutes === 0 && seconds <= 10) return '💥🔥⏰';
  if (seconds <= 0) return '🎉🚀👾';

  const map: Record<string, string[]> = {
    default: ['👨‍💻', '☕', '👀', '💡'],
    pirate: ['🏴‍☠️', '⚓', '💀', '🪙'],
    robot: ['🤖', '🔋', '⚙️', '📡'],
    hacker: ['🕶️', '💾', '🔓', '🌐'],
    dino: ['🦖', '🦕', '🌋', '🦴'],
  };

  const emojis = map[theme] || map.default;
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export default function CountdownTimer({ duration, onEnd }: CountdownTimerProps) {
  const { messageTheme } = useSessionContext(); // Get current theme
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [message, setMessage] = useState<string>(() => getThemedMessage(duration, 0, messageTheme));
  const [emoji, setEmoji] = useState<string>(() => getEmoji(duration, 0, messageTheme));

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        const newTime = t - 1;
        const mins = Math.floor(newTime / 60);
        const secs = newTime % 60;

        setMessage(getThemedMessage(mins, secs, messageTheme));
        setEmoji(getEmoji(mins, secs, messageTheme));

        if (newTime <= 0) {
          clearInterval(interval);
          onEnd?.();

          // 💥 MASSIVE CONFETTI EXPLOSION
          confetti({
            particleCount: 300,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
            ticks: 300,
            gravity: 0.4,
            drift: 1,
            shapes: ['star', 'circle', 'square'],
            scalar: 1.4,
            disableForReducedMotion: true,
          });

          // Extra bursts after delay
          setTimeout(() => {
            confetti({
              particleCount: 100,
              angle: 60,
              spread: 52,
              origin: { x: 0 },
              colors: ['#ffcc00', '#ff6600', '#cc00ff'],
            });
            confetti({
              particleCount: 100,
              angle: 120,
              spread: 52,
              origin: { x: 1 },
              colors: ['#00ccff', '#00ff66', '#ff0066'],
            });
          }, 500);

          setIsActive(false);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onEnd, messageTheme]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => setIsActive(prev => !prev);
  const handleReset = () => setTimeLeft(duration * 60);

  const isUrgent = timeLeft <= 10;
  const isPaused = !isActive;

  return (
    <div className="mt-6 p-5 border-4 rounded-xl bg-gradient-to-b shadow-lg transition-all duration-300">
      {/* Timer Display */}
      <div
        className={`
          text-center font-mono text-5xl font-bold mb-3 tabular-nums
          ${isUrgent ? 'text-red-600 animate-pulse' : 'text-blue-700 dark:text-blue-400'}
          ${isPaused ? 'opacity-70' : ''}
          group
        `}
        style={{
          textShadow: isUrgent ? '0 0 8px red' : '0 1px 0 #ddd',
        }}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Emoji */}
      <div className="text-4xl mb-2 animate-bounce group-hover:animate-none">
        {emoji}
      </div>

      {/* Fun Themed Message */}
      <p
        className={`
          text-sm italic px-3 py-1.5 rounded-md
          ${isUrgent 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
            : 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'}
          transition-colors duration-300
        `}
      >
        {message}
      </p>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={handlePause}
          className={`
            px-4 py-1.5 rounded-full font-medium transition
            ${isPaused 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'}
          `}
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-medium transition"
        >
          ♻️ Reset
        </button>
      </div>

      {/* Wiggle Warning */}
      {isUrgent && (
        <div
          className="animate-wiggle mt-2 text-xs text-center text-red-500"
          style={{ animation: 'wiggle 0.7s ease-in-out infinite' }}>
          ⚠️ HURRY UP!
        </div>
      )}
    </div>
  );
}
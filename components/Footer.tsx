'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

// App version (update manually or via script)
const APP_VERSION = 'v0.0.1';

export default function Footer() {
  const [hasCoffeed, setHasCoffeed] = useState(false);

  const triggerConfetti = () => {
    // Celebrate!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#ef4444', '#8b5cf6'],
      ticks: 200,
    });

    setHasCoffeed(true);
  };

  return (
    <footer className="mt-12 mb-8 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm leading-none">
        {/* Buy Me a Coffee Button */}
        <a
          href="https://buymeacoffee.com/mohammedovich" // 🔁 Replace with your link
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerConfetti}
          className="
            group flex items-center space-x-1.5
            px-4 py-1.5
            bg-gradient-to-r from-yellow-400 to-orange-500
            text-white font-medium rounded-full
            hover:from-yellow-500 hover:to-orange-600
            transform transition-all duration-200
            hover:scale-105 hover:shadow-md focus:outline-none
            relative overflow-hidden
          "
        >
          <span
            className={`
              transform transition-transform duration-200
              ${hasCoffeed ? 'rotate-180' : 'group-hover:rotate-12'}
            `}
          >
            ☕
          </span>
          <span className="whitespace-nowrap">
            {hasCoffeed ? 'Thanks! ❤️' : 'Buy Me a Coffee'}
          </span>
        </a>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-gray-300 dark:bg-gray-600"></div>

        {/* GitHub Link */}
        <a
          href="https://github.com/mohammedovich/mob-timer" // 🔁 Replace
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82.87.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span>Source Code</span>
        </a>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-gray-300 dark:bg-gray-600"></div>

        {/* Credit + Version */}
        <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <span>Made with ❤️</span>
          <span className="mx-1">•</span>
          <span className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
            {APP_VERSION}
          </span>
        </p>
      </div>
    </footer>
  );
}
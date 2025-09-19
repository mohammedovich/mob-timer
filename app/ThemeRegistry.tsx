'use client';

import { useEffect, useState } from 'react';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // On mount, read from localStorage or prefer-color-scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
    document.documentElement.classList.remove(initialTheme === 'dark' ? 'light' : 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Hide UI until mounted (avoid FOUC)
  if (!mounted) {
    return (
      <div style={{ display: 'none' }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Render children only after theme is ready */}
      <div style={{ position: 'relative' }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="
            fixed top-4 right-4 z-50 
            w-10 h-10 rounded-full shadow-md
            flex items-center justify-center
            text-lg border-2 transition-all duration-300
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-yellow-200
            border-gray-300 dark:border-gray-600
            hover:scale-110 hover:shadow-lg
          "
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {children}
      </div>
    </>
  );
}
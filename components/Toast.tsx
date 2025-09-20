'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type ToastProps = {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
};

const bgColor = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
};

export default function Toast({ show, message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 150); // Match exit animation
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        transform transition-transform duration-300 ease-out
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
      role="alert"
    >
      <div className={`${bgColor[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-64 max-w-xs`}>
        <span className="truncate">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="flex-shrink-0 hover:text-gray-200"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
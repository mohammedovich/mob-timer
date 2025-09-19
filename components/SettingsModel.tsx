'use client';

import { useSessionContext } from './SessionContext'; // Make sure path is correct
import { useState } from 'react';

export default function SettingsModal() {
  const {
    settingsOpen,
    closeSettings,
    exportConfig,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    clearHistory,
    importConfig, // ← Destructure importConfig here
  } = useSessionContext(); // ✅ Hook used at top level

  const [fileError, setFileError] = useState<string | null>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    // ✅ Move logic into onload, but use values captured from context above
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        // ✅ Now call importConfig — it's already from the hook!
        importConfig(data);
        setFileError(null);
      } catch (err) {
        const errorMsg = 'Failed to parse JSON file.';
        setFileError(errorMsg);
        console.error(errorMsg, err);
      }
    };

    reader.readAsText(file);
  };

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">⚙️ Settings</h3>

        {/* Theme Toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <span>🌙 Dark Mode</span>
          </label>
        </div>

        {/* Sound Toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={soundEnabled} onChange={toggleSound} />
            <span>🔊 Sound Alerts</span>
          </label>
        </div>

        {/* Import / Export */}
        <div className="mb-6 border-t pt-4">
          <button onClick={exportConfig} className="btn btn-primary w-full mb-3">
            📥 Export Config
          </button>

          <label className="btn btn-secondary w-full cursor-pointer text-center">
            📤 Import Config
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
        </div>

        {/* Clear History */}
        <div className="mb-6">
          <button onClick={clearHistory} className="btn btn-danger w-full">
            🗑️ Clear History
          </button>
        </div>

        {/* Close Button */}
        <button onClick={closeSettings} className="btn btn-secondary w-full">
          Close
        </button>
      </div>
    </div>
  );
}
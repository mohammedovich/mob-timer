'use client';

import { useSessionContext } from './SessionContext';

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
  } = useSessionContext();

  if (!settingsOpen) return null;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        useSessionContext().importConfig(data);
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full animate-in slide-in-from-bottom-8">
        <h3 className="text-2xl font-bold mb-4">⚙️ Settings</h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
              <span>🌙 Dark Mode</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={soundEnabled} onChange={toggleSound} />
              <span>🔊 Sound Alerts</span>
            </label>
          </div>

          <div>
            <button onClick={exportConfig} className="btn btn-primary w-full mb-2">
              📥 Export Config
            </button>
            <label className="btn btn-secondary w-full cursor-pointer">
              📤 Import Config
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <div>
            <button onClick={clearHistory} className="btn btn-danger w-full">
              🗑️ Clear History
            </button>
          </div>
        </div>

        <button onClick={closeSettings} className="btn btn-secondary w-full mt-4">
          Close
        </button>
      </div>
    </div>
  );
}
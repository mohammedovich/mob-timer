'use client';

import { useSessionContext } from './SessionContext';
import { useState } from 'react';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Trash2,
  MessageCircle,
  Settings,
  Save,
} from 'lucide-react';

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
    importConfig,
    messageTheme,
    setMessageTheme,
    showToast,
  } = useSessionContext();

  const [fileError, setFileError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'data'>('general');

  if (!settingsOpen) return null;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        importConfig(data);
        setFileError(null);
        showToast('Config imported successfully!', 'success');
      } catch (err) {
        const errorMsg = 'Failed to parse JSON file.';
        setFileError(errorMsg);
        showToast(errorMsg, 'error');
        console.error(errorMsg, err);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    exportConfig();
    showToast('Config exported!', 'info');
  };

  const handleClearHistory = () => {
    clearHistory();
    showToast('History cleared.', 'success');
  };

  const savePreferences = () => {
    showToast('Preferences saved!', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeSettings}
    >
      <div
        className="w-full max-w-md mx-4 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold flex items-center text-gray-900 dark:text-gray-100">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </h3>

          {/* Tabs */}
          <div className="flex mt-4 space-x-1">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'data', label: 'Data', icon: Save },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'general' | 'data')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`
                    w-10 h-5 flex items-center rounded-full p-1 transition
                    ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 bg-white rounded-full shadow transform transition-transform
                      ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                  <span>Sound Alerts</span>
                </div>
                <button
                  onClick={toggleSound}
                  className={`
                    w-10 h-5 flex items-center rounded-full p-1 transition
                    ${soundEnabled ? 'bg-green-600' : 'bg-gray-300'}
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 bg-white rounded-full shadow transform transition-transform
                      ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Message Theme */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <label className="font-medium">Message Theme</label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['default', 'pirate', 'robot', 'hacker', 'dino'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setMessageTheme(t);
                        showToast(`Theme set to ${t}`, 'info');
                      }}
                      className={`
                        px-2 py-1 text-xs capitalize rounded
                        ${messageTheme === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={savePreferences}
                className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center space-x-2 transition"
              >
                <Save size={16} />
                <span>Save Preferences</span>
              </button>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <button
                onClick={handleExport}
                className="w-full flex items-center space-x-2 p-3 border border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <Download size={18} />
                <span>Export Configuration</span>
              </button>

              <label className="w-full flex items-center space-x-2 p-3 border border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition">
                <Upload size={18} />
                <span>Import Configuration</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              {fileError && (
                <p className="text-red-500 text-sm">{fileError}</p>
              )}

              <button
                onClick={handleClearHistory}
                className="w-full flex items-center space-x-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
              >
                <Trash2 size={18} />
                <span>Clear Session History</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end">
          <button
            onClick={closeSettings}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
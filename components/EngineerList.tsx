// components/EngineerList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSessionContext } from './SessionContext';

export default function EngineerList() {
  const {
    availableEngineers,
    selectedEngineers,
    toggleEngineer,
    addEngineer,
    removeEngineer,
  } = useSessionContext();

  const [newName, setNewName] = useState('');
  const [isClient, setIsClient] = useState(false);


    // Prevent SSR mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Engineers</h2>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleAdd = () => {
    const success = addEngineer(newName);
    if (success) {
      setNewName('');
    } else {
      alert('Please enter a valid, unique name.');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Select Engineers</h2>

      <ul className="space-y-2 mb-4">
        {availableEngineers.map((name) => (
          <li key={name} className="list-item justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`eng-${name}`}
                checked={selectedEngineers.includes(name)}
                onChange={() => toggleEngineer(name)}
                className="checkbox"
              />
              <label htmlFor={`eng-${name}`}>{name}</label>
            </div>
            <button
              onClick={() => removeEngineer(name)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Engineer */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New engineer name"
          className="flex-grow border rounded px-3 py-1 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="btn btn-primary text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
// components/SessionController.tsx
'use client';

import { useSessionContext } from './SessionContext';
import EngineerList from './EngineerList';
import TimerSelector from './TimerSelector';
import CountdownTimer from './CountdownTimer';
import RoleAssignment from './RoleAssignment';
import HistoryPanel from './HistoryPanel';

export default function SessionController() {
  const {
    selectedEngineers,
    selectedTime,
    sessionStarted,
    currentEngineers,
    startSession,
    resetSession,
    currentRoles,
  } = useSessionContext();

  return (
    <div className="container max-w-2xl mx-auto">
      {!sessionStarted ? (
  <>
    <EngineerList />
    <TimerSelector />
    <button
      onClick={startSession}
      disabled={selectedEngineers.length === 0}
      className={`
        mt-4 w-full py-3 text-white font-bold text-lg rounded-lg shadow-lg
        transition-all duration-200 transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700
        ${
          selectedEngineers.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
        }
      `}
    >
      ▶️ Start Mob Session ({selectedEngineers.length})
    </button>

  </>
) : (
  <div>
    <h2 className="text-2xl font-bold text-green-700 mb-4">Mob Team Ready!</h2>
    <p>
      <strong>Team:</strong> {currentEngineers.join(', ')}
    </p>
    <p>
      <strong>Duration:</strong> {selectedTime} minutes
    </p>

    <CountdownTimer duration={selectedTime} onEnd={() => alert("Time's up! Rotate roles.")} />

    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `Mob Team: ${currentEngineers.join(', ')}\nDuration: ${selectedTime} minutes`
        );
        alert('Team copied to clipboard!');
      }}
      className="btn btn-primary mt-2 text-sm">
      📋 Copy Team
    </button>
    <RoleAssignment />
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            `Mob Team: ${currentEngineers.join(', ')}\nRoles:\n${Object.entries(currentRoles)
              .map(([n, r]) => `  ${n} → ${r}`)
              .join('\n')}\nDuration: ${selectedTime} min`
          );
          alert('Team and roles copied!');
        }}
        className="btn btn-primary mt-2 text-sm">
        📋 Copy Team & Roles
      </button>
    <HistoryPanel />

    <button onClick={resetSession} className="btn btn-primary mt-6">
      Back to Setup
    </button>
  </div>
)}
    </div>
  );
}
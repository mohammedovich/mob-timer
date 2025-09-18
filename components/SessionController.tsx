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
    <div>
      {!sessionStarted ? (
  <>
    <EngineerList />
    <TimerSelector />
    <button onClick={startSession} className="btn btn-start mt-4">
      Start Mob Session
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
      className="btn btn-primary mt-2 text-sm"
    >
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
        className="btn btn-primary mt-2 text-sm"
      >
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
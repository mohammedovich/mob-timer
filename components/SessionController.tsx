// components/SessionController.tsx
'use client';

import { useSessionContext } from './SessionContext';
import EngineerList from './EngineerList';
import TimerSelector from './TimerSelector';
import CountdownTimer from './CountdownTimer';

export default function SessionController() {
  const {
    selectedEngineers,
    selectedTime,
    sessionStarted,
    currentEngineers,
    startSession,
    resetSession,
  } = useSessionContext();

  return (
    <div>
      {!sessionStarted ? (
        <>
          {/* Optional debug */}
          {/* <pre>{JSON.stringify(selectedEngineers)}</pre> */}

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

          <button onClick={resetSession} className="btn btn-primary mt-6">
            Back to Setup
          </button>
        </div>
      )}
    </div>
  );
}
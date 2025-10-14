'use client';

import { useSessionContext } from './SessionContext';
import EngineerList from './EngineerList';
import TimerSelector from './TimerSelector';
import CountdownTimer from './CountdownTimer';
import RotationQueue from './RotationQueue';
import RoleAssignment from './RoleAssignment';
import HistoryPanel from './HistoryPanel';
import SettingsModal from './SettingsModel';
import Toast from './Toast';
import Link from 'next/link';

export default function SessionController() {
  const {
    selectedEngineers,
    selectedTime,
    sessionStarted,
    currentEngineers,
    startSession,
    resetSession,
    currentRoles,
    openSettings,
    showToast,
    toast,
    assignRoles,
    setCurrentEngineers,
    setNextEngineers,
    setLastDriver,
    setCurrentRoles,
    setDriverQueue,
  } = useSessionContext();

  const handleTimeUp = () => {
    console.log('Time is up! Rotating…');

    setDriverQueue((prev) => {
      if (prev.length <= 1) return prev;

      // Get last driver to avoid repetition
      const lastDriver = Object.keys(currentRoles).find(name => currentRoles[name] === 'Driver') || null;
      setLastDriver(lastDriver);

      // Move first engineer to the end
      const [first, ...rest] = prev;
      const newQueue = [...rest, first];

      // Reassign roles with new top-of-queue as driver
      const nextTeam = [
        newQueue[0], // new driver
        ...selectedEngineers
          .filter(e => e !== newQueue[0])
          .sort(() => 0.5 - Math.random())
          .slice(0, [...selectedEngineers].length)
      ];

      const newRoles = assignRoles(nextTeam, lastDriver) as Record<string, "Driver" | "Navigator" | "Observer">;;
      setCurrentEngineers(nextTeam);
      setCurrentRoles(newRoles);

      // Optional: update nextEngineers for future rounds
      const newDriver = Object.keys(newRoles).find(name => newRoles[name] === 'Driver');
      const remaining = selectedEngineers.filter(e => !nextTeam.includes(e));
      const nextPool = remaining.length > 0 ? remaining : selectedEngineers.filter(e => e !== newDriver);
      const nextDriver = nextPool.sort(() => 0.5 - Math.random())[0];
      setNextEngineers([nextDriver]);

      // Persist updated queue
      return newQueue;
    });
  };

  return (
    <div className="container max-w-2xl mx-auto">
      {!sessionStarted ? (
        <>
          <EngineerList />
          <TimerSelector />
          <SettingsModal />
          <Toast
            show={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => showToast('', 'success')} // Just hides
          />
          <button
            onClick={openSettings}
            className="
        fixed top-4 right-4
        w-12 h-12
        flex items-center justify-center
        text-xl
        bg-blue-600 hover:bg-blue-700
        text-white rounded-full
        shadow-lg
        transition-transform duration-200 hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-blue-300
        z-50" aria-label="Open settings">
            ⚙️
          </button>
          <button
            onClick={startSession}
            disabled={selectedEngineers.length === 0}
            className={`
        mt-4 w-full py-3 text-white font-bold text-lg rounded-lg shadow-lg
        transition-all duration-200 transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700
        ${selectedEngineers.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
              }
      `}>
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
          <CountdownTimer duration={selectedTime} onEnd={handleTimeUp} />

          <RotationQueue />
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
      <p className="text-center mt-4 text-sm">
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
}
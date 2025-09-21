'use client';

import { useSessionContext } from './SessionContext';

export default function RotationQueue() {
  const { driverQueue, currentRoles } = useSessionContext();

  if (!driverQueue || driverQueue.length === 0) return null;

  const currentDriver = Object.keys(currentRoles).find(
    (name) => currentRoles[name] === 'Driver'
  );

  const upcoming = driverQueue.filter((name) => name !== currentDriver);

  return (
    <div className="mt-6 p-4 rounded-lg border-l-4 border-blue-400">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">🔁 Rotation Queue</h3>

      <div className="mt-3 space-y-2">
        {/* Current Driver */}
        <div className="flex items-center gap-3 text-green-700 dark:text-green-400 font-medium">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-200 dark:bg-green-800 rounded-full text-xs font-bold">
            🚘
          </span>
          <span>
            <strong>Now:</strong> {currentDriver || 'No driver'}
          </span>
        </div>

        {/* Upcoming */}
        <div className="space-y-1 mt-2">
          {upcoming.length > 0 ? (
            upcoming.map((name, index) => (
              <div key={name} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <span>
                  <strong>{index === 0 ? 'Next' : `#${index + 1}`}</strong>: {name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Only one engineer — no queue</p>
          )}
        </div>
      </div>

      {/* Total Count */}
      <p className="mt-3 text-xs text-blue-600 dark:text-blue-400">
        {driverQueue.length} engineers in rotation
      </p>
    </div>
  );
}
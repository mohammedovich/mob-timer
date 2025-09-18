'use client';

import { useSessionContext } from './SessionContext';
import { format } from 'date-fns';

export default function HistoryPanel() {
  const { history } = useSessionContext();

  if (history.length === 0) return <p className="text-sm text-gray-500">No session history yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">🕒 Recent Sessions</h3>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((entry) => (
          <li key={entry.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-700 text-sm">
            <p>
              <strong>Team:</strong> {entry.team.join(', ')}
            </p>
            <p>
              <strong>Duration:</strong> {entry.duration} min
            </p>
            <p>
              <strong>When:</strong> {format(entry.timestamp, 'MMM d, HH:mm')}
            </p>
            <details className="mt-1">
              <summary className="cursor-pointer underline">Roles</summary>
              <ul className="ml-4 list-disc">
                {Object.entries(entry.roles).map(([name, role]) => (
                  <li key={name}>{name}: <span className="capitalize">{role}</span></li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
'use client';

import { useSessionContext } from './SessionContext';

export default function RoleAssignment() {
  const { currentRoles } = useSessionContext();

  if (!currentRoles || Object.keys(currentRoles).length === 0) return null;

  return (
    <div className="mt-4 p-3 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
      <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Roles Assigned:</h3>
      <ul className="mt-1 text-sm">
        {Object.entries(currentRoles).map(([name, role]) => (
          <li key={name}>
            <strong>{name}</strong>: <span className="capitalize">{role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
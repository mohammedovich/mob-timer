'use client';
import { useSessionContext } from './SessionContext';
import type { EngineersData } from '../types';

export default function EngineerList() {
  const { selectedEngineers, toggleEngineer } = useSessionContext();
  const data = require('../data/engineers.json') as EngineersData;
  const { engineers } = data;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Select Engineers</h2>
      <ul className="space-y-2">
        {engineers.map((name) => (
          <li key={name} className="list-item">
            <input
              type="checkbox"
              id={`eng-${name}`}
              checked={selectedEngineers.includes(name)}
              onChange={() => toggleEngineer(name)}
              className="checkbox"
            />
            <label htmlFor={`eng-${name}`}>{name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
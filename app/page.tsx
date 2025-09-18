// app/page.tsx
import SessionController from '../components/SessionController';
import { SessionProvider } from '../components/SessionContext';
import './globals.css';

export default function Home() {
  return (
    <SessionProvider>
      <div className="container mx-auto p-6">
        <h1>Mob Programming Session</h1>
        <SessionController />
      </div>
    </SessionProvider>
  );
}
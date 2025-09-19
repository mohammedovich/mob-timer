// app/page.tsx
import SessionController from '../components/SessionController';
import { SessionProvider } from '../components/SessionContext';
import Footer from '../components/Footer'
import './globals.css';

export default function Home() {
  return (
    <SessionProvider>
      <div className="container mx-auto p-6">
      <h1>Mob Programming Session</h1>
      <SessionController />
      <Footer />
      </div>
    </SessionProvider>
  );
}
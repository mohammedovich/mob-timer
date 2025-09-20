// app/app/page.tsx
'use client';

import { SessionProvider } from '../../components/SessionContext';
import SessionController from '../../components/SessionController';
import Footer from '../../components/Footer';
import './app.css'; // Optional: scoped styles

export default function AppPage() {
  return (
    <SessionProvider>
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
         Pair Wise, Made Fair & Fun
        </h1>
        <SessionController />
        <Footer />
      </div>
    </SessionProvider>
  );
}
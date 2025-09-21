// app/layout.tsx
import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
          <Analytics />
        </ThemeRegistry>
      </body>
    </html>
  );
}
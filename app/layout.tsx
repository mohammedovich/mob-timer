// app/layout.tsx
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light"> {/* class will be updated by JS */}
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'realntoffice - Open Source Scalable Virtual Office',
  description: 'Adaptive virtual office platform supporting low scale to high scale remote organizations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fbfbfa] text-[#252724] antialiased">
        {children}
      </body>
    </html>
  );
}

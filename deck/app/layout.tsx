import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Field Notes — The Atlas Collection',
  description: 'Two independent visual talks about the new vocabulary of AI progress.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

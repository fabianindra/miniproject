import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import './styles.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Break Event Point',
  description: 'your most trusted event hub!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh'}}>
        <Nav />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
        {children}
        </div>
      </body>
    </html>
  );
}

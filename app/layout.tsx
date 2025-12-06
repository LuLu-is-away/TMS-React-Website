import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Murder Scene',
  description: "Community hub for The Murder Scene Garry's Mod server.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-zinc-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-6 text-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} The Murder Scene. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
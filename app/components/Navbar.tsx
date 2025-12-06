'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Rules', path: '/rules' },
  { name: 'Announcements', path: 'https://steamcommunity.com/groups/TheMurderScene/announcements/listing'},
  { name: 'Staff', path: '/staff' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="text-xl font-bold text-red-600 tracking-wider uppercase">
            The Murder Scene
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-white border-b-2 border-red-600' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
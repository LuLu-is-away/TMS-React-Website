'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  /**
   * Helper function to determine the common classes based on the current path.
   * @param path The path of the navigation item.
   * @returns Tailwind CSS class string.
   */
  const getLinkClasses = (path: string) => {
    // The link for 'Announcements' is external and won't match the pathname, 
    // so we handle it by only checking internal paths for 'isActive'.
    const isActive = pathname === path; 
    
    const baseClasses = 'text-sm font-medium transition-colors duration-200';
    const activeClasses = 'text-white border-b-2 border-red-600';
    const inactiveClasses = 'text-zinc-400 hover:text-white';

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

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
            
            {/* 1. Home */}
            <Link
              href="/"
              className={getLinkClasses('/')}
            >
              Home
            </Link>

            {/* 2. Rules */}
            <Link
              href="/rules"
              className={getLinkClasses('/rules')}
            >
              Rules
            </Link>

            <Link
              href="https://steamcommunity.com/groups/TheMurderScene/announcements/listing"
              className={getLinkClasses('')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Announcements
            </Link>

            {/* 4. Staff */}
            <Link
              href="/staff"
              className={getLinkClasses('/staff')}
            >
              Staff
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
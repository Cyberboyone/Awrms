import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { Bell, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import React from 'react';
import { useToast } from '../hooks/use-toast';

interface TopNavLayoutProps {
  children: React.ReactNode;
  publicMode?: boolean;
}

function UniversityEmblem() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 shrink-0">
      <circle cx="30" cy="30" r="29" fill="#2D6A4F" stroke="#a3d9a5" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
      {/* Shield */}
      <path d="M30 12 L44 17 L44 32 C44 40 38 45 30 48 C22 45 16 40 16 32 L16 17 Z"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      {/* Recycle symbol simplified */}
      <path d="M30 21 L33 26 L30 26 L30 31 L33 31 M33 31 L30 36 L27 31 L30 31"
        fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25 24 L27 21 L30 21" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M27 37 L30 36 L30 39" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Stars at bottom */}
      <circle cx="22" cy="46" r="1.5" fill="#f5d76e"/>
      <circle cx="30" cy="49" r="1.5" fill="#f5d76e"/>
      <circle cx="38" cy="46" r="1.5" fill="#f5d76e"/>
    </svg>
  );
}

export function TopNavLayout({ children, publicMode = true }: TopNavLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const { toast } = useToast();

  const navLinks = publicMode
    ? [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'Services', path: '/services' },
        { title: 'How It Works', path: '/how-it-works' },
        { title: 'Contact Us', path: '/contact' },
      ]
    : [
        { title: 'Home', path: '/home' },
        { title: 'About Us', path: '/about' },
        { title: 'Services', path: '/services' },
        { title: 'How It Works', path: '/how-it-works' },
        { title: 'Reports', path: '/reports' },
      ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Top Navbar */}
      <header className="bg-[#1B4332] text-white h-[72px] shrink-0 sticky top-0 z-50">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href={publicMode ? '/' : '/home'} className="flex items-center gap-3">
            <UniversityEmblem />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[15px] text-white">Sa'adu Zungur University</span>
              <span className="text-[11px] text-white/70">Waste Recycling Management System</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              return (
                <Link
                  key={link.title}
                  href={link.path}
                  className={`text-sm font-medium transition-colors relative pb-1 ${
                    isActive ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {publicMode ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white px-4 py-2 border border-white/40 rounded-md transition-colors hover:bg-white/10 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-[#2D6A4F] text-white px-4 py-2 rounded-md hover:bg-[#22503a] transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Bell with badge */}
                <button onClick={() => toast({ title: 'Notifications', description: 'You have 4 unread notifications.' })} className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">4</span>
                </button>

                {/* Avatar + name */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 rounded-lg transition-colors outline-none">
                      <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                          <circle cx="16" cy="16" r="16" fill="#cbd5e1"/>
                          <circle cx="16" cy="13" r="5" fill="#94a3b8"/>
                          <ellipse cx="16" cy="26" rx="9" ry="6" fill="#94a3b8"/>
                        </svg>
                      </div>
                      <div className="hidden sm:flex flex-col leading-tight text-left">
                        <span className="text-sm font-medium text-white">Welcome,</span>
                        <span className="text-sm font-bold text-white">{user?.full_name?.split(' ')[0] || 'Admin'}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-white/70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex w-full cursor-pointer items-center">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                      onClick={logout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white py-5 shrink-0">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/70">
            © 2026 Sa'adu Zungur University. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

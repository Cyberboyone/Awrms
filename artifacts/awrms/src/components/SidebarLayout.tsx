import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Trash2,
  ClipboardList,
  Recycle,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  ChevronDown,
  Megaphone
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';

interface SidebarLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageIcon?: React.ComponentType<{ className?: string }>;
}

function UniversityEmblem() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="38" fill="#1a5c3a" stroke="#ffffff" strokeWidth="2"/>
      <circle cx="40" cy="40" r="32" fill="none" stroke="#a3d9a5" strokeWidth="1"/>
      {/* Shield */}
      <path d="M40 18 L56 24 L56 42 C56 52 48 58 40 62 C32 58 24 52 24 42 L24 24 Z"
        fill="#2d7a4f" stroke="#a3d9a5" strokeWidth="1.5"/>
      {/* Recycle symbol */}
      <path d="M40 28 L44 34 L40 34 L40 40 L44 40 M44 40 L40 46 L36 40 L40 40"
        fill="none" stroke="#a3d9a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33 31 L37 28 L40 28" fill="none" stroke="#a3d9a5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 47 L40 46 L40 50" fill="none" stroke="#a3d9a5" strokeWidth="2" strokeLinecap="round"/>
      {/* Stars */}
      <circle cx="28" cy="56" r="2" fill="#f5d76e"/>
      <circle cx="40" cy="60" r="2" fill="#f5d76e"/>
      <circle cx="52" cy="56" r="2" fill="#f5d76e"/>
    </svg>
  );
}

export function SidebarLayout({ children, pageTitle, pageIcon: PageIcon }: SidebarLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { title: 'User Management', icon: Users, path: '/users', hasChevron: true },
    { title: 'Waste Management', icon: Trash2, path: '/waste', hasChevron: true },
    { title: 'Collection Requests', icon: ClipboardList, path: '/requests', badge: 12 },
    { title: 'Recycling Management', icon: Recycle, path: '/recycling', hasChevron: true },
    { title: 'Reports & Analytics', icon: BarChart3, path: '/reports' },
    { title: 'Notifications', icon: Bell, path: '/notifications', badge: 5 },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-[200px] bg-[#1B4332] text-white flex flex-col transition-transform duration-300 shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo / University Name */}
        <div className="p-5 flex flex-col items-center gap-3 border-b border-white/10 shrink-0">
          <div className="w-16 h-16 shrink-0">
            <UniversityEmblem />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-sm leading-snug text-white">Sa'adu Zungur<br/>University</h1>
            <p className="text-[10px] text-white/60 mt-0.5 leading-snug">Waste Recycling Management<br/>System</p>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-3">
          <nav className="px-2 space-y-0.5">
            {navItems.map((item) => {
              const isActive = location === item.path || (item.path !== '/admin' && location.startsWith(item.path));
              return (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-[13px] font-medium ${
                    isActive
                      ? 'bg-[#2D6A4F] text-white'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.badge && (
                    <span className="bg-[#2D6A4F] text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  )}
                  {item.hasChevron && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/40 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <Link
            href="/logout"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-[13px] font-medium ${
              location === '/logout' ? 'bg-[#2D6A4F] text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header bar */}
        <header className="h-[60px] bg-white border-b flex items-center justify-between px-5 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-3">
            <button
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            {PageIcon && <PageIcon className="h-5 w-5 text-[#1B4332]" />}
            <h2 className="text-base font-bold text-[#1B4332]">{pageTitle}</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Bell */}
            <button onClick={() => toast({ title: 'Notifications', description: 'You have 5 unread notifications.' })} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1B4332] text-white text-[9px] font-bold rounded-full flex items-center justify-center">5</span>
            </button>
            {/* Settings */}
            <button onClick={() => toast({ title: 'Settings', description: 'Settings page coming soon.' })} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            {/* Avatar + Name */}
            <div className="flex items-center gap-2 ml-1 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                  <circle cx="16" cy="16" r="16" fill="#e2e8f0"/>
                  <circle cx="16" cy="13" r="5" fill="#94a3b8"/>
                  <ellipse cx="16" cy="26" rx="9" ry="6" fill="#94a3b8"/>
                </svg>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-slate-800">{user?.full_name?.split(' ')[0] || 'Admin'}</span>
                <span className="text-xs text-slate-400 capitalize">{user?.role || 'Administrator'}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
          {/* Footer */}
          <footer className="border-t py-4 bg-white mt-4">
            <p className="text-center text-sm text-slate-400">
              © 2026 Sa'adu Zungur University. All Rights Reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

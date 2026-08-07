import { SidebarLayout } from '../components/SidebarLayout';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function Logout() {
  const { logout } = useAuth();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    setLoggedOut(true);
    setTimeout(() => {
      logout();
    }, 2000);
  };

  return (
    <SidebarLayout pageTitle="Logout" pageIcon={LogOut}>
      {/* Background: subtle city + recycling bin illustration */}
      <div className="relative min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        {/* Decorative background SVG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <LogoutBackgroundIllustration />
        </div>

        {/* Confirmation card */}
        <div className="relative z-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-10 w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#F0FFF4] border-2 border-[#C6E5D0] flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Logout</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-7">
            Are you sure you want to logout from the<br/>Waste Recycling Management System?
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogout}
              disabled={loggedOut}
              className="w-full flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#153427] text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-70"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              {loggedOut ? 'Logging out...' : 'Yes, Logout'}
            </button>
            <Link
              href="/admin"
              className="w-full flex items-center justify-center py-3 rounded-md border border-slate-200 text-[#1B4332] font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Thank you message — shown below after action */}
        {loggedOut && (
          <div className="relative z-10 flex items-center gap-3 mt-6">
            <div className="w-9 h-9 rounded-full bg-[#1B4332] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-5 w-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Thank you!</p>
              <p className="text-slate-500 text-xs">You have been logged out successfully.</p>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

function LogoutBackgroundIllustration() {
  return (
    <svg viewBox="0 0 900 550" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* City silhouette */}
      <rect x="0" y="300" width="900" height="250" fill="#c8e6c9"/>
      {/* Buildings left */}
      <rect x="20" y="180" width="60" height="130" fill="#a5d6a7" rx="2"/>
      <rect x="35" y="160" width="30" height="25" fill="#a5d6a7" rx="1"/>
      <rect x="90" y="220" width="80" height="90" fill="#b2dfdb" rx="2"/>
      <rect x="180" y="190" width="50" height="120" fill="#a5d6a7" rx="2"/>
      <rect x="240" y="160" width="90" height="150" fill="#b2dfdb" rx="2"/>
      <rect x="260" y="140" width="50" height="25" fill="#b2dfdb" rx="1"/>
      {/* Buildings right */}
      <rect x="780" y="190" width="60" height="120" fill="#a5d6a7" rx="2"/>
      <rect x="690" y="210" width="80" height="100" fill="#b2dfdb" rx="2"/>
      <rect x="630" y="170" width="50" height="140" fill="#a5d6a7" rx="2"/>
      <rect x="560" y="200" width="60" height="110" fill="#b2dfdb" rx="2"/>
      {/* Trees */}
      <rect x="355" y="280" width="14" height="60" fill="#8B6914" rx="3"/>
      <circle cx="362" cy="265" r="35" fill="#2D6A4F"/>
      <rect x="525" y="275" width="14" height="65" fill="#8B6914" rx="3"/>
      <circle cx="532" cy="260" r="35" fill="#2D6A4F"/>
      {/* Large recycling bin right side */}
      <rect x="680" y="280" width="120" height="160" rx="10" fill="#2D6A4F"/>
      <rect x="670" y="265" width="140" height="20" rx="7" fill="#1B4332"/>
      <rect x="700" y="250" width="80" height="18" rx="9" fill="#1B4332"/>
      {/* Recycle symbol on bin */}
      <g transform="translate(740,355) scale(2)">
        <path d="M0,-14 L8,0 L4,0 L4,8 L-4,8 L-4,0 L-8,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)" opacity="0.6"/>
        <path d="M0,-14 L8,0 L4,0 L4,8 L-4,8 L-4,0 L-8,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)" opacity="0.6"/>
        <path d="M0,-14 L8,0 L4,0 L4,8 L-4,8 L-4,0 L-8,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)" opacity="0.6"/>
      </g>
      {/* Wheels */}
      <circle cx="700" cy="442" r="16" fill="#1B4332"/>
      <circle cx="700" cy="442" r="9" fill="#2D6A4F"/>
      <circle cx="780" cy="442" r="16" fill="#1B4332"/>
      <circle cx="780" cy="442" r="9" fill="#2D6A4F"/>
      {/* Plants left */}
      <path d="M90,430 Q100,400 115,415" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <ellipse cx="104" cy="408" rx="12" ry="9" fill="#52b788" transform="rotate(-20,104,408)"/>
      <path d="M150,425 Q160,398 170,410" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <ellipse cx="162" cy="405" rx="11" ry="8" fill="#40916c" transform="rotate(15,162,405)"/>
    </svg>
  );
}

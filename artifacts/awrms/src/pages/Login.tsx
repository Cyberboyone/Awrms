import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { TopNavLayout } from '../components/TopNavLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '../hooks/use-toast';
import { useState } from 'react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const roleRedirects: Record<string, string> = {
  admin: '/admin',
  student: '/home',
  staff: '/home',
  personnel: '/waste',
};

const roleNames: Record<string, string> = {
  admin: 'AWRMS Administrator',
  student: 'Student User',
  staff: 'University Staff',
  personnel: 'Waste Personnel',
};

export default function Login() {
  const { login, findUser, registerUser } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Admin shortcut
    if (values.username.toLowerCase().includes('admin')) {
      login({
        user: { id: Date.now(), full_name: 'AWRMS Administrator', username: values.username, email: `${values.username}@awrms.local`, role: 'admin' },
        token: 'local-session',
      });
      toast({ title: 'Login successful', description: 'Welcome back, Administrator.' });
      setLocation('/admin');
      return;
    }

    // Look up registered user - if not found, create them automatically
    const found = findUser(values.username);
    let user;

    if (found) {
      user = { id: found.id, full_name: found.full_name, username: found.username, email: found.email, role: found.role };
    } else {
      // Auto-create user for demo purposes
      user = { id: Date.now(), full_name: values.username, username: values.username, email: `${values.username}@awrms.local`, role: 'student' as const };
      registerUser({ full_name: values.username, username: values.username, email: `${values.username}@awrms.local`, role: 'student' });
    }

    login({ user, token: 'local-session' });
    toast({ title: 'Login successful', description: `Welcome, ${user.full_name}.` });
    setLocation(roleRedirects[user.role] || '/home');
  }

  return (
    <TopNavLayout publicMode={true}>
      <div className="flex flex-1 min-h-[calc(100vh-152px)]">
        {/* Left Panel */}
        <div className="hidden lg:flex w-[45%] bg-[#F0FFF4] flex-col p-10 relative overflow-hidden">
          <div className="mb-6">
            <p className="text-lg font-semibold text-slate-700">Welcome Back!</p>
            <h2 className="text-3xl font-extrabold text-[#1B4332] leading-tight mt-1">
              Login to Your Account
            </h2>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed max-w-sm">
              Access your account to manage waste collection requests, recycling activities and reports efficiently.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <LoginIllustration />
          </div>

          {/* Secure & Reliable card */}
          <div className="bg-white rounded-xl p-4 border border-[#C6E5D0] flex items-start gap-3 shadow-sm mt-4">
            <div className="shrink-0 w-9 h-9 rounded-full bg-[#1B4332] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Secure & Reliable</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Your data is safe with us. We use advanced security measures to protect your information.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Icon */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#F0FFF4] border-2 border-[#C6E5D0] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Login</h3>
              <p className="text-slate-500 text-sm mt-1">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username or Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Username or Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="Enter your username or email"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link href="/forgot-password" className="text-xs text-[#2D6A4F] hover:underline font-medium">
                    Forgot Password?
                  </Link>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#153427] text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-60"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-sm text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-[#1B4332] hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </TopNavLayout>
  );
}

function LoginIllustration() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      {/* Building background (university) */}
      <rect x="60" y="90" width="220" height="140" fill="#d1e9d5" rx="4"/>
      <rect x="80" y="70" width="180" height="25" fill="#b8dbbf" rx="2"/>
      <rect x="100" y="55" width="140" height="20" fill="#a3d4ab" rx="2"/>
      {/* Text on building */}
      <text x="170" y="145" textAnchor="middle" fill="#5a9e6a" fontSize="8" fontFamily="sans-serif">SA'ADU ZUNGUR UNIVERSITY</text>
      {/* Windows */}
      <rect x="90" y="100" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="130" y="100" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="170" y="100" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="210" y="100" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="90" y="135" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="130" y="135" width="28" height="22" rx="2" fill="#8ecf96"/>
      <rect x="210" y="135" width="28" height="22" rx="2" fill="#8ecf96"/>
      {/* Door */}
      <rect x="155" y="175" width="30" height="55" rx="3" fill="#6ab67a"/>
      {/* Ground */}
      <rect x="0" y="228" width="340" height="32" fill="#b8dbbf"/>
      {/* Trees */}
      <rect x="20" y="165" width="10" height="65" fill="#8B6914" rx="2"/>
      <circle cx="25" cy="152" r="26" fill="#2D6A4F"/>
      <rect x="300" y="165" width="10" height="65" fill="#8B6914" rx="2"/>
      <circle cx="305" cy="152" r="26" fill="#2D6A4F"/>
      {/* Recycling bin */}
      <rect x="130" y="165" width="80" height="65" rx="6" fill="#2D6A4F"/>
      <rect x="124" y="155" width="92" height="14" rx="4" fill="#1B4332"/>
      <rect x="152" y="146" width="36" height="12" rx="6" fill="#1B4332"/>
      {/* Recycle symbol */}
      <g transform="translate(170,198) scale(0.9)">
        <path d="M0 -12 L7 0 L3.5 0 L3.5 7 L-3.5 7 L-3.5 0 L-7 0 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0 -12 L7 0 L3.5 0 L3.5 7 L-3.5 7 L-3.5 0 L-7 0 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0 -12 L7 0 L3.5 0 L3.5 7 L-3.5 7 L-3.5 0 L-7 0 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      {/* Trash bag */}
      <ellipse cx="215" cy="215" rx="18" ry="22" fill="#374151"/>
      <ellipse cx="215" cy="195" rx="10" ry="6" fill="#4b5563"/>
      {/* Plants */}
      <path d="M50,230 Q55,210 65,220" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      <ellipse cx="58" cy="216" rx="8" ry="6" fill="#52b788" transform="rotate(-20,58,216)"/>
      <path d="M285,230 Q280,210 270,220" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      <ellipse cx="278" cy="216" rx="8" ry="6" fill="#52b788" transform="rotate(20,278,216)"/>
    </svg>
  );
}

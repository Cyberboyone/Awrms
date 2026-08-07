import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { TopNavLayout } from '../components/TopNavLayout';
import { useRegister } from '@workspace/api-client-react';
import { useToast } from '../hooks/use-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  address: z.string().min(5, 'Address is required'),
  role: z.enum(['student', 'staff', 'personnel']),
  terms: z.boolean().refine(val => val === true, { message: 'You must accept the terms' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: '', email: '', phone: '', username: '',
      password: '', confirmPassword: '', address: '', role: 'student', terms: false,
    },
  });

  function onSubmit(values: FormValues) {
    const { confirmPassword, terms, ...apiData } = values;
    registerMutation.mutate(
      { data: apiData as any },
      {
        onSuccess: (data) => {
          login(data);
          toast({ title: 'Registration successful', description: 'Your account has been created.' });
          setLocation('/home');
        },
        onError: (error: any) => {
          toast({
            title: 'Registration failed',
            description: error?.response?.data?.error || 'An error occurred',
            variant: 'destructive',
          });
        },
      }
    );
  }

  const termsValue = watch('terms');

  return (
    <TopNavLayout publicMode={true}>
      <div className="flex flex-1 min-h-[calc(100vh-152px)]">
        {/* Left Panel */}
        <div className="hidden lg:flex w-[38%] bg-[#F0FFF4] flex-col p-8 relative overflow-hidden shrink-0">
          <div className="mb-4">
            <h2 className="text-3xl font-extrabold text-[#1B4332] leading-tight">
              Create Your Account
            </h2>
            <p className="text-slate-600 mt-2 text-base font-medium">
              Join us in building a cleaner<br/>and greener environment.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center py-4">
            <RegisterIllustration />
          </div>

          {/* Why Register card */}
          <div className="bg-white rounded-xl p-4 border border-[#C6E5D0] flex items-start gap-3 shadow-sm">
            <div className="shrink-0 w-9 h-9 rounded-full bg-[#1B4332] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Why Register?</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Registering allows you to make requests, track collections, and stay updated with recycling activities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[62%] flex items-start justify-center p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-2xl py-4">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-[#F0FFF4] border-2 border-[#C6E5D0] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-7 w-7">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/>
                  <line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">User Registration</h3>
                <p className="text-slate-500 text-sm">Fill in the details below to create your account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input {...register('full_name')} type="text" placeholder="Enter your full name" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                  </div>
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <input {...register('email')} type="email" placeholder="Enter your email address" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input {...register('phone')} type="tel" placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Username <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input {...register('username')} type="text" placeholder="Choose a username" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                  </div>
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {/* Address (full width) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <input {...register('address')} type="text" placeholder="Enter your address" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"/>
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Account Type <span className="text-red-500">*</span></label>
                <select
                  {...register('role')}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent bg-white text-slate-700 appearance-none"
                >
                  <option value="">Select account type</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="personnel">Waste Personnel</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsValue}
                  onChange={(e) => setValue('terms', e.target.checked, { shouldValidate: true })}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1B4332] focus:ring-[#1B4332]"
                />
                <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                  I agree to the{' '}
                  <span className="text-[#1B4332] font-medium hover:underline cursor-pointer">Terms and Conditions</span>
                  {' '}and{' '}
                  <span className="text-[#1B4332] font-medium hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#153427] text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-60"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                {registerMutation.isPending ? 'Registering...' : 'Register Account'}
              </button>

              <div className="text-center pt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-sm text-slate-400">OR</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-[#1B4332] hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TopNavLayout>
  );
}

function RegisterIllustration() {
  return (
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs">
      {/* Background city silhouette */}
      <rect x="0" y="130" width="280" height="110" fill="#c8e6c9" rx="4"/>
      <rect x="20" y="100" width="40" height="40" fill="#b0d9b4" rx="2"/>
      <rect x="30" y="85" width="20" height="20" fill="#b0d9b4" rx="2"/>
      <rect x="220" y="95" width="45" height="45" fill="#b0d9b4" rx="2"/>
      <rect x="230" y="80" width="25" height="20" fill="#b0d9b4" rx="2"/>
      <rect x="100" y="110" width="80" height="30" fill="#b0d9b4" rx="2"/>
      <rect x="115" y="95" width="50" height="20" fill="#b0d9b4" rx="2"/>
      {/* Ground */}
      <ellipse cx="140" cy="218" rx="130" ry="22" fill="#a5d6a7"/>
      {/* Trees */}
      <rect x="32" y="168" width="8" height="50" fill="#7a5c14" rx="2"/>
      <circle cx="36" cy="158" r="22" fill="#2D6A4F"/>
      <rect x="238" y="165" width="8" height="53" fill="#7a5c14" rx="2"/>
      <circle cx="242" cy="155" r="22" fill="#2D6A4F"/>
      {/* Main recycling bin */}
      <rect x="90" y="130" width="100" height="88" rx="8" fill="#2D6A4F"/>
      <rect x="84" y="120" width="112" height="16" rx="6" fill="#1B4332"/>
      <rect x="112" y="110" width="56" height="14" rx="7" fill="#1B4332"/>
      {/* Recycle symbol */}
      <g transform="translate(140,175) scale(1.2)">
        <path d="M0 -14 L8 0 L4 0 L4 8 L-4 8 L-4 0 L-8 0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0 -14 L8 0 L4 0 L4 8 L-4 8 L-4 0 L-8 0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0 -14 L8 0 L4 0 L4 8 L-4 8 L-4 0 L-8 0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      {/* Wheels */}
      <circle cx="107" cy="220" r="10" fill="#1B4332"/>
      <circle cx="107" cy="220" r="5" fill="#2D6A4F"/>
      <circle cx="173" cy="220" r="10" fill="#1B4332"/>
      <circle cx="173" cy="220" r="5" fill="#2D6A4F"/>
      {/* Trash bag beside bin */}
      <ellipse cx="205" cy="200" rx="14" ry="18" fill="#374151"/>
      <ellipse cx="205" cy="184" rx="8" ry="5" fill="#4b5563"/>
      {/* Small plants */}
      <path d="M60,215 Q65,198 72,207" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      <ellipse cx="66" cy="203" rx="7" ry="5" fill="#52b788" transform="rotate(-20,66,203)"/>
      <path d="M215,212 Q210,195 204,204" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      <ellipse cx="208" cy="200" rx="7" ry="5" fill="#52b788" transform="rotate(20,208,200)"/>
    </svg>
  );
}

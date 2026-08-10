import { TopNavLayout } from '../components/TopNavLayout';
import { Link } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { useState } from 'react';

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast({ title: 'Reset link sent', description: 'Check your email for the password reset link.' });
  }

  return (
    <TopNavLayout publicMode={true}>
      <div className="flex flex-1 min-h-[calc(100vh-152px)] items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#F0FFF4] border-2 border-[#C6E5D0] flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Forgot Password?</h2>
          <p className="text-slate-500 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
              <button type="submit" className="w-full py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors">
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="bg-[#F0FFF4] rounded-lg p-6 border border-[#C6E5D0]">
              <p className="text-sm text-[#2D6A4F] font-medium">A password reset link has been sent to your email.</p>
            </div>
          )}

          <div className="mt-6">
            <Link href="/login" className="text-sm text-[#1B4332] font-semibold hover:underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </TopNavLayout>
  );
}

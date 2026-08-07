import { Link } from 'wouter';
import { Button } from '../components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#F0FFF4] px-4">
      <div className="bg-white rounded-2xl shadow-sm border p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-5xl font-bold text-[#1B4332] mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          The page you are looking for does not exist or you do not have permission to view it.
        </p>
        <Button asChild className="bg-[#1B4332] hover:bg-[#153427] gap-2">
          <Link href="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

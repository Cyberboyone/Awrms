import { TopNavLayout } from '../components/TopNavLayout';
import { Link } from 'wouter';

export default function About() {
  return (
    <TopNavLayout publicMode={true}>
      <section className="flex-1 py-24 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1B4332] mb-4">About AWRMS</h1>
            <div className="w-16 h-1 bg-[#2D6A4F] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#F0FFF4] rounded-xl p-8 border border-[#C6E5D0]">
              <h2 className="text-2xl font-bold text-[#1B4332] mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                The Automated Waste Recycling Management System (AWRMS) is designed to streamline waste management
                operations at Sa'adu Zungur University. Our mission is to promote environmental sustainability
                through efficient waste collection, recycling, and awareness programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F0FFF4] flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-6 w-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Environmental Protection</h3>
                <p className="text-sm text-slate-500">Reducing waste sent to landfills through proper recycling and composting programs.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F0FFF4] flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-6 w-6">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Community Engagement</h3>
                <p className="text-sm text-slate-500">Involving students, staff, and waste management personnel in sustainable practices.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F0FFF4] flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-6 w-6">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Green Campus</h3>
                <p className="text-sm text-slate-500">Building a cleaner, greener campus through technology-driven waste management.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F0FFF4] flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-6 w-6">
                    <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/>
                    <line x1="6" x2="6" y1="20" y2="16"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Data-Driven Decisions</h3>
                <p className="text-sm text-slate-500">Using real-time analytics to optimize collection routes and improve efficiency.</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors">
                Join Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </TopNavLayout>
  );
}

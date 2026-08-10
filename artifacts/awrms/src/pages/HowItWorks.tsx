import { TopNavLayout } from '../components/TopNavLayout';
import { Link } from 'wouter';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Register',
      description: 'Create your account with your university email and role (student, staff, or waste personnel).',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Submit Request',
      description: 'Log a waste collection request with the type, quantity, and your location on campus.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Collection',
      description: 'Our waste management team picks up the waste from your specified location.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
          <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Recycling & Reports',
      description: 'Waste is sorted and recycled. Track your impact through detailed analytics and reports.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
    },
  ];

  return (
    <TopNavLayout publicMode={true}>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1B4332] mb-4">How It Works</h1>
            <div className="w-16 h-1 bg-[#2D6A4F] mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-xl mx-auto">
              Simple steps to participate in our campus recycling program.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((item, idx) => (
              <div key={item.step} className="flex items-start gap-6 bg-[#F0FFF4] rounded-xl p-6 border border-[#C6E5D0]">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#1B4332] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#2D6A4F] bg-white px-2 py-0.5 rounded border border-[#C6E5D0]">Step {item.step}</span>
                    <h3 className="text-lg font-bold text-[#1B4332]">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors">
              Start Now
            </Link>
          </div>
        </div>
      </section>
    </TopNavLayout>
  );
}

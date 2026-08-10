import { Link } from 'wouter';
import { TopNavLayout } from '../components/TopNavLayout';
import { useToast } from '../hooks/use-toast';

export default function Welcome() {
  const { toast } = useToast();
  const features = [
    {
      title: 'Efficient Waste Management',
      description: 'Streamline waste collection and recycling processes.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      ),
    },
    {
      title: 'Real-time Monitoring',
      description: 'Track waste collection and recycling activities in real time.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/>
          <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>
      ),
    },
    {
      title: 'Community Involvement',
      description: 'Encourage participation and awareness across the university.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      title: 'Environment Sustainability',
      description: 'Promote recycling and reduce environmental impact.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
    },
  ];

  return (
    <TopNavLayout publicMode={true}>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-5">
            <p className="text-slate-700 font-medium text-base">Welcome to</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B4332] leading-tight">
              Automated Waste<br/>Recycling Management<br/>System
            </h1>
            <div className="w-20 h-1 bg-[#1B4332] rounded-full"></div>
            <p className="text-slate-600 text-base leading-relaxed max-w-lg">
              A smart and efficient solution for managing waste collection,
              recycling activities and promoting a cleaner, greener
              Sa'adu Zungur University.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/login"
                className="px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors"
              >
                Get Started
              </Link>
              <button
                onClick={() => toast({ title: 'Coming Soon', description: 'Full feature details will be available soon.' })}
                className="px-6 py-3 bg-white text-[#1B4332] font-semibold rounded-md border border-[#1B4332] hover:bg-[#F0FFF4] transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            {/* Recycling Bin Illustration */}
            <RecyclingBinIllustration />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-slate-200 rounded-lg p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </TopNavLayout>
  );
}

function RecyclingBinIllustration() {
  return (
    <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      {/* Sky / background */}
      <rect x="0" y="0" width="480" height="380" fill="white"/>

      {/* Clouds */}
      <ellipse cx="320" cy="60" rx="40" ry="18" fill="#e8f5e9"/>
      <ellipse cx="345" cy="52" rx="30" ry="22" fill="#e8f5e9"/>
      <ellipse cx="300" cy="56" rx="25" ry="16" fill="#e8f5e9"/>
      <ellipse cx="420" cy="80" rx="32" ry="14" fill="#e8f5e9"/>
      <ellipse cx="442" cy="72" rx="24" ry="18" fill="#e8f5e9"/>
      <ellipse cx="400" cy="76" rx="20" ry="12" fill="#e8f5e9"/>

      {/* Trees (left) */}
      <rect x="40" y="200" width="16" height="80" fill="#8B6914" rx="4"/>
      <circle cx="48" cy="185" r="42" fill="#2D6A4F"/>
      <circle cx="30" cy="200" r="28" fill="#2D6A4F"/>
      <circle cx="66" cy="200" r="28" fill="#1B4332"/>

      {/* Trees (right) */}
      <rect x="405" y="200" width="16" height="80" fill="#8B6914" rx="4"/>
      <circle cx="413" cy="185" r="42" fill="#2D6A4F"/>
      <circle cx="395" cy="200" r="28" fill="#2D6A4F"/>
      <circle cx="431" cy="200" r="28" fill="#1B4332"/>

      {/* Ground */}
      <ellipse cx="240" cy="310" rx="230" ry="30" fill="#c8e6c9"/>
      <rect x="10" y="300" width="460" height="80" fill="#c8e6c9"/>

      {/* Main Big Recycling Bin */}
      {/* Bin body */}
      <rect x="160" y="170" width="160" height="140" rx="12" fill="#2D6A4F"/>
      {/* Bin lid */}
      <rect x="150" y="155" width="180" height="25" rx="8" fill="#1B4332"/>
      {/* Bin handle */}
      <rect x="210" y="143" width="60" height="16" rx="8" fill="#1B4332"/>
      {/* Recycle symbol on bin */}
      <g transform="translate(240,235) scale(1.8)">
        <path d="M0,-18 L10,-1 L5,-1 L5,10 L-5,10 L-5,-1 L-10,-1 Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-18 L10,-1 L5,-1 L5,10 L-5,10 L-5,-1 L-10,-1 Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-18 L10,-1 L5,-1 L5,10 L-5,10 L-5,-1 L-10,-1 Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      {/* Wheels */}
      <circle cx="185" cy="315" r="14" fill="#1B4332"/>
      <circle cx="185" cy="315" r="8" fill="#2D6A4F"/>
      <circle cx="295" cy="315" r="14" fill="#1B4332"/>
      <circle cx="295" cy="315" r="8" fill="#2D6A4F"/>

      {/* Small plants / leaves around bin */}
      <path d="M100,270 Q110,240 130,260" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <path d="M130,260 Q120,240 140,235" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <ellipse cx="110" cy="252" rx="14" ry="10" fill="#52b788" transform="rotate(-20,110,252)"/>
      <ellipse cx="133" cy="247" rx="12" ry="9" fill="#40916c" transform="rotate(10,133,247)"/>

      <path d="M360,265 Q350,240 340,258" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <path d="M340,258 Q350,238 330,235" stroke="#2D6A4F" strokeWidth="3" fill="none"/>
      <ellipse cx="352" cy="250" rx="14" ry="10" fill="#52b788" transform="rotate(20,352,250)"/>
      <ellipse cx="336" cy="246" rx="12" ry="9" fill="#40916c" transform="rotate(-10,336,246)"/>

      {/* Flower/small bush in front */}
      <circle cx="200" cy="295" r="12" fill="#52b788"/>
      <circle cx="188" cy="300" r="8" fill="#40916c"/>
      <circle cx="280" cy="292" r="12" fill="#52b788"/>
      <circle cx="292" cy="298" r="8" fill="#40916c"/>
    </svg>
  );
}

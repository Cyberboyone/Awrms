import { Link } from 'wouter';
import { TopNavLayout } from '../components/TopNavLayout';
import { Truck, Recycle, BarChart, Bell, Users } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const statCards = [
    {
      title: 'Registered Users',
      value: 256,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Collection Requests',
      value: 128,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
          <line x1="9" y1="11" x2="15" y2="11"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Completed Collections',
      value: 98,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Recycled Materials',
      value: '1,245 kg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
          <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
          <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
          <path d="m13.378 9.633-4.844-1.38L9.914 3.41"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Pending Requests',
      value: 30,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
  ];

  const services = [
    {
      title: 'Waste Collection',
      desc: 'Request and track waste collection from any location within the university.',
      icon: <Truck className="h-8 w-8 text-[#1B4332]" />,
    },
    {
      title: 'Recycling Management',
      desc: 'Manage recyclable materials and monitor recycling activities.',
      icon: <Recycle className="h-8 w-8 text-[#1B4332]" />,
    },
    {
      title: 'Reports & Analytics',
      desc: 'Generate reports and analyze waste management performance.',
      icon: <BarChart className="h-8 w-8 text-[#1B4332]" />,
    },
    {
      title: 'Notifications',
      desc: 'Receive important updates and notifications about collections and events.',
      icon: <Bell className="h-8 w-8 text-[#1B4332]" />,
    },
    {
      title: 'Awareness',
      desc: 'Learn more about recycling and how we can keep our campus clean.',
      icon: <Users className="h-8 w-8 text-[#1B4332]" />,
    },
  ];

  return (
    <TopNavLayout publicMode={false}>
      <div className="container mx-auto px-6 py-10 space-y-10">

        {/* Hero Banner */}
        <div className="bg-[#F0FFF4] rounded-2xl overflow-hidden border border-[#C6E5D0]">
          <div className="flex flex-col md:flex-row items-center px-8 py-8 gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-[#2D6A4F] font-semibold text-sm mb-1">Welcome to</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B4332] leading-tight">
                  Automated Waste<br/>Recycling Management<br/>System
                </h1>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                A smart solution for efficiently managing waste collection and recycling activities within Sa'adu Zungur University.
              </p>
              <button onClick={() => toast({ title: 'Collection Request', description: 'Collection request form coming soon.' })} className="inline-flex items-center gap-2 px-5 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                  <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                </svg>
                Make a Collection Request
              </button>
            </div>

            {/* Bins Illustration */}
            <div className="flex-1 flex justify-center md:justify-end">
              <HomeBinsIllustration />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium mt-0.5">{stat.title}</p>
              <Link href="/waste" className="text-xs text-[#1B4332] hover:underline font-semibold mt-2 inline-block">
                View all
              </Link>
            </div>
          ))}
        </div>

        {/* Our Services */}
        <div>
          <h2 className="text-xl font-extrabold text-[#1B4332] text-center mb-1">Our Services</h2>
          <div className="w-12 h-0.5 bg-[#1B4332] mx-auto mb-8 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="mx-auto w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-sm font-extrabold text-[#1B4332] mb-2">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TopNavLayout>
  );
}

function HomeBinsIllustration() {
  return (
    <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
      {/* Background: university building */}
      <rect x="60" y="30" width="300" height="170" fill="#e8f5e9" rx="4"/>
      <rect x="80" y="15" width="260" height="20" fill="#c8e6c9" rx="2"/>
      <rect x="110" y="5" width="200" height="15" fill="#b5d9b8" rx="2"/>
      {/* University text */}
      <text x="210" y="95" textAnchor="middle" fill="#7fbf83" fontSize="9" fontFamily="sans-serif" fontWeight="bold">SA'ADU ZUNGUR UNIVERSITY</text>
      {/* Windows */}
      <rect x="80" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="125" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="170" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="215" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="260" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="305" y="40" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="80" y="80" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="125" y="80" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="215" y="80" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="260" y="80" width="35" height="28" rx="2" fill="#a5d6a7"/>
      <rect x="305" y="80" width="35" height="28" rx="2" fill="#a5d6a7"/>
      {/* Door */}
      <rect x="175" y="120" width="70" height="80" rx="3" fill="#81c784"/>

      {/* Ground */}
      <rect x="0" y="195" width="420" height="85" fill="#c8e6c9"/>
      <ellipse cx="210" cy="195" rx="210" ry="20" fill="#c8e6c9"/>

      {/* Trees */}
      <rect x="18" y="155" width="12" height="60" fill="#7a5c14" rx="3"/>
      <circle cx="24" cy="138" r="32" fill="#2D6A4F"/>
      <rect x="390" y="155" width="12" height="60" fill="#7a5c14" rx="3"/>
      <circle cx="396" cy="138" r="32" fill="#2D6A4F"/>

      {/* Recycle symbol above bins */}
      <g transform="translate(210,25) scale(1.5)">
        <path d="M0,-10 L6,0 L3,0 L3,6 L-3,6 L-3,0 L-6,0 Z" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-10 L6,0 L3,0 L3,6 L-3,6 L-3,0 L-6,0 Z" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-10 L6,0 L3,0 L3,6 L-3,6 L-3,0 L-6,0 Z" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>

      {/* Bin 1: Green - PLASTIC */}
      <rect x="78" y="140" width="60" height="90" rx="6" fill="#2D6A4F"/>
      <rect x="72" y="130" width="72" height="14" rx="4" fill="#1B4332"/>
      <rect x="90" y="120" width="36" height="14" rx="7" fill="#1B4332"/>
      <g transform="translate(108,178) scale(0.85)">
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      <text x="108" y="228" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold">PLASTIC</text>
      <circle cx="90" cy="232" r="8" fill="#1B4332"/>
      <circle cx="126" cy="232" r="8" fill="#1B4332"/>

      {/* Bin 2: Blue - PAPER */}
      <rect x="158" y="145" width="60" height="85" rx="6" fill="#1565C0"/>
      <rect x="152" y="135" width="72" height="14" rx="4" fill="#0D47A1"/>
      <rect x="170" y="125" width="36" height="14" rx="7" fill="#0D47A1"/>
      <g transform="translate(188,182) scale(0.85)">
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      <text x="188" y="228" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold">PAPER</text>
      <circle cx="170" cy="232" r="8" fill="#0D47A1"/>
      <circle cx="206" cy="232" r="8" fill="#0D47A1"/>

      {/* Bin 3: Yellow - METAL */}
      <rect x="238" y="145" width="60" height="85" rx="6" fill="#F9A825"/>
      <rect x="232" y="135" width="72" height="14" rx="4" fill="#E65100"/>
      <rect x="250" y="125" width="36" height="14" rx="7" fill="#E65100"/>
      <g transform="translate(268,182) scale(0.85)">
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      <text x="268" y="228" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold">METAL</text>
      <circle cx="250" cy="232" r="8" fill="#E65100"/>
      <circle cx="286" cy="232" r="8" fill="#E65100"/>

      {/* Bin 4: Dark/Black - GLASS */}
      <rect x="318" y="140" width="60" height="90" rx="6" fill="#424242"/>
      <rect x="312" y="130" width="72" height="14" rx="4" fill="#212121"/>
      <rect x="330" y="120" width="36" height="14" rx="7" fill="#212121"/>
      <g transform="translate(348,178) scale(0.85)">
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(0)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(120)"/>
        <path d="M0,-12 L7,0 L3.5,0 L3.5,7 L-3.5,7 L-3.5,0 L-7,0 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" transform="rotate(240)"/>
      </g>
      <text x="348" y="228" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold">GLASS</text>
      <circle cx="330" cy="232" r="8" fill="#212121"/>
      <circle cx="366" cy="232" r="8" fill="#212121"/>
    </svg>
  );
}

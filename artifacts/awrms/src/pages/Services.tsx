import { TopNavLayout } from '../components/TopNavLayout';
import { Link } from 'wouter';

export default function Services() {
  const services = [
    {
      title: 'Waste Collection',
      description: 'Request and track waste collection from any location within the university. Our team ensures timely pickups and proper handling.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
          <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      title: 'Recycling Management',
      description: 'Manage recyclable materials efficiently. We process plastic, paper, metal, glass, and organic waste separately.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
          <path d="m14 16-3 3 3 3"/>
        </svg>
      ),
    },
    {
      title: 'Reports & Analytics',
      description: 'Access detailed reports on waste collection, recycling rates, and environmental impact metrics.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
          <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/>
          <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>
      ),
    },
    {
      title: 'Awareness Programs',
      description: 'Learn about recycling best practices and participate in campus cleanliness initiatives.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-8 w-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  return (
    <TopNavLayout publicMode={true}>
      <section className="flex-1 py-24 bg-white">
        <div className="container mx-auto px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1B4332] mb-4">Our Services</h1>
            <div className="w-16 h-1 bg-[#2D6A4F] mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-xl mx-auto">
              Comprehensive waste management solutions for a cleaner, greener campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B4332] mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </TopNavLayout>
  );
}

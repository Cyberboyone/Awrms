import { SidebarLayout } from '../components/SidebarLayout';
import { LayoutDashboard, UserPlus, PlusCircle, CalendarDays, FileText, Bell } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { format } from 'date-fns';
import { Link } from 'wouter';

export default function AdminDashboard() {
  const areaData = [
    { name: 'May 1', value: 22 },
    { name: 'May 6', value: 35 },
    { name: 'May 11', value: 28 },
    { name: 'May 16', value: 55 },
    { name: 'May 20', value: 75 },
  ];

  const pieData = [
    { name: 'Plastic', value: 420, pct: '33.7%', color: '#2D6A4F' },
    { name: 'Paper', value: 320, pct: '25.7%', color: '#3b82f6' },
    { name: 'Metal', value: 210, pct: '16.9%', color: '#f59e0b' },
    { name: 'Glass', value: 295, pct: '23.7%', color: '#64748b' },
  ];

  const stats = [
    {
      title: 'Total Users',
      value: 256,
      change: '+8% from last month',
      up: true,
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
      change: '+15% from last month',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Completed Collections',
      value: 98,
      change: '+12% from last month',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Recycled Materials',
      value: '1,245 kg',
      change: '+18% from last month',
      up: true,
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
      change: '-5% from last month',
      up: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
  ];

  const recentRequests = [
        { id: 128, location: 'New Hostel, Block A', created_at: '2026-05-20T10:30:00Z', status: 'pending' },
        { id: 127, location: 'Science Faculty', created_at: '2026-05-20T09:15:00Z', status: 'pending' },
        { id: 126, location: 'Student Center', created_at: '2026-05-19T16:45:00Z', status: 'completed' },
        { id: 125, location: 'Library Complex', created_at: '2026-05-19T14:20:00Z', status: 'completed' },
        { id: 124, location: 'Old Hostel, Block C', created_at: '2026-05-19T11:05:00Z', status: 'completed' },
      ];

  const statusStyle: Record<string, string> = {
    pending: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    assigned: 'bg-purple-100 text-purple-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <SidebarLayout pageTitle="Administrator Dashboard" pageIcon={LayoutDashboard}>
      <div className="flex flex-col gap-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, Admin!</h1>
            <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with the waste recycling system today.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#1B4332]">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="font-medium">{format(new Date(), 'MMMM d, yyyy')}</span>
            <span className="text-slate-400">{format(new Date(), 'EEEE')}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold text-slate-800">{stat.value}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{stat.title}</p>
                </div>
              </div>
              <p className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                <span>{stat.up ? '↑' : '↓'}</span>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Area Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Collection Overview</h3>
              <select className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-600 bg-white">
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>
                  <Area type="monotone" dataKey="value" stroke="#2D6A4F" strokeWidth={2.5} fill="url(#colorGreen)"
                    dot={{ r: 4, fill: '#2D6A4F', strokeWidth: 2, stroke: 'white' }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4 border-t border-slate-100 pt-4">
              <div className="text-center">
                <p className="text-lg font-extrabold text-slate-800">128</p>
                <p className="text-xs text-slate-500">Total Requests</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-green-600">98</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-orange-500">30</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4">Waste by Type (This Month)</h3>
            <div className="flex-1 relative min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color}/>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-800">1,245</span>
                <span className="text-xs text-slate-500 font-medium">kg Total</span>
              </div>
            </div>
            <div className="space-y-2 mt-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}/>
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="text-slate-500">{item.value} kg ({item.pct})</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-slate-200 text-slate-600 text-xs py-2 rounded-md hover:bg-slate-50 flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
              </svg>
              View Full Report
            </button>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Recent Collection Requests</h3>
              <Link href="/requests" className="text-xs text-[#1B4332] hover:underline font-semibold">View All</Link>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {recentRequests.map((req: any, idx: number) => (
                <div key={req.id ?? idx} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#F0FFF4] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" className="h-4 w-4">
                        <rect x="1" y="3" width="15" height="13" rx="2"/>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800">REQ-2026-00{req.id ?? (128 - idx)}</p>
                      <p className="text-[11px] text-slate-500 truncate">{req.location}</p>
                      <p className="text-[10px] text-slate-400">
                        {req.created_at ? format(new Date(req.created_at), 'dd MMM yyyy, hh:mm a') : ''}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 capitalize ${statusStyle[req.status] || 'bg-slate-100 text-slate-600'}`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* System Announcements */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">System Announcements</h3>
            <div className="flex items-start gap-3 p-3 bg-[#F0FFF4] rounded-lg border border-[#C6E5D0]">
              <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                  <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Keep the campus clean and green. Ensure proper waste segregation and timely collection.
                </p>
                <p className="text-xs text-[#1B4332] font-semibold mt-1.5">Posted on May 18, 2026</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Add New User', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg> },
                { label: 'Add Waste Type', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/></svg> },
                { label: 'Schedule Collection', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { label: 'Generate Report', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg> },
              ].map((action) => (
                <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#2D6A4F] hover:bg-[#F0FFF4] hover:text-[#1B4332] text-slate-600 transition-colors">
                  {action.icon}
                  <span className="text-[11px] font-medium text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 pb-2">
          © 2026 Sa'adu Zungur University. All Rights Reserved.
        </p>
      </div>
    </SidebarLayout>
  );
}

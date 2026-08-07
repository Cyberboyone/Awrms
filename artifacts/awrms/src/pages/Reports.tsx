import { SidebarLayout } from '../components/SidebarLayout';
import { BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend,
  RadialBarChart, RadialBar,
} from 'recharts';
import { Link } from 'wouter';

export default function Reports() {
  const stats = [
    {
      title: 'Total Waste Collected',
      value: '1,245 kg',
      change: '+18% from last period',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
          <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
          <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
    {
      title: 'Recycled Materials',
      value: '1,245 kg',
      change: '+18% from last period',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
          <path d="m14 16-3 3 3 3"/>
        </svg>
      ),
      bg: 'bg-blue-500',
    },
    {
      title: 'Completed Collections',
      value: 98,
      change: '+12% from last period',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      bg: 'bg-amber-500',
    },
    {
      title: 'Pending Requests',
      value: 30,
      change: '-5% from last period',
      up: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      bg: 'bg-purple-500',
    },
    {
      title: 'Total Users',
      value: 256,
      change: '+8% from last period',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
  ];

  const trendData = [
    { name: 'May 1', value: 30 },
    { name: 'May 6', value: 55 },
    { name: 'May 11', value: 70 },
    { name: 'May 16', value: 90 },
    { name: 'May 20', value: 130 },
  ];

  const pieData = [
    { name: 'Plastic', value: 420, pct: '33.7%', color: '#2D6A4F' },
    { name: 'Paper', value: 320, pct: '25.7%', color: '#3b82f6' },
    { name: 'Metal', value: 210, pct: '16.9%', color: '#f59e0b' },
    { name: 'Glass', value: 295, pct: '23.7%', color: '#64748b' },
  ];

  const monthlyData = [
    { name: 'Jan', collected: 900, recycled: 700 },
    { name: 'Feb', collected: 1150, recycled: 850 },
    { name: 'Mar', collected: 1300, recycled: 1000 },
    { name: 'Apr', collected: 1100, recycled: 900 },
    { name: 'May', collected: 1245, recycled: 1035 },
  ];

  const summaryTable = [
    { type: 'Plastic', collected: 420, recycled: 380, rate: 90 },
    { type: 'Paper', collected: 320, recycled: 280, rate: 87 },
    { type: 'Metal', collected: 210, recycled: 160, rate: 76 },
    { type: 'Glass', collected: 295, recycled: 215, rate: 73 },
  ];

  const topLocations = [
    { name: 'New Hostel, Block A', kg: 320 },
    { name: 'Science Faculty', kg: 210 },
    { name: 'Student Center', kg: 180 },
    { name: 'Library Complex', kg: 160 },
    { name: 'Old Hostel, Block C', kg: 150 },
  ];

  const gaugeData = [{ name: 'Rate', value: 78, fill: '#1B4332' }];

  return (
    <SidebarLayout pageTitle="Reports & Analytics" pageIcon={BarChart3}>
      <div className="flex flex-col gap-6">

        {/* Breadcrumb + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <nav className="text-sm text-slate-500">
            <Link href="/admin" className="hover:text-[#1B4332]">Dashboard</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-800 font-medium">Reports & Analytics</span>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-600 bg-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              May 1, 2026 - May 20, 2026
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 ml-1">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#153427] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Report
            </button>
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
                  <p className="text-xs text-slate-500 font-medium leading-tight">{stat.title}</p>
                  <h3 className="text-xl font-extrabold text-slate-800 mt-0.5">{stat.value}</h3>
                </div>
              </div>
              <p className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                <span>{stat.up ? '↑' : '↓'}</span>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Top Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Area Chart - Waste Collection Trend */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Waste Collection Trend</h3>
              <select className="text-xs border border-slate-200 rounded px-2 py-1 bg-white text-slate-600">
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} unit=" kg"/>
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>
                  <Area type="monotone" dataKey="value" stroke="#2D6A4F" strokeWidth={2.5} fill="url(#colorTrend)"
                    dot={{ r: 4, fill: '#2D6A4F', strokeWidth: 2, stroke: 'white' }}
                    activeDot={{ r: 6 }} name="kg"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut - Waste by Type */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Waste by Type</h3>
            <div className="flex gap-4 items-center h-[200px]">
              <div className="relative flex-1 h-full">
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
                  <span className="text-xl font-extrabold text-slate-800">1,245</span>
                  <span className="text-xs text-slate-500">kg Total</span>
                </div>
              </div>
              <div className="space-y-2.5 shrink-0">
                {pieData.map((item) => (
                  <div key={item.name} className="text-xs">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}/>
                      <span className="text-slate-700 font-medium">{item.name}</span>
                    </div>
                    <p className="text-slate-400 pl-4">{item.value} kg ({item.pct})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gauge - Recycling Rate */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-2">Recycling Rate</h3>
            <div className="flex-1 relative min-h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%" cy="80%"
                  innerRadius="70%" outerRadius="100%"
                  barSize={16} data={gaugeData}
                  startAngle={180} endAngle={0}
                >
                  <RadialBar background={{ fill: '#e2e8f0' }} dataKey="value" cornerRadius={8}/>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 pointer-events-none">
                <span className="text-5xl font-extrabold text-slate-800">78%</span>
                <span className="text-xs text-slate-500 font-medium mt-1">Recycling Rate</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pb-1 text-xs text-slate-400">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-2">
              <span>↑</span> 10% from last period
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Monthly Comparison Bar Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Monthly Comparison</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }}/>
                  <Bar dataKey="collected" fill="#2D6A4F" name="Collected (kg)" radius={[3,3,0,0]} barSize={14}/>
                  <Bar dataKey="recycled" fill="#3b82f6" name="Recycled (kg)" radius={[3,3,0,0]} barSize={14}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste Summary Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 overflow-hidden">
            <h3 className="font-bold text-slate-800 mb-4">Waste Summary Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs">
                    <th className="px-3 py-2.5 text-left font-semibold">Waste Type</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Collected (kg)</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Recycled (kg)</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Recycling Rate (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summaryTable.map((row) => (
                    <tr key={row.type}>
                      <td className="px-3 py-2.5 font-medium text-slate-700">{row.type}</td>
                      <td className="px-3 py-2.5 text-right text-slate-600">{row.collected}</td>
                      <td className="px-3 py-2.5 text-right text-slate-600">{row.recycled}</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${row.rate >= 80 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {row.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-slate-50 font-bold">
                    <td className="px-3 py-2.5 text-slate-800">Total</td>
                    <td className="px-3 py-2.5 text-right text-slate-800">1,245</td>
                    <td className="px-3 py-2.5 text-right text-slate-800">1,035</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">83%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Collection Locations */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Top Collection Locations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 text-xs border-b border-slate-100">
                    <th className="pb-2 text-left font-semibold">Location</th>
                    <th className="pb-2 text-right font-semibold">Collected (kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topLocations.map((loc) => (
                    <tr key={loc.name}>
                      <td className="py-2.5 text-slate-700">{loc.name}</td>
                      <td className="py-2.5 text-right font-semibold text-slate-800">{loc.kg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-xs text-[#1B4332] font-semibold hover:underline">View Full Report</button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

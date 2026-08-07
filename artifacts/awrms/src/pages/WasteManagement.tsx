import { SidebarLayout } from '../components/SidebarLayout';
import { Trash2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';

export default function WasteManagement() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    {
      title: 'Total Waste Collected',
      value: '1,245 kg',
      change: '+18% from last month',
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
      value: '1,035 kg',
      change: '+16% from last month',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
          <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
          <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
        </svg>
      ),
      bg: 'bg-blue-500',
    },
    {
      title: 'Completed Collections',
      value: '98',
      change: '+12% from last month',
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
      title: 'Pending Collections',
      value: '30',
      change: '-5% from last month',
      up: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      bg: 'bg-purple-500',
    },
    {
      title: 'Recycling Rate',
      value: '78%',
      change: '+10% from last month',
      up: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      bg: 'bg-[#1B4332]',
    },
  ];

  const seedData = [
    { id: 1, code: 'WST-2026-001', waste_type: 'plastic', category: 'recyclable', quantity_kg: 120, source_location: 'New Hostel, Block A', collection_date: '2026-05-20', status: 'collected' },
    { id: 2, code: 'WST-2026-002', waste_type: 'paper', category: 'recyclable', quantity_kg: 90, source_location: 'Science Faculty', collection_date: '2026-05-20', status: 'collected' },
    { id: 3, code: 'WST-2026-003', waste_type: 'metal', category: 'recyclable', quantity_kg: 60, source_location: 'Student Center', collection_date: '2026-05-19', status: 'collected' },
    { id: 4, code: 'WST-2026-004', waste_type: 'glass', category: 'recyclable', quantity_kg: 80, source_location: 'Library Complex', collection_date: '2026-05-19', status: 'processed' },
    { id: 5, code: 'WST-2026-005', waste_type: 'organic', category: 'non_recyclable', quantity_kg: 150, source_location: 'Old Hostel, Block C', collection_date: '2026-05-18', status: 'pending' },
  ];

  const rawData = seedData;

  const filtered = rawData.filter(row => {
    const matchSearch = !search || row.source_location?.toLowerCase().includes(search.toLowerCase()) || row.waste_type?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || row.waste_type === typeFilter;
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const typeColors: Record<string, { bg: string; icon: string }> = {
    plastic: { bg: 'bg-green-50', icon: '🟢' },
    paper: { bg: 'bg-blue-50', icon: '📄' },
    metal: { bg: 'bg-yellow-50', icon: '⚙️' },
    glass: { bg: 'bg-purple-50', icon: '🧴' },
    organic: { bg: 'bg-orange-50', icon: '🌿' },
    other: { bg: 'bg-slate-50', icon: '📦' },
  };

  const statusStyle: Record<string, string> = {
    collected: 'bg-green-100 text-green-700',
    processed: 'bg-blue-100 text-blue-700',
    recycled: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-orange-100 text-orange-700',
    disposed: 'bg-slate-100 text-slate-600',
  };

  const typeIcons: Record<string, ReactNode> = {
    plastic: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#2D6A4F" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>,
    paper: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    metal: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    glass: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M8 2h8l4 10H4L8 2zM4 12l2 10h12l2-10"/></svg>,
    organic: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f97316" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/></svg>,
    other: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  };

  return (
    <SidebarLayout pageTitle="Waste Management" pageIcon={Trash2}>
      <div className="flex flex-col gap-6">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-slate-800">{stat.value}</h3>
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

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Waste Management</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage waste types, track quantities and monitor disposal and recycling activities.</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#153427] transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Waste
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search waste..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white"
                />
              </div>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1B4332]">
                <option value="all">All Waste Types</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="organic">Organic</option>
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1B4332]">
                <option value="all">All Status</option>
                <option value="collected">Collected</option>
                <option value="processed">Processed</option>
                <option value="recycled">Recycled</option>
                <option value="pending">Pending</option>
                <option value="disposed">Disposed</option>
              </select>
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-600 bg-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                May 1, 2026 - May 20, 2026
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Waste Type</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Quantity (kg)</th>
                  <th className="px-5 py-3.5">Source/Location</th>
                  <th className="px-5 py-3.5">Collection Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-[#1B4332] whitespace-nowrap">{row.code}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${typeColors[row.waste_type]?.bg || 'bg-slate-50'} flex items-center justify-center`}>
                          {typeIcons[row.waste_type] || typeIcons.other}
                        </div>
                        <span className="font-medium text-slate-700 capitalize">{row.waste_type}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        row.category === 'recyclable' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.category === 'non_recyclable' ? 'Non-Recyclable' : 'Recyclable'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.quantity_kg} kg</td>
                    <td className="px-5 py-3.5 text-slate-600">{row.source_location}</td>
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                      {row.collection_date ? new Date(row.collection_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold capitalize ${statusStyle[row.status] || 'bg-slate-100 text-slate-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1B4332] hover:border-[#1B4332] transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing 1 to {filtered.length} of {rawData.length} entries</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40" disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {[1,2,3,4,5].map(n => (
                <button key={n} className={`w-8 h-8 rounded border text-xs font-medium ${n === 1 ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'border-slate-200 hover:bg-slate-50'}`}>{n}</button>
              ))}
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

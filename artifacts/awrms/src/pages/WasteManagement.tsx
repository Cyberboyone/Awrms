import { SidebarLayout } from '../components/SidebarLayout';
import { Trash2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { useData, type WasteEntry } from '../context/DataContext';

export default function WasteManagement() {
  const { toast } = useToast();
  const { wasteEntries, addWaste, updateWaste, deleteWaste } = useData();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState<WasteEntry | null>(null);
  const [form, setForm] = useState({ waste_type: 'plastic', category: 'recyclable' as 'recyclable' | 'non_recyclable', quantity_kg: 0, source_location: '', collection_date: '', status: 'pending' as WasteEntry['status'] });

  const totalWaste = wasteEntries.reduce((sum, e) => sum + e.quantity_kg, 0);
  const recycledWaste = wasteEntries.filter(e => e.status === 'recycled' || e.status === 'processed').reduce((sum, e) => sum + e.quantity_kg, 0);
  const collectedCount = wasteEntries.filter(e => e.status === 'collected').length;
  const pendingCount = wasteEntries.filter(e => e.status === 'pending').length;
  const recycleRate = Math.round((recycledWaste / Math.max(totalWaste, 1)) * 100);

  const stats = [
    { title: 'Total Waste Collected', value: `${totalWaste.toLocaleString()} kg`, change: `${wasteEntries.length} entries`, up: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/></svg>), bg: 'bg-[#1B4332]' },
    { title: 'Recycled Materials', value: `${recycledWaste.toLocaleString()} kg`, change: `${recycleRate}% rate`, up: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/></svg>), bg: 'bg-blue-500' },
    { title: 'Completed', value: collectedCount.toString(), change: `${collectedCount} done`, up: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>), bg: 'bg-amber-500' },
    { title: 'Pending', value: pendingCount.toString(), change: `${pendingCount} waiting`, up: false,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>), bg: 'bg-purple-500' },
    { title: 'Recycling Rate', value: `${recycleRate}%`, change: 'Overall', up: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-7 w-7"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>), bg: 'bg-[#1B4332]' },
  ];

  const filtered = wasteEntries.filter(row => {
    const matchSearch = !search || row.source_location?.toLowerCase().includes(search.toLowerCase()) || row.waste_type?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || row.waste_type === typeFilter;
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const typeColors: Record<string, { bg: string; icon: string }> = {
    plastic: { bg: 'bg-green-50', icon: '\u{1F7E2}' },
    paper: { bg: 'bg-blue-50', icon: '\u{1F4C4}' },
    metal: { bg: 'bg-yellow-50', icon: '\u2699\uFE0F' },
    glass: { bg: 'bg-purple-50', icon: '\u{1F9F4}' },
    organic: { bg: 'bg-orange-50', icon: '\u{1F33F}' },
    other: { bg: 'bg-slate-50', icon: '\u{1F4E6}' },
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
    metal: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>,
    glass: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M8 2h8l4 10H4L8 2z"/></svg>,
    organic: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f97316" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/></svg>,
    other: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>,
  };

  function openAdd() {
    setEditEntry(null);
    setForm({ waste_type: 'plastic', category: 'recyclable', quantity_kg: 0, source_location: '', collection_date: '', status: 'pending' });
    setShowModal(true);
  }

  function openEdit(entry: WasteEntry) {
    setEditEntry(entry);
    setForm({ waste_type: entry.waste_type, category: entry.category, quantity_kg: entry.quantity_kg, source_location: entry.source_location, collection_date: entry.collection_date, status: entry.status });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.source_location || !form.quantity_kg) {
      toast({ title: 'Error', description: 'Please fill in all required fields.' });
      return;
    }
    if (editEntry) {
      updateWaste(editEntry.id, form);
      toast({ title: 'Updated', description: `${editEntry.code} has been updated.` });
    } else {
      const code = `WST-${new Date().getFullYear()}-${String(wasteEntries.length + 1).padStart(3, '0')}`;
      addWaste({ ...form, code });
      toast({ title: 'Added', description: `${code} has been added.` });
    }
    setShowModal(false);
  }

  function handleDelete(entry: WasteEntry) {
    deleteWaste(entry.id);
    toast({ title: 'Deleted', description: `${entry.code} has been removed.` });
  }

  function handleExport() {
    const csv = ['ID,Type,Category,Quantity,Location,Date,Status'];
    filtered.forEach(r => csv.push(`${r.code},${r.waste_type},${r.category},${r.quantity_kg},${r.source_location},${r.collection_date},${r.status}`));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'waste_data.csv'; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: 'Waste data exported to CSV.' });
  }

  return (
    <SidebarLayout pageTitle="Waste Management" pageIcon={Trash2}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>{stat.icon}</div>
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-slate-800">{stat.value}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{stat.title}</p>
                </div>
              </div>
              <p className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                <span>{stat.up ? '\u2191' : '\u2193'}</span>{stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Waste Management</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage waste types, track quantities and monitor disposal and recycling activities.</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#153427] transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Waste
                </button>
                <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search waste..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white" />
              </div>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-700">
                <option value="all">All Waste Types</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="organic">Organic</option>
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-700">
                <option value="all">All Status</option>
                <option value="collected">Collected</option>
                <option value="processed">Processed</option>
                <option value="recycled">Recycled</option>
                <option value="pending">Pending</option>
                <option value="disposed">Disposed</option>
              </select>
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
                      <span className={`px-2 py-1 rounded text-xs font-medium ${row.category === 'recyclable' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {row.category === 'non_recyclable' ? 'Non-Recyclable' : 'Recyclable'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.quantity_kg} kg</td>
                    <td className="px-5 py-3.5 text-slate-600">{row.source_location}</td>
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                      {row.collection_date ? new Date(row.collection_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '\u2014'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold capitalize ${statusStyle[row.status] || 'bg-slate-100 text-slate-600'}`}>{row.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => openEdit(row)} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1B4332] hover:border-[#1B4332] transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(row)} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-8 text-center text-sm text-slate-400">No waste entries found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {filtered.length} of {wasteEntries.length} entries</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{editEntry ? 'Edit Waste Entry' : 'Add Waste Entry'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Waste Type</label>
                <select value={form.waste_type} onChange={e => setForm({ ...form, waste_type: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                  <option value="glass">Glass</option>
                  <option value="organic">Organic</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="recyclable">Recyclable</option>
                  <option value="non_recyclable">Non-Recyclable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (kg)</label>
                <input type="number" value={form.quantity_kg} onChange={e => setForm({ ...form, quantity_kg: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Source/Location</label>
                <input type="text" value={form.source_location} onChange={e => setForm({ ...form, source_location: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="e.g. Science Faculty" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Collection Date</label>
                <input type="date" value={form.collection_date} onChange={e => setForm({ ...form, collection_date: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="pending">Pending</option>
                  <option value="collected">Collected</option>
                  <option value="processed">Processed</option>
                  <option value="recycled">Recycled</option>
                  <option value="disposed">Disposed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#1B4332] rounded-md hover:bg-[#153427]">{editEntry ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}

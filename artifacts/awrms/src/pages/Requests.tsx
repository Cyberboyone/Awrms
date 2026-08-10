import { SidebarLayout } from '../components/SidebarLayout';
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  UserCircle,
  AlertCircle,
  Plus,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { format } from 'date-fns';
import { useState } from 'react';
import { useData, type CollectionRequest } from '../context/DataContext';
import { useToast } from '../hooks/use-toast';

export default function Requests() {
  const { requests, addRequest, updateRequest, deleteRequest } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editReq, setEditReq] = useState<CollectionRequest | null>(null);
  const [form, setForm] = useState({ location: '', category: 'plastic', preferred_date: '', status: 'pending' as CollectionRequest['status'], assigned_to: '' });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const assignedCount = requests.filter(r => r.status === 'assigned').length;
  const urgentCount = requests.filter(r => r.status === 'pending' && new Date(r.preferred_date) < new Date(Date.now() + 86400000)).length;

  const stats = [
    { title: 'Total Requests', value: requests.length.toString(), icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Completed', value: completedCount.toString(), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Pending', value: pendingCount.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Assigned', value: assignedCount.toString(), icon: UserCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Urgent', value: urgentCount.toString(), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  const filtered = requests.filter(r => {
    const matchSearch = !search || r.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Completed</Badge>;
      case 'assigned': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Assigned</Badge>;
      case 'pending': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Pending</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  function openAdd() {
    setEditReq(null);
    setForm({ location: '', category: 'plastic', preferred_date: '', status: 'pending', assigned_to: '' });
    setShowModal(true);
  }

  function openEdit(req: CollectionRequest) {
    setEditReq(req);
    setForm({ location: req.location, category: req.category, preferred_date: req.preferred_date.split('T')[0], status: req.status, assigned_to: req.assigned_to || '' });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.location) {
      toast({ title: 'Error', description: 'Location is required.' });
      return;
    }
    if (editReq) {
      updateRequest(editReq.id, { ...form, assigned_to: form.assigned_to || null });
      toast({ title: 'Updated', description: `Request REQ-${editReq.id} updated.` });
    } else {
      addRequest({ ...form, assigned_to: form.assigned_to || null });
      toast({ title: 'Created', description: 'New request created.' });
    }
    setShowModal(false);
  }

  function handleExport() {
    const csv = ['ID,Location,Category,Date,Status,Assigned To'];
    filtered.forEach(r => csv.push(`${r.id},${r.location},${r.category},${r.preferred_date},${r.status},${r.assigned_to || ''}`));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'requests.csv'; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: 'Requests exported to CSV.' });
  }

  return (
    <SidebarLayout pageTitle="Collection Requests">
      <div className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col">
              <div className={`p-2.5 rounded-full ${stat.bg} ${stat.color} w-10 h-10 flex items-center justify-center mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-xs text-slate-500 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-slate-800">Collection Requests</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button size="sm" className="bg-[#1B4332] hover:bg-[#153427] gap-2" onClick={openAdd}>
                  <Plus className="h-4 w-4" /> New Request
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search requests..." className="pl-9 bg-slate-50" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-50">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                  <th className="px-5 py-4">REQ ID</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Preferred Date</th>
                  <th className="px-5 py-4">Assigned To</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-[#2D6A4F]">REQ-{row.id}</td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{row.location}</td>
                    <td className="px-5 py-4 capitalize text-slate-600">{row.category}</td>
                    <td className="px-5 py-4 text-slate-600">{row.preferred_date ? format(new Date(row.preferred_date), 'MMM dd, yyyy') : 'Any time'}</td>
                    <td className="px-5 py-4 text-slate-600">{row.assigned_to || <span className="text-slate-400 italic">Unassigned</span>}</td>
                    <td className="px-5 py-4">{getStatusBadge(row.status)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => { deleteRequest(row.id); toast({ title: 'Deleted', description: `Request REQ-${row.id} deleted.` }); }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No requests found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between text-sm text-slate-500">
            <div>Showing {filtered.length} of {requests.length} entries</div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{editReq ? 'Edit Request' : 'New Request'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="e.g. Science Block" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                  <option value="glass">Glass</option>
                  <option value="organic">Organic</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                <input type="date" value={form.preferred_date} onChange={e => setForm({ ...form, preferred_date: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                <input type="text" value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="Personnel name (optional)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#1B4332] rounded-md hover:bg-[#153427]">{editReq ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}

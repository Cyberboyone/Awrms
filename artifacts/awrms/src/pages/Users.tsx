import { SidebarLayout } from '../components/SidebarLayout';
import { Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { useData, type SiteUser } from '../context/DataContext';
import { useToast } from '../hooks/use-toast';
import { type UserRole } from '../context/AuthContext';

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<SiteUser | null>(null);
  const [form, setForm] = useState({ full_name: '', username: '', email: '', role: 'student' as UserRole });

  const filtered = users.filter(u => {
    const matchSearch = !search || u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleStyle: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-700',
    student: 'bg-blue-100 text-blue-700',
    staff: 'bg-amber-100 text-amber-700',
    personnel: 'bg-green-100 text-green-700',
  };

  function openAdd() {
    setEditUser(null);
    setForm({ full_name: '', username: '', email: '', role: 'student' });
    setShowModal(true);
  }

  function openEdit(user: SiteUser) {
    setEditUser(user);
    setForm({ full_name: user.full_name, username: user.username, email: user.email, role: user.role });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.full_name || !form.username || !form.email) {
      toast({ title: 'Error', description: 'All fields are required.' });
      return;
    }
    if (editUser) {
      updateUser(editUser.id, form);
      toast({ title: 'Updated', description: `${form.full_name} has been updated.` });
    } else {
      addUser(form);
      toast({ title: 'Added', description: `${form.full_name} has been added.` });
    }
    setShowModal(false);
  }

  function handleDelete(user: SiteUser) {
    if (user.role === 'admin') {
      toast({ title: 'Error', description: 'Cannot delete admin user.' });
      return;
    }
    deleteUser(user.id);
    toast({ title: 'Deleted', description: `${user.full_name} has been removed.` });
  }

  function handleExport() {
    const csv = ['Name,Email,Role,Status,Joined'];
    filtered.forEach(u => csv.push(`${u.full_name},${u.email},${u.role},${u.status},${u.joined}`));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'users.csv'; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: 'Users exported to CSV.' });
  }

  return (
    <SidebarLayout pageTitle="User Management" pageIcon={UsersIcon}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Users</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage all registered users of the system.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#153427] transition-colors shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-700">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="personnel">Personnel</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Joined</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{u.full_name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${roleStyle[u.role] || ''}`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{u.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{new Date(u.joined).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => openEdit(u)} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(u)} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {filtered.length} of {users.length} users</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{editUser ? 'Edit User' : 'Add User'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="e.g. john" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="e.g. john@szu.edu.ng" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="personnel">Personnel</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#1B4332] rounded-md hover:bg-[#153427]">{editUser ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}

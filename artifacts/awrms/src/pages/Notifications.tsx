import { SidebarLayout } from '../components/SidebarLayout';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../hooks/use-toast';
import { format } from 'date-fns';

export default function Notifications() {
  const { notifications, addNotification, markNotificationRead, deleteNotification } = useData();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'info' as 'info' | 'warning' | 'success' | 'error' });

  function handleCreate() {
    if (!form.title || !form.message) {
      toast({ title: 'Error', description: 'Title and message are required.' });
      return;
    }
    addNotification(form);
    toast({ title: 'Created', description: 'Notification sent.' });
    setShowModal(false);
    setForm({ title: '', message: '', type: 'info' });
  }

  function markAllRead() {
    notifications.filter(n => !n.read).forEach(n => markNotificationRead(n.id));
    toast({ title: 'Done', description: 'All notifications marked as read.' });
  }

  const unread = notifications.filter(n => !n.read).length;

  return (
    <SidebarLayout pageTitle="Notifications" pageIcon={Bell}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
            <p className="text-sm text-slate-500 mt-0.5">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#153427] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Notification
            </button>
            <button onClick={markAllRead} className="text-sm text-[#1B4332] font-semibold hover:underline">Mark all as read</button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${n.read ? 'bg-white border-slate-200' : 'bg-[#F0FFF4] border-[#C6E5D0]'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-slate-100' : 'bg-[#1B4332]'}`}>
                <Bell className={`h-5 w-5 ${n.read ? 'text-slate-500' : 'text-white'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#1B4332] shrink-0"></span>}
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${n.type === 'info' ? 'bg-blue-100 text-blue-700' : n.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : n.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{n.type}</span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{format(new Date(n.created_at), 'MMM dd, yyyy, hh:mm a')}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!n.read && (
                  <button onClick={() => markNotificationRead(n.id)} className="text-xs text-[#1B4332] hover:underline font-medium">Mark read</button>
                )}
                <button onClick={() => deleteNotification(n.id)} className="text-xs text-red-500 hover:underline font-medium">Delete</button>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-12 text-sm text-slate-400">No notifications yet</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">New Notification</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" placeholder="Notification title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" rows={3} placeholder="Notification message" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 text-sm font-medium text-white bg-[#1B4332] rounded-md hover:bg-[#153427]">Send</button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}

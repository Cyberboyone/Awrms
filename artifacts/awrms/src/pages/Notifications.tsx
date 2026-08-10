import { SidebarLayout } from '../components/SidebarLayout';
import { Bell } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { id: 1, title: 'New Collection Request', desc: 'REQ-2026-0128 from New Hostel, Block A has been submitted.', time: '10 min ago', read: false },
    { id: 2, title: 'Collection Completed', desc: 'REQ-2026-0126 at Student Center has been marked as completed.', time: '2 hours ago', read: false },
    { id: 3, title: 'System Update', desc: 'AWRMS has been updated to version 2.1. New reporting features are now available.', time: '1 day ago', read: true },
    { id: 4, title: 'Waste Alert', desc: 'High volume of plastic waste detected at Science Faculty. Consider scheduling extra collection.', time: '2 days ago', read: true },
    { id: 5, title: 'Welcome Aisha Bello', desc: 'A new user has registered as a Student.', time: '3 days ago', read: true },
  ];

  return (
    <SidebarLayout pageTitle="Notifications" pageIcon={Bell}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
            <p className="text-sm text-slate-500 mt-0.5">Stay updated with the latest activities.</p>
          </div>
          <button className="text-sm text-[#1B4332] font-semibold hover:underline">Mark all as read</button>
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
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{n.desc}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}

import { SidebarLayout } from '../components/SidebarLayout';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const SETTINGS_KEY = 'awrms_settings';

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const saved = loadSettings();
  const [name, setName] = useState(saved.name || user?.full_name || '');
  const [email, setEmail] = useState(saved.email || user?.email || '');
  const [emailNotifs, setEmailNotifs] = useState(saved.emailNotifs ?? true);
  const [pushNotifs, setPushNotifs] = useState(saved.pushNotifs ?? true);
  const [darkMode, setDarkMode] = useState(saved.darkMode ?? false);

  function handleSave() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ name, email, emailNotifs, pushNotifs, darkMode }));
    toast({ title: 'Settings saved', description: 'Your settings have been updated successfully.' });
  }

  return (
    <SidebarLayout pageTitle="Settings" pageIcon={SettingsIcon}>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <input value={user?.role || ''} disabled className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm bg-slate-50 text-slate-500 capitalize"/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Email Notifications</p>
                <p className="text-xs text-slate-500 mt-0.5">Receive email updates about collections and activities.</p>
              </div>
              <button onClick={() => setEmailNotifs(!emailNotifs)} className={`relative w-11 h-6 rounded-full transition-colors ${emailNotifs ? 'bg-[#1B4332]' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${emailNotifs ? 'translate-x-5' : ''}`}/>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Push Notifications</p>
                <p className="text-xs text-slate-500 mt-0.5">Receive push notifications in your browser.</p>
              </div>
              <button onClick={() => setPushNotifs(!pushNotifs)} className={`relative w-11 h-6 rounded-full transition-colors ${pushNotifs ? 'bg-[#1B4332]' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${pushNotifs ? 'translate-x-5' : ''}`}/>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Dark Mode</p>
              <p className="text-xs text-slate-500 mt-0.5">Switch between light and dark themes.</p>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-[#1B4332]' : 'bg-slate-300'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`}/>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Security</h3>
          <button onClick={() => toast({ title: 'Coming Soon', description: 'Password change feature coming soon.' })} className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
            Change Password
          </button>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="px-6 py-2.5 bg-[#1B4332] text-white font-semibold text-sm rounded-md hover:bg-[#153427] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </SidebarLayout>
  );
}

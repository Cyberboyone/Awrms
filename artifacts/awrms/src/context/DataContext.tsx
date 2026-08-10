import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type UserRole } from './AuthContext';

export interface SiteUser {
  id: number;
  full_name: string;
  username: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  joined: string;
}

export interface WasteEntry {
  id: number;
  code: string;
  waste_type: string;
  category: 'recyclable' | 'non_recyclable';
  quantity_kg: number;
  source_location: string;
  collection_date: string;
  status: 'collected' | 'processed' | 'recycled' | 'pending' | 'disposed';
}

export interface CollectionRequest {
  id: number;
  location: string;
  category: string;
  preferred_date: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  assigned_to: string | null;
  created_at: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
}

interface DataContextType {
  users: SiteUser[];
  addUser: (user: Omit<SiteUser, 'id' | 'joined' | 'status'>) => void;
  updateUser: (id: number, user: Partial<SiteUser>) => void;
  deleteUser: (id: number) => void;
  wasteEntries: WasteEntry[];
  requests: CollectionRequest[];
  notifications: Notification[];
  addWaste: (entry: Omit<WasteEntry, 'id'>) => void;
  updateWaste: (id: number, entry: Partial<WasteEntry>) => void;
  deleteWaste: (id: number) => void;
  addRequest: (req: Omit<CollectionRequest, 'id' | 'created_at'>) => void;
  updateRequest: (id: number, req: Partial<CollectionRequest>) => void;
  deleteRequest: (id: number) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'created_at' | 'read'>) => void;
  markNotificationRead: (id: number) => void;
  deleteNotification: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const WASTE_KEY = 'awrms_waste';
const REQUESTS_KEY = 'awrms_requests';
const NOTIFS_KEY = 'awrms_notifications';
const USERS_KEY = 'awrms_site_users';

const defaultUsers: SiteUser[] = [
  { id: 1, full_name: 'Muhammad Musab', username: 'muhammadmusab372', email: 'muhammadmusab372@gmail.com', role: 'admin', status: 'active', joined: '2026-01-15' },
  { id: 2, full_name: 'Aisha Bello', username: 'aisha', email: 'aisha@szu.edu.ng', role: 'student', status: 'active', joined: '2026-02-10' },
  { id: 3, full_name: 'Ibrahim Suleiman', username: 'ibrahim', email: 'ibrahim@szu.edu.ng', role: 'personnel', status: 'active', joined: '2026-01-20' },
  { id: 4, full_name: 'Fatima Abubakar', username: 'fatima', email: 'fatima@szu.edu.ng', role: 'staff', status: 'active', joined: '2026-03-05' },
  { id: 5, full_name: 'Yusuf Abdullahi', username: 'yusuf', email: 'yusuf@szu.edu.ng', role: 'student', status: 'inactive', joined: '2026-04-01' },
];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

const defaultWaste: WasteEntry[] = [
  { id: 1, code: 'WST-2026-001', waste_type: 'plastic', category: 'recyclable', quantity_kg: 120, source_location: 'New Hostel, Block A', collection_date: '2026-05-20', status: 'collected' },
  { id: 2, code: 'WST-2026-002', waste_type: 'paper', category: 'recyclable', quantity_kg: 90, source_location: 'Science Faculty', collection_date: '2026-05-20', status: 'collected' },
  { id: 3, code: 'WST-2026-003', waste_type: 'metal', category: 'recyclable', quantity_kg: 60, source_location: 'Student Center', collection_date: '2026-05-19', status: 'collected' },
  { id: 4, code: 'WST-2026-004', waste_type: 'glass', category: 'recyclable', quantity_kg: 80, source_location: 'Library Complex', collection_date: '2026-05-19', status: 'processed' },
  { id: 5, code: 'WST-2026-005', waste_type: 'organic', category: 'non_recyclable', quantity_kg: 150, source_location: 'Old Hostel, Block C', collection_date: '2026-05-18', status: 'pending' },
];

const defaultRequests: CollectionRequest[] = [
  { id: 1042, location: 'Science Block', category: 'plastic', preferred_date: new Date().toISOString(), status: 'pending', assigned_to: null, created_at: new Date().toISOString() },
  { id: 1041, location: 'Main Library', category: 'paper', preferred_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed', assigned_to: 'John Personnel', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 1040, location: 'Hostel A', category: 'metal', preferred_date: new Date(Date.now() + 172800000).toISOString(), status: 'assigned', assigned_to: 'Sarah Worker', created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 1039, location: 'Cafeteria', category: 'organic', preferred_date: new Date(Date.now() - 259200000).toISOString(), status: 'completed', assigned_to: 'John Personnel', created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 1038, location: 'Admin Block', category: 'other', preferred_date: new Date().toISOString(), status: 'pending', assigned_to: null, created_at: new Date().toISOString() },
];

const defaultNotifs: Notification[] = [
  { id: 1, title: 'System Update', message: 'The waste management system has been updated with new features.', type: 'info', read: false, created_at: new Date().toISOString() },
  { id: 2, title: 'Collection Complete', message: 'Waste collection at Science Faculty has been completed.', type: 'success', read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 3, title: 'Pending Request', message: 'There are 5 new pending collection requests awaiting assignment.', type: 'warning', read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<SiteUser[]>(() => load(USERS_KEY, defaultUsers));
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>(() => load(WASTE_KEY, defaultWaste));
  const [requests, setRequests] = useState<CollectionRequest[]>(() => load(REQUESTS_KEY, defaultRequests));
  const [notifications, setNotifications] = useState<Notification[]>(() => load(NOTIFS_KEY, defaultNotifs));

  useEffect(() => { save(USERS_KEY, users); }, [users]);
  useEffect(() => { save(WASTE_KEY, wasteEntries); }, [wasteEntries]);
  useEffect(() => { save(REQUESTS_KEY, requests); }, [requests]);
  useEffect(() => { save(NOTIFS_KEY, notifications); }, [notifications]);

  const addUser = (userData: Omit<SiteUser, 'id' | 'joined' | 'status'>) => {
    const newUser: SiteUser = { ...userData, id: Date.now(), status: 'active', joined: new Date().toISOString().split('T')[0] };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: number, userData: Partial<SiteUser>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...userData } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const addWaste = (entry: Omit<WasteEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now() };
    setWasteEntries(prev => [newEntry, ...prev]);
  };

  const updateWaste = (id: number, entry: Partial<WasteEntry>) => {
    setWasteEntries(prev => prev.map(e => e.id === id ? { ...e, ...entry } : e));
  };

  const deleteWaste = (id: number) => {
    setWasteEntries(prev => prev.filter(e => e.id !== id));
  };

  const addRequest = (req: Omit<CollectionRequest, 'id' | 'created_at'>) => {
    const newReq = { ...req, id: Date.now(), created_at: new Date().toISOString() };
    setRequests(prev => [newReq, ...prev]);
  };

  const updateRequest = (id: number, req: Partial<CollectionRequest>) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, ...req } : r));
  };

  const deleteRequest = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'created_at' | 'read'>) => {
    const newNotif = { ...notif, id: Date.now(), read: false, created_at: new Date().toISOString() };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DataContext.Provider value={{
      users, addUser, updateUser, deleteUser,
      wasteEntries, requests, notifications,
      addWaste, updateWaste, deleteWaste,
      addRequest, updateRequest, deleteRequest,
      addNotification, markNotificationRead, deleteNotification,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}

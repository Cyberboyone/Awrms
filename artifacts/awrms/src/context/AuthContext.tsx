import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'personnel' | 'admin';

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  registerUser: (user: Omit<User, 'id'>) => boolean;
  findUser: (username: string) => User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'awrms_registered_users';

function getRegisteredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('awrms_user');
      const storedToken = localStorage.getItem('awrms_token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Failed to restore session', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data: AuthResponse) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('awrms_user', JSON.stringify(data.user));
    localStorage.setItem('awrms_token', data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('awrms_user');
    localStorage.removeItem('awrms_token');
    window.location.href = '/login';
  };

  const registerUser = (userData: Omit<User, 'id'>): boolean => {
    const users = getRegisteredUsers();
    const exists = users.find(u => u.username.toLowerCase() === userData.username.toLowerCase());
    if (exists) return false;
    const newUser: User = { ...userData, id: Date.now() };
    users.push(newUser);
    saveRegisteredUsers(users);
    return true;
  };

  const findUser = (username: string): User | undefined => {
    const users = getRegisteredUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, registerUser, findUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

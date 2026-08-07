import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@workspace/api-client-react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    window.location.href = '/login'; // Force a full navigation for logout
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
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

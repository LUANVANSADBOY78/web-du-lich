import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('gotravel_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gotravel_user');
    if (savedUser && token) {
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
    setLoading(false);
  }, [token]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('gotravel_token', accessToken);
    localStorage.setItem('gotravel_user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('gotravel_token');
    localStorage.removeItem('gotravel_user');
    setUser(null);
    setToken(null);
  };

  const isAdmin = () => user?.role === 'Admin' || user?.roles?.includes('Admin');

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};


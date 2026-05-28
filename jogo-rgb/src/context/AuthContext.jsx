import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

  // login agora é async (chama o backend)
  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) setUser(result.user);
    return result;
  };

  // register agora é async
  const register = async (name, email, password) => {
    return authService.register(name, email, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
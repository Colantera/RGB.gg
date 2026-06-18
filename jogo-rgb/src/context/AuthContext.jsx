import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mantém a sessão ativa quando a página é recarregada
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

<<<<<<< HEAD
  // login agora é async (chama o backend)
  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) setUser(result.user);
    return result;
  };

  // register agora é async
  const register = (name, email, password) => {
    return authService.register(name, email, password);
=======
  // FUNÇÃO DE LOGIN CORRIGIDA COM ASYNC/AWAIT
  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      // Agora o estado é atualizado corretamente antes do redirecionamento
      setUser(result.user);
    }
    return result;
  };

  // FUNÇÃO DE REGISTRO CORRIGIDA
  const register = async (name, email, password) => {
    return await authService.register(name, email, password);
  };

  // FUNÇÃO DE AVATAR CORRIGIDA
  const changeAvatar = async (base64Image) => {
    if (user?.email) {
      const result = await authService.updateAvatar(user.email, base64Image);
      if (result.success) {
        setUser(prev => ({ ...prev, avatar: base64Image }));
      }
      return result;
    }
    return { success: false, error: 'Não há usuário logado.' };
>>>>>>> bedf74bc414637a96c98aab3069e6e2b4659e346
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

<<<<<<< HEAD
  if (loading) return null;
=======
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    changeAvatar,
    logout
  };

  if (loading) {
    return null;
  }
>>>>>>> bedf74bc414637a96c98aab3069e6e2b4659e346

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Assim que a página carrega, verifica o Cookie no Backend
  useEffect(() => {
    const carregarSessao = async () => {
      const result = await authService.checkSession();
      if (result.success && result.user) {
        setUser(result.user);
      }
      setLoading(false);
    };

    carregarSessao();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (name, email, password) => {
    return await authService.register(name, email, password);
  };

  const changeAvatar = async (base64Image) => {
    if (user?.email) {
      const result = await authService.updateAvatar(user.email, base64Image);
      if (result.success) {
        // Atualiza a imagem na interface
        setUser(prev => ({ ...prev, avatar: base64Image }));
      }
      return result;
    }
    return { success: false, error: 'Não há utilizador logado.' };
  };

  const logout = async () => {
    await authService.logout(); // Apaga do MySQL e do Cookie
    setUser(null);              // Limpa o React
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    changeAvatar,
    logout
  };

  // Previne "flashes" na interface enquanto o backend confirma o cookie
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', backgroundColor: '#121212' }}>
        A carregar sessão...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
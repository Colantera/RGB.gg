const API_URL = 'http://localhost:5000/auth';

export const authService = {
  // Pergunta ao backend quem está logado (usando o cookie)
  async checkSession() {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        credentials: 'include' // Essencial: envia o cookie
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  },

  async register(name, email, password) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Essencial: diz ao navegador para guardar o cookie que o backend mandar
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  },

  async updateAvatar(email, base64Image) {
    try {
      const response = await fetch(`${API_URL}/avatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Essencial: envia o cookie para validar a permissão
        body: JSON.stringify({ avatar: base64Image })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor.' };
    }
  },

  async logout() {
    try {
      await fetch(`${API_URL}/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (error) {
      console.error('Erro ao terminar sessão', error);
    }
  }
};
const API_URL = 'http://localhost:5000/auth';

export const authService = {
  // A SESSÃO continua no localStorage para o site saber quem está logado ao dar F5
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('rgb_current_user')) || null;
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
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        // Se a API validar o login, nós guardamos o ticket de sessão localmente
        localStorage.setItem('rgb_current_user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  },

  async updateAvatar(email, base64Image) {
    try {
      const response = await fetch(`${API_URL}/avatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, avatar: base64Image })
      });
      const data = await response.json();

      if (data.success) {
        // Atualiza a foto também na sessão atual do navegador
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          currentUser.avatar = base64Image;
          localStorage.setItem('rgb_current_user', JSON.stringify(currentUser));
        }
      }
      return data;
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor.' };
    }
  },

  logout() {
    localStorage.removeItem('rgb_current_user');
  }
};
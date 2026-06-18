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
<<<<<<< HEAD
    
    // Adiciona o campo avatar padrão como null no registro simulado
    users.push({ name, email, password, avatar: null });
    localStorage.setItem('rgb_users', JSON.stringify(users));
    
    return { success: true };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const currentUser = { name: user.name, email: user.email, avatar: user.avatar || null };
      localStorage.setItem('rgb_current_user', JSON.stringify(currentUser));
      return { success: true, user: currentUser };
=======
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
>>>>>>> bedf74bc414637a96c98aab3069e6e2b4659e346
    }
  },

  updateAvatar(email, base64Image) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      users[userIndex].avatar = base64Image;
      localStorage.setItem('rgb_users', JSON.stringify(users));

      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email === email) {
        currentUser.avatar = base64Image;
        localStorage.setItem('rgb_current_user', JSON.stringify(currentUser));
      }
      return { success: true, avatar: base64Image };
    }
    return { success: false, error: 'Usuário não encontrado.' };
  },

  logout() {
    localStorage.removeItem('rgb_current_user');
  }
};
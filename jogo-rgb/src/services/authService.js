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
>>>>>>> bedf74bc414637a96c98aab3069e6e2b4659e346
    }
  },

<<<<<<< HEAD
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
=======
  async logout() {
    try {
      await fetch(`${API_URL}/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (error) {
      console.error('Erro ao terminar sessão', error);
    }
>>>>>>> 997016df570b992a207d60cd21aee425b9312172
  }
};
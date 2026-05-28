export const authService = {
  getUsers() {
    return JSON.parse(localStorage.getItem('rgb_users')) || [];
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('rgb_current_user')) || null;
  },

  register(name, email, password) {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'E-mail já cadastrado.' };
    }
    
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
    }
    
    return { success: false, error: 'Credenciais inválidas.' };
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
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
    
    users.push({ name, email, password });
    localStorage.setItem('rgb_users', JSON.stringify(users));
    
    return { success: true };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const currentUser = { name: user.name, email: user.email };
      localStorage.setItem('rgb_current_user', JSON.stringify(currentUser));
      return { success: true, user: currentUser };
    }
    
    return { success: false, error: 'Credenciais inválidas.' };
  },

  logout() {
    localStorage.removeItem('rgb_current_user');
  }
};
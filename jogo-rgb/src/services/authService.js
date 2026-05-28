const API = 'http://localhost:3001';

const saveSession = (token, user) => {
  localStorage.setItem('rgb_token', token);
  localStorage.setItem('rgb_user', JSON.stringify(user));
};

export const authService = {
  getToken() {
    return localStorage.getItem('rgb_token');
  },

  getCurrentUser() {
    const raw = localStorage.getItem('rgb_user');
    return raw ? JSON.parse(raw) : null;
  },

  async register(name, email, password) {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error };

      saveSession(data.token, data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Servidor indisponível.' };
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error };

      saveSession(data.token, data.user);
      return { success: true, user: data.user };
    } catch {
      return { success: false, error: 'Servidor indisponível.' };
    }
  },

  logout() {
    localStorage.removeItem('rgb_token');
    localStorage.removeItem('rgb_user');
  },
};
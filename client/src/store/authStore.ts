import { create } from 'zustand';
import api from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('sskk_token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('sskk_token'),

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const user = data.data.user;
      const token = data.data.token;
      localStorage.setItem('sskk_token', token);
      localStorage.setItem('sskk_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false });
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },

  register: async (formData: Record<string, unknown>) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/register', formData);
      const user = data.data.user;
      const token = data.data.token;
      localStorage.setItem('sskk_token', token);
      localStorage.setItem('sskk_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false });
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    }
    localStorage.removeItem('sskk_token');
    localStorage.removeItem('sskk_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const storedUser = localStorage.getItem('sskk_user');
    if (storedUser) {
      try {
        set({ user: JSON.parse(storedUser), isAuthenticated: true });
      } catch {
        // fallback
      }
    }
    try {
      const { data } = await api.get('/auth/me');
      const user = data.data.user;
      localStorage.setItem('sskk_user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem('sskk_token');
      localStorage.removeItem('sskk_user');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  clearAuth: () => {
    localStorage.removeItem('sskk_token');
    localStorage.removeItem('sskk_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;

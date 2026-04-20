import { create } from 'zustand';
import api from '@/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TRAINER' | 'ADMIN' | 'MENTOR';
  avatar?: string;
  avatar_url?: string;
  level: string;
  bio?: string;
  phone?: string;
  created_at?: string;
  skills?: string[];
  expertise?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<string>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  
  setUser: (user) => set({ user }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/api/login', credentials);
      
      if (data.token) {
        localStorage.setItem('siba_token', data.token);
      }
      
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data.redirect || '/dashboard';
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/api/register', data);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/api/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('siba_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('siba_token');
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const { data } = await api.get('/api/user');
      set({ user: data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('siba_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

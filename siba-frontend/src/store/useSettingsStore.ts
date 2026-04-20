import { create } from 'zustand';
import api from '@/lib/axios';

interface SettingsState {
  settings: any;
  loading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {},
  loading: true,
  fetchSettings: async () => {
    try {
      const response = await api.get('/api/settings');
      set({ settings: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch settings', error);
      set({ loading: false });
    }
  },
}));

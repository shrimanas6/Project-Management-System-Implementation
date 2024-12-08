import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings } from '../types/settings';

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        theme: 'light',
        notifications: true,
        emailNotifications: false,
        language: 'en',
        timeFormat: '24h',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'user-settings',
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SidebarDensity, ThemeMode } from '@/types';

interface PrefsState {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  sidebarDensity: SidebarDensity;
  setTheme: (theme: ThemeMode) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarDensity: (density: SidebarDensity) => void;
}

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarCollapsed: false,
      sidebarDensity: 'comfortable',
      setTheme: (theme) => set({ theme }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarDensity: (sidebarDensity) => set({ sidebarDensity }),
    }),
    {
      name: 'jenan-lab-hub-prefs',
    },
  ),
);

interface ToastState {
  message: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (message) => {
    set({ message });
    setTimeout(() => set({ message: null }), 3000);
  },
  clearToast: () => set({ message: null }),
}));

import { create } from 'zustand';

interface UIState {
  recruiterMode: boolean;
  cliOpen: boolean;
  cmdPaletteOpen: boolean;
  theme: 'dark' | 'light';
  toggleRecruiterMode: () => void;
  setCliOpen: (open: boolean) => void;
  setCmdPaletteOpen: (open: boolean) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  recruiterMode: (() => {
    try {
      return localStorage.getItem('recruiterMode') === 'true';
    } catch {
      return false;
    }
  })(),
  cliOpen: false,
  cmdPaletteOpen: false,
  theme: (() => {
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  })(),
  toggleRecruiterMode: () => set((state) => {
    const next = !state.recruiterMode;
    try {
      localStorage.setItem('recruiterMode', String(next));
    } catch (e) {
      console.warn('LocalStorage recruiterMode set error:', e);
    }
    return { recruiterMode: next };
  }),
  setCliOpen: (open) => set({ cliOpen: open }),
  setCmdPaletteOpen: (open) => set({ cmdPaletteOpen: open }),
  toggleTheme: () => set((state) => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      console.warn('LocalStorage theme set error:', e);
    }
    const root = document.documentElement;
    if (next === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    return { theme: next };
  }),
  initTheme: () => {
    try {
      const stored = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
      const root = document.documentElement;
      if (stored === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      set({ theme: stored });
    } catch {
      document.documentElement.classList.add('dark');
    }
  }
}));

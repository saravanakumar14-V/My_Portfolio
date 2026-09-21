import { create } from 'zustand';

export type ExperienceState = 'booting' | 'loading' | 'reveal' | 'interactive' | 'scrolling' | 'leaving';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  isMenuOpen: boolean;
  reducedMotion: boolean;
  experienceState: ExperienceState;
  ambientColor: string;
  
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setMenuOpen: (isOpen: boolean) => void;
  setReducedMotion: (isReduced: boolean) => void;
  setExperienceState: (state: ExperienceState) => void;
  setAmbientColor: (color: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'system',
  isMenuOpen: false,
  reducedMotion: false,
  experienceState: 'booting',
  ambientColor: '#ffffff',
  
  setTheme: (theme) => set({ theme }),
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setExperienceState: (experienceState) => set({ experienceState }),
  setAmbientColor: (ambientColor) => set({ ambientColor }),
}));

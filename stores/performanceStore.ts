import { create } from 'zustand';

interface PerformanceState {
  fps: number;
  isLowEndDevice: boolean;
  disableHeavyEffects: boolean;
  
  setFps: (fps: number) => void;
  setLowEndDevice: (isLowEnd: boolean) => void;
  setDisableHeavyEffects: (disable: boolean) => void;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  fps: 60,
  isLowEndDevice: false,
  disableHeavyEffects: false,
  
  setFps: (fps) => set((state) => {
    // If FPS drops below 30 consistently, we might want to disable heavy effects
    // This logic can be expanded in the PerformanceProvider
    const isStruggling = fps < 30;
    return {
      fps,
      disableHeavyEffects: state.disableHeavyEffects || isStruggling,
    };
  }),
  
  setLowEndDevice: (isLowEndDevice) => set({ isLowEndDevice }),
  setDisableHeavyEffects: (disableHeavyEffects) => set({ disableHeavyEffects }),
}));

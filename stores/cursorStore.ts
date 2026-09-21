import { create } from 'zustand';

export type CursorState = 
  | 'default'
  | 'hover'
  | 'link'
  | 'button'
  | 'project'
  | 'image'
  | 'drag'
  | 'scroll'
  | 'loading'
  | 'disabled';

interface CursorStoreData {
  state: CursorState;
  label: string | null;
  isVisible: boolean;
  isMagnetic: boolean;
  
  // Actions
  setState: (state: CursorState) => void;
  setLabel: (label: string | null) => void;
  setVisibility: (isVisible: boolean) => void;
  setMagnetic: (isMagnetic: boolean) => void;
  reset: () => void;
}

export const useCursorStore = create<CursorStoreData>((set) => ({
  state: 'default',
  label: null,
  isVisible: false, // Hidden until first mouse move
  isMagnetic: false,

  setState: (state) => set({ state }),
  setLabel: (label) => set({ label }),
  setVisibility: (isVisible) => set({ isVisible }),
  setMagnetic: (isMagnetic) => set({ isMagnetic }),
  
  reset: () => set({
    state: 'default',
    label: null,
    isMagnetic: false,
  }),
}));

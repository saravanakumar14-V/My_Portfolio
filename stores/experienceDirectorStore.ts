import { create } from 'zustand';

export type NarrativeChapter = 
  | 'booting' 
  | 'hero' 
  | 'showcase' 
  | 'about' 
  | 'journey' 
  | 'capabilities' 
  | 'contact';

export interface Atmosphere {
  ambientColor: string;
  cursorColor: string;
  ambientIntensity: number;
  cursorWeight: number; // 0.15 (smooth inertia) to 0.25 (snappy)
  motionScale: number;
}

export const CHAPTER_ATMOSPHERES: Record<NarrativeChapter, Atmosphere> = {
  booting: {
    ambientColor: 'rgba(255, 255, 255, 0.05)',
    cursorColor: '#E2E8F0',
    ambientIntensity: 0.1,
    cursorWeight: 0.18,
    motionScale: 1.0,
  },
  hero: {
    ambientColor: 'rgba(59, 167, 255, 0.12)',
    cursorColor: '#3BA7FF', // Electric blue
    ambientIntensity: 0.3,
    cursorWeight: 0.18,
    motionScale: 1.0,
  },
  showcase: {
    ambientColor: 'rgba(103, 217, 255, 0.1)',
    cursorColor: '#67D9FF', // Vibrant cyan
    ambientIntensity: 0.25,
    cursorWeight: 0.2,
    motionScale: 0.9,
  },
  about: {
    ambientColor: 'rgba(96, 165, 250, 0.08)',
    cursorColor: '#60A5FA', // Soft atmospheric blue
    ambientIntensity: 0.18,
    cursorWeight: 0.18,
    motionScale: 1.0,
  },
  journey: {
    ambientColor: 'rgba(56, 189, 248, 0.08)',
    cursorColor: '#38BDF8', // Sky cyan
    ambientIntensity: 0.2,
    cursorWeight: 0.18,
    motionScale: 1.0,
  },
  capabilities: {
    ambientColor: 'rgba(129, 140, 248, 0.06)',
    cursorColor: '#818CF8', // Indigo/Blue
    ambientIntensity: 0.15,
    cursorWeight: 0.18,
    motionScale: 1.0,
  },
  contact: {
    ambientColor: 'rgba(103, 217, 255, 0.15)',
    cursorColor: '#67D9FF', // Bright luminous cyan
    ambientIntensity: 0.3,
    cursorWeight: 0.22,
    motionScale: 1.0,
  }
};

interface ExperienceDirectorState {
  activeChapter: NarrativeChapter;
  atmosphere: Atmosphere;
  setChapter: (chapter: NarrativeChapter) => void;
}

export const useExperienceDirector = create<ExperienceDirectorState>((set) => ({
  activeChapter: 'booting',
  atmosphere: CHAPTER_ATMOSPHERES['booting'],
  setChapter: (chapter) => set({ 
    activeChapter: chapter, 
    atmosphere: CHAPTER_ATMOSPHERES[chapter] || CHAPTER_ATMOSPHERES['booting']
  }),
}));

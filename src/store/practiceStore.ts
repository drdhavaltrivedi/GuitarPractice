import { create } from 'zustand';

interface PracticeStore {
  sessionActive: boolean;
  sessionStart: number | null;
  elapsedSeconds: number;
  completedItems: string[];

  startSession: () => void;
  stopSession: () => void;
  tickSecond: () => void;
  toggleItem: (id: string) => void;
  resetSession: () => void;
}

export const usePracticeStore = create<PracticeStore>((set, get) => ({
  sessionActive: false,
  sessionStart: null,
  elapsedSeconds: 0,
  completedItems: [],

  startSession: () => set({ sessionActive: true, sessionStart: Date.now(), elapsedSeconds: 0 }),

  stopSession: () => set({ sessionActive: false }),

  tickSecond: () => {
    if (get().sessionActive) {
      set(s => ({ elapsedSeconds: s.elapsedSeconds + 1 }));
    }
  },

  toggleItem: (id) => {
    const { completedItems } = get();
    set({
      completedItems: completedItems.includes(id)
        ? completedItems.filter(x => x !== id)
        : [...completedItems, id],
    });
  },

  resetSession: () => set({ sessionActive: false, sessionStart: null, elapsedSeconds: 0, completedItems: [] }),
}));

import { create } from 'zustand';
import { PracticeEntry } from '../data/types';
import { loadLog, saveLog } from '../storage/practiceLog';

interface ProgressStore {
  log: PracticeEntry[];
  bpmRecords: Record<string, number>;
  streak: number;
  loaded: boolean;

  loadFromStorage: () => Promise<void>;
  addEntry: (entry: PracticeEntry) => Promise<void>;
  updateBpmRecord: (exerciseId: string, bpm: number) => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  log: [],
  bpmRecords: {},
  streak: 0,
  loaded: false,

  loadFromStorage: async () => {
    const log = await loadLog();
    set({ log, streak: calcStreak(log), loaded: true });
  },

  addEntry: async (entry) => {
    const log = [...get().log, entry];
    set({ log, streak: calcStreak(log) });
    await saveLog(log);
  },

  updateBpmRecord: (exerciseId, bpm) => {
    const current = get().bpmRecords[exerciseId] ?? 0;
    if (bpm > current) {
      set(s => ({ bpmRecords: { ...s.bpmRecords, [exerciseId]: bpm } }));
    }
  },
}));

function calcStreak(log: PracticeEntry[]): number {
  if (log.length === 0) return 0;
  const dates = [...new Set(log.map(e => e.date))].sort().reverse();
  let streak = 0;
  let check = new Date().toISOString().split('T')[0];
  for (const date of dates) {
    if (date === check) {
      streak++;
      const d = new Date(check);
      d.setDate(d.getDate() - 1);
      check = d.toISOString().split('T')[0];
    } else break;
  }
  return streak;
}

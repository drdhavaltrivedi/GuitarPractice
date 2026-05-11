export interface Scale {
  key: string;
  notes: string[];
  sharps: number;
  sharpNotes: string[];
  positions: ScalePosition[];
}

export interface ScalePosition {
  label: string;
  startFret: number;
  strings: Record<GuitarString, NoteOnString[]>;
}

export type GuitarString = 'E' | 'A' | 'D' | 'G' | 'B' | 'e';

export interface NoteOnString {
  fret: number;       // 0 = open string
  note: string;       // "C", "F#", etc.
  finger?: 1 | 2 | 3 | 4;
}

export interface RHExercise {
  id: string;
  number: number;
  label: string;
  pattern: string[];  // ["D","U","D","U"]
  targetBpm: number;
  startBpm: number;
  note: string;       // "Each string", "Alternate strings"
  videoUrl?: string;  // Link to a YouTube demo or GIF
}

export interface LHExercise {
  stringName: string; // "6th String (E)"
  openNote: string;
  fingerNotes: { note: string; finger: number; fret: number }[];
  patterns: string[]; // ["AABB","CCBB",...]
  videoUrl?: string;
}

export interface Alankar {
  number: number;
  type: string;
  ascending: string[];    // individual notes in order
  descending: string[];
  groupSize: number;      // notes per group (1,2,3,4,5)
  targetBpm: number;
  startBpm: number;
  videoUrl?: string;
}

export interface PracticeEntry {
  id: string;
  date: string;            // "2026-05-10"
  durationSeconds: number;
  completedItems: string[];
  bpmAchieved: Record<string, number>;
}

export interface UserSettings {
  defaultBpm: number;
  defaultKey: string;
  hapticEnabled: boolean;
  theme: 'dark';           // dark only for v1
}

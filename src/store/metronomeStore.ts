import { create } from 'zustand';
import { metronomeEngine } from '../engine/MetronomeEngine';
import { TapTempoCalculator } from '../engine/TapTempo';
import { BpmRampController } from '../engine/BpmRamp';

const tapCalc = new TapTempoCalculator();
const rampCtrl = new BpmRampController();

interface MetronomeStore {
  bpm: number;
  isPlaying: boolean;
  timeSignature: 2 | 3 | 4 | 6;
  currentBeat: number;
  rampEnabled: boolean;
  rampStartBpm: number;
  rampEndBpm: number;
  rampDurationMin: number;
  rampProgress: number;
  exerciseContext: { label: string; targetBpm: number } | null;

  setBpm: (bpm: number) => void;
  togglePlay: () => void;
  setTimeSignature: (ts: 2 | 3 | 4 | 6) => void;
  tapTempo: () => void;
  setCurrentBeat: (beat: number) => void;
  setRampEnabled: (enabled: boolean) => void;
  setRampStartBpm: (bpm: number) => void;
  setRampEndBpm: (bpm: number) => void;
  setRampDurationMin: (min: number) => void;
  setExerciseContext: (ctx: { label: string; targetBpm: number } | null) => void;
  startRamp: () => void;
  stopRamp: () => void;
}

export const useMetronomeStore = create<MetronomeStore>((set, get) => ({
  bpm: 80,
  isPlaying: false,
  timeSignature: 4,
  currentBeat: 0,
  rampEnabled: false,
  rampStartBpm: 80,
  rampEndBpm: 180,
  rampDurationMin: 10,
  rampProgress: 0,
  exerciseContext: null,

  setBpm: (bpm) => {
    set({ bpm });
    metronomeEngine.setBpm(bpm);
  },

  // onBeat is intentionally NOT set here — useMetronome hook owns it
  togglePlay: () => {
    const { isPlaying, bpm, timeSignature } = get();
    if (isPlaying) {
      metronomeEngine.stop();
      set({ isPlaying: false, currentBeat: 0 });
    } else {
      metronomeEngine.setBpm(bpm);
      metronomeEngine.setTimeSignature(timeSignature);
      metronomeEngine.start();
      set({ isPlaying: true });
    }
  },

  setTimeSignature: (ts) => {
    set({ timeSignature: ts });
    metronomeEngine.setTimeSignature(ts);
  },

  tapTempo: () => {
    const bpm = tapCalc.tap();
    if (bpm) get().setBpm(bpm);
  },

  setCurrentBeat: (currentBeat) => set({ currentBeat }),

  setRampEnabled: (rampEnabled) => set({ rampEnabled }),

  setRampStartBpm: (bpm) => set({ rampStartBpm: Math.max(20, Math.min(400, bpm)) }),

  setRampEndBpm: (bpm) => set({ rampEndBpm: Math.max(20, Math.min(400, bpm)) }),

  setRampDurationMin: (rampDurationMin) => set({ rampDurationMin }),

  setExerciseContext: (exerciseContext) => set({ exerciseContext }),

  startRamp: () => {
    const { rampStartBpm, rampEndBpm, rampDurationMin } = get();
    get().setBpm(rampStartBpm);
    rampCtrl.start(
      rampStartBpm, rampEndBpm, rampDurationMin,
      (bpm, progress) => { get().setBpm(bpm); set({ rampProgress: progress }); },
      () => set({ rampEnabled: false, rampProgress: 1 }),
    );
  },

  stopRamp: () => {
    rampCtrl.stop();
    set({ rampProgress: 0 });
  },
}));

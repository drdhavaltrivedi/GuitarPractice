import { useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { metronomeEngine } from '../engine/MetronomeEngine';
import { useMetronomeStore } from '../store/metronomeStore';
import { loadSettings } from '../storage/settings';

export function useMetronome() {
  const store = useMetronomeStore();
  const hapticRef = useRef(true);

  useEffect(() => {
    loadSettings().then(s => { hapticRef.current = s.hapticEnabled; });

    // Single owner of onBeat — fires haptics + updates UI beat indicator
    metronomeEngine.onBeat = (beat) => {
      store.setCurrentBeat(beat);
      if (hapticRef.current) {
        Haptics.impactAsync(
          beat === 0
            ? Haptics.ImpactFeedbackStyle.Heavy
            : Haptics.ImpactFeedbackStyle.Light,
        ).catch(() => {});
      }
    };

    return () => {
      metronomeEngine.onBeat = null;
    };
  }, []);

  return store;
}

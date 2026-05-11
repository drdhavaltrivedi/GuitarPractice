import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { useMetronome } from '../../src/hooks/useMetronome';
import { BeatIndicator } from '../../src/components/metronome/BeatIndicator';
import { BpmDisplay } from '../../src/components/metronome/BpmDisplay';
import { BpmStepper } from '../../src/components/metronome/BpmStepper';
import { PresetButtons } from '../../src/components/metronome/PresetButtons';
import { PlayStopButton } from '../../src/components/metronome/PlayStopButton';
import { TapTempoButton } from '../../src/components/metronome/TapTempoButton';
import { TimeSignature } from '../../src/components/metronome/TimeSignature';
import { RampControl } from '../../src/components/metronome/RampControl';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { SCROLL_BOTTOM_PAD, rs, rf } from '../../src/theme/responsive';

export default function MetronomeScreen() {
  useKeepAwake();

  const {
    bpm, isPlaying, timeSignature, currentBeat,
    exerciseContext,
    setBpm, togglePlay, setTimeSignature, setExerciseContext,
  } = useMetronome();

  const params = useLocalSearchParams<{ bpm?: string; label?: string }>();

  useEffect(() => {
    if (params.bpm) {
      const presetBpm = parseInt(params.bpm, 10);
      if (!isNaN(presetBpm)) setBpm(presetBpm);
    }
    setExerciseContext(
      params.label
        ? { label: params.label, targetBpm: params.bpm ? parseInt(params.bpm, 10) : bpm }
        : null,
    );
  }, [params.bpm, params.label]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Context bar */}
      {exerciseContext && (
        <View style={styles.contextBar}>
          <Text style={styles.contextText} numberOfLines={1}>
            {exerciseContext.label}  ·  TARGET {exerciseContext.targetBpm} BPM
          </Text>
        </View>
      )}

      {/* Screen title */}
      <Text style={styles.screenTitle}>METRONOME</Text>

      {/* TAP + PLAY row — top corners of dial */}
      <View style={styles.topRow}>
        <TapTempoButton />
        <BeatIndicator
          totalBeats={timeSignature}
          currentBeat={currentBeat}
          isPlaying={isPlaying}
        />
        <PlayStopButton isPlaying={isPlaying} onPress={togglePlay} />
      </View>

      {/* Central arc dial */}
      <View style={styles.dialWrapper}>
        <BpmDisplay bpm={bpm} onChangeBpm={setBpm} />
      </View>

      {/* -1 / +1 stepper */}
      <BpmStepper bpm={bpm} onChangeBpm={setBpm} />

      {/* Time signature + ramp */}
      <View style={styles.settingsRow}>
        <TimeSignature value={timeSignature} onChange={setTimeSignature} />
      </View>

      <View style={styles.rampSection}>
        <RampControl />
      </View>

      {/* Preset pills — bottom */}
      <View style={styles.presetWrapper}>
        <Text style={styles.presetsLabel}>PRESETS</Text>
        <PresetButtons currentBpm={bpm} onSelect={setBpm} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: colors.background },

  contextBar:    { marginHorizontal: spacing.lg, marginTop: spacing.sm, backgroundColor: colors.surfaceCard, borderRadius: 12, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.gold },
  contextText:   { color: colors.gold, fontSize: rf(12), textAlign: 'center', letterSpacing: 1, fontWeight: '700' },

  screenTitle:   { color: colors.textSecondary, fontSize: rf(13), letterSpacing: 4, fontWeight: '800', textAlign: 'center', marginTop: rs(spacing.lg), marginBottom: rs(spacing.sm) },

  topRow:        {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(spacing.xl),
    marginTop: rs(spacing.sm),
  },

  dialWrapper:   { alignItems: 'center', marginTop: rs(spacing.md) },

  settingsRow:   { alignItems: 'center', marginTop: rs(spacing.md) },

  rampSection:   { marginHorizontal: spacing.lg, marginTop: rs(spacing.sm) },

  presetWrapper: {
    marginTop: 'auto',
    paddingTop: spacing.md,
    paddingBottom: SCROLL_BOTTOM_PAD,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  presetsLabel:  { color: colors.textMuted, fontSize: rf(10), letterSpacing: 2, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
});

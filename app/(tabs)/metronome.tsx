import { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {exerciseContext && (
          <View style={styles.contextBar}>
            <Text style={styles.contextText} numberOfLines={1}>
              {exerciseContext.label}  ·  target {exerciseContext.targetBpm} BPM
            </Text>
          </View>
        )}

        <BeatIndicator
          totalBeats={timeSignature}
          currentBeat={currentBeat}
          isPlaying={isPlaying}
        />

        <BpmDisplay bpm={bpm} onChangeBpm={setBpm} />

        <BpmStepper bpm={bpm} onChangeBpm={setBpm} />

        <PresetButtons currentBpm={bpm} onSelect={setBpm} />

        <PlayStopButton isPlaying={isPlaying} onPress={togglePlay} />

        <TapTempoButton />

        <TimeSignature value={timeSignature} onChange={setTimeSignature} />

        <RampControl />

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: colors.background },
  scroll:      { flex: 1 },
  content:     { alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  contextBar:  { width: '100%', backgroundColor: colors.surfaceHigh, borderRadius: 8, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  contextText: { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading, textAlign: 'center' },
  spacer:      { height: spacing.xxl },
});

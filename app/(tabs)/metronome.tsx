import { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
              {exerciseContext.label}  ·  TARGET {exerciseContext.targetBpm} BPM
            </Text>
          </View>
        )}

        <View style={styles.topSection}>
          <BeatIndicator
            totalBeats={timeSignature}
            currentBeat={currentBeat}
            isPlaying={isPlaying}
          />
        </View>

        <View style={styles.dialCard}>
          <BpmDisplay bpm={bpm} onChangeBpm={setBpm} />
          <BpmStepper bpm={bpm} onChangeBpm={setBpm} />
        </View>

        <View style={styles.presetsWrapper}>
          <PresetButtons currentBpm={bpm} onSelect={setBpm} />
        </View>

        <View style={styles.controlsRow}>
          <PlayStopButton isPlaying={isPlaying} onPress={togglePlay} />
        </View>

        <View style={styles.tapRow}>
          <TapTempoButton />
        </View>

        <View style={styles.settingsCard}>
          <TimeSignature value={timeSignature} onChange={setTimeSignature} />
          <View style={styles.divider} />
          <RampControl />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: colors.background },
  scroll:        { flex: 1 },
  content:       { alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  
  contextBar:    { width: '100%', backgroundColor: colors.surfaceCard, borderRadius: 12, paddingVertical: spacing.md, paddingHorizontal: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.gold },
  contextText:   { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading, textAlign: 'center', letterSpacing: 1, fontWeight: '700' },
  
  topSection:    { width: '100%', alignItems: 'center', marginBottom: spacing.sm },
  
  dialCard:      { width: '100%', backgroundColor: colors.surfaceCard, borderRadius: 32, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  
  presetsWrapper:{ width: '100%', marginBottom: spacing.xl },
  
  controlsRow:   { width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  
  tapRow:        { width: '100%', alignItems: 'center', marginBottom: spacing.xl },

  settingsCard:  { width: '100%', backgroundColor: colors.surfaceCard, borderRadius: 24, padding: spacing.xl, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  divider:       { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.lg },

  spacer:        { height: spacing.xxl },
});

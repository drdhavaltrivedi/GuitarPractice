import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useMetronomeStore } from '../../store/metronomeStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const DURATIONS = [5, 10, 15, 20] as const;

export function RampControl() {
  const {
    rampEnabled, rampStartBpm, rampEndBpm, rampDurationMin, rampProgress,
    isPlaying,
    setRampEnabled, setRampStartBpm, setRampEndBpm, setRampDurationMin,
    startRamp, stopRamp, togglePlay,
  } = useMetronomeStore();

  const [open, setOpen] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    Animated.timing(heightAnim, {
      toValue: next ? 260 : 0,
      duration: 220,
      useNativeDriver: false, // height cannot use native driver
    }).start();
  };

  const handleStartRamp = () => {
    setRampEnabled(true);
    if (!isPlaying) togglePlay();
    startRamp();
  };

  const handleStopRamp = () => {
    stopRamp();
    setRampEnabled(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.7}>
        <Text style={styles.headerText}>BPM Ramp</Text>
        <Text style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
      </TouchableOpacity>

      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <View style={styles.body}>
          {/* Start BPM */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Start BPM</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setRampStartBpm(rampStartBpm - 5)}>
                <Text style={styles.stepText}>−5</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{rampStartBpm}</Text>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setRampStartBpm(rampStartBpm + 5)}>
                <Text style={styles.stepText}>+5</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* End BPM */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>End BPM</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setRampEndBpm(rampEndBpm - 5)}>
                <Text style={styles.stepText}>−5</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{rampEndBpm}</Text>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setRampEndBpm(rampEndBpm + 5)}>
                <Text style={styles.stepText}>+5</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Duration</Text>
            <View style={styles.durationRow}>
              {DURATIONS.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.durationBtn, rampDurationMin === d && styles.durationBtnActive]}
                  onPress={() => setRampDurationMin(d)}
                >
                  <Text style={[styles.durationText, rampDurationMin === d && styles.durationTextActive]}>
                    {d}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {rampEnabled && rampProgress > 0 && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${rampProgress * 100}%` as any }]} />
            </View>
          )}

          <TouchableOpacity
            style={[styles.rampBtn, rampEnabled && styles.rampBtnActive]}
            onPress={rampEnabled ? handleStopRamp : handleStartRamp}
            activeOpacity={0.8}
          >
            <Text style={styles.rampBtnText}>{rampEnabled ? 'Stop Ramp' : 'Start Ramp'}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:          { marginTop: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: 12, overflow: 'hidden' },
  header:             { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface },
  headerText:         { color: colors.textPrimary, fontSize: typography.md },
  chevron:            { color: colors.textSecondary, fontSize: 22, transform: [{ rotate: '90deg' }] },
  chevronOpen:        { transform: [{ rotate: '-90deg' }] },
  body:               { padding: spacing.md, gap: spacing.md, backgroundColor: colors.surface },
  row:                { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fieldLabel:         { color: colors.textSecondary, fontSize: typography.sm },
  stepper:            { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepBtn:            { paddingHorizontal: spacing.sm + 2, paddingVertical: 4, backgroundColor: colors.surfaceHigh, borderRadius: 6 },
  stepText:           { color: colors.textPrimary, fontSize: typography.sm },
  value:              { color: colors.gold, fontSize: typography.md, minWidth: 36, textAlign: 'center' },
  durationRow:        { flexDirection: 'row', gap: spacing.xs },
  durationBtn:        { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.border },
  durationBtnActive:  { borderColor: colors.gold },
  durationText:       { color: colors.textSecondary, fontSize: typography.sm },
  durationTextActive: { color: colors.gold },
  progressContainer:  { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  progressBar:        { height: 6, backgroundColor: colors.gold, borderRadius: 3 },
  rampBtn:            { paddingVertical: spacing.sm + 2, borderRadius: 8, backgroundColor: colors.goldDim, alignItems: 'center' },
  rampBtnActive:      { backgroundColor: colors.error },
  rampBtnText:        { color: colors.textPrimary, fontSize: typography.md, fontFamily: typography.heading },
});

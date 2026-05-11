import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RHExercise } from '../../data/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { rs, rf } from '../../theme/responsive';
import { InfoButton } from '../ui/InfoButton';
import { useProgressStore } from '../../store/progressStore';

interface Props {
  exercise: RHExercise;
  onPractice: () => void;
}

export function ExerciseCard({ exercise, onPractice }: Props) {
  const bpmRecords = useProgressStore(state => state.bpmRecords);
  const record = bpmRecords[exercise.id];
  const progress = record ? Math.min(1, record / exercise.targetBpm) : 0;
  const mastery = Math.round(progress * 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{exercise.number}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{exercise.label}</Text>
            {exercise.description && (
              <InfoButton title={`Ex ${exercise.number}: ${exercise.label}`} description={exercise.description} />
            )}
          </View>
          <Text style={styles.note}>{exercise.note}</Text>
        </View>
        <View style={styles.targetBadge}>
          <Text style={styles.targetLabel}>TARGET</Text>
          <Text style={styles.target}>{exercise.targetBpm} BPM</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>MY BEST: <Text style={{ color: colors.textPrimary }}>{record ? `${record} BPM` : '—'}</Text></Text>
          <Text style={styles.progressLabel}>{mastery}% Mastery</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${mastery}%` }]} />
        </View>
      </View>

      <View style={styles.patternLabelRow}>
        <Text style={styles.patternLabel}>PICKING PATTERN</Text>
      </View>
      
      <View style={styles.pattern}>
        {exercise.pattern.map((stroke, i) => (
          <View key={i} style={[styles.stroke, stroke === 'D' ? styles.down : styles.up]}>
            <Ionicons 
              name={stroke === 'D' ? 'arrow-down' : 'arrow-up'} 
              size={12} 
              color={stroke === 'D' ? colors.down : colors.up} 
            />
            <Text style={[styles.strokeText, { color: stroke === 'D' ? colors.down : colors.up }]}>{stroke}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        {exercise.videoUrl && (
          <TouchableOpacity 
            style={[styles.btn, styles.demoBtn]} 
            onPress={() => WebBrowser.openBrowserAsync(exercise.videoUrl!)} 
            activeOpacity={0.8}
          >
            <Ionicons name="play-circle-outline" size={18} color={colors.gold} style={{ marginRight: 6 }} />
            <Text style={styles.demoBtnText}>Watch</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btn, styles.practiceBtn]} onPress={onPractice} activeOpacity={0.8}>
          <Ionicons name="flash" size={16} color={colors.background} style={{ marginRight: 6 }} />
          <Text style={styles.btnText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { backgroundColor: colors.surfaceCard, borderRadius: 24, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  header:      { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  badge:       { width: rs(40), height: rs(40), borderRadius: rs(12), backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.goldDim + '44' },
  badgeText:   { color: colors.gold, fontSize: rf(16), fontWeight: '800' },
  info:        { flex: 1 },
  nameRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  name:        { color: colors.textPrimary, fontSize: rf(16), fontWeight: '800' },
  note:        { color: colors.textMuted, fontSize: rf(11), fontWeight: '600' },
  targetBadge: { alignItems: 'flex-end', backgroundColor: colors.surfaceHigh, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  targetLabel: { color: colors.textDisabled, fontSize: rf(8), fontWeight: '800', letterSpacing: 0.5 },
  target:      { color: colors.gold, fontSize: rf(12), fontWeight: '800' },
  
  progressContainer: { marginBottom: spacing.lg },
  progressHeader:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel:     { color: colors.textMuted, fontSize: rf(10), fontWeight: '700' },
  progressBarBg:     { height: 6, backgroundColor: colors.surfaceHigh, borderRadius: 3, overflow: 'hidden' },
  progressBarFill:   { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },

  patternLabelRow:   { marginBottom: 8 },
  patternLabel:      { color: colors.textDisabled, fontSize: rf(9), fontWeight: '800', letterSpacing: 1.5 },
  pattern:           { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: spacing.xl },
  stroke:            { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  strokeText:        { fontSize: rf(10), fontWeight: '900' },
  down:              { borderColor: colors.down + '33' },
  up:                { borderColor: colors.up + '33' },
  
  actions:     { flexDirection: 'row', gap: spacing.md },
  btn:         { flex: 1, borderRadius: 16, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  practiceBtn: { backgroundColor: colors.gold, elevation: 4, shadowColor: colors.gold, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  demoBtn:     { backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.gold + '33' },
  btnText:     { color: colors.background, fontSize: rf(14), fontWeight: '800', letterSpacing: 0.5 },
  demoBtnText: { color: colors.gold, fontSize: rf(14), fontWeight: '700' },
});

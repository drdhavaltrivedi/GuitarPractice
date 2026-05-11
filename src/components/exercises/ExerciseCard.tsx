import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RHExercise } from '../../data/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  exercise: RHExercise;
  onPractice: () => void;
}

export function ExerciseCard({ exercise, onPractice }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{exercise.number}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{exercise.label}</Text>
          <Text style={styles.note}>{exercise.note}</Text>
        </View>
        <View style={styles.targetBadge}>
          <Text style={styles.target}>{exercise.targetBpm} BPM</Text>
        </View>
      </View>

      <View style={styles.pattern}>
        {exercise.pattern.map((stroke, i) => (
          <View key={i} style={[styles.stroke, stroke === 'D' ? styles.down : styles.up]}>
            <Ionicons 
              name={stroke === 'D' ? 'arrow-down' : 'arrow-up'} 
              size={14} 
              color={stroke === 'D' ? colors.down : colors.up} 
            />
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
            <Text style={styles.demoBtnText}>Watch Demo</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btn, styles.practiceBtn]} onPress={onPractice} activeOpacity={0.8}>
          <Ionicons name="barbell" size={16} color={colors.background} style={{ marginRight: 6 }} />
          <Text style={styles.btnText}>Practice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { backgroundColor: colors.surfaceCard, borderRadius: 16, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  header:      { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  badge:       { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.goldDim },
  badgeText:   { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading },
  info:        { flex: 1 },
  name:        { color: colors.textPrimary, fontSize: typography.md, fontFamily: typography.heading, marginBottom: 2 },
  note:        { color: colors.textMuted, fontSize: typography.xs },
  targetBadge: { backgroundColor: colors.goldDim + '33', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  target:      { color: colors.gold, fontSize: 10, fontWeight: 'bold' },
  pattern:     { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.lg },
  stroke:      { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.borderLight },
  down:        { borderColor: colors.down + '55' },
  up:          { borderColor: colors.up + '55' },
  actions:     { flexDirection: 'row', gap: spacing.md },
  btn:         { flex: 1, borderRadius: 10, paddingVertical: spacing.md, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  practiceBtn: { backgroundColor: colors.gold, elevation: 2 },
  demoBtn:     { backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.goldDim },
  btnText:     { color: colors.background, fontSize: typography.sm, fontFamily: typography.heading },
  demoBtnText: { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading },
});


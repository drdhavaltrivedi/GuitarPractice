import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        <Text style={styles.target}>{exercise.targetBpm} BPM</Text>
      </View>

      <View style={styles.pattern}>
        {exercise.pattern.map((stroke, i) => (
          <View key={i} style={[styles.stroke, stroke === 'D' ? styles.down : styles.up]}>
            <Text style={styles.strokeText}>{stroke}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={onPractice} activeOpacity={0.8}>
        <Text style={styles.btnText}>▶ Practice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  header:      { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  badge:       { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  badgeText:   { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading },
  info:        { flex: 1 },
  name:        { color: colors.textPrimary, fontSize: typography.md, fontFamily: typography.heading },
  note:        { color: colors.textSecondary, fontSize: typography.sm },
  target:      { color: colors.gold, fontSize: typography.sm },
  pattern:     { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  stroke:      { width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  down:        { backgroundColor: colors.down + '33', borderWidth: 1, borderColor: colors.down },
  up:          { backgroundColor: colors.up + '33', borderWidth: 1, borderColor: colors.up },
  strokeText:  { color: colors.textPrimary, fontSize: typography.sm, fontFamily: typography.mono },
  btn:         { backgroundColor: colors.goldDim, borderRadius: 8, paddingVertical: spacing.sm, alignItems: 'center' },
  btnText:     { color: colors.textPrimary, fontSize: typography.sm, fontFamily: typography.heading },
});

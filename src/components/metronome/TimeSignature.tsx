import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const OPTIONS = [
  { value: 2, label: '2/4' },
  { value: 3, label: '3/4' },
  { value: 4, label: '4/4' },
  { value: 6, label: '6/8' },
] as const;

interface Props {
  value: 2 | 3 | 4 | 6;
  onChange: (ts: 2 | 3 | 4 | 6) => void;
}

export function TimeSignature({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Time Signature</Text>
      <View style={styles.row}>
        {OPTIONS.map(opt => {
          const active = value === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.btn, active && styles.btnActive]}
              onPress={() => onChange(opt.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { marginVertical: spacing.md, alignItems: 'center' },
  heading:     { color: colors.textSecondary, fontSize: typography.sm, marginBottom: spacing.sm, letterSpacing: 1 },
  row:         { flexDirection: 'row', gap: spacing.sm },
  btn:         { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  btnActive:   { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  label:       { color: colors.textSecondary, fontSize: typography.md, fontFamily: typography.mono },
  labelActive: { color: colors.gold },
});

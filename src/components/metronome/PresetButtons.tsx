import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const PRESETS = [60, 80, 100, 120, 140, 160] as const;

interface Props {
  currentBpm: number;
  onSelect: (bpm: number) => void;
}

export function PresetButtons({ currentBpm, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {PRESETS.map(bpm => {
        const active = currentBpm === bpm;
        return (
          <TouchableOpacity
            key={bpm}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onSelect(bpm)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>{bpm}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  btn:        {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.surfaceCard,
    minWidth: 60,
    alignItems: 'center',
  },
  btnActive:  { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  text:       { color: colors.textSecondary, fontSize: 15, fontWeight: '700' },
  textActive: { color: colors.gold, fontWeight: '800' },
});

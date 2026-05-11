import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const ALL_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

export function KeySelector({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {ALL_KEYS.map(k => {
        const active = selected === k;
        return (
          <TouchableOpacity
            key={k}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onSelect(k)}
            activeOpacity={0.8}
          >
            <Text style={[styles.key, active && styles.keyActive]}>{k}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  btn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    borderColor: colors.gold,
    backgroundColor: colors.surfaceHigh,
    shadowColor: colors.gold,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  key: {
    color: colors.textSecondary,
    fontSize: 20,
    fontFamily: typography.heading,
    fontWeight: '700',
  },
  keyActive: {
    color: colors.gold,
  },
});

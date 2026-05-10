import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const KEYS = ['C','G','D','A','E','B'] as const;
const SHARPS: Record<string, number> = { C:0, G:1, D:2, A:3, E:4, B:5 };

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

export function KeySelector({ selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {KEYS.map(k => {
        const active = selected === k;
        const sharps = SHARPS[k];
        return (
          <TouchableOpacity key={k} style={[styles.btn, active && styles.btnActive]} onPress={() => onSelect(k)}>
            <Text style={[styles.key, active && styles.keyActive]}>{k}</Text>
            {sharps > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{sharps}♯</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  btn:        { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, borderRadius: 24, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  btnActive:  { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  key:        { color: colors.textSecondary, fontSize: typography.lg, fontFamily: typography.heading },
  keyActive:  { color: colors.gold },
  badge:      { position: 'absolute', top: -4, right: -4, backgroundColor: colors.goldDim, borderRadius: 8, paddingHorizontal: 3 },
  badgeText:  { color: colors.textPrimary, fontSize: 8 },
});

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
  row:        { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  btn:        { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: 20, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceCard, alignItems: 'center', minWidth: 64 },
  btnActive:  { borderColor: colors.gold, backgroundColor: colors.surfaceHigh, elevation: 4 },
  key:        { color: colors.textMuted, fontSize: 18, fontFamily: typography.heading, fontWeight: 'bold' },
  keyActive:  { color: colors.gold },
  badge:      { position: 'absolute', top: -6, right: -6, backgroundColor: colors.gold, borderRadius: 10, paddingHorizontal: 4, paddingVertical: 1, minWidth: 16, alignItems: 'center' },
  badgeText:  { color: colors.background, fontSize: 9, fontWeight: 'bold' },
});


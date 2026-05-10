import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  note: string;
  isSharp?: boolean;
}

export function NoteChip({ note, isSharp }: Props) {
  return (
    <View style={[styles.chip, isSharp && styles.sharp]}>
      <Text style={[styles.text, isSharp && styles.sharpText]}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip:       { paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  sharp:      { backgroundColor: colors.goldDim, borderColor: colors.gold },
  text:       { color: colors.textSecondary, fontSize: typography.sm, fontFamily: typography.mono },
  sharpText:  { color: colors.gold },
});

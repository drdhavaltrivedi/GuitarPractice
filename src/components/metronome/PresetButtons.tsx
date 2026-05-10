import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const PRESETS = [80, 100, 120, 150, 180, 250] as const;

interface Props {
  currentBpm: number;
  onSelect: (bpm: number) => void;
}

export function PresetButtons({ currentBpm, onSelect }: Props) {
  return (
    <View style={styles.row}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', marginVertical: spacing.sm },
  btn:        { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  btnActive:  { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  text:       { color: colors.textSecondary, fontSize: typography.md },
  textActive: { color: colors.gold },
});

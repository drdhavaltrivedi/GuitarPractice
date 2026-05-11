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
  btn:        { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 4, borderRadius: 24, borderWidth: 1, borderColor: colors.borderLight, backgroundColor: colors.surfaceCard },
  btnActive:  { borderColor: colors.gold, backgroundColor: colors.goldDim + '22' },
  text:       { color: colors.textSecondary, fontSize: typography.sm, fontWeight: '600' },
  textActive: { color: colors.gold, fontWeight: '800' },
});

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  isPlaying: boolean;
  onPress: () => void;
}

export function PlayStopButton({ isPlaying, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, isPlaying ? styles.stop : styles.play]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>{isPlaying ? '■' : '▶'}</Text>
      <Text style={styles.sub}>{isPlaying ? 'STOP' : 'PLAY'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:   { width: 128, height: 128, borderRadius: 64, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.xl, elevation: 4 },
  play:  { backgroundColor: colors.success },
  stop:  { backgroundColor: colors.error },
  label: { color: '#fff', fontSize: 32 },
  sub:   { color: '#fff', fontSize: typography.sm, fontFamily: typography.heading, letterSpacing: 2 },
});

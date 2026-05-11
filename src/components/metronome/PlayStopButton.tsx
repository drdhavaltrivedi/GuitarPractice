import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

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
      <Ionicons
        name={isPlaying ? 'stop' : 'play'}
        size={34}
        color={isPlaying ? colors.error : colors.gold}
        style={!isPlaying && { marginLeft: 4 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:  {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    elevation: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
  play: {
    backgroundColor: colors.surfaceCard,
    borderColor: colors.gold,
    shadowColor: colors.gold,
  },
  stop: {
    backgroundColor: colors.surfaceHigh,
    borderColor: colors.error,
    shadowColor: colors.error,
  },
});

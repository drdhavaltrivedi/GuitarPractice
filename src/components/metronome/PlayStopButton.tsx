import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.iconContainer}>
        <Ionicons 
          name={isPlaying ? 'stop' : 'play'} 
          size={48} 
          color={isPlaying ? colors.error : colors.gold} 
          style={!isPlaying && { marginLeft: 8 }} 
        />
      </View>
      <Text style={styles.sub}>{isPlaying ? 'STOP' : 'PLAY'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:           { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.xl, borderWidth: 3, elevation: 8, shadowColor: colors.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 15 },
  play:          { backgroundColor: colors.surfaceCard, borderColor: colors.gold },
  stop:          { backgroundColor: colors.surfaceHigh, borderColor: colors.error, shadowColor: colors.error },
  iconContainer: { marginBottom: 4 },
  sub:           { color: '#fff', fontSize: 12, fontFamily: typography.heading, letterSpacing: 4, fontWeight: '800' },
});


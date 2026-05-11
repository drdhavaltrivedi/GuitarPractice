import { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface BeatDotProps {
  isActive: boolean;
  isAccent: boolean;
  isPlaying: boolean;
}

function BeatDot({ isActive, isAccent, isPlaying }: BeatDotProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive && isPlaying) {
      Animated.spring(scale, {
        toValue: 1.35,
        stiffness: 300,
        damping: 5,
        mass: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        stiffness: 200,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive, isPlaying]);

  return (
    <Animated.View
      style={[
        styles.dot,
        isAccent && styles.accent,
        !isPlaying && styles.inactive,
        isActive && isPlaying && styles.activeLED,
        isActive && isPlaying && isAccent && styles.activeAccentLED,
        { transform: [{ scale }] },
      ]}
    />
  );
}

interface Props {
  totalBeats: number;
  currentBeat: number;
  isPlaying: boolean;
}

export function BeatIndicator({ totalBeats, currentBeat, isPlaying }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: totalBeats }, (_, i) => (
        <BeatDot
          key={i}
          isActive={currentBeat === i}
          isAccent={i === 0}
          isPlaying={isPlaying}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row:     { flexDirection: 'row', gap: spacing.lg, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.xl, height: 40 },
  dot:     { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.borderLight },
  accent:  { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.surfaceHigh, borderWidth: 2, borderColor: colors.borderLight },
  inactive:{ opacity: 0.8 },
  activeLED:       { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary, shadowColor: colors.textPrimary, shadowOpacity: 0.8, shadowRadius: 8, shadowOffset: { width: 0, height: 0 }, elevation: 4 },
  activeAccentLED: { backgroundColor: colors.gold, borderColor: colors.gold, shadowColor: colors.gold, shadowOpacity: 1, shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
});

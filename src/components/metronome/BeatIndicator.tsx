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
  row:     { flexDirection: 'row', gap: spacing.lg, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.xl },
  dot:     { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accentBeat },
  accent:  { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.gold },
  inactive:{ opacity: 0.25 },
});

import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  bpm: number;
  onChangeBpm: (bpm: number) => void;
}

export function BpmStepper({ bpm, onChangeBpm }: Props) {
  const bpmRef = useRef(bpm);
  const repeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  const step = (delta: number) => {
    const next = Math.max(20, Math.min(400, bpmRef.current + delta));
    bpmRef.current = next;
    onChangeBpm(next);
  };

  const startRepeat = (delta: number) => {
    step(delta);
    repeatRef.current = setInterval(() => step(delta), 120);
  };

  const stopRepeat = () => {
    if (repeatRef.current) { clearInterval(repeatRef.current); repeatRef.current = null; }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => step(-1)}
        onLongPress={() => startRepeat(-1)}
        onPressOut={stopRepeat}
        delayLongPress={400}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>−1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => step(1)}
        onLongPress={() => startRepeat(1)}
        onPressOut={stopRepeat}
        delayLongPress={400}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>+1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:   { flexDirection: 'row', gap: spacing.lg, justifyContent: 'center', marginTop: spacing.md },
  btn:   {
    width: 64,
    height: 40,
    backgroundColor: colors.surfaceHigh,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
});

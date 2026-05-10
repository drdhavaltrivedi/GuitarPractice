import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  bpm: number;
  onChangeBpm: (bpm: number) => void;
}

const DELTAS = [-10, -1, 1, 10] as const;

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
      {DELTAS.map(d => (
        <TouchableOpacity
          key={d}
          style={styles.btn}
          onPress={() => step(d)}
          onLongPress={() => startRepeat(d)}
          onPressOut={stopRepeat}
          delayLongPress={400}
          activeOpacity={0.7}
        >
          <Text style={styles.label}>{d > 0 ? `+${d}` : d}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row:   { flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginVertical: spacing.md },
  btn:   { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 4, backgroundColor: colors.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: colors.border, minWidth: 64, alignItems: 'center' },
  label: { color: colors.textPrimary, fontSize: typography.lg },
});

import { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useMetronomeStore } from '../../store/metronomeStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function TapTempoButton() {
  const tapTempo = useMetronomeStore(s => s.tapTempo);
  const bpm = useMetronomeStore(s => s.bpm);
  const [flash, setFlash] = useState(false);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    tapTempo();
    setFlash(true);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setFlash(false), 80);
  };

  return (
    <TouchableOpacity
      style={[styles.btn, flash && styles.btnFlash]}
      onPress={handleTap}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>Tap Tempo</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:      { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: 12, borderWidth: 1.5, borderColor: colors.goldDim, backgroundColor: colors.surface, alignSelf: 'center' },
  btnFlash: { backgroundColor: colors.surfaceHigh, borderColor: colors.gold },
  text:     { color: colors.textPrimary, fontSize: typography.lg, fontFamily: typography.heading },
});

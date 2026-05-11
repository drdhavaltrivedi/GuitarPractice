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
  btn:      { width: 180, paddingVertical: spacing.md + 4, borderRadius: 30, borderWidth: 1, borderColor: colors.borderLight, backgroundColor: colors.surfaceHigh, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  btnFlash: { backgroundColor: colors.surfaceHigh, borderColor: colors.gold, shadowColor: colors.gold, shadowOpacity: 0.6, shadowRadius: 8 },
  text:     { color: colors.textSecondary, fontSize: typography.md, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
});

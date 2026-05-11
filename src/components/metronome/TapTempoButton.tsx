import { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useMetronomeStore } from '../../store/metronomeStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export function TapTempoButton() {
  const tapTempo = useMetronomeStore(s => s.tapTempo);
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
      <Text style={[styles.text, flash && styles.textFlash]}>TAP</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  btnFlash: {
    borderColor: colors.gold,
    shadowColor: colors.gold,
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  textFlash: {
    color: colors.gold,
  },
});

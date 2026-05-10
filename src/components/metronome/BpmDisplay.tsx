import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  bpm: number;
  onChangeBpm: (bpm: number) => void;
}

const PAD_KEYS = ['1','2','3','4','5','6','7','8','9','⌫','0','OK'] as const;

export function BpmDisplay({ bpm, onChangeBpm }: Props) {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  const open = () => { setInput(String(bpm)); setVisible(true); };

  const pressKey = (key: string) => {
    if (key === '⌫') {
      setInput(p => p.slice(0, -1));
    } else if (key === 'OK') {
      const val = parseInt(input, 10);
      if (!isNaN(val)) onChangeBpm(Math.max(20, Math.min(400, val)));
      setVisible(false);
    } else {
      setInput(p => p.length >= 3 ? p : p + key);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={open} activeOpacity={0.8}>
        <Text style={styles.bpm}>{bpm}</Text>
        <Text style={styles.hint}>BPM  ✎</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.display}>{input || '—'}</Text>
            <View style={styles.grid}>
              {PAD_KEYS.map(k => (
                <TouchableOpacity
                  key={k}
                  style={[styles.key, k === 'OK' && styles.keyOk]}
                  onPress={() => pressKey(k)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.keyText, k === 'OK' && styles.keyOkText]}>{k}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bpm:        { color: colors.gold, fontSize: typography.hero, fontFamily: typography.heading, textAlign: 'center' },
  hint:       { color: colors.textSecondary, fontSize: typography.sm, textAlign: 'center', marginBottom: spacing.sm },
  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center' },
  modal:      { backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg, width: 292, borderWidth: 1, borderColor: colors.border },
  display:    { color: colors.gold, fontSize: typography.xxl + 8, textAlign: 'center', marginBottom: spacing.lg, fontFamily: typography.heading },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  key:        { width: 84, height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceHigh, borderRadius: 10 },
  keyText:    { color: colors.textPrimary, fontSize: typography.xl },
  keyOk:      { backgroundColor: colors.gold },
  keyOkText:  { color: colors.background, fontFamily: typography.heading },
  cancel:     { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, fontSize: typography.md, paddingVertical: spacing.sm },
});

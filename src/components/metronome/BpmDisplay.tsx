import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface Props {
  bpm: number;
  onChangeBpm: (bpm: number) => void;
}

const PAD_KEYS = ['1','2','3','4','5','6','7','8','9','⌫','0','OK'] as const;

const DIAL_SIZE = 240;
const R = 100;
const CX = DIAL_SIZE / 2;
const CY = DIAL_SIZE / 2;
const START_ANGLE = 135; // degrees, bottom-left
const END_ANGLE = 45;    // degrees, bottom-right (going clockwise, 270° sweep)
const SWEEP = 270;

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, sweepDeg: number) {
  const start = polarToXY(cx, cy, r, startDeg);
  const end = polarToXY(cx, cy, r, startDeg + sweepDeg);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function BpmDial({ bpm }: { bpm: number }) {
  const progress = Math.min(1, Math.max(0, (bpm - 20) / (250 - 20)));
  const filledSweep = SWEEP * progress;

  const trackPath = arcPath(CX, CY, R, START_ANGLE, SWEEP);
  const fillPath = filledSweep > 0 ? arcPath(CX, CY, R, START_ANGLE, filledSweep) : null;

  // glowing indicator dot at the fill tip
  const dotPos = filledSweep > 0 ? polarToXY(CX, CY, R, START_ANGLE + filledSweep) : null;

  return (
    <View style={{ width: DIAL_SIZE, height: DIAL_SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={DIAL_SIZE} height={DIAL_SIZE} style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={colors.gold} stopOpacity="0.15" />
            <Stop offset="100%" stopColor={colors.gold} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {/* Background glow circle */}
        <Circle cx={CX} cy={CY} r={R + 10} fill="url(#glow)" />
        {/* Track arc */}
        <Path
          d={trackPath}
          stroke={colors.surfaceHigh}
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
        />
        {/* Fill arc */}
        {fillPath && (
          <Path
            d={fillPath}
            stroke={colors.gold}
            strokeWidth={12}
            strokeLinecap="round"
            fill="none"
          />
        )}
        {/* Glowing dot at the tip */}
        {dotPos && (
          <>
            <Circle cx={dotPos.x} cy={dotPos.y} r={14} fill={colors.gold} opacity={0.2} />
            <Circle cx={dotPos.x} cy={dotPos.y} r={7} fill={colors.gold} />
          </>
        )}
      </Svg>
      {/* BPM text in center */}
      <Text style={styles.bpmNumber}>{bpm}</Text>
      <Text style={styles.bpmLabel}>BPM</Text>
    </View>
  );
}

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
      <TouchableOpacity onPress={open} activeOpacity={0.9}>
        <BpmDial bpm={bpm} />
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
  bpmNumber:  { color: colors.gold, fontSize: 72, fontFamily: typography.mono, fontWeight: '300', textAlign: 'center', textShadowColor: colors.gold, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
  bpmLabel:   { color: colors.textSecondary, fontSize: 14, letterSpacing: 4, fontWeight: '700', textAlign: 'center', marginTop: -4 },
  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center' },
  modal:      { backgroundColor: colors.surface, borderRadius: 24, padding: spacing.xl, width: 320, borderWidth: 1, borderColor: colors.border },
  display:    { color: colors.gold, fontSize: 64, textAlign: 'center', marginBottom: spacing.xl, fontFamily: typography.mono, fontWeight: '300' },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
  key:        { width: 72, height: 64, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: colors.borderLight },
  keyText:    { color: colors.textPrimary, fontSize: 22, fontWeight: '600' },
  keyOk:      { backgroundColor: colors.gold, borderColor: colors.gold },
  keyOkText:  { color: '#000', fontWeight: '800' },
  cancel:     { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl, fontSize: 16, paddingVertical: spacing.sm, fontWeight: '600', letterSpacing: 1 },
});

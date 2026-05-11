import React, { useMemo } from 'react';
import Svg, { Line, Circle, Text as SvgText, Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { ScalePosition, GuitarString } from '../../data/types';
import { colors } from '../../theme/colors';

const STRING_ORDER: GuitarString[] = ['E','A','D','G','B','e'];
const STRING_COLORS = [
  colors.strings.E, 
  colors.strings.A, 
  colors.strings.D, 
  colors.strings.G, 
  colors.strings.B, 
  colors.strings.e
];
const STRING_THICKNESS = [3.2, 2.8, 2.2, 1.8, 1.4, 1.0];

const INLAY_FRETS = [3, 5, 7, 9, 12, 15, 17, 19, 21];

interface Props {
  position: ScalePosition;
  width: number;
  height: number;
}

export function FretboardSVG({ position, width, height }: Props) {
  const layout = useMemo(() => {
    let minFret = Infinity, maxFret = -Infinity;
    STRING_ORDER.forEach(s => {
      (position.strings[s] ?? []).forEach(n => {
        if (n.fret > 0) { minFret = Math.min(minFret, n.fret); maxFret = Math.max(maxFret, n.fret); }
      });
    });
    if (minFret === Infinity) { minFret = 0; maxFret = 4; }
    const startFret = Math.max(0, minFret - 1);
    const endFret = maxFret + 1;
    const numFrets = endFret - startFret;

    const padLeft = 40, padRight = 20, padTop = 30, padBottom = 24;
    const fretW = (width - padLeft - padRight) / numFrets;
    const stringH = (height - padTop - padBottom) / (STRING_ORDER.length - 1);

    return { startFret, endFret, numFrets, fretW, stringH, padLeft, padRight, padTop, padBottom };
  }, [position, width, height]);

  const { startFret, endFret, numFrets, fretW, stringH, padLeft, padTop } = layout;

  const fretX = (fret: number) => padLeft + (fret - startFret) * fretW;
  const stringY = (idx: number) => padTop + idx * stringH;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="woodGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.fretboard.wood[0]} />
          <Stop offset="1" stopColor={colors.fretboard.wood[1]} />
        </LinearGradient>
        <LinearGradient id="stringGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff88" />
          <Stop offset="0.5" stopColor="#ffffff22" />
          <Stop offset="1" stopColor="#00000044" />
        </LinearGradient>
      </Defs>

      {/* Fretboard Background */}
      <Rect
        x={padLeft} y={padTop - 4}
        width={width - padLeft - layout.padRight}
        height={(STRING_ORDER.length - 1) * stringH + 8}
        fill="url(#woodGradient)"
        rx={4}
      />

      {/* Inlays */}
      {Array.from({ length: numFrets }, (_, i) => {
        const fret = startFret + i + 1;
        if (!INLAY_FRETS.includes(fret)) return null;
        const x = fretX(fret) - fretW / 2;
        const cy = padTop + 2.5 * stringH;
        
        if (fret === 12) {
          return (
            <G key={`inlay-${fret}`}>
              <Circle cx={x} cy={cy - stringH} r={4} fill={colors.fretboard.inlay} opacity={0.6} />
              <Circle cx={x} cy={cy + stringH} r={4} fill={colors.fretboard.inlay} opacity={0.6} />
            </G>
          );
        }
        return (
          <Circle key={`inlay-${fret}`}
            cx={x} cy={cy} r={4}
            fill={colors.fretboard.inlay} opacity={0.6}
          />
        );
      })}

      {/* Fret lines */}
      {Array.from({ length: numFrets + 1 }, (_, i) => {
        const fret = startFret + i;
        const x = fretX(fret);
        const isNut = fret === 0;
        return (
          <G key={`fret-group-${i}`}>
            {!isNut && (
              <Line
                x1={x + 1} y1={padTop - 4} x2={x + 1} y2={padTop + 5 * stringH + 4}
                stroke={colors.fretboard.fretShadow} strokeWidth={2}
              />
            )}
            <Line
              x1={x} y1={padTop - 4} x2={x} y2={padTop + 5 * stringH + 4}
              stroke={isNut ? colors.fretboard.nut : colors.fretboard.fret}
              strokeWidth={isNut ? 6 : 2}
            />
          </G>
        );
      })}

      {/* String lines */}
      {STRING_ORDER.map((s, si) => (
        <G key={`string-group-${s}`}>
          <Line
            x1={padLeft} y1={stringY(si) + 1}
            x2={fretX(endFret)} y2={stringY(si) + 1}
            stroke="#000000" strokeOpacity={0.3}
            strokeWidth={STRING_THICKNESS[si]}
          />

          <Line
            x1={padLeft} y1={stringY(si)}
            x2={fretX(endFret)} y2={stringY(si)}
            stroke={STRING_COLORS[si]}
            strokeWidth={STRING_THICKNESS[si]}
          />
        </G>
      ))}

      {/* Fret numbers */}
      {Array.from({ length: numFrets + 1 }, (_, i) => {
        const fret = startFret + i;
        if (fret === 0) return null;
        return (
          <SvgText key={`fn-${fret}`}
            x={fretX(fret) - fretW / 2} y={padTop - 12}
            fill={colors.textSecondary} fontSize={10} textAnchor="middle" fontWeight="bold"
          >{fret}</SvgText>
        );
      })}

      {/* String labels */}
      {STRING_ORDER.map((s, si) => (
        <SvgText key={`sl-${s}`}
          x={padLeft - 12} y={stringY(si) + 4}
          fill={si < 2 ? STRING_COLORS[si] : colors.textSecondary} fontSize={11} textAnchor="end" fontWeight="bold"
        >{s}</SvgText>
      ))}

      {/* Note markers */}
      {STRING_ORDER.map((s, si) =>
        (position.strings[s] ?? []).map((note, ni) => {
          if (note.fret < startFret || note.fret > endFret) return null;
          const isOpen = note.fret === 0;
          const cx = isOpen
            ? padLeft - 24
            : fretX(note.fret) - fretW / 2;
          const cy = stringY(si);
          
          return (
            <G key={`${s}-${ni}`}>
              {/* Outer shadow/glow */}
              {!isOpen && (
                <Circle cx={cx} cy={cy + 1} r={13} fill="#00000044" />
              )}
              <Circle cx={cx} cy={cy} r={12}
                fill={isOpen ? 'transparent' : colors.gold}
                stroke={colors.gold} strokeWidth={isOpen ? 2 : 0}
              />
              <SvgText x={cx} y={cy + 4}
                fill={isOpen ? colors.gold : colors.background}
                fontSize={10} textAnchor="middle" fontWeight="bold"
              >{note.note}</SvgText>
              {note.finger && !isOpen && (
                <SvgText x={cx} y={cy - 16}
                  fill={colors.textPrimary} fontSize={9} textAnchor="middle" fontWeight="bold"
                >{note.finger}</SvgText>
              )}
            </G>
          );
        })
      )}
    </Svg>
  );
}



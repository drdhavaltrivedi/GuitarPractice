import React, { useMemo } from 'react';
import Svg, { Line, Circle, Text as SvgText, Rect, Defs, LinearGradient, Stop, G, RadialGradient } from 'react-native-svg';
import { ScalePosition, GuitarString } from '../../data/types';
import { colors } from '../../theme/colors';

const STRING_ORDER: GuitarString[] = ['E', 'A', 'D', 'G', 'B', 'e'];
const STRING_LABELS = ['e', 'B', 'G', 'D', 'A', 'E']; // display reversed (high e at top visually)
const STRING_THICKNESS = [1.0, 1.4, 1.8, 2.2, 2.8, 3.2]; // thin at top (high e), thick at bottom (low E)
const INLAY_FRETS = [3, 5, 7, 9, 12, 15, 17];

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

    const padLeft = 36;
    const padRight = 12;
    const padTop = 24;
    const padBottom = 20;
    const fretW = (width - padLeft - padRight) / numFrets;
    const stringH = (height - padTop - padBottom) / (STRING_ORDER.length - 1);

    return { startFret, endFret, numFrets, fretW, stringH, padLeft, padRight, padTop, padBottom };
  }, [position, width, height]);

  const { startFret, endFret, numFrets, fretW, stringH, padLeft, padTop } = layout;

  const fretX = (fret: number) => padLeft + (fret - startFret) * fretW;
  // Reversed: high e (index 0) at top, low E (index 5) at bottom
  const stringY = (idx: number) => padTop + idx * stringH;

  const boardTop = padTop - 6;
  const boardBottom = padTop + 5 * stringH + 6;
  const boardLeft = padLeft;
  const boardRight = fretX(endFret);

  return (
    <Svg width={width} height={height}>
      <Defs>
        {/* Dark wood gradient */}
        <LinearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1C1410" />
          <Stop offset="0.4" stopColor="#0F0D0B" />
          <Stop offset="1" stopColor="#0A0806" />
        </LinearGradient>
        {/* Fret metallic */}
        <LinearGradient id="fretMetal" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#888888" />
          <Stop offset="0.5" stopColor="#CCCCCC" />
          <Stop offset="1" stopColor="#555555" />
        </LinearGradient>
        {/* Note glow */}
        <RadialGradient id="noteGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={colors.gold} stopOpacity="1" />
          <Stop offset="60%" stopColor={colors.gold} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={colors.goldDim} stopOpacity="0.6" />
        </RadialGradient>
      </Defs>

      {/* Fretboard background */}
      <Rect
        x={boardLeft} y={boardTop}
        width={boardRight - boardLeft}
        height={boardBottom - boardTop}
        fill="url(#wood)"
        rx={6}
      />

      {/* Subtle wood grain lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <Line
          key={`grain-${i}`}
          x1={boardLeft} y1={boardTop + ((boardBottom - boardTop) / 8) * i}
          x2={boardRight} y2={boardTop + ((boardBottom - boardTop) / 8) * i}
          stroke="#FFFFFF" strokeOpacity={0.02} strokeWidth={1}
        />
      ))}

      {/* Inlay dots */}
      {Array.from({ length: numFrets }, (_, i) => {
        const fret = startFret + i + 1;
        if (!INLAY_FRETS.includes(fret)) return null;
        const x = fretX(fret) - fretW / 2;
        const cy = padTop + 2.5 * stringH;
        if (fret === 12) {
          return (
            <G key={`inlay-${fret}`}>
              <Circle cx={x} cy={cy - stringH * 0.8} r={5} fill="#664422" opacity={0.7} />
              <Circle cx={x} cy={cy + stringH * 0.8} r={5} fill="#664422" opacity={0.7} />
            </G>
          );
        }
        return <Circle key={`inlay-${fret}`} cx={x} cy={cy} r={5} fill="#553311" opacity={0.7} />;
      })}

      {/* Fret lines */}
      {Array.from({ length: numFrets + 1 }, (_, i) => {
        const fret = startFret + i;
        const x = fretX(fret);
        const isNut = fret === 0;
        if (isNut) {
          return (
            <Rect key="nut"
              x={x - 3} y={boardTop}
              width={6} height={boardBottom - boardTop}
              fill="#AAAAAA" rx={1}
            />
          );
        }
        return (
          <G key={`fret-${i}`}>
            <Line x1={x + 1} y1={boardTop} x2={x + 1} y2={boardBottom} stroke="#000" strokeOpacity={0.5} strokeWidth={2} />
            <Line x1={x} y1={boardTop} x2={x} y2={boardBottom} stroke="url(#fretMetal)" strokeWidth={2.5} />
          </G>
        );
      })}

      {/* Strings — high e at top (idx 0), low E at bottom (idx 5) */}
      {STRING_ORDER.map((_, si) => {
        const y = stringY(si);
        const thickness = STRING_THICKNESS[si];
        return (
          <G key={`str-${si}`}>
            <Line x1={boardLeft} y1={y + 1} x2={boardRight} y2={y + 1} stroke="#000" strokeOpacity={0.4} strokeWidth={thickness} />
            <Line x1={boardLeft} y1={y} x2={boardRight} y2={y} stroke="#CCCCCC" strokeOpacity={0.85} strokeWidth={thickness} />
          </G>
        );
      })}

      {/* String labels on left */}
      {STRING_ORDER.map((s, si) => (
        <SvgText
          key={`sl-${s}`}
          x={boardLeft - 8}
          y={stringY(si) + 4}
          fill={colors.textSecondary}
          fontSize={11}
          textAnchor="end"
          fontWeight="600"
        >
          {s}
        </SvgText>
      ))}

      {/* Fret numbers above */}
      {Array.from({ length: numFrets }, (_, i) => {
        const fret = startFret + i + 1;
        return (
          <SvgText
            key={`fn-${fret}`}
            x={fretX(fret) - fretW / 2}
            y={padTop - 10}
            fill={colors.textMuted}
            fontSize={9}
            textAnchor="middle"
            fontWeight="600"
          >
            {fret}
          </SvgText>
        );
      })}

      {/* Note markers */}
      {STRING_ORDER.map((s, si) =>
        (position.strings[s] ?? []).map((note, ni) => {
          if (note.fret < startFret || note.fret > endFret) return null;
          const isOpen = note.fret === 0;
          const cx = isOpen ? padLeft - 20 : fretX(note.fret) - fretW / 2;
          const cy = stringY(si);
          const r = 13;

          return (
            <G key={`${s}-${ni}`}>
              {/* Outer glow ring */}
              <Circle cx={cx} cy={cy} r={r + 5} fill={colors.gold} opacity={0.12} />
              {/* Main dot */}
              <Circle cx={cx} cy={cy} r={r} fill="url(#noteGlow)" />
              {/* Note name */}
              <SvgText
                x={cx} y={cy + 4}
                fill={colors.background}
                fontSize={10}
                textAnchor="middle"
                fontWeight="bold"
              >
                {note.note}
              </SvgText>
            </G>
          );
        })
      )}
    </Svg>
  );
}

import React, { useMemo } from 'react';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { ScalePosition, GuitarString } from '../../data/types';
import { colors } from '../../theme/colors';

const STRING_ORDER: GuitarString[] = ['E','A','D','G','B','e'];
const STRING_COLORS = [colors.strings.E, colors.strings.A, colors.strings.D, colors.strings.G, colors.strings.B, colors.strings.e];
const STRING_THICKNESS = [3, 2.5, 2, 1.5, 1.2, 1];

interface Props {
  position: ScalePosition;
  width: number;
  height: number;
}

export function FretboardSVG({ position, width, height }: Props) {
  const layout = useMemo(() => {
    // Gather all frets in use
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

    const padLeft = 36, padRight = 16, padTop = 28, padBottom = 24;
    const fretW = (width - padLeft - padRight) / numFrets;
    const stringH = (height - padTop - padBottom) / (STRING_ORDER.length - 1);

    return { startFret, endFret, numFrets, fretW, stringH, padLeft, padRight, padTop, padBottom };
  }, [position, width, height]);

  const { startFret, endFret, numFrets, fretW, stringH, padLeft, padTop } = layout;

  const fretX = (fret: number) => padLeft + (fret - startFret) * fretW;
  const stringY = (idx: number) => padTop + idx * stringH;

  return (
    <Svg width={width} height={height}>
      {/* Fret lines */}
      {Array.from({ length: numFrets + 1 }, (_, i) => {
        const fret = startFret + i;
        const x = fretX(fret);
        const isNut = fret === 0;
        return (
          <Line key={`fret-${i}`}
            x1={x} y1={padTop} x2={x} y2={padTop + 5 * stringH}
            stroke={isNut ? colors.textPrimary : colors.border}
            strokeWidth={isNut ? 4 : 1}
          />
        );
      })}

      {/* String lines */}
      {STRING_ORDER.map((s, si) => (
        <Line key={s}
          x1={padLeft} y1={stringY(si)}
          x2={fretX(endFret)} y2={stringY(si)}
          stroke={STRING_COLORS[si]}
          strokeWidth={STRING_THICKNESS[si]}
        />
      ))}

      {/* Fret numbers */}
      {Array.from({ length: numFrets + 1 }, (_, i) => {
        const fret = startFret + i;
        if (fret === 0) return null;
        return (
          <SvgText key={`fn-${fret}`}
            x={fretX(fret) - fretW / 2} y={padTop - 8}
            fill={colors.textSecondary} fontSize={10} textAnchor="middle"
          >{fret}</SvgText>
        );
      })}

      {/* String labels */}
      {STRING_ORDER.map((s, si) => (
        <SvgText key={`sl-${s}`}
          x={padLeft - 6} y={stringY(si) + 4}
          fill={STRING_COLORS[si]} fontSize={11} textAnchor="end" fontWeight="bold"
        >{s}</SvgText>
      ))}

      {/* Note markers */}
      {STRING_ORDER.map((s, si) =>
        (position.strings[s] ?? []).map((note, ni) => {
          if (note.fret < startFret || note.fret > endFret) return null;
          const cx = note.fret === 0
            ? padLeft - 18
            : fretX(note.fret) - fretW / 2;
          const cy = stringY(si);
          const isOpen = note.fret === 0;
          return (
            <React.Fragment key={`${s}-${ni}`}>
              <Circle cx={cx} cy={cy} r={12}
                fill={isOpen ? 'transparent' : colors.gold}
                stroke={colors.gold} strokeWidth={isOpen ? 1.5 : 0}
              />
              <SvgText x={cx} y={cy + 4}
                fill={isOpen ? colors.gold : colors.background}
                fontSize={9} textAnchor="middle" fontWeight="bold"
              >{note.note}</SvgText>
              {note.finger && !isOpen && (
                <SvgText x={cx} y={cy - 16}
                  fill={colors.textSecondary} fontSize={8} textAnchor="middle"
                >{note.finger}</SvgText>
              )}
            </React.Fragment>
          );
        })
      )}
    </Svg>
  );
}


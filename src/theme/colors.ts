export const colors = {
  // Backgrounds
  background:    '#0A0A0A', // OLED Black
  surface:       '#121212',
  surfaceHigh:   '#1A1A1A',
  surfaceCard:   '#1E1E1E',
  border:        '#2A2A2A',
  borderLight:   '#333333',

  // Primary
  gold:          '#FF6B00', // Vibrant Amber/Orange
  goldDim:       '#B34A00',
  goldBright:    '#FF8A33',

  // Text
  textPrimary:   '#F2F2F2',
  textSecondary: '#A0A0A0',
  textDisabled:  '#555555',
  textMuted:     '#757575',

  // Beat / Status
  accent1:       '#FF6B00',
  accentBeat:    '#FFFFFF',

  // Realistic Fretboard
  fretboard: {
    wood:        ['#1A1A1A', '#0F0F0F'], // Sleeker dark fretboard
    fret:        '#555555',
    fretShadow:  '#000000',
    inlay:       '#888888',
    nut:         '#333333',
  },

  // Strings (guitar string colors)
  strings: {
    E: '#FF6B00', // Highlighted bottom E
    A: '#D0D0D0',
    D: '#C0C0C0', 
    G: '#B0B0B0', 
    B: '#A0A0A0', 
    e: '#909090', 
  },

  // Strokes
  down:  '#FF6B00',
  up:    '#00E5FF', // Cyan contrast

  // Status
  success: '#00E676', // Neon green
  error:   '#FF1744',
  warning: '#FFC400',
  info:    '#2979FF',
} as const;


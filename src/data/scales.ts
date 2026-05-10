import { Scale } from './types';

export const SCALES: Scale[] = [
  {
    key: 'C', notes: ['C','D','E','F','G','A','B'], sharps: 0, sharpNotes: [],
    positions: [
      {
        label: 'Open Position', startFret: 0,
        strings: {
          E: [{ fret:0,note:'E' },{ fret:1,note:'F',finger:1 },{ fret:3,note:'G',finger:3 }],
          A: [{ fret:0,note:'A' },{ fret:2,note:'B',finger:2 },{ fret:3,note:'C',finger:3 }],
          D: [{ fret:0,note:'D' },{ fret:2,note:'E',finger:2 },{ fret:3,note:'F',finger:3 }],
          G: [{ fret:0,note:'G' },{ fret:2,note:'A',finger:2 }],
          B: [{ fret:0,note:'B' },{ fret:1,note:'C',finger:1 },{ fret:3,note:'D',finger:3 }],
          e: [{ fret:0,note:'E' },{ fret:1,note:'F',finger:1 },{ fret:3,note:'G',finger:3 }],
        },
      },
      {
        label: '1st Finger (Fret 1)', startFret: 1,
        strings: {
          E: [{ fret:1,note:'F',finger:1 },{ fret:3,note:'G',finger:3 }],
          A: [{ fret:2,note:'B',finger:2 },{ fret:3,note:'C',finger:3 }],
          D: [{ fret:2,note:'E',finger:2 },{ fret:3,note:'F',finger:3 }],
          G: [{ fret:2,note:'A',finger:2 },{ fret:5,note:'C',finger:4 }],
          B: [{ fret:1,note:'C',finger:1 },{ fret:3,note:'D',finger:3 },{ fret:5,note:'E',finger:4 }],
          e: [{ fret:1,note:'F',finger:1 },{ fret:3,note:'G',finger:3 }],
        },
      },
      {
        label: '2nd Position (Fret 3)', startFret: 3,
        strings: {
          E: [{ fret:3,note:'G',finger:1 },{ fret:5,note:'A',finger:3 }],
          A: [{ fret:3,note:'C',finger:1 },{ fret:5,note:'D',finger:3 }],
          D: [{ fret:3,note:'F',finger:1 },{ fret:5,note:'G',finger:3 }],
          G: [{ fret:2,note:'A',finger:1 },{ fret:5,note:'C',finger:4 }],
          B: [{ fret:3,note:'D',finger:1 },{ fret:5,note:'E',finger:3 },{ fret:6,note:'F',finger:4 }],
          e: [{ fret:3,note:'G',finger:1 },{ fret:5,note:'A',finger:3 }],
        },
      },
      {
        label: '8th Fret 4th Finger', startFret: 7,
        strings: {
          E: [{ fret:7,note:'B',finger:1 },{ fret:8,note:'C',finger:2 },{ fret:10,note:'D',finger:4 }],
          A: [{ fret:7,note:'E',finger:1 },{ fret:8,note:'F',finger:2 },{ fret:10,note:'G',finger:4 }],
          D: [{ fret:7,note:'A',finger:1 },{ fret:9,note:'B',finger:3 },{ fret:10,note:'C',finger:4 }],
          G: [{ fret:7,note:'D',finger:1 },{ fret:9,note:'E',finger:3 },{ fret:10,note:'F',finger:4 }],
          B: [{ fret:8,note:'G',finger:1 },{ fret:10,note:'A',finger:3 }],
          e: [{ fret:7,note:'B',finger:1 },{ fret:8,note:'C',finger:2 },{ fret:10,note:'D',finger:4 }],
        },
      },
    ],
  },
  {
    key: 'G', notes: ['G','A','B','C','D','E','F#'], sharps: 1, sharpNotes: ['F#'],
    positions: [
      {
        label: 'Open Position', startFret: 0,
        strings: {
          E: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 },{ fret:3,note:'G',finger:3 }],
          A: [{ fret:0,note:'A' },{ fret:2,note:'B',finger:2 },{ fret:3,note:'C',finger:3 }],
          D: [{ fret:0,note:'D' },{ fret:2,note:'E',finger:2 }],
          G: [{ fret:0,note:'G' },{ fret:2,note:'A',finger:2 }],
          B: [{ fret:0,note:'B' },{ fret:3,note:'D',finger:3 }],
          e: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 },{ fret:3,note:'G',finger:3 }],
        },
      },
      {
        label: '2nd Position (Fret 2)', startFret: 2,
        strings: {
          E: [{ fret:2,note:'F#',finger:1 },{ fret:3,note:'G',finger:2 },{ fret:5,note:'A',finger:4 }],
          A: [{ fret:2,note:'B',finger:1 },{ fret:3,note:'C',finger:2 },{ fret:5,note:'D',finger:4 }],
          D: [{ fret:2,note:'E',finger:1 },{ fret:4,note:'F#',finger:3 },{ fret:5,note:'G',finger:4 }],
          G: [{ fret:2,note:'A',finger:1 },{ fret:4,note:'B',finger:3 },{ fret:5,note:'C',finger:4 }],
          B: [{ fret:3,note:'D',finger:2 },{ fret:5,note:'E',finger:4 }],
          e: [{ fret:2,note:'F#',finger:1 },{ fret:3,note:'G',finger:2 }],
        },
      },
    ],
  },
  {
    key: 'D', notes: ['D','E','F#','G','A','B','C#'], sharps: 2, sharpNotes: ['F#','C#'],
    positions: [
      {
        label: 'Open Position', startFret: 0,
        strings: {
          E: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 }],
          A: [{ fret:0,note:'A' },{ fret:2,note:'B',finger:2 }],
          D: [{ fret:0,note:'D' },{ fret:2,note:'E',finger:2 },{ fret:4,note:'F#',finger:4 }],
          G: [{ fret:0,note:'G' },{ fret:2,note:'A',finger:2 }],
          B: [{ fret:0,note:'B' },{ fret:2,note:'C#',finger:2 },{ fret:3,note:'D',finger:3 }],
          e: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 }],
        },
      },
      {
        label: '4th Position (Fret 4)', startFret: 4,
        strings: {
          E: [{ fret:4,note:'G#',finger:1 },{ fret:5,note:'A',finger:2 },{ fret:7,note:'B',finger:4 }],
          A: [{ fret:4,note:'C#',finger:1 },{ fret:5,note:'D',finger:2 },{ fret:7,note:'E',finger:4 }],
          D: [{ fret:4,note:'F#',finger:1 },{ fret:6,note:'G#',finger:3 },{ fret:7,note:'A',finger:4 }],
          G: [{ fret:4,note:'B',finger:1 },{ fret:6,note:'C#',finger:3 },{ fret:7,note:'D',finger:4 }],
          B: [{ fret:5,note:'E',finger:2 },{ fret:7,note:'F#',finger:4 }],
          e: [{ fret:4,note:'G#',finger:1 },{ fret:5,note:'A',finger:2 }],
        },
      },
      {
        label: '7th Position (Fret 7)', startFret: 7,
        strings: {
          E: [{ fret:7,note:'B',finger:1 },{ fret:9,note:'C#',finger:3 },{ fret:10,note:'D',finger:4 }],
          A: [{ fret:7,note:'E',finger:1 },{ fret:9,note:'F#',finger:3 },{ fret:10,note:'G',finger:4 }],
          D: [{ fret:7,note:'A',finger:1 },{ fret:9,note:'B',finger:3 },{ fret:10,note:'C#',finger:4 }],
          G: [{ fret:7,note:'D',finger:1 },{ fret:9,note:'E',finger:3 }],
          B: [{ fret:7,note:'F#',finger:1 },{ fret:9,note:'G#',finger:3 },{ fret:10,note:'A',finger:4 }],
          e: [{ fret:7,note:'B',finger:1 },{ fret:9,note:'C#',finger:3 },{ fret:10,note:'D',finger:4 }],
        },
      },
    ],
  },
  {
    key: 'A', notes: ['A','B','C#','D','E','F#','G#'], sharps: 3, sharpNotes: ['F#','C#','G#'],
    positions: [
      {
        label: 'Open Position', startFret: 0,
        strings: {
          E: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 }],
          A: [{ fret:0,note:'A' },{ fret:2,note:'B',finger:2 },{ fret:4,note:'C#',finger:4 }],
          D: [{ fret:0,note:'D' },{ fret:2,note:'E',finger:2 },{ fret:4,note:'F#',finger:4 }],
          G: [{ fret:1,note:'G#',finger:1 },{ fret:2,note:'A',finger:2 }],
          B: [{ fret:2,note:'C#',finger:2 },{ fret:4,note:'D#',finger:4 }],
          e: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 }],
        },
      },
      {
        label: '4th Position (Fret 4)', startFret: 4,
        strings: {
          E: [{ fret:4,note:'G#',finger:1 },{ fret:5,note:'A',finger:2 },{ fret:7,note:'B',finger:4 }],
          A: [{ fret:4,note:'C#',finger:1 },{ fret:6,note:'D#',finger:3 },{ fret:7,note:'E',finger:4 }],
          D: [{ fret:4,note:'F#',finger:1 },{ fret:6,note:'G#',finger:3 },{ fret:7,note:'A',finger:4 }],
          G: [{ fret:4,note:'B',finger:1 },{ fret:6,note:'C#',finger:3 },{ fret:7,note:'D',finger:4 }],
          B: [{ fret:5,note:'E',finger:2 },{ fret:7,note:'F#',finger:4 }],
          e: [{ fret:4,note:'G#',finger:1 },{ fret:5,note:'A',finger:2 }],
        },
      },
      {
        label: '9th Position (Fret 9)', startFret: 9,
        strings: {
          E: [{ fret:9,note:'C#',finger:1 },{ fret:11,note:'D#',finger:3 },{ fret:12,note:'E',finger:4 }],
          A: [{ fret:9,note:'F#',finger:1 },{ fret:11,note:'G#',finger:3 },{ fret:12,note:'A',finger:4 }],
          D: [{ fret:9,note:'B',finger:1 },{ fret:11,note:'C#',finger:3 }],
          G: [{ fret:9,note:'E',finger:1 },{ fret:11,note:'F#',finger:3 },{ fret:12,note:'G#',finger:4 }],
          B: [{ fret:9,note:'A',finger:1 },{ fret:11,note:'B',finger:3 },{ fret:12,note:'C#',finger:4 }],
          e: [{ fret:9,note:'C#',finger:1 },{ fret:11,note:'D#',finger:3 },{ fret:12,note:'E',finger:4 }],
        },
      },
    ],
  },
  {
    key: 'E', notes: ['E','F#','G#','A','B','C#','D#'], sharps: 4, sharpNotes: ['F#','C#','G#','D#'],
    positions: [
      {
        label: 'Open Position', startFret: 0,
        strings: {
          E: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 },{ fret:4,note:'G#',finger:4 }],
          A: [{ fret:0,note:'A' },{ fret:2,note:'B',finger:2 },{ fret:4,note:'C#',finger:4 }],
          D: [{ fret:1,note:'D#',finger:1 },{ fret:2,note:'E',finger:2 },{ fret:4,note:'F#',finger:4 }],
          G: [{ fret:1,note:'G#',finger:1 },{ fret:2,note:'A',finger:2 },{ fret:4,note:'B',finger:4 }],
          B: [{ fret:0,note:'B' },{ fret:2,note:'C#',finger:2 },{ fret:4,note:'D#',finger:4 }],
          e: [{ fret:0,note:'E' },{ fret:2,note:'F#',finger:2 },{ fret:4,note:'G#',finger:4 }],
        },
      },
      {
        label: '4th Position (Fret 4)', startFret: 4,
        strings: {
          E: [{ fret:4,note:'G#',finger:1 },{ fret:6,note:'A#',finger:3 },{ fret:7,note:'B',finger:4 }],
          A: [{ fret:4,note:'C#',finger:1 },{ fret:6,note:'D#',finger:3 },{ fret:7,note:'E',finger:4 }],
          D: [{ fret:4,note:'F#',finger:1 },{ fret:6,note:'G#',finger:3 },{ fret:7,note:'A',finger:4 }],
          G: [{ fret:4,note:'B',finger:1 },{ fret:6,note:'C#',finger:3 },{ fret:7,note:'D#',finger:4 }],
          B: [{ fret:4,note:'D#',finger:1 },{ fret:5,note:'E',finger:2 },{ fret:7,note:'F#',finger:4 }],
          e: [{ fret:4,note:'G#',finger:1 },{ fret:6,note:'A#',finger:3 },{ fret:7,note:'B',finger:4 }],
        },
      },
      {
        label: '9th Position (Fret 9)', startFret: 9,
        strings: {
          E: [{ fret:9,note:'C#',finger:1 },{ fret:11,note:'D#',finger:3 },{ fret:12,note:'E',finger:4 }],
          A: [{ fret:9,note:'F#',finger:1 },{ fret:11,note:'G#',finger:3 },{ fret:12,note:'A',finger:4 }],
          D: [{ fret:9,note:'B',finger:1 },{ fret:11,note:'C#',finger:3 },{ fret:12,note:'D#',finger:4 }],
          G: [{ fret:9,note:'E',finger:1 },{ fret:11,note:'F#',finger:3 }],
          B: [{ fret:9,note:'A',finger:1 },{ fret:11,note:'B',finger:3 }],
          e: [{ fret:9,note:'C#',finger:1 },{ fret:11,note:'D#',finger:3 },{ fret:12,note:'E',finger:4 }],
        },
      },
    ],
  },
  {
    key: 'B', notes: ['B','C#','D#','E','F#','G#','A#'], sharps: 5, sharpNotes: ['F#','C#','G#','D#','A#'],
    positions: [
      {
        label: '2nd Position (Fret 2)', startFret: 2,
        strings: {
          E: [{ fret:2,note:'F#',finger:1 },{ fret:4,note:'G#',finger:3 }],
          A: [{ fret:2,note:'B',finger:1 },{ fret:4,note:'C#',finger:3 }],
          D: [{ fret:1,note:'D#',finger:1 },{ fret:2,note:'E',finger:2 },{ fret:4,note:'F#',finger:4 }],
          G: [{ fret:1,note:'G#',finger:1 },{ fret:3,note:'A#',finger:3 },{ fret:4,note:'B',finger:4 }],
          B: [{ fret:2,note:'C#',finger:1 },{ fret:4,note:'D#',finger:3 }],
          e: [{ fret:2,note:'F#',finger:1 },{ fret:4,note:'G#',finger:3 }],
        },
      },
      {
        label: '7th Position (Fret 7)', startFret: 7,
        strings: {
          E: [{ fret:7,note:'B',finger:1 },{ fret:9,note:'C#',finger:3 },{ fret:11,note:'D#',finger:4 }],
          A: [{ fret:7,note:'E',finger:1 },{ fret:9,note:'F#',finger:3 },{ fret:11,note:'G#',finger:4 }],
          D: [{ fret:7,note:'A',finger:1 },{ fret:9,note:'B',finger:3 },{ fret:11,note:'C#',finger:4 }],
          G: [{ fret:8,note:'D#',finger:2 },{ fret:9,note:'E',finger:3 },{ fret:11,note:'F#',finger:4 }],
          B: [{ fret:7,note:'F#',finger:1 },{ fret:9,note:'G#',finger:3 },{ fret:11,note:'A#',finger:4 }],
          e: [{ fret:7,note:'B',finger:1 },{ fret:9,note:'C#',finger:3 },{ fret:11,note:'D#',finger:4 }],
        },
      },
      {
        label: '11th Position (Fret 11)', startFret: 11,
        strings: {
          E: [{ fret:11,note:'D#',finger:1 },{ fret:12,note:'E',finger:2 },{ fret:14,note:'F#',finger:4 }],
          A: [{ fret:11,note:'G#',finger:1 },{ fret:12,note:'A',finger:2 },{ fret:14,note:'B',finger:4 }],
          D: [{ fret:11,note:'C#',finger:1 },{ fret:13,note:'D#',finger:3 },{ fret:14,note:'E',finger:4 }],
          G: [{ fret:11,note:'F#',finger:1 },{ fret:13,note:'G#',finger:3 },{ fret:14,note:'A#',finger:4 }],
          B: [{ fret:11,note:'A#',finger:1 },{ fret:12,note:'B',finger:2 },{ fret:14,note:'C#',finger:4 }],
          e: [{ fret:11,note:'D#',finger:1 },{ fret:12,note:'E',finger:2 },{ fret:14,note:'F#',finger:4 }],
        },
      },
    ],
  },
];

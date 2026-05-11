import { RHExercise, LHExercise } from './types';

export const RH_EXERCISES: RHExercise[] = [
  {
    id:'rh_1', number:1, label:'All Downstrokes', pattern:['D','D','D','D','D','D'],
    targetBpm:180, startBpm:80, note:'All 6 strings',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+downpicking+exercise',
    description: `🎸 ALL DOWNSTROKES\n\nStrike every string using only downward pick strokes (↓).\n\n📋 HOW TO DO IT:\n• Hold the pick firmly at a slight angle\n• Play strings 1→6 (thin to thick) using only downstrokes\n• Keep your wrist relaxed and close to the strings\n• Maintain even volume and tone on every note\n\n⚡ GOAL: Build strong, consistent picking power and rhythmic accuracy.\n\n🎯 Target: 180 BPM\n💡 Start at 80 BPM, increase 5 BPM only when perfectly clean.`,
  },
  {
    id:'rh_2', number:2, label:'DU × 4 each string', pattern:['D','U','D','U','D','U','D','U'],
    targetBpm:250, startBpm:100, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+alternate+picking+exercise',
    description: `🎸 DU × 4 EACH STRING\n\nAlternate pick (Down-Up) 4 times on each string before moving to the next.\n\n📋 HOW TO DO IT:\n• Pattern: D U D U on one string, then move to the next\n• Keep the pick motion small and efficient\n• The pick should never leave the string "plane"\n• Practice slowly with a metronome — speed comes naturally\n\n⚡ GOAL: Develop fluid alternate picking and string synchronization.\n\n🎯 Target: 250 BPM\n💡 Start at 100 BPM. Increase only when all 4 strokes sound equal in volume.`,
  },
  {
    id:'rh_3', number:3, label:'UD × 4 each string', pattern:['U','D','U','D','U','D','U','D'],
    targetBpm:250, startBpm:100, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+upstroke+alternate+picking',
    description: `🎸 UD × 4 EACH STRING\n\nSame as exercise 2, but START with an upstroke (Up-Down).\n\n📋 HOW TO DO IT:\n• Pattern: U D U D on each string\n• Starting upstroke is harder — this builds symmetry\n• Keep your elbow anchored, move only from the wrist\n• Use a metronome and count "1-and-2-and" for each group of 4\n\n⚡ GOAL: Eliminate the natural bias toward downstrokes, building true bidirectional picking strength.\n\n🎯 Target: 250 BPM\n💡 This feels awkward at first — that's normal! Slow practice is key.`,
  },
  {
    id:'rh_4', number:4, label:'DU × 2 each string', pattern:['D','U','D','U'],
    targetBpm:250, startBpm:120, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+alternate+picking+string+crossing',
    description: `🎸 DU × 2 EACH STRING\n\nAlternate pick (Down-Up) only 2 times per string, forcing faster string changes.\n\n📋 HOW TO DO IT:\n• Pattern: D U on string 1, then D U on string 2, etc.\n• This requires quick string crossing — the key skill here\n• Watch for "string hopping" — your pick should glide, not bounce\n• Practice crossing both ways: thin→thick and thick→thin\n\n⚡ GOAL: Build fast, accurate string crossing with alternate picking.\n\n🎯 Target: 250 BPM\n💡 The transition between strings is the real challenge. Go slow!`,
  },
  {
    id:'rh_5', number:5, label:'UD × 2 each string', pattern:['U','D','U','D'],
    targetBpm:250, startBpm:120, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+alternate+picking+string+crossing',
    description: `🎸 UD × 2 EACH STRING\n\nSame as exercise 4 but starting on an upstroke — the harder variation.\n\n📋 HOW TO DO IT:\n• Pattern: U D on each string, moving string to string\n• Starting upstroke before crossing challenges your pick economy\n• Keep wrist motion minimal — economy of movement is speed\n• Use a mirror or phone camera to check pick angle consistency\n\n⚡ GOAL: Develop pick economy and controlled upstroke-led string crossing.\n\n🎯 Target: 250 BPM\n💡 Combine with exercise 4 for a complete string crossing workout.`,
  },
  {
    id:'rh_6', number:6, label:'DU single', pattern:['D','U'],
    targetBpm:250, startBpm:150, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+fast+alternate+picking',
    description: `🎸 DU SINGLE\n\nOne Down and one Up on each string — maximum string-crossing speed.\n\n📋 HOW TO DO IT:\n• Just D U on string 1, then immediately D U on string 2\n• This is the most demanding string-crossing exercise in the series\n• Focus on landing cleanly on the new string every time\n• Mute unused strings with your fretting hand lightly\n\n⚡ GOAL: Achieve high-speed, clean single-alternation string crossing — the foundation of fast lead playing.\n\n🎯 Target: 250 BPM\n💡 At high speeds, timing becomes the primary challenge. Breathe and relax!`,
  },
  {
    id:'rh_7', number:7, label:'UD single', pattern:['U','D'],
    targetBpm:250, startBpm:150, note:'Each string',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+fast+alternate+picking',
    description: `🎸 UD SINGLE\n\nUpstroke-led single alternation across all strings.\n\n📋 HOW TO DO IT:\n• Pattern: U D on every string, string to string\n• Upstroke-first is the reverse of your natural instinct — embrace it\n• Think of the pick as a pendulum: even timing, even force both ways\n• Start in the middle of your BPM range, not at maximum speed\n\n⚡ GOAL: Complete the picking symmetry — upstroke and downstroke must feel equally powerful and controlled.\n\n🎯 Target: 250 BPM\n💡 Mastering this means you have true alternate picking control.`,
  },
  {
    id:'rh_8', number:8, label:'Triplet alternating', pattern:['D','U','D','U','D','U'],
    targetBpm:250, startBpm:120, note:'Alternate strings',
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+triplet+picking+exercise',
    description: `🎸 TRIPLET ALTERNATING\n\nAlternate picking in triplet groupings — 3 notes per beat.\n\n📋 HOW TO DO IT:\n• Pattern: D U D | U D U (two triplet groups = 6 strokes per cycle)\n• Because there are 3 strokes per beat, each beat starts on a different direction\n• Count it as "1-trip-let  2-trip-let" aloud while playing\n• This naturally alternates string per group — move strings on beat 1 of each group\n\n⚡ GOAL: Develop triplet feel and directional independence — essential for rock, blues, and lead guitar.\n\n🎯 Target: 250 BPM (quarter note = BPM)\n💡 This can sound tricky at first. Use a metronome and count out loud!`,
  },
];

export const LH_EXERCISES: LHExercise[] = [
  {
    stringName: '6th String (E)', openNote: 'E',
    fingerNotes: [{ note:'F', finger:1, fret:1 }, { note:'G', finger:3, fret:3 }],
    patterns: ['EEFF','GGFF','EGFE','FEFG','EEGG','FFGG','FEGF','EEEE'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
  {
    stringName: '5th String (A)', openNote: 'A',
    fingerNotes: [{ note:'B', finger:2, fret:2 }, { note:'C', finger:3, fret:3 }],
    patterns: ['AABB','CCBB','ACBA','BABC','AACC','BBCC','BACB','AAAA'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
  {
    stringName: '4th String (D)', openNote: 'D',
    fingerNotes: [{ note:'E', finger:2, fret:2 }, { note:'F', finger:3, fret:3 }],
    patterns: ['DDEE','FFEE','DFED','EDFE','DDFF','EEFF','EDFE','DDDD'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
  {
    stringName: '3rd String (G)', openNote: 'G',
    fingerNotes: [{ note:'A', finger:2, fret:2 }, { note:'B', finger:4, fret:4 }],
    patterns: ['GGAA','BBAA','GBAG','AGAB','GGBB','AABB','AGBA','GGGG'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
  {
    stringName: '2nd String (B)', openNote: 'B',
    fingerNotes: [{ note:'C', finger:1, fret:1 }, { note:'D', finger:3, fret:3 }],
    patterns: ['BBCC','DDCC','BDCB','CBCD','BBDD','CCDD','CBDC','BBBB'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
  {
    stringName: '1st String (e)', openNote: 'E',
    fingerNotes: [{ note:'F', finger:1, fret:1 }, { note:'G', finger:3, fret:3 }],
    patterns: ['EEFF','GGFF','EGFE','FEFG','EEGG','FFGG','FEGF','EEEE'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+spider+exercise+left+hand'
  },
];

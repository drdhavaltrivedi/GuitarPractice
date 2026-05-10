import { RHExercise, LHExercise } from './types';

export const RH_EXERCISES: RHExercise[] = [
  { id:'rh_1', number:1, label:'All Downstrokes',      pattern:['D','D','D','D','D','D'], targetBpm:180, startBpm:80,  note:'All 6 strings' },
  { id:'rh_2', number:2, label:'DU × 4 each string',  pattern:['D','U','D','U','D','U','D','U'], targetBpm:250, startBpm:100, note:'Each string' },
  { id:'rh_3', number:3, label:'UD × 4 each string',  pattern:['U','D','U','D','U','D','U','D'], targetBpm:250, startBpm:100, note:'Each string' },
  { id:'rh_4', number:4, label:'DU × 2 each string',  pattern:['D','U','D','U'], targetBpm:250, startBpm:120, note:'Each string' },
  { id:'rh_5', number:5, label:'UD × 2 each string',  pattern:['U','D','U','D'], targetBpm:250, startBpm:120, note:'Each string' },
  { id:'rh_6', number:6, label:'DU single',            pattern:['D','U'], targetBpm:250, startBpm:150, note:'Each string' },
  { id:'rh_7', number:7, label:'UD single',            pattern:['U','D'], targetBpm:250, startBpm:150, note:'Each string' },
  { id:'rh_8', number:8, label:'Triplet alternating',  pattern:['D','U','D','U','D','U'], targetBpm:250, startBpm:120, note:'Alternate strings' },
];

export const LH_EXERCISES: LHExercise[] = [
  {
    stringName: '6th String (E)', openNote: 'E',
    fingerNotes: [{ note:'F', finger:1, fret:1 }, { note:'G', finger:3, fret:3 }],
    patterns: ['EEFF','GGFF','EGFE','FEFG','EEGG','FFGG','FEGF','EEEE'],
  },
  {
    stringName: '5th String (A)', openNote: 'A',
    fingerNotes: [{ note:'B', finger:2, fret:2 }, { note:'C', finger:3, fret:3 }],
    patterns: ['AABB','CCBB','ACBA','BABC','AACC','BBCC','BACB','AAAA'],
  },
  {
    stringName: '4th String (D)', openNote: 'D',
    fingerNotes: [{ note:'E', finger:2, fret:2 }, { note:'F', finger:3, fret:3 }],
    patterns: ['DDEE','FFEE','DFED','EDFE','DDFF','EEFF','EDFE','DDDD'],
  },
  {
    stringName: '3rd String (G)', openNote: 'G',
    fingerNotes: [{ note:'A', finger:2, fret:2 }, { note:'B', finger:4, fret:4 }],
    patterns: ['GGAA','BBAA','GBAG','AGAB','GGBB','AABB','AGBA','GGGG'],
  },
  {
    stringName: '2nd String (B)', openNote: 'B',
    fingerNotes: [{ note:'C', finger:1, fret:1 }, { note:'D', finger:3, fret:3 }],
    patterns: ['BBCC','DDCC','BDCB','CBCD','BBDD','CCDD','CBDC','BBBB'],
  },
  {
    stringName: '1st String (e)', openNote: 'E',
    fingerNotes: [{ note:'F', finger:1, fret:1 }, { note:'G', finger:3, fret:3 }],
    patterns: ['EEFF','GGFF','EGFE','FEFG','EEGG','FFGG','FEGF','EEEE'],
  },
];

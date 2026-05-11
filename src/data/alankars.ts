import { Alankar } from './types';

export const ALANKARS: Alankar[] = [
  {
    number:1, type:'Scale Run', groupSize:1, targetBpm:180, startBpm:80,
    ascending:  ['C','D','E','F','G','A','B','C'],
    descending: ['C','B','A','G','F','E','D','C'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+major+scale+run+exercise',
    description: `🎵 ALANKAR 1 — SCALE RUN\n\nPlay the C Major scale ascending and descending, one note at a time.\n\n📋 HOW TO DO IT:\n• Ascending: C → D → E → F → G → A → B → C\n• Descending: C → B → A → G → F → E → D → C\n• Use alternate picking (D U D U) throughout\n• Place each finger and keep it down as you ascend\n• Lift fingers cleanly as you descend\n\n⚡ GOAL: Build foundational scale fluency, left-right hand synchronization, and even tone across all positions.\n\n🎯 Target: 180 BPM\n💡 This is your warm-up. Never skip it — it wakes up the fingers.`,
  },
  {
    number:2, type:'Double Notes', groupSize:2, targetBpm:180, startBpm:80,
    ascending:  ['CC','DD','EE','FF','GG','AA','BB','CC'],
    descending: ['CC','BB','AA','GG','FF','EE','DD','CC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+double+picking+exercise',
    description: `🎵 ALANKAR 2 — DOUBLE NOTES\n\nPlay each note of the C Major scale twice before moving to the next.\n\n📋 HOW TO DO IT:\n• Ascending: C C → D D → E E → F F → G G → A A → B B → C C\n• Each note gets 2 strokes — D U per note\n• Keep fingers arched and tips on the strings\n• Focus on even spacing — both notes must be equal duration\n\n⚡ GOAL: Develop controlled double-stroke fluency and reinforce scale positions.\n\n🎯 Target: 180 BPM\n💡 If the two hits sound unequal, slow down until they match perfectly.`,
  },
  {
    number:3, type:'Thirds', groupSize:2, targetBpm:160, startBpm:80,
    ascending:  ['CE','DF','EG','FA','GB','AC'],
    descending: ['CA','BG','AF','GE','FD','EC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+scale+in+thirds+exercise',
    description: `🎵 ALANKAR 3 — THIRDS\n\nPlay the scale in intervals of a third — skip one note between each pair.\n\n📋 HOW TO DO IT:\n• Ascending: C-E, D-F, E-G, F-A, G-B, A-C\n• Descending: C-A, B-G, A-F, G-E, F-D, E-C\n• Each pair is 2 notes played in quick succession\n• This involves larger finger stretches — stretch gently, never strain\n\n⚡ GOAL: Build scale interval recognition (musical ear training) and hand stretching ability.\n\n🎯 Target: 160 BPM\n💡 Intervals of thirds are the basis of countless melodies and solos.`,
  },
  {
    number:4, type:'3-Note Groups', groupSize:3, targetBpm:160, startBpm:80,
    ascending:  ['CDE','DEF','EFG','FGA','GAB','ABC'],
    descending: ['CBA','BAG','AGF','GFE','FED','EDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+3+note+per+string+sequences',
    description: `🎵 ALANKAR 4 — 3-NOTE GROUPS\n\nPlay the scale in ascending and descending groups of 3 consecutive notes.\n\n📋 HOW TO DO IT:\n• Ascending: C D E | D E F | E F G | F G A | G A B | A B C\n• Descending: C B A | B A G | A G F | G F E | F E D | E D C\n• Accent the first note of each group\n• This creates a triplet feel — count "1-2-3 | 1-2-3"\n• Use a metronome and feel where each group starts\n\n⚡ GOAL: Develop sequence playing (the engine of most lead guitar phrases) and rhythmic grouping.\n\n🎯 Target: 160 BPM\n💡 3-note groups are extremely common in rock and classical guitar runs.`,
  },
  {
    number:5, type:'4-Note Groups', groupSize:4, targetBpm:150, startBpm:80,
    ascending:  ['CDEF','DEFG','EFGA','FGAB','GABC'],
    descending: ['CBAG','BAGF','AGFE','GFED','FEDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+4+note+sequences+exercise',
    description: `🎵 ALANKAR 5 — 4-NOTE GROUPS\n\nPlay scale in groups of 4 consecutive notes, each group starting one step higher.\n\n📋 HOW TO DO IT:\n• Ascending: C D E F | D E F G | E F G A | F G A B | G A B C\n• Descending: C B A G | B A G F | A G F E | G F E D | F E D C\n• Each group of 4 = one "unit" — count "1-2-3-4 | 1-2-3-4"\n• Accent note 1 of each group lightly for rhythmic clarity\n\n⚡ GOAL: Build 16th-note pattern fluency — the most common note duration in modern guitar.\n\n🎯 Target: 150 BPM\n💡 4-note groupings are the bread and butter of every guitarist's vocabulary.`,
  },
  {
    number:6, type:'5-Note Groups', groupSize:5, targetBpm:140, startBpm:80,
    ascending:  ['CDEFG','DEFGA','EFGAB','FGABC'],
    descending: ['CBAGF','BAGFE','AGFED','GFEDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+5+note+sequences+exercise',
    description: `🎵 ALANKAR 6 — 5-NOTE GROUPS\n\nPlay the scale in groups of 5 consecutive ascending or descending notes.\n\n📋 HOW TO DO IT:\n• Ascending: C D E F G | D E F G A | E F G A B | F G A B C\n• Descending: C B A G F | B A G F E | A G F E D | G F E D C\n• Groups of 5 create rhythmic ambiguity — they push and pull against the beat\n• This is an advanced sequencing concept — start very slow\n\n⚡ GOAL: Develop polyrhythmic phrasing and unusual grouping feel used by advanced players.\n\n🎯 Target: 140 BPM\n💡 5-note groups make your playing sound more sophisticated and less predictable.`,
  },
  {
    number:7, type:'Turn Pattern', groupSize:3, targetBpm:130, startBpm:80,
    ascending:  ['CDC','DED','EFE','FGF','GAG','ABA','BCB','CDC'],
    descending: ['CBC','BAB','AGA','GFG','FEF','EDE','DCD','CBC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+turn+pattern+exercise',
    description: `🎵 ALANKAR 7 — TURN PATTERN\n\nA "turn" ornament: play the note, one above, then back, then one below — 3 notes total.\n\n📋 HOW TO DO IT:\n• Each turn = Note → Note Above → Note → (next position)\n• Example on C: C D C | D E D | E F E...\n• This requires quick direction changes and precise finger placement\n• Slow practice is critical — each note must be equally clear\n\n⚡ GOAL: Develop ornament technique (turns, trills) used in classical, flamenco, and Indian music styles.\n\n🎯 Target: 130 BPM\n💡 Turns appear constantly in Hindustani classical music and Western baroque guitar.`,
  },
  {
    number:8, type:'5-Note Turn', groupSize:5, targetBpm:120, startBpm:80,
    ascending:  ['CDEDC','DEFED','EFGFE','FGAGF','GABAG','ABCBA','BCDCB','CDEDC'],
    descending: ['CBABC','BAGAB','AGFGA','GFEFG','FEDEF','EDCDE','DCBCD','CBABC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+advanced+turn+patterns',
    description: `🎵 ALANKAR 8 — 5-NOTE TURN\n\nAn extended ornament: go up 2 notes, back to start, down 1, then return — 5 notes total.\n\n📋 HOW TO DO IT:\n• Example on C: C D E D C | D E F E D | E F G F E...\n• 5 notes per group — think "up up back back down"\n• This is the most complex alankar — master all previous ones first\n• Hands must be perfectly synchronized at every note\n\n⚡ GOAL: Achieve mastery-level ornamentation and melodic phrasing that sounds deeply musical.\n\n🎯 Target: 120 BPM\n💡 At this level, you're not just playing scales — you're playing music. Listen to each note!`,
  },
];

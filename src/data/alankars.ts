import { Alankar } from './types';

export const ALANKARS: Alankar[] = [
  {
    number:1, type:'Scale Run', groupSize:1, targetBpm:180, startBpm:80,
    ascending:  ['C','D','E','F','G','A','B','C'],
    descending: ['C','B','A','G','F','E','D','C'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+major+scale+run+exercise'
  },
  {
    number:2, type:'Double Notes', groupSize:2, targetBpm:180, startBpm:80,
    ascending:  ['CC','DD','EE','FF','GG','AA','BB','CC'],
    descending: ['CC','BB','AA','GG','FF','EE','DD','CC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+double+picking+exercise'
  },
  {
    number:3, type:'Thirds', groupSize:2, targetBpm:160, startBpm:80,
    ascending:  ['CE','DF','EG','FA','GB','AC'],
    descending: ['CA','BG','AF','GE','FD','EC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+scale+in+thirds+exercise'
  },
  {
    number:4, type:'3-Note Groups', groupSize:3, targetBpm:160, startBpm:80,
    ascending:  ['CDE','DEF','EFG','FGA','GAB','ABC'],
    descending: ['CBA','BAG','AGF','GFE','FED','EDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+3+note+per+string+sequences'
  },
  {
    number:5, type:'4-Note Groups', groupSize:4, targetBpm:150, startBpm:80,
    ascending:  ['CDEF','DEFG','EFGA','FGAB','GABC'],
    descending: ['CBAG','BAGF','AGFE','GFED','FEDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+4+note+sequences+exercise'
  },
  {
    number:6, type:'5-Note Groups', groupSize:5, targetBpm:140, startBpm:80,
    ascending:  ['CDEFG','DEFGA','EFGAB','FGABC'],
    descending: ['CBAGF','BAGFE','AGFED','GFEDC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+5+note+sequences+exercise'
  },
  {
    number:7, type:'Turn Pattern', groupSize:3, targetBpm:130, startBpm:80,
    ascending:  ['CDC','DED','EFE','FGF','GAG','ABA','BCB','CDC'],
    descending: ['CBC','BAB','AGA','GFG','FEF','EDE','DCD','CBC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+turn+pattern+exercise'
  },
  {
    number:8, type:'5-Note Turn', groupSize:5, targetBpm:120, startBpm:80,
    ascending:  ['CDEDC','DEFED','EFGFE','FGAGF','GABAG','ABCBA','BCDCB','CDEDC'],
    descending: ['CBABC','BAGAB','AGFGA','GFEFG','FEDEF','EDCDE','DCBCD','CBABC'],
    videoUrl: 'https://www.youtube.com/results?search_query=guitar+advanced+turn+patterns'
  },
];

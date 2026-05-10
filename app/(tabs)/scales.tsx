import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { SCALES } from '../../src/data/scales';
import { KeySelector } from '../../src/components/ui/KeySelector';
import { NoteChip } from '../../src/components/ui/NoteChip';
import { FretboardSVG } from '../../src/components/fretboard/FretboardSVG';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';

export default function ScalesScreen() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedPos, setSelectedPos] = useState(0);
  const { width } = useWindowDimensions();

  const scale = SCALES.find(s => s.key === selectedKey) ?? SCALES[0];
  const position = scale.positions[selectedPos] ?? scale.positions[0];

  const handleKeyChange = (key: string) => { setSelectedKey(key); setSelectedPos(0); };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeySelector selected={selectedKey} onSelect={handleKeyChange} />
        <View style={styles.infoBar}>
          <Text style={styles.scaleTitle}>{scale.key} Major</Text>
          <Text style={styles.sharps}>{scale.sharps === 0 ? 'No sharps' : `${scale.sharps}♯`}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.noteRow}>
          {scale.notes.map(n => <NoteChip key={n} note={n} isSharp={scale.sharpNotes.includes(n)} />)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.posRow}>
          {scale.positions.map((pos, i) => (
            <TouchableOpacity key={i} style={[styles.posTab, selectedPos===i && styles.posTabActive]} onPress={() => setSelectedPos(i)}>
              <Text style={[styles.posTabText, selectedPos===i && styles.posTabTextActive]}>{pos.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.fretboard}>
          <FretboardSVG position={position} width={width - 32} height={220} />
        </View>
        <TouchableOpacity style={styles.practiceBtn} onPress={() => router.push(('/metronome?bpm=80&label=' + encodeURIComponent(scale.key + ' Scale')) as any)} activeOpacity={0.8}>
          <Text style={styles.practiceBtnText}>▶ Play with Metronome</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.background },
  infoBar:          { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:16, paddingVertical:8 },
  scaleTitle:       { color:colors.textPrimary, fontSize:20, fontFamily:typography.heading },
  sharps:           { color:colors.textSecondary, fontSize:12 },
  noteRow:          { flexDirection:'row', gap:6, paddingHorizontal:16, paddingBottom:8 },
  posRow:           { flexDirection:'row', gap:8, paddingHorizontal:16, paddingBottom:12 },
  posTab:           { paddingHorizontal:12, paddingVertical:6, borderRadius:16, borderWidth:1, borderColor:colors.border, backgroundColor:colors.surface },
  posTabActive:     { borderColor:colors.gold, backgroundColor:colors.surfaceHigh },
  posTabText:       { color:colors.textSecondary, fontSize:12 },
  posTabTextActive: { color:colors.gold },
  fretboard:        { marginHorizontal:16, backgroundColor:colors.surface, borderRadius:12, padding:8, borderWidth:1, borderColor:colors.border },
  practiceBtn:      { margin:16, backgroundColor:colors.goldDim, borderRadius:12, paddingVertical:14, alignItems:'center' },
  practiceBtnText:  { color:colors.textPrimary, fontSize:16, fontFamily:typography.heading },
});

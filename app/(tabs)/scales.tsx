import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
        
        <View style={styles.header}>
          <View>
            <Text style={styles.scaleTitle}>{scale.key} Major</Text>
            <Text style={styles.sharps}>{scale.sharps === 0 ? 'No sharps' : `${scale.sharps} sharps in scale`}</Text>
          </View>
          <View style={styles.posBadge}>
            <Text style={styles.posBadgeText}>POS {selectedPos + 1}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.noteRow}>
          {scale.notes.map(n => <NoteChip key={n} note={n} isSharp={scale.sharpNotes.includes(n)} />)}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>POSITION TABS</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.posRow}>
          {scale.positions.map((pos, i) => (
            <TouchableOpacity key={i} style={[styles.posTab, selectedPos===i && styles.posTabActive]} onPress={() => setSelectedPos(i)}>
              <Text style={[styles.posTabText, selectedPos===i && styles.posTabTextActive]}>{pos.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.fretboardContainer}>
          <FretboardSVG position={position} width={width - 48} height={220} />
        </View>

        <TouchableOpacity 
          style={styles.practiceBtn} 
          onPress={() => router.push(('/metronome?bpm=80&label=' + encodeURIComponent(scale.key + ' Scale')) as any)} 
          activeOpacity={0.8}
        >
          <Ionicons name="play" size={18} color={colors.background} style={{ marginRight: 8 }} />
          <Text style={styles.practiceBtnText}>Play with Metronome</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:               { flex: 1, backgroundColor: colors.background },
  header:             { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', paddingHorizontal:spacing.lg, paddingVertical:spacing.md },
  scaleTitle:         { color:colors.textPrimary, fontSize:28, fontFamily:typography.heading },
  sharps:             { color:colors.textMuted, fontSize:12, marginTop: 2 },
  posBadge:           { backgroundColor: colors.goldDim + '33', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.goldDim + '55' },
  posBadgeText:       { color: colors.gold, fontSize: 10, fontWeight: 'bold' },
  noteRow:            { flexDirection:'row', gap:8, paddingHorizontal:spacing.lg, paddingBottom:spacing.lg, marginTop: spacing.xs },
  sectionHeader:      { paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  sectionHead:        { color:colors.textMuted, fontSize:10, letterSpacing:2, fontWeight: 'bold' },
  posRow:             { flexDirection:'row', gap:10, paddingHorizontal:spacing.lg, paddingBottom:spacing.lg },
  posTab:             { paddingHorizontal:16, paddingVertical:8, borderRadius:20, borderWidth:1, borderColor:colors.border, backgroundColor:colors.surfaceCard },
  posTabActive:       { borderColor:colors.gold, backgroundColor:colors.surfaceHigh, elevation: 2 },
  posTabText:         { color:colors.textMuted, fontSize:12, fontWeight: 'bold' },
  posTabTextActive:   { color:colors.gold },
  fretboardContainer: { marginHorizontal:spacing.lg, backgroundColor:colors.surfaceCard, borderRadius:20, padding:spacing.sm, borderWidth:1, borderColor:colors.border, elevation: 4, alignItems: 'center' },
  practiceBtn:        { margin:spacing.lg, backgroundColor:colors.gold, borderRadius:14, paddingVertical:16, alignItems:'center', flexDirection: 'row', justifyContent: 'center', elevation: 2 },
  practiceBtnText:    { color:colors.background, fontSize:16, fontFamily:typography.heading },
});


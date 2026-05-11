import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RH_EXERCISES, LH_EXERCISES } from '../../src/data/exercises';
import { ALANKARS } from '../../src/data/alankars';
import { ExerciseCard } from '../../src/components/exercises/ExerciseCard';
import { AlankaarCard } from '../../src/components/exercises/AlankaarCard';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { SCROLL_BOTTOM_PAD } from '../../src/theme/responsive';

type Tab = 'rh' | 'lh' | 'alankars';

export default function ExercisesScreen() {
  const [tab, setTab] = useState<Tab>('rh');
  const [selectedString, setSelectedString] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.tabRow}>
        {([['rh','Right Hand'],['lh','Left Hand'],['alankars','Alankars']] as [Tab,string][]).map(([t,l]) => (
          <TouchableOpacity key={t} style={[styles.tab, tab===t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab===t && styles.tabTextActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'rh' && (
        <ScrollView contentContainerStyle={styles.content}>
          {RH_EXERCISES.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onPractice={() => router.push(('/metronome?bpm=' + ex.startBpm + '&label=' + encodeURIComponent('RH ' + ex.number + ' – ' + ex.label)) as any)}
            />
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {tab === 'lh' && (
        <ScrollView contentContainerStyle={styles.content}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stringRow}>
            {LH_EXERCISES.map((ex, i) => (
              <TouchableOpacity key={i} style={[styles.strBtn, selectedString===i && styles.strBtnActive]} onPress={() => setSelectedString(i)}>
                <Text style={[styles.strBtnText, selectedString===i && styles.strBtnTextActive]}>{ex.openNote}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {LH_EXERCISES[selectedString] && (
            <View style={styles.lhCard}>
              <Text style={styles.lhTitle}>{LH_EXERCISES[selectedString].stringName}</Text>
              <View style={styles.lhFinger}>
                {LH_EXERCISES[selectedString].fingerNotes.map((fn, i) => (
                  <Text key={i} style={styles.lhFingerText}>Fret {fn.fret} → {fn.note} (finger {fn.finger})</Text>
                ))}
              </View>
              <View style={styles.patternGrid}>
                {LH_EXERCISES[selectedString].patterns.map((p, i) => (
                  <View key={i} style={styles.patternCell}>
                    <Text style={styles.patternText}>{p}</Text>
                  </View>
                ))}
              </View>
              {LH_EXERCISES[selectedString].videoUrl && (
                <TouchableOpacity 
                  style={styles.demoBtn} 
                  onPress={() => WebBrowser.openBrowserAsync(LH_EXERCISES[selectedString].videoUrl!)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="play-circle-outline" size={18} color={colors.gold} style={{ marginRight: 6 }} />
                  <Text style={styles.demoBtnText}>Watch Demo Video</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {tab === 'alankars' && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.scaleNote}>C Scale: C D E F G A B C</Text>
          {ALANKARS.map(a => (
            <AlankaarCard
              key={a.number}
              alankar={a}
              onPractice={() => router.push(('/metronome?bpm=' + a.startBpm + '&label=' + encodeURIComponent('Alankar ' + a.number + ' – ' + a.type)) as any)}
            />
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex:1, backgroundColor:colors.background },
  tabRow:           { flexDirection:'row', borderBottomWidth:1, borderBottomColor:colors.border },
  tab:              { flex:1, paddingVertical:12, alignItems:'center' },
  tabActive:        { borderBottomWidth:2, borderBottomColor:colors.gold },
  tabText:          { color:colors.textSecondary, fontSize:12 },
  tabTextActive:    { color:colors.gold },
  content:          { padding:16, paddingBottom: SCROLL_BOTTOM_PAD },
  stringRow:        { flexDirection:'row', gap:8, marginBottom:16 },
  strBtn:           { width:44, height:44, borderRadius:22, borderWidth:1.5, borderColor:colors.border, alignItems:'center', justifyContent:'center', backgroundColor:colors.surface },
  strBtnActive:     { borderColor:colors.gold, backgroundColor:colors.surfaceHigh },
  strBtnText:       { color:colors.textSecondary, fontSize:14, fontFamily:typography.heading },
  strBtnTextActive: { color:colors.gold },
  lhCard:           { backgroundColor:colors.surface, borderRadius:12, padding:16, borderWidth:1, borderColor:colors.border },
  lhTitle:          { color:colors.textPrimary, fontSize:16, fontFamily:typography.heading, marginBottom:8 },
  lhFinger:         { marginBottom:12, gap:4 },
  lhFingerText:     { color:colors.textSecondary, fontSize:13, fontFamily:typography.mono },
  patternGrid:      { flexDirection:'row', flexWrap:'wrap', gap:8 },
  patternCell:      { paddingHorizontal:12, paddingVertical:8, backgroundColor:colors.surfaceHigh, borderRadius:8, borderWidth:1, borderColor:colors.border },
  patternText:      { color:colors.textPrimary, fontSize:14, fontFamily:typography.mono },
  scaleNote:        { color:colors.textSecondary, fontSize:13, fontFamily:typography.mono, marginBottom:12, textAlign:'center' },
  demoBtn:          { marginTop: 16, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.goldDim, borderRadius: 10, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  demoBtnText:      { color: colors.gold, fontSize: typography.sm, fontFamily: typography.heading },
});

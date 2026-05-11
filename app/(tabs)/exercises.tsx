import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
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
import { SCROLL_BOTTOM_PAD, rs, rf } from '../../src/theme/responsive';

type Tab = 'rh' | 'lh' | 'alankars';

export default function ExercisesScreen() {
  const [tab, setTab] = useState<Tab>('rh');
  const [selectedString, setSelectedString] = useState(0);

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {( [['rh', 'Right Hand'], ['lh', 'Left Hand'], ['alankars', 'Alankars']] as [Tab, string][]).map(([t, l]) => {
        const active = tab === t;
        return (
          <TouchableOpacity
            key={t}
            style={[styles.tabItem, active && styles.tabItemActive]}
            onPress={() => setTab(t)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{l}</Text>
            {active && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>PRACTICE LIBRARY</Text>
        <Text style={styles.headerTitle}>Exercises</Text>
      </View>

      {renderTabBar()}

      {tab === 'rh' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {RH_EXERCISES.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onPractice={() => router.push(('/metronome?bpm=' + ex.startBpm + '&label=' + encodeURIComponent('RH ' + ex.number + ' – ' + ex.label)) as any)}
            />
          ))}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      )}

      {tab === 'lh' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHint}>Select a string to view fingering patterns</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stringRow}>
            {LH_EXERCISES.map((ex, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.strBtn, selectedString === i && styles.strBtnActive]}
                onPress={() => setSelectedString(i)}
                activeOpacity={0.8}
              >
                <Text style={[styles.strBtnText, selectedString === i && styles.strBtnTextActive]}>{ex.openNote}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {LH_EXERCISES[selectedString] && (
            <View style={styles.lhCard}>
              <View style={styles.lhHeader}>
                <Ionicons name="hand-right-outline" size={20} color={colors.gold} />
                <Text style={styles.lhTitle}>{LH_EXERCISES[selectedString].stringName}</Text>
              </View>
              
              <View style={styles.lhFinger}>
                {LH_EXERCISES[selectedString].fingerNotes.map((fn, i) => (
                  <View key={i} style={styles.fingerRow}>
                    <View style={styles.fretBadge}>
                      <Text style={styles.fretText}>{fn.fret}</Text>
                    </View>
                    <Text style={styles.lhFingerText}>
                      <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{fn.note}</Text>
                      <Text style={{ color: colors.textMuted }}> (Finger {fn.finger})</Text>
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              <Text style={styles.patternLabel}>PRACTICE PATTERNS</Text>
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
                  <Ionicons name="play-circle" size={20} color={colors.gold} style={{ marginRight: 8 }} />
                  <Text style={styles.demoBtnText}>Watch Video Guide</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      )}

      {tab === 'alankars' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.scaleInfoCard}>
            <Ionicons name="musical-notes" size={18} color={colors.goldDim} />
            <Text style={styles.scaleNote}>C Major Scale: C D E F G A B C</Text>
          </View>
          {ALANKARS.map(a => (
            <AlankaarCard
              key={a.number}
              alankar={a}
              onPractice={() => router.push(('/metronome?bpm=' + a.startBpm + '&label=' + encodeURIComponent('Alankar ' + a.number + ' – ' + a.type)) as any)}
            />
          ))}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.background },
  header:           { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, marginBottom: spacing.md },
  headerSub:        { color: colors.textMuted, fontSize: rf(11), letterSpacing: 2, fontWeight: '700' },
  headerTitle:      { color: colors.textPrimary, fontSize: rf(32), fontWeight: '800', letterSpacing: -0.5 },

  tabBar:           { flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.md, gap: spacing.md },
  tabItem:          { paddingVertical: 8, marginRight: 8, position: 'relative' },
  tabItemActive:    {},
  tabText:          { color: colors.textMuted, fontSize: rf(14), fontWeight: '600' },
  tabTextActive:    { color: colors.gold, fontWeight: '800' },
  activeIndicator:  { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: colors.gold, borderRadius: 2, shadowColor: colors.gold, shadowOpacity: 0.5, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } },

  content:          { paddingHorizontal: spacing.lg, paddingBottom: SCROLL_BOTTOM_PAD },
  sectionHint:      { color: colors.textDisabled, fontSize: rf(11), fontWeight: '600', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  
  // Left Hand tab styles
  stringRow:        { flexDirection: 'row', gap: 12, marginBottom: spacing.lg },
  strBtn:           { width: rs(50), height: rs(50), borderRadius: rs(25), borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceCard },
  strBtnActive:     { borderColor: colors.gold, backgroundColor: colors.surfaceHigh, elevation: 4, shadowColor: colors.gold, shadowOpacity: 0.2, shadowRadius: 8 },
  strBtnText:       { color: colors.textSecondary, fontSize: rf(16), fontWeight: '700' },
  strBtnTextActive: { color: colors.gold },

  lhCard:           { backgroundColor: colors.surfaceCard, borderRadius: 24, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  lhHeader:         { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.lg },
  lhTitle:          { color: colors.textPrimary, fontSize: rf(18), fontWeight: '800' },
  lhFinger:         { gap: 12, marginBottom: spacing.lg },
  fingerRow:        { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fretBadge:        { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  fretText:         { color: colors.gold, fontSize: rf(12), fontWeight: '800' },
  lhFingerText:     { fontSize: rf(14) },
  
  divider:          { height: 1, backgroundColor: colors.border, marginBottom: spacing.lg },
  
  patternLabel:     { color: colors.textMuted, fontSize: rf(10), fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 },
  patternGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  patternCell:      { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  patternText:      { color: colors.textPrimary, fontSize: rf(13), fontFamily: typography.mono, fontWeight: '600' },
  
  demoBtn:          { marginTop: spacing.xl, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.gold + '44', borderRadius: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  demoBtnText:      { color: colors.gold, fontSize: rf(14), fontWeight: '700' },

  // Alankars tab styles
  scaleInfoCard:    { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surfaceHigh, borderRadius: 16, padding: 12, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  scaleNote:        { color: colors.textSecondary, fontSize: rf(13), fontWeight: '600' },
});

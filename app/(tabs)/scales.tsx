import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SCALES } from '../../src/data/scales';
import { KeySelector } from '../../src/components/ui/KeySelector';
import { FretboardSVG } from '../../src/components/fretboard/FretboardSVG';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { SCROLL_BOTTOM_PAD } from '../../src/theme/responsive';

export default function ScalesScreen() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedPos, setSelectedPos] = useState(0);
  const { width } = useWindowDimensions();

  const scale = SCALES.find(s => s.key === selectedKey) ?? SCALES[0];
  const position = scale.positions[selectedPos] ?? scale.positions[0];

  const handleKeyChange = (key: string) => { setSelectedKey(key); setSelectedPos(0); };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconWrap}>
            <MaterialCommunityIcons name="guitar-pick" size={22} color={colors.gold} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.appTitle}>
              GUITAR<Text style={styles.appTitleAccent}>SCALES</Text> MASTER
            </Text>
            <Text style={styles.scaleSubtitle}>{scale.key} MAJOR SCALE</Text>
          </View>
        </View>

        {/* Key Selector */}
        <View style={styles.keySelectorWrap}>
          <KeySelector selected={selectedKey} onSelect={handleKeyChange} />
        </View>

        {/* Scale info chips */}
        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <Text style={styles.infoPillText}>
              {scale.sharps === 0 ? 'No sharps' : `${scale.sharps} sharps`}
            </Text>
          </View>
          <View style={styles.infoPill}>
            <Text style={styles.infoPillText}>
              {scale.notes.join(' · ')}
            </Text>
          </View>
        </View>

        {/* Position tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.posRow}
        >
          {scale.positions.map((pos, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.posTab, selectedPos === i && styles.posTabActive]}
              onPress={() => setSelectedPos(i)}
            >
              <Text style={[styles.posTabText, selectedPos === i && styles.posTabTextActive]}>
                {pos.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Fretboard */}
        <View style={styles.fretboardContainer}>
          <FretboardSVG position={position} width={width - 32} height={240} />
        </View>

        {/* Play with Metronome — glowing button */}
        <TouchableOpacity
          style={styles.practiceBtn}
          onPress={() => router.push(('/metronome?bpm=80&label=' + encodeURIComponent(scale.key + ' Scale')) as any)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="metronome" size={22} color={colors.gold} style={{ marginRight: 10 }} />
          <Text style={styles.practiceBtnText}>PLAY WITH METRONOME</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:              { flex: 1, backgroundColor: colors.background },
  scrollContent:     { paddingBottom: SCROLL_BOTTOM_PAD },

  // Header
  header:            {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerIconWrap:    {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText:        { flex: 1 },
  appTitle:          { color: colors.textPrimary, fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  appTitleAccent:    { color: colors.gold },
  scaleSubtitle:     { color: colors.textMuted, fontSize: 11, letterSpacing: 2, marginTop: 2, fontWeight: '600' },

  // Key Selector wrap
  keySelectorWrap:   {
    backgroundColor: colors.surfaceCard,
    marginHorizontal: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  // Info pills
  infoRow:           {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  infoPill:          {
    backgroundColor: colors.surfaceCard,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoPillText:      { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },

  // Position tabs
  posRow:            {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  posTab:            {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceCard,
  },
  posTabActive:      { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  posTabText:        { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  posTabTextActive:  { color: colors.gold },

  // Fretboard
  fretboardContainer: {
    marginHorizontal: spacing.md,
    backgroundColor: '#0F0D0B',
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  // Glowing practice button
  practiceBtn: {
    marginHorizontal: spacing.lg,
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: 'transparent',
    shadowColor: colors.gold,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  practiceBtnText: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
});

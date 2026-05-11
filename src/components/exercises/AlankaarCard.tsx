import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Alankar } from '../../data/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { rs, rf } from '../../theme/responsive';
import { InfoButton } from '../ui/InfoButton';
import { useProgressStore } from '../../store/progressStore';

interface Props {
  alankar: Alankar;
  onPractice: () => void;
}

function highlightC(group: string) {
  return group.includes('C');
}

export function AlankaarCard({ alankar, onPractice }: Props) {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  
  const bpmRecords = useProgressStore(state => state.bpmRecords);
  const record = bpmRecords[`alankar_${alankar.number}`];
  const progress = record ? Math.min(1, record / alankar.targetBpm) : 0;
  const mastery = Math.round(progress * 100);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    Animated.spring(heightAnim, {
      toValue: next ? 280 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.9}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{alankar.number}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.type}>{alankar.type}</Text>
            {alankar.description && (
              <InfoButton title={`Alankar ${alankar.number}: ${alankar.type}`} description={alankar.description} />
            )}
          </View>
          <Text style={styles.preview} numberOfLines={1}>
            {alankar.ascending.slice(0, 3).join(' · ')}…
          </Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.masteryText}>{mastery}%</Text>
          <Ionicons 
            name={expanded ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color={expanded ? colors.gold : colors.textDisabled} 
          />
        </View>
      </TouchableOpacity>

      {/* Mini Progress Bar on collapsed state */}
      {!expanded && (
        <View style={styles.miniProgressBarBg}>
          <View style={[styles.miniProgressBarFill, { width: `${mastery}%` }]} />
        </View>
      )}

      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <View style={styles.body}>
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
             <View style={styles.statItem}>
               <Text style={styles.statLabel}>MY BEST</Text>
               <Text style={styles.statValue}>{record ? `${record} BPM` : '—'}</Text>
             </View>
             <View style={styles.statItem}>
               <Text style={styles.statLabel}>TARGET</Text>
               <Text style={styles.statValue}>{alankar.targetBpm} BPM</Text>
             </View>
          </View>

          <View style={styles.sequenceSection}>
            <View style={styles.row}>
              <Ionicons name="trending-up" size={14} color={colors.gold} style={{ marginRight: 6 }} />
              <Text style={styles.label}>ASCENDING SEQUENCE</Text>
            </View>
            <View style={styles.groups}>
              {alankar.ascending.map((g, i) => (
                <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                  <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.row, { marginTop: 12 }]}>
              <Ionicons name="trending-down" size={14} color={colors.up} style={{ marginRight: 6 }} />
              <Text style={styles.label}>DESCENDING SEQUENCE</Text>
            </View>
            <View style={styles.groups}>
              {alankar.descending.map((g, i) => (
                <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                  <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            {alankar.videoUrl && (
              <TouchableOpacity 
                style={[styles.btn, styles.demoBtn]} 
                onPress={() => WebBrowser.openBrowserAsync(alankar.videoUrl!)} 
                activeOpacity={0.8}
              >
                <Ionicons name="play-circle-outline" size={18} color={colors.gold} style={{ marginRight: 4 }} />
                <Text style={styles.demoBtnText}>Video</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.btn, styles.practiceBtn]} onPress={onPractice} activeOpacity={0.8}>
              <Ionicons name="flash" size={16} color={colors.background} style={{ marginRight: 6 }} />
              <Text style={styles.btnText}>Start Practice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:            { backgroundColor: colors.surfaceCard, borderRadius: 24, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  header:          { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  badge:           { width: rs(36), height: rs(36), borderRadius: rs(10), backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  badgeText:       { color: colors.goldDim, fontSize: rf(14), fontWeight: '800' },
  info:            { flex: 1 },
  nameRow:         { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  type:            { color: colors.textPrimary, fontSize: rf(16), fontWeight: '800' },
  preview:         { color: colors.textMuted, fontSize: rf(11), fontFamily: typography.mono, fontWeight: '600' },
  rightInfo:       { alignItems: 'flex-end', gap: 4 },
  masteryText:     { color: colors.gold, fontSize: rf(12), fontWeight: '800' },
  
  miniProgressBarBg:   { height: 2, backgroundColor: colors.surfaceHigh, width: '100%' },
  miniProgressBarFill: { height: '100%', backgroundColor: colors.gold },

  body:            { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  divider:         { height: 1, backgroundColor: colors.border, marginBottom: spacing.md },
  
  statRow:         { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.lg },
  statItem:        { flex: 1 },
  statLabel:       { color: colors.textDisabled, fontSize: rf(9), fontWeight: '800', letterSpacing: 1, marginBottom: 2 },
  statValue:       { color: colors.textPrimary, fontSize: rf(15), fontWeight: '800' },

  sequenceSection: { marginBottom: spacing.lg },
  row:             { flexDirection: 'row', alignItems: 'center' },
  label:           { color: colors.textMuted, fontSize: rf(9), letterSpacing: 1, fontWeight: '800' },
  groups:          { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  group:           { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  groupAccent:     { backgroundColor: colors.goldDim + '22', borderColor: colors.goldDim + '44' },
  groupText:       { color: colors.textSecondary, fontSize: rf(11), fontFamily: typography.mono, fontWeight: '600' },
  groupTextAccent: { color: colors.gold, fontWeight: '800' },
  
  actions:         { flexDirection: 'row', gap: spacing.md },
  btn:             { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  practiceBtn:     { flex: 2, backgroundColor: colors.gold, elevation: 4, shadowColor: colors.gold, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  demoBtn:         { flex: 1, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.gold + '33' },
  btnText:         { color: colors.background, fontSize: rf(14), fontWeight: '800' },
  demoBtnText:     { color: colors.gold, fontSize: rf(13), fontWeight: '700' },
});

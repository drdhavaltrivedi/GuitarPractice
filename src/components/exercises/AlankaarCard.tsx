import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Alankar } from '../../data/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

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

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    Animated.timing(heightAnim, {
      toValue: next ? 200 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.8}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{alankar.number}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.type}>{alankar.type}</Text>
          <Text style={styles.preview} numberOfLines={1}>
            {alankar.ascending.slice(0, 3).join(' · ')}…
          </Text>
        </View>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.textMuted} 
        />
      </TouchableOpacity>

      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <View style={styles.body}>
          <View style={styles.row}>
            <Ionicons name="trending-up" size={14} color={colors.gold} style={{ marginRight: 6 }} />
            <Text style={styles.label}>ASCENDING</Text>
          </View>
          <View style={styles.groups}>
            {alankar.ascending.map((g, i) => (
              <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.row, { marginTop: spacing.sm }]}>
            <Ionicons name="trending-down" size={14} color={colors.up} style={{ marginRight: 6 }} />
            <Text style={styles.label}>DESCENDING</Text>
          </View>
          <View style={styles.groups}>
            {alankar.descending.map((g, i) => (
              <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            {alankar.videoUrl && (
              <TouchableOpacity 
                style={[styles.btn, styles.demoBtn]} 
                onPress={() => WebBrowser.openBrowserAsync(alankar.videoUrl!)} 
                activeOpacity={0.8}
              >
                <Ionicons name="play-circle-outline" size={18} color={colors.gold} style={{ marginRight: 4 }} />
                <Text style={styles.demoBtnText}>Watch Demo</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.btn, styles.practiceBtn]} onPress={onPractice} activeOpacity={0.8}>
              <Ionicons name="barbell" size={16} color={colors.background} style={{ marginRight: 6 }} />
              <Text style={styles.btnText}>Practice  ({alankar.startBpm}→{alankar.targetBpm})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:            { backgroundColor: colors.surfaceCard, borderRadius: 16, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  header:          { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  badge:           { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  badgeText:       { color: colors.goldDim, fontSize: typography.sm, fontFamily: typography.heading },
  info:            { flex: 1 },
  type:            { color: colors.textPrimary, fontSize: typography.md, fontFamily: typography.heading },
  preview:         { color: colors.textMuted, fontSize: typography.xs, fontFamily: typography.mono },
  body:            { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  row:             { flexDirection: 'row', alignItems: 'center' },
  label:           { color: colors.textMuted, fontSize: 10, letterSpacing: 1, fontWeight: 'bold' },
  groups:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  group:           { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  groupAccent:     { backgroundColor: colors.goldDim + '33', borderColor: colors.goldDim + '55' },
  groupText:       { color: colors.textSecondary, fontSize: 11, fontFamily: typography.mono },
  groupTextAccent: { color: colors.gold, fontWeight: 'bold' },
  actions:         { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  btn:             { flex: 1, borderRadius: 10, paddingVertical: spacing.md, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  practiceBtn:     { backgroundColor: colors.gold, elevation: 2 },
  demoBtn:         { backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.goldDim },
  btnText:         { color: colors.background, fontSize: typography.sm, fontFamily: typography.heading },
  demoBtnText:     { color: colors.gold, fontSize: typography.xs, fontFamily: typography.heading },
});


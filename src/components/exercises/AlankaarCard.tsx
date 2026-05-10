import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
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
      toValue: next ? 160 : 0,
      duration: 200,
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
        <Text style={styles.chevron}>{expanded ? '∧' : '∨'}</Text>
      </TouchableOpacity>

      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <View style={styles.body}>
          <Text style={styles.label}>↑ Ascending</Text>
          <View style={styles.groups}>
            {alankar.ascending.map((g, i) => (
              <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.label}>↓ Descending</Text>
          <View style={styles.groups}>
            {alankar.descending.map((g, i) => (
              <View key={i} style={[styles.group, highlightC(g) && styles.groupAccent]}>
                <Text style={[styles.groupText, highlightC(g) && styles.groupTextAccent]}>{g}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.btn} onPress={onPractice} activeOpacity={0.8}>
            <Text style={styles.btnText}>▶ Practice  ({alankar.startBpm}→{alankar.targetBpm} BPM)</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:            { backgroundColor: colors.surface, borderRadius: 12, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  header:          { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  badge:           { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: colors.goldDim, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  badgeText:       { color: colors.goldDim, fontSize: typography.sm, fontFamily: typography.heading },
  info:            { flex: 1 },
  type:            { color: colors.textPrimary, fontSize: typography.md },
  preview:         { color: colors.textSecondary, fontSize: typography.sm, fontFamily: typography.mono },
  chevron:         { color: colors.textSecondary, fontSize: typography.lg },
  body:            { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  label:           { color: colors.textSecondary, fontSize: typography.sm, letterSpacing: 1 },
  groups:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  group:           { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 6, backgroundColor: colors.surfaceHigh },
  groupAccent:     { backgroundColor: colors.goldDim + '55' },
  groupText:       { color: colors.textSecondary, fontSize: typography.sm, fontFamily: typography.mono },
  groupTextAccent: { color: colors.gold },
  btn:             { backgroundColor: colors.goldDim, borderRadius: 8, paddingVertical: spacing.sm, alignItems: 'center', marginTop: spacing.xs },
  btnText:         { color: colors.textPrimary, fontSize: typography.sm, fontFamily: typography.heading },
});

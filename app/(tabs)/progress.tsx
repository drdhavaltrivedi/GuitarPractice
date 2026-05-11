import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useProgressStore } from '../../src/store/progressStore';
import { RH_EXERCISES } from '../../src/data/exercises';
import { ALANKARS } from '../../src/data/alankars';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';

export default function ProgressScreen() {
  const { log, streak, bpmRecords, loaded, loadFromStorage } = useProgressStore();

  useEffect(() => { if (!loaded) loadFromStorage(); }, []);

  const today = new Date().toISOString().split('T')[0];
  const practiceDays = [...new Set(log.map(e => e.date))];

  // Calendar: last 35 days (5 weeks)
  const calDays = Array.from({length:35}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-34+i);
    const ds = d.toISOString().split('T')[0];
    return { ds, practiced: practiceDays.includes(ds) };
  });

  // Monthly minutes per category (approx)
  const thisMonth = log.filter(e => e.date.startsWith(today.slice(0,7)));
  const totalMinutes = Math.round(thisMonth.reduce((a,e) => a + e.durationSeconds, 0) / 60);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={16} color={colors.goldDim} style={{ marginBottom: 4 }} />
            <Text style={styles.statValue}>{practiceDays.length}</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="fire" size={16} color={colors.gold} style={{ marginBottom: 4 }} />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={16} color={colors.goldDim} style={{ marginBottom: 4 }} />
            <Text style={styles.statValue}>{totalMinutes}m</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        {/* 5-week calendar heatmap */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>PRACTICE CALENDAR</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.calendar}>
            {calDays.map(({ds, practiced}) => (
              <View 
                key={ds} 
                style={[styles.calDay, practiced && styles.calDayFilled]} 
              />

            ))}
          </View>
          <View style={styles.calLegend}>
            <View style={styles.legendItem}>
              <View style={styles.calDay} />
              <Text style={styles.legendText}>Rest</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.calDayFilled} />
              <Text style={styles.legendText}>Practiced</Text>
            </View>
          </View>
        </View>

        {/* BPM Records */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>BPM RECORDS — RIGHT HAND</Text>
        </View>
        <View style={styles.card}>
          {RH_EXERCISES.map((ex, index) => {
            const record = bpmRecords[ex.id];
            const progress = record ? Math.min(1, record / ex.targetBpm) : 0;
            return (
              <View key={ex.id} style={[styles.recordRow, index === RH_EXERCISES.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordName}>{ex.label}</Text>
                  <Text style={styles.recordBpm}>{record ? `${record} / ${ex.targetBpm} BPM` : `No record yet`}</Text>
                </View>
                <View style={styles.barContainer}>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>BPM RECORDS — ALANKARS</Text>
        </View>
        <View style={styles.card}>
          {ALANKARS.map((a, index) => {
            const key = `alankar_${a.number}`;
            const record = bpmRecords[key];
            const progress = record ? Math.min(1, record / a.targetBpm) : 0;
            return (
              <View key={key} style={[styles.recordRow, index === ALANKARS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordName}>{a.type}</Text>
                  <Text style={styles.recordBpm}>{record ? `${record} / ${a.targetBpm} BPM` : `No record yet`}</Text>
                </View>
                <View style={styles.barContainer}>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex:1, backgroundColor:colors.background },
  content:       { padding: spacing.lg },
  statsRow:      { flexDirection:'row', gap:spacing.sm, marginBottom:spacing.lg },
  statCard:      { flex:1, backgroundColor:colors.surfaceCard, borderRadius:20, padding:spacing.md, alignItems:'center', borderWidth:1, borderColor:colors.border, elevation: 2 },
  statValue:     { color:colors.gold, fontSize:22, fontFamily:typography.heading, fontWeight: 'bold' },
  statLabel:     { color:colors.textMuted, fontSize:10, marginTop:2, fontWeight: 'bold' },
  sectionHeader: { marginBottom: spacing.sm, marginTop: spacing.md },
  sectionHead:   { color:colors.textMuted, fontSize:10, letterSpacing:2, fontWeight: 'bold' },
  card:          { backgroundColor: colors.surfaceCard, borderRadius: 20, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  calendar:      { flexDirection:'row', flexWrap:'wrap', gap:6, justifyContent: 'center' },
  calDay:        { width:20, height:20, borderRadius:5, backgroundColor:colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  calDayFilled:  { backgroundColor:colors.gold, borderColor:colors.goldBright },
  calLegend:     { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: spacing.md },
  legendItem:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText:    { color: colors.textMuted, fontSize: 10, fontWeight: 'bold' },
  recordRow:     { paddingVertical:14, borderBottomWidth:1, borderBottomColor:colors.border },
  recordInfo:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  recordName:    { color:colors.textPrimary, fontSize:13, fontWeight: 'bold' },
  recordBpm:     { color:colors.textMuted, fontSize:10, fontWeight: 'bold' },
  barContainer:  { width: '100%' },
  barBackground: { height: 6, backgroundColor: colors.surfaceHigh, borderRadius: 3, overflow: 'hidden' },
  barFill:       { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },
});


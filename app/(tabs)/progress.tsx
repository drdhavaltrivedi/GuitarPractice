import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useProgressStore } from '../../src/store/progressStore';
import { RH_EXERCISES } from '../../src/data/exercises';
import { ALANKARS } from '../../src/data/alankars';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';

const CATEGORIES = ['Scales','Right Hand','Left Hand','Alankars'];

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
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{practiceDays.length}</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalMinutes}m</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        {/* 5-week calendar heatmap */}
        <Text style={styles.sectionHead}>Practice Calendar</Text>
        <View style={styles.calendar}>
          {calDays.map(({ds, practiced}) => (
            <View key={ds} style={[styles.calDay, practiced && styles.calDayFilled]} />
          ))}
        </View>

        {/* BPM Records */}
        <Text style={styles.sectionHead}>BPM Records — Right Hand</Text>
        {RH_EXERCISES.map(ex => {
          const record = bpmRecords[ex.id];
          return (
            <View key={ex.id} style={styles.recordRow}>
              <Text style={styles.recordName}>{ex.label}</Text>
              <View style={styles.recordRight}>
                <View style={[styles.bar, { width: record ? Math.min(180, (record / ex.targetBpm) * 180) : 0 }]} />
                <Text style={styles.recordBpm}>{record ? `${record} / ${ex.targetBpm}` : `— / ${ex.targetBpm}`}</Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.sectionHead}>BPM Records — Alankars</Text>
        {ALANKARS.map(a => {
          const key = `alankar_${a.number}`;
          const record = bpmRecords[key];
          return (
            <View key={key} style={styles.recordRow}>
              <Text style={styles.recordName}>{a.type}</Text>
              <View style={styles.recordRight}>
                <View style={[styles.bar, { width: record ? Math.min(180, (record / a.targetBpm) * 180) : 0 }]} />
                <Text style={styles.recordBpm}>{record ? `${record} / ${a.targetBpm}` : `— / ${a.targetBpm}`}</Text>
              </View>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex:1, backgroundColor:colors.background },
  content:      { padding:16 },
  statsRow:     { flexDirection:'row', gap:8, marginBottom:16 },
  statCard:     { flex:1, backgroundColor:colors.surface, borderRadius:12, padding:12, alignItems:'center', borderWidth:1, borderColor:colors.border },
  statValue:    { color:colors.gold, fontSize:20, fontFamily:typography.heading },
  statLabel:    { color:colors.textSecondary, fontSize:11, marginTop:2 },
  sectionHead:  { color:colors.textSecondary, fontSize:11, letterSpacing:1.5, marginBottom:8, marginTop:16 },
  calendar:     { flexDirection:'row', flexWrap:'wrap', gap:4 },
  calDay:       { width:16, height:16, borderRadius:3, backgroundColor:colors.border },
  calDayFilled: { backgroundColor:colors.goldDim },
  recordRow:    { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:8, borderBottomWidth:1, borderBottomColor:colors.border },
  recordName:   { color:colors.textPrimary, fontSize:12, flex:1 },
  recordRight:  { flexDirection:'row', alignItems:'center', gap:8 },
  bar:          { height:6, backgroundColor:colors.gold, borderRadius:3 },
  recordBpm:    { color:colors.textSecondary, fontSize:11, width:70, textAlign:'right' },
});

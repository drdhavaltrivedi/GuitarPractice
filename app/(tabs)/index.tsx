import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { usePracticeStore } from '../../src/store/practiceStore';
import { useProgressStore } from '../../src/store/progressStore';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';

const CHECKLIST = [
  { id:'rh',       label:'Right Hand Exercises',    route:'/exercises' },
  { id:'lh',       label:'Left Hand / Spider',       route:'/exercises' },
  { id:'alankars', label:'Alankars (80→180 BPM)',    route:'/exercises' },
  { id:'scale',    label:'Scale of the Day',         route:'/scales' },
];

function formatTime(s: number) {
  const h = Math.floor(s/3600);
  const m = Math.floor((s%3600)/60);
  const sec = s%60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

export default function PracticeHome() {
  const { sessionActive, elapsedSeconds, completedItems, startSession, stopSession, tickSecond, toggleItem } = usePracticeStore();
  const { streak, log, loaded, loadFromStorage, addEntry } = useProgressStore();

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!loaded) loadFromStorage();
  }, []);

  useEffect(() => {
    if (sessionActive) {
      tickRef.current = setInterval(tickSecond, 1000);
    } else {
      if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [sessionActive]);

  const handleStop = async () => {
    stopSession();
    if (elapsedSeconds > 0) {
      await addEntry({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        durationSeconds: elapsedSeconds,
        completedItems,
        bpmAchieved: {},
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayLog = log.filter(e => e.date === today);

  // Last 7 days practice dots
  const week = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-6+i);
    const ds = d.toISOString().split('T')[0];
    return { ds, practiced: log.some(e => e.date === ds) };
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Practice</Text>
          <View style={styles.streak}>
            <Text style={styles.streakText}>🔥 {streak}</Text>
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerCard}>
          <Text style={styles.timer}>{formatTime(elapsedSeconds)}</Text>
          <TouchableOpacity
            style={[styles.timerBtn, sessionActive && styles.timerBtnStop]}
            onPress={sessionActive ? handleStop : startSession}
            activeOpacity={0.8}
          >
            <Text style={styles.timerBtnText}>{sessionActive ? 'Stop Session' : 'Start Session'}</Text>
          </TouchableOpacity>
        </View>

        {/* Checklist */}
        <Text style={styles.sectionHead}>Today's Checklist</Text>
        {CHECKLIST.map(item => {
          const done = completedItems.includes(item.id);
          return (
            <View key={item.id} style={styles.checkRow}>
              <TouchableOpacity style={[styles.checkbox, done && styles.checkboxDone]} onPress={() => toggleItem(item.id)}>
                {done && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={{ flex:1 }} onPress={() => router.push(item.route as any)}>
                <Text style={[styles.checkLabel, done && styles.checkLabelDone]}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Week view */}
        <Text style={styles.sectionHead}>This Week</Text>
        <View style={styles.weekRow}>
          {week.map(({ds, practiced}) => (
            <View key={ds} style={[styles.dayDot, practiced && styles.dayDotFilled]}>
              <Text style={styles.dayLabel}>{new Date(ds).toLocaleDateString('en',{weekday:'narrow'})}</Text>
            </View>
          ))}
        </View>

        {/* Quick nav */}
        <Text style={styles.sectionHead}>Quick Launch</Text>
        <View style={styles.quickRow}>
          {([['/metronome','Metronome'],['/scales','Scales'],['/exercises','Exercises'],['/progress','Progress']] as [string,string][]).map(([route,label]) => (
            <TouchableOpacity key={route} style={styles.quickBtn} onPress={() => router.push(route as any)}>
              <Text style={styles.quickText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex:1, backgroundColor:colors.background },
  content:         { padding:16 },
  header:          { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
  title:           { color:colors.textPrimary, fontSize:22, fontFamily:typography.heading },
  streak:          { backgroundColor:colors.surfaceHigh, borderRadius:16, paddingHorizontal:12, paddingVertical:4 },
  streakText:      { color:colors.gold, fontSize:14 },
  timerCard:       { backgroundColor:colors.surface, borderRadius:16, padding:20, alignItems:'center', marginBottom:20, borderWidth:1, borderColor:colors.border },
  timer:           { color:colors.gold, fontSize:48, fontFamily:typography.mono, marginBottom:12 },
  timerBtn:        { backgroundColor:colors.success, borderRadius:12, paddingHorizontal:32, paddingVertical:12 },
  timerBtnStop:    { backgroundColor:colors.error },
  timerBtnText:    { color:'#fff', fontSize:16, fontFamily:typography.heading },
  sectionHead:     { color:colors.textSecondary, fontSize:11, letterSpacing:1.5, marginBottom:8, marginTop:16 },
  checkRow:        { flexDirection:'row', alignItems:'center', gap:12, paddingVertical:10, borderBottomWidth:1, borderBottomColor:colors.border },
  checkbox:        { width:24, height:24, borderRadius:6, borderWidth:1.5, borderColor:colors.border, alignItems:'center', justifyContent:'center' },
  checkboxDone:    { backgroundColor:colors.success, borderColor:colors.success },
  checkMark:       { color:'#fff', fontSize:14 },
  checkLabel:      { color:colors.textPrimary, fontSize:14 },
  checkLabelDone:  { color:colors.textSecondary, textDecorationLine:'line-through' },
  weekRow:         { flexDirection:'row', gap:8, justifyContent:'center', marginBottom:4 },
  dayDot:          { width:36, height:36, borderRadius:18, borderWidth:1, borderColor:colors.border, alignItems:'center', justifyContent:'center' },
  dayDotFilled:    { backgroundColor:colors.goldDim, borderColor:colors.gold },
  dayLabel:        { color:colors.textSecondary, fontSize:10 },
  quickRow:        { flexDirection:'row', flexWrap:'wrap', gap:8 },
  quickBtn:        { flex:1, minWidth:'45%', backgroundColor:colors.surface, borderRadius:12, paddingVertical:14, alignItems:'center', borderWidth:1, borderColor:colors.border },
  quickText:       { color:colors.textPrimary, fontSize:14, fontFamily:typography.heading },
});

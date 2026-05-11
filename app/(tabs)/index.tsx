import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePracticeStore } from '../../src/store/practiceStore';
import { useProgressStore } from '../../src/store/progressStore';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';

const CHECKLIST = [
  { id:'rh',       label:'Right Hand Exercises',    route:'/exercises', icon: 'hand-right' },
  { id:'lh',       label:'Left Hand / Spider',       route:'/exercises', icon: 'hand-left' },
  { id:'alankars', label:'Alankars (80→180 BPM)',    route:'/exercises', icon: 'musical-notes' },
  { id:'scale',    label:'Scale of the Day',         route:'/scales',    icon: 'git-network' },
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
  
  // Last 7 days practice dots
  const week = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-6+i);
    const ds = d.toISOString().split('T')[0];
    return { ds, practiced: log.some(e => e.date === ds) };
  });

  // Calculate total weekly time
  const weeklyLog = log.filter(e => {
    const d = new Date(e.date).getTime();
    const weekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    return d >= weekAgo;
  });
  const totalWeeklySeconds = weeklyLog.reduce((sum, e) => sum + e.durationSeconds, 0);
  const weeklyGoalSeconds = 7 * 3600; // 7 hours goal
  const progressPercent = Math.min(100, Math.round((totalWeeklySeconds / weeklyGoalSeconds) * 100));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Decorative Guitar Watermark */}
        <View style={styles.watermarkContainer}>
          <MaterialCommunityIcons name="guitar-electric" size={240} color={colors.surfaceCard} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Ready to play?</Text>
            <Text style={styles.title}>Practice</Text>
          </View>
          <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={18} color={colors.gold} style={{ marginRight: 4 }} />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </View>

        {/* Weekly Stats Summary */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>WEEKLY TOTAL</Text>
              <Text style={styles.statsValue}>{formatTime(totalWeeklySeconds)} <Text style={styles.statsUnit}>/ 7H GOAL</Text></Text>
            </View>
            <Text style={styles.statsPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Hero Timer Card */}
        <View style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <View style={[styles.statusDot, sessionActive && styles.statusDotActive]} />
            <Text style={styles.timerLabel}>{sessionActive ? 'SESSION ACTIVE' : 'IDLE'}</Text>
          </View>
          <Text style={[styles.timer, sessionActive && styles.timerActive]}>{formatTime(elapsedSeconds)}</Text>
          
          <View style={styles.timerActions}>
            <TouchableOpacity
              style={[styles.playBtn, sessionActive && styles.playBtnStop]}
              onPress={sessionActive ? handleStop : startSession}
              activeOpacity={0.85}
            >
              <Ionicons name={sessionActive ? 'stop' : 'play'} size={24} color={sessionActive ? '#fff' : '#000'} />
              <Text style={[styles.playBtnText, sessionActive && { color: '#fff' }]}>
                {sessionActive ? 'STOP' : 'START'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.metronomeQuickBtn}
              onPress={() => router.push('/metronome')}
            >
              <MaterialCommunityIcons name="metronome" size={20} color={colors.gold} />
              <Text style={styles.metronomeQuickText}>Tempo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Tools Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>QUICK TOOLS</Text>
        </View>
        <View style={styles.grid}>
          {[
            { route: '/metronome', label: 'Metronome', icon: 'speedometer' },
            { route: '/scales', label: 'Scales', icon: 'musical-note' },
            { route: '/exercises', label: 'Exercises', icon: 'fitness' },
            { route: '/progress', label: 'Progress', icon: 'stats-chart' }
          ].map((item) => (
            <TouchableOpacity key={item.route} style={styles.gridCard} onPress={() => router.push(item.route as any)} activeOpacity={0.7}>
              <View style={styles.iconWrapper}>
                <Ionicons name={item.icon as any} size={24} color={colors.gold} />
              </View>
              <Text style={styles.gridText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Routine */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>DAILY ROUTINE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{completedItems.length}/{CHECKLIST.length}</Text>
          </View>
        </View>
        
        <View style={styles.checklistCard}>
          {CHECKLIST.map((item, index) => {
            const done = completedItems.includes(item.id);
            return (
              <View key={item.id} style={[styles.checkRow, index === CHECKLIST.length - 1 && { borderBottomWidth: 0 }]}>
                <TouchableOpacity 
                  style={[styles.checkbox, done && styles.checkboxDone]} 
                  onPress={() => toggleItem(item.id)}
                >
                  {done && <Ionicons name="checkmark" size={14} color="#000" />}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'row', alignItems: 'center' }} onPress={() => router.push(item.route as any)}>
                  <Text style={[styles.checkLabel, done && styles.checkLabelDone]}>{item.label}</Text>
                </TouchableOpacity>
                <Ionicons name="chevron-forward" size={16} color={colors.border} />
              </View>
            );
          })}
        </View>

        {/* Activity */}
        <View style={[styles.sectionHeader, { marginTop: spacing.md }]}>
          <Text style={styles.sectionHead}>ACTIVITY</Text>
        </View>
        <View style={styles.weekCard}>
          <View style={styles.weekRow}>
            {week.map(({ds, practiced}) => (
              <View key={ds} style={styles.dayContainer}>
                <View style={[styles.dayDot, practiced && styles.dayDotFilled]}>
                  {practiced && <View style={styles.innerDot} />}
                </View>
                <Text style={[styles.dayLabel, practiced && { color: colors.textPrimary }]}>
                  {new Date(ds).toLocaleDateString('en',{weekday:'narrow'})}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex:1, backgroundColor:colors.background },
  content:         { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, paddingTop: spacing.md },
  
  watermarkContainer:{ position: 'absolute', top: -30, right: -60, opacity: 0.3, transform: [{ rotate: '15deg' }], zIndex: -1 },

  header:          { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', marginBottom:spacing.xl },
  greeting:        { color:colors.textMuted, fontSize:14, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, fontWeight: '600' },
  title:           { color:colors.textPrimary, fontSize:32, fontWeight:'800', letterSpacing: -0.5 },
  streakBadge:     { backgroundColor:colors.surfaceCard, borderRadius:20, paddingHorizontal:12, paddingVertical:6, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  streakText:      { color:colors.gold, fontSize:14, fontWeight: 'bold' },
  
  statsCard:       { marginBottom: spacing.xl },
  statsRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  statsLabel:      { color:colors.textSecondary, fontSize:10, letterSpacing:1.5, fontWeight: '700', marginBottom: 4 },
  statsValue:      { color:colors.textPrimary, fontSize:18, fontWeight: '800' },
  statsUnit:       { color:colors.textMuted, fontSize:12, fontWeight: '600' },
  statsPercent:    { color:colors.gold, fontSize:14, fontWeight: '800' },
  progressBarBg:   { height: 6, backgroundColor: colors.surfaceCard, borderRadius: 3, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  progressBarFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },

  timerCard:       { backgroundColor:colors.surfaceCard, borderRadius:24, padding:spacing.xl, alignItems:'center', marginBottom:spacing.xl, borderWidth:1, borderColor:colors.border },
  timerHeader:     { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  statusDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textDisabled, marginRight: 8 },
  statusDotActive: { backgroundColor: colors.success, shadowColor: colors.success, shadowOpacity: 0.8, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  timerLabel:      { color:colors.textMuted, fontSize:11, letterSpacing: 2, fontWeight: '700' },
  timer:           { color:colors.textPrimary, fontSize:64, fontFamily:typography.mono, fontWeight: '300', marginBottom:spacing.lg, tabularNums: true },
  timerActive:     { color:colors.gold },
  
  timerActions:    { flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: spacing.sm },
  playBtn:         { flex: 1, backgroundColor:colors.gold, borderRadius:30, paddingVertical:14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: colors.gold, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4, marginRight: spacing.md },
  playBtnStop:     { backgroundColor:colors.surfaceHigh, borderColor: colors.error, borderWidth: 1, shadowColor: colors.error, shadowOpacity: 0.2 },
  playBtnText:     { color:'#000', fontSize:14, fontWeight: '800', letterSpacing: 1, marginLeft: 8 },
  metronomeQuickBtn:{ backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  metronomeQuickText:{ color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginLeft: 6 },
  
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md, marginTop: spacing.lg },
  sectionHead:     { color:colors.textSecondary, fontSize:12, letterSpacing:1.5, fontWeight: '700' },
  badge:           { backgroundColor: colors.surfaceHigh, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText:       { color:colors.gold, fontSize:11, fontWeight: '800' },
  
  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridCard:        { width: '47%', backgroundColor: colors.surfaceCard, borderRadius: 20, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  iconWrapper:     { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  gridText:        { color:colors.textPrimary, fontSize:14, fontWeight: '600' },

  checklistCard:   { backgroundColor: colors.surfaceCard, borderRadius: 20, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  checkRow:        { flexDirection:'row', alignItems:'center', paddingVertical:16, borderBottomWidth:1, borderBottomColor:colors.borderLight },
  checkbox:        { width:24, height:24, borderRadius:8, borderWidth:2, borderColor:colors.textDisabled, alignItems:'center', justifyContent:'center', marginRight:spacing.md },
  checkboxDone:    { backgroundColor:colors.success, borderColor:colors.success },
  checkLabel:      { color:colors.textPrimary, fontSize:15, fontWeight: '500' },
  checkLabelDone:  { color:colors.textMuted, textDecorationLine:'line-through' },
  
  weekCard:        { backgroundColor: colors.surfaceCard, borderRadius: 20, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  weekRow:         { flexDirection:'row', justifyContent:'space-between' },
  dayContainer:    { alignItems: 'center', gap: 8 },
  dayDot:          { width:32, height:32, borderRadius:16, borderWidth:2, borderColor:colors.borderLight, alignItems:'center', justifyContent:'center', backgroundColor: colors.surface },
  dayDotFilled:    { borderColor:colors.gold, backgroundColor: colors.goldDim + '22' },
  innerDot:        { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.gold },
  dayLabel:        { color:colors.textMuted, fontSize:11, fontWeight: '600' },
});


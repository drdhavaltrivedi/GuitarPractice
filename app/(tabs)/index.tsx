import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePracticeStore } from '../../src/store/practiceStore';
import { useProgressStore } from '../../src/store/progressStore';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { SCROLL_BOTTOM_PAD, rs, rf } from '../../src/theme/responsive';

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
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!loaded) loadFromStorage();
  }, []);

  useEffect(() => {
    if (sessionActive) {
      tickRef.current = setInterval(tickSecond, 1000);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
      pulseAnim.setValue(1);
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
  
  const week = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-6+i);
    const ds = d.toISOString().split('T')[0];
    const isToday = ds === today;
    return { ds, practiced: log.some(e => e.date === ds), isToday, day: d.toLocaleDateString('en',{weekday:'short'}) };
  });

  const weeklyLog = log.filter(e => {
    const d = new Date(e.date).getTime();
    const weekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    return d >= weekAgo;
  });
  const totalWeeklySeconds = weeklyLog.reduce((sum, e) => sum + e.durationSeconds, 0);
  const weeklyGoalSeconds = 7 * 3600; 
  const progressPercent = Math.min(100, Math.round((totalWeeklySeconds / weeklyGoalSeconds) * 100));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Decorative Guitar Watermark */}
        <View style={styles.watermarkContainer}>
          <MaterialCommunityIcons name="guitar-pick" size={300} color={colors.surfaceHigh} style={{ opacity: 0.15 }} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>GOOD MORNING, ROCKSTAR</Text>
            <Text style={styles.title}>Practice</Text>
          </View>
          <TouchableOpacity style={styles.streakBadge} activeOpacity={0.8} onPress={() => router.push('/progress')}>
            <MaterialCommunityIcons name="fire" size={rs(20)} color={colors.gold} />
            <Text style={styles.streakText}>{streak}</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Timer Card */}
        <View style={[styles.timerCard, sessionActive && styles.timerCardActive]}>
          <View style={styles.timerHeader}>
             <View style={[styles.statusBadge, sessionActive && styles.statusBadgeActive]}>
               <View style={[styles.statusDot, sessionActive && styles.statusDotActive]} />
               <Text style={[styles.statusText, sessionActive && styles.statusTextActive]}>
                 {sessionActive ? 'SESSION IN PROGRESS' : 'READY TO PLAY'}
               </Text>
             </View>
          </View>

          <View style={styles.timerWrapper}>
            <Text style={[styles.timer, sessionActive && styles.timerActive]}>{formatTime(elapsedSeconds)}</Text>
          </View>
          
          <View style={styles.timerActions}>
            <TouchableOpacity
              style={[styles.playBtn, sessionActive && styles.playBtnStop]}
              onPress={sessionActive ? handleStop : startSession}
              activeOpacity={0.85}
            >
              <Animated.View style={sessionActive ? { transform: [{ scale: pulseAnim }] } : {}}>
                <Ionicons name={sessionActive ? 'stop' : 'play'} size={rs(28)} color={sessionActive ? '#fff' : '#000'} />
              </Animated.View>
              <Text style={[styles.playBtnText, sessionActive && { color: '#fff' }]}>
                {sessionActive ? 'FINISH SESSION' : 'START SESSION'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.metronomeQuickBtn}
              onPress={() => router.push('/metronome')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="metronome" size={rs(22)} color={colors.gold} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Stats Summary */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionHead}>WEEKLY GOAL</Text>
           <Text style={styles.sectionValue}>{progressPercent}%</Text>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsValue}>{formatTime(totalWeeklySeconds)} <Text style={styles.statsUnit}>of 7H goal</Text></Text>
            <View style={styles.activityDots}>
              {week.map((d, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.miniDot, 
                    d.practiced && styles.miniDotActive,
                    d.isToday && styles.miniDotToday
                  ]} 
                />
              ))}
            </View>
          </View>
        </View>

        {/* Quick Tools Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>QUICK TOOLS</Text>
        </View>
        <View style={styles.grid}>
          {[
            { route: '/metronome', label: 'Metronome', icon: 'speedometer', color: '#FFD700' },
            { route: '/scales', label: 'Scales', icon: 'git-network', color: '#FFA500' },
            { route: '/exercises', label: 'Exercises', icon: 'barbell', color: '#FF8C00' },
            { route: '/progress', label: 'Progress', icon: 'stats-chart', color: '#FFBF00' }
          ].map((item) => (
            <TouchableOpacity key={item.route} style={styles.gridCard} onPress={() => router.push(item.route as any)} activeOpacity={0.8}>
              <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={rs(24)} color={item.color} />
              </View>
              <Text style={styles.gridText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={rs(14)} color={colors.textDisabled} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Routine */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>DAILY CHECKLIST</Text>
          <View style={styles.routineBadge}>
            <Text style={styles.routineBadgeText}>{completedItems.length}/{CHECKLIST.length}</Text>
          </View>
        </View>
        
        <View style={styles.checklistCard}>
          {CHECKLIST.map((item, index) => {
            const done = completedItems.includes(item.id);
            return (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.checkRow, index === CHECKLIST.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={() => toggleItem(item.id)}
              >
                <View style={[styles.checkbox, done && styles.checkboxDone]}>
                  {done && <Ionicons name="checkmark-bold" size={rs(14)} color="#000" />}
                </View>
                <View style={styles.checkInfo}>
                  <Text style={[styles.checkLabel, done && styles.checkLabelDone]}>{item.label}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(item.route as any)}>
                   <Ionicons name="arrow-forward-circle-outline" size={rs(22)} color={colors.goldDim} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer info */}
        <View style={styles.footer}>
           <Text style={styles.footerText}>Stay consistent. Build mastery.</Text>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: colors.background },
  content:         { paddingHorizontal: spacing.lg, paddingBottom: SCROLL_BOTTOM_PAD, paddingTop: spacing.md },
  
  watermarkContainer:{ position: 'absolute', top: -50, right: -100, zIndex: -1 },

  header:          { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:spacing.xl, marginTop: spacing.sm },
  greeting:        { color:colors.textMuted, fontSize: rf(11), textTransform: 'uppercase', letterSpacing: 2, fontWeight: '700', marginBottom: 2 },
  title:           { color:colors.textPrimary, fontSize: rf(36), fontWeight:'900', letterSpacing: -1 },
  streakBadge:     { backgroundColor:colors.surfaceCard, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, gap: 6, elevation: 4, shadowColor: colors.gold, shadowOpacity: 0.1, shadowRadius: 10 },
  streakText:      { color:colors.gold, fontSize: rf(18), fontWeight: '800' },
  
  timerCard:       { backgroundColor:colors.surfaceCard, borderRadius: 32, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border, elevation: 2 },
  timerCardActive: { borderColor: colors.gold + '44', backgroundColor: colors.surfaceHigh },
  timerHeader:     { marginBottom: spacing.lg },
  statusBadge:     { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceHigh, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 30, borderWidth: 1, borderColor: colors.border },
  statusBadgeActive:{ borderColor: colors.gold + '33', backgroundColor: colors.goldDim + '11' },
  statusDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textDisabled, marginRight: 8 },
  statusDotActive: { backgroundColor: colors.success, shadowColor: colors.success, shadowOpacity: 1, shadowRadius: 6 },
  statusText:      { color:colors.textDisabled, fontSize: rf(10), letterSpacing: 1.5, fontWeight: '800' },
  statusTextActive:{ color: colors.gold },
  timerWrapper:    { marginBottom: spacing.lg },
  timer:           { color:colors.textPrimary, fontSize: rf(64), fontFamily: typography.mono, fontWeight: '300', tabularNums: true },
  timerActive:     { color:colors.gold, textShadowColor: colors.gold, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 15 },
  
  timerActions:    { flexDirection: 'row', alignItems: 'center', width: '100%', gap: spacing.md },
  playBtn:         { flex: 1, backgroundColor:colors.gold, borderRadius: 24, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: colors.gold, shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  playBtnStop:     { backgroundColor:colors.surfaceHigh, borderColor: colors.error, borderWidth: 1.5, shadowColor: colors.error, shadowOpacity: 0.3 },
  playBtnText:     { color:'#000', fontSize: rf(15), fontWeight: '900', letterSpacing: 0.5, marginLeft: 10 },
  metronomeQuickBtn:{ width: rs(56), height: rs(56), backgroundColor: colors.surface, borderRadius: rs(28), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: spacing.sm },
  sectionHead:     { color:colors.textMuted, fontSize: rf(11), letterSpacing: 1.5, fontWeight: '800' },
  sectionValue:    { color: colors.gold, fontSize: rf(14), fontWeight: '800' },
  
  statsCard:       { backgroundColor: colors.surfaceCard, borderRadius: 24, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  statsRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  statsValue:      { color:colors.textPrimary, fontSize: rf(15), fontWeight: '800' },
  statsUnit:       { color:colors.textDisabled, fontSize: rf(12), fontWeight: '600' },
  progressBarBg:   { height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 4 },
  activityDots:    { flexDirection: 'row', gap: 6 },
  miniDot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  miniDotActive:   { backgroundColor: colors.gold, borderColor: colors.goldBright },
  miniDotToday:    { borderColor: colors.gold, borderWidth: 2 },

  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.lg },
  gridCard:        { width: '47.5%', backgroundColor: colors.surfaceCard, borderRadius: 24, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrapper:     { width: rs(44), height: rs(44), borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  gridText:        { color:colors.textPrimary, fontSize: rf(14), fontWeight: '700', flex: 1 },

  routineBadge:    { backgroundColor: colors.goldDim + '22', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: colors.gold + '44' },
  routineBadgeText:{ color:colors.gold, fontSize: rf(12), fontWeight: '800' },
  checklistCard:   { backgroundColor: colors.surfaceCard, borderRadius: 24, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
  checkRow:        { flexDirection:'row', alignItems:'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  checkbox:        { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  checkboxDone:    { backgroundColor:colors.gold, borderColor:colors.gold },
  checkInfo:       { flex: 1 },
  checkLabel:      { color:colors.textPrimary, fontSize: rf(15), fontWeight: '700' },
  checkLabelDone:  { color:colors.textDisabled, textDecorationLine:'line-through' },
  
  footer:          { paddingVertical: spacing.xl, alignItems: 'center' },
  footerText:      { color: colors.textDisabled, fontSize: rf(12), fontWeight: '600', fontStyle: 'italic' },
});

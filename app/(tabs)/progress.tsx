import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useProgressStore } from '../../src/store/progressStore';
import { RH_EXERCISES } from '../../src/data/exercises';
import { ALANKARS } from '../../src/data/alankars';
import { InfoButton } from '../../src/components/ui/InfoButton';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { SCROLL_BOTTOM_PAD } from '../../src/theme/responsive';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatMinutes(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function getLevelLabel(pct: number) {
  if (pct === 0) return { label: 'Not Started', color: colors.textDisabled };
  if (pct < 0.3) return { label: 'Beginner', color: '#FF6B6B' };
  if (pct < 0.6) return { label: 'Developing', color: colors.warning };
  if (pct < 0.9) return { label: 'Advanced', color: colors.gold };
  return { label: 'Mastered', color: colors.success };
}

export default function ProgressScreen() {
  const { log, streak, bpmRecords, loaded, loadFromStorage } = useProgressStore();

  useEffect(() => { if (!loaded) loadFromStorage(); }, []);

  const today = new Date().toISOString().split('T')[0];
  const practiceDays = [...new Set(log.map(e => e.date))];

  // Last 35 days for calendar
  const calDays = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 34 + i);
    const ds = d.toISOString().split('T')[0];
    const isToday = ds === today;
    return { ds, practiced: practiceDays.includes(ds), isToday, dayOfWeek: d.getDay() };
  });

  const thisMonth = log.filter(e => e.date.startsWith(today.slice(0, 7)));
  const totalSeconds = thisMonth.reduce((a, e) => a + e.durationSeconds, 0);

  // Last 7 days total
  const last7 = log.filter(e => {
    const d = new Date(e.date).getTime();
    return d >= new Date().getTime() - 7 * 86400000;
  });
  const last7Seconds = last7.reduce((a, e) => a + e.durationSeconds, 0);
  const weeklyGoal = 7 * 3600;
  const weeklyPct = Math.min(100, Math.round((last7Seconds / weeklyGoal) * 100));

  // Overall mastery
  const rhRecords = RH_EXERCISES.map(ex => bpmRecords[ex.id] ? Math.min(1, bpmRecords[ex.id] / ex.targetBpm) : 0);
  const alRecords = ALANKARS.map(a => {
    const r = bpmRecords[`alankar_${a.number}`];
    return r ? Math.min(1, r / a.targetBpm) : 0;
  });
  const allProgress = [...rhRecords, ...alRecords];
  const overallMastery = allProgress.length > 0
    ? Math.round((allProgress.reduce((a, v) => a + v, 0) / allProgress.length) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>YOUR JOURNEY</Text>
            <Text style={styles.headerTitle}>Progress</Text>
          </View>
          <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={20} color={streak > 0 ? colors.gold : colors.textDisabled} />
            <Text style={[styles.streakNum, { color: streak > 0 ? colors.gold : colors.textDisabled }]}>{streak}</Text>
            <Text style={styles.streakLabel}>day{streak !== 1 ? 's' : ''}</Text>
          </View>
        </View>

        {/* Hero Stats Row */}
        <View style={styles.heroRow}>
          <View style={[styles.heroCard, styles.heroCardPrimary]}>
            <MaterialCommunityIcons name="trophy-outline" size={22} color={colors.gold} />
            <Text style={styles.heroValue}>{overallMastery}%</Text>
            <Text style={styles.heroLabel}>Overall Mastery</Text>
          </View>
          <View style={styles.heroCol}>
            <View style={styles.miniCard}>
              <Ionicons name="calendar-outline" size={16} color={colors.goldDim} />
              <Text style={styles.miniValue}>{practiceDays.length}</Text>
              <Text style={styles.miniLabel}>Total Days</Text>
            </View>
            <View style={styles.miniCard}>
              <Ionicons name="time-outline" size={16} color={colors.goldDim} />
              <Text style={styles.miniValue}>{formatMinutes(totalSeconds)}</Text>
              <Text style={styles.miniLabel}>This Month</Text>
            </View>
          </View>
        </View>

        {/* Weekly Goal */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>WEEKLY GOAL</Text>
            <Text style={styles.cardBadge}>{weeklyPct}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${weeklyPct}%` }]} />
          </View>
          <View style={styles.weekGoalFooter}>
            <Text style={styles.weekGoalText}>{formatMinutes(last7Seconds)} practiced</Text>
            <Text style={styles.weekGoalText}>Goal: 7h 00m</Text>
          </View>
        </View>

        {/* Practice Calendar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>PRACTICE CALENDAR</Text>
          <Text style={styles.sectionSub}>Last 5 weeks</Text>
        </View>
        <View style={styles.card}>
          {/* Day labels */}
          <View style={styles.dayLabelsRow}>
            {DAY_LABELS.map((d, i) => (
              <Text key={i} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          <View style={styles.calendar}>
            {calDays.map(({ ds, practiced, isToday }) => (
              <View
                key={ds}
                style={[
                  styles.calDay,
                  practiced && styles.calDayFilled,
                  isToday && styles.calDayToday,
                ]}
              >
                {isToday && <View style={styles.todayDot} />}
              </View>
            ))}
          </View>
          <View style={styles.calLegend}>
            <View style={styles.legendItem}>
              <View style={styles.calDay} />
              <Text style={styles.legendText}>Rest</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.calDay, styles.calDayFilled]} />
              <Text style={styles.legendText}>Practiced</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.calDay, styles.calDayToday]} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </View>

        {/* RH BPM Records */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>RIGHT HAND EXERCISES</Text>
          <Text style={styles.sectionSub}>BPM Progress</Text>
        </View>
        <View style={styles.card}>
          {RH_EXERCISES.map((ex, index) => {
            const record = bpmRecords[ex.id];
            const pct = record ? Math.min(1, record / ex.targetBpm) : 0;
            const level = getLevelLabel(pct);
            return (
              <View key={ex.id} style={[styles.recordRow, index === RH_EXERCISES.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.recordTop}>
                  <Text style={styles.recordName}>{ex.label}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={[styles.levelPill, { borderColor: level.color }]}>
                      <Text style={[styles.levelText, { color: level.color }]}>{level.label}</Text>
                    </View>
                    {ex.description && (
                      <InfoButton title={`Ex ${ex.number}: ${ex.label}`} description={ex.description} />
                    )}
                  </View>
                </View>
                <View style={styles.recordMeta}>
                  <Text style={styles.recordBpm}>
                    {record ? `${record} BPM` : 'No record yet'}
                    <Text style={styles.recordTarget}> / {ex.targetBpm} target</Text>
                  </Text>
                  <Text style={styles.recordPct}>{Math.round(pct * 100)}%</Text>
                </View>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${pct * 100}%`, backgroundColor: level.color }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Alankars Records */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHead}>ALANKARS</Text>
          <Text style={styles.sectionSub}>BPM Progress</Text>
        </View>
        <View style={styles.card}>
          {ALANKARS.map((a, index) => {
            const key = `alankar_${a.number}`;
            const record = bpmRecords[key];
            const pct = record ? Math.min(1, record / a.targetBpm) : 0;
            const level = getLevelLabel(pct);
            return (
              <View key={key} style={[styles.recordRow, index === ALANKARS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.recordTop}>
                  <Text style={styles.recordName}>Alankar {a.number} – {a.type}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={[styles.levelPill, { borderColor: level.color }]}>
                      <Text style={[styles.levelText, { color: level.color }]}>{level.label}</Text>
                    </View>
                    {a.description && (
                      <InfoButton title={`Alankar ${a.number}: ${a.type}`} description={a.description} />
                    )}
                  </View>
                </View>
                <View style={styles.recordMeta}>
                  <Text style={styles.recordBpm}>
                    {record ? `${record} BPM` : 'No record yet'}
                    <Text style={styles.recordTarget}> / {a.targetBpm} target</Text>
                  </Text>
                  <Text style={styles.recordPct}>{Math.round(pct * 100)}%</Text>
                </View>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${pct * 100}%`, backgroundColor: level.color }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Motivational tip */}
        <View style={styles.tipCard}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={18} color={colors.gold} style={{ marginRight: 10 }} />
          <Text style={styles.tipText}>
            Practice consistently — even 20 minutes daily builds lasting muscle memory.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialCommunityIcons name="guitar-electric" size={18} color={colors.textDisabled} />
          <Text style={styles.footerText}>Developed by </Text>
          <Text style={styles.footerName}>Dr. Dhaval Trivedi</Text>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: colors.background },
  content:         { paddingHorizontal: spacing.lg, paddingBottom: SCROLL_BOTTOM_PAD },

  // Header
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: spacing.lg, marginBottom: spacing.lg },
  headerSub:       { color: colors.textMuted, fontSize: 11, letterSpacing: 2, fontWeight: '700' },
  headerTitle:     { color: colors.textPrimary, fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  streakBadge:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.surfaceCard, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: colors.border },
  streakNum:       { fontSize: 18, fontWeight: '800' },
  streakLabel:     { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  // Hero Cards
  heroRow:         { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  heroCard:        { flex: 1, borderRadius: 24, padding: spacing.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceCard },
  heroCardPrimary: { borderColor: colors.gold + '44', backgroundColor: colors.surfaceHigh },
  heroValue:       { color: colors.gold, fontSize: 36, fontWeight: '800', marginTop: 6 },
  heroLabel:       { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  heroCol:         { flex: 1, gap: spacing.md },
  miniCard:        { flex: 1, backgroundColor: colors.surfaceCard, borderRadius: 20, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, gap: 2 },
  miniValue:       { color: colors.textPrimary, fontSize: 18, fontWeight: '800' },
  miniLabel:       { color: colors.textMuted, fontSize: 10, fontWeight: '700' },

  // Section headers
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm, marginTop: spacing.md },
  sectionHead:     { color: colors.textSecondary, fontSize: 11, letterSpacing: 1.5, fontWeight: '800' },
  sectionSub:      { color: colors.textDisabled, fontSize: 10, fontWeight: '600' },

  // Generic card
  card:            { backgroundColor: colors.surfaceCard, borderRadius: 20, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  cardHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle:       { color: colors.textSecondary, fontSize: 11, letterSpacing: 1.5, fontWeight: '800' },
  cardBadge:       { color: colors.gold, fontSize: 16, fontWeight: '800' },

  // Weekly progress bar
  progressBarBg:   { height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4, overflow: 'hidden', marginBottom: spacing.sm },
  progressBarFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 4 },
  weekGoalFooter:  { flexDirection: 'row', justifyContent: 'space-between' },
  weekGoalText:    { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  // Calendar
  dayLabelsRow:    { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 6 },
  dayLabel:        { width: 20, textAlign: 'center', color: colors.textDisabled, fontSize: 9, fontWeight: '700' },
  calendar:        { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: spacing.md },
  calDay:          { width: 20, height: 20, borderRadius: 5, backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  calDayFilled:    { backgroundColor: colors.gold, borderColor: colors.goldBright },
  calDayToday:     { borderColor: colors.gold, backgroundColor: colors.surfaceHigh },
  todayDot:        { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  calLegend:       { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  legendItem:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText:      { color: colors.textMuted, fontSize: 10, fontWeight: '600' },

  // Record rows
  recordRow:       { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  recordTop:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  recordName:      { color: colors.textPrimary, fontSize: 13, fontWeight: '700', flex: 1, marginRight: spacing.sm },
  levelPill:       { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, borderWidth: 1 },
  levelText:       { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  recordMeta:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  recordBpm:       { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
  recordTarget:    { color: colors.textDisabled },
  recordPct:       { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  barBackground:   { height: 6, backgroundColor: colors.surfaceHigh, borderRadius: 3, overflow: 'hidden' },
  barFill:         { height: '100%', borderRadius: 3 },

  // Tip card
  tipCard:         { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surfaceCard, borderRadius: 16, padding: spacing.md, borderWidth: 1, borderColor: colors.gold + '30', marginBottom: spacing.lg, marginTop: spacing.sm },
  tipText:         { color: colors.textMuted, fontSize: 13, flex: 1, lineHeight: 20 },

  // Footer
  footer:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, marginTop: spacing.sm },
  footerText:      { color: colors.textDisabled, fontSize: 12 },
  footerName:      { color: colors.gold, fontSize: 12, fontWeight: '700' },
});

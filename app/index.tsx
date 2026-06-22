import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.guitarapp.practice';
const APP_STORE_URL = 'https://apps.apple.com/us/app/guitar-practice-companion/id6778313335';

const STATS = [
  { value: '8', label: 'Picking Drills', icon: 'flash' as const },
  { value: '6', label: 'Major Scales', icon: 'musical-notes' as const },
  { value: '∞', label: 'BPM Range', icon: 'speedometer' as const },
  { value: '100%', label: 'Private', icon: 'lock-closed' as const },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose Your Drill',
    desc: 'Pick from 8 targeted picking & dexterity exercises or jump into scale visualizer.',
    icon: 'list-outline' as const,
  },
  {
    step: '02',
    title: 'Set Your Tempo',
    desc: 'Configure start BPM, target BPM and auto-ramp interval. The metronome pushes you forward.',
    icon: 'speedometer-outline' as const,
  },
  {
    step: '03',
    title: 'Track Progress',
    desc: 'Log daily speeds and mastery notes. Watch your numbers climb over weeks and months.',
    icon: 'stats-chart-outline' as const,
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      router.replace('/(tabs)/dashboard');
    }
  }, []);

  const handleLaunchApp = () => {
    router.push('/(tabs)/dashboard');
  };

  const isDesktop = windowWidth > 768;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Navbar */}
      <View style={[styles.navbar, isDesktop && styles.desktopWidth]}>
        <View style={styles.logoContainer}>
          <Ionicons name="musical-notes" size={28} color={colors.gold} />
          <Text style={styles.logoText}>Guitar Practice</Text>
        </View>
        {isDesktop && (
          <TouchableOpacity style={styles.navButton} onPress={handleLaunchApp}>
            <Text style={styles.navButtonText}>Launch Web App</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Hero Section */}
      <View style={[styles.heroSection, isDesktop && styles.desktopHero]}>
        <Text style={styles.heroBadge}>🎸 PREMIUM GUITAR UTILITY</Text>
        <Text style={styles.heroTitle}>
          Master Your Fretboard{'\n'}and Build <Text style={styles.goldText}>Flawless Speed</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          The ultimate structured training companion. Build alternate picking precision, master major scale finger positions, and coordinate fingers with auto-ramping practice drills.
        </Text>

        <View style={styles.heroButtonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLaunchApp}>
            <Text style={styles.primaryButtonText}>Launch Web App</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* Store Badges */}
          <View style={styles.storeBadges}>
            <TouchableOpacity
              style={styles.storeButton}
              onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}
              accessibilityLabel="Get it on Google Play"
            >
              <Ionicons name="logo-google-playstore" size={22} color="#fff" />
              <View style={styles.storeButtonText}>
                <Text style={styles.storeButtonTop}>GET IT ON</Text>
                <Text style={styles.storeButtonMain}>Google Play</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.storeButton}
              onPress={() => Linking.openURL(APP_STORE_URL)}
              accessibilityLabel="Download on the App Store"
            >
              <Ionicons name="logo-apple" size={24} color="#fff" />
              <View style={styles.storeButtonText}>
                <Text style={styles.storeButtonTop}>DOWNLOAD ON THE</Text>
                <Text style={styles.storeButtonMain}>App Store</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Infographic */}
      <View style={[styles.statsSection, isDesktop && styles.desktopWidth]}>
        <View style={[styles.statsRow, isDesktop && styles.desktopStatsRow]}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statIconRing}>
                <Ionicons name={stat.icon} size={20} color={colors.gold} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features Grid */}
      <View style={[styles.featuresSection, isDesktop && styles.desktopWidth]}>
        <Text style={styles.sectionTitle}>Everything you need to master your craft</Text>
        <Text style={styles.sectionSubtitle}>
          Forget boring, unstructured playing. Practice with highly focused, scientific training routines.
        </Text>

        <View style={[styles.featuresGrid, isDesktop && styles.desktopGrid]}>
          <View style={[styles.featureCard, isDesktop && styles.desktopCard]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="speedometer-outline" size={24} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>Auto-Ramping Metronome</Text>
            <Text style={styles.cardBody}>
              High-precision lookahead metronome with custom target tempos and auto-ramping to build clean, articulate speed.
            </Text>
          </View>

          <View style={[styles.featureCard, isDesktop && styles.desktopCard]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="musical-notes-outline" size={24} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>Scales & Fretboard Patterns</Text>
            <Text style={styles.cardBody}>
              Visualize and master the major scales (C, G, D, A, E, B) across multiple fingerings and fretboard patterns.
            </Text>
          </View>

          <View style={[styles.featureCard, isDesktop && styles.desktopCard]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="flash-outline" size={24} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>8 Picking & Dexterity Drills</Text>
            <Text style={styles.cardBody}>
              Targeted drills for right-hand alternate picking, left-hand independence, and melodic Alankars.
            </Text>
          </View>

          <View style={[styles.featureCard, isDesktop && styles.desktopCard]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="stats-chart-outline" size={24} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>Daily Logs & Progress</Text>
            <Text style={styles.cardBody}>
              Set weekly practice goals, log speeds, and visualize your daily practice consistency in 100% private local storage.
            </Text>
          </View>
        </View>
      </View>

      {/* How It Works */}
      <View style={[styles.howSection, isDesktop && styles.desktopWidth]}>
        <Text style={styles.sectionTitle}>How it works</Text>
        <Text style={styles.sectionSubtitle}>Three steps from zero to speed demon.</Text>

        <View style={[styles.howGrid, isDesktop && styles.desktopHowGrid]}>
          {HOW_IT_WORKS.map((item, idx) => (
            <View key={item.step} style={[styles.howCard, isDesktop && styles.desktopHowCard]}>
              {/* Connector line between cards on desktop */}
              {isDesktop && idx < HOW_IT_WORKS.length - 1 && (
                <View style={styles.connector} />
              )}
              <View style={styles.howStepBadge}>
                <Text style={styles.howStepText}>{item.step}</Text>
              </View>
              <View style={styles.howIconRing}>
                <Ionicons name={item.icon} size={22} color={colors.gold} />
              </View>
              <Text style={styles.howTitle}>{item.title}</Text>
              <Text style={styles.howDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Download CTA Banner */}
      <View style={[styles.ctaBanner, isDesktop && styles.desktopCtaBanner]}>
        <View style={styles.ctaGlow} />
        <Ionicons name="guitar-outline" size={40} color={colors.gold} style={{ marginBottom: 16 }} />
        <Text style={styles.ctaTitle}>Ready to practice smarter?</Text>
        <Text style={styles.ctaSubtitle}>Download free on iOS and Android — no account required.</Text>
        <View style={styles.storeBadges}>
          <TouchableOpacity
            style={styles.storeButton}
            onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}
            accessibilityLabel="Get it on Google Play"
          >
            <Ionicons name="logo-google-playstore" size={22} color="#fff" />
            <View style={styles.storeButtonText}>
              <Text style={styles.storeButtonTop}>GET IT ON</Text>
              <Text style={styles.storeButtonMain}>Google Play</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.storeButton}
            onPress={() => Linking.openURL(APP_STORE_URL)}
            accessibilityLabel="Download on the App Store"
          >
            <Ionicons name="logo-apple" size={24} color="#fff" />
            <View style={styles.storeButtonText}>
              <Text style={styles.storeButtonTop}>DOWNLOAD ON THE</Text>
              <Text style={styles.storeButtonMain}>App Store</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, isDesktop && styles.desktopWidth]}>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}>
            <Text style={styles.footerLink}>Google Play</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity onPress={() => Linking.openURL(APP_STORE_URL)}>
            <Text style={styles.footerLink}>App Store</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity onPress={() => Linking.openURL('/privacy-policy.html')}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>&copy; 2026 Guitar Practice Companion. All rights reserved.</Text>
        <Text style={styles.footerSubText}>Designed for high-performance scale and picking workouts.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },

  // Navbar
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: typography.heading,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  navButton: {
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navButtonText: {
    color: colors.gold,
    fontWeight: '600',
    fontSize: 14,
  },

  // Hero
  heroSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroBadge: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: typography.heading,
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
  },
  goldText: {
    color: colors.gold,
  },
  heroSubtitle: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 600,
    marginBottom: 32,
  },
  heroButtonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Store Buttons
  storeBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    minWidth: 160,
  },
  storeButtonText: {
    flexDirection: 'column',
  },
  storeButtonTop: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  storeButtonMain: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Stats Infographic
  statsSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  desktopStatsRow: {
    flexWrap: 'nowrap',
    gap: 0,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
    maxWidth: 180,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statIconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,107,0,0.3)',
    backgroundColor: 'rgba(255,107,0,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontFamily: typography.heading,
    fontSize: 28,
    fontWeight: '800',
    color: colors.gold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // Features
  featuresSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.heading,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 550,
    lineHeight: 22,
    marginBottom: 40,
  },
  featuresGrid: {
    width: '100%',
    gap: 16,
  },
  featureCard: {
    backgroundColor: colors.surfaceCard,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: typography.heading,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardBody: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // How It Works
  howSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  howGrid: {
    width: '100%',
    gap: 16,
  },
  desktopHowGrid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  },
  howCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },
  desktopHowCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  connector: {
    position: 'absolute',
    top: 44,
    right: -16,
    width: 32,
    height: 2,
    backgroundColor: colors.border,
    zIndex: 1,
  },
  howStepBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,107,0,0.08)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  howStepText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  howIconRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,107,0,0.35)',
    backgroundColor: 'rgba(255,107,0,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  howTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  howDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // CTA Banner
  ctaBanner: {
    width: '100%',
    marginTop: 56,
    marginHorizontal: 24,
    backgroundColor: colors.surfaceCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,107,0,0.25)',
    padding: 40,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
  },
  desktopCtaBanner: {
    maxWidth: 860,
    marginTop: 56,
  },
  ctaGlow: {
    position: 'absolute',
    top: -60,
    left: '50%',
    width: 320,
    height: 220,
    borderRadius: 160,
    backgroundColor: 'rgba(255,107,0,0.07)',
    transform: [{ translateX: -160 }],
  },
  ctaTitle: {
    fontFamily: typography.heading,
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },

  // Footer
  footer: {
    width: '100%',
    paddingTop: 40,
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 6,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerDot: {
    color: colors.textMuted,
    fontSize: 13,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  footerSubText: {
    color: colors.textMuted,
    fontSize: 12,
  },

  // Desktop overrides
  desktopWidth: {
    maxWidth: 1200,
    width: '100%',
  },
  desktopHero: {
    paddingTop: 100,
    paddingBottom: 80,
  },
  desktopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 1000,
  },
  desktopCard: {
    width: '47%',
    minHeight: 180,
  },
});

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { rs, rf } from '../../src/theme/responsive';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = rs(56) + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surfaceCard,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: insets.bottom > 0 ? insets.bottom : rs(8),
          paddingTop: rs(8),
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: typography.heading,
          fontSize: rf(10),
          fontWeight: '600',
          letterSpacing: 0.3,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => <Ionicons name="play-circle" size={rs(size + 2)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="metronome"
        options={{
          title: 'Tempo',
          tabBarIcon: ({ color, size }) => <Ionicons name="speedometer" size={rs(size)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scales"
        options={{
          title: 'Scales',
          tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes" size={rs(size)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={rs(size)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={rs(size)} color={color} />,
        }}
      />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

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
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: typography.heading,
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
          title: 'Practice', 
          tabBarIcon: ({ color, size }) => <Ionicons name="play-circle" size={size + 2} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="metronome"
        options={{ 
          title: 'Tempo', 
          tabBarIcon: ({ color, size }) => <Ionicons name="speedometer" size={size} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="scales"
        options={{ 
          title: 'Scales', 
          tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes" size={size} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{ 
          title: 'Exercises', 
          tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={size} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{ 
          title: 'Progress', 
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} /> 
        }}
      />
    </Tabs>
  );
}

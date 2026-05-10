import { Tabs } from 'expo-router';
import { colors } from '../../src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Practice', tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="metronome"
        options={{ title: 'Metronome', tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="scales"
        options={{ title: 'Scales', tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="exercises"
        options={{ title: 'Exercises', tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="progress"
        options={{ title: 'Progress', tabBarIcon: () => null }}
      />
    </Tabs>
  );
}

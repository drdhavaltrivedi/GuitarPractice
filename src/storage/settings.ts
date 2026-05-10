import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings } from '../data/types';

const KEY = 'user_settings_v1';

const DEFAULTS: UserSettings = {
  defaultBpm: 80,
  defaultKey: 'C',
  hapticEnabled: true,
  theme: 'dark',
};

export async function loadSettings(): Promise<UserSettings> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch { return DEFAULTS; }
}

export async function saveSettings(settings: Partial<UserSettings>): Promise<void> {
  try {
    const current = await loadSettings();
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...current, ...settings }));
  } catch {}
}

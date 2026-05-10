import AsyncStorage from '@react-native-async-storage/async-storage';
import { PracticeEntry } from '../data/types';

const KEY = 'practice_log_v1';

export async function loadLog(): Promise<PracticeEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveLog(log: PracticeEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(log));
  } catch { /* silent fail — not critical */ }
}

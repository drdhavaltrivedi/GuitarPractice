import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import { metronomeEngine } from '../src/engine/MetronomeEngine';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: false,
        });
        await metronomeEngine.init();
      } catch (e) {
        console.warn('Audio init failed:', e);
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();

    return () => {
      metronomeEngine.destroy();
    };
  }, []);

  if (!ready) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

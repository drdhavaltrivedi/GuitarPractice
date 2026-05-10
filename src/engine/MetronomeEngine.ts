import { Audio } from 'expo-av';

type BeatCallback = (beatNumber: number, beatTime: number) => void;

export class MetronomeEngine {
  private isPlaying = false;
  private bpm = 80;
  private timeSignature = 4;
  private currentBeat = 0;
  private nextBeatTime = 0;

  // TUNABLE: increase LOOKAHEAD if beats drop; decrease for lower latency
  private readonly LOOKAHEAD_SECONDS = 0.15;
  private readonly SCHEDULER_INTERVAL_MS = 25;

  private tickSound: Audio.Sound | null = null;
  private tockSound: Audio.Sound | null = null;
  private schedulerInterval: ReturnType<typeof setInterval> | null = null;

  public onBeat: BeatCallback | null = null;

  async init(): Promise<void> {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
    });

    const [{ sound: tick }, { sound: tock }] = await Promise.all([
      Audio.Sound.createAsync(require('../audio/tick.wav'), { shouldPlay: false, volume: 1.0 }),
      Audio.Sound.createAsync(require('../audio/tock.wav'), { shouldPlay: false, volume: 1.0 }),
    ]);

    this.tickSound = tick;
    this.tockSound = tock;
  }

  start(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentBeat = 0;
    this.nextBeatTime = Date.now() / 1000; // start immediately

    this.schedulerInterval = setInterval(
      () => this.runScheduler(),
      this.SCHEDULER_INTERVAL_MS
    );
  }

  stop(): void {
    this.isPlaying = false;
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
  }

  setBpm(bpm: number): void {
    this.bpm = Math.max(20, Math.min(400, bpm));
  }

  getBpm(): number { return this.bpm; }

  setTimeSignature(ts: 2 | 3 | 4 | 6): void {
    this.timeSignature = ts;
  }

  private runScheduler(): void {
    const now = Date.now() / 1000;
    const window = now + this.LOOKAHEAD_SECONDS;

    while (this.nextBeatTime < window) {
      this.scheduleBeat(this.currentBeat, this.nextBeatTime);

      const secondsPerBeat = 60.0 / this.bpm;
      this.nextBeatTime += secondsPerBeat;
      this.currentBeat = (this.currentBeat + 1) % this.timeSignature;
    }
  }

  private scheduleBeat(beatNumber: number, scheduledTime: number): void {
    const delayMs = Math.max(0, (scheduledTime - Date.now() / 1000) * 1000);
    const sound = beatNumber === 0 ? this.tockSound : this.tickSound;

    setTimeout(async () => {
      if (!this.isPlaying) return;
      try {
        await sound?.setPositionAsync(0);
        await sound?.playAsync();
      } catch { /* sound may have been unloaded */ }
      this.onBeat?.(beatNumber, scheduledTime);
    }, delayMs);
  }

  async destroy(): Promise<void> {
    this.stop();
    await Promise.all([
      this.tickSound?.unloadAsync(),
      this.tockSound?.unloadAsync(),
    ]);
    this.tickSound = null;
    this.tockSound = null;
  }
}

// Singleton — import this everywhere
export const metronomeEngine = new MetronomeEngine();

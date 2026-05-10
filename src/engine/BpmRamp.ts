export class BpmRampController {
  private timer: ReturnType<typeof setInterval> | null = null;

  start(
    startBpm: number,
    endBpm: number,
    durationMinutes: number,
    onTick: (bpm: number, progress: number) => void,
    onComplete: () => void,
  ): void {
    this.stop();
    const durationMs = durationMinutes * 60 * 1000;
    const startTime = Date.now();

    this.timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const bpm = Math.round(startBpm + (endBpm - startBpm) * progress);
      onTick(bpm, progress);
      if (progress >= 1) { this.stop(); onComplete(); }
    }, 1000);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

export class TapTempoCalculator {
  private taps: number[] = [];
  private readonly MAX_TAPS = 8;
  private readonly RESET_AFTER_MS = 2000;

  tap(): number | null {
    const now = Date.now();

    if (this.taps.length > 0) {
      const gap = now - this.taps[this.taps.length - 1];
      if (gap > this.RESET_AFTER_MS) this.taps = [];
    }

    this.taps.push(now);
    if (this.taps.length > this.MAX_TAPS) {
      this.taps = this.taps.slice(-this.MAX_TAPS);
    }
    if (this.taps.length < 2) return null;

    const intervals = this.taps
      .slice(1)
      .map((t, i) => t - this.taps[i]);

    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return Math.max(20, Math.min(400, Math.round(60000 / avg)));
  }

  reset(): void { this.taps = []; }
}

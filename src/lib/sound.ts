/**
 * Tactile audio feedback for UI button interactions inspired by premium sports-tech interfaces.
 * Uses Web Audio API oscillator synthesis with zero external assets or latency.
 */

let audioCtx: AudioContext | null = null;
let lastPlayTime = 0;
const THROTTLE_MS = 50;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  try {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a subtle, tactile micro-tick when hovering over interactive button elements.
 */
export function playHoverSound(): void {
  if (typeof window === "undefined") return;

  const now = performance.now();
  if (now - lastPlayTime < THROTTLE_MS) return;
  lastPlayTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // High-tech tactile frequency tick (1100 Hz dropping to 750 Hz)
    const startTime = ctx.currentTime;
    const duration = 0.025; // 25ms

    osc.type = "sine";
    osc.frequency.setValueAtTime(1100, startTime);
    osc.frequency.exponentialRampToValueAtTime(750, startTime + duration);

    // Soft, crisp mechanical envelope
    gain.gain.setValueAtTime(0.028, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  } catch {
    // Fail silently without interrupting UI
  }
}

/**
 * Plays a subtle confirmation sound when clicking buttons
 */
export function playClickSound(): void {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = ctx.currentTime;
    const duration = 0.035;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, startTime);
    osc.frequency.exponentialRampToValueAtTime(400, startTime + duration);

    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  } catch {
    // Fail silently
  }
}

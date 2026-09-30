/**
 * Seed-based pseudo-random number generator (Mulberry32).
 * Allows reproducing identical question selection and shuffle orders across reloads.
 */
export function createRNG(seedStr: string): () => number {
  // Convert string seed to 32-bit integer hash
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  let a = h >>> 0;

  return function mulberry32(): number {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates an uppercase alphanumeric seed string (e.g. "A7F3K2").
 */
export function generateSeed(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

/**
 * Pure Fisher-Yates shuffle algorithm.
 * Accepts an optional random generator function (defaults to Math.random).
 */
export function fisherYatesShuffle<T>(array: T[], rng: () => number = Math.random): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

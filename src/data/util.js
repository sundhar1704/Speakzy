// Small seeded RNG so option order is stable within one practice session.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function shuffled(arr, seed) {
  const rnd = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Lowercase, strip accents & punctuation – used when comparing speech to the target phrase.
export function normalise(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 0..1 word-overlap similarity (order-insensitive).
export function similarity(a, b) {
  const A = normalise(a).split(' ').filter(Boolean);
  const B = normalise(b).split(' ').filter(Boolean);
  if (!A.length || !B.length) return 0;
  const setB = new Set(B);
  const hit = A.filter((w) => setB.has(w)).length;
  return hit / Math.max(A.length, B.length);
}

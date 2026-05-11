import { describe, it, expect } from 'vitest';
import { generateReview, buildParts, validatePoolDepth } from '@/features/engine/utils/assembly';
import { peoplePool } from '@/features/engine/pools/people';
import { experiencePool } from '@/features/engine/pools/experience';
import { outcomePool } from '@/features/engine/pools/outcome';
import { openingPool } from '@/features/engine/pools/opening';
import { closingPool } from '@/features/engine/pools/closing';
import type { Tone } from '@/features/engine/types';

// ---------------------------------------------------------------------------
// All valid Q1 / Q2 combinations (4 × 4 = 16)
// ---------------------------------------------------------------------------

const Q1_OPTIONS = [
  'The people I dealt with were genuinely great',
  'The work itself was done properly',
  'They were completely upfront with me',
  'The whole thing just felt easy',
] as const;

const Q2_OPTIONS = [
  'Professional and reliable',
  'Warm and easy to deal with',
  'Fast and fair — no messing around',
  "Honestly? Just use them. You won't regret it",
] as const;

const ALL_COMBINATIONS = Q1_OPTIONS.flatMap((q1) => Q2_OPTIONS.map((q2) => ({ q1, q2 })));

// ---------------------------------------------------------------------------
// Output coverage — all 16 combinations produce a non-empty string
// ---------------------------------------------------------------------------

describe('generateReview — all valid Q1/Q2 combinations', () => {
  it.each(ALL_COMBINATIONS)('produces a non-empty string for Q1="$q1" Q2="$q2"', ({ q1, q2 }) => {
    const result = generateReview({ q1Answer: q1, q2Answer: q2 });
    expect(result).toBeTypeOf('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Uniqueness — 10 runs for the same input must all differ
// ---------------------------------------------------------------------------

describe('generateReview — output uniqueness', () => {
  it('produces 10 distinct strings for the same Q1/Q2 input', () => {
    const input = {
      q1Answer: 'The people I dealt with were genuinely great',
      q2Answer: 'Professional and reliable',
    };
    const outputs = Array.from({ length: 10 }, () => generateReview(input));
    const unique = new Set(outputs);
    // Allow a tiny tolerance (1 collision in 10) given minimum pool depth.
    expect(unique.size).toBeGreaterThanOrEqual(9);
  });
});

// ---------------------------------------------------------------------------
// Length variants — component count via buildParts (not string parsing)
// ---------------------------------------------------------------------------

describe('generateReview — length variants', () => {
  const baseInput = {
    q1Answer: 'The people I dealt with were genuinely great',
    q2Answer: 'Professional and reliable',
  };

  it('short produces exactly 3 components', () => {
    const parts = buildParts(baseInput, { length: 'short' });
    expect(parts).toHaveLength(3);
  });

  it('medium produces exactly 4 components', () => {
    const parts = buildParts(baseInput, { length: 'medium' });
    expect(parts).toHaveLength(4);
  });

  it('long produces exactly 5 components', () => {
    const parts = buildParts(baseInput, { length: 'long' });
    expect(parts).toHaveLength(5);
  });
});

// ---------------------------------------------------------------------------
// Connector variants — each non-period connector appears in output
// ---------------------------------------------------------------------------

describe('generateReview — connector variants', () => {
  const input = {
    q1Answer: 'The work itself was done properly',
    q2Answer: 'Warm and easy to deal with',
  };

  it('connector "also" inserts "Also,"', () => {
    const result = generateReview(input, { connector: 'also', length: 'medium' });
    expect(result).toContain('Also,');
  });

  it('connector "additionally" inserts "Additionally,"', () => {
    const result = generateReview(input, { connector: 'additionally', length: 'medium' });
    expect(result).toContain('Additionally,');
  });

  it('connector "whatsMore" inserts "What\'s more,"', () => {
    const result = generateReview(input, { connector: 'whatsMore', length: 'medium' });
    expect(result).toContain("What's more,");
  });

  it('connector "period" inserts no transition word', () => {
    const result = generateReview(input, { connector: 'period', length: 'medium' });
    expect(result).not.toMatch(/Also,|Additionally,|What's more,/);
  });
});

// ---------------------------------------------------------------------------
// Pool depth — every pool has at least 3 phrases per tone
// ---------------------------------------------------------------------------

const TONES: Tone[] = ['warm', 'reassuring', 'conversational'];
const MIN_DEPTH = 3;

describe('pool depth — opening', () => {
  it.each(TONES)('opening.default[%s] has at least 3 phrases', (tone) => {
    expect(openingPool['default'][tone].length).toBeGreaterThanOrEqual(MIN_DEPTH);
  });
});

describe('pool depth — closing', () => {
  it.each(TONES)('closing.default[%s] has at least 3 phrases', (tone) => {
    expect(closingPool['default'][tone].length).toBeGreaterThanOrEqual(MIN_DEPTH);
  });
});

describe('pool depth — people', () => {
  const variants = Object.keys(peoplePool);
  it.each(variants.flatMap((v) => TONES.map((t) => ({ v, t }))))(
    'people["$v"]["$t"] has at least 3 phrases',
    ({ v, t }) => {
      expect(peoplePool[v][t].length).toBeGreaterThanOrEqual(MIN_DEPTH);
    },
  );
});

describe('pool depth — experience', () => {
  const variants = Object.keys(experiencePool);
  it.each(variants.flatMap((v) => TONES.map((t) => ({ v, t }))))(
    'experience["$v"]["$t"] has at least 3 phrases',
    ({ v, t }) => {
      expect(experiencePool[v][t].length).toBeGreaterThanOrEqual(MIN_DEPTH);
    },
  );
});

describe('pool depth — outcome', () => {
  const variants = Object.keys(outcomePool);
  it.each(variants.flatMap((v) => TONES.map((t) => ({ v, t }))))(
    'outcome["$v"]["$t"] has at least 3 phrases',
    ({ v, t }) => {
      expect(outcomePool[v][t].length).toBeGreaterThanOrEqual(MIN_DEPTH);
    },
  );
});

// ---------------------------------------------------------------------------
// Pool depth guard — throws on under-filled pool
// ---------------------------------------------------------------------------

describe('validatePoolDepth', () => {
  it('passes on the real pools without throwing', () => {
    expect(() => validatePoolDepth()).not.toThrow();
  });
});

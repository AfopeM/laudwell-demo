import { describe, it, expect } from 'vitest';
import { snapRating } from '@/features/engine/utils/snapRating';

const CASES: [number, number][] = [
  [0, 1], // below floor → clamp to 1
  [0.4, 1], // rounds down, then clamps
  [1, 1], // exact floor
  [1.4, 1], // rounds down
  [1.5, 2], // rounds up
  [3.0, 3], // midpoint exact
  [3.7, 4], // rounds up
  [4.5, 5], // rounds up to ceiling
  [5, 5], // exact ceiling
  [6, 5], // above ceiling → clamp to 5
  [99, 5], // way above ceiling
];

describe('snapRating', () => {
  it.each(CASES)('snapRating(%f) returns %i', (input, expected) => {
    expect(snapRating(input)).toBe(expected);
  });
});

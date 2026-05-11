import { describe, it, expect } from 'vitest';
import { mapAnswersToPools } from '@/features/engine/utils/mapping';

const Q1_CASES = [
  ['The people I dealt with were genuinely great', 'people.warm'],
  ['The work itself was done properly', 'outcome.quality'],
  ['They were completely upfront with me', 'experience.transparent'],
  ['The whole thing just felt easy', 'experience.smooth'],
] as const;

const Q2_CASES = [
  ['Professional and reliable', 'people.professional'],
  ['Warm and easy to deal with', 'people.friendly'],
  ['Fast and fair — no messing around', 'people.efficient'],
  ["Honestly? Just use them. You won't regret it", 'outcome.enthusiastic'],
] as const;

describe('mapAnswersToPools', () => {
  it.each(Q1_CASES)('maps Q1 "%s" → %s', (answer, expectedKey) => {
    const result = mapAnswersToPools(answer, 'Professional and reliable');
    expect(result.q1Pool).toBe(expectedKey);
  });

  it.each(Q2_CASES)('maps Q2 "%s" → %s', (answer, expectedKey) => {
    const result = mapAnswersToPools('The people I dealt with were genuinely great', answer);
    expect(result.q2Pool).toBe(expectedKey);
  });

  it('throws on an unrecognised Q1 answer', () => {
    expect(() =>
      mapAnswersToPools('Something not in the spec', 'Professional and reliable'),
    ).toThrow();
  });

  it('throws on an unrecognised Q2 answer', () => {
    expect(() =>
      mapAnswersToPools(
        'The people I dealt with were genuinely great',
        'Something not in the spec',
      ),
    ).toThrow();
  });
});

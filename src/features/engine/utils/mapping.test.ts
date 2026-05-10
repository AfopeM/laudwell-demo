import { describe, it, expect } from 'vitest';
import { mapAnswersToPools } from '@/features/engine/utils/mapping';

const Q1_CASES = [
  ['The staff made me feel genuinely cared for', 'staff.caring'],
  ['I was seen on time without a long wait', 'waitTime.short'],
  ['The treatment actually made a difference', 'service.effective'],
  ['The whole experience was smooth from start to finish', 'service.smooth'],
] as const;

const Q2_CASES = [
  ['Professional and thorough', 'staff.professional'],
  ['Warm, friendly, and welcoming', 'staff.friendly'],
  ['Fast without cutting corners', 'staff.efficient'],
  ["Honestly, just go. You won't regret it", 'service.enthusiastic'],
] as const;

describe('mapAnswersToPools', () => {
  it.each(Q1_CASES)('maps Q1 "%s" → %s', (answer, expectedKey) => {
    const result = mapAnswersToPools(answer, 'Professional and thorough');
    expect(result.q1Pool).toBe(expectedKey);
  });

  it.each(Q2_CASES)('maps Q2 "%s" → %s', (answer, expectedKey) => {
    const result = mapAnswersToPools('The staff made me feel genuinely cared for', answer);
    expect(result.q2Pool).toBe(expectedKey);
  });

  it('throws on an unrecognised Q1 answer', () => {
    expect(() =>
      mapAnswersToPools('Something not in the spec', 'Professional and thorough'),
    ).toThrow();
  });

  it('throws on an unrecognised Q2 answer', () => {
    expect(() =>
      mapAnswersToPools('The staff made me feel genuinely cared for', 'Something not in the spec'),
    ).toThrow();
  });
});

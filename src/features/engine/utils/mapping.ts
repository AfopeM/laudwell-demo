import type { PoolKey, MappedPools } from '../types';

const Q1_MAP: Record<string, PoolKey> = {
  'The people I dealt with were genuinely great': 'people.warm',
  'The work itself was done properly': 'outcome.quality',
  'They were completely upfront with me': 'experience.transparent',
  'The whole thing just felt easy': 'experience.smooth',
};

const Q2_MAP: Record<string, PoolKey> = {
  'Professional and reliable': 'people.professional',
  'Warm and easy to deal with': 'people.friendly',
  'Fast and fair — no messing around': 'people.efficient',
  "Honestly? Just use them. You won't regret it": 'outcome.enthusiastic',
};

export function mapAnswersToPools(q1Answer: string, q2Answer: string): MappedPools {
  const q1Pool = Q1_MAP[q1Answer];
  const q2Pool = Q2_MAP[q2Answer];

  if (!q1Pool) throw new Error(`No pool mapping for Q1 answer: "${q1Answer}"`);
  if (!q2Pool) throw new Error(`No pool mapping for Q2 answer: "${q2Answer}"`);

  return { q1Pool, q2Pool };
}

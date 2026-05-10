import type { PoolKey, MappedPools } from '../types';

const Q1_MAP: Record<string, PoolKey> = {
  'The staff made me feel genuinely cared for': 'staff.caring',
  'I was seen on time without a long wait': 'waitTime.short',
  'The treatment actually made a difference': 'service.effective',
  'The whole experience was smooth from start to finish': 'service.smooth',
};

const Q2_MAP: Record<string, PoolKey> = {
  'Professional and thorough': 'staff.professional',
  'Warm, friendly, and welcoming': 'staff.friendly',
  'Fast without cutting corners': 'staff.efficient',
  "Honestly, just go. You won't regret it": 'service.enthusiastic',
};

export function mapAnswersToPools(q1Answer: string, q2Answer: string): MappedPools {
  const q1Pool = Q1_MAP[q1Answer];
  const q2Pool = Q2_MAP[q2Answer];

  if (!q1Pool) throw new Error(`No pool mapping for Q1 answer: "${q1Answer}"`);
  if (!q2Pool) throw new Error(`No pool mapping for Q2 answer: "${q2Answer}"`);

  return { q1Pool, q2Pool };
}

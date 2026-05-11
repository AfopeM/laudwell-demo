import { describe, it, expect } from 'vitest';
import { wordCount } from '@/features/flow/utils/wordCount';

type Bucket = 'empty' | 'short' | 'good' | 'great';

const CASES: [string, Bucket][] = [
  ['', 'empty'],
  ['One', 'short'],
  [
    'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen',
    'short',
  ],
  [
    'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty',
    'good',
  ],
  [
    'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five twenty-six twenty-seven twenty-eight twenty-nine thirty thirty-one thirty-two thirty-three thirty-four thirty-five thirty-six thirty-seven thirty-eight thirty-nine forty',
    'good',
  ],
  [
    'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five twenty-six twenty-seven twenty-eight twenty-nine thirty thirty-one thirty-two thirty-three thirty-four thirty-five thirty-six thirty-seven thirty-eight thirty-nine forty forty-one',
    'great',
  ],
];

describe('wordCount', () => {
  it.each(CASES)('"%s..." returns "%s"', (input, expected) => {
    expect(wordCount(input)).toBe(expected);
  });
});

import { describe, it, expect } from 'vitest';
import { detectEdit } from '@/features/flow/utils/isEdited';

describe('detectEdit', () => {
  it('returns false when text is identical', () => {
    expect(detectEdit('Hello world', 'Hello world')).toBe(false);
  });

  it('returns false when difference is only whitespace', () => {
    expect(detectEdit('  Hello world  ', 'Hello world')).toBe(false);
  });

  it('returns true when text has been changed', () => {
    expect(detectEdit('Hello world edited', 'Hello world')).toBe(true);
  });
});

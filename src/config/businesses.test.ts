import { describe, it, expect } from 'vitest';
import { getBusinessById } from '@/config/businesses';

describe('getBusinessById', () => {
  it('returns the correct business for a known id', () => {
    const business = getBusinessById('demo-business');
    expect(business.id).toBe('demo-business');
    expect(business.name).toBeTruthy();
    expect(business.googleReviewUrl).toBeTruthy();
  });

  it('throws for an unknown id', () => {
    expect(() => getBusinessById('does-not-exist')).toThrow();
  });
});

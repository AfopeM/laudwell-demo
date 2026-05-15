import type { FlowState } from '@/features/flow/types';
import { getBusinessById } from '@/config/businesses';

export function submitFlow(flow: FlowState, businessId: string): void {
  const business = getBusinessById(businessId);
  const completionTime = Math.max(1, Math.round((Date.now() - flow.completionStartTime) / 1000));
  const isHighRater = flow.starRating >= 4;

  const payload = {
    businessId,
    businessName: business.name,
    sessionId: flow.sessionId,
    q1Answer: flow.q1Answer,
    q2Answer: flow.q2Answer,
    starRating: flow.starRating,
    edited: isHighRater ? flow.isEdited : null,
    googleRedirectTaken: null, // unknown at submit time — schema allows null
    completionTime,
    finalSubmittedText: flow.finalSubmittedText,
  };

  // void = fire and forget. No await. UI never waits for this.
  void fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

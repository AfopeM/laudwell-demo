'use client';

import { createContext, useContext, useState } from 'react';
import type { FlowState } from './types';

// The initial state — everything empty/zeroed until the flow populates it.
const INITIAL_STATE: FlowState = {
  sessionId: '',
  completionStartTime: 0,
  q1Answer: '',
  q2Answer: '',
  starRating: 0,
  generatedText: '',
  isEdited: false,
  googleRedirectTaken: null,
  finalSubmittedText: null,
};

// The context carries both the state and a way to partially update it.
// Partial<FlowState> means "any subset of fields" — so a screen can write
// just q1Answer without needing to resend everything else.
interface FlowContextValue {
  flow: FlowState;
  setFlow: (_update: Partial<FlowState>) => void;
}

const FlowContext = createContext<FlowContextValue | null>(null);

// The provider wraps all screens. It lives in the layout, so it persists
// across route changes within [businessId].
export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [flow, setFlowState] = useState<FlowState>(INITIAL_STATE);

  function setFlow(patch: Partial<FlowState>) {
    setFlowState((prev) => ({ ...prev, ...patch }));
  }

  return <FlowContext.Provider value={{ flow, setFlow }}>{children}</FlowContext.Provider>;
}

// A hook so screens can consume the context without importing the raw context object.
// Throws if called outside the provider — catches wiring mistakes immediately.
export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlow must be used inside FlowProvider');
  return ctx;
}

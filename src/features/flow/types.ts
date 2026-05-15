export type ScreenId = 'screen-0' | 'screen-1' | 'screen-2' | 'screen-3' | 'screen-4' | 'screen-5';

export interface FlowState {
  sessionId: string;
  completionStartTime: number;
  q1Answer: string;
  q2Answer: string;
  starRating: number;
  generatedText: string;
  isEdited: boolean;
  googleRedirectTaken: boolean | null;
  finalSubmittedText: string | null;
}

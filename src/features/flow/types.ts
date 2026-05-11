export type ScreenId =
  | 'screen-0'
  | 'screen-1'
  | 'screen-2'
  | 'screen-3'
  | 'screen-4a'
  | 'screen-4b'
  | 'screen-5a'
  | 'screen-5b';

export interface FlowState {
  sessionId: string;
  completionStartTime: number;
  q1Answer: string;
  q2Answer: string;
  starRating: number;
  generatedText: string;
  isEdited: boolean;
  googleRedirectTaken: boolean | null;
}

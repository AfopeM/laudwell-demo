export type Tone = 'warm' | 'reassuring' | 'conversational';
export type Length = 'short' | 'medium' | 'long';
export type Connector = 'period' | 'also' | 'additionally' | 'whatsMore';

export type PoolKey =
  | 'staff.caring'
  | 'staff.professional'
  | 'staff.friendly'
  | 'staff.efficient'
  | 'waitTime.short'
  | 'service.effective'
  | 'service.smooth'
  | 'service.enthusiastic';

export interface EngineInput {
  q1Answer: string;
  q2Answer: string;
}

export type EngineOutput = string;

export interface MappedPools {
  q1Pool: PoolKey;
  q2Pool: PoolKey;
}

import type { ScreenId } from '@/features/flow/types';

const PROGRESS_MAP: Record<ScreenId, number> = {
  'screen-0': 0,
  'screen-1': 20,
  'screen-2': 40,
  'screen-3': 60,
  'screen-4': 80,
  'screen-5': 100,
};

export function progressValue(screenId: ScreenId): number {
  return PROGRESS_MAP[screenId];
}

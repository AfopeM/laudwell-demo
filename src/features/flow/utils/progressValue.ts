import type { ScreenId } from '@/features/flow/types';

const PROGRESS_MAP: Record<ScreenId, number> = {
  'screen-0': 0,
  'screen-1': 20,
  'screen-2': 40,
  'screen-3': 60,
  'screen-4a': 80,
  'screen-4b': 80,
  'screen-5a': 100,
  'screen-5b': 100,
};

export function progressValue(screenId: ScreenId): number {
  return PROGRESS_MAP[screenId];
}

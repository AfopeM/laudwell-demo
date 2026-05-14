'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FlowProvider } from '@/features/flow/context';
import ProgressBar from '@/components/ProgressBar';
import { progressValue } from '@/features/flow/utils/progressValue';
import type { ScreenId } from '@/features/flow/types';

// Extract the screen identifier from a pathname like "/demo-business/screen-1"
// Returns null if the segment doesn't match a known screen.
function getScreenId(pathname: string): ScreenId | null {
  const segment = pathname.split('/').pop();
  const valid: ScreenId[] = [
    'screen-0',
    'screen-1',
    'screen-2',
    'screen-3',
    'screen-4',
    'screen-5',
  ];
  return valid.includes(segment as ScreenId) ? (segment as ScreenId) : null;
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const screenId = getScreenId(pathname);
  const progress = screenId ? progressValue(screenId) : 0;

  return (
    <div className="flex min-h-dvh flex-col bg-[#FAFAF8]">
      <ProgressBar value={progress} />
      <AnimatePresence mode="wait">
        <div key={pathname} className="flex flex-1 flex-col">
          {children}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlowProvider>
      <LayoutShell>{children}</LayoutShell>
    </FlowProvider>
  );
}

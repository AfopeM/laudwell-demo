'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from '@/features/flow/components/ProgressBar';
import { progressValue } from '@/features/flow/utils/progressValue';
import type { ScreenId } from '@/features/flow/types';
import Footer from '@/features/flow/components/Footer';

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

export default function BusinessLayoutShell({
  children,
  businessName: _businessName,
}: {
  children: React.ReactNode;
  businessName: string;
}) {
  const pathname = usePathname();
  const screenId = getScreenId(pathname);
  const progress = screenId ? progressValue(screenId) : 0;

  if (screenId === 'screen-0') {
    return (
      <div className="bg-cream flex h-dvh flex-col px-12">
        <AnimatePresence mode="wait">
          <div
            key={pathname}
            className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto font-sans"
          >
            {children}
          </div>
        </AnimatePresence>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-cream flex h-dvh flex-col px-12">
      <ProgressBar value={progress} />
      <AnimatePresence mode="wait">
        <div
          key={pathname}
          className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto font-sans"
        >
          {children}
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

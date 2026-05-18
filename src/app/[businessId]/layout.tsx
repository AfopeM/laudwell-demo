'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FlowProvider } from '@/features/flow/context';
import ProgressBar from '@/features/flow/components/ProgressBar';
import { progressValue } from '@/features/flow/utils/progressValue';
import { getBusinessById } from '@/config/businesses';
import type { ScreenId } from '@/features/flow/types';

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

function LayoutShell({
  children,
  businessName,
}: {
  children: React.ReactNode;
  businessName: string;
}) {
  const pathname = usePathname();
  const screenId = getScreenId(pathname);
  const progress = screenId ? progressValue(screenId) : 0;

  // document.title runs client-side after hydration and reliably overrides
  // the server-rendered <title> tag. This is the correct approach for a
  // client layout — generateMetadata only works in server components.
  React.useEffect(() => {
    document.title = `${businessName} — LaudWell`;
  }, [businessName]);

  return (
    <div className="bg-cream flex h-dvh flex-col overflow-hidden">
      <ProgressBar value={progress} />
      <AnimatePresence mode="wait">
        <div key={pathname} className="flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}) {
  // React.use unwraps the params Promise in a client component (React 19+).
  const { businessId } = React.use(params);
  const business = getBusinessById(businessId);

  return (
    // FlowProvider must be the outermost wrapper so every child screen
    // (Screen0, Screen1, etc.) can call useFlow() without throwing.
    <FlowProvider>
      <LayoutShell businessName={business.name}>{children}</LayoutShell>
    </FlowProvider>
  );
}

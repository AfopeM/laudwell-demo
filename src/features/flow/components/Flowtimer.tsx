// src/features/flow/components/Flowtimer.tsx
'use client';

import React from 'react';
import { Clock2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useFlow } from '@/features/flow/context';

export default function FlowTimer() {
  const { flow } = useFlow();
  const pathname = usePathname();
  const isComplete = pathname?.endsWith('screen-5') ?? false;

  const [elapsed, setElapsed] = React.useState(() =>
    flow.completionStartTime ? Math.floor((Date.now() - flow.completionStartTime) / 1000) : 0,
  );

  React.useEffect(() => {
    if (!flow.completionStartTime || isComplete) return;

    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - flow.completionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(id);
  }, [flow.completionStartTime, isComplete]);

  return (
    <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-white/50 px-4 py-1 text-xs text-stone-400">
      <Clock2 className="size-4" />
      <span>{elapsed}</span>
    </div>
  );
}

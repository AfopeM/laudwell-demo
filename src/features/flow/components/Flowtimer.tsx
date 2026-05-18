'use client';

import React from 'react';
import { Clock2 } from 'lucide-react';
import { useFlow } from '@/features/flow/context';

export function FlowTimer() {
  const { flow } = useFlow();

  // Lazy initializer runs once on mount — handles mid-flow navigation
  // without needing a direct setState call inside the effect.
  const [elapsed, setElapsed] = React.useState(() =>
    flow.completionStartTime ? Math.floor((Date.now() - flow.completionStartTime) / 1000) : 0,
  );

  React.useEffect(() => {
    if (!flow.completionStartTime) return;

    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - flow.completionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(id);
  }, [flow.completionStartTime]);

  return (
    <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-white/50 px-4 py-1 text-xs text-stone-400">
      <Clock2 className="size-4" />
      <span>{elapsed}</span>
    </div>
  );
}

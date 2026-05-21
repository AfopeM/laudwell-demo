'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFlow } from '@/features/flow/context';
import Screen4High from './Screen4High';
import Screen4Low from './Screen4Low';

export default function Screen4({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { flow } = useFlow();
  const router = useRouter();
  const guarded = React.useRef(false);

  React.useEffect(() => {
    if (guarded.current) return;
    guarded.current = true;

    if (!flow.q1Answer) {
      router.replace(`/${businessId}/screen-1`);
    } else if (!flow.q2Answer) {
      router.replace(`/${businessId}/screen-2`);
    } else if (!flow.starRating) {
      router.replace(`/${businessId}/screen-3`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps intentional — run once after mount, state is stable by then

  if (flow.starRating >= 4) {
    return <Screen4High businessId={businessId} />;
  }

  return <Screen4Low businessId={businessId} />;
}

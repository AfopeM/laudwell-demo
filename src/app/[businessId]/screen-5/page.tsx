'use client';

import React from 'react';
import { useFlow } from '@/features/flow/context';
import Screen5High from './Screen5High';
import Screen5Low from './Screen5Low';

export default function Screen5({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { flow } = useFlow();

  if (flow.starRating >= 4) {
    return <Screen5High businessId={businessId} />;
  }

  return <Screen5Low businessId={businessId} />;
}

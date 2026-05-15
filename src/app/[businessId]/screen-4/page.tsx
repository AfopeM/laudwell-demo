'use client';

import React from 'react';
import { useFlow } from '@/features/flow/context';
import Screen4High from './Screen4High';
import Screen4Low from './Screen4Low';

export default function Screen4({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { flow } = useFlow();

  if (flow.starRating >= 4) {
    return <Screen4High businessId={businessId} />;
  }

  return <Screen4Low businessId={businessId} />;
}

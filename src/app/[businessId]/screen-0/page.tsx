'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';

export default function Screen0({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const business = getBusinessById(businessId);
  const { setFlow } = useFlow();
  const router = useRouter();

  function handleStart() {
    // UUID and start time are written once here.
    // They must never be overwritten for the rest of the session.
    setFlow({
      sessionId: crypto.randomUUID(),
      completionStartTime: Date.now(),
    });
    router.push(`/${businessId}/screen-1`);
  }

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-between px-6 py-16 md:mx-auto"
    >
      {/* Business identity */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-stone-400 uppercase">
          Quick review
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 uppercase">
          {business.name}
        </h1>
      </div>

      {/* Copy */}
      <p className="max-w-xs text-center text-base leading-relaxed text-stone-500">
        Share your experience at <span className="text-stone-700 capitalize">{business.name}</span>{' '}
        — takes about 60 seconds.
      </p>

      {/* CTA */}
      <button
        onClick={handleStart}
        className="w-full cursor-pointer rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
      >
        Get started
      </button>
    </motion.div>
  );
}

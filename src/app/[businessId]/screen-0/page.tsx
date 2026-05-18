'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import FlowTimer from '@/features/flow/components/Flowtimer';

export default function Screen0({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const business = getBusinessById(businessId);
  const { setFlow } = useFlow();
  const router = useRouter();

  function handleStart() {
    setFlow({
      sessionId: crypto.randomUUID(),
      completionStartTime: Date.now(),
    });
    router.push(`/${businessId}/screen-1`);
  }

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between py-4">
        <div className="text-xs font-light tracking-widest text-stone-500 uppercase">
          {business.name}
        </div>

        <FlowTimer />
      </div>

      {/* ── Body ── */}
      <div>
        {/* Logo + decorative rings */}
        <div className="relative flex justify-center">
          <div className="absolute top-1/2 h-96 w-96 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/20" />
          <div className="absolute top-1/2 h-72 w-72 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/20" />
          <div className="absolute top-1/2 h-48 w-48 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/20" />
          <div className="relative z-10 flex h-42 w-42 items-center justify-center">
            <Image
              fill
              alt={business.name}
              src={business.logoPath}
              className="object-contain"
              sizes="192px"
            />
          </div>
        </div>

        {/* Main heading */}
        <div className="px-2 text-center">
          <h1 className="font-display text-5xl font-medium tracking-tight text-stone-900">
            How was your{' '}
            <span className="text-gold block capitalize italic lg:inline">{business.name}</span>{' '}
            experience ?
          </h1>
        </div>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-md px-2 text-center leading-relaxed font-light text-stone-500">
          We would love to hear about how we did. Your feedback helps us grow and serve you better.
        </p>

        {/* Time badge */}
        <div className="mt-6 mb-28 flex justify-center">
          <div className="flex items-center gap-2 rounded-2xl border border-stone-300/70 bg-white/50 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
            <span className="text-xs font-medium tracking-widest text-stone-500 uppercase">
              Takes less than 90 seconds
            </span>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="bg-gold-dark hover:bg-gold-light mb-12 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[28px] py-5 font-medium tracking-wide text-white transition-colors ease-in-out active:scale-[0.97]"
        >
          Begin Review
          <ArrowRight className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}

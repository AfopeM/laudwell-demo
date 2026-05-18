'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import { FlowTimer } from '@/features/flow/components/Flowtimer';

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
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col justify-between px-6 font-sans"
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between py-4">
        <div className="text-xs font-light tracking-widest text-stone-500 uppercase">
          {business.name}
        </div>

        {/* Timer — shows 0 here, starts counting once user taps Begin Review */}
        <FlowTimer />
      </div>

      {/* ── Body ── */}
      <div>
        {/* Logo + decorative rings */}
        <div className="relative flex justify-center py-6">
          <div className="absolute top-1/2 h-72 w-72 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/20" />
          <div className="absolute top-1/2 h-52 w-52 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/20" />
          <div className="absolute top-1/2 h-36 w-36 -translate-y-1/2 animate-pulse rounded-full border border-stone-400/25" />
          <div className="relative z-10 flex h-48 w-48 items-center justify-center">
            <Image
              fill
              alt={business.name}
              src={business.logoPath}
              className="object-contain"
              sizes="192px"
            />
          </div>
        </div>

        {/* "YOUR EXPERIENCE" divider */}
        <div className="flex items-center justify-center gap-3 px-2">
          <div className="h-px w-12 bg-stone-300/60" />
          <span className="text-xs font-light tracking-widest text-stone-400 uppercase">
            Your Experience
          </span>
          <div className="h-px w-12 bg-stone-300/60" />
        </div>

        {/* Main heading */}
        <div className="mt-4 px-2 text-center">
          <h1 className="font-display text-5xl leading-[1.15] tracking-tight text-stone-900">
            How was your{' '}
            <span className="text-gold block capitalize italic md:inline">{business.name}</span>{' '}
            experience?
          </h1>
        </div>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-md px-2 text-center leading-relaxed font-light text-stone-500">
          We would love to hear about how we did. Your feedback helps us grow and serve you better.
        </p>

        {/* Time badge */}
        <div className="mt-6 mb-16 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/50 px-4 py-2">
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

      {/* ── Footer ── */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative h-12 w-12 opacity-50">
          <Image
            fill
            sizes="48px"
            alt="LaudWell"
            src="/laudwell-logo.png"
            className="object-contain"
          />
        </div>
        <span className="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">
          Powered by LaudWell
        </span>
      </div>
    </motion.div>
  );
}

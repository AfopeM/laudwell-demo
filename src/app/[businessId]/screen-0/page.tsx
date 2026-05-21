'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import StyledHeading from '@/features/flow/components/StyledHeading';
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
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between pt-6">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-light tracking-widest text-stone-500 uppercase">
          {business.name}
        </span>
        <FlowTimer />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        {/* ── Body — centred, no fixed margins that fight short screens ── */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo + decorative rings */}
          <div className="relative flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 scale-[1.45] animate-pulse rounded-full border border-stone-400/20" />
            <div className="absolute inset-0 scale-[1.2] animate-pulse rounded-full border border-stone-400/20" />
            <div className="relative z-10 h-full w-full">
              <Image
                fill
                sizes="112px"
                alt={business.name}
                src={business.logoPath}
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display max-w-xs text-center text-[28px] leading-[1.15] font-bold tracking-tight text-stone-900">
            <StyledHeading text="How was your experience?" word="experience" />
          </h1>

          {/* Subtext */}
          <p className="max-w-xs text-center text-[15px] leading-relaxed font-light text-stone-500">
            We&apos;d love to hear how we did. Your feedback helps us grow.
          </p>

          {/* Time badge */}
          <div className="flex items-center gap-2 rounded-2xl border border-stone-300/70 bg-white/50 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
            <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
              Takes less than 90 seconds
            </span>
          </div>
        </div>

        {/* ── CTA pinned to bottom ── */}
        <button
          onClick={handleStart}
          className="bg-gold-dark hover:bg-gold-dark/90 flex min-h-[60px] w-full cursor-pointer items-center justify-center gap-3 rounded-[28px] font-medium tracking-wide text-white transition-colors ease-in-out active:scale-[0.97]"
        >
          Begin Review
          <ArrowRight className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}

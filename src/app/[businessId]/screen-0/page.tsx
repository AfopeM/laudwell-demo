'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';

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
      className="flex flex-1 flex-col items-center justify-between px-8 py-14"
    >
      {/* Top: logo + identity */}
      <div className="flex w-full flex-col items-center gap-6">
        {/* Logo area */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={business.logoPath}
            alt={business.name}
            width={96}
            height={96}
            className="object-contain"
            onError={(e) => {
              // Fallback to initials if logo 404s
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
            Leave a review
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">{business.name}</h1>
        </div>
      </div>

      {/* Mid: copy */}
      <p className="max-w-[260px] text-center text-[15px] leading-relaxed text-stone-500">
        Two quick questions, then we&apos;ll write your review for you. Takes about 60 seconds.
      </p>

      {/* Bottom: CTA */}
      <div className="flex w-full flex-col items-center gap-3">
        <button
          onClick={handleStart}
          className="w-full rounded-2xl bg-stone-900 py-[18px] text-[15px] font-medium tracking-wide text-white transition-transform active:scale-[0.97]"
        >
          Get started
        </button>
        <p className="text-xs text-stone-400">No account needed</p>
      </div>
    </motion.div>
  );
}

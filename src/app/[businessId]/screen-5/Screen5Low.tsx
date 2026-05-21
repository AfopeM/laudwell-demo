'use client';

import { motion } from 'framer-motion';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import { ArrowRight } from 'lucide-react';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen5Low({ businessId }: { businessId: string }) {
  const business = getBusinessById(businessId);

  return (
    <motion.div {...slideTransition} className="pb-safe flex flex-1 flex-col justify-around gap-36">
      {/* ── Top: confirmation message ── */}
      <div className="flex flex-col items-center gap-4 pt-4">
        {/* Divider label */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-stone-300" />
          <span className="shrink-0 text-xs font-light tracking-widest text-stone-400 uppercase">
            All done
          </span>
          <div className="h-px w-8 bg-stone-300" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-center text-3xl leading-[1.15] font-bold tracking-tight text-stone-900">
          <StyledHeading text="Thank you for being honest with us." word="honest" />
        </h1>

        {/* Subtext */}
        <p className="text-center text-base leading-relaxed font-light text-stone-500">
          Feedback like yours is how we get better. The team will see this directly.
        </p>
      </div>

      {/* ── Bottom: optional Google CTA ── */}
      <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-light text-stone-400">
          Changed your mind? You can still leave a public review.
        </p>
        <a
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold-dark flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-3 rounded-3xl text-base font-medium text-white active:scale-[0.98]"
        >
          Leave a Google review
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}

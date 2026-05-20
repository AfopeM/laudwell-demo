'use client';

import { motion } from 'framer-motion';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen5Low({ businessId }: { businessId: string }) {
  const business = getBusinessById(businessId);

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-between py-16"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex w-1/2 items-center justify-center gap-4">
          <div className="h-0.25 flex-1 bg-stone-300" />
          <span className="text-xs font-light tracking-widest text-stone-500 uppercase">
            All done
          </span>
          <div className="h-0.25 flex-1 bg-stone-300" />
        </div>
        <h2 className="font-display max-w-md text-4xl leading-tight font-bold tracking-tight text-stone-900">
          <StyledHeading text="Thank you for being honest with us." word="honest" />
        </h2>
        <p className="text-lg text-stone-500">Feedback like yours is how we get better.</p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <p className="text-center text-sm text-stone-400">
          Changed your mind? You can still leave a Google review.
        </p>
        <Link
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex w-full max-w-lg cursor-pointer items-center justify-center gap-4 rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Leave a Google review
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

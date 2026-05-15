'use client';

import { motion } from 'framer-motion';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import Link from 'next/link';

export default function Screen5Low({ businessId }: { businessId: string }) {
  const business = getBusinessById(businessId);

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-between px-6 py-16"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
          Thank you for being honest with us.
        </h2>
        <p className="max-w-xs text-base leading-relaxed text-stone-500">
          Feedback like yours is how we get better.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <p className="text-center text-sm text-stone-400">
          Changed your mind? You can still leave a Google review.
        </p>
        <Link
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full cursor-pointer rounded-2xl border border-stone-200 bg-white py-4 text-center text-base font-medium text-stone-700 active:scale-[0.98]"
        >
          Leave a Google review
        </Link>
      </div>
    </motion.div>
  );
}

// src/app/[businessId]/screen-5/Screen5High.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';

export default function Screen5High({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const business = getBusinessById(businessId);

  const [count, setCount] = React.useState(5);
  const [cancelled, setCancelled] = React.useState(false);

  const handleRedirect = React.useCallback(() => {
    // Clipboard may silently fail on iOS (no user gesture) — that's expected.
    void navigator.clipboard.writeText(flow.finalSubmittedText ?? '').catch(() => {});
    setFlow({ googleRedirectTaken: true });
    window.open(business.googleReviewUrl, '_blank');
  }, [flow.finalSubmittedText, business.googleReviewUrl, setFlow]);

  React.useEffect(() => {
    if (cancelled) return;

    const id = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [cancelled, handleRedirect]);

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-between px-6 py-16"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-2xl">✓</span>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
          Your review has been copied
        </h2>
        <p className="max-w-xs text-base text-stone-500">Just paste it when you get to Google.</p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {!cancelled && (
          <p className="text-center text-sm text-stone-400">
            Heading to Google in {count} second{count !== 1 ? 's' : ''}...
          </p>
        )}

        <button
          onClick={handleRedirect}
          className="w-full cursor-pointer rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Take me there
        </button>

        {!cancelled && (
          <button
            onClick={() => {
              setCancelled(true);
              setFlow({ googleRedirectTaken: false });
            }}
            className="text-sm text-stone-400 underline underline-offset-2"
          >
            Prefer not to? That&#39;s completely fine.
          </button>
        )}
      </div>
    </motion.div>
  );
}

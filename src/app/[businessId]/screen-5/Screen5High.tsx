'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { ArrowRight } from 'lucide-react';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import StyledHeading from '@/features/flow/components/StyledHeading';

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
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [cancelled]);

  React.useEffect(() => {
    if (count === 0 && !cancelled) {
      handleRedirect();
    }
  }, [count, cancelled, handleRedirect]);

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
        <h2 className="font-display max-w-md text-5xl leading-tight font-bold tracking-tight text-stone-900">
          <StyledHeading text="Your review has been copied" word="copied" />
        </h2>
        <p className="max-w-xs text-lg font-light text-stone-500">
          Just paste it when you get to Google.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {!cancelled && (
          <div className="mt-6 mb-28 flex justify-center">
            <div className="flex items-center gap-2 rounded-2xl border border-stone-300/70 bg-white/50 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
              <span className="text-xs font-medium tracking-widest text-stone-500 uppercase">
                Heading to Google in {count} second{count !== 1 ? 's' : ''}...
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleRedirect}
          className="mx-auto flex w-full max-w-lg cursor-pointer items-center justify-center gap-4 rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Take me there
          <ArrowRight size={16} />
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

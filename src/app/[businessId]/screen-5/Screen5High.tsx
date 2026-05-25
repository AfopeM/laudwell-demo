'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen5High({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const business = getBusinessById(businessId);

  const [count, setCount] = React.useState(8);
  const [cancelled, setCancelled] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const reviewText = flow.finalSubmittedText ?? '';

  // Copy is its own user-gesture button — no longer tied to the redirect
  function handleCopy() {
    void navigator.clipboard.writeText(reviewText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const handleRedirect = React.useCallback(() => {
    setFlow({ googleRedirectTaken: true });
    window.open(business.googleReviewUrl, '_blank');
  }, [business.googleReviewUrl, setFlow]);

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
    if (count === 0 && !cancelled) handleRedirect();
  }, [count, cancelled, handleRedirect]);

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-center gap-8"
    >
      <div className="flex w-full flex-col gap-3 text-center">
        <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-stone-900">
          <StyledHeading text="Your review is ready to copy" word="copy" />
        </h2>

        {/* Review text */}
        <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-left shadow-sm">
          <p className="text-sm leading-relaxed text-stone-600">{reviewText}</p>
        </div>

        {/* Explicit copy button */}
        <button
          onClick={handleCopy}
          className="flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white text-sm text-stone-700 transition-colors duration-200 hover:bg-white/80 active:scale-[0.98]"
        >
          {copied ? <Check className="size-5 text-green-600" /> : <Copy className="size-5" />}
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>

      <div className="flex w-full flex-col gap-4">
        {!cancelled && (
          <div className="flex justify-center">
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
          className="bg-gold-dark mx-auto flex w-full max-w-lg cursor-pointer items-center justify-center gap-4 rounded-3xl py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Take me there
          <ArrowRight className="size-5" />
        </button>

        {!cancelled && (
          <button
            disabled={cancelled}
            onClick={() => {
              setCancelled(true);
              setFlow({ googleRedirectTaken: false });
            }}
            className="cursor-pointer text-sm font-light tracking-wider text-stone-400 underline underline-offset-2 hover:text-stone-500"
          >
            Prefer not to? That&apos;s completely fine.
          </button>
        )}
      </div>
    </motion.div>
  );
}

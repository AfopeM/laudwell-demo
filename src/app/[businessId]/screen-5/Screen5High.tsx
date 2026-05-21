'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { ArrowRight } from 'lucide-react';
import { getBusinessById } from '@/config/businesses';
import { slideTransition } from '@/features/flow/utils/transitions';
import StyledHeading from '@/features/flow/components/StyledHeading';

const COUNTDOWN_START = 5;

export default function Screen5High({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const business = getBusinessById(businessId);

  const [count, setCount] = React.useState(COUNTDOWN_START);
  const [cancelled, setCancelled] = React.useState(false);

  // Stable ref so the interval callback never captures a stale closure.
  const cancelledRef = React.useRef(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Clipboard helper (best-effort; fails silently on iOS without gesture) ───
  const copyToClipboard = React.useCallback(() => {
    void navigator.clipboard.writeText(flow.finalSubmittedText ?? '').catch(() => {});
  }, [flow.finalSubmittedText]);

  // ─── Auto-redirect (same tab) ─────────────────────────────────────────────
  // window.open(..., '_blank') is blocked by mobile browsers when called from
  // a timer callback — it is not a user gesture. window.location.href is not
  // subject to the popup blocker and works reliably in all environments.
  const autoRedirect = React.useCallback(() => {
    copyToClipboard();
    setFlow({ googleRedirectTaken: true });
    window.location.href = business.googleReviewUrl;
  }, [copyToClipboard, business.googleReviewUrl, setFlow]);

  // ─── Manual redirect (button tap = user gesture; _blank is fine here) ────
  const handleManualRedirect = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    copyToClipboard();
    setFlow({ googleRedirectTaken: true });
    window.open(business.googleReviewUrl, '_blank', 'noopener,noreferrer');
  }, [copyToClipboard, business.googleReviewUrl, setFlow]);

  // ─── Countdown ────────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (cancelled) return;

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        const next = prev - 1;
        // Stop the interval here via the ref — do NOT call clearInterval
        // inside the updater (side effect inside pure function is unsafe).
        // The check below handles the actual cleanup.
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cancelled]);

  // Stop the interval once count hits 0 and trigger the redirect.
  React.useEffect(() => {
    if (count > 0) return;
    if (cancelledRef.current) return;

    // Clear the interval first so it doesn't keep firing.
    if (intervalRef.current) clearInterval(intervalRef.current);
    autoRedirect();
  }, [count, autoRedirect]);

  // ─── Cancel handler ───────────────────────────────────────────────────────
  function handleCancel() {
    cancelledRef.current = true;
    setCancelled(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFlow({ googleRedirectTaken: false });
  }

  return (
    <motion.div
      {...slideTransition}
      className="flex flex-1 flex-col items-center justify-between py-16"
    >
      {/* ── Heading block ── */}
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

      {/* ── CTA block ── */}
      <div className="flex w-full flex-col gap-4">
        {!cancelled && (
          <div className="mt-6 mb-28 flex justify-center">
            <div className="flex items-center gap-2 rounded-2xl border border-stone-300/70 bg-white/50 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
              <span className="text-xs font-medium tracking-widest text-stone-500 uppercase">
                Heading to Google in {count} second{count !== 1 ? 's' : ''}…
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleManualRedirect}
          className="mx-auto flex w-full max-w-lg cursor-pointer items-center justify-center gap-4 rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Take me there
          <ArrowRight size={16} />
        </button>

        {!cancelled && (
          <button
            onClick={handleCancel}
            className="text-sm text-stone-400 underline underline-offset-2"
          >
            Prefer not to? That&#39;s completely fine.
          </button>
        )}
      </div>
    </motion.div>
  );
}

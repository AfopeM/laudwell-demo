'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { submitFlow } from '@/features/flow/utils/submitFlow';
import StyledHeading from '@/features/flow/components/StyledHeading';

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function Screen4Low({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const router = useRouter();
  const [feedback, setFeedback] = React.useState('');

  function handleSubmit() {
    const finalText = feedback.trim() || null;
    setFlow({ finalSubmittedText: finalText });
    submitFlow({ ...flow, finalSubmittedText: finalText }, businessId);
    router.push(`/${businessId}/screen-5`);
  }

  const wordCount = countWords(feedback);

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between py-10">
      {/* ── Header ── */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {/* Section label */}
          <span className="text-xs font-light tracking-widest text-stone-500 uppercase">
            Feedback
          </span>

          {/* Heading */}
          <h2 className="font-display text-4xl leading-tight font-bold tracking-tight text-stone-900">
            <StyledHeading text="Your feedback matters to us." word="feedback" />
          </h2>

          {/* Subtext */}
          <p className="font-light text-stone-500">
            Thank you for being honest with us. This goes directly to the team and helps us get
            better.
          </p>
        </div>

        {/* ── Feedback Card ── */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-stone-400" />
              <span className="text-xs font-medium tracking-[0.15em] text-stone-400 uppercase">
                Private Feedback
              </span>
            </div>
            <span className="text-xs text-stone-400">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          </div>

          {/* Editable textarea */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={8}
            placeholder="Anything you'd like to share? (optional)"
            className="w-full resize-none bg-white px-4 py-4 text-sm leading-relaxed text-stone-800 placeholder:text-stone-300 focus:outline-none"
          />
        </div>
      </div>

      {/* ── Submit CTA ── */}
      <button
        onClick={handleSubmit}
        className="bg-gold-dark mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-base font-medium text-white active:scale-[0.98]"
      >
        Submit Feedback
        <ArrowRight className="size-5" />
      </button>
    </motion.div>
  );
}

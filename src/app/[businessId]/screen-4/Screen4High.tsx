'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RefreshCw, PencilLine, ArrowRight } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { generateReview } from '@/features/engine/utils/assembly';
import { slideTransition } from '@/features/flow/utils/transitions';
import { submitFlow } from '@/features/flow/utils/submitFlow';
import { detectEdit } from '@/features/flow/utils/isEdited';
import StyledHeading from '@/features/flow/components/StyledHeading';

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function Screen4High({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const router = useRouter();

  const [localText, setLocalText] = React.useState(() => {
    // Only generate if we actually have valid answers
    if (!flow.q1Answer || !flow.q2Answer) return '';
    return generateReview({ q1Answer: flow.q1Answer, q2Answer: flow.q2Answer });
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [isRegenerating, setIsRegenerating] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <p className="text-sm text-stone-400">Building your review...</p>
      </div>
    );
  }

  function handleRegenerate() {
    setIsRegenerating(true);
    const regenerated = generateReview({
      q1Answer: flow.q1Answer,
      q2Answer: flow.q2Answer,
    });
    setFlow({ generatedText: regenerated });
    setLocalText(regenerated);
    setTimeout(() => setIsRegenerating(false), 300);
  }

  function handleSubmit() {
    const edited = detectEdit(localText, flow.generatedText);

    setFlow({
      generatedText: localText,
      finalSubmittedText: localText.trim(),
      isEdited: edited,
    });

    submitFlow(
      {
        ...flow,
        finalSubmittedText: localText.trim(),
        isEdited: edited,
      },
      businessId,
    );

    router.push(`/${businessId}/screen-5`);
  }

  const wordCount = countWords(localText);

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-center gap-4">
      {/* ── Header ── */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {/* Section label */}
          <span className="text-xs font-light tracking-widest text-stone-500 uppercase">
            Review
          </span>

          {/* Heading */}
          <h2 className="font-display text-4xl leading-tight font-bold tracking-tight text-stone-900">
            <StyledHeading text="Your review is ready?" word="review" />
          </h2>

          {/* Subtext */}
          <p className="font-light text-stone-500">
            We helped generate a review draft based on the options you selected. Feel free to change
            it up and add anything personal.
          </p>
        </div>

        {/* ── Draft Card ── */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <PencilLine size={14} className="text-stone-400" />
              <span className="text-xs font-medium tracking-[0.15em] text-stone-400 uppercase">
                Generated Draft
              </span>
            </div>
            <span className="text-xs text-stone-400">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          </div>

          {/* Editable textarea */}
          <textarea
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            rows={8}
            className="w-full resize-none bg-white px-4 py-4 text-sm leading-relaxed text-stone-800 focus:outline-none"
            placeholder="Your generated review will appear here..."
          />

          {/* In-card Regenerate button */}
          <div className="border-t border-stone-100 p-3">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-stone-100 py-3 text-sm text-stone-600 transition-colors hover:bg-stone-200 active:scale-[0.98] disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRegenerating ? 'animate-spin' : ''} />
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* ── Submit CTA ── */}
      <button
        onClick={handleSubmit}
        className="bg-gold-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-base font-medium text-white active:scale-[0.98]"
      >
        Submit Review
        <ArrowRight className="size-5" />
      </button>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { generateReview } from '@/features/engine/utils/assembly';
import { slideTransition } from '@/features/flow/utils/transitions';
import { submitFlow } from '@/features/flow/utils/submitFlow';
import { wordCount } from '@/features/flow/utils/wordCount';
import { detectEdit } from '@/features/flow/utils/isEdited';

function WordCountFeedback({ text }: { text: string }) {
  const bucket = wordCount(text);

  const messages: Record<typeof bucket, string> = {
    empty: "Add anything you'd like to say",
    short: 'A little more detail helps your review stand out',
    good: 'Looking good',
    great: 'Great review',
  };

  return <p className="text-sm text-stone-400">{messages[bucket]}</p>;
}

export default function Screen4High({ businessId }: { businessId: string }) {
  const { flow, setFlow } = useFlow();
  const router = useRouter();

  const [localText, setLocalText] = React.useState(() =>
    generateReview({
      q1Answer: flow.q1Answer,
      q2Answer: flow.q2Answer,
    }),
  );

  const [isLoading, setIsLoading] = React.useState(true);

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

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between px-6 py-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.2em] text-stone-400 uppercase">
            Your review
          </span>

          <p className="text-sm text-stone-500">
            Feel free to add anything personal — even one sentence makes your review stand out.
          </p>
        </div>

        <textarea
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          rows={6}
          className="w-full resize-none rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base leading-relaxed text-stone-800 focus:border-stone-400 focus:outline-none"
        />

        <WordCountFeedback text={localText} />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            const regenerated = generateReview({
              q1Answer: flow.q1Answer,
              q2Answer: flow.q2Answer,
            });

            setFlow({ generatedText: regenerated });
            setLocalText(regenerated);
          }}
          className="w-full cursor-pointer rounded-2xl border border-stone-200 bg-white py-4 text-base font-medium text-stone-700 active:scale-[0.98]"
        >
          Try another
        </button>

        <button
          onClick={() => {
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
          }}
          className="w-full cursor-pointer rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}

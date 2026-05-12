'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';

const OPTIONS = [
  'The people I dealt with were genuinely great',
  'The work itself was done properly',
  'They were completely upfront with me',
  'The whole thing just felt easy',
];

export default function Screen1({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  function handleSelect(option: string) {
    // Set local state first so the card highlights before the screen exits.
    // Navigation fires in the same handler — no setTimeout.
    setSelected(option);
    setFlow({ q1Answer: option });
    router.push(`/${businessId}/screen-2`);
  }

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between px-6 py-12">
      <div className="flex flex-col gap-8">
        {/* Question */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.2em] text-stone-400 uppercase">
            Question 1 of 2
          </span>
          <h2 className="text-2xl leading-snug font-semibold tracking-tight text-stone-900">
            What stood out most about your experience?
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={[
                'cursor-pointer rounded-2xl border px-5 py-4 text-left text-base leading-snug transition-colors duration-100',
                selected === option
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-700 active:border-stone-400 active:bg-stone-50',
              ].join(' ')}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { SCREEN_2_OPTIONS, SCREEN_2_QUESTION } from '@/config/questions';

export default function Screen2({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  function handleSelect(option: string) {
    setSelected(option);
    setFlow({ q2Answer: option });
    router.push(`/${businessId}/screen-3`);
  }

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between px-6 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.2em] text-stone-400 uppercase">
            Question 2 of 2
          </span>
          <h2 className="text-2xl leading-snug font-semibold tracking-tight text-stone-900">
            {SCREEN_2_QUESTION}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {SCREEN_2_OPTIONS.map((option) => (
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

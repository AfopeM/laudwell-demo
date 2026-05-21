'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { SCREEN_2_OPTIONS, SCREEN_2_QUESTION } from '@/config/questions';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen2({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  function handleSelect(option: string) {
    setSelected(option);
    setFlow({ q1Answer: option });
    router.push(`/${businessId}/screen-3`);
  }

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-center gap-4">
      {/* Header block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-px w-4 bg-stone-300" />
          <span className="text-[11px] font-light tracking-widest text-stone-400 uppercase">
            Question 1 of 2
          </span>
        </div>

        <h1 className="font-display text-[28px] leading-[1.15] font-bold tracking-tight text-stone-900">
          <StyledHeading text={SCREEN_2_QUESTION} word="service" />
        </h1>
      </div>

      {/* Option cards */}
      <div className="flex flex-col gap-3">
        {SCREEN_2_OPTIONS.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={[
                'flex w-full cursor-pointer items-center gap-4 rounded-3xl border px-5 text-left transition-all duration-150 active:scale-[0.98]',
                'min-h-[72px]',
                isSelected
                  ? 'border-stone-800 bg-stone-900 text-white shadow-md'
                  : 'border-stone-200 bg-white/70 text-stone-700 shadow-sm hover:border-stone-300 hover:bg-white',
              ].join(' ')}
            >
              {/* Indicator dot */}
              <span
                className={[
                  'h-5 w-5 shrink-0 rounded-full border transition-colors duration-150',
                  isSelected ? 'border-white/40 bg-white/20' : 'border-stone-200 bg-stone-300',
                ].join(' ')}
              />
              <span className="text-[15px] leading-snug font-light tracking-wide">{option}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

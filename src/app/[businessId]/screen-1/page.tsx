'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { SCREEN_1_OPTIONS, SCREEN_1_QUESTION } from '@/config/questions';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen1({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  function handleSelect(option: string) {
    setSelected(option);
    setFlow({ q1Answer: option });
    router.push(`/${businessId}/screen-2`);
  }

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between pt-12 pb-8">
      {/* Top content block */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="h-px w-5 bg-stone-400/50" />
            <span className="text-xs font-light tracking-widest text-stone-400 uppercase">
              Question 1 of 2
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900">
            <StyledHeading text={SCREEN_1_QUESTION} word="experience" />
          </h2>
        </div>

        {/* Option cards */}
        <div className="flex flex-col gap-4">
          {SCREEN_1_OPTIONS.map((option) => {
            const isSelected = selected === option;
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={[
                  'flex cursor-pointer items-center gap-4 rounded-[36px] border border-stone-300/70 bg-white/50 px-4 py-8 text-left shadow-sm transition-colors duration-100 hover:bg-white/80',
                  isSelected ? 'bg-stone-900' : 'bg-white text-stone-700 active:bg-stone-50',
                ].join(' ')}
              >
                {/* Filled circle */}
                <span
                  className={[
                    'h-6 w-6 shrink-0 rounded-full border border-stone-300/70 bg-white',
                    isSelected ? 'bg-white/25' : 'bg-gold-dark',
                  ].join(' ')}
                />
                <span className="text-sm font-light tracking-wide">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

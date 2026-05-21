'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { snapRating } from '@/features/engine/utils/snapRating';
import StyledHeading from '@/features/flow/components/StyledHeading';

export default function Screen3({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();

  const [rating, setRating] = React.useState<number>(3);

  const snapped = snapRating(rating);
  const fillPercent = ((rating - 1) / 4) * 100;

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-center gap-32">
      {/* ── Body ── */}
      <div className="flex flex-col items-center gap-6">
        {/* Label + heading */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-stone-300" />
            <span className="text-xs font-light tracking-widest text-stone-400 uppercase">
              Rating
            </span>
          </div>
          <h1 className="font-display text-[28px] leading-[1.15] font-bold tracking-tight text-stone-900">
            <StyledHeading text="How would you rate your experience?" word="rate" />
          </h1>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={52}
              fill={star <= snapped ? '#e6c02a' : 'transparent'}
              stroke={star <= snapped ? '#e6c02a' : '#c5bfaf'}
              strokeWidth={1.4}
              className="transition-colors duration-100"
            />
          ))}
        </div>

        {/* Current rating label */}
        <p className="text-[13px] font-light tracking-wide text-stone-400">{snapped} out of 5</p>

        {/* Slider */}
        <input
          type="range"
          min={1}
          max={5}
          step={0.01}
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          style={{
            background: `linear-gradient(to right, #1c1917 0%, #1c1917 ${fillPercent}%, #d6d3d1 ${fillPercent}%, #d6d3d1 100%)`,
          }}
          className={[
            'w-full cursor-pointer appearance-none rounded-full',
            '[&::-webkit-slider-runnable-track]:h-[14px] [&::-webkit-slider-runnable-track]:rounded-full',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:h-[32px] [&::-webkit-slider-thumb]:w-[32px]',
            '[&::-webkit-slider-thumb]:mt-[-9px]',
            '[&::-webkit-slider-thumb]:bg-gold-dark',
            // Firefox
            '[&::-moz-range-thumb]:h-[32px] [&::-moz-range-thumb]:w-[32px]',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:bg-gold-dark',
          ].join(' ')}
        />
      </div>

      {/* ── Continue button ── */}
      <button
        onClick={() => {
          setFlow({ starRating: snapped });
          router.push(`/${businessId}/screen-4`);
        }}
        className="bg-gold-dark flex min-h-[60px] w-full cursor-pointer items-center justify-center gap-3 rounded-[28px] text-base font-medium text-white transition-colors active:scale-[0.98]"
      >
        Continue
        <ArrowRight className="size-5" />
      </button>
    </motion.div>
  );
}

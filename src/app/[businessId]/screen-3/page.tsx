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

  // (rating - min) / (max - min) * 100
  const fillPercent = ((rating - 1) / 4) * 100;

  const starRows = [
    [1, 2, 3],
    [4, 5],
  ];

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between py-8">
      {/* ── Body ── */}
      <div className="mt-8 flex flex-col items-center gap-8">
        {/* Label + heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-light tracking-widest text-stone-400 uppercase">
            Rating
          </span>
          <h2 className="font-display max-w-md text-3xl leading-tight font-medium tracking-tight text-stone-900">
            <StyledHeading text="How would you rate your experience?" word="rate" />
          </h2>
        </div>

        {/* Stars — 3 on top row, 2 on bottom row */}
        <div className="mb-12 flex flex-col items-center gap-3">
          {starRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center gap-3">
              {row.map((star) => (
                <Star
                  key={star}
                  size={80}
                  fill={star <= snapped ? '#e6c02aff' : 'transparent'}
                  stroke={star <= snapped ? '#e6c02aff' : '#c5bfaf'}
                  strokeWidth={1.4}
                />
              ))}
            </div>
          ))}
        </div>

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
          className="[&::-webkit-slider-thumb]:bg-gold-dark w-2/3 cursor-pointer appearance-none rounded-full [&::-webkit-slider-runnable-track]:h-[12px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-[24px] [&::-webkit-slider-thumb]:w-[24px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>

      {/* ── Continue button ── */}
      <button
        onClick={() => {
          setFlow({ starRating: snapped });
          router.push(`/${businessId}/screen-4`);
        }}
        className="bg-gold-dark flex w-full cursor-pointer items-center justify-center gap-3 rounded-[28px] py-5 text-base font-medium text-white transition-colors active:scale-[0.98]"
      >
        Continue
        <ArrowRight className="size-5" />
      </button>
    </motion.div>
  );
}

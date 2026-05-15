'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { snapRating } from '@/features/engine/utils/snapRating';

export default function Screen3({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = React.use(params);
  const { setFlow } = useFlow();
  const router = useRouter();

  const [rating, setRating] = React.useState<number>(3);

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between px-6 py-12">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.2em] text-stone-400 uppercase">
            Almost there
          </span>
          <h2 className="text-2xl leading-snug font-semibold tracking-tight text-stone-900">
            Overall, how would you rate your experience?
          </h2>
        </div>

        <div className="flex items-end justify-between px-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const snapped = snapRating(rating);
            const filled = star <= snapped;
            const isSelected = star === snapped;
            return (
              <Star
                key={star}
                size={isSelected ? 40 : 32}
                className="transition-all duration-150"
                fill={filled ? '#1c1917' : 'transparent'}
                stroke={filled ? '#1c1917' : '#d6d3d1'}
                strokeWidth={1.5}
              />
            );
          })}
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={0.01}
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          className="w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-stone-200 [&::-webkit-slider-thumb]:mt-[-8px] [&::-webkit-slider-thumb]:h-[19px] [&::-webkit-slider-thumb]:w-[19px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-900"
        />
      </div>

      <button
        onClick={() => {
          const snapped = snapRating(rating);
          setFlow({ starRating: snapped });
          router.push(`/${businessId}/screen-4`);
        }}
        className="w-full cursor-pointer rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
      >
        Confirm
      </button>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFlow } from '@/features/flow/context';
import { slideTransition } from '@/features/flow/utils/transitions';
import { submitFlow } from '@/features/flow/utils/submitFlow';

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

  return (
    <motion.div {...slideTransition} className="flex flex-1 flex-col justify-between px-6 py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-base leading-relaxed text-stone-600">
            Thank you for being honest with us. Feedback like yours is how we get better.
          </p>
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Anything you'd like to share? (optional)"
          rows={5}
          className="w-full resize-none rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base leading-relaxed text-stone-800 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full cursor-pointer rounded-2xl bg-stone-900 py-4 text-base font-medium text-white active:scale-[0.98]"
      >
        Submit
      </button>
    </motion.div>
  );
}

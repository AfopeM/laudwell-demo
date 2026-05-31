'use client';

import type { ClosingCtaContent } from '../types';

interface Props {
  content: ClosingCtaContent;
}

export const ClosingCtaSection = ({ content }: Props) => {
  function handleCtaClick() {
    // Replace with: window.open('https://cal.com/yourname', '_blank')
    alert('Demo booking coming soon.');
  }

  return (
    <section id="closing-cta" className="bg-stone-900 px-6 py-32">
      <div className="mx-auto max-w-2xl">
        {/* Decorative top rule */}
        <div className="mb-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-stone-700" />
          <span className="font-display text-xs tracking-widest text-stone-600 uppercase">
            LaudWell
          </span>
          <div className="h-px flex-1 bg-stone-700" />
        </div>

        {/* Heading */}
        <h2 className="font-display mb-6 text-center text-4xl leading-[1.1] font-bold tracking-tight text-stone-100 md:text-5xl">
          {content.heading}
        </h2>

        {/* Body */}
        <p className="mx-auto mb-10 max-w-md text-center text-lg leading-relaxed font-light text-stone-400">
          {content.body}
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={handleCtaClick}
            className="bg-gold-dark hover:bg-gold group relative overflow-hidden rounded-full px-10 py-4 text-base font-medium text-white shadow-xl shadow-stone-950/40 transition-all duration-200 active:scale-[0.97]"
          >
            {content.ctaLabel}
          </button>
        </div>

        {/* Supporting line */}
        <p className="mt-6 text-center text-sm font-light text-stone-600">
          {content.supportingLine}
        </p>
      </div>
    </section>
  );
};

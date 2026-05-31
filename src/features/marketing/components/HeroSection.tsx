'use client';

import type { HeroContent } from '../types';

interface Props {
  content: HeroContent;
}

export const HeroSection = ({ content }: Props) => {
  function handleCtaClick() {
    const el = document.getElementById('closing-cta');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      {/* Label */}
      <span className="border-gold/40 bg-gold/10 text-gold mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-widest uppercase">
        {content.label}
      </span>

      {/* Heading */}
      <h1 className="font-display mx-auto mb-6 max-w-3xl text-5xl leading-[1.1] font-bold tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
        {content.heading}
      </h1>

      {/* Subheading */}
      <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed font-light text-stone-500">
        {content.subheading}
      </p>

      {/* CTA */}
      <button
        onClick={handleCtaClick}
        className="bg-gold-dark hover:bg-gold rounded-[28px] px-8 py-4 text-base font-medium text-white transition-colors duration-200 active:scale-[0.97]"
      >
        {content.ctaLabel}
      </button>

      {/* Decorative divider */}
      <div className="mt-24 flex items-center gap-4 opacity-30">
        <div className="h-px w-16 bg-stone-400" />
        <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">scroll</span>
        <div className="h-px w-16 bg-stone-400" />
      </div>
    </section>
  );
};

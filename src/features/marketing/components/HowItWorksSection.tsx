import type { HowItWorksContent } from '../types';

interface Props {
  content: HowItWorksContent;
}

export const HowItWorksSection = ({ content }: Props) => {
  return (
    <section id="how-it-works" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gold/60 h-px w-6" />
            <span className="text-gold text-xs font-light tracking-widest uppercase">
              How it works
            </span>
          </div>
          <h2 className="font-display max-w-sm text-4xl leading-[1.1] font-bold tracking-tight text-stone-900 md:text-5xl">
            {content.heading}
          </h2>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid gap-0 md:grid-cols-3">
          {content.steps.map((step, i) => (
            <div
              key={step.number}
              className={[
                'relative flex flex-col gap-5 py-10',
                'md:border-t-2 md:border-t-stone-200 md:pt-10 md:pr-10 md:pb-0',
                i > 0
                  ? 'border-t border-stone-200 md:border-t-2 md:border-l md:border-l-0 md:pl-10'
                  : '',
              ].join(' ')}
            >
              {/* Step number — large, ghost style */}
              <span className="font-display text-[4rem] leading-none font-bold text-stone-200 select-none">
                0{step.number}
              </span>

              {/* Active indicator on the top border */}
              <div className="bg-gold absolute top-[-2px] left-0 hidden h-0.5 w-12 md:block" />

              <p className="text-base leading-relaxed font-light text-stone-600">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Time callout */}
        <div className="mt-16 flex items-center gap-4 border-t border-stone-200 pt-8">
          <div className="bg-gold/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <span className="font-display text-gold text-sm font-bold">90s</span>
          </div>
          <p className="text-sm font-light text-stone-500">
            Average time from link click to review posted. Measured across real sessions.
          </p>
        </div>
      </div>
    </section>
  );
};

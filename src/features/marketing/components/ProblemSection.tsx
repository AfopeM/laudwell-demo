import type { ProblemContent } from '../types';

interface Props {
  content: ProblemContent;
}

export const ProblemSection = ({ content }: Props) => {
  return (
    <section className="bg-stone-900 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-24">
          {/* Left — heading column */}
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="bg-gold/60 h-px w-6" />
                <span className="text-gold/70 text-xs font-light tracking-widest uppercase">
                  The problem
                </span>
              </div>
              <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-stone-100 md:text-5xl">
                {content.heading}
              </h2>
            </div>

            {/* Decorative large quote mark */}
            <span className="font-display hidden text-[10rem] leading-none font-bold text-stone-700 select-none md:block">
              &ldquo;
            </span>
          </div>

          {/* Right — body column */}
          <div className="flex flex-col justify-center gap-6 border-l border-stone-700 pl-10">
            {content.body.map((paragraph, i) => (
              <p
                key={i}
                className={[
                  'text-lg leading-relaxed font-light',
                  i === content.body.length - 1 ? 'font-normal text-stone-200' : 'text-stone-400',
                ].join(' ')}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

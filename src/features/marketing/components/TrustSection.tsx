import type { TrustContent } from '../types';

interface Props {
  content: TrustContent;
}

export const TrustSection = ({ content }: Props) => {
  return (
    <section id="trust" className="bg-stone-900 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gold/60 h-px w-6" />
            <span className="text-gold/70 text-xs font-light tracking-widest uppercase">
              Industry reality
            </span>
          </div>
          <h2 className="font-display max-w-xl text-4xl leading-[1.1] font-bold tracking-tight text-stone-100 md:text-5xl">
            {content.heading}
          </h2>
        </div>

        {/* Stats — large cards */}
        <div className="mb-16 grid gap-px bg-stone-700 md:grid-cols-3">
          {content.stats.map((stat, i) => (
            <div key={i} className="flex flex-col justify-between gap-6 bg-stone-900 p-8">
              <span className="font-display text-gold text-6xl leading-none font-bold md:text-7xl">
                {stat.value}
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-base leading-relaxed font-light text-stone-300">{stat.label}</p>
                {stat.source && (
                  <span className="text-[10px] tracking-widest text-stone-600 uppercase">
                    {stat.source}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Closing pull quote */}
        <div className="flex items-start gap-6">
          <div className="bg-gold/50 mt-1 h-12 w-0.5 shrink-0" />
          <p className="text-xl leading-relaxed font-light text-stone-300 italic md:text-2xl">
            {content.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
};

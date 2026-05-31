import type { AudienceContent } from '../types';

interface Props {
  content: AudienceContent;
}

export const AudienceSection = ({ content }: Props) => {
  return (
    <section id="audience" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:gap-24">
          {/* Left — heading + body */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gold/60 h-px w-6" />
                <span className="text-gold text-xs font-light tracking-widest uppercase">
                  Who it&apos;s for
                </span>
              </div>
              <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-stone-900 md:text-5xl">
                {content.heading}
              </h2>
            </div>
            <p className="text-lg leading-relaxed font-light text-stone-600">{content.body}</p>
          </div>

          {/* Right — trades list as stacked pills */}
          <div className="flex flex-col justify-center">
            <ul className="flex flex-col gap-2">
              {content.trades.map((trade) => (
                <li
                  key={trade}
                  className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-sm font-light text-stone-700 shadow-sm"
                >
                  <span className="bg-gold h-1.5 w-1.5 shrink-0 rounded-full" />
                  {trade}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

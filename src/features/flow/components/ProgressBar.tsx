import Flowtimer from './Flowtimer';

interface Props {
  value: number; // 0–100
}

export default function ProgressBar({ value }: Props) {
  // erive step from value: 20% = step 1, 40% = step 2, …, 0% = welcome (hidden)
  const step = Math.round(value / 20);
  const showLabels = step > 0;

  return (
    <div className="flex items-center gap-3 py-8">
      {/* Left label — blank on welcome screen */}
      <span className="w-12 shrink-0 text-xs text-stone-500 uppercase">
        {showLabels ? `${step} of 5` : ''}
      </span>

      {/* Progress track */}
      <div className="h-2 flex-1 rounded-full bg-stone-300">
        <div
          className="h-full rounded-full bg-stone-900 transition-all duration-300 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>

      {/* Right label — clock + elapsed seconds */}
      <Flowtimer />
    </div>
  );
}

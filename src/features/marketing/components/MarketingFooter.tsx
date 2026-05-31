export const MarketingFooter = () => {
  return (
    <footer className="bg-stone-950 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <span className="font-display text-sm font-bold tracking-tight text-stone-500">
          LaudWell
        </span>
        <p className="text-xs font-light text-stone-700">
          &copy; {new Date().getFullYear()} LaudWell. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

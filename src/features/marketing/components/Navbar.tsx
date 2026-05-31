'use client';

import React from 'react';
import Image from 'next/image';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={[
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-stone-200/60 bg-white/80 shadow-sm backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7">
            <Image
              fill
              sizes="28px"
              alt="LaudWell"
              src="/laudwell-logo.png"
              className="object-contain"
            />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-stone-900">
            LaudWell
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden items-center gap-8 md:flex">
          {[
            { label: 'How it works', id: 'how-it-works' },
            { label: 'Why it matters', id: 'trust' },
            { label: "Who it's for", id: 'audience' },
          ].map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="text-sm font-light tracking-wide text-stone-500 transition-colors hover:text-stone-900"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('closing-cta')}
          className="bg-gold-dark hover:bg-gold rounded-full px-5 py-2 text-sm font-medium text-white transition-colors duration-200 active:scale-[0.97]"
        >
          Book a Demo
        </button>
      </nav>
    </header>
  );
};

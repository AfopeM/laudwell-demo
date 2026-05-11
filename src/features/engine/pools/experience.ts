import type { Tone } from '../types';

export const experiencePool: Record<string, Record<Tone, string[]>> = {
  'experience.transparent': {
    warm: [
      'They were completely upfront about everything — costs, timeline, what to expect. No guessing games.',
      'No hidden surprises. Everything was explained clearly before any work started, which I genuinely appreciated.',
      'The honesty stood out. They told me exactly what was needed and why, without any fluff.',
    ],
    reassuring: [
      'Full transparency throughout — pricing, process, what they found. Nothing was left unclear.',
      'Everything was explained plainly before they started. No vague estimates, no surprise charges at the end.',
      'You always knew exactly where things stood. That kind of clarity is genuinely reassuring.',
    ],
    conversational: [
      "Straight with me from the start — here's what's needed, here's what it'll cost, here's when it'll be done. Brilliant.",
      'No smoke and mirrors. Just honest, clear communication. Rare, and massively appreciated.',
      'Actually told me what was going on rather than just cracking on with it. Really liked that.',
    ],
  },

  'experience.smooth': {
    warm: [
      'The whole thing was seamless from start to finish — from the first contact right through to the end.',
      'Everything flowed so naturally. No friction, no confusion, just a really easy experience.',
      'From the first contact to the job being done, every step was handled well.',
    ],
    reassuring: [
      'The whole process was clearly structured and well-run. Every step was explained and executed cleanly.',
      'No rough edges anywhere. Exactly the kind of organised operation you want.',
      'Everything was well-coordinated — nothing felt improvised or left to chance.',
    ],
    conversational: [
      'The whole thing just... ran smoothly. No hiccups, no awkward moments, nothing to complain about.',
      'Completely hassle-free from start to finish. More businesses should work this way.',
      "Easy to book, easy to deal with, easy everything. Stress-free — and that's not something I say often.",
    ],
  },
};

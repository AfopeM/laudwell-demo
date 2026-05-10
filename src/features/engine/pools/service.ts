import type { Tone } from '../types';

export const servicePool: Record<string, Record<Tone, string[]>> = {
  'service.effective': {
    warm: [
      'The treatment made a real difference — I left feeling noticeably better than when I arrived.',
      "I can actually feel the improvement. Whatever they did, it worked — and I'm genuinely grateful.",
      'The results have been real and meaningful. This is what good care looks like.',
    ],
    reassuring: [
      'The treatment was effective and well-explained. I understood exactly what was happening and why.',
      'I left with measurable improvement and a clear understanding of my next steps.',
      'The outcome has been exactly what I was hoping for. Competent, effective, and thorough.',
    ],
    conversational: [
      "It actually worked. Which sounds obvious, but that's not always a given — genuinely impressed.",
      "Came in with a problem, left with it sorted. That's all you want, really.",
      'Could already feel the difference by the time I got home. Really happy with the results.',
    ],
  },

  'service.smooth': {
    warm: [
      'The whole experience was seamless from start to finish — booking, arrival, treatment, all of it.',
      'Everything flowed so naturally. No friction, no confusion, just a really smooth experience.',
      'From the moment I booked to the moment I left, every step was easy and well-handled.',
    ],
    reassuring: [
      'The process was clearly structured and well-run. Every step was explained and executed cleanly.',
      'No rough edges anywhere in the experience. Exactly the kind of organised practice you want.',
      'Everything was coordinated well. Nothing left to chance, nothing that felt improvised.',
    ],
    conversational: [
      'The whole thing just ran smoothly. No hiccups, no awkward moments, nothing to complain about.',
      'Completely hassle-free from start to finish. More places should work this way.',
      "Easy booking, easy visit, easy everything. Honestly stress-free — which isn't something I say often.",
    ],
  },

  'service.enthusiastic': {
    warm: [
      "I can't recommend this place highly enough. If you're even considering it, just go.",
      "Honestly one of the best experiences I've had. Don't hesitate — you'll be looked after properly.",
      "I've already told people about this place. Extraordinary experience from beginning to end.",
    ],
    reassuring: [
      'Every aspect of the visit exceeded my expectations. I would recommend this without any reservations.',
      "If you're looking for somewhere you can genuinely trust, this is it. Exceptional across the board.",
      'This is the standard every practice should be held to. Outstanding in every respect.',
    ],
    conversational: [
      "Just go. Seriously. You'll thank yourself for it.",
      "I don't throw around five-star reviews lightly. This one was completely earned.",
      'No notes. None. Best experience I could have asked for.',
    ],
  },
};

import type { Tone } from '../types';

export const outcomePool: Record<string, Record<Tone, string[]>> = {
  'outcome.quality': {
    warm: [
      'The work itself was done to a really high standard. You can tell the difference when something has been done properly.',
      // 'The results speak for themselves. Whatever the problem was, it got fixed and fixed well.',
      'The quality of the work was exactly what I was hoping for.',
    ],
    reassuring: [
      // 'The work was thorough and well-executed. I understood what had been done and why at every step.',
      // 'Everything was completed to a high standard and explained clearly. Exactly what a good outcome looks like.',
      // 'Solid, competent work from start to finish. The kind of result that gives you real confidence.',
    ],
    conversational: [
      // "The work was just done properly. Sounds simple, but it's not always a given.",
      // "Came in with a problem, left without one. Can't really ask for more than that.",
      "The results were noticeably good. Not sure what they did I dont think I'll be having any issues any time soon.",
    ],
  },

  'outcome.enthusiastic': {
    warm: [
      "I really can't recommend them highly enough. If you're on the fence, just go ahead and book it.",
      "One of the genuinely good experiences I've had with any kind of home service in a long time.",
      "I've already passed their details on to a couple of people. That's usually how I know something was actually worth it.",
    ],
    reassuring: [
      "Every part of the experience exceeded what I was expecting. I'd recommend them without any reservations.",
      "If you're looking for somewhere you can trust to do the job properly, this is it.",
      "I'd go back without hesitation. Everything about the experience was exactly right.",
    ],
    conversational: [
      "Just genuinely impressed. Didn't see that coming but very glad I used them.",
      'No complaints at all. Which honestly is the best thing I can say.',
      "I was telling people about it the same week. That's how good it was.",
    ],
  },
};

import type { Tone } from '../types';

export const outcomePool: Record<string, Record<Tone, string[]>> = {
  'outcome.quality': {
    warm: [
      'The work made a real difference came in with a problem and left without one.',
      'The results have been real and lasting. This is what quality work actually looks like.',
      'Did exactly what they said they would. The quality speaks for itself.',
    ],
    reassuring: [
      'The work was solid and well-explained I understood what was being done and why at every stage.',
      'Left with the problem sorted and a clear understanding of what had been done. Exactly what you want.',
      "The outcome was exactly what I'd hoped for. Competent, thorough, and reliable.",
    ],
    conversational: [
      "It actually worked. Which sounds obvious but genuinely isn't always a given really impressed.",
      "Came in with a problem, left without one. That's honestly all you want.",
      'Could tell the difference straight away. Really, really happy with the result.',
    ],
  },

  'outcome.enthusiastic': {
    warm: [
      "Can't recommend these people highly enough. If you're even considering it just go.",
      "One of the best experiences I've had with any business in a long time. Don't hesitate.",
      "I've already told people about them. Genuinely outstanding from start to finish.",
    ],
    reassuring: [
      'Every aspect of the experience exceeded my expectations. Would recommend without any reservations.',
      "If you're looking for somewhere you can genuinely trust, this is it. Exceptional across the board.",
      'This is the standard every business should be held to. Outstanding in every respect.',
    ],
    conversational: [
      "Just use them, seriously you'll thank yourself for it.",
      "I don't throw around five-star reviews lightly this one was completely, completely earned.",
      'No notes. None. Best experience I could have asked for.',
    ],
  },
};

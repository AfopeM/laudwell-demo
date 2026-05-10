import type { Tone } from '../types';

export const closingPool: Record<'default', Record<Tone, string[]>> = {
  default: {
    warm: [
      "I'll definitely be back, and I'd recommend this place to anyone without hesitation.",
      'Would absolutely recommend, really glad I came.',
      "One of the best experiences I've had at a business like this. Will be returning.",
    ],
    reassuring: [
      'I would have no hesitation recommending this to anyone looking for reliable, quality service.',
      'Confident recommending this place everything was handled exactly as it should be.',
      'Would return without question. Exactly the kind of experience you hope for.',
    ],
    conversational: [
      "Genuinely can't fault it. Would recommend to literally anyone.",
      "10/10 would go back. Just go you won't regret it.",
      'Already recommended it to a few people. Do yourself a favour and check it out.',
    ],
  },
};

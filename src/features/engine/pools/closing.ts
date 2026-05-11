import type { Tone } from '../types';

export const closingPool: Record<'default', Record<Tone, string[]>> = {
  default: {
    warm: [
      "I'll definitely be going back, and I'd recommend them to anyone without hesitation.",
      'Would absolutely recommend. Really glad I found them.',
      "One of the best experiences I've had. Will definitely be going back.",
    ],
    reassuring: [
      'Would have no hesitation recommending this. Everything was handled exactly as it should be.',
      'Confident recommending to anyone looking for reliable, quality work.',
      'Would return without question. Exactly the kind of experience you hope for.',
    ],
    conversational: [
      "Genuinely can't fault it. Would recommend to literally anyone.",
      "10/10 would use again. Just go you won't regret it.",
      'Already told a few people about them. Do yourself a favour and give them a call.',
    ],
  },
};

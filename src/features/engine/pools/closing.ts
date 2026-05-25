import type { Tone } from '../types';

export const closingPool: Record<'default', Record<Tone, string[]>> = {
  default: {
    warm: [
      'I have already passed their number on to a few people. When you find people this good, you have to spread the word.',
      "They're saved in my phone now. If something else comes up at the house, they're the first call I'm making.",
      "I'm really glad I went with them. I would call them again without a second thought.",
    ],
    reassuring: [
      "I'd have no hesitation calling them again.",
      "They've earned a permanent spot in my contacts.",
      "They're exactly what you want from any home service.",
    ],
    conversational: [
      "I saved their number. Honestly, that's the highest compliment I can give.",
      "If something else goes wrong at home, these are the people I'm calling. No question.",
      "I told my neighbour about them the same week. They're genuinely good at what they do.",
    ],
  },
};

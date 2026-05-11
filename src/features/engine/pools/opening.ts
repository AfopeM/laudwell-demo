import type { Tone } from '../types';

export const openingPool: Record<'default', Record<Tone, string[]>> = {
  default: {
    warm: [
      "I don't usually bother writing reviews, but this one genuinely deserved it.",
      'Had such a good experience I felt like I had to say something.',
      'Left feeling really well looked after and wanted to make sure other people knew.',
    ],
    reassuring: [
      'From start to finish, everything was handled exactly the way it should be.',
      'Came in not quite sure what to expect. Left completely reassured.',
      'This is what it looks like when a business actually delivers on what it promises.',
    ],
    conversational: [
      "Genuinely didn't expect much, honestly. Was really impressed.",
      'Had a great experience and just felt like I should leave a review.',
      "If you're on the fence about using them this is your sign.",
    ],
  },
};

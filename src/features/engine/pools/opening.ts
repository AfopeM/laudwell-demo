import type { Tone } from '../types';

export const openingPool: Record<'default', Record<Tone, string[]>> = {
  default: {
    warm: [
      "I don't usually write reviews, but my experience here genuinely deserved one.",
      'I had such a positive experience that I felt compelled to share it.',
      'I walked away feeling really well looked after and wanted to make sure others knew.',
    ],
    reassuring: [
      'From start to finish, everything about my visit was handled professionally.',
      'I came in a little unsure of what to expect and left completely reassured.',
      'This is the kind of place that actually delivers on what it promises.',
    ],
    conversational: [
      "Honestly, I wasn't expecting much but I was really impressed.",
      'Just had a great experience here and had to leave a review.',
      "If you're on the fence about coming here, this is your sign to go.",
    ],
  },
};

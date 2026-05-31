import type { Tone } from '../types';

export const experiencePool: Record<string, Record<Tone, string[]>> = {
  'experience.transparent': {
    warm: [
      'They told me exactly what was needed before touching anything. There were no surprise charges at the end.',
      "The quote they gave me was the price I paid. I really appreciate that there weren't any surprises.",
      "They were completely upfront about what the job involved and what it would cost. I didn't feel like I was being upsold.",
    ],
    reassuring: [
      'They were fully transparent throughout. They told me what they found, what it would take to fix. I liked that everything was clearly laid out.',
      'They explained every part of the job before they started it. I always knew exactly what was going on.',
      "Unlike other places they didn't hit me with vague estimates, the number they quoted was the number I paid.",
    ],
    conversational: [
      'They told me straight up what the problem was and what it would cost to fix. They werent trying to upsell me on things I didnt need.',
      "They checked with me before doing anything extra. I appreciated that they didn't just add it to the bill.",
      "I was quoted a price and they stuck to it. I know that sounds basic, but you'd be shocked how often that's happened.",
    ],
  },

  'experience.smooth': {
    warm: [
      'From the moment I called them to the moment they finished the job, everything just ran so smoothly.',
      'Booking them was easy, and so was dealing with them on the day of the job. The whole thing was genuinely stress-free.',
      "They made every step straightforward. They told me what to expect, and didn't change things around last minute.",
    ],
    reassuring: [
      'Nothing they did felt rushed, their whole process was very clear and organised.',
      'They showed up on time with everything they needed. No wasted trips or excuses about having to reorder parts.',
      "I didn't have to reschedule anything or waste half a day waiting for them to finish the job.",
    ],
    conversational: [
      'I really have nothing to complain about. My entire experinece with them was flawless.',
      'Their service was easy to book, they showed up did the job and left. I wish more companies were like this.',
      "I didn't have to chase anyone or rebook multiple times, they handled everything so professionally.",
    ],
  },
};

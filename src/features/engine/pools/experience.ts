import type { Tone } from '../types';

export const experiencePool: Record<string, Record<Tone, string[]>> = {
  'experience.transparent': {
    warm: [
      'They told me exactly what was needed before touching anything. No guessing or surprise charges at the end.',
      "The quote they gave me was the price I paid. That's not something I take for granted.",
      "They were completely upfront about what the job involved and what it would cost. I didn't feel like I was being managed.",
    ],
    reassuring: [
      'They were fully transparent throughout. They told me what they found, what it would take to fix. Everything was clearly laid out.',
      'They explained every part of the job before they started it. I always knew exactly what was going on.',
      "Unlike other places they didn't hit me with vague estimates, the number they quoted was the number I paid.",
    ],
    conversational: [
      'They told me straight up what the problem was and what it would cost to fix. No padding or upselling.',
      "They asked before doing anything extra. They didn't just add it to the bill and hope I wouldn't notice.",
      'I was quoted a price and they stuck to it. I know that sounds basic, but it means a lot.',
    ],
  },

  'experience.smooth': {
    warm: [
      'From the first call to the job being finished, everything just ran cleanly, no hiccups.',
      'Booking them was easy, and so was dealing with them on the day of the job. The whole thing was genuinely stress-free.',
      "They made every step straightforward. They told me what to expect, and didn't change things around last minute.",
    ],
    reassuring: [
      'Nothing they did felt rushed, their whole process was clear and organised.',
      'They also showed up on time with everything they needed. No wasted trips or excuses about having to reorder parts.',
      'I never had to reschedule anything or waste half a day waiting for them to finish the job.',
    ],
    conversational: [
      'I really have nothing to complain about. The whole process just ran smoothly.',
      'Their service was easy to book, they showed up did the job and left. I wish more companies were like this.',
      "I didn't have to chase anyone or rebook. They just handled it.",
    ],
  },
};

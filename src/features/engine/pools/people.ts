import type { Tone } from '../types';

export const peoplePool: Record<string, Record<Tone, string[]>> = {
  'people.warm': {
    warm: [
      'The people there made the whole thing feel easy. You could tell they actually cared about doing a good job, not just getting through it.',
      'Everyone I dealt with was warm and genuinely attentive. It made a real difference to how the whole experience felt.',
      'From the first person I spoke to, there was a real sense that they were looking after me. Not rushed, not dismissive.',
    ],
    reassuring: [
      'The team were calm and measured throughout. I never felt like I was being pushed along or kept in the dark.',
      'Everyone was professional without being cold. They took the time to explain things and made sure I was comfortable before moving on.',
      'The people I dealt with were thorough and reassuring. I always knew what was happening and why.',
    ],
    conversational: [
      'The people there were just genuinely lovely. Not in a forced way, just actually pleasant to deal with.',
      'Everyone was friendly and easy to talk to. It made the whole thing feel way less stressful than I expected.',
      'They actually listened, which sounds like a low bar, but it made a real difference.',
    ],
  },

  'people.professional': {
    warm: [
      'The level of care and attention they brought to the job was really evident. Every detail was handled properly.',
      'You could tell from the start that these were people who took real pride in their work. It showed in everything they did.',
      'The professionalism here was genuine, not just surface-level politeness. They knew what they were doing and it came through clearly.',
    ],
    reassuring: [
      'Everything was handled with real precision. I never had to second-guess whether something had been done right.',
      'They were methodical and thorough throughout. The kind of people you want working on something that matters.',
      'Every person I dealt with clearly knew their job inside out. It gave me a lot of confidence in the outcome.',
    ],
    conversational: [
      'They were totally on top of everything. Nothing felt improvised or left to chance.',
      "You can tell straight away when someone actually knows what they're doing. These people did.",
      'Professional in the way that actually counts, not just punctual and polite, but genuinely competent.',
    ],
  },

  'people.friendly': {
    warm: [
      "There was a warmth to the whole place that you don't always get. Everyone was welcoming from the moment I arrived.",
      'They were so easy to deal with. Friendly, approachable, and completely unpressured.',
      'The whole team had a really warm, personable manner. It made something I was a bit nervous about feel much more comfortable.',
    ],
    reassuring: [
      'They struck exactly the right balance, professional enough to trust, friendly enough to actually talk to.',
      'I never felt like I was interrupting or asking too many questions. They were always happy to explain.',
      'Approachable without being over the top. Easy to deal with throughout.',
    ],
    conversational: [
      "Honestly some of the friendliest people I've dealt with in a long time. Not in a customer-service way, just genuinely good to be around.",
      'Really easy to deal with. No awkwardness, no pressure, just straightforward and friendly.',
      "The kind of people you'd actually recommend to a friend, not just because of the work but because they're pleasant to deal with.",
    ],
  },

  'people.efficient': {
    warm: [
      'They respected my time completely. Everything moved quickly and clearly, without ever feeling rushed.',
      "They had everything sorted before I even had to ask. The whole thing ran like they'd done it a hundred times.",
      'There was no hanging around or back-and-forth. They knew what needed doing and they got on with it.',
    ],
    reassuring: [
      'The whole process was tight and well-organised. No delays, no confusion, no unnecessary steps.',
      'They worked quickly but without cutting corners. I could tell the pace came from confidence, not carelessness.',
      'Everything was handled efficiently and cleanly. They showed up, did the job properly, and left without a fuss.',
    ],
    conversational: [
      'No messing around at all. They came, sorted it, done. Exactly what you want.',
      'Really refreshingly efficient. No faff, no time-wasting, just got on with it.',
      'Quick but not careless. They moved fast because they knew what they were doing, not because they were cutting corners.',
    ],
  },
};

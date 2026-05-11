import type { Tone } from '../types';

export const peoplePool: Record<string, Record<Tone, string[]>> = {
  'people.warm': {
    warm: [
      'The people here genuinely made me feel like I mattered not just another job to get through.',
      'You could tell the team actually cared. Not in a performative way. In a real way.',
      'Felt looked after from the minute I arrived. The warmth was real, not rehearsed.',
    ],
    reassuring: [
      'The team were calm, attentive, and clearly knew what they were doing. I felt in good hands the whole time.',
      'Everyone I dealt with was professional and reassuring exactly what you want when something matters.',
      'Thorough and patient throughout. Never rushed, never dismissive.',
    ],
    conversational: [
      "The people here were just genuinely lovely. Couldn't have asked for nicer.",
      'Everyone was so friendly made the whole thing way less daunting than I expected.',
      "They actually listened. Which sounds obvious but honestly isn't always a given.",
    ],
  },

  'people.professional': {
    warm: [
      'The professionalism here was evident in everything how they communicated, the care they took with the details.',
      'Every person I dealt with was thorough and clearly knew exactly what they were doing.',
      'The level of attention and professionalism was genuinely impressive.',
    ],
    reassuring: [
      'Everyone conducted themselves with complete professionalism. I never had cause to question anything.',
      'Methodical and precise exactly the kind of approach you want when something matters.',
      'Thorough, measured, clearly competent. Left with full confidence in the team.',
    ],
    conversational: [
      "Super professional without being cold or stiff competent AND actually human. Not as common as you'd think.",
      'They clearly knew what they were doing and it showed. Felt like I was in the right hands.',
      'Professional in all the right ways. Clear, thorough, and never made me feel like a burden.',
    ],
  },

  'people.friendly': {
    warm: [
      'The warmth here is something you notice immediately. Genuinely welcoming from the start.',
      'Really warm atmosphere felt at ease straight away, which made a real difference.',
      'Everyone was so personable and easy to talk to. Made the whole experience so much more comfortable.',
    ],
    reassuring: [
      'Friendly without being overbearing which is a harder balance to strike than it sounds.',
      'Welcoming and approachable throughout. Easy to ask questions, never felt like I was interrupting.',
      'Struck exactly the right balance between professional and personable. Really put me at ease.',
    ],
    conversational: [
      "Honestly some of the friendliest people I've come across. Like, genuinely.",
      'So welcoming from the start felt more like being looked after than processed.',
      'Just great. Warm, easy to talk to, easy to deal with. The whole team.',
    ],
  },

  'people.efficient': {
    warm: [
      'They respected my time completely everything moved at pace without any of the usual messing around.',
      "Efficient and considerate didn't waste a minute of my time, and I genuinely appreciated that.",
      "Everything was handled quickly and cleanly. You can tell they've got their act together.",
    ],
    reassuring: [
      'The efficiency was striking no delays, no confusion, no unnecessary back-and-forth.',
      'Everything ran like clockwork. A team that clearly has their process sorted.',
      'Fast and precise. Never felt like corners were being cut just that they knew exactly what they were doing.',
    ],
    conversational: [
      'In and out with no faff whatsoever. Genuinely refreshing.',
      'Moved fast but never felt rushed which is harder to pull off than it sounds.',
      'Quick, clean, no messing around. Exactly how it should work.',
    ],
  },
};

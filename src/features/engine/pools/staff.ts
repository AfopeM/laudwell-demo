import type { Tone } from '../types';

export const staffPool: Record<string, Record<Tone, string[]>> = {
  'staff.caring': {
    warm: [
      'The staff genuinely made me feel like I mattered — not just another appointment.',
      'Everyone I dealt with was warm and attentive. You could tell they actually cared.',
      'I felt looked after from the moment I walked in. The care was sincere, not performative.',
    ],
    reassuring: [
      'The staff were calm, attentive, and clearly experienced. I felt in good hands throughout.',
      'Everyone I interacted with was professional and reassuring — exactly what you need.',
      'The team were thorough and patient. Never felt rushed or dismissed.',
    ],
    conversational: [
      "The staff were just genuinely lovely. Couldn't have asked for nicer people.",
      'Everyone was so friendly and attentive — made the whole thing way less daunting than I expected.',
      "They actually listened, which honestly isn't as common as it should be.",
    ],
  },

  'staff.professional': {
    warm: [
      'The professionalism here was evident in everything — the way they communicated, the care they took.',
      'Every member of staff I met was thorough and clearly knew what they were doing.',
      'The level of care and professionalism was genuinely impressive.',
    ],
    reassuring: [
      'Everyone conducted themselves with complete professionalism. I never had cause to question anything.',
      'The staff were methodical and precise — exactly the kind of approach you want.',
      'Thorough, measured, and clearly competent. I left with full confidence in the team.',
    ],
    conversational: [
      'Super professional without being stiff or cold — they managed to be both competent and actually human.',
      'They knew exactly what they were doing and it showed. Felt like I was in the right place.',
      'Professional in all the right ways — thorough, clear, and never made me feel like a burden.',
    ],
  },

  'staff.friendly': {
    warm: [
      'The warmth of the team here is something you feel immediately. Genuinely welcoming.',
      'The whole place had a really friendly atmosphere — staff included. Felt at ease straight away.',
      'Everyone was so warm and personable. It made a real difference to how comfortable I felt.',
    ],
    reassuring: [
      'The staff were friendly without being overbearing — a reassuring combination.',
      'Welcoming and approachable throughout. Easy to ask questions, never felt like I was interrupting.',
      'The team struck the right balance between professional and personable. Really put me at ease.',
    ],
    conversational: [
      "Honestly some of the friendliest people I've encountered at a place like this.",
      'Super welcoming from the start. Felt more like being looked after than processed.',
      'The staff were just great — warm, funny, easy to talk to. Made the whole thing much less of a chore.',
    ],
  },

  'staff.efficient': {
    warm: [
      'The team here respected my time completely — everything moved quickly without any of the usual waiting around.',
      "Efficient and considerate — they didn't waste a minute of my time, and I appreciated that.",
      'Everything was handled quickly and smoothly. You can tell the team is well organised.',
    ],
    reassuring: [
      'The efficiency was striking — no delays, no confusion, no unnecessary steps.',
      'Everything ran like clockwork. Clearly a team that has their processes well sorted.',
      'Fast and precise. Never felt like corners were being cut — just that they knew what they were doing.',
    ],
    conversational: [
      'In and out without any of the usual faff. Refreshing, honestly.',
      'They moved fast but it never felt rushed — which is harder than it sounds.',
      'Quick without being careless. Exactly how it should work.',
    ],
  },
};

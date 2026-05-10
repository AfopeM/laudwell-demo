import type { Tone } from '../types';

export const waitTimePool: Record<string, Record<Tone, string[]>> = {
  'waitTime.short': {
    warm: [
      'I was seen at my appointment time without any waiting around a small thing, but it means a lot.',
      'No sitting around wondering when my name would be called. They were ready when I was.',
      'My appointment started on time, which honestly set the tone for the whole visit.',
    ],
    reassuring: [
      'The scheduling was well managed I was seen promptly with no delays.',
      'Arrived on time, was seen on time. The kind of reliability you want in a practice.',
      'No waiting room anxiety here. The appointment ran exactly as scheduled.',
    ],
    conversational: [
      'Was seen straight away — none of the usual sitting around twiddling your thumbs.',
      'They actually stuck to the appointment time. Wild concept, apparently, but they pulled it off.',
      'In on time, no fuss. That alone puts them ahead of most places.',
    ],
  },
};

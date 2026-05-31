import type {
  HeroContent,
  ProblemContent,
  HowItWorksContent,
  TrustContent,
  AudienceContent,
  ClosingCtaContent,
} from './types';

export const HERO: HeroContent = {
  label: 'For tradespeople',
  heading: 'Your customers want to leave a review. Now they actually will.',
  subheading:
    'LaudWell turns a happy customer into a posted Google review in under 90 seconds — no chasing, no awkward asks, no reviews that never happen.',
  ctaLabel: 'Book a Demo',
};

export const PROBLEM: ProblemContent = {
  heading: 'You do great work. Nobody knows it.',
  body: [
    "Most tradespeople rely on word of mouth. But word of mouth doesn't show up when someone searches Google at 9pm looking for a plumber.",
    'Your happy customers mean to leave a review. They just never do. Life gets in the way, the moment passes, and you lose a piece of credibility you already earned.',
    "The businesses winning on Google aren't doing better work than you. They just made it easier to leave a review.",
  ],
};

export const HOW_IT_WORKS: HowItWorksContent = {
  heading: 'Three steps. Ninety seconds. Done.',
  steps: [
    {
      number: 1,
      body: 'You share a link — via QR code, text, or a card you hand over at the end of a job.',
    },
    {
      number: 2,
      body: 'Your customer answers two quick questions about their experience. No blank page, no thinking required.',
    },
    {
      number: 3,
      body: 'LaudWell drafts a polished review for them. They post it directly to your Google listing.',
    },
  ],
};

export const TRUST: TrustContent = {
  heading: 'The numbers your competitors already know.',
  stats: [
    {
      value: '88%',
      label: 'of consumers trust online reviews as much as a personal recommendation.',
      source: 'BrightLocal Consumer Review Survey',
    },
    {
      value: '<10%',
      label: 'of satisfied customers leave a review without a direct, frictionless prompt.',
    },
    {
      value: '50+',
      label:
        'Google reviews wins the job over an equally qualified competitor with 8 — before a single call is made.',
    },
  ],
  closingLine:
    "Reviews aren't a nice-to-have. They're the first thing a new customer sees before they decide whether to call you.",
};

export const AUDIENCE: AudienceContent = {
  heading: 'Built for tradespeople who do good work and want it to show.',
  trades: [
    'Plumbers',
    'Electricians',
    'Roofers',
    'Painters and decorators',
    'Landscapers and groundsworkers',
    'HVAC engineers',
    'General builders and contractors',
  ],
  body: "If you're doing jobs, collecting cash, and moving on — with no time to think about your online presence — LaudWell is built for you. No tech skills required. No monthly management. You hand over the link, the customer does the rest.",
};

export const CLOSING_CTA: ClosingCtaContent = {
  heading: 'See it working in two minutes.',
  body: "Book a short demo and we'll walk you through the full flow — from the link you share to the review that goes live on Google. No commitment, no sales pressure.",
  ctaLabel: 'Book a Demo',
  supportingLine:
    'Currently accepting a small number of pilot businesses. Early partners get priority onboarding and direct input into the product roadmap.',
};

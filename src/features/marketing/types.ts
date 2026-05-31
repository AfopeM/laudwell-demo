export interface HeroContent {
  label: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
}

export interface ProblemContent {
  heading: string;
  body: string[];
}

export interface HowItWorksStep {
  number: number;
  body: string;
}

export interface HowItWorksContent {
  heading: string;
  steps: HowItWorksStep[];
}

export interface Stat {
  value: string;
  label: string;
  source?: string;
}

export interface TrustContent {
  heading: string;
  stats: Stat[];
  closingLine: string;
}

export interface AudienceContent {
  heading: string;
  trades: string[];
  body: string;
}

export interface ClosingCtaContent {
  heading: string;
  body: string;
  ctaLabel: string;
  supportingLine: string;
}

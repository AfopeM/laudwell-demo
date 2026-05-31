import {
  Navbar,
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  TrustSection,
  AudienceSection,
  ClosingCtaSection,
  MarketingFooter,
} from '@/features/marketing/components';
import {
  HERO,
  PROBLEM,
  HOW_IT_WORKS,
  TRUST,
  AUDIENCE,
  CLOSING_CTA,
} from '@/features/marketing/content';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection content={HERO} />
        <ProblemSection content={PROBLEM} />
        <HowItWorksSection content={HOW_IT_WORKS} />
        <TrustSection content={TRUST} />
        <AudienceSection content={AUDIENCE} />
        <ClosingCtaSection content={CLOSING_CTA} />
      </main>
      <MarketingFooter />
    </>
  );
}

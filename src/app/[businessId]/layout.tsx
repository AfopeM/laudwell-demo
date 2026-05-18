import type { Metadata } from 'next';
import { getBusinessById } from '@/config/businesses';
import { FlowProvider } from '@/features/flow/context';
import BusinessLayoutShell from './BusinessLayoutShell';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessId: string }>;
}): Promise<Metadata> {
  const { businessId } = await params;
  const business = getBusinessById(businessId);
  return { title: `${business.name} — LaudWell` };
}

export default async function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = getBusinessById(businessId);

  return (
    <FlowProvider>
      <BusinessLayoutShell businessName={business.name}>{children}</BusinessLayoutShell>
    </FlowProvider>
  );
}

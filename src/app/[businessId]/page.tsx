import { redirect } from 'next/navigation';

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;

  redirect(`/${businessId}/screen-0`);
}

type businessConfig = {
  id: string;
  name: string;
  logoPath: string;
  googleReviewUrl: string;
};

const businesses: businessConfig[] = [
  {
    id: 'demo-business',
    name: 'Demo business',
    logoPath: '/logos/demo-business.png',
    googleReviewUrl: 'https://g.page/r/demo',
  },
];

export function getBusinessById(id: string): businessConfig {
  const business = businesses.find((c) => c.id === id);
  if (!business) throw new Error(`No business found for id: "${id}"`);
  return business;
}

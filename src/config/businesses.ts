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
    googleReviewUrl:
      'https://www.google.com/maps/place/GEXR+Extreme+Exteriors/@43.8735361,-78.9523386,17z/data=!4m8!3m7!1s0x89d5b08f7a0585e5:0x6fd758f358e95ae0!8m2!3d43.8735361!4d-78.9497637!9m1!1b1!16s%2Fg%2F1tz96r0m?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
  },
];

export function getBusinessById(id: string): businessConfig {
  const business = businesses.find((c) => c.id === id);
  if (!business) throw new Error(`No business found for id: "${id}"`);
  return business;
}

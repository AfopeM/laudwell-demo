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
      'https://www.google.com/search?sxsrf=ANbL-n63wEpd3wQCSPES9oSngVk0qGmrzg:1779405977950&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x6QEogh3gMtbWg4oWFqG6ue9qkj9dcW4IXILGrr5fdBa04-6_fm3PSut4WfHz5520Uib94iZJveAsVPa7-2BKVi2sXnjm87SG-WUJPbGJSvEsH4sDw%3D%3D&q=GEXR+Extreme+Exteriors+Reviews#lrd=0x89d5b08f7a0585e5:0x6fd758f358e95ae0,3,,,,',
  },
];

export function getBusinessById(id: string): businessConfig {
  const business = businesses.find((c) => c.id === id);
  if (!business) throw new Error(`No business found for id: "${id}"`);
  return business;
}

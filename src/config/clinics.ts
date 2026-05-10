type ClinicConfig = {
  id: string;
  name: string;
  logoPath: string;
  googleReviewUrl: string;
};

const clinics: ClinicConfig[] = [
  {
    id: 'demo-clinic',
    name: 'Demo Clinic',
    logoPath: '/logos/demo-clinic.png',
    googleReviewUrl: 'https://g.page/r/demo',
  },
];

export function getClinicById(id: string): ClinicConfig {
  const clinic = clinics.find((c) => c.id === id);
  if (!clinic) throw new Error(`No clinic found for id: "${id}"`);
  return clinic;
}

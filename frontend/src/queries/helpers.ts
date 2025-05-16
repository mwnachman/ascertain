import type { Patient } from './patient';

export const filterByName = (queryString: string, patients: Patient[]) => {
  const query = queryString.toLowerCase().trim();
  return patients.filter((patient) => patient.full_name?.toLowerCase().includes(query))
}

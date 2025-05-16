import { useQuery } from '@tanstack/react-query';
import { apiRequest } from './api';
import { components } from './schema';
import { filterByName } from './helpers';

// Export schema types for use in components
export type Patient = components['schemas']['Patient'];
export type PatientListResponse = {
  patients: Patient[];
};

// Constants
const PATIENTS_ENDPOINT = '/patients/';

// Keys for React Query
export const patientKeys = {
  all: ['patients'] as const,
  list: () => [...patientKeys.all, 'list'] as const,
  search: (name?: string) => [...patientKeys.list(), { name }] as const,
  detail: (id: string) => [...patientKeys.all, 'detail', id] as const,
};

/**
 * Fetch patients from the API
 */
export const fetchPatients = async (params?: { name?: string }): Promise<PatientListResponse> => {
  // The API seems to return an array of Patient objects
  const patients = await apiRequest<Patient[]>(PATIENTS_ENDPOINT);

  if (params?.name) {
    return { patients: filterByName(params?.name, patients) };
  }

  return { patients };
};

/**
 * Fetch a single patient's details
 */
export const fetchPatientDetails = async (patientId: string): Promise<Patient> => {
  return apiRequest<Patient>(`${PATIENTS_ENDPOINT}${patientId}`);
};

/**
 * Hook to get patients with optional search parameters
 */
export const usePatients = (params?: { name?: string }) => {
  return useQuery({
    queryKey: patientKeys.search(params?.name?.toLowerCase().trim()),
    queryFn: () => fetchPatients(params),
  });
};

/**
 * Hook to get a single patient's details
 */
export const usePatientDetails = (patientId: string) => {
  return useQuery({
    queryKey: patientKeys.detail(patientId),
    queryFn: () => fetchPatientDetails(patientId),
    enabled: !!patientId,
  });
};

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
  list: (filters?: { name?: string; skip?: number; limit?: number }) => [...patientKeys.all, 'list', filters] as const,
  detail: (id: string) => [...patientKeys.all, 'detail', id] as const,
};

/**
 * Fetch patients from the API
 */
export const fetchPatients = async (params?: { name?: string; skip?: number; limit?: number }): Promise<PatientListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.name) queryParams.append('name', params.name); // name is already sanitized
  if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  
  const patients = await apiRequest<Patient[]>(`${PATIENTS_ENDPOINT}?${queryParams.toString()}`);
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
export const usePatients = (params?: { name?: string; skip?: number; limit?: number }) => {
  const sanitizedParams = {
    ...params,
    name: params?.name?.toLowerCase().trim(),
  };

  return useQuery({
    queryKey: patientKeys.list(sanitizedParams),
    queryFn: () => fetchPatients(sanitizedParams),
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

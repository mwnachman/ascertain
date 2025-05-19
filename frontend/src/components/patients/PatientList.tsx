import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import LoadingState from '@/components/ui/LoadingState';
import PatientRow from '@components/patients/PatientRow';
import { usePatients } from '@queries/patient';
interface PatientListProps {
  searchQuery: string;

}

const PatientList = ({searchQuery}: PatientListProps) => {

  // Use React Query to fetch patients data
  const { data, isLoading, isError, error, refetch } = usePatients(
    searchQuery ? { name: searchQuery } : undefined
  );

  if (isLoading) return <LoadingState />;

  if (isError)
    return (
      <ErrorState
        message={`Failed to load patients: ${error instanceof Error ? error.message : 'Unknown error'}`}
        onRetry={() => refetch()}
      />
    );

  if (!data || !data.patients || data.patients.length === 0) return <EmptyState />;

  return (
    <div>
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  DOB
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                >
                  Resource Type
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.patients.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{data.patients.length}</span> patient(s)
        </div>
      </div>
    </div>
  )
}

export default PatientList;

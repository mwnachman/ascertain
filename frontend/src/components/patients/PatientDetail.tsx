import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '@/components/patients/helpers';
import { DeleteButton, EditButton } from '@/components/patients/PatientActions';
import useScrollToTop from '@components/hooks/useScrollToTop';
import LoadingState from '@components/ui/LoadingState';
import ErrorState from '@components/ui/ErrorState';
import { usePatients } from '@/queries/patient';

const PatientDetail = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const { patientId } = useParams();
  const { data, isLoading, isError, error, refetch } = usePatients();
  const patient = data?.patients.find((patient) => patient.id === patientId)

  const returnToList = () => {
    navigate("/");
  }

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (isError)
    return (
      <ErrorState
        message={`Failed to load patient "${patientId}": ${error instanceof Error ? error.message : 'Unknown error'}`}
        onRetry={refetch}
      />
    );

  if (!patient) {
    return (
      <div>
        <div className="text-black dark:text-white py-6">There is no patient with id "{patientId}".</div>
        <button className="text-black" onClick={returnToList}>Back to Patient List</button>
      </div>
    )
  }

  return (
    <div className="text-black dark:text-white">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Patient Detail</h2>
      <div className="py-6">
        <p>Name: {patient?.full_name || 'Unknown'}</p>
        <p>DOB: {patient?.birth_date ? formatDate(patient.birth_date) : 'Unknown'}</p>
        <p>ID: {patient?.id || 'Unknown'}</p>
        <p>Resource Type: {patient?.resourceType || 'Unknown'}</p>
      </div>
      <div className="py-6">
        <EditButton patient={patient} />
        <DeleteButton patient={patient} />
      </div>
      <button className="text-black" onClick={returnToList}>Back to Patient List</button>
    </div>
  );
};

export default PatientDetail;

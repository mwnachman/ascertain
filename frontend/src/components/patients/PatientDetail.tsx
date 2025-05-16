import { formatDate } from '@/components/patients/helpers';
import { PatientActions } from '@/components/patients/PatientActions';
import { usePatients } from '@/queries/patient';
import { useParams } from 'react-router-dom';

const PatientDetail = () => {
  const { patientId } = useParams();
  const { data } = usePatients();
  const patient = data?.patients.find((patient) => patient.id === patientId)

  if (!patient) {
    return (
      <div>There is no patient with that id.</div>
    )
  }

  return (
    <div>
      <p>Name: {patient.full_name}</p>
      <p>DOB: {formatDate(patient.birth_date)}</p>
      <p>ID: {patient.id}</p>
      <p>Resource Type: {patient.resourceType}</p>
      <PatientActions patient={patient}/>
    </div>
  );
};

export default PatientDetail;

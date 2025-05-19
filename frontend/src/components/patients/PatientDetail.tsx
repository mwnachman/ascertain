import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '@/components/patients/helpers';
import { DeleteButton, EditButton } from '@/components/patients/PatientActions';
import useScrollToTop from '@components/hooks/useScrollToTop';
import { usePatients } from '@/queries/patient';

const PatientDetail = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const { patientId } = useParams();
  const { data } = usePatients();
  const patient = data?.patients.find((patient) => patient.id === patientId)

  const returnToList = () => {
    navigate("/");
  }

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
      <div><EditButton patient={patient} /><DeleteButton patient={patient} /></div>
      <button onClick={returnToList}>Back to Patient List</button>
    </div>
  );
};

export default PatientDetail;

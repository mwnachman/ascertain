import { useNavigate } from 'react-router-dom';
import type { Patient } from '@/queries/patient';

export const EditButton = ({patient}: {patient?: Patient}) => {
  return (
    <button
      className="text-blue-600 hover:text-blue-900 mr-2"
      aria-label={`Edit ${patient?.full_name}`}
    >
      Edit
    </button>
  )
};

export const DeleteButton = ({patient}: {patient?: Patient}) => {
  return (
    <button className="text-red-600 hover:text-red-900" aria-label={`Delete ${patient?.full_name}`}>
      Delete
    </button>
  )
}

export const ViewButton = ({patient}: {patient: Patient}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${patient.id}`);
  };

  return (
    <button
        className="text-blue-600 hover:text-blue-900 mr-2"
        aria-label={`View ${patient.full_name}`}
        onClick={handleClick}
      >
        View
    </button>
  )
};

export const PatientActions = ({patient}: {patient: Patient}) => {
  return (
    <div>
      <ViewButton patient={patient} />
      <EditButton patient={patient} />
      <DeleteButton patient={patient} />
    </div>
  )
};

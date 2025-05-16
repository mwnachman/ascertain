import { Patient } from '@/queries/patient';

export const PatientActions = ({patient}: {patient: Patient}) => (
  <div>
    <button
      className="text-blue-600 hover:text-blue-900 mr-2"
      aria-label={`View ${patient.full_name}`}
    >
      View
    </button>
    <button
      className="text-blue-600 hover:text-blue-900 mr-2"
      aria-label={`Edit ${patient.full_name}`}
    >
      Edit
    </button>
    <button className="text-red-600 hover:text-red-900" aria-label={`Delete ${patient.full_name}`}>
      Delete
    </button>
  </div>
)

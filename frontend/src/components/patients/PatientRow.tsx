import { formatDate } from '@/components/patients/helpers';
import { PatientActions } from '@/components/patients/PatientActions';
import type { Patient } from '@queries/patient';

interface PatientRowProps {
  patient: Patient;
}

const PatientRow = ({ patient }: PatientRowProps) => {
  return (
    <tr className="dark:bg-gray-800">
      <td className="px-4 py-3 text-left whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{patient.full_name}</div>
      </td>
      <td className="px-4 py-3 text-left whitespace-nowrap hidden sm:table-cell">
        <div className="text-sm text-gray-500 dark:text-white">{formatDate(patient.birth_date)}</div>
      </td>
      <td className="px-4 py-3 text-left whitespace-nowrap hidden md:table-cell">
        <div className="text-sm text-gray-500 dark:text-white">{patient.id}</div>
      </td>
      <td className="px-4 py-3 text-left whitespace-nowrap hidden lg:table-cell">
        <div className="text-sm text-gray-500 dark:text-white">{patient.resourceType}</div>
      </td>
      <td className="px-4 py-3 text-left whitespace-nowrap text-right text-sm font-medium">
        <PatientActions patient={patient} />
      </td>
    </tr>
  );
};

export default PatientRow;

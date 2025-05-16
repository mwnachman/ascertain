import { formatDate } from '@/components/patients/helpers';
import { PatientActions } from '@/components/patients/PatientActions';
import type { Patient } from '@queries/patient';
import { useNavigate } from 'react-router-dom';

interface PatientRowProps {
  patient: Patient;
}

const PatientRow = ({ patient }: PatientRowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${patient.id}`);
  };

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={handleClick}>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{patient.full_name}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
        <div className="text-sm text-gray-500">{formatDate(patient.birth_date)}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
        <div className="text-sm text-gray-500">{patient.id}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
        <div className="text-sm text-gray-500">{patient.resourceType}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
        <PatientActions patient={patient} />
      </td>
    </tr>
  );
};

export default PatientRow;

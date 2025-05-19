import { useState } from 'react';

import PatientSearch from '@components/patients/PatientSearch';
import PatientList from './PatientList';

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient List</h2>
        <PatientSearch setSearchQuery={setSearchQuery} />
      </div>

      <PatientList searchQuery={searchQuery} />
    </div>
  );
};

export default PatientManagement;

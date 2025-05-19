import { type Dispatch, type SetStateAction, useState } from 'react';

interface PatientSearchProps {
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const PatientSearch = ({ setSearchQuery }: PatientSearchProps) => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Search patients by name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none hover:border-gray-500 focus:border-gray-700 flex-grow text-sm"
        aria-label="Search patients"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors whitespace-nowrap"
        aria-label="Search button"
      >
        Search
      </button>
      <button
        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors whitespace-nowrap"
        aria-label="Add a new patient"
      >
        Add Patient
      </button>
    </div>
  )
}

export default PatientSearch;

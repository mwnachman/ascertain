import Layout from '@components/Layout';
import PatientManagement from '@components/patients/PatientManagement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PatientDetail from '@/components/patients/PatientDetail';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={PatientManagement} />
            <Route path="/:patientId" Component={PatientDetail} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  );
}

export default App;

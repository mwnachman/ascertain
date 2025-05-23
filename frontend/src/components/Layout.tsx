import { Outlet } from 'react-router-dom';

import ThemeToggle from './ui/ThemeToggle';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 py-6">
      <nav>
        <div className="justify-self-start px-8">
          <ThemeToggle />
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h1>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;

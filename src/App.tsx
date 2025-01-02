import React from 'react';
import { ClipboardList } from 'lucide-react';
import { UserSelector } from './components/UserSelector';
import { UserProvider } from './context/UserContext';
import { Dashboard } from './components/Layout/Dashboard';

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <ClipboardList className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Flatmate Chores Tracker</h1>
            </div>
            <UserSelector />
          </div>

          <Dashboard />
        </div>
      </div>
    </UserProvider>
  );
}
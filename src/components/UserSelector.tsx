import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { flatmates } from '../data/initialData';

export function UserSelector() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="flex items-center gap-2">
      <User className="w-5 h-5 text-blue-600" />
      <select
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {flatmates.map(flatmate => (
          <option key={flatmate.id} value={flatmate.id}>
            {flatmate.name}
          </option>
        ))}
      </select>
    </div>
  );
}
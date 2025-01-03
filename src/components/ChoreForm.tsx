import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { flatmates, choreTypes } from '../data/initialData';
import { useUser } from '../context/UserContext';

interface ChoreFormProps {
  onSubmit: (chore: {
    choreType: string;
    doneBy: string;
    date: string;
    notes?: string;
  }) => void;
}

export function ChoreForm({ onSubmit }: ChoreFormProps) {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    choreType: '',
    doneBy: currentUser,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(prev => ({
      ...prev,
      choreType: '',
      notes: '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Chore Type</label>
          <select
            required
            value={formData.choreType}
            onChange={e => setFormData(prev => ({ ...prev, choreType: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a chore</option>
            {choreTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Done By</label>
          <select
            required
            value={formData.doneBy}
            onChange={e => setFormData(prev => ({ ...prev, doneBy: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {flatmates.map(flatmate => (
              <option key={flatmate.id} value={flatmate.id}>{flatmate.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <input
            type="text"
            value={formData.notes}
            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add any additional notes..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Chore
      </button>
    </form>
  );
}
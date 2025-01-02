import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ChoreLog } from '../types';
import { flatmates, choreTypes } from '../data/initialData';
import { useUser } from '../context/UserContext';

interface EditChoreModalProps {
  chore: ChoreLog;
  onClose: () => void;
  onSave: (chore: ChoreLog, editorId: string) => void;
}

export function EditChoreModal({ chore, onClose, onSave }: EditChoreModalProps) {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    choreType: chore.choreType,
    doneBy: chore.doneBy,
    date: chore.date,
    notes: chore.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        ...chore,
        choreType: formData.choreType,
        doneBy: formData.doneBy,
        date: formData.date,
        notes: formData.notes,
      },
      currentUser
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Chore</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Chore Type</label>
            <select
              required
              value={formData.choreType}
              onChange={e => setFormData(prev => ({ ...prev, choreType: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
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
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
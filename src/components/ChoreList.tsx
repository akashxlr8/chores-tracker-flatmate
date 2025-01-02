import React, { useState } from 'react';
import { Trash2, Edit2, History } from 'lucide-react';
import { ChoreLog } from '../types';
import { flatmates, choreTypes } from '../data/initialData';
import { EditChoreModal } from './EditChoreModal';

interface ChoreListProps {
  chores: ChoreLog[];
  onDelete: (id: string) => void;
  onEdit: (chore: ChoreLog, editorId: string) => void;
}

export function ChoreList({ chores, onDelete, onEdit }: ChoreListProps) {
  const [editingChore, setEditingChore] = useState<ChoreLog | null>(null);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const getFlatmateName = (id: string) => 
    flatmates.find(f => f.id === id)?.name || 'Unknown';

  const getChoreName = (id: string) =>
    choreTypes.find(c => c.id === id)?.label || 'Unknown';

  return (
    <div className="space-y-4">
      {chores.map(chore => (
        <div key={chore.id}>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {getChoreName(chore.choreType)}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">
                  Done by {getFlatmateName(chore.doneBy)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {new Date(chore.date).toLocaleDateString()}
                {chore.notes && (
                  <>
                    <span className="mx-2">•</span>
                    {chore.notes}
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {chore.editHistory?.length ? (
                <button
                  onClick={() => setShowHistory(showHistory === chore.id ? null : chore.id)}
                  className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100"
                >
                  <History className="w-5 h-5" />
                </button>
              ) : null}
              <button
                onClick={() => setEditingChore(chore)}
                className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(chore.id)}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showHistory === chore.id && chore.editHistory && (
            <div className="mt-2 ml-4 p-4 bg-gray-50 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Edit History</h4>
              {chore.editHistory.map((edit, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="text-gray-600">
                    Edited by {getFlatmateName(edit.editedBy)} on{' '}
                    {new Date(edit.editedAt).toLocaleString()}
                  </div>
                  <ul className="mt-1 space-y-1">
                    {edit.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="text-gray-500">
                        Changed {change.field} from "{change.field === 'choreType' ? 
                          getChoreName(change.oldValue) : 
                          change.field === 'doneBy' ? 
                            getFlatmateName(change.oldValue) : 
                            change.oldValue}" 
                        to "{change.field === 'choreType' ? 
                          getChoreName(change.newValue) : 
                          change.field === 'doneBy' ? 
                            getFlatmateName(change.newValue) : 
                            change.newValue}"
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {chores.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No chores recorded yet. Add your first chore above!
        </div>
      )}

      {editingChore && (
        <EditChoreModal
          chore={editingChore}
          onClose={() => setEditingChore(null)}
          onSave={onEdit}
        />
      )}
    </div>
  );
}
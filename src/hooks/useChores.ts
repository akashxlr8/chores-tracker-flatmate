import { useState, useEffect } from 'react';
import { ChoreLog, EditRecord } from '../types';

export function useChores() {
  const [chores, setChores] = useState<ChoreLog[]>(() => {
    const saved = localStorage.getItem('chores');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  const addChore = (chore: Omit<ChoreLog, 'id'>) => {
    const newChore = {
      ...chore,
      id: crypto.randomUUID(),
      editHistory: [],
    };
    setChores(prev => [newChore, ...prev]);
  };

  const editChore = (updatedChore: ChoreLog, editorId: string) => {
    setChores(prev => prev.map(chore => {
      if (chore.id !== updatedChore.id) return chore;

      const changes: EditRecord['changes'] = [];
      if (chore.choreType !== updatedChore.choreType) {
        changes.push({
          field: 'choreType',
          oldValue: chore.choreType,
          newValue: updatedChore.choreType,
        });
      }
      if (chore.doneBy !== updatedChore.doneBy) {
        changes.push({
          field: 'doneBy',
          oldValue: chore.doneBy,
          newValue: updatedChore.doneBy,
        });
      }
      if (chore.date !== updatedChore.date) {
        changes.push({
          field: 'date',
          oldValue: chore.date,
          newValue: updatedChore.date,
        });
      }
      if (chore.notes !== updatedChore.notes) {
        changes.push({
          field: 'notes',
          oldValue: chore.notes || '',
          newValue: updatedChore.notes || '',
        });
      }

      if (changes.length === 0) return chore;

      const editRecord: EditRecord = {
        editedBy: editorId,
        editedAt: new Date().toISOString(),
        changes,
      };

      return {
        ...updatedChore,
        editHistory: [...(chore.editHistory || []), editRecord],
      };
    }));
  };

  const deleteChore = (id: string) => {
    setChores(prev => prev.filter(chore => chore.id !== id));
  };

  return { chores, addChore, editChore, deleteChore };
}
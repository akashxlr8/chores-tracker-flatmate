import React from 'react';
import { ChoreForm } from '../ChoreForm';
import { ChoreList } from '../ChoreList';
import { Calendar } from '../Calendar/Calendar';
import { useChores } from '../../hooks/useChores';

export function Dashboard() {
  const { chores, addChore, editChore, deleteChore } = useChores();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ChoreForm onSubmit={addChore} />
        <ChoreList 
          chores={chores} 
          onDelete={deleteChore} 
          onEdit={editChore}
        />
      </div>
      <div className="lg:col-span-1">
        <Calendar chores={chores} />
      </div>
    </div>
  );
}
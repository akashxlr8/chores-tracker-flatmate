import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChoreLog } from '../../types';
import { flatmates } from '../../data/initialData';
import { getChoreIcon } from './ChoreIcon';
import { formatDate } from '../../utils/dateUtils';
import { CalendarWidget } from './CalendarWidget';

interface CalendarProps {
  chores: ChoreLog[];
}

const userColors = {
  '1': 'bg-blue-500',
  '2': 'bg-green-500',
  '3': 'bg-purple-500',
};

export function Calendar({ chores }: CalendarProps) {
  const sortedChores = [...chores].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Calendar</h2>
        </div>
        <CalendarWidget chores={chores} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        
        {/* User Legend */}
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-md">
          {flatmates.map(flatmate => (
            <div key={flatmate.id} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${userColors[flatmate.id as keyof typeof userColors]}`} />
              <span className="text-sm text-gray-600">{flatmate.name}</span>
            </div>
          ))}
        </div>

        {/* Chore Timeline */}
        <div className="space-y-3">
          {sortedChores.map(chore => (
            <div key={chore.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
              {getChoreIcon(chore.choreType)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${userColors[chore.doneBy as keyof typeof userColors]}`} />
                  <span className="text-sm font-medium">
                    {flatmates.find(f => f.id === chore.doneBy)?.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(chore.date)}
                </p>
                {chore.notes && (
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {chore.notes}
                  </p>
                )}
              </div>
            </div>
          ))}

          {chores.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No activities recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
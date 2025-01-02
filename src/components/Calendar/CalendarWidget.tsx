import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ChoreLog } from '../../types';
import { flatmates } from '../../data/initialData';
import 'react-calendar/dist/Calendar.css';

interface CalendarWidgetProps {
  chores: ChoreLog[];
}

const userColors = {
  '1': '#3B82F6', // blue
  '2': '#10B981', // green
  '3': '#8B5CF6', // purple
};

export function CalendarWidget({ chores }: CalendarWidgetProps) {
  // Create a map of dates to chores
  const choresByDate = chores.reduce((acc, chore) => {
    const date = format(new Date(chore.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(chore);
    return acc;
  }, {} as Record<string, ChoreLog[]>);

  const tileContent = ({ date }: { date: Date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayChores = choresByDate[dateStr] || [];

    if (dayChores.length === 0) return null;

    // Group chores by user
    const userChores = dayChores.reduce((acc, chore) => {
      if (!acc[chore.doneBy]) {
        acc[chore.doneBy] = 0;
      }
      acc[chore.doneBy]++;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {Object.entries(userChores).map(([userId, count]) => (
          <div
            key={userId}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: userColors[userId as keyof typeof userColors] }}
            title={`${flatmates.find(f => f.id === userId)?.name}: ${count} chore(s)`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-widget">
      <Calendar
        tileContent={tileContent}
        className="rounded-lg border-none shadow-sm"
      />
      <style>{`
        .calendar-widget .react-calendar {
          width: 100%;
          background: white;
          border: none;
          font-family: inherit;
        }
        .calendar-widget .react-calendar__tile {
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5em 0.2em;
        }
        .calendar-widget .react-calendar__tile--now {
          background: #EFF6FF;
        }
        .calendar-widget .react-calendar__tile--active {
          background: #DBEAFE;
          color: black;
        }
        .calendar-widget .react-calendar__tile--active:enabled:hover,
        .calendar-widget .react-calendar__tile--active:enabled:focus {
          background: #BFDBFE;
        }
      `}</style>
    </div>
  );
}
export interface ChoreLog {
  id: string;
  choreType: 'big_dustbin' | 'small_dustbin' | 'vegetables' | 'kitchen_supplies';
  doneBy: string;
  date: string;
  notes?: string;
  editHistory?: EditRecord[];
}

export interface EditRecord {
  editedBy: string;
  editedAt: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

export interface Flatmate {
  id: string;
  name: string;
}
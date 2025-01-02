import React from 'react';
import { Trash2, ShoppingCart, Utensils } from 'lucide-react';

export function getChoreIcon(choreType: string) {
  switch (choreType) {
    case 'big_dustbin':
    case 'small_dustbin':
      return <Trash2 className="w-5 h-5 text-red-500" />;
    case 'vegetables':
      return <ShoppingCart className="w-5 h-5 text-green-500" />;
    case 'kitchen_supplies':
      return <Utensils className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
}
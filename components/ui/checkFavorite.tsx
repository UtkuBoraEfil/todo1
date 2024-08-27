import { Check } from 'lucide-react';

export function CheckFavorite ({goal_id, is_complete}: {goal_id: string, is_complete: boolean}) {
  return (
    <button
    
    className="bg-white rounded-sm"
  >
    <Check className="xl:w-4 lg:w-3 lg:h-auto" />
  </button>
  );
};

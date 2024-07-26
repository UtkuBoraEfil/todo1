'use client';

import { Trash2 } from 'lucide-react';
import { deleteGoal } from '@/actions';

export function Button ({id}: {id: string}) {
  return (
    <button onClick={()=>deleteGoal(id)} className=" rounded-lg w-12 h-12 flex justify-center items-center">
    <Trash2 className='text-red-600' />
  </button>
  );
};

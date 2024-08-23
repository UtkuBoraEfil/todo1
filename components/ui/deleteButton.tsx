'use client';

import { Trash2 } from 'lucide-react';
import { deleteGoal } from '@/actions';

export function Button ({id}: {id: string}) {
  return (
    <button onClick={()=>deleteGoal(id)} className=" rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-6 h-6 flex justify-center items-center">
    <Trash2 className='text-red-600' />
  </button>
  );
};

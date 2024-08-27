"use client";
import { removeFavorite } from "@/actions";
import { X } from 'lucide-react';

export function RemoveFavorite(fav: any) {
  return (
    <button
      onClick={() => removeFavorite(fav.goal_id)}
      className="bg-white rounded-sm"
    >
      <X className="xl:w-4 lg:w-3 lg:h-auto" />
    </button>
  );
}

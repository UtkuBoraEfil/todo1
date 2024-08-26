"use client";
import { RefreshCcw } from "lucide-react";
import { updateGoal } from "@/actions";

export function UpdateGoalButton({ id, value }: { id: string; value: string }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        updateGoal(id, value);
      }}
      className="w-full flex justify-center "
    >
      <RefreshCcw />
    </button>
  );
}

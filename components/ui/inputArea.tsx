'use client';
import { useRef, FormEvent } from "react";
import { Enter } from "../icons/enter";
import { sendGoal } from "@/actions";

export async function InputArea() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    await sendGoal(new FormData(event.currentTarget));

    // Reset the input field after submission
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="z-10 xl:w-[600px] lg:w-[520px]  bg-input-bg py-2 px-2 rounded-lg flex justify-between gap-2 items-center input_shadow">
      <input
        ref={inputRef}
        name="newGoal"
        type="text"
        placeholder="bugun ne yapcan lan"
        className="flex-1 bg-transparent outline-none"
        required
      />
      <button type="submit">
        <Enter />
      </button>
    </form>
  );
}

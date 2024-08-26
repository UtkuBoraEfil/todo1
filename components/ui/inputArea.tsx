"use client";
import { useRef } from "react";
import { Enter } from "../icons/enter";
import { sendGoal } from "@/actions";

function handleFormSubmission(formData: FormData, inputRef: React.RefObject<HTMLInputElement>) {
  sendGoal(formData).then(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }).catch((error) => {
    console.error("Error submitting form:", error);
  });
}

export function InputArea() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    handleFormSubmission(formData, inputRef);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="z-10 w-full bg-input-bg py-2 px-2 rounded-lg flex justify-between gap-2 items-center shadow-xl">
      <input
        ref={inputRef}
        name="newGoal"
        type="text"
        placeholder="bugun ne yapcan lan"
        autoComplete="off"
        className="flex-1 bg-transparent outline-none"
        required
      />
      <button type="submit">
        <Enter />
      </button>
    </form>
  );
}
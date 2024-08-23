import { Enter } from "../icons/enter";
import { sendGoal } from "@/actions";

export async function InputArea() {

  const handleSubmit = sendGoal;

  return (
    <form 
      action={handleSubmit}
      className="z-10 w-full bg-input-bg py-2 px-2 rounded-lg flex justify-between gap-2 items-center shadow-xl">
      <input
        // ref={inputRef}
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

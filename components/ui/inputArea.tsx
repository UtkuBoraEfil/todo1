import { Enter } from "../icons/enter";
import { sendGoal } from "@/actions";

export async function InputArea() {
  return (
    <form 
      action={sendGoal}
      className="z-10 xl:w-[600px] lg:w-[520px] w-[300] bg-input-bg py-2 px-2 rounded-lg flex justify-between gap-2 items-center input_shadow">
      <input
        name="newGoal"
        type="text"
        placeholder="bugun ne yapcan lan"
        className=" flex-1 bg-transparent outline-none"
        required
      />
      <button type="submit">
        <Enter />
      </button>
    </form>
  );
}

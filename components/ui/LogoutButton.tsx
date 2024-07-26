import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form
    className="flex items-center justify-center"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="text-red-800 w-full h-full c">
        <LogOut size={24} />
      </button>
    </form>
  );
}

import { handleSignOut } from "@/actions"; // Adjust the path as necessary
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form
      className="flex items-center justify-center"
      action={handleSignOut}
    >
      <button type="submit" className="text-red-800 absolute bottom-4 right-4">
        <LogOut className="w-4 lg:w-8" />
      </button>
    </form>
  );
}
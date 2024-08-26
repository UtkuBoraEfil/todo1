"use client";
import Image from "next/image";
import Logo from "@/components/icons/logo";
import { Favorites } from "./favorites";
import { History } from "./history";
import Jesus from "./icons/jesus";
import { LogoutButton } from "./ui/LogoutButton";
import { CloseNavbar } from "./ui/closeNavbar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CircleArrowRight } from "lucide-react";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("false");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isOpen = localStorage.getItem("isNavOpen") || "false";
    setOpen(isOpen);
    setIsLoading(false);
  }, []);

  return (
    <div
      className={cn(
        "bg-light-gray rounded-r-lg shadow-lg pt-5 flex flex-col justify-between pl-2 lg:pl-3 z-10",
        open === "false" ? "w-0 absolute -left-3" : "w-auto"
      )}
    >
      <div
        className={cn(
          open === "true" ? "flex flex-col justify-between h-full" : "hidden"
        )}
      >
        <div className="flex flex-col gap-5 pr-2 lg:pr-3 h-full overflow-hidden">
          <div className="flex justify-between mb-10 gap-1">
            <Logo />
            <CloseNavbar open={open} setOpen={setOpen} />
          </div>
          <div className="flex flex-col gap-5 h-[60svh] ">
            {children}
          </div>
        </div>
        <div className="relative">
          <Jesus />
          <LogoutButton />
        </div>
      </div>
      {open === "false" && (
        <CloseNavbar open={open} setOpen={setOpen} />
      )}
    </div>
  );
}

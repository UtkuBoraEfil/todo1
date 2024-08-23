"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function Favorites({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("false");

  function handleClick() {
    console.log(open);
    if (open === "false") {
      setOpen("true");
    } else {
      setOpen("false");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleClick}  className="bg-navy-blue rounded-md flex justify-center p-2 w-full gap-3">
        <Star className=" text-main-white w-5 lg:w-8" />
        <h1 className="text-white font-bold lg:text-lg text-sm">Favorites</h1>
      </button>
      <div
        className={cn(
          "hidden",
          open === "true" && " flex flex-col gap-2 pt-3 "
        )}
      >
        {children}
      </div>
    </div>
  );
}

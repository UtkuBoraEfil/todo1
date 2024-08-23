"use client";
import { useState, useEffect } from "react";
import React from "react";
import { CircleX, CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CloseNavbar({
  open,
  setOpen,
}: {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleNav = () => {
    const newNavState = open === "true" ? "false" : "true";
    console.log("newNavState", newNavState);
    console.log("open", open);
    setOpen(newNavState);
    localStorage.setItem("isNavOpen", newNavState);
  };

  return (
    <div>
      {open === "true" ? (
        <button onClick={handleNav}>
          <CircleX className="xl:w-8 xl:h-8 w-6 h-6" />
        </button>
      ) : (
        <button onClick={handleNav} className="absolute top-0 pt-5 left-5">
          <CircleArrowRight className="left-0 xl:w-8 xl:h-8 w-6 h-6" />
        </button>
      )}
    </div>
  );
}

// <button onClick={handleNav} className={cn(!open && "block absolute top-0 left-0", open && "block")}>
//   {open === "true" ? (
//     <CircleX className="w-8 h-8" />
//   ) : (
//     <CircleArrowRight className="left-0 w-8 h-8" />
//   )}
// </button>
"use client";
import { useState, useEffect } from "react";
import React from "react";
import { CircleX, CircleArrowRight } from "lucide-react";

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
    setOpen(newNavState);
    localStorage.setItem("isNavOpen", newNavState);
  };

  return (
    <button onClick={handleNav} className="">
      {open === "true" ? (
        <CircleX className="w-8 h-8" />
      ) : (
        <CircleArrowRight className="w-8 h-8" />
      )}
    </button>
  );
}

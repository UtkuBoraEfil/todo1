"use client";
import { CalendarFold } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";


export  function History({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("false");

  function handleClick(){
    console.log(open);
    if (open === "false"){
      setOpen("true");
    }
    else {
      setOpen("false");
    }
  }

  return (
    <div className="flex flex-col gap-2 shrink overflow-hidden">
      <button onClick={handleClick} className="bg-navy-blue rounded-md flex justify-center p-2 w-full gap-3">
        <CalendarFold className=" text-main-white w-5 lg:w-8" />
        <h1 className="text-white font-bold lg:text-lg text-sm ">History</h1>
      </button>
      <div className={cn("hidden  overflow-auto", open==="true" && " flex flex-col gap-2 pt-3 ")}>
        {children}
      </div>
    </div>
  );
}

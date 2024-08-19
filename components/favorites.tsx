import Link from "next/link";
import { Star } from 'lucide-react';


export function Favorites () {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-navy-blue rounded-md flex justify-center p-2 w-full gap-3">
            <Star className=" text-main-white w-5 lg:w-8"/>
            <h1 className="text-white font-bold lg:text-lg text-sm">Favorites</h1>
        </div>
        
      </div>
    );
  };
  
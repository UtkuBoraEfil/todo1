import Image from "next/image";
import Logo from "@/components/icons/logo";
import { Favorites } from "./favorites";
import { History } from "./history";
import Jesus from "./icons/jesus";
import { LogoutButton } from "./ui/LogoutButton";



export default function Navbar () { 
  return (
    <div className="bg-light-gray rounded-r-lg  shadow-lg  pt-5 flex flex-col justify-between pl-3 z-10">
      <div className="flex flex-col gap-5 pr-3">
        <div className="flex justify-between mb-10">
          <Logo/>
          <div className="hidden lg:block ">
            <LogoutButton/>
          </div>
        </div>
        <Favorites/>
        <History/>
      </div>
        <Jesus/>
    </div>
  );
};

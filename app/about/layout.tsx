import { History } from "@/components/history";
import { Favorites } from "@/components/favorites";
import { History_all_days } from "@/components/ui/history-all-days";
import { FavoriteGoal } from "@/components/ui/favorite-goal";
import Navbar from "@/components/navbar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex bg-main-white">
      <Navbar>
        <Favorites>
          <FavoriteGoal />
        </Favorites>
        <History>
          <History_all_days />
        </History>
      </Navbar>
      {children}
    </div>
  );
}

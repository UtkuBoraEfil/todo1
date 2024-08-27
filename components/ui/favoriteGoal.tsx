import { prisma } from "@/lib/prisma";
import { RemoveFavorite } from "@/components/ui/removeFavorite";
import { CheckFavorite } from "@/components/ui/checkFavorite";

interface FavoriteGoalProps {
  goal: string;
  dateId: string;
  goal_id: string;
  is_complete: boolean;
  is_favorite: boolean;
}

export async function FavoriteGoal(fav: FavoriteGoalProps) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    const day = await prisma.day.findFirst({
        where: {
            id: fav.dateId,
        },

    }); 
    let dateArray = [];
    dateArray = day?.target_date?.split("/") || [];
    const date = dateArray[0] + " " + monthNames[parseInt(dateArray[1]) - 1];
  return (
    <div className="w-full flex">
      <p className="w-1/2 truncate cursor-default font-bold text-xs lg:text-base">{fav.goal}</p>
      <div className="w-1/2 flex justify-between xl:gap-1">
        <p className=" text-xs ">({date})</p>
        <div className="lg:block hidden ">
          <CheckFavorite goal_id={fav.goal_id} is_complete={fav.is_complete} />
          <RemoveFavorite goal_id={fav.goal_id} />
        </div>
      </div>
    </div>
  );
}

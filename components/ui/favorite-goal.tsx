import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Date } from "@/components/ui/history-day";
import { FavoriteGoal as FavGoal } from "./favoriteGoal";


export async function FavoriteGoal () {
  const session = await auth();
  const user = session?.user;
  let favs: any[] = [];

  favs = await prisma.goal.findMany({
    where: {
      userId: user?.id,
      isFavorite: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="xl:max-w-[215px] lg:max-w-[155px] max-w-[110px]">
        {favs.map((fav?)=> (
          <FavGoal
            key={fav.id}
            goal={fav.goal}
            dateId={fav.dayId}
            goal_id={fav.id}
            is_complete={fav.isCompleted}
            is_favorite={fav.isFavorite}
          />
        ))}
    </div>
  );
};

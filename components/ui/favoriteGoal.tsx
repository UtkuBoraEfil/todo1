import { prisma } from "@/lib/prisma";

export async function FavoriteGoal({fav}: {fav: any}) {
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
      <p className="w-1/2 truncate cursor-default font-bold">{fav.goal}</p>
      <div>
        <p className=" text-xs ">({date})</p>
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { HistoryDate } from "@/components/ui/historyDate";
import { DailyGoal } from "@/components/ui/dailyGoal";
import { findDay } from "@/actions";
import { redirect } from "next/navigation";
import { HangingJesus } from "@/components/icons/hangingJesus";
import { DeadJesus } from "@/components/icons/deadJesus";
import { prisma } from "@/lib/prisma";

export default async function Date({ params }: { params: any }) {
  const dayId = params.slug;
  const currentDayId = await findDay();
  if (dayId === currentDayId) {
    redirect("/about");
  }
  const day = await prisma.day.findFirst({
    where: {
      id: dayId,
    },
  });
  const session = await auth();
  const user = session?.user;
  let goals: any[] = [];
  if (user && dayId) {
    goals = await prisma.goal.findMany({
      where: {
        userId: user.id,
        dayId: dayId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  const given_date = day?.target_date?.toString() || "";
  return (
    <main className="min-h-screen w-full pt-5 relative">
      <HistoryDate given_date={given_date} />
      <div className="w-full xl:px-10 xl:max-w-[800px] lg:px-10 px-4 mx-auto">
        <div className=" w-full flex flex-col place-items-center gap-8 mt-20 h-[50svh] overflow-auto">
          {goals.map((goal?) => (
            <DailyGoal
              goal={goal?.goal}
              goal_id={goal?.id}
              isCompleted={goal?.isCompleted}
              key={goal?.id}
            />
          ))}
        </div>
      </div>
      <div className=" absolute top-0 -left-10 hidden lg:block">
        <HangingJesus />
      </div>
      <div className=" absolute bottom-0 right-0 ">
        <DeadJesus />
      </div>
    </main>
  );
}

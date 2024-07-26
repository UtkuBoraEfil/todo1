import { signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { CurrentDate } from "@/components/ui/currentDate";
import { DailyGoal } from "@/components/ui/dailyGoal";
import { InputArea } from "@/components/ui/inputArea";
import Link from "next/link";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import {HangingJesus} from "@/components/icons/hangingJesus";
import { DeadJesus } from "@/components/icons/deadJesus";
import { prisma } from "@/lib/prisma";
import { findDay } from "@/actions";

export default async function DatePage({dayId}: {dayId: string}) {

  const session = await auth();
  const user = session?.user;
  let goals: any[] = [];
  if(user && dayId){
    goals = await prisma.goal.findMany({
      where: {
        userId: user.id,
        dayId: dayId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return (
    <main className="min-h-screen w-full pt-5 relative">
      <h1>{dayId}</h1>
      <div className="w-full flex justify-center mt-10">
        <InputArea />
      </div>
      <div className=" w-full flex flex-col place-items-center gap-8 mt-20">
        {goals.map((goal?)=>(
          <DailyGoal goal={goal?.goal} goal_id={goal?.id} key={goal?.id}/>
        ))}
      </div>
      <div className=" absolute top-0 -left-10 ">
        <HangingJesus/>
      </div>
      <div className=" absolute bottom-0 right-0 ">
        <DeadJesus/>
      </div>
    </main>
  );
}

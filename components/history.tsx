import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CalendarFold } from "lucide-react";
import { Date } from "@/components/ui/history-day";

export async function History() {
  const session = await auth();
  const user = session?.user;
  let dates: any[] = [];

  dates = await prisma.day.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      target_date: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-navy-blue rounded-md flex justify-center p-2 w-full gap-3">
        <CalendarFold className=" text-main-white w-5 lg:w-8" />
        <h1 className="text-white font-bold lg:text-lg text-sm ">History</h1>
      </div>
      <div className="flex flex-col gap-2 pt-3">
        {dates.map((date?) => (
          <Date date={date?.target_date} slug={date?.slug} key={date?.id} />
        ))}
      </div>
    </div>
  );
}

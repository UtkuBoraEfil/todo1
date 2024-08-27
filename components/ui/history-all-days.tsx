import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Date } from "@/components/ui/history-day";
import { DatePicker } from "@/components/ui/date-picker";

export async function History_all_days() {
  const session = await auth();
  const user = session?.user;
  let dates: any[] = [];

  dates = await prisma.day.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
      <>
      <div className=" ">
        <DatePicker />
      </div>
        {dates.map((date?) => (
          <Date date={date?.target_date} slug={date?.id} key={date?.id} />
        ))}
      </>
  );
}
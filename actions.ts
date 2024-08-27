"use server";
import { signIn, auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function handleSignOut() {
  await signOut();
}

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  "use server";
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = bcrypt.hashSync(password as string, 10);

    await prisma.user.create({
      data: {
        email: email as string,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log("error ", error);
    // @ts-ignore
    if ((error.message = "User already exists.")) {
      return { error: "Email kullanımda!" };
    }
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/about",
  });
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  "use server";
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/about",
  });
}

export async function sendGoal(data: FormData) {
  const goal = data.get("newGoal") as string;
  const session = await auth();
  const userId = session?.user?.id as string;

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const tarih = day + "/" + month + "/" + year;
  console.log("tarih", tarih);

  try {
    const dayId = await createDate(tarih);

    await prisma.goal.create({
      data: {
        goal: goal,
        userId,
        dayId: dayId || "",
      },
    });
  } catch (e) {
    console.log("e", e);
  }
  revalidatePath("/about");
}

export async function createDate(given_date: string) {
  const session = await auth();
  const userId = session?.user?.id as string;
  console.log("given_date", given_date);
  try {
    const existingDate = await prisma.day.findFirst({
      where: {
        userId: userId,
        target_date: given_date,
      },
    });
    if (existingDate) {
      return existingDate.id;
    } else {
      const newDay = await prisma.day.create({
        data: {
          target_date: given_date,
          userId,
          slug:
            given_date.replace(/\//g, "-").toLowerCase() +
            "-" +
            userId.replace(/\s+/g, "-").toLowerCase(),
        },
      });
      return newDay.id;
    }
  } catch (e) {
    console.log("e", e);
  }
}

export async function findDay() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const tarih = day + "/" + month + "/" + year;
  console.log("tarih", tarih);
  const existingDate = await prisma.day.findFirst({
    where: {
      userId: userId,
      target_date: tarih,
    },
  });
  if (existingDate) {
    return existingDate.id;
  } else {
    const newDay = await prisma.day.create({
      data: {
        target_date: tarih,
        userId,
        slug:
          tarih.replace(/\//g, "-").toLowerCase() +
          "-" +
          userId.replace(/\s+/g, "-").toLowerCase(),
      },
    });

    return newDay.id;
  }
}

export async function deleteGoal(goalId: string) {
  await prisma.goal.delete({
    where: {
      id: goalId,
    },
  });
  revalidatePath("/about");
}

export async function completeGoal(goalId: string, isCompleted: boolean) {
  await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      isCompleted: isCompleted,
    },
  });
  revalidatePath("/about");
}

export async function bringGoalToToday(goalId: string) {
  console.log("bringGoalToToday", goalId);
  const dayId = await findDay();
  const goal = await prisma.goal.findUnique({
    where: {
      id: goalId,
    },
  });
  const fromDayId = goal?.dayId;
  await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      dayId: dayId,
    },
  });
  deleteDay(fromDayId as string);
  revalidatePath("/about");
}

export async function deleteDay(dayId: string) {
  let goals = [];
  goals = await prisma.goal.findMany({
    where: {
      dayId: dayId,
    },
  });
  if (goals.length === 0) {
    await prisma.day.delete({
      where: {
        id: dayId,
      },
    });
  }
  revalidatePath("/about");
}

export async function updateGoal(goalId: string, value: string) {
  console.log("HELLO FROM UPDATE GOAL");
  console.log("value", value);
  await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      goal: value,
    },
  });
  revalidatePath("/about");
}

export async function removeFavorite(goalId: string){
  await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      isFavorite: false,
    },
  });
  revalidatePath("/about");
}

export async function addToFavorites(goalId: string){
  await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      isFavorite: true,
    },
  });
  revalidatePath("/about");
}

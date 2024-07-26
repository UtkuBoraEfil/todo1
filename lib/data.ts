import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function compare(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

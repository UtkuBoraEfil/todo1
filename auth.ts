import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { compare, getUserByEmail } from "./lib/data";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email as string);
        if (!user) {
          throw new Error("User does not exist.");
        }
        const isPasswordValid = await compare(
          credentials.password as string,
          user?.password as string
        );
        if (!isPasswordValid) {
          throw new Error("Password is not valid.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async session({ session, token }) {
      console.log('token from callback', token);
      console.log('session from callback', session);
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});

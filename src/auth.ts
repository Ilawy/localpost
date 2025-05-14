import NextAuth from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  //@ts-expect-error (some version mismatch, shouldn't affect the app)
  adapter: PrismaAdapter(prisma),
});

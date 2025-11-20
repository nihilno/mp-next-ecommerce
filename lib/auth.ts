import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePasswords } from "./actions/auth";
import { prisma } from "./prisma";
import { LoginSchema } from "./schemas";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) return null;

          const passwordsMatch = await comparePasswords(
            password,
            user.password,
          );
          if (!passwordsMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});

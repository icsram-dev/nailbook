import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.lastName} ${user.firstName}`,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.name = `${user.lastName} ${user.firstName}`;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
      }

      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
        });

        if (dbUser) {
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.name = `${dbUser.lastName} ${dbUser.firstName}`;
          token.email = dbUser.email;
          token.phone = dbUser.phone;
          token.role = dbUser.role;
          token.isEmailVerified =
            dbUser.isEmailVerified;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.firstName =
          token.firstName as string;

        session.user.lastName =
          token.lastName as string;

        session.user.name =
          token.name as string;

        session.user.email =
          token.email as string;

        session.user.phone =
          token.phone as string;

        session.user.role =
          token.role as string;

        session.user.isEmailVerified =
          token.isEmailVerified as boolean;
      }

      return session;
    },
  },
});
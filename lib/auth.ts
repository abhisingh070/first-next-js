import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getAuthUser } from "@/lib/mock-data";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username or email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const identifier = String(credentials?.username ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!identifier || !password) return null;

        const user = getAuthUser(identifier);
        if (!user) return null;
        if (user.password !== password) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.username = token.username ?? session.user.name ?? "";
      }
      return session;
    },
  },
};

export function getAuthSession() {
  return getServerSession(authOptions);
}

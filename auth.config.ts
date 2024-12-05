import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import * as v from "valibot";
import { prisma } from "./prisma";
import { CreadentialsSchema } from "./lib/credentialsSchema";

class UserNotFountError extends CredentialsSignin {
  code = "UserNotFound";
}

class InvalidPasswordError extends CredentialsSignin {
  code = "InvalidPassword";
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = await v.parseAsync(
          CreadentialsSchema,
          credentials
        );

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new UserNotFountError();

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new InvalidPasswordError();

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id && user?.role) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
} satisfies NextAuthConfig;

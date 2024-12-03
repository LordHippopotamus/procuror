import Credentials from "next-auth/providers/credentials";
import {
  CredentialsSignin,
  DefaultSession,
  type NextAuthConfig,
} from "next-auth";
import bcrypt from "bcryptjs";
import * as v from "valibot";
import { prisma } from "./prisma";
import { CreadentialsSchema } from "./lib/credentialsSchema";

class UserNotFountError extends CredentialsSignin {
  code = "User not found";
}

class InvalidPasswordError extends CredentialsSignin {
  code = "Invalid password";
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

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

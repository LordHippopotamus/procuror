"use server";

import { CreadentialsSchema } from "@/lib/credentialsSchema";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import * as v from "valibot";

export const createUser = async (formData: FormData) => {
  const { email, password } = await v.parseAsync(CreadentialsSchema, {
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { email, password: hashedPassword },
  });
};

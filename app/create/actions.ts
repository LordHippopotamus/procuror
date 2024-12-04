"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import * as v from "valibot";

const DocumentSchema = v.object({
  title: v.string(),
  content: v.string(),
  timestamp: v.optional(v.string(), new Date().toISOString()),
});

export const createDocument = async (userId: string, formData: FormData) => {
  const validatedDocument = await v.parseAsync(DocumentSchema, {
    title: formData.get("title"),
    content: formData.get("content"),
    timestamp: new Date(formData.get("timestamp") as string).toISOString(),
  });

  await prisma.document.create({ data: { ...validatedDocument, userId } });

  return redirect("/");
};

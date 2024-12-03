"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import * as v from "valibot";

const DocumentSchema = v.object({
  title: v.string(),
  content: v.string(),
  timestamp: v.optional(v.string(), new Date().toISOString()),
  id: v.string(),
});

export const updateDocument = async (formData: FormData) => {
  console.log(formData);
  const validatedDocument = await v.parseAsync(DocumentSchema, {
    title: formData.get("title"),
    content: formData.get("content"),
    timestamp: new Date(formData.get("timestamp") as string).toISOString(),
    id: formData.get("id"),
  });
  console.log("333");
  await prisma.document.update({
    where: { id: validatedDocument.id },
    data: validatedDocument,
  });

  return redirect("/dashboard/" + validatedDocument.id);
};

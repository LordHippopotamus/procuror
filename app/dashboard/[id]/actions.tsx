"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import * as v from "valibot";

export const deleteDocument = async (formData: FormData) => {
  const id = await v.parseAsync(v.string(), formData.get("documentId"));
  await prisma.document.delete({ where: { id } });
  return redirect("/dashboard");
};

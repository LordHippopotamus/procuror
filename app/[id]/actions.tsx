"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export const deleteDocument = async (id: string) => {
  await prisma.document.delete({ where: { id } });
  return redirect("/");
};

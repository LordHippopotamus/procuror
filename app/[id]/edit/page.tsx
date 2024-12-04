import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";
import { updateDocument } from "./actions";
import DocumentEditor from "@/components/DocumentEditor";

const UpdateDocument = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/auth");

  const { id } = await params;

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <DocumentEditor
      formAction={updateDocument.bind(null, id)}
      defaultValues={{
        title: document.title,
        content: document.content,
        timestamp: document.timestamp,
      }}
    />
  );
};

export default UpdateDocument;

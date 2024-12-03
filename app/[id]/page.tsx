import { prisma } from "@/prisma";
import { notFound } from "next/navigation";

const Document = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <div>
      <h1>{document.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: document.content }} />
      <span>{document.timestamp.toLocaleDateString()}</span>
    </div>
  );
};

export default Document;

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

const Document = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <>
      <h1 className="text-2xl uppercase text-amber-950 text-center">
        {document.title}
      </h1>
      <div
        className="my-4"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
      <div className="flex justify-between items-center">
        <span>{document.timestamp.toLocaleDateString()}</span>
        {session?.user && (
          <div className="flex gap-2">
            <DeleteButton id={id} />
            <Link href={`/${id}/edit`}>
              <Button>Изменить</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Document;

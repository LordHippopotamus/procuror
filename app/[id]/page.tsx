import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Button } from "@headlessui/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

const Document = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <div className="max-w-4xl mx-auto px-2 my-8">
      <h1 className="text-2xl font-bold">{document.title}</h1>
      <div
        className="my-4"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
      <div className="flex justify-between items-center">
        <span className="font-bold tracking-widest">
          {document.timestamp.toLocaleDateString()}
        </span>
        {session?.user && (
          <div className="flex gap-2">
            <DeleteButton id={id} />
            <Link href={`/${id}/edit`}>
              <Button className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition">
                Изменить
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;

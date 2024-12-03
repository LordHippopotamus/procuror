import { auth, signIn } from "@/auth";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { deleteDocument } from "./actions";
import Link from "next/link";

const Document = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) return signIn();

  const { id } = await params;

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <div>
      <h1>{document.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: document.content }} />
      <span>{document.timestamp.toLocaleDateString()}</span>
      <form action={deleteDocument}>
        <input name="documentId" defaultValue={id} type="hidden" />
        <button>Удалить</button>
      </form>
      <Link href={"/dashboard/" + id + "/edit"}>
        <button>Изменить</button>
      </Link>
    </div>
  );
};

export default Document;

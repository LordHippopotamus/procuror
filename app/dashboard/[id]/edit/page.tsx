import { auth, signIn } from "@/auth";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateDocument } from "./actions";

const UpdateDocument = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  if (!session) return signIn();

  const { id } = await params;

  const document = await prisma.document.findFirst({ where: { id } });
  if (!document) notFound();

  return (
    <form action={updateDocument}>
      <h1>Редактирование документа</h1>
      <input name="title" defaultValue={document.title} />
      <textarea name="content" defaultValue={document.content} />
      <input
        name="timestamp"
        type="date"
        defaultValue={document.timestamp.toISOString().substring(0, 10)}
      />
      <input name="id" defaultValue={id} type="hidden" />

      <Link href={"/dashboard/" + id}>
        <button>Отмена</button>
      </Link>
      <button>Сохранить</button>
    </form>
  );
};

export default UpdateDocument;

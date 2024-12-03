import { auth, signIn } from "@/auth";
import { createDocument } from "./actions";

const CreateDocument = async () => {
  const session = await auth();
  if (!session) return signIn();

  return (
    <form action={createDocument}>
      <h1>Создание документа</h1>
      <input name="title" placeholder="Название" />
      <textarea name="content" placeholder="Содержимое" />
      <input
        name="timestamp"
        type="date"
        defaultValue={new Date().toISOString().substring(0, 10)}
      />
      <input name="userId" defaultValue={session.user?.id} type="hidden" />
      <button>Создать</button>
    </form>
  );
};

export default CreateDocument;

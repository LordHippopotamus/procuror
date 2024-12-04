import { auth } from "@/auth";
import { createDocument } from "./actions";
import DocumentEditor from "@/components/DocumentEditor";
import { redirect } from "next/navigation";

const CreateDocument = async () => {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  return (
    <DocumentEditor formAction={createDocument.bind(null, session.user.id)} />
  );
};

export default CreateDocument;

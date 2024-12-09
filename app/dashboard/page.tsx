import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { createUser } from "./actions";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

const dashboard = async () => {
  const session = await auth();
  if (session?.user?.role !== "admin") return redirect("/auth");

  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  return (
    <>
      <h1 className="text-4xl font-light tracking-widest text-amber-900 uppercase text-center">
        Панель Управления
      </h1>
      <form action={createUser} className="mt-4">
        <div className="flex gap-2 mt-2">
          <Input name="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Пароль" />
          <Button type="submit">Создать</Button>
        </div>
      </form>
      <ul>
        {users.map((el) => (
          <li key={el.id}>{el.email}</li>
        ))}
      </ul>
    </>
  );
};

export default dashboard;

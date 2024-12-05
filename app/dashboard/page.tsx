import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { createUser } from "./actions";

export const dynamic = "force-dynamic";

const dashboard = async () => {
  const session = await auth();
  if (session?.user?.role !== "admin") return redirect("/auth");

  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  return (
    <>
      <h1 className="text-2xl font-black">Панель Управления</h1>
      <form action={createUser} className="mt-4">
        <h2 className="text-xl font-bold">Создание пользователя</h2>
        <div className="flex gap-2 mt-2">
          <input
            className="border border-slate-400 p-2 rounded-md focus:outline focus:outline-slate-800"
            name="email"
            placeholder="Email"
          />
          <input
            className="border border-slate-400 p-2 rounded-md focus:outline focus:outline-slate-800"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <button className="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 px-4 py-2 rounded-md transition">
            Создать
          </button>
        </div>
      </form>
      <ul>
        <h2 className="text-xl font-bold mt-2">Список пользователей</h2>
        {users.map((el) => (
          <li key={el.id}>{el.email}</li>
        ))}
      </ul>
    </>
  );
};

export default dashboard;

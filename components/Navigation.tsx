"use client";

import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
  const { data, status } = useSession();
  return (
    <nav className="p-4 flex justify-between items-center">
      <Link href="/">
        <div className="flex gap-2 items-center">
          <img src="logo.svg" />
          <h5 className="text-2xl font-bold tracking-widest text-amber-950 uppercase">
            Прокурор разъясняет
          </h5>
        </div>
      </Link>
      {status === "loading" && <span>загрузка...</span>}
      {status === "authenticated" && (
        <div className="flex gap-2 items-center">
          {data.user?.email}

          <Button onClick={() => signOut({ redirectTo: "/auth" })}>
            Выйти
          </Button>
          {data.user?.role === "admin" && (
            <Link href="/dashboard">
              <Button>Администрирование</Button>
            </Link>
          )}
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/auth">
          <Button className="rounded-md px-4 py-2 bg-blue-300 hover:bg-blue-400 active:bg-blue-500 text-slate-100 transition font-bold tracking-widest">
            Авторизация
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;

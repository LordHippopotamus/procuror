"use client";

import { Button } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
  const { data, status } = useSession();
  return (
    <nav className="shadow-xl p-4 flex justify-between bg-slate-300 items-center m-2 rounded-lg">
      <Link href="/">
        <h5 className="text-lg font-bold">Прокурор разъясняет</h5>
      </Link>
      {status === "loading" && <span>загрузка...</span>}
      {status === "authenticated" && (
        <div className="flex gap-2 items-center">
          {data.user?.email}

          <Button
            onClick={() => signOut()}
            className="rounded-md px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition"
          >
            Выйти
          </Button>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/auth">
          <Button className="rounded-md px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition">
            Войти
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;

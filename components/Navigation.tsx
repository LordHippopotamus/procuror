"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
  const { status } = useSession();
  return (
    <nav>
      <h5>Прокурор разъясняет</h5>
      {status === "loading" && <span>загрузка...</span>}
      {status === "authenticated" && (
        <>
          <Link href="/dashboard">
            <button>панель управления</button>
          </Link>
          <button onClick={() => signOut()}>выйти</button>
        </>
      )}
      {status === "unauthenticated" && (
        <button onClick={() => signIn()}>войти</button>
      )}
    </nav>
  );
};

export default Navigation;

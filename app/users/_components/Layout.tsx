"use client";

import { FormEvent, ReactNode, useState } from "react";
import { comparePassword } from "../actions";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const isPasswordMatch = await comparePassword(String(password));
    if (isPasswordMatch) {
      setIsAuthorized(true);
      setError("");
    } else {
      setIsAuthorized(false);
      setError("Неверный пароль");
    }
  };

  const handleSignOut = () => setIsAuthorized(false);

  if (isAuthorized)
    return (
      <>
        {children}
        <button onClick={handleSignOut}>Выйти</button>
      </>
    );

  return (
    <form onSubmit={handleSignIn}>
      <input name="password" type="password" />
      <button>Войти</button>
      {error}
    </form>
  );
};

export default Layout;

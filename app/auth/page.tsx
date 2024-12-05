"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Field, Fieldset, Input, Legend } from "@headlessui/react";
import { HiExclamationTriangle } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setError("Невалидный email");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) router.push("/");
    else if (res?.error && res?.code === "InvalidPassword")
      setError("Неверный пароль");
    else if (res?.error && res?.code === "UserNotFound")
      setError("Пользователь не найден");
    else if (res?.error) setError("Что то пошло не так");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-xl max-w-96 mx-auto p-8 rounded-lg bg-slate-300"
    >
      <Fieldset className="flex flex-col gap-4">
        <Legend className="text-2xl font-bold text-center">Вход</Legend>
        <Field>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            className="w-full border-slate-400 border focus:outline focus:outline-slate-800 rounded-md py-2 px-4"
          />
        </Field>
        <Field>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Пароль"
            className="w-full border-slate-400 border focus:outline focus:outline-slate-800 rounded-md py-2 px-4"
          />
        </Field>
        {error && (
          <div className="border border-red-600 rounded-md p-2 text-red-600 bg-red-100 flex gap-2 items-center">
            <HiExclamationTriangle className="text-2xl" />
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition rounded-md py-2 px-4"
        >
          Войти
        </Button>
      </Fieldset>
    </form>
  );
};

export default Auth;

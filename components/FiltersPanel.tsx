"use client";

import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler } from "react";

const debounce = (
  func: ChangeEventHandler<HTMLInputElement>,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(e), delay);
  };
};

const FiltersPanel = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = debounce((e) => {
    const key = e.target.name;
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(pathname + "?" + params.toString());
  }, 1000);

  return (
    <nav>
      <Fieldset className="bg-slate-300 shadow-xl rounded-lg mx-auto p-4">
        <Legend className="text-xl font-bold">Фильтры</Legend>
        <div className="flex gap-2 flex-wrap">
          <Field className="flex flex-col grow">
            <Label>Название</Label>
            <Input
              name="title"
              onChange={handleChange}
              defaultValue={searchParams.get("title") || ""}
              className="border-slate-400 rounded-md px-4 py-2 border bg-white focus:outline focus:outline-slate-800"
            />
          </Field>
          <Field className="flex flex-col">
            <Label>После</Label>
            <Input
              name="dateMin"
              onChange={handleChange}
              type="date"
              defaultValue={searchParams.get("dateMin") || ""}
              className="border-slate-400 rounded-md px-4 py-2 border bg-white focus:outline focus:outline-slate-800"
            />
          </Field>
          <Field className="flex flex-col">
            <Label>До</Label>
            <Input
              name="dateMax"
              onChange={handleChange}
              type="date"
              defaultValue={searchParams.get("dateMax") || ""}
              className="border-slate-400 rounded-md px-4 py-2 border bg-white focus:outline focus:outline-slate-800"
            />
          </Field>
        </div>
      </Fieldset>
    </nav>
  );
};

export default FiltersPanel;

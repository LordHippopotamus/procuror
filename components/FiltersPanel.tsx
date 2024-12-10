"use client";

import Input from "@/components/ui/Input";
import { Field, Fieldset, Label } from "@headlessui/react";
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
      <Fieldset className="mx-auto">
        <div className="flex gap-2 flex-wrap">
          <Field className="flex flex-col grow">
            <Label>Название</Label>
            <Input
              name="title"
              onChange={handleChange}
              defaultValue={searchParams.get("title") || ""}
            />
          </Field>
          <Field className="flex flex-col">
            <Label>С</Label>
            <Input
              name="dateMin"
              onChange={handleChange}
              type="date"
              defaultValue={searchParams.get("dateMin") || ""}
            />
          </Field>
          <Field className="flex flex-col">
            <Label>По</Label>
            <Input
              name="dateMax"
              onChange={handleChange}
              type="date"
              defaultValue={searchParams.get("dateMax") || ""}
            />
          </Field>
        </div>
      </Fieldset>
    </nav>
  );
};

export default FiltersPanel;

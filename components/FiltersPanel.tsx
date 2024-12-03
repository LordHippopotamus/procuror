"use client";

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
      <input
        name="title"
        onChange={handleChange}
        defaultValue={searchParams.get("title") || ""}
      />
      <input
        name="dateMin"
        onChange={handleChange}
        type="date"
        defaultValue={searchParams.get("dateMin") || ""}
      />
      <input
        name="dateMax"
        onChange={handleChange}
        type="date"
        defaultValue={searchParams.get("dateMax") || ""}
      />
    </nav>
  );
};

export default FiltersPanel;

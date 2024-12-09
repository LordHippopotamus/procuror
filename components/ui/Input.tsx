import { InputProps, Input as HeadlessInput } from "@headlessui/react";

const Input = ({ className = "", ...rest }: InputProps) => (
  <HeadlessInput
    className={"border border-blue-400 p-2 " + className}
    {...rest}
  />
);

export default Input;

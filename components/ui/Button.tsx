import { ButtonProps, Button as HeadlessButton } from "@headlessui/react";

const Button = ({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode } & ButtonProps) => (
  <HeadlessButton
    className={
      "rounded-xl px-12 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition font-bold tracking-widest " +
      className
    }
    {...rest}
  >
    {children}
  </HeadlessButton>
);

export default Button;

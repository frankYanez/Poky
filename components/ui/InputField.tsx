import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function InputField({
  className,
  type = "text",
  ...rest
}: InputProps) {
  const classes = [
    "w-full rounded-md border border-white/20 bg-white/5 px-4 py-3",
    "text-white placeholder:text-white/40",
    "transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:outline-none",
    "backdrop-blur-md shadow-inner shadow-black/10",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input type={type} className={classes} {...rest} />;
}

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function PrimaryButton({
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3",
    "border border-primary/60 bg-primary/40 text-white shadow-glow-primary",
    "backdrop-blur-xl transition-all duration-200",
    "hover:bg-primary/55 hover:border-primary/70 hover:shadow-glow",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70",
    "active:translate-y-px",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

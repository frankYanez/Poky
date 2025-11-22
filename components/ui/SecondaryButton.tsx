import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function SecondaryButton({
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3",
    "border border-primary/40 bg-white/5 text-primary shadow-glow",
    "backdrop-blur-lg transition-all duration-200",
    "hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
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

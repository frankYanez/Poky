import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export function Eyebrow({ className, children, ...rest }: Props) {
  return (
    <span
      className={[
        "pill",
        "text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}

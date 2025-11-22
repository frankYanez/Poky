import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  color?: string;
};

export function GlowDot({ className, color, style, ...rest }: Props) {
  return (
    <div
      className={["absolute h-3 w-3 rounded-full", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: color ?? "var(--color-accent)",
        boxShadow: `0 0 18px ${color ?? "var(--color-accent)"}`,
        ...style,
      }}
      {...rest}
    />
  );
}

import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function GlassCard({ className, children, ...rest }: GlassCardProps) {
  const classes = [
    "relative overflow-hidden rounded-lg border border-white/10 bg-surface",
    "backdrop-blur-2xl shadow-xl shadow-glow",
    "transition hover:border-white/20 hover:shadow-glow-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      <div className="pointer-events-none absolute inset-0 bg-white/4" />
      <div className="relative p-6">{children}</div>
    </div>
  );
}

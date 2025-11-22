import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  title?: string;
  eyebrow?: string;
  lead?: ReactNode;
  variant?: "dark" | "darker";
};

export function Section({
  className,
  children,
  title,
  eyebrow,
  lead,
  variant = "dark",
  ...rest
}: Props) {
  const bg =
    variant === "darker"
      ? "bg-[linear-gradient(160deg,#0b0f1c,#05070d)]"
      : "bg-[linear-gradient(150deg,#11172a,#0b1020)]";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border border-white/5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        bg,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(109,243,197,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(157,123,255,0.12),transparent_36%)]" />
      <div className="relative space-y-4 px-6 py-10 sm:px-10 sm:py-12">
        {eyebrow ? <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]">{eyebrow}</p> : null}
        {title ? (
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
            {title}
          </h2>
        ) : null}
        {lead ? <p className="text-[var(--color-muted)] max-w-3xl">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

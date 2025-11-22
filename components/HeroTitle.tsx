import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  lead?: ReactNode;
};

export function HeroTitle({ className, children, lead, ...rest }: Props) {
  return (
    <div className="space-y-4">
      <h1
        className={[
          "text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1]",
          "text-[var(--color-text)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </h1>
      {lead ? (
        <p className="max-w-3xl text-lg sm:text-xl text-[var(--color-muted)]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

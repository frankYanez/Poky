import type { HTMLAttributes, ReactNode } from "react";

type Tone = "default" | "muted" | "primary" | "accent";

const toneClasses: Record<Tone, string> = {
  default: "text-white",
  muted: "text-white/70",
  primary: "text-primary",
  accent: "text-accentBlue",
};

type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: Tone;
  children: ReactNode;
};

function composeClasses(base: string, color: Tone, extra?: string) {
  return [base, toneClasses[color] ?? toneClasses.default, extra]
    .filter(Boolean)
    .join(" ");
}

export function Title({
  as: Component = "h1",
  className,
  color = "default",
  children,
  ...rest
}: TypographyProps) {
  return (
    <Component
      className={composeClasses(
        "text-4xl sm:text-5xl font-semibold leading-tight tracking-tight",
        color,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Subtitle({
  as: Component = "h2",
  className,
  color = "muted",
  children,
  ...rest
}: TypographyProps) {
  return (
    <Component
      className={composeClasses(
        "text-xl sm:text-2xl font-medium leading-7",
        color,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Body({
  as: Component = "p",
  className,
  color = "muted",
  children,
  ...rest
}: TypographyProps) {
  return (
    <Component
      className={composeClasses(
        "text-base leading-7 text-white/80",
        color,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Caption({
  as: Component = "span",
  className,
  color = "muted",
  children,
  ...rest
}: TypographyProps) {
  return (
    <Component
      className={composeClasses(
        "text-sm leading-5 uppercase tracking-[0.12em]",
        color,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

import type { ReactNode } from "react";

type Item = {
  title: string;
  body: string;
  icon?: ReactNode;
};

type Props = {
  items: Item[];
};

export function Card3Col({ items }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="surface relative space-y-4 p-6"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(109,243,197,0.08),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(75,210,255,0.08),transparent_40%)]" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent)]">
                {item.icon ?? <span aria-hidden>★</span>}
              </div>
              <div className="h-2 w-12 rounded-full bg-[var(--color-accent)]/50 blur-[12px]" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text)]">
              {item.title}
            </h3>
            <p className="text-[var(--color-muted)]">{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

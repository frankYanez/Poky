import { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { containerSection } from "../lib/cva/ContainerSection";

type Props = VariantProps<typeof containerSection> & {
  id?: string;
  className?: string; 
  children?: ReactNode;
};

export function ContainerSection({
  id,
  className,
  padding,
  minHeight,
  children,
}: Props) {
  return (
    <section className={containerSection({ padding, minHeight, className })}>
      {id && <span id={id} className="-top-20 absolute" />}
      {children}
    </section>
  );
}

export default ContainerSection;

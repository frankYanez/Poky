import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { ElementType, ReactNode } from "react";
import { containerContent } from "../lib/cva/containerContent";

interface ContainerContentProps extends VariantProps<typeof containerContent> {
	children: ReactNode;
	as?: ElementType;
	className?: string;
}

export const ContainerContent: React.FC<ContainerContentProps> = ({
	children,
	as: Component = "div",
	className = "",
	padded,
	centerX,
	centerY,
	maxWidth,
	padding,
}) => {
	const classes = `${containerContent({
		padded,
		centerX,
		centerY,
		maxWidth,
		padding,
	})}${className ? ` ${className}` : ""}`;

	return <Component className={classes}>{children}</Component>;
};

export default ContainerContent;
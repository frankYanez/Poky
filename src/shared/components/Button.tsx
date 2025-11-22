"use client";
import type { VariantProps } from "class-variance-authority";
import { button } from "../lib/cva/button";

interface ButtonProps extends VariantProps<typeof button> {
	onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
	disabled?: boolean;
	href?: string;
	target?: string;
	rel?: string;
	id?: string;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
	type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
	intent,
	size,
	weight,
	disabled,
	href,
	target,
	rel,
	id,
	className = "",
	onClick,
	children,
	style,
	type = "button",
}) => {
	const classes = `${button({ intent, size, weight })} ${className}`;

	if (href) {
		return (
			<a
				id={id}
				href={href}
				target={target}
				rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
				className={classes}
				aria-disabled={disabled ? "true" : undefined}
				onClick={onClick}
				style={style}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			id={id}
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
};
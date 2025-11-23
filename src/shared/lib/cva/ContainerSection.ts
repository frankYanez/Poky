import { cva } from "class-variance-authority";

export const containerSection = cva("relative w-full overflow-hidden", {
	variants: {
		padding: {
			none: "",
			sm: "py-5 md:py-10 lg:py-16",
			md: "py-20 md:py-28 lg:py-32",
			lg: "py-32 md:py-40 lg:py-48",
		},
		minHeight: {
			none: "",
			screen: "flex min-h-screen items-center",
		},
	},
	defaultVariants: {
		padding: "md",
		minHeight: "screen",
	},
});
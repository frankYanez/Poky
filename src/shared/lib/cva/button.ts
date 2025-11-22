import { cva } from "class-variance-authority";

export const button = cva(
	"flex cursor-pointer items-center justify-center gap-2 rounded-3xl font-bold transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			intent: {
				ghost: "bg-transparent text-white hover:bg-secondary/50",
				white:
					"border border-white/90 bg-white/90 text-black backdrop-blur-3xl hover:bg-white/90",
				outline:
					"border border-white/90 text-white/90 hover:border-background hover:bg-secondary hover:text-background",
			},
			size: {
				sm: "px-3 py-1.5 text-sm",
				md: "px-4 py-2 text-base",
				lg: "px-5 py-3 text-lg",
			},
			weight: {
				sm: "font-extralight",
				md: "font-normal",
				lg: "font-bold",
			},
		},
		defaultVariants: {
			intent: "white",
			size: "lg",
			weight: "lg",
		},
	},
);
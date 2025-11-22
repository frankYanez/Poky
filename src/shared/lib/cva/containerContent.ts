import { cva } from "class-variance-authority";

export const containerContent = cva(
  "relative overflow-x-hidden lg:overflow-x-visible",
  {
    variants: {
      padded: {
        true: "px-4 sm:px-8 md:px-10 lg:px-0",
        false: "",
      },
      padding: {
        none: "",
        sm: "py-10 md:py-16",
        md: "py-20 md:py-28",
        lg: "py-32 md:py-40 lg:py-48",
        xl: "py-44 md:py-52 lg:py-60",
      },
      centerX: {
        true: "mx-auto",
        false: "",
      },
      centerY: {
        true: "flex flex-col justify-center",
        false: "",
      },
      maxWidth: {
        default: "max-w-6xl 2xl:max-w-7xl",
        wide: "max-w-7xl 2xl:max-w-8xl",
        compact: "max-w-5xl",
        full: "w-full max-w-none",
      },
    },
    defaultVariants: {
      padded: true,
      padding: "none",
      centerX: true,
      centerY: false,
      maxWidth: "default",
    },
  }
);
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-cream hover:bg-ink-80 active:bg-ink",
        accent: "bg-accent text-white hover:bg-accent-dark",
        outline:
          "border border-ink text-ink hover:bg-ink hover:text-cream",
        ghost: "text-ink hover:bg-cream-100",
        link: "text-ink underline underline-offset-4 hover:text-accent",
        soft: "bg-cream-100 text-ink hover:bg-cream-200 border border-line",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm tracking-wide",
        lg: "h-14 px-8 text-base tracking-wide",
        icon: "h-10 w-10",
      },
      shape: {
        sharp: "rounded-none",
        rounded: "rounded-full",
        soft: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "sharp",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };

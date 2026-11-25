import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "narrow";
}) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1440px]",
    narrow: "max-w-2xl",
  };
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)}
    >
      {children}
    </div>
  );
}

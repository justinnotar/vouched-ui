import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[#c85b3f] text-[#fffdf9] hover:bg-[#a9472d] shadow-[0_10px_30px_rgba(200,91,63,0.18)]",
  secondary: "bg-[#efe4d3] text-[#111827] hover:bg-[#e8d8c3]",
  outline: "border border-[#111827]/12 bg-[#fffdf9] text-[#111827] hover:bg-[#f6e9d8]",
  ghost: "text-[#475569] hover:bg-[#efe4d3] hover:text-[#111827]",
  destructive: "bg-rose-600 text-white hover:bg-rose-700",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: "default" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85b3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f2e8] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none",
          size === "icon" ? "h-10 w-10 p-0" : "px-4 py-2",
          buttonVariants[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

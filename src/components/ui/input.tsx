import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Patched Input component
 * - Defaults to white background & dark text for visibility on dark themes
 * - Keeps focus/disabled/file states from ShadCN
 * - Still allows overriding with className (e.g., "bg-transparent text-white")
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // Base ShadCN styles
          "flex h-10 w-full rounded-md border border-input px-3 py-2 text-base md:text-sm",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",

          // 👇 Default patch for better contrast on dark pages
          "bg-white text-black placeholder:text-gray-500 border-gray-200",

          // Allow overrides
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };

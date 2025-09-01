import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-pu-gray-300 bg-white px-3 py-2 text-sm text-pu-gray-900 placeholder:text-pu-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pu-blue/20 focus-visible:border-pu-blue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-pu-gray-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

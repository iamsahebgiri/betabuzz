import React from "react";
import { cn } from "@/lib/utils";

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormErrorMessage.displayName = "FormErrorMessage";

export { FormErrorMessage };

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export interface StatesProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  icon: any;
}

function EmptyState({
  className,
  icon,
  title,
  subtitle,
  ...props
}: StatesProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      {...props}
    >
      <Icon icon={icon} className="h-12 w-12 text-gray-300" />
      <h2 className="font-bold">{title}</h2>
      <p className="font-medium max-w-[280px] text-center text-muted-foreground text-sm">
        {subtitle}
      </p>
    </div>
  );
}

function LoadingState({
  className,
  ...props
}: Omit<StatesProps, "icon" | "title" | "subtitle">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-muted-foreground animate-spin"
      >
        <path
          fill="currentColor"
          d="M12 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm8.66-10a1 1 0 0 1-.366 1.366l-2.598 1.5a1 1 0 1 1-1-1.732l2.598-1.5A1 1 0 0 1 20.66 7ZM7.67 14.5a1 1 0 0 1-.367 1.366l-2.598 1.5a1 1 0 1 1-1-1.732l2.598-1.5a1 1 0 0 1 1.366.366ZM20.66 17a1 1 0 0 1-1.366.366l-2.598-1.5a1 1 0 0 1 1-1.732l2.598 1.5A1 1 0 0 1 20.66 17ZM7.67 9.5a1 1 0 0 1-1.367.366l-2.598-1.5a1 1 0 1 1 1-1.732l2.598 1.5A1 1 0 0 1 7.67 9.5Z"
        />
      </svg>
    </div>
  );
}

export { EmptyState, LoadingState };

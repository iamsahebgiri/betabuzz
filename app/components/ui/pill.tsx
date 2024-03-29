import { getColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function Pill({ className, title, ...props }: PillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getColor(title),
        className
      )}
      {...props}
    >
      {title}
    </div>
  );
}

export { Pill };

import React from "react";
import { Icons } from "../icons";
import { User } from "@/types";
import { plansColor } from "@/config/plan-colors";
import { cn } from "@/lib/utils";

interface UsernameProps extends React.HTMLAttributes<HTMLHeadingElement> {
  user: User,
  iconClassName?: string
}

export default function Username({ user, className, iconClassName }: UsernameProps) {
  const type = user.plan as "free" | "starter" | "pro" | "premium";
  const currentPlan = plansColor[type];

  return (
    <div className="inline-flex items-center space-x-1">
      <h1 className={className}>{user.name}</h1>
      {user.plan !== "free" && (
        <Icons.verified className={cn("h-5 w-5", currentPlan.color, iconClassName)} />
      )}
    </div>
  );
}

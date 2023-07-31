import React from "react";
import { Icons } from "../icons";
import { User } from "@/types";
import { plansColor } from "@/config/plan-colors";

export default function Username({ user }: { user: User }) {
  const type = user.plan as "free" | "starter" | "pro" | "premium";
  const currentPlan = plansColor[type];

  return (
    <div className="inline-flex items-center space-x-1">
      <h1 className="font-bold">{user.name}</h1>
      {user.plan !== "free" && (
        <Icons.verified className={`h-5 w-5 ${currentPlan.color}`} />
      )}
    </div>
  );
}

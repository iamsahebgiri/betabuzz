import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

const plans = {
  red: {
    color: "text-red-500",
    colorDark: "text-red-800",
    gradient: "from-rose-500 to-red-500",
  },
  blue: {
    color: "text-blue-500",
    colorDark: "text-blue-800",
    gradient: "from-cyan-500 to-blue-500",
  },
  yellow: {
    color: "text-yellow-500",
    colorDark: "text-yellow-800",
    gradient: "from-amber-500 to-yellow-500",
  },
};

export default function SubscriptionForm() {
  const currentPlan = plans.red;
  return (
    <div className="flex flex-col space-y-4 ">
      <span className="text-lg font-bold">Settings</span>
      <div className="group">
        <div className="group-hover:bg-secodary/80 bg-background w-full rounded-2xl border p-5 shadow-sm duration-150 group-hover:shadow-lg group-hover:transition group-hover:ease-in-out">
          <span className="flex items-center justify-between ">
            <span className="flex items-center space-x-4">
              <span className="text-md ">
                <p className="font-bold">Theme</p>
                <p className="text-muted-foreground text-sm font-semibold">
                  Toggle the button to change the theme
                </p>
              </span>
            </span>
            <div>
              <ThemeToggle />
            </div>
          </span>
        </div>
      </div>
      <span className="text-lg font-bold">Subscriptions</span>
      <div className="group">
        <div
          className={`group-hover:bg-secodary/80 w-full space-y-4 rounded-2xl border bg-gradient-to-tr ${currentPlan.gradient} p-5 shadow-sm duration-150 group-hover:shadow-lg group-hover:transition group-hover:ease-in-out`}
        >
          <span className="flex items-center justify-between ">
            <span className="flex items-center space-x-4">
              <span className="text-md ">
                <p className="font-bold text-white">Subscriptions</p>
                <p className="text-sm font-semibold text-white/70">
                  You are using a blue plan
                </p>
              </span>
            </span>
            <div>
              <Icons.verified className="h-12 w-12 text-white/40" />
            </div>
          </span>
          <Link
            href="/"
            className={buttonVariants({
              variant: "unstyled",
              className: `bg-white/70 ${currentPlan.colorDark} hover:bg-white/60`,
            })}
          >
            Upgrade
          </Link>
        </div>
      </div>
      {/* <Button onClick={handleLogout}>Log out</Button> */}
    </div>
  );
}

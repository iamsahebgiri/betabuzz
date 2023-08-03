import React, { useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { Icons } from "../icons";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import useUser from "@/hooks/use-user";
import { plansColor } from "@/config/plan-colors";
import userService from "@/services/user.service";

export default function SubscriptionForm() {
  const { user } = useUser();
  const type = user.plan as "free" | "starter" | "pro" | "premium";
  const currentPlan = plansColor[type];

  const [isLoading, setIsLoading] = useState(false);

  const handleManage = () => {
    setIsLoading(true);
    userService
      .manageBilling()
      .then((res) => {
        if (window) {
          window.location = res.url;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col space-y-4 ">
      {/* <span className="text-lg font-bold">Settings</span>
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
      <span className="text-lg font-bold">Subscriptions</span> */}
      <div className="group">
        <div
          className={`group-hover:bg-secodary/80 w-full space-y-4 rounded-2xl border bg-gradient-to-tr ${currentPlan.gradient} p-5 shadow-sm duration-150 group-hover:shadow-lg group-hover:transition group-hover:ease-in-out`}
        >
          <span className="flex items-center justify-between ">
            <span className="flex items-center space-x-4">
              <span className="text-md ">
                <p className="font-bold text-white">Subscriptions</p>
                <p className="text-sm font-semibold text-white/70">
                  You are using a {type} plan
                </p>
              </span>
            </span>
            <div>
              <Icons.verified className="h-12 w-12 text-white/40" />
            </div>
          </span>
          {user.plan === "free" ? (
            <Link
              href="/billing/plans"
              className={buttonVariants({
                variant: "unstyled",
                className: `bg-white/70 ${currentPlan.colorDark} hover:bg-white/60`,
              })}
            >
              Upgrade
            </Link>
          ) : (
            <Button
              variant="unstyled"
              className={`bg-white/70 ${currentPlan.colorDark} hover:bg-white/60`}
              onClick={handleManage}
              isLoading={isLoading}
            >
              Manage
            </Button>
          )}
        </div>
      </div>
      {/* <Button onClick={handleLogout}>Log out</Button> */}
    </div>
  );
}

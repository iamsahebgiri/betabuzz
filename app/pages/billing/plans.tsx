import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import userService from "@/services/user.service";
import { Icon } from '@iconify/react';
import checkmark24Regular from '@iconify/icons-fluent/checkmark-24-regular';
import { useState } from "react";

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"monthly" | "yearly">("monthly");
  const handleOnClick = (priceId: string) => {
    setIsLoading(true);
    userService
      .upgradeBilling(priceId)
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
    <div>
      <div className="max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <Icons.logo className="mx-auto h-12 w-12 mb-8" />
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-center">
            Pricing Plans
          </h1>
          <div className="relative self-center mt-6 bg-gray-100 rounded-full p-0.5 flex sm:mt-8">
            <button
              type="button"
              onClick={() => setType("monthly")}
              className={cn(
                "relative w-1/2 border border-transparent rounded-full shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 transition-all focus:ring-ring focus:z-10 sm:w-auto sm:px-8",
                type === "monthly" && "bg-white border-gray-200"
              )}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setType("yearly")}
              className={cn(
                "relative w-1/2 border border-transparent rounded-full shadow-sm py-2 text-sm font-medium transition-all text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-ring focus:z-10 sm:w-auto sm:px-8",
                type === "yearly" && "bg-white border-gray-200"
              )}
            >
              Yearly billing
            </button>
          </div>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.slug}
              className={cn(
                "rounded-2xl shadow-sm bg-gradient-to-t",
                plan.slug === "starter" && "p-1.5 from-cyan-500 to-blue-800",
                plan.slug === "pro" && "p-1.5 from-amber-500 to-yellow-800",
                plan.slug === "premium" && "p-1.5 from-rose-500 to-red-800"
              )}
            >
              <div
                className={cn(
                  "rounded-xl bg-background divide-y divide-muted"
                )}
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium">
                    {plan.name}
                  </h2>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold">
                      Rs. {plan.price[type].amount.toString().slice(0, -2)}
                    </span>{" "}
                    <span className="text-base font-medium text-muted-foreground">
                      {type === "monthly" ? "/mo" : "/yr"}
                    </span>
                  </p>
                  <Button
                    className="mt-8"
                    onClick={() =>
                      handleOnClick(plan.price[type].priceIds["development"])
                    }
                    disabled={isLoading}
                  >
                    Buy {plan.name.toLowerCase()}
                  </Button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-bold tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.includedFeatures.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <Icon icon={checkmark24Regular} className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

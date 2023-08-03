import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import userService from "@/services/user.service";
import { Icon } from "@iconify/react";
import checkmark24Regular from "@iconify/icons-fluent/checkmark-24-regular";
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
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Icons.logo className="mx-auto mb-8 h-12 w-12" />
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-center text-5xl font-extrabold">Pricing Plans</h1>
          <div className="relative mt-6 flex self-center rounded-full bg-gray-100 p-0.5 sm:mt-8">
            <button
              type="button"
              onClick={() => setType("monthly")}
              className={cn(
                "relative w-1/2 whitespace-nowrap rounded-full border border-transparent py-2 text-sm font-medium text-gray-900 shadow-sm transition-all focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring sm:w-auto sm:px-8",
                type === "monthly" && "border-gray-200 bg-white"
              )}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setType("yearly")}
              className={cn(
                "relative w-1/2 whitespace-nowrap rounded-full border border-transparent py-2 text-sm font-medium text-gray-900 shadow-sm transition-all focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring sm:w-auto sm:px-8",
                type === "yearly" && "border-gray-200 bg-white"
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
                "rounded-2xl bg-gradient-to-t shadow-sm",
                plan.slug === "starter" && "from-cyan-500 to-blue-800 p-1.5",
                plan.slug === "pro" && "from-amber-500 to-yellow-800 p-1.5",
                plan.slug === "premium" && "from-rose-500 to-red-800 p-1.5"
              )}
            >
              <div
                className={cn("divide-y divide-muted rounded-xl bg-background")}
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6">{plan.name}</h2>
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
                <div className="px-6 pb-8 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    What&apos;s included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.includedFeatures.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <Icon
                          icon={checkmark24Regular}
                          className="h-5 w-5 shrink-0 text-green-500"
                        />
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

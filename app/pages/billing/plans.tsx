import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import userService from "@/services/user.service";
import { CheckIcon } from "@radix-ui/react-icons";
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
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
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
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.slug}
              className={cn(
                "border border-gray-200 rounded-2xl shadow-sm divide-y divide-gray-200",
                plan.slug === "pro" && " border-4 border-red-500 "
              )}
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    Rs. {plan.price[type].amount.toString().slice(0, -2)}
                  </span>{" "}
                  <span className="text-base font-medium text-gray-500">
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
                  Buy {plan.name}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {plan.includedFeatures.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

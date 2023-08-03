import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import checkmarkCircle24Regular from "@iconify/icons-fluent/checkmark-circle-24-regular";
import Head from "next/head";
import { siteConfig } from "@/config/site";

export default function SuccessPage() {
  return (
    <div>
      <Head>
        <title>{`Payment successful - ${siteConfig.name}`}</title>
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="p-6 md:mx-auto">
          <Icon
            icon={checkmarkCircle24Regular}
            className="mx-auto my-6 h-16 w-16 text-green-600"
          />
          <div className="text-center">
            <h3 className="text-center text-base font-bold md:text-2xl">
              Payment Done!
            </h3>
            <p className="text-muted-foreground my-2 font-medium">
              Thank you for completing your secure online payment.
            </p>
            <p className=" font-medium"> Have a great day! </p>
            <div className="py-10 text-center">
              <Link href="/" className={buttonVariants({ variant: "default" })}>
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

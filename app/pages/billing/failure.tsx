import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Icon } from '@iconify/react';
import dismissCircle24Regular from '@iconify/icons-fluent/dismiss-circle-24-regular';
import Head from "next/head";
import { siteConfig } from "@/config/site";

export default function FailurePage() {
  return (
    <div>
      <Head>
        <title>{`Payment failed - ${siteConfig.name}`}</title>
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="p-6 md:mx-auto">
          <Icon
            icon={dismissCircle24Regular}
            className="mx-auto my-6 h-16 w-16 text-red-600"
          />
          <div className="text-center">
            <h3 className="text-center text-base font-bold md:text-2xl">
              Payment failed!
            </h3>
            <p className="my-2 font-medium text-muted-foreground">
              Try again! If something goes wrong talk to support.
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

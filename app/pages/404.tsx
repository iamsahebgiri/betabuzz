import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import cloudError24Regular from "@iconify/icons-fluent/cloud-error-24-regular";
import Head from "next/head";
import { siteConfig } from "@/config/site";

export default function NotFoundPage() {
  return (
    <div>
      <Head>
        <title>{`Page not found - ${siteConfig.name}`}</title>
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="p-6 md:mx-auto">
          <Icon
            icon={cloudError24Regular}
            className="mx-auto my-6 h-16 w-16 text-red-600"
          />
          <div className="text-center">
            <h3 className="text-center text-base font-bold md:text-2xl">
              You are lost dwag!
            </h3>
            <p className="my-2 font-medium text-muted-foreground">
              Sorry, the page you are looking for cannot be found.
            </p>
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

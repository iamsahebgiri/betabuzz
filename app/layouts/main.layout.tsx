import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import Head from "next/head";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      <div className="flex-1">{children}</div>
    </div>
  );
}

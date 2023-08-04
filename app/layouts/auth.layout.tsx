import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import Head from "next/head";
import React from "react";
import MainLayout from "./main.layout";
import useUser from "@/hooks/use-user";
import { LoadingState } from "@/components/ui/states";
import { useRouter } from "next/router";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { loading, loggedOut } = useUser();

  if (loading) {
    return <LoadingState />;
  }

  if (loggedOut) {
    const redirectTo = router.asPath;

    router.push(`/?next=${redirectTo}`);
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}

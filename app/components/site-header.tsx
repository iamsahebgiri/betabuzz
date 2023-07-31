import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import useUser from "@/hooks/use-user";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "./user-nav";


export function SiteHeader() {
  const { mainNav, name } = siteConfig;
  const router = useRouter();

  let allowedMainNav =
    mainNav.filter(({ href }) => href === router.pathname).length !== 0;
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
        <Link href="/" className="flex items-center gap-2 ">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">{name}</span>
        </Link>
        {allowedMainNav ? <MainNav items={mainNav} /> : null}
        <nav className="flex items-center space-x-1">
          <UserNav />
        </nav>
      </div>
    </header>
  );
}

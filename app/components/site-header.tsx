import Link from "next/link";
import { useRouter } from "next/router";

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function SiteHeader() {
  const { mainNav, name } = siteConfig;
  const router = useRouter();

  let allowedMainNav =
    mainNav.filter(({ href }) => href === router.pathname).length !== 0;
  
    return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <Link href="/" className="flex items-center gap-2 ">
          <Icons.logo className="text-primary h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">{name}</span>
        </Link>
        {allowedMainNav ? <MainNav items={mainNav} /> : null}
        <nav className="flex items-center space-x-2">
          <ThemeToggle className="hidden sm:flex" />
          <UserNav />
        </nav>
      </div>
    </header>
  );
}

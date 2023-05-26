import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import useUser from "@/hooks/use-user";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const UserMenu = () => {
  const { user, loading, loggedOut, mutate } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedOut) {
    return (
      <Link href="/login" className={buttonVariants({ variant: "default" })}>
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link href="/me">
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user.name} />
          <AvatarFallback>
            <Image
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              fill
            />
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        {/* <MainNav items={siteConfig.mainNav} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4 md:flex-none">
          <nav className="flex items-center space-x-1">
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}

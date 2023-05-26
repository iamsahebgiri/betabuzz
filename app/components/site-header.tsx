import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import useUser from "@/hooks/use-user";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainNav } from "@/components/main-nav";

const UserMenu = () => {
  const { user, loading, loggedOut } = useUser();

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
      <Link
        href="/products/new"
        className={buttonVariants({ variant: "default" })}
      >
        Create
      </Link>
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
  const { mainNav, name } = siteConfig;
  const router = useRouter();

  let allowedMainNav =
    mainNav.filter(({ href }) => href === router.pathname).length !== 0;
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">{name}</span>
        </Link>
        {allowedMainNav ? <MainNav items={mainNav} /> : null}
        <div className="flex flex-1 items-center justify-end space-x-4 md:flex-none">
          <nav className="flex items-center space-x-1">
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}

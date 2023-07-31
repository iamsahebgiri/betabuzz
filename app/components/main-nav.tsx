import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types/nav";
import { buttonVariants } from "@/components/ui/button";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();
  return (
    <div>
      {items?.length ? (
        <nav className="gap-2 flex md:gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({
                    variant: pathname.endsWith(item.href)
                      ? "secondary"
                      : "ghost",
                    size: "sm",
                  })}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/use-user";
import authService from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/router";

export function UserNav() {
  const router = useRouter();
  const { user, loading, loggedOut, mutate } = useUser();

  if (loading) {
    return <Skeleton className="h-12 w-12 rounded-full" />;
  }

  if (loggedOut) {
    return (
      <Link href="/login" className={buttonVariants({ variant: "default" })}>
        Sign in
      </Link>
    );
  }

  const handleLogout = async () => {
    await authService.signOut();
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-semibold leading-none">{user.name}</p>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/me")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/products/new")}>
            New product
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

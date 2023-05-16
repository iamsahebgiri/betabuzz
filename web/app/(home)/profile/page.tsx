import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import authService from "@/services/auth.service"

import { getCurrentUser } from "@/lib/session"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  const handleLogout = async () => {
    await authService.signOut()
  }

  const plans = {
    red: {
      color: "text-red-500",
      colorDark: "text-red-800",
      gradient: "from-rose-500 to-red-500",
    },
    blue: {
      color: "text-blue-500",
      colorDark: "text-blue-800",
      gradient: "from-cyan-500 to-blue-500",
    },
    yellow: {
      color: "text-yellow-500",
      colorDark: "text-yellow-800",
      gradient: "from-amber-500 to-yellow-500",
    },
  }

  const currentPlan = plans.red

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (!user) {
  //   return <div>User not found</div>
  // }

  return (
    <div className="container mx-auto max-w-md py-16">
      <div className="space-y mb-8 text-center">
        <div className="avatar avatar-md mx-auto mb-6 h-32 w-32 rounded-full">
          <Image
            src={user.avatar}
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
            width={128}
            height={128}
            priority
          />
        </div>
        <div className="inline-flex items-center space-x-2">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <Icons.verified className={`h-4 w-4 ${currentPlan.color}`} />
        </div>
        <h2 className="text-md text-muted-foreground font-semibold">
          {user.email}
        </h2>
        <div className="mt-2">
          <Button variant="outline" size="sm" className="space-x-3">
            <span className="-mt-1 text-sm font-bold">Edit profile</span>
            {/* <Icons.penOutline className="h-4 w-4 text-primary" /> */}
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <span className="text-lg font-bold">Settings</span>
        <div className="group">
          <div className="group-hover:bg-secodary/80 bg-background w-full rounded-2xl border p-5 shadow-sm duration-150 group-hover:shadow-lg group-hover:transition group-hover:ease-in-out">
            <span className="flex items-center justify-between ">
              <span className="flex items-center space-x-4">
                <span className="text-md ">
                  <p className="font-bold">Theme</p>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Toggle the button to change the theme
                  </p>
                </span>
              </span>
              <div>
                <ThemeToggle />
              </div>
            </span>
          </div>
        </div>
        {/* <span className="text-lg font-bold">Subscriptions</span> */}
        <div className="group">
          <div
            className={`group-hover:bg-secodary/80 w-full space-y-4 rounded-2xl border bg-gradient-to-tr ${currentPlan.gradient} p-5 shadow-sm duration-150 group-hover:shadow-lg group-hover:transition group-hover:ease-in-out`}
          >
            <span className="flex items-center justify-between ">
              <span className="flex items-center space-x-4">
                <span className="text-md ">
                  <p className="font-bold text-white">Subscriptions</p>
                  <p className="text-sm font-semibold text-white/70">
                    You are using a blue plan
                  </p>
                </span>
              </span>
              <div>
                <Icons.verified className="h-12 w-12 text-white/40" />
              </div>
            </span>
            <Link
              href="/"
              className={buttonVariants({
                variant: "unstyled",
                className: `bg-white/70 ${currentPlan.colorDark} hover:bg-white/60`,
              })}
            >
              Upgrade
            </Link>
          </div>
        </div>
        {/* <Button onClick={handleLogout}>Log out</Button> */}
      </div>
    </div>
  )
}

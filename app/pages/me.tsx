import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import authService from "@/services/auth.service";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import useUser from "@/hooks/use-user";
import MainLayout from "@/layouts/main.layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import userService from "@/services/user.service";
import EditProfileForm from "@/components/forms/edit-profile";

export default function ProfilePage() {
  const { user, loading, mutate } = useUser();
  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    await authService.signOut();
    await mutate();
  };

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
  };

  const currentPlan = plans.red;

  if (loading) return "Loading...";

  return (
    <MainLayout>
      <div className="container mx-auto max-w-md py-16">
        <div className="space-y mb-8 text-center">
          <div className="mb-6">
            <UserAvatar />
          </div>
          <div className="inline-flex items-center space-x-2">
            <h1 className="text-lg font-bold">{user.name}</h1>
            <Icons.verified className={`h-4 w-4 ${currentPlan.color}`} />
          </div>
          <h2 className="text-md text-muted-foreground font-semibold">
            {user.email}
          </h2>
          <div className="mt-2">
            <Dialog open={editing} onOpenChange={setEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <span className=" text-sm font-bold">Edit profile</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <EditProfileForm onSuccess={() => setEditing(false)} />
              </DialogContent>
            </Dialog>
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
          <span className="text-lg font-bold">Subscriptions</span>
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
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </MainLayout>
  );
}

const UserAvatar = () => {
  const { user, mutate } = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsProcessing(true);
      console.log("Uploading...");
      userService
        .uploadAvatar(file, user.id)
        .then(async (res) => {
          await mutate("user.me", res);
          // toast({
          //   title: "Changed avatar successfully.",
          //   variant: "default",
          // });
        })
        .catch((err) => {
          toast({
            title: "Bad request.",
            description: err?.message,
            variant: "destructive",
          });
          console.log(err);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  const deleteAvatar = () => {
    setIsProcessing(true);
    userService
      .deleteAvatar(user.id)
      .then(async (res) => {
        await mutate("user.me", res);
        // toast({
        //   title: "Deleted avatar successfully.",
        //   variant: "default",
        // });
      })
      .catch((err) => {
        toast({
          title: "Bad request.",
          description: err?.message,
          variant: "destructive",
        });
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="flex justify-center">
      {selectedImage && isProcessing ? (
        <div className="w-32 h-32 rounded-full relative">
          <img
            className="w-full h-full object-cover rounded-full"
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-full">
            <Icons.spinner className="h-6 w-6 animate-spin text-white" />
          </div>
        </div>
      ) : (
        <div className="group h-32 w-32 rounded-full overflow-hidden relative">
          <Image
            src={user.avatar}
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
            width={128}
            height={128}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-800 hidden group-hover:flex justify-center items-center space-x-2">
            <label htmlFor="user-avatar" className="cursor-pointer">
              <span className="w-8 h-8 bg-black bg-opacity-40 justify-center items-center rounded-full hidden border-2 border-black/40 hover:border-white group-hover:flex">
                <Icons.pen className="h-5 w-5 text-white" />
              </span>
              <input
                id="user-avatar"
                name="user-avatar"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
            <button
              className="w-8 h-8 bg-black bg-opacity-40 justify-center items-center rounded-full hidden group-hover:flex border-2 border-black/40 hover:border-white"
              onClick={deleteAvatar}
            >
              <Icons.trash className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";

import { Icons } from "@/components/icons";
import SettingsModal from "@/components/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import useUser from "@/hooks/use-user";
import MainLayout from "@/layouts/main.layout";
import userService from "@/services/user.service";
import { getGradient } from "@/lib/gradient";
import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import { siteConfig } from "@/config/site";
import { plansColor } from "@/config/plan-colors";
import { LoadingState } from "@/components/ui/states";
import { UpvotesTab } from "@/components/profile/upvotes-tab";
import { ProductsTab } from "@/components/profile/products-tab";
import AboutTab from "@/components/profile/about-tab";

function UserProfilePage({ username }: { username: string }) {
  const { user, loading } = useUser();
  const {
    data: userProfile,
    error,
    isLoading,
  } = useSWR(`user.${username}`, () => userService.getUserByUsername(username));

  if (isLoading || loading) return <LoadingState />;

  if (!userProfile) {
    return <div>User with username '{username}' is not found.</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }
  const type = userProfile.plan as "free" | "starter" | "pro" | "premium";
  const currentPlan = plansColor[type];

  return (
    <>
      <Head>
        <title>
          {`${userProfile.name} (@${userProfile.username}) - ${siteConfig.name}`}
        </title>
      </Head>
      <div className="container mx-auto max-w-3xl py-8">
        <div>
          <div
            className={`h-48 w-full lg:h-64 rounded-xl ${getGradient(
              userProfile.email
            )}`}
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-10 sm:flex sm:items-center sm:space-x-3">
            <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
              {user.id === userProfile.id ? (
                <UserAvatar />
              ) : (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-full w-full rounded-full object-cover"
                  width={128}
                  height={128}
                />
              )}
            </div>
            <div className="mt-2 sm:mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-start sm:space-x-6">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="inline-flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  {userProfile.plan !== "free" && (
                    <Icons.verified
                      className={`h-5 w-5 ${currentPlan.color}`}
                    />
                  )}
                </div>
                <h2 className="text-base text-muted-foreground font-semibold">
                  {userProfile.username
                    ? `@${userProfile.username}`
                    : userProfile.email}
                </h2>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {user.id === userProfile.id ? <SettingsModal /> : null}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="about" className="relative mr-auto w-full mt-8">
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="about"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="upvotes"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Upvotes
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Products
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="about">
            <AboutTab user={userProfile} />
          </TabsContent>
          <TabsContent value="upvotes">
            <UpvotesTab userId={userProfile.id} />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTab userId={userProfile.id} />
          </TabsContent>
        </Tabs>
      </div>
    </>
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
          mutate(res);
          toast({
            title: "Changed avatar successfully.",
            variant: "default",
          });
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
        mutate(res);
        toast({
          title: "Deleted avatar successfully.",
          variant: "default",
        });
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
    <div>
      {selectedImage && isProcessing ? (
        <div className="group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32 relative border-4 border-muted">
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
        <div className="group h-24 w-24 rounded-full sm:h-32 sm:w-32 border-4 border-muted overflow-hidden relative">
          <img
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
            {user?.avatar !== undefined &&
              user.avatar.includes("amazonaws.com") && (
                <button
                  className="w-8 h-8 bg-black bg-opacity-40 justify-center items-center rounded-full hidden group-hover:flex border-2 border-black/40 hover:border-white"
                  onClick={() => {
                    if (confirm("Are you sure you want to remove this avatar?")) {
                      deleteAvatar();
                    }
                  }}
                >
                  <Icons.trash className="h-5 w-5 text-white" />
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const { query } = useRouter();
  const { username } = query;

  if (!username || typeof username !== "string") {
    return <div>No username</div>;
  }

  return (
    <MainLayout>
      <UserProfilePage username={username} />
    </MainLayout>
  );
}

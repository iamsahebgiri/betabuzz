import { EditProfileForm } from "@/components/forms/edit-profile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import color24Filled from "@iconify/icons-fluent/color-24-filled";
import contactCard24Filled from "@iconify/icons-fluent/contact-card-24-filled";
import lockClosed24Filled from "@iconify/icons-fluent/lock-closed-24-filled";
import personAccounts24Filled from "@iconify/icons-fluent/person-accounts-24-filled";
import settings24Filled from "@iconify/icons-fluent/settings-24-filled";
import receiptMoney24Filled from "@iconify/icons-fluent/receipt-money-24-filled";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AppearanceForm } from "./forms/appearance-form";
import { GeneralForm } from "./forms/general-form";
import { SocialForm } from "./forms/social-form";
import SubscriptionForm from "./forms/subscription-form";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { PasswordForm } from "./forms/password-form";

const sidebarItems = [
  {
    name: "Account",
    value: "account",
    icon: personAccounts24Filled,
  },
  {
    name: "General",
    value: "general",
    icon: settings24Filled,
  },
  {
    name: "Appearance",
    value: "appearance",
    icon: color24Filled,
  },
  {
    name: "Password",
    value: "password",
    icon: lockClosed24Filled,
  },
  {
    name: "Socials",
    value: "socials",
    icon: contactCard24Filled,
  },
  {
    name: "Subscriptions",
    value: "subscriptions",
    icon: receiptMoney24Filled,
  },
];

const ModalHeader = ({ children, description }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold leading-none tracking-tight">
          {children}
        </h3>
        <p className="text-sm font-medium text-muted-foreground mt-2">
          {description}
        </p>
      </div>
      <Separator />
    </div>
  );
};

export default function SettingsModal() {
  const [editing, setEditing] = useState(false);
  return (
    <div>
      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <span className=" text-sm font-bold">Edit profile</span>
          </Button>
        </DialogTrigger>

        <Tabs defaultValue="account">
          <DialogContent className="sm:max-w-3xl h-full flex max-h-[560px] sm:rounded-xl sm:p-0 gap-0">
            <aside className="w-52 bg-gray-100 dark:bg-gray-900 rounded-l-xl flex-none">
              <div className="px-5 py-5 pb-4">
                <h2 className="text-xl font-bold">Settings</h2>
              </div>
              <div className="flex flex-col items-center justify-between px-2.5">
                <TabsList className="w-full h-full justify-start items-start rounded-none bg-transparent p-0 flex-col">
                  {sidebarItems.map((item) => (
                    <TabsTrigger
                      value={item.value}
                      key={item.value}
                      className="relative w-full h-8 text-secondary-foreground rounded-lg gap-2 justify-start font-semibold shadow-none transition data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-none"
                    >
                      <Icon
                        icon={item.icon}
                        className="h-[18px] w-[18px] text-secondary-foreground/70"
                      />
                      {item.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </aside>

            <ScrollArea className="p-6 my-2 border-l flex-1">
              <div className="p-2">
                <TabsContent value="account" className="space-y-6">
                  <ModalHeader description="Update your account settings.">
                    Account
                  </ModalHeader>
                  <EditProfileForm onSuccess={() => setEditing(false)} />
                </TabsContent>
                <TabsContent value="general" className="space-y-6">
                  <ModalHeader description="This is how others will see you on the site.">
                    General
                  </ModalHeader>
                  <GeneralForm onSuccess={() => setEditing(false)} />
                </TabsContent>
                <TabsContent value="appearance" className="space-y-6">
                  <ModalHeader
                    description="Customize the appearance of the app. Automatically
                    switch between day and night themes."
                  >
                    Appearance
                  </ModalHeader>
                  <AppearanceForm />
                </TabsContent>
                <TabsContent value="password" className="space-y-6">
                  <ModalHeader description="Password related settings is located here.">
                    Password
                  </ModalHeader>
                  <PasswordForm onSuccess={() => setEditing(false)} />
                </TabsContent>
                <TabsContent value="socials" className="space-y-6">
                  <ModalHeader description="Let other people find you on the internet">
                    Socials
                  </ModalHeader>
                  <SocialForm onSuccess={() => setEditing(false)} />
                </TabsContent>
                <TabsContent value="subscriptions" className="space-y-6">
                  <ModalHeader description="Let other people find you on the internet">
                    Subscriptions
                  </ModalHeader>
                  <SubscriptionForm />
                </TabsContent>
              </div>
            </ScrollArea>
          </DialogContent>
        </Tabs>
      </Dialog>
    </div>
  );
}

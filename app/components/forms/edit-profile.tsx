import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useUser from "@/hooks/use-user";
import userService from "@/services/user.service";
import { useState } from "react";

const editProfileFormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .nonempty(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .nonempty(),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

interface EditProfileFormProps {
  onSuccess: () => void;
}

export function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      ...user,
    },
    mode: "onChange",
  });

  function onSubmit(data: EditProfileFormValues) {
    if (!user) return null;
    setIsLoading(true);
    userService
      .updateUser(user.id, data)
      .then((res) => {
        mutate(res);
        onSuccess();
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
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="iamsahebgiri" {...field} />
              </FormControl>
              <FormDescription>
                This is your public username name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="iamsahebgiri@betabuzz.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading}>
          Update account
        </Button>
      </form>
    </Form>
  );
}

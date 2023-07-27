import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { extractDomain } from "@/lib/strings";
import { cn } from "@/lib/utils";
import userService from "@/services/user.service";
import delete24Filled from "@iconify/icons-fluent/delete-24-filled";
import { Icon } from "@iconify/react";
import { useState } from "react";

const passwordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface PasswordFormProps {
  onSuccess: () => void;
}

export function PasswordForm({ onSuccess }: PasswordFormProps) {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      ...user,
    },
    mode: "onChange",
  });

  function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    userService
      .updateUser(user.id, { password: data.password })
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="s3cr3t" {...field} />
              </FormControl>
              <FormDescription>
                Password has to be more than 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="s3cr3t" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading}>
          Update password
        </Button>
      </form>
    </Form>
  );
}

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateUserSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormErrorMessage } from "../ui/form-error-message";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import useUser from "@/hooks/use-user";
import userService from "@/services/user.service";
import { toast } from "../ui/use-toast";

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface EditProfileFormProps {
  onSuccess: () => void;
}

export default function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...user,
    },
  });

  function onSubmit(data: UpdateUserFormData) {
    setIsLoading(true);
    userService
      .updateUser(user.id, data)
      .then((res) => {
        mutate("user.me", res);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="name"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
}

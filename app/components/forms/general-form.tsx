import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Icon } from "@iconify/react";
import delete24Filled from "@iconify/icons-fluent/delete-24-filled";
import useUser from "@/hooks/use-user";
import { useState } from "react";
import userService from "@/services/user.service";

const profileFormSchema = z.object({
  name: z.string().nonempty(),
  bio: z.string().max(160).min(4),
  dateOfBirth: z.date().optional(),
  gender: z.enum(["male", "female", "non-binary", "other"]).optional(),
  language: z.string().optional(),
  interests: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  interests: ["AI"],
};

interface GeneralFormProps {
  onSuccess: () => void;
}

export function GeneralForm({ onSuccess }: GeneralFormProps) {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        ...user
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    // @ts-ignore
    name: "interests",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Saheb Giri" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select how you identify yourself" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non binary</SelectItem>
                  <SelectItem value="other">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="odia">Odia</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`interests.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Interests
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add topics that you are interested in
                  </FormDescription>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      size="circle"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Icon icon={delete24Filled} className="h-5 w-5" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append("")}
          >
            Add topic
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}

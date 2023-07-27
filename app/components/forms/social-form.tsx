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

const socialFormSchema = z.object({
  socials: z
    .array(
      z.object({
        href: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type SocialFormValues = z.infer<typeof socialFormSchema>;

interface SocialFormProps {
  onSuccess: () => void;
}

export function SocialForm({ onSuccess }: SocialFormProps) {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      ...user,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control: form.control,
  });

  function onSubmit(data: SocialFormValues) {
    const payload = {
      socials: data.socials?.map((social) => ({
        platform: extractDomain(social.href),
        href: social.href,
      })),
    };

    setIsLoading(true);
    userService
      .updateUser(user.id, payload)
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
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`socials.${index}.href`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Socials
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
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
            onClick={() => append({ href: "https://" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update social</Button>
      </form>
    </Form>
  );
}

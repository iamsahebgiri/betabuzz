import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import discussionService from "@/services/discussion.service";
import { toast } from "../ui/use-toast";

const createDiscussionFormSchema = z.object({
  title: z.string({ required_error: "Please provide a name" }).nonempty(),
  content: z.string(),
});

type CreateDiscussionFormValues = z.infer<typeof createDiscussionFormSchema>;

interface CreateDiscussionFormProps {
  onSuccess: (res: any) => void;
  defaultValues?: Partial<CreateDiscussionFormValues> & { id: string };
}

export function CreateDiscussionForm({
  onSuccess,
  defaultValues,
}: CreateDiscussionFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<CreateDiscussionFormValues>({
    resolver: zodResolver(createDiscussionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: CreateDiscussionFormValues) {
    setIsLoading(true);
    if (defaultValues) {
      discussionService
        .updateDiscussion(defaultValues.id as string, data)
        .then((res) => {
          onSuccess(res);
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
    } else {
      discussionService
        .createDiscussion(data)
        .then((res) => {
          onSuccess(res);
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Aha moments for founder?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  className="h-48"
                  placeholder="Express your thoughts here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit" isLoading={isLoading}>
            {defaultValues ? "Edit" : "Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

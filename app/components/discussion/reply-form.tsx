import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import discussionService from "@/services/discussion.service";
import markdownService from "@/services/markdown.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { z } from "zod";
import Preview from "../ui/editor/preview";
import { LoadingState } from "../ui/states";

const replyFormSchema = z.object({
  raw: z.string().min(1, "Seriously! Write something"),
  html: z.string().optional(),
  parent: z.string().optional(),
});

type UpdateReplyFormValues = z.infer<typeof replyFormSchema>;

function ReplyForm({
  type,
  mutate,
  reply,
  raw,
  handleClose,
}: {
  type: "create" | "edit";
  mutate: KeyedMutator<any>;
  reply?: any;
  raw?: string;
  handleClose?: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMarkdownLoading, setIsMarkdownLoading] = useState<boolean>(false);

  const form = useForm<UpdateReplyFormValues>({
    resolver: zodResolver(replyFormSchema),
    mode: "onChange",
    defaultValues: {
      raw,
      html: "",
    },
  });

  function onSubmit(data: UpdateReplyFormValues) {
    setIsLoading(true);
    const discussionId = router.query.id as string;
    if (type === "edit") {
      if (!reply) return;

      discussionService
        .editReply(discussionId, reply.id, { raw: data.raw })
        .then(async (res) => {
          mutate();
          form.reset();
          if (handleClose) handleClose();
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
    } else if (type === "create") {
      console.log(data);
      discussionService
        .postReply(discussionId, {
          raw: data.raw,
          ...(reply?.id ? { parent: reply.id } : {}),
        })
        .then(async (res) => {
          mutate((prevData: any) => {
            return [...prevData, res];
          });
          form.reset({ raw: "", html: "" });
          if (handleClose) handleClose();
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

  const handlePreview = (value: string) => {
    if (value === "preview") {
      const raw = form.getValues("raw");
      form.setValue("html", raw);
      if (!raw) return;

      setIsMarkdownLoading(true);

      markdownService
        .preview({ source: raw })
        .then((res) => {
          form.setValue("html", res);
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
          setIsMarkdownLoading(false);
        });
    }
  };

  return (
    <div>
      <Tabs defaultValue="write" onValueChange={handlePreview}>
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="write">
              <FormField
                control={form.control}
                name="raw"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-auto font-mono"
                        disabled={isLoading}
                        placeholder="What do you think?"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="preview">
              {!isMarkdownLoading ? (
                <Preview
                  className="min-h-[118px]"
                  html={form.watch("html") ?? ""}
                />
              ) : (
                <LoadingState />
              )}
            </TabsContent>
            <div className="mt-4 space-x-2 text-right">
              {handleClose && (
                <Button type="button" onClick={handleClose} variant="outline">
                  Close
                </Button>
              )}
              <Button type="submit" isLoading={isLoading}>
                {raw ? "Edit" : reply?.parent ? "Reply" : "Comment"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}

export default ReplyForm;

import { useRouter } from "next/router";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createCommentProductSchema } from "@/lib/validations/product";
import { useState } from "react";
import discussionService from "@/services/discussion.service";
import { toast } from "@/components/ui/use-toast";
import { KeyedMutator } from "swr";

type UpdateReplyFormData = z.infer<typeof createCommentProductSchema>;

function ReplyForm({
  type,
  mutate,
  reply,
  content,
  handleClose,
}: {
  type: "create" | "edit";
  mutate: KeyedMutator<any>;
  reply?: any;
  content?: string;
  handleClose?: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateReplyFormData>({
    resolver: zodResolver(createCommentProductSchema),
    defaultValues: {
      content,
    },
  });

  function onSubmit(data: UpdateReplyFormData) {
    setIsLoading(true);
    const discussionId = router.query.id as string;
    if (type === "edit") {
      if (!reply) return;

      discussionService
        .editReply(discussionId, reply.id, data)
        .then(async (res) => {
          mutate();
          reset();
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
      discussionService
        .postReply(discussionId, {
          ...data,
          ...(reply?.id ? { parent: reply.id } : {}),
        })
        .then(async (res) => {
          mutate((prevData: any) => {
            return [...prevData, res];
          });
          reset();
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <Textarea
            id="content"
            disabled={isLoading}
            placeholder="What do you think?"
            {...register("content")}
          />
          {errors?.content && (
            <FormErrorMessage>{errors.content.message}</FormErrorMessage>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {content ? "Edit" : reply?.parent ? "Reply" : "Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ReplyForm;

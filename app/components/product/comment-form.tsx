import { useRouter } from "next/router";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { createCommentProductSchema } from "@/lib/validations/product";
import { useState } from "react";
import productService from "@/services/product.service";
import { toast } from "../ui/use-toast";
import { KeyedMutator } from "swr";
import { Comment } from "@/types";

type UpdateUserFormData = z.infer<typeof createCommentProductSchema>;

function CommentForm({
  type,
  mutate,
  comment,
  content,
  handleClose,
}: {
  type: "create" | "edit";
  mutate: KeyedMutator<any>;
  comment?: Comment;
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
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(createCommentProductSchema),
    defaultValues: {
      content,
    },
  });

  function onSubmit(data: UpdateUserFormData) {
    setIsLoading(true);
    const productId = router.query.id as string;
    if (type === "edit") {
      if (!comment) return;

      productService
        .editComment(productId, comment.id, data)
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
      productService
        .postComment(productId, {
          ...data,
          ...(comment?.id ? { parent: comment.id } : {}),
        })
        .then(async (res) => {
          // mutate((prevData: any) => {
          //   return [
          //     { ...prevData[0], results: [res, ...prevData[0].results] },
          //     ...prevData,
          //   ];
          // });
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
            {content ? "Edit" : comment?.parent ? "Reply" : "Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;

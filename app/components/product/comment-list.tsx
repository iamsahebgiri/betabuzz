import React, { useState } from "react";
import CommentForm from "./comment-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import dayjs from "@/lib/dayjs";
import { Button } from "../ui/button";
import useUser from "@/hooks/use-user";
import productService from "@/services/product.service";
import { toast } from "../ui/use-toast";
import UpvoteCommentButton from "./upvote-comment-btn";
import type { KeyedMutator } from "swr";

function CommentActions({
  commentId,
  productId,
  authorId,
  replyCount,
  upvotesCount,
  upvoted,
  mutate,
}: {
  commentId: string;
  productId: string;
  authorId: string;
  replyCount: number;
  upvotesCount: number;
  upvoted: boolean;
  mutate: KeyedMutator<any>;
}) {
  const { user } = useUser();
  const [replying, setReplying] = useState(false);

  const handleDeleteComment = async () => {
    await productService
      .removeComment(productId, commentId)
      .then(() => {
        mutate(
          (prevData: any) => {
            return prevData.map((page: any) => {
              return {
                ...page,
                results: page.results.filter(
                  (comment: any) => comment.id !== commentId
                ),
              };
            });
          },
          { revalidate: false }
        );
      })
      .catch((error) => {
        toast({
          title: "Couldn't delete comment",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div className="mb-2 flex gap-2 items-center">
        <UpvoteCommentButton
          commentId={commentId}
          productId={productId}
          upvotesCount={upvotesCount}
          upvoted={upvoted}
          mutate={mutate}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setReplying(!replying)}
        >
          Reply
        </Button>

        {user.id === authorId ? (
          <>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
              Delete
            </Button>
          </>
        ) : null}
      </div>

      {replying && <CommentForm parentId={commentId} mutate={mutate} />}
    </>
  );
}

function Comment({ comment, mutate, productId, hidden }: any) {
  return (
    <li className="relative flex gap-6 pb-8 items-start gap-x-2">
      {hidden ? null : (
        <span className="absolute left-[15px] inset-y-0 my-auto h-full w-[2px] bg-border/80" />
      )}
      <div className="flex-none relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-x-3 pt-1">
          <span className="block text-base font-semibold">
            {comment.author.name}
          </span>
          <span className="font-medium text-sm text-muted-foreground">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className="whitespace-pre-wrap font-medium">{comment.content}</p>
        <div className="mt-3">
          <CommentActions
            commentId={comment.id}
            productId={productId}
            authorId={comment.author.id}
            replyCount={0}
            upvotesCount={comment.upvotesCount}
            upvoted={comment.upvoted}
            mutate={mutate}
          />
          {comment.children && comment.children.length > 0 && (
            <ListComments comments={comment.children} />
          )}
        </div>
      </div>
      {/* <div className="relative">:</div> */}
    </li>
  );
}

export default function ListComments({ comments, mutate, productId }: any) {
  return (
    <div>
      <ul>
        {comments.map((comment: any, i: any) => {
          return (
            <Comment
              key={comment.id}
              hidden={comments.length - 1 === i}
              comment={comment}
              productId={productId}
              mutate={mutate}
            />
          );
        })}
      </ul>
    </div>
  );
}

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
import { Comment, CommentWithChildren } from "@/types";
import formatComments from "@/lib/comments";
import Username from "../profile/username";
import Link from "next/link";

function CommentActions({
  comment,
  mutate,
  content,
}: {
  comment: CommentWithChildren;
  mutate: KeyedMutator<any>;
  content?: string;
}) {
  const { user } = useUser();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleDeleteComment = async () => {
    await productService
      .removeComment(comment.product, comment.id)
      .then(() => {
        // mutate(
        //   (prevData: any) => {
        //     return prevData.map((page: any) => {
        //       return {
        //         ...page,
        //         results: page.results.filter(
        //           (comment: any) => comment.id !== commentId
        //         ),
        //       };
        //     });
        //   },
        //   { revalidate: false }
        // );
        mutate((prevData: any) => {
          const newComments = prevData.filter(
            (item: Comment) => item.id !== comment.id
          );
          return newComments;
        });
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
      <div className="mb-6 flex gap-2 items-center">
        <UpvoteCommentButton comment={comment} mutate={mutate} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setEditing(false);
            setReplying(!replying);
          }}
        >
          Reply
        </Button>

        {user.id === comment.author.id ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setReplying(false);
                setEditing(!editing);
              }}
            >
              Edit
            </Button>
            {comment.children.length === 0 && (
              <Button variant="ghost" size="sm" onClick={() => {
                if (confirm("Are you sure you want to delete this comment?")) {
                  handleDeleteComment();
                }
              }}>
                Delete
              </Button>
            )}
          </>
        ) : null}
      </div>

      {replying && (
        <CommentForm
          type="create"
          comment={comment}
          mutate={mutate}
          handleClose={() => setReplying(false)}
        />
      )}

      {editing && (
        <CommentForm
          type="edit"
          comment={comment}
          content={content}
          mutate={mutate}
          handleClose={() => setEditing(false)}
        />
      )}
    </>
  );
}

function Comment({ comment, mutate, productId, hidden }: any) {
  return (
    <li className="relative flex gap-6 items-start gap-x-2">
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
          <Link href={`/${comment.author.username}`}>
            <Username className="font-semibold" user={comment.author} />
          </Link>
          <span className="font-medium text-sm text-muted-foreground">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className="whitespace-pre-wrap font-medium">{comment.content}</p>

        <div className="my-3">
          <CommentActions
            comment={comment}
            mutate={mutate}
            content={comment.content}
          />
          {comment.children && comment.children.length > 0 && (
            <ListComments
              comments={comment.children}
              mutate={mutate}
              productId={productId}
            />
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

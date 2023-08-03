import React, { useState } from "react";
import { Button } from "../ui/button";
import productService from "@/services/product.service";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import { Comment } from "@/types";
import { KeyedMutator } from "swr";

export default function UpvoteCommentButton({
  comment,
  mutate,
}: {
  comment: Comment;
  mutate: KeyedMutator<any>;
}) {
  const handleMutation = (type: "upvote" | "unvote") => {
    // mutate((prevData: any) => {
    // TODO: Infinite scrolling
    // const newPrevData = prevData.map((page: any) => {
    //   return {
    //     ...page,
    //     results: page.results.map((comment: any) => {
    //       if (comment.id === commentId) {
    //         return {
    //           ...comment,
    //           upvoted: type === "upvote",
    //           upvotesCount:
    //             comment.upvotesCount + (type === "upvote" ? 1 : -1),
    //         };
    //       }
    //       return comment;
    //     }),
    //   };
    // });
    // return newPrevData;
    // });
    mutate((prevData: Comment[]) => {
      const newComments = prevData.map((item: Comment) => {
        if (item.id === comment.id) {
          return {
            ...item,
            upvoted: type === "upvote",
            upvotesCount: item.upvotesCount + (type === "upvote" ? 1 : -1),
          };
        }
        return item;
      });
      return newComments;
    });
  };
  const handleVoteComment = async () => {
    console.log(comment.product);
    await productService
      .voteComment(comment.product, comment.id)
      .then(() => {
        handleMutation("upvote");
      })
      .catch((error) => {
        toast({
          title: "Couldn't upvote comment",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  const handleUnvoteComment = async () => {
    await productService
      .unvoteComment(comment.product, comment.id)
      .then(() => {
        handleMutation("unvote");
      })
      .catch((error) => {
        toast({
          title: "Couldn't remove vote from comment",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Button
      variant={comment.upvoted ? "default" : "outline"}
      size="sm"
      onClick={() => {
        if (comment.upvoted) {
          handleUnvoteComment();
        } else {
          handleVoteComment();
        }
      }}
      className="pl-2 pr-4"
    >
      <Icons.arrowUp className="mt-0.5 h-6 w-6" />
      <div className="space-x-2 text-sm font-bold">
        <span>{comment.upvotesCount}</span>
      </div>
    </Button>
  );
}

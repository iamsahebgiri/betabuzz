import React, { useState } from "react";
import { Button } from "../ui/button";
import productService from "@/services/product.service";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";

export default function UpvoteCommentButton({
  upvoted,
  mutate,
  productId,
  commentId,
  upvotesCount,
}: any) {
  const handleMutation = (type: "upvote" | "unvote") => {
    mutate((prevData: any) => {
      const newPrevData = prevData.map((page: any) => {
        return {
          ...page,
          results: page.results.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                upvoted: type === "upvote",
                upvotesCount:
                  comment.upvotesCount + (type === "upvote" ? 1 : -1),
              };
            }
            return comment;
          }),
        };
      });
      return newPrevData;
    });
  };
  const handleVoteComment = async () => {
    await productService
      .voteComment(productId, commentId)
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
      .unvoteComment(productId, commentId)
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
      variant={upvoted ? "default" : "outline"}
      size="sm"
      onClick={() => {
        if (upvoted) {
          handleUnvoteComment();
        } else {
          handleVoteComment();
        }
      }}
      className="pl-2 pr-4"
    >
      <Icons.arrowUp className="h-6 w-6 mt-0.5" />
      <div className="text-sm font-bold space-x-2">
        <span>{upvotesCount}</span>
      </div>
    </Button>
  );
}

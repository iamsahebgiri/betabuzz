import productService from "@/services/product.service";
import React from "react";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface UpvoteProductButtonProps {
  onSuccess: (res: any) => void;
  upvoted: boolean;
  productId: string;
  upvotesCount: number;
  expanded?: boolean;
}

export default function UpvoteProductButton({
  onSuccess,
  upvoted,
  productId,
  upvotesCount,
  expanded = false,
}: UpvoteProductButtonProps) {
  const handleVoteProduct = async (id: string) => {
    await productService
      .voteProduct(id)
      .then((res) => {
        onSuccess(res);
      })
      .catch((error) => {
        toast({
          title: "Couldn't upvote product",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  const handleUnvoteProduct = async (id: string) => {
    await productService
      .unvoteProduct(id)
      .then((res) => {
        onSuccess(res);
      })
      .catch((error) => {
        toast({
          title: "Couldn't remove vote from product",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  if (expanded) {
    return (
      <div>
        <Button
          variant={upvoted ? "default" : "outline"}
          onClick={() => {
            if (upvoted) {
              handleUnvoteProduct(productId);
            } else {
              handleVoteProduct(productId);
            }
          }}
          className="pl-2 pr-4"
        >
          <Icons.arrowUp className="h-6 w-6 mt-0.5" />
          <div className="text-sm font-bold space-x-2">
            <span>{upvotesCount}</span>
            <span className="pl-1">{expanded ? "Upvote" : null}</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {upvoted ? (
        <button
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex h-12 w-12 flex-col items-center justify-center rounded-lg"
          onClick={() => handleUnvoteProduct(productId)}
        >
          <Icons.arrowUp className="text-primary h-6 w-6" />
          <span className="-mt-1 text-sm font-bold">{upvotesCount}</span>
        </button>
      ) : (
        <button
          className="border-border flex h-12 w-12 flex-col items-center justify-center rounded-lg border"
          onClick={() => handleVoteProduct(productId)}
        >
          <Icons.arrowUp className=" h-6 w-6" />
          <span className="-mt-0.5 text-sm font-bold">{upvotesCount}</span>
        </button>
      )}
    </div>
  );
}

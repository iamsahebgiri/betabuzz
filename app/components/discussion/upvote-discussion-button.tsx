import discussionService from "@/services/discussion.service";
import React from "react";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface UpvoteDiscussionButtonProps {
  onSuccess: (res: any) => void;
  upvoted: boolean;
  discussionId: string;
  upvotesCount: number;
  expanded?: boolean;
}

export default function UpvoteDiscussionButton({
  onSuccess,
  upvoted,
  discussionId,
  upvotesCount,
  expanded = false,
}: UpvoteDiscussionButtonProps) {
  const handleVoteDiscussion = async (id: string) => {
    await discussionService
      .voteDiscussion(id)
      .then((res) => {
        onSuccess(res);
      })
      .catch((error) => {
        toast({
          title: "Couldn't upvote discussion",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  const handleUnvoteDiscussion = async (id: string) => {
    await discussionService
      .unvoteDiscussion(id)
      .then((res) => {
        onSuccess(res);
      })
      .catch((error) => {
        toast({
          title: "Couldn't remove vote from discussion",
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
              handleUnvoteDiscussion(discussionId);
            } else {
              handleVoteDiscussion(discussionId);
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
          onClick={() => handleUnvoteDiscussion(discussionId)}
        >
          <Icons.arrowUp className="text-primary h-6 w-6" />
          <span className="-mt-1 text-sm font-bold">{upvotesCount}</span>
        </button>
      ) : (
        <button
          className="border-border flex h-12 w-12 flex-col items-center justify-center rounded-lg border"
          onClick={() => handleVoteDiscussion(discussionId)}
        >
          <Icons.arrowUp className=" h-6 w-6" />
          <span className="-mt-0.5 text-sm font-bold">{upvotesCount}</span>
        </button>
      )}
    </div>
  );
}

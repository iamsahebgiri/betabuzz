import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import discussionService from "@/services/discussion.service";
import { KeyedMutator } from "swr";

export default function UpvoteReplyButton({
  reply,
  mutate,
}: {
  reply: any;
  mutate: KeyedMutator<any>;
}) {
  const handleMutation = (type: "upvote" | "unvote") => {
    mutate((prevData: any[]) => {
      const newReplys = prevData.map((item: any) => {
        if (item.id === reply.id) {
          return {
            ...item,
            upvoted: type === "upvote",
            upvotesCount: item.upvotesCount + (type === "upvote" ? 1 : -1),
          };
        }
        return item;
      });
      return newReplys;
    });
  };
  const handleVoteReply = async () => {
    console.log(reply.discussion);
    await discussionService
      .voteReply(reply.discussion, reply.id)
      .then(() => {
        handleMutation("upvote");
      })
      .catch((error) => {
        toast({
          title: "Couldn't upvote reply",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  const handleUnvoteReply = async () => {
    await discussionService
      .unvoteReply(reply.discussion, reply.id)
      .then(() => {
        handleMutation("unvote");
      })
      .catch((error) => {
        toast({
          title: "Couldn't remove vote from reply",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Button
      variant={reply.upvoted ? "default" : "outline"}
      size="sm"
      onClick={() => {
        if (reply.upvoted) {
          handleUnvoteReply();
        } else {
          handleVoteReply();
        }
      }}
      className="pl-2 pr-4"
    >
      <Icons.arrowUp className="h-6 w-6 mt-0.5" />
      <div className="text-sm font-bold space-x-2">
        <span>{reply.upvotesCount}</span>
      </div>
    </Button>
  );
}

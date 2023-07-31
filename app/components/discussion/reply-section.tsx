import React from "react";
import useSWR from "swr";
import ReplyForm from "./reply-form";
import discussionService from "@/services/discussion.service";
import ListReplies from "./reply-list";
import formatReplies from "@/lib/comments";
import comment24Regular from "@iconify/icons-fluent/comment-24-regular";
import { EmptyState, LoadingState } from "@/components/ui/states";

function ListRepliesFormatter({ replies, mutate, discussionId }: any) {
  const formattedReplies = formatReplies(replies);
  return (
    <ListReplies
      discussionId={discussionId}
      replies={formattedReplies}
      mutate={mutate}
    />
  );
}

export default function ReplySection({ discussionId }: any) {
  const { data, mutate, error, isLoading } = useSWR(
    `discussions.${discussionId}.replies`,
    () => discussionService.getReplies(discussionId)
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ReplyForm type="create" mutate={mutate} />
      <h2 className="mb-6 text-xl font-semibold leading-7 text-primary">
        Replies
      </h2>

      {data.length === 0 ? (
        <EmptyState
          title="Shhh... comments hibernating"
          subtitle="Wake them up with your thoughts!"
          icon={comment24Regular}
        />
      ) : (
        <ListRepliesFormatter
          discussionId={discussionId}
          replies={data}
          mutate={mutate}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import ReplyForm from "./reply-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import dayjs from "@/lib/dayjs";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import discussionService from "@/services/discussion.service";
import { toast } from "@/components/ui/use-toast";
import UpvoteReplyButton from "./upvote-reply-btn";
import type { KeyedMutator } from "swr";
import Username from "@/components/profile/username";
import Link from "next/link";
import Preview from "../ui/editor/preview";

function ReplyActions({
  reply,
  mutate,
  raw,
}: {
  reply: any;
  mutate: KeyedMutator<any>;
  raw?: string;
}) {
  const { user } = useUser();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleDeleteReply = async () => {
    await discussionService
      .removeReply(reply.discussion, reply.id)
      .then(() => {
        mutate((prevData: any) => {
          const newReplies = prevData.filter(
            (item: any) => item.id !== reply.id
          );
          return newReplies;
        });
      })
      .catch((error) => {
        toast({
          title: "Couldn't delete reply",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <UpvoteReplyButton reply={reply} mutate={mutate} />
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

        {user?.id === reply.author.id ? (
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
            {reply.children.length === 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure want to delete this reply?")) {
                    handleDeleteReply();
                  }
                }}
              >
                Delete
              </Button>
            )}
          </>
        ) : null}
      </div>

      {replying && (
        <ReplyForm
          type="create"
          reply={reply}
          mutate={mutate}
          handleClose={() => setReplying(false)}
        />
      )}

      {editing && (
        <ReplyForm
          type="edit"
          reply={reply}
          raw={raw}
          mutate={mutate}
          handleClose={() => setEditing(false)}
        />
      )}
    </>
  );
}

function Reply({ reply, mutate, discussionId, hidden }: any) {
  return (
    <li className="relative flex items-start gap-6 gap-x-2">
      {hidden ? null : (
        <span className="absolute inset-y-0 left-[15px] my-auto h-full w-[2px] bg-border/80" />
      )}
      <div className="relative flex-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-x-3 pl-1.5 pt-1">
          <Link href={`/${reply.author.username}`}>
            <Username className="font-semibold" user={reply.author} />
          </Link>
          <span className="text-sm font-medium text-muted-foreground">
            {dayjs(reply.createdAt).fromNow()}
          </span>
        </div>

        <Preview html={reply.html} />

        <div className="my-3">
          <ReplyActions reply={reply} mutate={mutate} raw={reply.raw} />
          {reply.children && reply.children.length > 0 && (
            <ListReplies
              replies={reply.children}
              mutate={mutate}
              discussionId={discussionId}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default function ListReplies({ replies, mutate, discussionId }: any) {
  return (
    <div>
      <ul>
        {replies.map((reply: any, i: any) => {
          return (
            <Reply
              key={reply.id}
              hidden={replies.length - 1 === i}
              reply={reply}
              discussionId={discussionId}
              mutate={mutate}
            />
          );
        })}
      </ul>
    </div>
  );
}

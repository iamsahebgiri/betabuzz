import MainLayout from "@/layouts/main.layout";
import discussionService from "@/services/discussion.service";
import { useRouter } from "next/router";
import useSWR from "swr";

import ReplySection from "@/components/discussion/reply-section";
import UpvoteDiscussionButton from "@/components/discussion/upvote-discussion-button";
import Username from "@/components/profile/username";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/states";
import { toast } from "@/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import useUser from "@/hooks/use-user";
import dayjs from "@/lib/dayjs";
import Head from "next/head";
import { useState } from "react";

const Discussion = ({ discussionId }: { discussionId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isLoading, error, mutate } = useSWR(
    `/api/discussions/${discussionId}`,
    () => discussionService.getDiscussion(discussionId)
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleDeleteDiscussion = async (id: string) => {
    setIsDeleting(true);
    await discussionService
      .deleteDiscussion(id)
      .then(() => {
        router.replace("/discussion");
      })
      .catch((error) => {
        toast({
          title: "Couldn't delete discussion",
          description: error?.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div>
      <Head>
        <title>{`${data.title} - ${siteConfig.name}`}</title>
        <meta name="description" content={data.title} />
      </Head>
      <div className="flex items-center gap-3">
        <UpvoteDiscussionButton
          discussionId={data.id}
          upvoted={data.upvoted}
          upvotesCount={data.upvotesCount}
          onSuccess={(res) => {
            mutate(res);
          }}
        />
        <div>
          <h2 className="text-xl font-semibold leading-7 text-primary">
            {data.title}
          </h2>
          <div className="space-x-3 text-sm font-medium leading-6 text-muted-foreground">
            <span>
              <Username user={data.author} />
            </span>
            <span>{dayjs(data.createdAt).fromNow()}</span>
            <span>{data.repliesCount} replies</span>
          </div>
        </div>
      </div>

      <div className="ml-[60px]">
        <div className="mt-2 whitespace-pre-wrap text-base font-medium leading-6">
          {data.content}
        </div>
        {user && user.id == data.author.id ? (
          <div className="mt-6 flex items-center justify-between">
            <div className="space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  router.push(`/discussion/${data.id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                isLoading={isDeleting}
                onClick={() => {
                  if (confirm("Are you sure want to delete this discussion?")) {
                    handleDeleteDiscussion(data.id);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <hr className="my-8" />

      <ReplySection discussionId={discussionId} />
    </div>
  );
};

export default function DiscussionPage() {
  const router = useRouter();
  if (!router.query.id) {
    return;
  }
  const discussionId = router.query.id as string;

  return (
    <MainLayout>
      <div className="container mx-auto w-full max-w-3xl py-16 pb-8 pt-6 md:py-10">
        <Discussion discussionId={discussionId} />
      </div>
    </MainLayout>
  );
}

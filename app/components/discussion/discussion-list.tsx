import { EmptyState, LoadingState } from "@/components/ui/states";
// import { Discussion } from "@/types";
import { Button } from "@/components/ui/button";
import box24Regular from "@iconify/icons-fluent/box-24-regular";
import { KeyedMutator } from "swr";
import dayjs from "@/lib/dayjs";
import UpvoteDiscussionButton from "./upvote-discussion-button";
import Link from "next/link";
import Username from "../profile/username";

const Discussion = ({
  discussion,
  mutate,
}: {
  discussion: any;
  mutate: KeyedMutator<any>;
}) => {
  return (
    <div className="flex items-center gap-3 ">
      <UpvoteDiscussionButton
        discussionId={discussion.id}
        upvoted={discussion.upvoted}
        upvotesCount={discussion.upvotesCount}
        onSuccess={(res) => {
          mutate((prevData: any) => {
            return prevData.map((page: any) => {
              return {
                ...page,
                results: page.results.map((p: any) =>
                  p.id === discussion.id ? res : p
                ),
              };
            });
          });
        }}
      />
      <div>
        <Link
          href={`/discussion/${discussion.id}`}
        >
          <h2 className="text-lg font-semibold leading-7 text-primary">
            {discussion.title}
          </h2>
        </Link>

        <div className="text-sm font-medium leading-6 text-muted-foreground space-x-3">
          <Link href={`/${discussion.author.username}`}>
            <Username iconClassName="h-4 w-4" user={discussion.author} />
          </Link>
          <span>{dayjs(discussion.createdAt).fromNow()}</span>
          <span>{discussion.repliesCount} replies</span>
        </div>
      </div>
    </div>
  );
};

export function DiscussionsList({
  discussions,
  mutate,
}: {
  discussions: any[];
  mutate: KeyedMutator<any>;
}) {
  return (
    <>
      {discussions.map((discussion) => (
        <Discussion
          key={discussion.id}
          discussion={discussion}
          mutate={mutate}
        />
      ))}
    </>
  );
}

interface InfiniteDiscussionListProps {
  data: any[] | undefined;
  size: number;
  setSize: (...args: any) => any;
  isLoading: boolean;
  error: any;
  mutate: KeyedMutator<any>;
}

export function InfiniteDiscussionList({
  data,
  size,
  setSize,
  isLoading,
  error,
  mutate,
}: InfiniteDiscussionListProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const pages = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.totalResults === 0;
  const reachedEnd =
    data && data[data.length - 1].totalPages === data[data.length - 1].page;

  return (
    <>
      {isEmpty ? (
        <EmptyState
          title="No discussions found"
          subtitle="Launch your beta and let the buzz begin!"
          icon={box24Regular}
        />
      ) : (
        <div className="space-y-6 lg:space-y-8">
          {pages.map((page: any, pageIndex) => (
            <DiscussionsList
              key={pageIndex}
              discussions={page.results}
              mutate={mutate}
            />
          ))}

          {!reachedEnd && (
            <div className="flex items-center justify-center">
              <Button
                isLoading={isLoading}
                variant="outline"
                onClick={() => setSize(size + 1)}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

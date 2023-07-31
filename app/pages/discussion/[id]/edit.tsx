import MainLayout from "@/layouts/main.layout";
import { CreateDiscussionForm } from "@/components/discussion/create-discussion";
import Head from "next/head";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/router";
import useSWR from "swr";
import discussionService from "@/services/discussion.service";
import { categories } from "@/config/categories";
import { LoadingState } from "@/components/ui/states";

function EditDiscussion({ discussionId }: { discussionId: string }) {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <title>{`Edit ${data.title} - ${siteConfig.name}`}</title>
      </Head>
      <div className="container max-w-2xl pb-8 pt-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h2 className="mt-2 text-xl font-semibold leading-7 text-primary">
              Edit {data.title}
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground">
              Made some mistake, edit it without worrying
            </p>
          </div>
          <CreateDiscussionForm
            defaultValues={{
              ...data,
            }}
            backTo={`/discussion/${discussionId}`}
            onSuccess={(res) => {
              mutate(res);
              router.push(`/discussion/${discussionId}`);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function EditDiscussionPage() {
  const router = useRouter();
  if (!router.query.id) {
    return;
  }
  const discussionId = router.query.id as string;

  return (
    <MainLayout>
      <EditDiscussion discussionId={discussionId} />
    </MainLayout>
  );
}

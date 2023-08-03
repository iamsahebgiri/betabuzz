import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import MainLayout from "@/layouts/main.layout";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { InfiniteDiscussionList } from "@/components/discussion/discussion-list";
import { PAGE_SIZE } from "@/config/constants";
import useSWRInfinite from "swr/infinite";
import discussionService from "@/services/discussion.service";

const getKey = (page: number, prevPageData: any) => {
  if (prevPageData && prevPageData.totalPages === prevPageData.page) {
    return null;
  }
  return `/discussions?limit=${PAGE_SIZE}&page=${page + 1
    }&sortBy=createdAt:desc`; // SWR key
};

export default function DiscussionPage() {
  const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
    getKey,
    (url) => discussionService.getAllInfinite(url)
  );

  return (
    <MainLayout>
      <Head>
        <title>{`Discussions - ${siteConfig.name}`}</title>
        <meta
          name="description"
          content="Ask questions, find support, and connect with the community."
        />
      </Head>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto w-full max-w-3xl space-y-8 lg:space-y-14">
          <div className="flex flex-col items-start gap-6">
            <div>
              <h2 className="text-2xl font-bold">Discussions</h2>
              <p className="text-base font-medium text-muted-foreground">
                Ask questions, find support, and connect with the community.
              </p>
            </div>
            <Link
              href={"/discussion/new"}
              className={buttonVariants({ variant: "default" })}
            >
              New Discussion
            </Link>
          </div>
          <div>
            <InfiniteDiscussionList
              data={data}
              size={size}
              setSize={setSize}
              error={error}
              isLoading={isLoading}
              mutate={mutate}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

import React from "react";
// import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import CommentForm from "./comment-form";
import productService from "@/services/product.service";
import ListComments from "./comment-list";
import formatComments from "@/lib/comments";
import comment24Regular from "@iconify/icons-fluent/comment-24-regular";
import { EmptyState, LoadingState } from "@/components/ui/states";

// const PAGE_SIZE = 10;

function ListCommentsFormatter({ comments, mutate, productId }: any) {
  const formattedComments = formatComments(comments);
  return (
    <ListComments
      productId={productId}
      comments={formattedComments}
      mutate={mutate}
    />
  );
}

export default function CommentSection({ productId }: any) {
  // TODO: Infinite Scrolling  1
  // const getKey = (pageIndex: number, previousPageData: any) => {
  //   if (
  //     previousPageData &&
  //     previousPageData.totalPages === previousPageData.page
  //   ) {
  //     return null;
  //   }

  //   return `/products/${productId}/comments?limit=${PAGE_SIZE}&page=${
  //     pageIndex + 1
  //   }&sortBy=createdAt:desc`; // SWR key
  // };

  // const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
  //   getKey,
  //   (url) => productService.getCommentsInfinite(url)
  // );

  const { data, mutate, error, isLoading } = useSWR(
    `products.${productId}.comments`,
    () => productService.getComments(productId)
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // TODO: Infinite Scrolling 2
  // const pages = data ? [].concat(...data) : [];
  // const isEmpty = data?.[0]?.totalResults === 0;
  // const reachedEnd =
  //   data && data[data.length - 1].totalPages === data[data.length - 1].page;

  return (
    <div>
      <CommentForm type="create" mutate={mutate} />
      <h2 className="mb-6 text-xl font-semibold leading-7 text-primary">
        Comments
      </h2>

      {data.length === 0 ? (
        <EmptyState
          title="Shhh... comments hibernating"
          subtitle="Wake them up with your thoughts!"
          icon={comment24Regular}
        />
      ) : (
        <ListCommentsFormatter
          productId={productId}
          comments={data}
          mutate={mutate}
        />
      )}

      {/* TODO: Infinite Scrolling 3 */}
      {/* {isEmpty ? (
        "No comments"
      ) : (
        <>
          {pages.map((page: any, pageIndex) => (
            <ListComments
              key={pageIndex}
              productId={productId}
              comments={page.results}
              mutate={mutate}
            />
          ))}

          {!reachedEnd && (
            <div className="flex items-center justify-center">
              <Button
                disabled={isLoading}
                variant="outline"
                onClick={() => setSize(size + 1)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )} */}
    </div>
  );
}

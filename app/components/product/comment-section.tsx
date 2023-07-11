import React from "react";
import useSWRInfinite from "swr/infinite";
import CommentForm from "./comment-form";
import productService from "@/services/product.service";
import ListComments from "./comment-list";
import { Button } from "../ui/button";

const PAGE_SIZE = 10;

export default function CommentSection({ productId }: any) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (
      previousPageData &&
      previousPageData.totalPages === previousPageData.page
    ) {
      return null;
    }

    return `/products/${productId}/comments?limit=${PAGE_SIZE}&page=${
      pageIndex + 1
    }&sortBy=createdAt:desc`; // SWR key
  };

  const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
    getKey,
    (url) => productService.getCommentsInfinite(url)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const pages = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.totalResults === 0;
  const reachedEnd =
    data && data[data.length - 1].totalPages === data[data.length - 1].page;

  // const allPages = pages.flatMap((page: any) => page.results);
  return (
    <div>
      <CommentForm mutate={mutate} />
      <h2 className="mb-6 text-xl font-semibold leading-7 text-primary">
        Comments
      </h2>

      {isEmpty ? (
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
      )}
    </div>
  );
}

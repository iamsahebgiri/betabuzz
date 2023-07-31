import UpvoteProductButton from "@/components/product/upvote-product";
import { EmptyState, LoadingState } from "@/components/ui/states";
import dayjs from "@/lib/dayjs";
import { Product } from "@/types";
import box24Regular from "@iconify/icons-fluent/box-24-regular";
import Image from "next/image";
import Link from "next/link";
import { KeyedMutator } from "swr";
import { Button } from "@/components/ui/button";
import { Pill } from "../ui/pill";
import { BlurImage } from "../ui/blur-image";

const Product = ({
  product,
  mutate,
}: {
  product: Product;
  mutate: KeyedMutator<any>;
}) => {
  return (
    <div className="flex justify-between items-center py-1">
      <div className="mr-2 flex gap-3">
        <div>
          <BlurImage src={product.image} alt={product.name} />
        </div>
        <div className="flex flex-1 flex-col">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="text-base font-bold"
            >
              {product.name}{" "}
              <span className="hidden font-medium md:inline-block">
                ({new URL(product.link).hostname})
              </span>
            </Link>
            <div className="text-muted-foreground font-medium">
              {product.tagline}
            </div>
          </div>
          <div className="flex items-center gap-x-3 text-secondary-foreground/80 text-sm font-semibold overflow-hidden">
            <span className="flex-none">{product.commentsCount} comments</span>
            <span className="hidden sm:block flex-none w-1 h-1 bg-muted-foreground/60 rounded-full" />
            <span className="flex-none hidden sm:block">
              {product.category}
            </span>
          </div>
        </div>
      </div>
      <UpvoteProductButton
        productId={product.id}
        upvoted={product.upvoted}
        upvotesCount={product.upvotesCount}
        onSuccess={(res) => {
          mutate((prevData: any) => {
            return prevData.map((page: any) => {
              return {
                ...page,
                results: page.results.map((p: Product) =>
                  p.id === product.id ? res : p
                ),
              };
            });
          });
        }}
      />
    </div>
  );
};

export function ProductsList({
  products,
  mutate,
}: {
  products: Product[];
  mutate: KeyedMutator<any>;
}) {
  return (
    <>
      {products.map((product) => (
        <Product key={product.id} product={product} mutate={mutate} />
      ))}
    </>
  );
}

interface InfiniteProductListProps {
  data: any[] | undefined;
  size: number;
  setSize: (...args: any) => any;
  isLoading: boolean;
  error: any;
  mutate: KeyedMutator<any>;
}

export function InfiniteProductList({
  data,
  size,
  setSize,
  isLoading,
  error,
  mutate,
}: InfiniteProductListProps) {
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
          title="No products found"
          subtitle="Launch your beta and let the buzz begin!"
          icon={box24Regular}
        />
      ) : (
        <div className="space-y-6 lg:space-y-8">
          {pages.map((page: any, pageIndex) => (
            <ProductsList
              key={pageIndex}
              products={page.results}
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

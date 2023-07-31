import UpvoteProductButton from "@/components/product/upvote-product";
import { EmptyState, LoadingState } from "@/components/ui/states";
import dayjs from "@/lib/dayjs";
import { Product } from "@/types";
import box24Regular from "@iconify/icons-fluent/box-24-regular";
import Image from "next/image";
import Link from "next/link";
import { KeyedMutator } from "swr";
import { Button } from "@/components/ui/button";

const Product = ({
  product,
  mutate,
}: {
  product: Product;
  mutate: KeyedMutator<any>;
}) => {
  return (
    <div className="flex justify-between">
      <div className="mr-2 flex flex-1 items-start gap-3">
        <Image
          src={product.image}
          alt={product.name}
          height={72}
          width={72}
          className="h-12 w-12 rounded-lg"
        />
        <div>
          <Link
            href={`/products/${product.id}`}
            className="text-base font-bold"
          >
            {product.name}{" "}
            <span className="font-medium">
              ({new URL(product.link).hostname})
            </span>
          </Link>
          <div className="text-muted-foreground font-medium">
            built by{" "}
            <Link
              href={`/${product.maker.username}`}
              className="font-bold hover:text-secondary-foreground"
            >
              {product.maker.name}
            </Link>{" "}
            · {dayjs(product.createdAt).fromNow()} · {product.commentsCount}{" "}
            comments
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
          title="Plant your products and watch them grow!"
          subtitle="Launch your beta and let the buzz begin!"
          icon={box24Regular}
        />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

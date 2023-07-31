import Link from "next/link";
import MainLayout from "@/layouts/main.layout";
import useSWRInfinite from "swr/infinite";
import productService from "@/services/product.service";
import Image from "next/image";
import UpvoteProductButton from "@/components/product/upvote-product";
import dayjs from "@/lib/dayjs";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { KeyedMutator } from "swr";
import { EmptyState } from "@/components/ui/states";
import box24Regular from "@iconify/icons-fluent/box-24-regular";

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

function ProductsList({
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

const PAGE_SIZE = 1;

const getKey = (pageIndex: number, prevPageData: any) => {
  if (prevPageData && prevPageData.totalPages === prevPageData.page) {
    return null;
  }

  return `/products?limit=${PAGE_SIZE}&page=${
    pageIndex + 1
  }&sortBy=createdAt:desc`; // SWR key
};

export default function IndexPage() {
  const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
    getKey,
    (url) => productService.getAllInfinite(url)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const pages = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.totalResults === 0;
  const reachedEnd =
    data && data[data.length - 1].totalPages === data[data.length - 1].page;

  return (
    <MainLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto w-full max-w-2xl space-y-8 lg:space-y-10">
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
      </section>
    </MainLayout>
  );
}

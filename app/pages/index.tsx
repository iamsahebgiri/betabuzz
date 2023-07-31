import { InfiniteProductList } from "@/components/product/product-list";
import { PAGE_SIZE } from "@/config/constants";
import MainLayout from "@/layouts/main.layout";
import productService from "@/services/product.service";
import useSWRInfinite from "swr/infinite";

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

  return (
    <MainLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto w-full max-w-2xl">
          <InfiniteProductList
            data={data}
            size={size}
            setSize={setSize}
            error={error}
            isLoading={isLoading}
            mutate={mutate}
          />
        </div>
      </section>
    </MainLayout>
  );
}

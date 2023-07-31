import { InfiniteProductList } from "@/components/product/product-list";
import { PAGE_SIZE } from "@/config/constants";
import productService from "@/services/product.service";
import useSWRInfinite from "swr/infinite";

const getKey = (page: number, prev: any, userId: string) => {
  if (prev && prev.totalPages === prev.page) {
    return null;
  }

  return `/products?limit=${PAGE_SIZE}&page=${
    page + 1
  }&sortBy=createdAt:desc&maker=${userId}`;
};

interface ProductsTabProps {
  userId: string;
}

export function ProductsTab({ userId }: ProductsTabProps) {
  const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
    (...args) => getKey(...args, userId),
    (url) => productService.getAllInfinite(url)
  );

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg leading-none tracking-tight">
        Products and Launches
      </h2>
      <div className="mx-auto w-full space-y-8 lg:space-y-10">
        <InfiniteProductList
          data={data}
          size={size}
          setSize={setSize}
          error={error}
          isLoading={isLoading}
          mutate={mutate}
        />
      </div>
    </div>
  );
}

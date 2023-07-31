import MainLayout from "@/layouts/main.layout";
import { CreateProductForm } from "@/components/forms/create-product";
import Head from "next/head";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/router";
import useSWR from "swr";
import productService from "@/services/product.service";
import { categories } from "@/config/categories";
import { LoadingState } from "@/components/ui/states";

function EditProduct({ productId }: { productId: string }) {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR(
    `/api/products/${productId}`,
    () => productService.getProduct(productId)
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
        <title>{`Edit ${data.name} - ${siteConfig.name}`}</title>
        <meta
          name="description"
          content="Tell us more about this product like name, description."
        />
      </Head>

      <div className="container max-w-2xl pb-8 pt-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h2 className="mt-2 text-xl font-semibold leading-7 text-primary">
              Edit {data.name}
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground">
              Made some mistake, edit it without worrying
            </p>
          </div>
          <CreateProductForm
            defaultValues={{
              ...data,
              category: categories.find(
                (category) => category.label === data.category
              )?.value,
              tags: data.tags?.map((tag: string) => ({ value: tag })),
            }}
            onSuccess={(res) => {
              mutate(res);
              router.push(`/products/${productId}`);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function EditProductPage() {
  const router = useRouter();
  if (!router.query.id) {
    return;
  }
  const productId = router.query.id as string;

  return (
    <MainLayout>
      <div className="container max-w-2xl pb-8 pt-6 md:py-10 mx-auto w-full py-16">
        <EditProduct productId={productId} />
      </div>
    </MainLayout>
  );
}

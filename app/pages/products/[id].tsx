import MainLayout from "@/layouts/main.layout";
import productService from "@/services/product.service";
import { useRouter } from "next/router";
import useSWR from "swr";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import UpvoteProductButton from "@/components/product/upvote-product";
import useUser from "@/hooks/use-user";
import CommentSection from "@/components/product/comment-section";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

const Product = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR(
    `/api/products/${productId}`,
    () => productService.getProduct(productId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleDeleteProduct = async (id: string) => {
    await productService
      .deleteProduct(id)
      .then((res) => {
        console.log(res);
        router.replace("/");
      })
      .catch((error) => {
        toast({
          title: "Couldn't delete product",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <Head>
        <title>
          {data.name} - {siteConfig.name}
        </title>
        <meta name="description" content={data.tagline} />
      </Head>

      <Image
        src={data.image}
        alt={data.name}
        height={72}
        width={72}
        className="h-18 w-18 rounded-lg"
      />

      <h2 className="mt-2 text-xl font-semibold leading-7 text-primary">
        {data.name}
      </h2>

      <div className="mt-2 flex items-center justify-between">
        <div className="space-x-2 flex">
          <a href={data.link} target="__blank">
            <Button
              variant="secondary"
              className="space-x-2"
              onClick={() => {
                router;
              }}
            >
              <span>Live preview</span>
              <Icons.arrowSquareUpFilled className="h-5 w-5 text-primary" />
            </Button>
          </a>
          <UpvoteProductButton
            mutate={mutate}
            productId={productId}
            upvoted={data.upvoted}
            upvotesCount={data.upvotesCount}
            expanded
          />
        </div>

        {data.maker.id === user.id ? (
          <div className="space-x-2">
            <Button variant="secondary">Edit</Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteProduct(productId)}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mt-1 text-base font-medium leading-6 text-muted-foreground whitespace-pre-wrap">
        {data.description}
      </div>

      <hr className="my-8" />
      <CommentSection productId={productId} />
    </div>
  );
};

export default function ProductPage() {
  const router = useRouter();
  if (!router.query.id) {
    return;
  }
  const productId = router.query.id as string;

  return (
    <MainLayout>
      <div className="container max-w-2xl pb-8 pt-6 md:py-10 mx-auto w-full py-16">
        <Product productId={productId} />
      </div>
    </MainLayout>
  );
}

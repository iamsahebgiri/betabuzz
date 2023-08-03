import MainLayout from "@/layouts/main.layout";
import productService from "@/services/product.service";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Icons } from "@/components/icons";
import CommentSection from "@/components/product/comment-section";
import UpvoteProductButton from "@/components/product/upvote-product";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { toast } from "@/components/ui/use-toast";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { BlurImage } from "@/components/ui/blur-image";
import Username from "@/components/profile/username";
import { LoadingState } from "@/components/ui/states";

const Product = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteProduct = async (id: string) => {
    setIsDeleting(true);
    await productService
      .deleteProduct(id)
      .then((res) => {
        router.replace("/");
      })
      .catch((error) => {
        toast({
          title: "Couldn't delete product",
          description: error?.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div>
      <Head>
        <title>{`${data.name} - ${data.tagline}`}</title>
        <meta name="description" content={data.tagline} />
      </Head>

      <BlurImage src={data.image} alt={data.name} />

      <h2 className="mt-2 text-xl font-semibold leading-7 text-primary">
        {data.name}
      </h2>
      <div className="mt-1 whitespace-pre-wrap text-base font-medium leading-6 text-muted-foreground">
        {data.tagline}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <a
            href={`${data.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "space-x-2"
            )}
          >
            <span>Live preview</span>
            <Icons.arrowSquareUpFilled className="h-5 w-5 text-primary" />
          </a>
          <UpvoteProductButton
            onSuccess={(res) => mutate(res)}
            productId={productId}
            upvoted={data.upvoted}
            upvotesCount={data.upvotesCount}
            expanded
          />
        </div>

        {data.maker.id === user.id ? (
          <div className="space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                router.push(`/products/${productId}/edit`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              isLoading={isDeleting}
              onClick={() => {
                if (confirm("Are you sure you want to delete this product?")) {
                  handleDeleteProduct(productId);
                }
              }}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mt-6 whitespace-pre-wrap text-base font-medium leading-6">
        {data.description}
      </div>
      <div className="mt-6 flex items-center gap-2 text-base font-medium text-muted-foreground">
        Classified in{" "}
        {data.tags && data.tags.length > 0 ? (
          <div className="space-x-2">
            {data.tags.map((tag: string, index: number) => (
              <Pill title={tag} key={index} />
            ))}
          </div>
        ) : (
          <Pill title={data.category} />
        )}{" "}
        by{" "}
        <Link
          href={`/${data.maker.username}`}
          className="font-bold hover:text-secondary-foreground"
        >
          <Username user={data.maker} />
        </Link>
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
      <div className="container mx-auto w-full max-w-2xl py-16 pb-8 pt-6 md:py-10">
        <Product productId={productId} />
      </div>
    </MainLayout>
  );
}

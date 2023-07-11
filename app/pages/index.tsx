import Link from "next/link";
import MainLayout from "@/layouts/main.layout";
import useSWR from "swr";
import productService from "@/services/product.service";
import Image from "next/image";
import UpvoteProductButton from "@/components/product/upvote-product";
import dayjs from "@/lib/dayjs";

const Item = ({ item, handleMutation }: any) => {
  return (
    <div className="flex justify-between">
      <div className="mr-2 flex flex-1 items-start gap-3">
        <Image
          src={item.image}
          alt={item.name}
          height={72}
          width={72}
          className="h-12 w-12 rounded-lg"
        />
        <div>
          <Link href={`/products/${item.id}`} className="text-base font-bold">
            {item.name} <span className="font-medium">({new URL(item.link).hostname})</span>
          </Link>
          <div className="text-muted-foreground font-medium">
            built by {item.maker.name} · {dayjs(item.createdAt).fromNow()} · {item.commentsCount} comments
          </div>
        </div>
      </div>
      <UpvoteProductButton
        productId={item.id}
        upvoted={item.upvoted}
        upvotesCount={item.upvotesCount}
        mutate={handleMutation}
      />
    </div>
  );
};

export default function IndexPage() {
  const { data, isLoading, error, mutate } = useSWR("products.all", () =>
    productService.getAll()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const handleMutation = (res: any) => {
    const updatedData = {
      ...data,
      results: data.results.map((item: any) =>
        item.id === res.id ? res : item
      ),
    };
    mutate(updatedData);
  };

  return (
    <MainLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto w-full max-w-2xl space-y-8 lg:space-y-10">
          {data.results.map((item: any) => (
            <Item key={item.id} item={item} handleMutation={handleMutation} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

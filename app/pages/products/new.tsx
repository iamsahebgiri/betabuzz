import MainLayout from "@/layouts/main.layout";
import { CreateProductForm } from "@/components/forms/create-product";
import Head from "next/head";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/router";

export default function NewProduct() {
  const router = useRouter();
  return (
    <MainLayout>
      <Head>
        <title>Create a new product - {siteConfig.name}</title>
        <meta
          name="description"
          content="Tell us more about this product like name, description."
        />
      </Head>

      <div className="container max-w-2xl pb-8 pt-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h2 className="mt-2 text-xl font-semibold leading-7 text-primary">
              Create a new product
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground">
              Tell us more about this product like name, description.
            </p>
          </div>
          <CreateProductForm onSuccess={() => router.push("/")} />
        </div>
      </div>
    </MainLayout>
  );
}

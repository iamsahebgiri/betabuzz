import MainLayout from "@/layouts/main.layout";
import { CreateProductForm } from "@/components/forms/create-product";

export default function NewProduct() {
  return (
    <MainLayout>
      <div className="container max-w-2xl pb-8 pt-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a new product
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-gray-600">
              Tell us more about this product like name, description.
            </p>
          </div>
          <CreateProductForm />
        </div>
      </div>
    </MainLayout>
  );
}

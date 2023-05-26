import React, { useState } from "react";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createProductSchema } from "@/lib/validations/product";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Textarea } from "../ui/textarea";

interface CreateProductFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProductForm({
  className,
  ...props
}: CreateProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const isLoading = false;

  function onSubmit(data: CreateProductFormData) {
    console.log(data);
    // setIsLoading(true);

    // authService
    //   .signIn(data)
    //   .then(async () => {
    //     await onSignInSuccess();
    //   })
    //   .catch((err) => {
    //     return toast({
    //       title: "Bad request.",
    //       description: err?.message,
    //       variant: "destructive",
    //     });
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <UploadProductImage />
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Next big product"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link to your product</Label>
            <Input
              id="link"
              placeholder="https://next-big-product.com"
              disabled={isLoading}
              type="url"
              {...register("link")}
            />
            {errors?.link && (
              <FormErrorMessage>{errors.link.message}</FormErrorMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="My awesome product"
              disabled={isLoading}
              {...register("description")}
            />
            {errors?.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save product
          </button>
        </div>
      </form>
    </div>
  );
}

const UploadProductImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("/something", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsUploadSuccess(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      {selectedImage ? (
        <div className="w-36 h-36 rounded-xl relative">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
          />
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-xl">
            {isUploading && (
              <Icons.spinner className="h-6 w-6 animate-spin text-white" />
            )}
          </div> */}
          <div className="absolute -top-1 -right-1">
            <button
              type="button"
              className="h-6 w-6 flex items-center justify-center  rounded-full bg-gray-800/80 hover:bg-gray-800/90"
              onClick={() => setSelectedImage(null)}
            >
              <Icons.x className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="product-image"
          className="flex w-36 h-36 justify-center items-center rounded-xl border border-dashed border-gray-900/25 cursor-pointer hover:bg-accent/60"
        >
          <span className="font-semibold text-sm">Upload</span>
          <input
            id="product-image"
            name="product-image"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

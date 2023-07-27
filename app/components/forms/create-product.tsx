import React, { useState } from "react";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createProductSchema } from "@/lib/validations/product";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Textarea } from "../ui/textarea";
import productService from "@/services/product.service";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/router";

interface CreateProductFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProductForm({
  className,
  ...props
}: CreateProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<String | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onImageUploaded = (imageUrl: String) => {
    setImage(imageUrl);
  };

  function onSubmit(data: CreateProductFormData) {
    const payload = { ...data, image };
    setIsLoading(true);
    productService
      .createProduct(payload)
      .then(async (res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "Bad request.",
          description: err?.message,
          variant: "destructive",
        });
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <UploadProductImage onSuccess={onImageUploaded} />
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

interface UploadProductImageProps {
  onSuccess: (imageUrl: String) => void;
}

const UploadProductImage = ({ onSuccess }: UploadProductImageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsProcessing(true);
      console.log("Uploading...");
      productService
        .uploadImage(file)
        .then(async (res) => {
          console.log(res);
          onSuccess(res.url);
        })
        .catch((err) => {
          toast({
            title: "Bad request.",
            description: err?.message,
            variant: "destructive",
          });
          console.log(err);
        })
        .finally(() => {
          setIsProcessing(false);
        });
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
          {isProcessing ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-xl">
              <Icons.spinner className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : (
            <div className="absolute -top-1 -right-1">
              <button
                type="button"
                className="h-6 w-6 flex items-center justify-center  rounded-full bg-gray-800/80 hover:bg-gray-800/90"
                onClick={() => setSelectedImage(null)}
              >
                <Icons.x className="h-4 w-4 text-white" />
              </button>
            </div>
          )}
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

  // return (
  //   <div className="flex justify-center">
  //     {selectedImage && isProcessing ? (
  //       <div className="w-32 h-32 rounded-full relative">
  //         <img
  //           className="w-full h-full object-cover rounded-full"
  //           src={URL.createObjectURL(selectedImage)}
  //           alt="Preview"
  //         />
  //         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-full">
  //           <Icons.spinner className="h-6 w-6 animate-spin text-white" />
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="group h-32 w-32 rounded-full overflow-hidden relative">
  //         <img
  //           src={user.avatar}
  //           alt={user.name}
  //           className="h-full w-full rounded-full object-cover"
  //           width={128}
  //           height={128}
  //         />
  //         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-800 hidden group-hover:flex justify-center items-center space-x-2">
  //           <label htmlFor="user-avatar" className="cursor-pointer">
  //             <span className="w-8 h-8 bg-black bg-opacity-40 justify-center items-center rounded-full hidden border-2 border-black/40 hover:border-white group-hover:flex">
  //               <Icons.pen className="h-5 w-5 text-white" />
  //             </span>
  //             <input
  //               id="user-avatar"
  //               name="user-avatar"
  //               type="file"
  //               accept="image/jpeg, image/png, image/jpg"
  //               className="sr-only"
  //               onChange={handleImageChange}
  //             />
  //           </label>
  //           {user.avatar.includes("amazonaws.com") && (
  //             <button
  //               className="w-8 h-8 bg-black bg-opacity-40 justify-center items-center rounded-full hidden group-hover:flex border-2 border-black/40 hover:border-white"
  //               onClick={deleteAvatar}
  //             >
  //               <Icons.trash className="h-5 w-5 text-white" />
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>

  // return (

  // );
};

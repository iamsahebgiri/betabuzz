/* eslint-disable @next/next/no-img-element */
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useUser from "@/hooks/use-user";
import userService from "@/services/user.service";
import { useState } from "react";
import productService from "@/services/product.service";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import delete24Filled from "@iconify/icons-fluent/delete-24-filled";
import checkmark24Regular from "@iconify/icons-fluent/checkmark-24-regular";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories } from "@/config/categories";
import { KeyedMutator } from "swr";

const createProductFormSchema = z.object({
  name: z
    .string({ required_error: "Please provide a name to your product" })
    .nonempty(),
  link: z.string().url().nonempty(),
  image: z
    .string({
      required_error: "Image can't be empty",
    })
    .url()
    .nonempty(),
  tagline: z.string(),
  description: z.string(),
  tags: z
    .array(
      z.object({
        value: z.string().nonempty(),
      })
    )
    .optional(),
  category: z.string(),
});

type CreateProductFormValues = z.infer<typeof createProductFormSchema>;

interface CreateProductFormProps {
  onSuccess: (res: any) => void;
  defaultValues?: Partial<CreateProductFormValues> & { id: string };
}

export function CreateProductForm({
  onSuccess,
  defaultValues,
}: CreateProductFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  function onSubmit(data: CreateProductFormValues) {
    const payload = {
      ...data,
      tags: data.tags?.map((tag) => tag.value),
      category: categories.find((category) => category.value === data.category)
        ?.label,
    };
    setIsLoading(true);
    if (defaultValues) {
      productService
        .updateProduct(defaultValues.id as string, payload)
        .then((res) => {
          onSuccess(res);
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
    } else {
      productService
        .createProduct(payload)
        .then((res) => {
          onSuccess(res);
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadProductImage
                  image={field.value}
                  setImage={(value) => {
                    form.setValue("image", value);
                  }}
                />
              </FormControl>
              <FormDescription>This is your image identity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="BetaBuzz" {...field} />
              </FormControl>
              <FormDescription>
                This is your brand name. Make it sound like a brand.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input
                  placeholder="Creating a buzz around the latest beta products"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Make it resonate with your vision and mission.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to your product</FormLabel>
              <FormControl>
                <Input placeholder="http://betabuzz.vercel.app" {...field} />
              </FormControl>
              <FormDescription>
                This will be used to increase your traffic. Make sure its
                correct.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Making the world a better place"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[320px] justify-between rounded-lg text-sm",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.value === field.value
                          )?.label
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandList>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.value}
                            key={category.value}
                            onSelect={(value) => {
                              form.setValue("category", value);
                            }}
                          >
                            <Icon
                              icon={checkmark24Regular}
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`tags.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Tags
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      size="circle"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Icon icon={delete24Filled} className="h-5 w-5" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add tag
          </Button>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Save product
        </Button>
      </form>
    </Form>
  );
}

interface UploadProductImageProps {
  image: string;
  setImage: (value: string) => void;
}

const UploadProductImage = ({ setImage, image }: UploadProductImageProps) => {
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
          setImage(res.url);
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

  if (!selectedImage && !image) {
    return (
      <label
        htmlFor="product-image"
        className="flex h-36 w-36 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-900/25 hover:bg-accent/60"
      >
        <span className="text-sm font-semibold">Upload logo</span>
        <input
          id="product-image"
          name="product-image"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          className="sr-only"
          onChange={handleImageChange}
        />
      </label>
    );
  }

  return (
    <div className="relative h-36 w-36 rounded-xl">
      <img
        className="h-full w-full rounded-xl object-cover"
        src={selectedImage ? URL.createObjectURL(selectedImage) : image}
        alt="Preview"
      />
      {isProcessing ? (
        <div className="bg-opacity/40 absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-xl bg-black">
          <Icons.spinner className="h-6 w-6 animate-spin text-white" />
        </div>
      ) : (
        <div className="absolute -right-1 -top-1">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center  rounded-full bg-gray-800/80 hover:bg-gray-800/90"
            onClick={() => {
              setSelectedImage(null);
              setImage("");
            }}
          >
            <Icons.x className="h-4 w-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

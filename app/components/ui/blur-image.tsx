import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImageProps {}

export function BlurImage(props: BlurImageProps) {
  const { color, height, width, ...rest } = props;
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-20 w-20 aspect-square rounded-lg overflow-hidden">
      <Image
        {...rest}
        alt={props.alt}
        title={props.alt}
        loading="lazy"
        height={80}
        width={80}
        sizes="100vw"
        className={cn(
          "rounded-lg duration-700 ease-in-out h-auto w-full",
          loading ? "blur-lg scale-110" : "blur-0 scale-100"
        )}
        onLoadingComplete={async () => {
          setLoading(false);
        }}
      />
    </div>
  );
}

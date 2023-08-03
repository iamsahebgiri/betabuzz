import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImageProps {}

const imageUrl = (url: string, opts?: any) =>
  `https://wsrv.nl/?${new URLSearchParams({
    /* The image URL to optimize */
    url,

    /* In case something goes wrong, just show the image */
    default: url,

    /* 
      Compress it as much as possible (PNG).
      See: https://images.weserv.nl/docs/format.html#compression-level 
    */
    l: 9,

    /* 
      Reduce PNG file size.
      See: https://images.weserv.nl/docs/format.html#adaptive-filter
    */
    af: "",

    /*
      Enable image optimization for GIF and JPEG.
      See: https://images.weserv.nl/docs/format.html#interlace-progressive
    */
    il: "",

    /*
      Enable image optimization for WebP and GIF.
      See: https://images.weserv.nl/docs/format.html#number-of-pages
    */
    n: -1,

    /* 
      Pass any other option.
      See https://images.weserv.nl/docs/quick-reference.html 
      
      It's recommended to pass `w` for cutting down the image size.
    */
    ...opts,
  }).toString()}`;

export function BlurImage(props: BlurImageProps) {
  const { color, height, width, ...rest } = props;
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-lg">
      <Image
        {...rest}
        src={imageUrl(props.src as string, {
          w: 80,
        })}
        alt={props.alt}
        title={props.alt}
        loading="lazy"
        height={80}
        width={80}
        sizes="100vw"
        className={cn(
          "h-auto w-full rounded-lg duration-500 ease-in-out",
          loading ? "scale-110 blur-lg" : "scale-100 blur-0"
        )}
        onLoadingComplete={async () => {
          setLoading(false);
        }}
      />
    </div>
  );
}

import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type SanityImageAsset = {
  asset?: { _ref?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
};

interface SanityImageProps {
  image: SanityImageAsset | null | undefined;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
}

export function SanityImage({
  image,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = false,
  className,
  width,
  height,
  quality = 75,
}: SanityImageProps) {
  if (!image) {
    return <div className={cn("aspect-[4/3] bg-divider/60", className)} aria-hidden="true" />;
  }

  const srcBase = urlFor(image).auto("format").quality(quality);
  const imageAlt = alt || image.alt || "";

  if (fill) {
    return (
      <Image
        src={srcBase.url()}
        alt={imageAlt}
        sizes={sizes}
        priority={priority}
        fill
        quality={quality}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={srcBase.url()}
      alt={imageAlt}
      sizes={sizes}
      priority={priority}
      quality={quality}
      width={width || 1200}
      height={height || 900}
      className={cn("object-cover", className)}
    />
  );
}
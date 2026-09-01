import type { Metadata } from "next";
import { siteUrl, defaultMeta } from "./constants";
import { urlFor } from "./sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import type { ClientSettings } from "@/types/sanity";
import { getSiteSettings } from "./sanity/data";

export { getSiteSettings };

interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: SanityImageSource & { alt?: string };
  type?: "website" | "article";
}

export interface SeoBase {
  title: string;
  description: string;
  imageUrl?: string;
}

export function buildSeoBase(settings: ClientSettings | null): SeoBase {
  const title = settings?.companyName || defaultMeta.title;
  const defaultImage = settings?.defaultSeoImage;

  return {
    title,
    description: settings?.tagline || defaultMeta.description,
    imageUrl: defaultImage
      ? urlFor(defaultImage).width(1200).height(630).url()
      : undefined,
  };
}

export function buildSeo(input: SeoInput, base: SeoBase): Metadata {
  const hasTitle = Boolean(input.title);
  const title = input.title
    ? `${input.title} | ${base.title}`
    : base.title;

  const description = input.description || base.description;
  const url = `${siteUrl}${input.path || ""}`;
  const imageUrl = input.image
    ? urlFor(input.image).width(1200).height(630).url()
    : base.imageUrl;

  return {
    ...(!hasTitle ? { title: { absolute: base.title } } : { title }),
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: base.title,
      type: input.type || "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: "" }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

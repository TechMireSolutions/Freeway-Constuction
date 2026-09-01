import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
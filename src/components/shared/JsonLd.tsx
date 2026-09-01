import type { ClientSettings } from "@/types/sanity";
import { siteUrl } from "@/lib/constants";

export function OrganizationJsonLd({ settings }: { settings: ClientSettings | null }) {
  const name = settings?.companyName || "Freeway Constructions";

  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    url: siteUrl,
    description: settings?.tagline || undefined,
    telephone: settings?.phone || undefined,
    email: settings?.email || undefined,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
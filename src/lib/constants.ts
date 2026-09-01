export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://freewayconstructions.com";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const defaultMeta = {
  title: "Freeway Constructions",
  description:
    "Freeway Constructions — a full-service design-build construction company crafting commercial, residential, and custom living spaces that last.",
};
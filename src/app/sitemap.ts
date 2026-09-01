import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { siteUrl } from "@/lib/constants";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  let services: { slug: string }[] = [];
  let projects: { slug: string }[] = [];

  try {
    [services, projects] = await Promise.all([
      client.fetch(`*[_type == "service"] { "slug": slug.current }`),
      client.fetch(`*[_type == "project"] { "slug": slug.current }`),
    ]);
  } catch {
    services = [];
    projects = [];
  }

  const serviceUrls = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const projectUrls = projects.map((p) => ({
    url: `${siteUrl}/portfolio/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...base, ...serviceUrls, ...projectUrls];
}
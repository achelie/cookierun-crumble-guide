import { absoluteUrl, type SeoPageDefinition } from "@/lib/seo";
import { siteDescriptions, siteName, siteUrl } from "@/lib/site-identity";
import type { Locale } from "@/i18n/config";

type SchemaNode = Record<string, unknown>;

export const websiteId = `${siteUrl}/#website`;
export const organizationId = `${siteUrl}/#organization`;
export const websiteRef = { "@id": websiteId };
export const organizationRef = { "@id": organizationId };

const siteEntities: SchemaNode[] = [
  { "@type": "WebSite", "@id": websiteId, url: `${siteUrl}/`, name: siteName, publisher: organizationRef },
  {
    "@type": "Organization", "@id": organizationId, name: siteName, url: `${siteUrl}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png"), width: 96, height: 96 },
  },
];

export function schemaGraph(nodes: SchemaNode[], locale: Locale = "en"): { "@context": string; "@graph": SchemaNode[] } {
  // Keep canonical IDs the same across locales and resolve references within each document.
  return { "@context": "https://schema.org", "@graph": [...nodes, ...siteEntities.map((node) => ({ ...node, description: siteDescriptions[locale] }))] };
}

export const propertyValue = (name: string, value: string | number) => ({ "@type": "PropertyValue", name, value });

export function breadcrumbNode(
  page: Pick<SeoPageDefinition, "path" | "breadcrumb">,
  parent?: { name: string; path: string },
): SchemaNode {
  const crumbs = [
    { name: "Home", path: "/" },
    ...(parent ? [parent] : []),
    ...(page.path === "/" ? [] : [{ name: page.breadcrumb, path: page.path }]),
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function homeSchema(page: SeoPageDefinition) {
  return schemaGraph([{
    "@type": "WebPage",
    "@id": `${siteUrl}/#page`,
    url: absoluteUrl(page.path),
    name: page.h1,
    dateModified: page.updatedAt,
    inLanguage: "en",
    isPartOf: websiteRef,
  }]);
}

export function informationPageSchema(page: SeoPageDefinition) {
  const url = absoluteUrl(page.path);
  return schemaGraph([
    {
      "@type": page.path === "/about/" ? "AboutPage" : page.path === "/contact/" ? "ContactPage" : "WebPage",
      "@id": `${url}#page`,
      url,
      name: page.h1,
      description: page.summary,
      inLanguage: "en",
      dateModified: page.updatedAt,
      isPartOf: websiteRef,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbNode(page),
  ]);
}

export function collectionPageSchema(
  page: SeoPageDefinition,
  items: SchemaNode[],
  parent?: { name: string; path: string },
) {
  const url = absoluteUrl(page.path);
  const listId = `${url}#items`;
  return schemaGraph([
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: page.h1,
      description: page.description,
      inLanguage: "en",
      dateModified: page.updatedAt,
      isPartOf: websiteRef,
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": listId },
    },
    {
      "@type": "ItemList",
      "@id": listId,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item,
      })),
    },
    breadcrumbNode(page, parent),
  ]);
}

export function webApplicationSchema(
  page: SeoPageDefinition,
  parent: { name: string; path: string } = { name: "Tools", path: "/tools/" },
) {
  const url = absoluteUrl(page.path);
  return schemaGraph([
    {
      "@type": "WebApplication",
      "@id": `${url}#application`,
      name: page.h1,
      url,
      description: page.summary,
      applicationCategory: "GameApplication",
      isAccessibleForFree: true,
      isPartOf: websiteRef,
      publisher: organizationRef,
      inLanguage: "en",
      dateModified: page.updatedAt,
    },
    breadcrumbNode(page, parent),
  ]);
}

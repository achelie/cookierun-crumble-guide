import { absoluteUrl, siteName, siteUrl, type SeoPageDefinition } from "@/lib/seo";

type SchemaNode = Record<string, unknown>;

export function schemaGraph(nodes: SchemaNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbNode(
  page: SeoPageDefinition,
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
  return schemaGraph([
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: page.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
        width: 96,
        height: 96,
      },
    },
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
      isPartOf: { "@id": `${siteUrl}/#website` },
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
  features: string[],
  parent: { name: string; path: string } = { name: "Tools", path: "/tools/" },
) {
  const url = absoluteUrl(page.path);
  return schemaGraph([
    {
      "@type": "WebApplication",
      "@id": `${url}#application`,
      name: page.h1,
      url,
      description: page.description,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      featureList: features,
      inLanguage: "en",
      dateModified: page.updatedAt,
    },
    breadcrumbNode(page, parent),
  ]);
}

import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.disclaimer;
export const metadata: Metadata = pageMetadata(page);

const sections: TrustSection[] = [
  {
    id: "unofficial",
    title: "Independent and unofficial",
    content: <><I18nElement as="p">CookieRun: Crumble Guide is an independent fan-made player reference. It is not operated, sponsored, approved, or endorsed by Devsisters or the CookieRun development team.</I18nElement><I18nElement as="p">The domain, editorial opinions, rankings, calculations, and tools belong to this guide's operator, not to Devsisters.</I18nElement></>,
  },
  {
    id: "intellectual-property",
    title: "Game names, artwork, and Fan Kit material",
    content: <><I18nElement as="p">CookieRun names, characters, artwork, logos, game screenshots, and trademarks are the property of Devsisters and their respective rights holders. They are used here only to identify and discuss the game.</I18nElement><I18nElement as="p">Fan Kit material is used under the conditions attached to Devsisters' resources. Devsisters reserves the rights described on its <I18nElement as="a" href="https://www.devsisters.com/en/resource" rel="external">official Brand Resources page</I18nElement>. Nothing on this site grants visitors a license to extract or reuse those assets.</I18nElement></>,
  },
  {
    id: "accuracy",
    title: "Game data changes",
    content: <><I18nElement as="p">Balance patches can turn a smart recommendation into yesterday's crumbs. We date guides and label estimates, but we cannot promise that every number remains correct after a game update.</I18nElement><I18nElement as="p">Use the guides as practical player advice, not as a guarantee of drops, rankings, purchases, or account progress. Report a stale value through the <Link href="/contact/">Contact page</Link>.</I18nElement></>,
  },
  {
    id: "external-links",
    title: "External links and support",
    content: <><I18nElement as="p">External links are supplied for context, official support, privacy choices, or further reading. Their owners control those sites and may change their content or policies.</I18nElement><I18nElement as="p">We cannot access CookieRun accounts, reverse purchases, restore lost progress, or provide official customer support.</I18nElement></>,
  },
  {
    id: "contact-rights",
    title: "Rights requests",
    content: <I18nElement as="p">A rights holder who wants to question or request removal of material can email <I18nElement as="a" href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</I18nElement> with the affected URL, the material involved, and enough information to verify the request.</I18nElement>,
  },
];

export default function DisclaimerPage() {
  return <TrustPage page={page} icon="scale" updatedLabel="Updated August 28, 2026" note={<I18nElement as="p">CookieRun belongs to Devsisters. The opinions, mistakes, and questionable team experiments here belong to us.</I18nElement>} sections={sections} />;
}

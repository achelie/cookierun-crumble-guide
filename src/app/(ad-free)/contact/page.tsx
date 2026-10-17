import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.contact;
export const metadata: Metadata = pageMetadata(page);

const email = "contact@cookieruncrumbles.com";
const sections: TrustSection[] = [
  {
    id: "email",
    title: "Email the editorial team",
    content: <><I18nElement as="p"><I18nElement as="a" className="trust-page__email" href={`mailto:${email}`}>{email}</I18nElement></I18nElement><I18nElement as="p">There is no contact form and no account system. Your message goes straight to the editorial inbox.</I18nElement></>,
  },
  {
    id: "corrections",
    title: "Report a guide or data error",
    content: <><I18nElement as="p">Include the page URL, the exact line or value that looks wrong, the game version, and what you observed. Screenshots help when a tooltip or stage result changed after a patch.</I18nElement><I18nElement as="p">For team questions, start with the current <Link href="/teams/">team examples</Link> and <Link href="/tier-list/">tier list</Link>; they answer most “who should I build?” messages in two minutes.</I18nElement></>,
  },
  {
    id: "rights",
    title: "Copyright and brand requests",
    content: <><I18nElement as="p">Rights holders can identify the asset or page, explain the requested change, and include a reliable way to verify the request. We review legitimate correction and removal requests.</I18nElement><I18nElement as="p">This site is an unofficial fan guide. For Devsisters game support, purchases, or account recovery, use the official CookieRun support channel instead.</I18nElement></>,
  },
  {
    id: "privacy",
    title: "Privacy requests",
    content: <I18nElement as="p">Use the same address for questions about site data or to request deletion of an email conversation. The <Link href="/privacy/">Privacy Policy</Link> explains what the site and its service providers process.</I18nElement>,
  },
];

export default function ContactPage() {
  return <TrustPage page={page} icon="mail" updatedLabel="One public inbox" note={<I18nElement as="p">Corrections, privacy questions, and rights requests all land in the same place.</I18nElement>} sections={sections} />;
}

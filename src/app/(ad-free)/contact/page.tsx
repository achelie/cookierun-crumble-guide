import type { Metadata } from "next";
import Link from "next/link";
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
    content: <><p><a className="trust-page__email" href={`mailto:${email}`}>{email}</a></p><p>There is no contact form and no account system. Your message goes straight to the editorial inbox.</p></>,
  },
  {
    id: "corrections",
    title: "Report a guide or data error",
    content: <><p>Include the page URL, the exact line or value that looks wrong, the game version, and what you observed. Screenshots help when a tooltip or stage result changed after a patch.</p><p>For team questions, start with the current <Link href="/teams/">team examples</Link> and <Link href="/tier-list/">tier list</Link>; they answer most “who should I build?” messages in two minutes.</p></>,
  },
  {
    id: "rights",
    title: "Copyright and brand requests",
    content: <><p>Rights holders can identify the asset or page, explain the requested change, and include a reliable way to verify the request. We review legitimate correction and removal requests.</p><p>This site is an unofficial fan guide. For Devsisters game support, purchases, or account recovery, use the official CookieRun support channel instead.</p></>,
  },
  {
    id: "privacy",
    title: "Privacy requests",
    content: <p>Use the same address for questions about site data or to request deletion of an email conversation. The <Link href="/privacy/">Privacy Policy</Link> explains what the site and its service providers process.</p>,
  },
];

export default function ContactPage() {
  return <TrustPage page={page} icon="mail" updatedLabel="One public inbox" note={<p>Corrections, privacy questions, and rights requests all land in the same place.</p>} sections={sections} />;
}

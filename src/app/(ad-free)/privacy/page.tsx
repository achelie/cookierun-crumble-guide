import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.privacy;
export const metadata: Metadata = pageMetadata(page);

const sections: TrustSection[] = [
  {
    id: "operator",
    title: "Who operates this site",
    content: <><I18nElement as="p">CookieRun: Crumble Guide is operated by the Crumble Guide Editorial Team. Questions and privacy requests can be sent to <I18nElement as="a" href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</I18nElement>.</I18nElement><I18nElement as="p">This policy applies to cookieruncrumbles.com and its public pages and tools.</I18nElement></>,
  },
  {
    id: "hosting",
    title: "Hosting, security, and basic logs",
    content: <><I18nElement as="p">Cloudflare delivers and protects the site. Like most web infrastructure, it may process request details such as IP address, date and time, requested URL, referrer, browser or device information, and security signals. We use that processing to deliver pages, resist abuse, and understand service reliability.</I18nElement><I18nElement as="p">Cloudflare Web Analytics may provide aggregated, cookie-free traffic measurements. See <I18nElement as="a" href="https://www.cloudflare.com/privacypolicy/" rel="external">Cloudflare's Privacy Policy</I18nElement>.</I18nElement></>,
  },
  {
    id: "analytics",
    title: "Ahrefs Web Analytics",
    content: <><I18nElement as="p">We use Ahrefs Web Analytics to understand which pages are useful. Ahrefs says its default analytics does not use cookies or persistent cross-site identifiers. It processes the page URL, referrer, User-Agent, language, and approximate country or city derived from the IP address.</I18nElement><I18nElement as="p">Ahrefs combines IP address and User-Agent with a random salt that changes every 24 hours to estimate daily unique visitors. It says raw IP addresses are discarded rather than stored. Read <I18nElement as="a" href="https://help.ahrefs.com/en/articles/10247870-about-ahrefs-web-analytics" rel="external">Ahrefs' analytics data explanation</I18nElement>.</I18nElement></>,
  },
  {
    id: "advertising",
    title: "Google AdSense and advertising identifiers",
    content: <><I18nElement as="p">We are preparing to use Google AdSense. When advertising is active, Google and its advertising partners may use cookies, web beacons, IP addresses, device information, and other identifiers to serve, limit, personalize, and measure ads, detect fraud, and produce reports.</I18nElement><I18nElement as="p">Third-party vendors, including Google, may place or read cookies in your browser or use web beacons and IP addresses because ads are served on this site. Google may use advertising cookies to select ads based on visits to this and other sites.</I18nElement><I18nElement as="p">Learn <I18nElement as="a" href="https://policies.google.com/technologies/partner-sites" rel="external">how Google uses information from sites that use its services</I18nElement>. You can manage Google advertising choices in <I18nElement as="a" href="https://adssettings.google.com/" rel="external">Google Ads Settings</I18nElement> and learn about additional industry opt-outs at <I18nElement as="a" href="https://optout.aboutads.info/" rel="external">AboutAds</I18nElement>.</I18nElement></>,
  },
  {
    id: "consent",
    title: "Consent and US privacy choices",
    content: <><I18nElement as="p">For visitors in the European Economic Area, the United Kingdom, and Switzerland, Google's certified consent platform presents choices to consent, decline, or manage advertising purposes and vendors before personalized advertising is used. When advertising is active, the message also provides a way to revisit those choices.</I18nElement><I18nElement as="p">For covered US states, a Google privacy message provides applicable opt-out choices. We do not sell contact emails. Advertising providers may process identifiers as described above, subject to your available privacy choices.</I18nElement></>,
  },
  {
    id: "email-data",
    title: "What happens when you email us",
    content: <><I18nElement as="p">If you contact us, we receive your email address, message, and anything you attach. We use it to answer the request, investigate a correction, handle a rights claim, prevent abuse, or comply with law.</I18nElement><I18nElement as="p">We keep correspondence only as long as it remains useful for those purposes or is required for security or legal records. You can request deletion by emailing the same address, subject to obligations we must retain.</I18nElement></>,
  },
  {
    id: "children",
    title: "Children",
    content: <I18nElement as="p">This is a general-audience reference site and is not directed to children under 13. We do not knowingly collect personal information from children. A parent or guardian who believes a child sent us personal information can contact us to request deletion.</I18nElement>,
  },
  {
    id: "rights-and-changes",
    title: "Your choices and policy changes",
    content: <><I18nElement as="p">You may block cookies through your browser, use the consent controls described above, or email us about access or deletion of correspondence. Blocking storage may affect advertising choices but does not block access to the guides.</I18nElement><I18nElement as="p">Service providers may process data in countries other than your own. We will update this page when the site's data practices materially change and publish the revised date at the top.</I18nElement><I18nElement as="p">For site ownership and intellectual property details, read the <Link href="/disclaimer/">Disclaimer</Link>.</I18nElement></>,
  },
];

export default function PrivacyPage() {
  return <TrustPage page={page} icon="privacy" updatedLabel="Effective August 28, 2026" note={<I18nElement as="p">No account, no contact form, and no hidden promise that “we collect nothing.” This page lists the actual services in use.</I18nElement>} sections={sections} />;
}

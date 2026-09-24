import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.privacy;
export const metadata: Metadata = pageMetadata(page);

const sections: TrustSection[] = [
  {
    id: "operator",
    title: "Who operates this site",
    content: <><p>CookieRun: Crumble Guide is operated by the Crumble Guide Editorial Team. Questions and privacy requests can be sent to <a href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</a>.</p><p>This policy applies to cookieruncrumbles.com and its public pages and tools.</p></>,
  },
  {
    id: "hosting",
    title: "Hosting, security, and basic logs",
    content: <><p>Cloudflare delivers and protects the site. Like most web infrastructure, it may process request details such as IP address, date and time, requested URL, referrer, browser or device information, and security signals. We use that processing to deliver pages, resist abuse, and understand service reliability.</p><p>Cloudflare Web Analytics may provide aggregated, cookie-free traffic measurements. See <a href="https://www.cloudflare.com/privacypolicy/" rel="external">Cloudflare's Privacy Policy</a>.</p></>,
  },
  {
    id: "analytics",
    title: "Ahrefs Web Analytics",
    content: <><p>We use Ahrefs Web Analytics to understand which pages are useful. Ahrefs says its default analytics does not use cookies or persistent cross-site identifiers. It processes the page URL, referrer, User-Agent, language, and approximate country or city derived from the IP address.</p><p>Ahrefs combines IP address and User-Agent with a random salt that changes every 24 hours to estimate daily unique visitors. It says raw IP addresses are discarded rather than stored. Read <a href="https://help.ahrefs.com/en/articles/10247870-about-ahrefs-web-analytics" rel="external">Ahrefs' analytics data explanation</a>.</p></>,
  },
  {
    id: "advertising",
    title: "Google AdSense and advertising identifiers",
    content: <><p>We are preparing to use Google AdSense. When advertising is active, Google and its advertising partners may use cookies, web beacons, IP addresses, device information, and other identifiers to serve, limit, personalize, and measure ads, detect fraud, and produce reports.</p><p>Third-party vendors, including Google, may place or read cookies in your browser or use web beacons and IP addresses because ads are served on this site. Google may use advertising cookies to select ads based on visits to this and other sites.</p><p>Learn <a href="https://policies.google.com/technologies/partner-sites" rel="external">how Google uses information from sites that use its services</a>. You can manage Google advertising choices in <a href="https://adssettings.google.com/" rel="external">Google Ads Settings</a> and learn about additional industry opt-outs at <a href="https://optout.aboutads.info/" rel="external">AboutAds</a>.</p></>,
  },
  {
    id: "consent",
    title: "Consent and US privacy choices",
    content: <><p>For visitors in the European Economic Area, the United Kingdom, and Switzerland, Google's certified consent platform presents choices to consent, decline, or manage advertising purposes and vendors before personalized advertising is used. When advertising is active, the message also provides a way to revisit those choices.</p><p>For covered US states, a Google privacy message provides applicable opt-out choices. We do not sell contact emails. Advertising providers may process identifiers as described above, subject to your available privacy choices.</p></>,
  },
  {
    id: "email-data",
    title: "What happens when you email us",
    content: <><p>If you contact us, we receive your email address, message, and anything you attach. We use it to answer the request, investigate a correction, handle a rights claim, prevent abuse, or comply with law.</p><p>We keep correspondence only as long as it remains useful for those purposes or is required for security or legal records. You can request deletion by emailing the same address, subject to obligations we must retain.</p></>,
  },
  {
    id: "children",
    title: "Children",
    content: <p>This is a general-audience reference site and is not directed to children under 13. We do not knowingly collect personal information from children. A parent or guardian who believes a child sent us personal information can contact us to request deletion.</p>,
  },
  {
    id: "rights-and-changes",
    title: "Your choices and policy changes",
    content: <><p>You may block cookies through your browser, use the consent controls described above, or email us about access or deletion of correspondence. Blocking storage may affect advertising choices but does not block access to the guides.</p><p>Service providers may process data in countries other than your own. We will update this page when the site's data practices materially change and publish the revised date at the top.</p><p>For site ownership and intellectual property details, read the <Link href="/disclaimer/">Disclaimer</Link>.</p></>,
  },
];

export default function PrivacyPage() {
  return <TrustPage page={page} icon="privacy" updatedLabel="Effective August 28, 2026" note={<p>No account, no contact form, and no hidden promise that “we collect nothing.” This page lists the actual services in use.</p>} sections={sections} />;
}

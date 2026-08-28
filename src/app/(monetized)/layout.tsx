const publisherId = "ca-pub-7443237558968985";
const adSenseBootstrapSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;

export default function AdSenseContentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <script async src={adSenseBootstrapSrc} crossOrigin="anonymous" />
    </>
  );
}

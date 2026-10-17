// Thin locale routes share the existing page implementations and ad boundaries.
import fs from 'node:fs/promises';
import path from 'node:path';
for(const group of ['(monetized)','(ad-free)']){
 const base='src/app/'+group;
 async function walk(dir){const out=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())out.push(...await walk(file));else if(entry.name==='page.tsx')out.push(file);}return out;}
 const target='src/app/[locale]/'+group;await fs.mkdir(target,{recursive:true});
 await fs.writeFile(target+'/layout.tsx',`import { notFound } from "next/navigation";
import { SiteDocument, metadata as baseMetadata, viewport } from "@/components/site-document";
import { localeFromSegment, localeConfig, translatedLocales } from "@/i18n/config";
export { viewport };
export const metadata = baseMetadata;
export const dynamicParams = false;
export function generateStaticParams() { return translatedLocales.map(locale => ({locale: localeConfig[locale].prefix.slice(1)})); }
export default async function Layout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const locale = localeFromSegment((await params).locale);
  if (!locale) notFound();
  return <SiteDocument locale={locale}${group==='(monetized)'?' advertising':''}>{children}</SiteDocument>;
}
`);
 for(const file of await walk(base)){
  const relative=path.relative(base,file).replaceAll('\\','/');const output=path.join(target,relative);await fs.mkdir(path.dirname(output),{recursive:true});
  const route='/'+relative.replace(/(?:^|\/)page.tsx$/,'/').replace(/^\//,'');
  const source='@/app/'+group+'/'+relative.replace(/\.tsx$/,'');
  if(relative.includes('[slug]')){
   await fs.writeFile(output,`import View, { generateMetadata as guideMetadata } from "${source}";
import { getGuideLocale } from "@/i18n/server";
export { generateStaticParams } from "${source}";
export const dynamicParams = false;
type Props = {params: Promise<{locale:string;slug:string}>};
export async function generateMetadata({params}:Props) {const p=await params;getGuideLocale(p.locale);return guideMetadata({params:Promise.resolve(p)});}
export default async function Page({params}:Props) {const p=await params;getGuideLocale(p.locale);return <View params={Promise.resolve(p)} />;}
`);
  }else{
   await fs.writeFile(output,`import View from "${source}";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("${route}",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
`);
  }
 }
}

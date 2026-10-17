import fs from 'node:fs/promises';
const slugs=(await fs.readdir('src/content/guides')).filter(file=>file.endsWith('.mdx')).map(file=>file.slice(0,-4));
let code='// Generated static imports; only the selected guide is loaded.\nimport type { ComponentType } from "react";\nimport type { Locale } from "./config";\ntype Loader = () => Promise<{default: ComponentType}>;\nexport const localizedGuideLoaders: Partial<Record<Locale,Record<string,Loader>>> = {\n';
for(const locale of ['zh-Hant','ja','ko','th'])code+=JSON.stringify(locale)+': {\n'+slugs.map(slug=>JSON.stringify(slug)+': () => import("@/content/guides/'+locale+'/'+slug+'.mdx"),').join('\n')+'\n},\n';
await fs.writeFile('src/i18n/guide-loaders.ts',code+'};\n');

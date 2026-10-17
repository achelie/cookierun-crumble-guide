import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
const parser=unified().use(remarkParse).use(remarkMdx);const guides={};
for(const file of (await fs.readdir('src/content/guides')).filter(f=>f.endsWith('.mdx'))){
 const text=await fs.readFile('src/content/guides/'+file,'utf8');const segments=[];
 function visit(n){if(n.type==='text'&&n.value.trim())segments.push({start:n.position.start.offset,end:n.position.end.offset,text:n.value,kind:'text'});if(n.type==='mdxJsxAttribute'&&['title','description','alt','aria-label'].includes(n.name)&&typeof n.value==='string')segments.push({start:n.position.start.offset,end:n.position.end.offset,text:n.value,kind:'attribute',name:n.name});for(const c of n.children||[])visit(c);for(const a of n.attributes||[])visit(a);}
 visit(parser.parse(text));guides[file.slice(0,-4)]={text,segments,sha256:crypto.createHash('sha256').update(text).digest('hex')};
}
await fs.writeFile('src/i18n/source/guides.json',JSON.stringify(guides,null,2)+'\n');

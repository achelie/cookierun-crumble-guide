import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'acorn';
import { fileURLToPath } from 'node:url';
function translateTextChoices(source){
 const edits=[];const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});
 function visit(node,parent,display=false){
  if(node.type==='AssignmentExpression'&&node.left.type==='MemberExpression'&&node.left.property.name==='textContent'){visit(node.right,node,true);return;}
  const alreadyWrapped=parent?.type==='CallExpression'&&parent.callee.type==='MemberExpression'&&parent.callee.object.name==='i18n'&&parent.callee.property.name==='text';
  if(display&&!alreadyWrapped&&node.type==='ConditionalExpression'&&[node.consequent,node.alternate].every(n=>n.type==='Literal'&&typeof n.value==='string'))edits.push([node.start,'i18n.text('],[node.end,')']);
  for(const value of Object.values(node))if(Array.isArray(value))for(const child of value)if(child?.type)visit(child,node,display);else{}else if(value?.type)visit(value,node,display);
 }
 visit(ast);
 for(const [at,text]of edits.sort((a,b)=>b[0]-a[0]))source=source.slice(0,at)+text+source.slice(at);
 return source;
}
function translateComposedLabels(source){
 // These fragments are combined with numbers or already-localized labels
 // before reaching innerHTML. Translate them before that combination.
 for(const expression of [
  'p.useActual?"Client rules":"Geometric estimate"',
  'p.useActual?"In-game":"Geometric estimate"',
  'row.grade===current()?" · Current":\'\'',
  'row.grade===state.target?" · Target":\'\'',
  'g===data.maxGrade?\' · MAX\':\'\''
 ]){
  source=source.replaceAll('${'+expression+'}', '${i18n.text('+expression+')}');
 }
 source=source.replace('next+=` · Repair to +${g}`', 'next+=i18n.text(` · Repair to +${g}`)');
 source=source.replace('next+=` · Configured refund rate ${number(row.refundPercent)}%`', 'next+=i18n.text(` · Configured refund rate ${number(row.refundPercent)}%`)');
 source=source.replace('`In-game area: ${pct(area)}${i18n.text(', '`${i18n.text(`In-game area: ${pct(area)}`)}${i18n.text(');
 source=source.replace(/(?<!i18n\.text\()result\.stars\+" \/ 12 Starshards meet the requirements"/g, 'i18n.text(result.stars+" / 12 Starshards meet the requirements")');
 source=source.replace('${e(c.role||"Cookie")}', '${e(i18n.text(c.role||"Cookie"))}');
 source=source.replace(/(?<!i18n\.text\()"Swap with Starshard "\+\(owner\+1\)\+"  "/g, 'i18n.text("Swap with Starshard "+(owner+1)+"  ")');
 source=source.replace(/(?<!i18n\.text\()`Swap with Starshard \$\{owner\+1\}  `/g, 'i18n.text(`Swap with Starshard ${owner+1}  `)');
 // Normalize earlier instrumentation and keep repeated imports byte-stable.
 for(;;){
  const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});let duplicate;
  const isText=node=>node?.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.object.name==='i18n'&&node.callee.property.name==='text'&&node.arguments.length===1;
  function visit(node){
   if(duplicate)return;
   if(isText(node)&&isText(node.arguments[0])){duplicate=node;return;}
   for(const value of Object.values(node))if(Array.isArray(value))value.forEach(child=>{if(child?.type)visit(child);});else if(value?.type)visit(value);
  }
  visit(ast);if(!duplicate)break;
  const inner=duplicate.arguments[0];source=source.slice(0,duplicate.start)+source.slice(inner.start,inner.end)+source.slice(duplicate.end);
 }
 parse(source,{ecmaVersion:'latest',sourceType:'module'});
 return source;
}
export function localizeToolModules(root=process.cwd()){
 const directory=path.join(root,'public/tools/replica');
 fs.copyFileSync(path.join(root,'scripts/i18n/tool-runtime.mjs'),path.join(directory,'i18n.mjs'));
 for(const name of ['sugar-runes','stellar-link','plate-enhancement','sugar-rune-select']){
  const file=path.join(directory,name+'.mjs');let source=fs.readFileSync(file,'utf8');
  if(source.includes('createToolI18n')){fs.writeFileSync(file,translateComposedLabels(translateTextChoices(source)));continue;}
  const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});const insertions=[];
  const wrap=(node,fn)=>{insertions.push([node.start,'i18n.'+fn+'('],[node.end,')']);};
  function visit(node){
   if(node.type==='AssignmentExpression'&&node.left.type==='MemberExpression'){
    const property=node.left.property.name;
    if(property==='innerHTML')wrap(node.right,'html');
    else if(['textContent','title','alt','ariaLabel'].includes(property))wrap(node.right,'text');
    else if(property==='href')wrap(node.right,'path');
   }
   if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.property.name==='setAttribute'&&['aria-label','title','alt','placeholder'].includes(node.arguments[0]?.value)&&node.arguments[1])wrap(node.arguments[1],'text');
   if(node.type==='Literal'&&typeof node.value==='string'){
    if(/^\/data\/tools\/en\/(?:sugar-runes|stellar-link|plate-enhancement|site-data)\.json$/.test(node.value))wrap(node,'dataPath');
    if(/^\/tools\/(?:sugar-runes|stellar-link|plate-enhancement)\/$/.test(node.value))wrap(node,'path');
   }
   for(const value of Object.values(node))if(Array.isArray(value))for(const child of value)if(child?.type)visit(child);else{}else if(value?.type)visit(value);
  }
  visit(ast);
  for(const [at,text]of insertions.sort((a,b)=>b[0]-a[0]))source=source.slice(0,at)+text+source.slice(at);
  if(name==='sugar-rune-select'){
   // Picker strings are localized by its parent, keeping selection keys stable.
   source=source.replace("root = document.body, signal} = {}", "root = document.body, signal, i18n = createToolI18n()} = {}");
  }else{
   source=source.replace('export function mount(root){','export function mount(root,localization={}){\nconst i18n=createToolI18n(localization);');
   source=source.replaceAll('createIconSelects(optionArtwork,{root,signal})','createIconSelects(optionArtwork,{root,signal,i18n})').replaceAll("root,signal})","root,signal,i18n})");
  }
  source="import {createToolI18n} from './i18n.mjs';\n"+source;
  source=translateComposedLabels(translateTextChoices(source));
  parse(source,{ecmaVersion:'latest',sourceType:'module'});
  fs.writeFileSync(file,source);
 }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))localizeToolModules();

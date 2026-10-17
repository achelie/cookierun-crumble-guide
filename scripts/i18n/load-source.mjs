import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);const cache=new Map();
export function loadTypeScript(file){
 file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;
 const module={exports:{}};cache.set(file,module);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const localRequire=id=>id.startsWith('@/')?loadTypeScript('src/'+id.slice(2)+'.ts'):id.startsWith('.')?loadTypeScript(path.join(path.dirname(file),id+'.ts')):require(id);
 new Function('require','module','exports',code)(localRequire,module,module.exports);return module.exports;
}
